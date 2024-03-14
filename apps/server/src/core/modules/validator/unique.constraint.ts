import { Injectable } from "@nestjs/common"
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type"
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator"
import { EntityManager, EntitySchema, ObjectType } from "typeorm"

export interface IsUniqueConstraintOptions<E = unknown> {
  entity: ObjectType<E> | EntitySchema<E> | string
  field?: keyof E
}

@ValidatorConstraint({ name: "IsUniqueConstraint", async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  private getConstraintsOptions(validationArguments?: ValidationArguments | undefined) {
    return validationArguments?.constraints?.[0] as IsUniqueConstraintOptions
  }

  async validate(
    value: any,
    validationArguments?: ValidationArguments | undefined,
  ): Promise<boolean> {
    const { entity, field } = this.getConstraintsOptions(validationArguments)
    const entityRepository = this.entityManager.getRepository(entity)
    const propertyName = field || validationArguments?.property || "id"

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
export function IsUnique<E = unknown>(
  options: IsUniqueConstraintOptions<E>,
  validatorOptions?: ValidationOptions,
) {
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
