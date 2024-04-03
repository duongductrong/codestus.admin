import { UseGuards, applyDecorators } from "@nestjs/common"
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger"
import { AuthGuard } from "../guards/authenticator.guard"

export function Auth() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: "Unauthorized" }),
  )
}
