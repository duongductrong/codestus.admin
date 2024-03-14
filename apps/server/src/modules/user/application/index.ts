import { CreateUserHttpController } from "./commands/create-user/create-user.http.controller"
import { GetUsersHttpController } from "./queries/get-users/get-users.http.controller"

export const HttpControllers = [GetUsersHttpController, CreateUserHttpController]
