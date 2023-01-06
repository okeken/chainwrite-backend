// import { IResult } from "@/src/middleware/paginate"

declare module Express {
    interface Request {
        user?:String
}
//     interface Response {
//         paginated?:IResult 
// }
}