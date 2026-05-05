import { useQuery } from '@tanstack/react-query'
import { getAfpOptions } from '../api/rexService'

export const rexQueryKeys = {
  all: ['rex'] as const,
  afps: () => [...rexQueryKeys.all, 'afps'] as const,
}

export const useAfpOptionsQuery = () =>
  useQuery({
    queryKey: rexQueryKeys.afps(),
    queryFn: getAfpOptions,
    staleTime: 10 * 60_000,
  })
