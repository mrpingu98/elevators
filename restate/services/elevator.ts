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

type ElevatorState = {
    currentFloor: number,
    requestFloor: number
}

export const elevator = restate.object({
    name: 'elevator',
    handlers: {
        init: restate.createObjectHandler({}, async (ctx: restate.ObjectContext<ElevatorState>) => {
            ctx.set('currentFloor', 0)
        }),
        snapshot: restate.createObjectHandler({}, async (ctx: restate.ObjectContext<ElevatorState>) => {
            const currentFloor = (await ctx.get('currentFloor'))!
            return {
                id: ctx.key,
                currentFloor,
            }
        }),
        call: restate.createObjectHandler({
            input: restate.serde.schema(z.object({
                requestFloor: z.number()
            }))
        }, async (ctx: restate.ObjectContext<State>, req) => {
            const currentFloor = await ctx.get('currentFloor') ?? 0
            ctx.set("requestFloor", req.requestFloor)

            if (currentFloor === req.requestFloor) {
                return 'Elevator not called, already on requested floor'
            }

            if (currentFloor !== req.requestFloor) {
                ctx.set("currentFloor", req.requestFloor)
                return `Elevator called to ${req.requestFloor}`
            }
        }),
    },
})

type BuildingState = {
    floorCount: number
    elevatorIds: string[]
}

export const building = restate.object({
    name: 'building',
    handlers: {
        create: restate.createObjectHandler({
            input: restate.serde.schema(z.object({
                floorCount: z.int32().min(1),
                elevatorCount: z.int32().min(1),
            })),
        }, async (ctx: restate.ObjectContext<BuildingState>, input) => {
            ctx.set('floorCount', input.floorCount)
            const elevatorIds: string[] = []
            for (let i = 0; i < input.elevatorCount; i += 1) {
                const elevatorId = ctx.rand.uuidv4()
                await ctx.objectClient(elevator, elevatorId).init()
                elevatorIds.push(elevatorId)
            }
            ctx.set('elevatorIds', elevatorIds)
        }),
        snapshot: restate.createObjectHandler({}, async (ctx: restate.ObjectContext<BuildingState>) => {
            const floorCount = (await ctx.get('floorCount'))!
            const elevatorIds = (await ctx.get('elevatorIds'))!
            const elevators = []
            for (const elevatorId of elevatorIds) {
                const elevatorState = await ctx.objectClient(elevator, elevatorId).snapshot()
                elevators.push(elevatorState)
            }
            return {
                floorCount,
                elevators,
            }
        }),
    },
})

restate.serve({
    services: [elevatorObject, elevator, building],
    port: 9080,
});

//create - create me a building with this many floors and elevators 
//snapshot - what is my current state of the building 

//maybe a delete handler later down the line for clearin gup when wnating new buildings etc 

//objectClient - want to call another service/object etc - just a way to invoke somethiing else 
//  localhost: 8080 / service/ optionalKey / handler`
//is constructing essentially the same as above 

