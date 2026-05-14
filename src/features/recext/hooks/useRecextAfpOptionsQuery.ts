import { useQuery } from '@tanstack/react-query'
import { getAfpOptions } from '../api/recextService'

export const recextQueryKeys = {
  all: ['recext'] as const,
  afps: () => [...recextQueryKeys.all, 'afps'] as const,
}

export const useRecextAfpOptionsQuery = () =>
  useQuery({
    queryKey: recextQueryKeys.afps(),
    queryFn: getAfpOptions,
    staleTime: 10 * 60_000,
  })
