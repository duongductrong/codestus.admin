import { AuthGuard } from "./infras/guards/authenticator.guard"

describe("AuthenticatorGuard", () => {
  it("should be defined", () => {
    expect(new AuthGuard()).toBeDefined()
  })
})
