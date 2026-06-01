import type { PropsWithChildren } from 'react'
import { AfpProvider } from '../../context/AfpContext'
import ThemeProvider from '../../theme/ThemeProvider'
import AppSidebar from './AppSidebar'
import AppTopbar from './AppTopbar'
import MainContent from './MainContent'

interface AppShellProps extends PropsWithChildren {
  showSidebar?: boolean
}

function AppShell({ children, showSidebar = true }: AppShellProps) {
  return (
    <ThemeProvider>
      <AfpProvider>
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] lg:flex">
          {showSidebar ? <AppSidebar /> : null}

          <div className="flex min-w-0 flex-1 flex-col">
            <AppTopbar />
            <MainContent>{children}</MainContent>
          </div>
        </div>
      </AfpProvider>
    </ThemeProvider>
  )
}

export default AppShell
