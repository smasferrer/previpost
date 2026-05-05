import { QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { queryClient } from '../lib/query/queryClient'

function AppProviders({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default AppProviders
