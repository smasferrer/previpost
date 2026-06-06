import type { ReactNode } from 'react'
import JsonViewer from './JsonViewer'

type ResponsePanelStatus = 'idle' | 'loading' | 'success' | 'error'

interface ResponsePanelProps {
  className?: string
  content?: ReactNode
  data?: unknown
  emptyMessage?: string
  status?: ResponsePanelStatus
  statusLabel?: string
  title?: string
}

const statusClassNames: Record<ResponsePanelStatus, string> = {
  idle:
    'border-[var(--color-border)] bg-[var(--color-surface-strong)] text-[var(--color-text-muted)]',
  loading:
    'border-[var(--color-info)] bg-[var(--color-info-surface)] text-[var(--color-info)]',
  success:
    'border-[var(--color-success)] bg-[var(--color-success-surface)] text-[var(--color-success)]',
  error:
    'border-[var(--color-error)] bg-[var(--color-error-surface)] text-[var(--color-error)]',
}

const defaultStatusLabels: Record<ResponsePanelStatus, string> = {
  idle: 'Sin ejecutar',
  loading: 'Cargando',
  success: 'OK',
  error: 'Error',
}

const formatPayload = (value: unknown) => {
  if (value === undefined || value === null) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function ResponsePanel({
  className = '',
  content,
  data,
  emptyMessage = 'No hay respuesta para mostrar.',
  status = 'idle',
  statusLabel,
  title = 'Respuesta',
}: ResponsePanelProps) {
  const formattedPayload = content ? '' : formatPayload(data)

  return (
    <section
      className={`min-w-0 max-w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-3 shadow-[var(--shadow-md)] ${className}`}
    >
      <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
        <h2 className="min-w-0 truncate text-base font-semibold text-[var(--color-text-secondary)]">
          {title}
        </h2>
        <span
          className={`rounded-[var(--radius-sm)] border px-2.5 py-1 text-xs font-semibold ${statusClassNames[status]}`}
        >
          {statusLabel ?? defaultStatusLabels[status]}
        </span>
      </div>

      <div className="min-w-0 max-w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-strong)]">
        <div className="border-b border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-text-muted)]">
          Contenido
        </div>
        {content ? (
          <div className="max-w-full overflow-auto p-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {content}
          </div>
        ) : (
          <JsonViewer
            className="p-3 text-sm text-[var(--color-text-secondary)]"
            emptyMessage={emptyMessage}
            jsonText={formattedPayload}
          />
        )}
      </div>
    </section>
  )
}

export default ResponsePanel
