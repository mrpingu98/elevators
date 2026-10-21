import * as restate from "@restatedev/restate-sdk";
import * as z from 'zod';

type State = {
    currentFloor: number,
    requestFloor: number
}

const elevatorObject = restate.object({
    name: "ElevatorObject",
    handlers: {
        floorCall: restate.createObjectHandler(
            {input: restate.serde.schema(z.object({requestFloor: z.number()}))}, 
            async (ctx: restate.ObjectContext<State>, req) => {
                const currentFloor = await ctx.get('currentFloor') ?? 0
                ctx.set("requestFloor", req.requestFloor)
                
                if (currentFloor === req.requestFloor) {
                    return 'Elevator not called, already on requested floor'
                }

                if (currentFloor !== req.requestFloor) {
                    ctx.set("currentFloor", req.requestFloor)
                    return `Elevator called to ${req.requestFloor}`
                }
            }
        ),

        getCurrentFloor: restate.createObjectHandler(
            async (ctx: restate.ObjectContext<State>) => {
                const currentFloor = ctx.get('currentFloor') ?? 0
                return currentFloor
            }
        )

    }
})

restate.serve({
    services: [elevatorObject],
    port: 9080,
});





//code for extending to buildings:

// export class QueryError extends Error {
//     /**
//      * @param {string} message
//      * @param {number} status
//      */
//     constructor(message, status) {
//         super(message)
//         this.name = 'QueryError'
//         this.status = status
//     }
// }

// /**
//  * @typedef RequestOptions
//  * @property {string} url - The URL to fetch
//  * @property {'GET' | 'POST'} method - The HTTP method to use
//  * @property {HeadersInit} [headers] - Additional headers to include
//  * @property {any} [body] - The body of the request, for POST requests
//  * @property {File} [file] - The file to send, for POST requests
//  * @property {number} [timeout=10000] - Timeout in milliseconds
//  * @property {string} errorMessage - The operation to perform
//  */

// /**
//  * @param {RequestOptions} options
//  */
// export async function request(options) {
//     const headers = new Headers(options.headers || {})
//     let body
//     if (typeof options.body === 'object' && options.body !== null) {
//         body = JSON.stringify(options.body)
//         headers.set('Content-Type', 'application/json')
//     } else if (options.file !== undefined) {
//         body = options.file
//         if (!headers.has('Content-Type')) {
//             headers.set('Content-Type', 'application/octet-stream')
//         }
//     }
//     const result = await fetch(options.url, {
//         method: options.method,
//         headers,
//         body,
//         signal: AbortSignal.timeout(options.timeout ?? 10000),
//     })
//     if (!result.ok) {
//         throw new QueryError(options.errorMessage, result.status)
//     }
//     if (!result.headers.get('Content-Type')?.includes('application/json')) {
//         return null
//     }
//     const data = await result.json()
//     return data ?? null
// }

// import * as restate from '@restatedev/restate-sdk'
// import * as z from 'zod'

// type ElevatorState = {
//     currentFloor: number
// }

// export const elevator = restate.object({
//     name: 'elevator',
//     handlers: {
//         init: restate.createObjectHandler({}, async (ctx: restate.ObjectContext<ElevatorState>) => {
//             ctx.set('currentFloor', 0)
//         }),
//         snapshot: restate.createObjectHandler({}, async (ctx: restate.ObjectContext<ElevatorState>) => {
//             const currentFloor = (await ctx.get('currentFloor'))!
//             return {
//                 id: ctx.key,
//                 currentFloor,
//             }
//         }),
//     },
// })

// type BuildingState = {
//     floorCount: number
//     elevatorIds: string[]
// }

// export const building = restate.object({
//     name: 'building',
//     handlers: {
//         create: restate.createObjectHandler({
//             input: restate.serde.schema(z.object({
//                 floorCount: z.int32().min(1),
//                 elevatorCount: z.int32().min(1),
//             })),
//         }, async (ctx: restate.ObjectContext<BuildingState>, input) => {
//             ctx.set('floorCount', input.floorCount)
//             const elevatorIds: string[] = []
//             for (let i = 0; i < input.elevatorCount; i += 1) {
//                 const elevatorId = ctx.rand.uuidv4()
//                 await ctx.objectClient(elevator, elevatorId).init()
//                 elevatorIds.push(elevatorId)
//             }
//             ctx.set('elevatorIds', elevatorIds)
//         }),
//         snapshot: restate.createObjectHandler({}, async (ctx: restate.ObjectContext<BuildingState>) => {
//             const floorCount = (await ctx.get('floorCount'))!
//             const elevatorIds = (await ctx.get('elevatorIds'))!
//             const elevators = []
//             for (const elevatorId of elevatorIds) {
//                 const elevatorState = await ctx.objectClient(elevator, elevatorId).snapshot()
//                 elevators.push(elevatorState)
//             }
//             return {
//                 floorCount,
//                 elevators,
//             }
//         }),
//     },
// })


