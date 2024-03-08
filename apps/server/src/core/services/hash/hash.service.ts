import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as bcrypt from "bcrypt"
import { HashConfig, hashConfig } from "./hash.config"

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}

  private getConfig() {
    return this.configService.get<HashConfig>(hashConfig.KEY)
  }

  async make(password: string) {
    const config = this.getConfig()
    const hash = await bcrypt.hash(password, config?.saltOrRounds || 10)

    return hash
  }

  async check(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}
