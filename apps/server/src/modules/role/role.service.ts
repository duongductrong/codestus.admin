import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Role } from "./entities/role.entity"

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>) {}

  create(data: Pick<Role, "name" | "description" | "privileges" | "createdBy">) {
    const role = this.roleRepo.create(data)
    return this.roleRepo.save(role)
  }
}
