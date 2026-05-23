import type { PropsWithChildren } from 'react'

function MainContent({ children }: PropsWithChildren) {
  return (
    <main className="w-full flex-1 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1360px]">{children}</div>
    </main>
  )
}

export default MainContent
