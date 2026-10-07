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
