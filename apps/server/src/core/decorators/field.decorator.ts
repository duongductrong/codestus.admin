import { ValidationOptions, registerDecorator } from "class-validator"

export function IsStringAdvanced(options?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types, func-names
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: "IsStringField",
      target: object.constructor,
      propertyName,
      constraints: [],
      options,
      validator: {
        validate() {
          return false
        },
        defaultMessage: () => `The ${propertyName} should be a string`,
      },
    })
  }
}
