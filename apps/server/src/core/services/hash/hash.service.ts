import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as bcrypt from "bcrypt"
import { HashConfig, hashConfig } from "./hash.config"

export interface IHashService {
  make(password: string): Promise<string>

  check(plainPassword: string, hashedPassword: string): Promise<boolean>

  makeAsync(password: string): string

  checkAsync(plainPassword: string, hashedPassword: string): boolean
}

@Injectable()
export class HashService implements IHashService {
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

  makeAsync(password: string) {
    const config = this.getConfig()
    const hash = bcrypt.hashSync(password, config?.saltOrRounds || 10)

    return hash
  }

  checkAsync(plainPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(plainPassword, hashedPassword)
  }
}
