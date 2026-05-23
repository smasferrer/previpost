import { createContext } from 'react'
import type { AfpOption } from '../../features/recext/types'

export interface AfpContextValue {
  afp: string
  afpOptions: AfpOption[]
  isAfpError: boolean
  isLoadingAfps: boolean
  setAfp: (value: string) => void
}

export const AfpContext = createContext<AfpContextValue | null>(null)
