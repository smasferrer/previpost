import type { ReactNode } from 'react'

interface PageHeaderProps {
  actions?: ReactNode
  className?: string
  description?: ReactNode
  eyebrow?: ReactNode
  title: ReactNode
  titleActions?: ReactNode
}

function PageHeader({
  actions,
  className = '',
  description,
  eyebrow,
  title,
  titleActions,
}: PageHeaderProps) {
  return (
    <header
      className={`flex flex-col gap-3 text-[var(--color-text-primary)] sm:flex-row sm:items-start sm:justify-between ${className}`}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
            {eyebrow}
          </p>
        ) : null}
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          {titleActions ? (
            <div className="flex shrink-0 flex-wrap gap-2">{titleActions}</div>
          ) : null}
        </div>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm text-[var(--color-text-secondary)]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </header>
  )
}

export default PageHeader
