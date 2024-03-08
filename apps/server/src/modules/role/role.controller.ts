import { Controller, InternalServerErrorException, Post } from "@nestjs/common"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { RoleService } from "./role.service"

@Controller({ path: "roles", version: ["1"] })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Get()
  // findAll() {
  //   const roles = this.roleService
  //   return SignalBuilder.create().setData("").setMessage("").build()
  // }

  @Post()
  async create() {
    try {
      const roleCreated = await this.roleService.create({
        name: "admin",
        description: "I has all permissions",
        privileges: {
          x: true,
        },
      })
      return SignalBuilder.create().setData(roleCreated).setMessage("").build()
    } catch (error) {
      throw new InternalServerErrorException(error.message, { cause: error.stack })
    }
  }
}
