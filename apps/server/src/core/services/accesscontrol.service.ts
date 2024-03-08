import { Injectable } from "@nestjs/common"
import { AccessControl } from "accesscontrol"

export type GrantActionAny = "read:any" | "create:any" | "update:any" | "delete:any"
export type GrantActionOwn = "read:own" | "create:own" | "update:own" | "delete:own"

export type GrantObject = {
  [role: string]: {
    [resource: string]: Record<GrantActionAny | GrantActionOwn, string[]>
  }
}

export type GrantListItem = {
  role: string
  resource: string
  action: GrantActionAny | GrantActionOwn
  attributes: string[]
}

export type GrantList = GrantListItem[]

@Injectable()
export class AccessControlService {
  private __accessControl: AccessControl

  create(grants: GrantList | GrantObject) {
    let acGrants: any[] = []
    if (Array.isArray(grants)) {
      acGrants = grants.map((grant) => {
        return {
          ...grant,
          attributes: grant.attributes.join(", "),
        }
      })
    }

    this.__accessControl = new AccessControl(acGrants)

    return this
  }

  build() {
    return this.__accessControl
  }
}
