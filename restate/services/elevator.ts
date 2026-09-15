import * as restate from "@restatedev/restate-sdk";
import { FloorRequest } from "../utils/types";

type State = {
    currentFloor: number,
    requestFloor: number
}

// {
//     "currentFloor": "3",
//     "requestFloor": "2"
// }

const elevatorObject = restate.object({
    name: "ElevatorObject",
    handlers: {
        floorCall: async (ctx: restate.ObjectContext<State>, req: FloorRequest) => {
            const currentFloor = await ctx.get('currentFloor') ?? ctx.set('currentFloor', req.elevatorFloor)
            await ctx.set("requestFloor", req.requestFloor)
            const requestFloor = await ctx.get('requestFloor')
            console.log("current", currentFloor)
            console.log("request", requestFloor)

            if(requestFloor && currentFloor !== requestFloor) {
                 ctx.set("currentFloor", requestFloor)
                 return `Elevator called to ${requestFloor}`
            }
            if(!requestFloor){
                return 'There was an error'
            }
            else {
                return 'Elevator not called, already on requested floor'
            }
            
            //check if there is a previous elevatorCurrentFloor state 
            //if not, set this to elevatorcurrentFloor from req
            //check if currentFloor === requestFloor
            //if true, do nothing 
            //if not, update elevatorCurrentFloor state to requestFloor 
        }
        
    }
})

//

restate.serve({
  services: [elevatorObject],
  port: 9080,
});

//should the state of what floor the elevator is curently on be only controlled from within restate? i.e. I don't need a useState in react to pass the currentFloor of the elevator,
//as restate should remember and handle this? 