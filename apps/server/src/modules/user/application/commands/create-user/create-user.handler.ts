import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs"
import { ApiProperty } from "@nestjs/swagger"
import { InjectRepository } from "@nestjs/typeorm"
import { IsUnique } from "@server/core/modules/validator"
import { HashService } from "@server/core/services/hash/hash.service"
import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator"
import { Repository } from "typeorm"
import { UserEntity } from "../../../entities/user.entity"

export class CreateUserCommand implements ICommand {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string

  @IsString()
  @IsEmail()
  @IsUnique({ entity: UserEntity })
  @ApiProperty()
  email: string

  @IsString()
  @IsStrongPassword()
  @ApiProperty()
  password: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  avatar?: string | undefined

  constructor(props: CreateUserCommand) {
    this.email = props.email
    this.name = props.name
    this.password = props.password
    this.avatar = props.avatar
  }
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly hashService: HashService,
  ) {}

  async execute(payload: CreateUserCommand): Promise<UserEntity> {
    payload.password = await this.hashService.make(payload.password)

    const user = this.userRepository.create(payload)

    return this.userRepository.save(user)
  }
}
