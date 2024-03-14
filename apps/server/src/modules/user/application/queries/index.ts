import { GetUserHandler } from "./get-user/get-user.handler"
import { GetUsersCountHandler } from "./get-users-count/get-users-count.handler"
import { GetUsersHandler } from "./get-users/get-users.handler"

export const QueryHandlers = [GetUsersHandler, GetUsersCountHandler, GetUserHandler]
