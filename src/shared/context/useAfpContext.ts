import { useContext } from 'react'
import { AfpContext } from './afpContext'

export const useAfpContext = () => {
  const context = useContext(AfpContext)

  if (!context) {
    throw new Error('useAfpContext debe usarse dentro de AfpProvider.')
  }

  return context
}
