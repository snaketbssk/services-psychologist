import type { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils'
import type { ReactElement, ReactNode } from 'react'
import type { ACLObj } from 'src/configs/acl'
import { IResponseIdentityClaim } from 'src/services-sub-modules/models/responses'

declare module 'next' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    acl?: ACLObj
    authGuard?: boolean
    guestGuard?: boolean
    claims?: Array<IResponseIdentityClaim>
    setConfig?: () => void
    contentHeightFixed?: boolean
    getLayout?: (page: ReactElement) => ReactNode
  }
}
