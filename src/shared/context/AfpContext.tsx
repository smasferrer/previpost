import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { useRecextAfpOptionsQuery } from '../../features/recext/hooks/useRecextAfpOptionsQuery'
import { AfpContext } from './afpContext'

const storageKey = 'previpost:selected-afp'

const getStoredAfp = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(storageKey) ?? ''
}

function AfpProvider({ children }: PropsWithChildren) {
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

export default AfpProvider
