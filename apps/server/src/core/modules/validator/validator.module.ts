import { Module } from "@nestjs/common"
import { IsUniqueConstraint } from "./unique.constraint"
import { SameAsConstraint } from "./same-as.constraint"
import { IsExistsConstraint } from "./is-exists.constraint"

@Module({
  imports: [],
  exports: [],
  providers: [IsUniqueConstraint, SameAsConstraint, IsExistsConstraint],
})
export class ValidatorModule {}
