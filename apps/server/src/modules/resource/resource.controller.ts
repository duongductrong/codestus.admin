import { Controller, Get } from "@nestjs/common"
import { SignalBuilder } from "@server/core/classes/signal/signal.builder"
import { ResourceService } from "./resource.service"

@Controller({ path: "resources", version: ["1"] })
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get()
  findAll() {
    return SignalBuilder.create().setData(this.resourceService.findAll()).setMessage("Ok").build()
  }
}
