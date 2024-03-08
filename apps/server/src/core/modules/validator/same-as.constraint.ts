import { Injectable } from "@nestjs/common"
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
  registerDecorator,
} from "class-validator"

export interface SameAsConstraintOptions {
  sameAsField: string
}

@ValidatorConstraint({ name: "SameAsConstraint", async: false })
@Injectable()
export class SameAsConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments | undefined): boolean {
    const targetValues = (validationArguments?.object || {}) as Record<string, any>
    const constraints = validationArguments?.constraints?.[0] as SameAsConstraintOptions

    const sameAsFieldValue = targetValues?.[constraints.sameAsField]

    return value === sameAsFieldValue
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    const constraints = validationArguments?.constraints?.[0] as unknown as SameAsConstraintOptions

    return `The ${validationArguments?.property} is not same as ${constraints.sameAsField}`
  }
}

/**
 * Checks the value is a string & same as another field
 * If given value is not same as another field, then it returns false
 */
export function SameAs(options: SameAsConstraintOptions, validatorOptions?: ValidatorOptions) {
  // eslint-disable-next-line func-names, @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      options: validatorOptions,
      name: "SameAs",
      propertyName,
      target: object.constructor,
      constraints: [options],
      validator: SameAsConstraint,
      async: false,
    })
  }
}
