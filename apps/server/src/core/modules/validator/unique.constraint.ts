import { Injectable } from "@nestjs/common"
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type"
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator"
import { EntityManager } from "typeorm"

export interface IsUniqueConstraintOptions {
  entity: EntityClassOrSchema
}

@ValidatorConstraint({ name: "IsUniqueConstraint", async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments | undefined,
  ): Promise<boolean> {
    const options = validationArguments?.constraints?.[0] as IsUniqueConstraintOptions
    const entityRepository = this.entityManager.getRepository(options.entity)
    const propertyName = validationArguments?.property || "id"

    const result = await entityRepository.count({ where: { [propertyName]: value } })

    return result === 0
  }

  defaultMessage?(validationArguments?: ValidationArguments | undefined): string {
    return `The ${validationArguments?.property} should be unique`
  }
}

/**
 * Checks if the string is a unique.
 * If given value is not a unique value, then it returns false.
 */
export function IsUnique(options: IsUniqueConstraintOptions, validatorOptions?: ValidationOptions) {
  // eslint-disable-next-line func-names, @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: "IsUnique",
      options: validatorOptions,
      propertyName,
      async: true,
      target: object.constructor,
      constraints: [options],
      validator: IsUniqueConstraint,
    })
  }
}
