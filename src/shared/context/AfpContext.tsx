/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { useRecextAfpOptionsQuery } from '../../features/recext/hooks/useRecextAfpOptionsQuery'
import type { AfpOption } from '../../features/recext/types'

export interface AfpContextValue {
  afp: string
  afpOptions: AfpOption[]
  isAfpError: boolean
  isLoadingAfps: boolean
  setAfp: (value: string) => void
}

export const AfpContext = createContext<AfpContextValue | null>(null)

const storageKey = 'previpost:selected-afp'

const getStoredAfp = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(storageKey) ?? ''
}

export function AfpProvider({ children }: PropsWithChildren) {
  const [afp, setAfpState] = useState(getStoredAfp)
  const {
    data: afpOptions = [],
    isError: isAfpError,
    isLoading: isLoadingAfps,
  } = useRecextAfpOptionsQuery()

  const setAfp = useCallback((value: string) => {
    setAfpState(value)

    if (typeof window === 'undefined') {
      return
    }

    if (value) {
      window.localStorage.setItem(storageKey, value)
      return
    }

    window.localStorage.removeItem(storageKey)
  }, [])

  const isSelectedAfpAvailable =
    !afp || afpOptions.length === 0 || afpOptions.some((option) => option.value === afp)
  const activeAfp = isSelectedAfpAvailable ? afp : ''

  useEffect(() => {
    if (isSelectedAfpAvailable || typeof window === 'undefined') {
      return
    }

    window.localStorage.removeItem(storageKey)
  }, [isSelectedAfpAvailable])

  const value = useMemo(
    () => ({
      afp: activeAfp,
      afpOptions,
      isAfpError,
      isLoadingAfps,
      setAfp,
    }),
    [activeAfp, afpOptions, isAfpError, isLoadingAfps, setAfp],
  )

  return <AfpContext.Provider value={value}>{children}</AfpContext.Provider>
}

export const useAfpContext = () => {
  const context = useContext(AfpContext)

  if (!context) {
    throw new Error('useAfpContext debe usarse dentro de AfpProvider.')
  }

  return context
}
