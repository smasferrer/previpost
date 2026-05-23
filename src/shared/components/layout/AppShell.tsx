import type { PropsWithChildren } from 'react'
import { AfpProvider } from '../../context/AfpContext'
import ThemeProvider from '../../theme/ThemeContext'
import AppSidebar from './AppSidebar'
import AppTopbar from './AppTopbar'
import MainContent from './MainContent'

function AppShell({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <AfpProvider>
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] lg:flex">
          <AppSidebar />

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
