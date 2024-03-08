import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ResourceConfig } from "@server/configs/resource.config"

@Injectable()
export class ResourceService {
  constructor(private configService: ConfigService) {}

  findAll(): ResourceConfig {
    return this.configService.get("resource") as ResourceConfig
  }
}
