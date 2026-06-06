import type { ReactNode } from 'react'

interface ServiceFlowStep {
  description: ReactNode
  title: ReactNode
}

interface ServiceHelpModalProps {
  flowSteps: ServiceFlowStep[]
  infoContent: ReactNode
  isOpen: boolean
  onClose: () => void
  serviceName: ReactNode
}

function ServiceHelpModal({
  flowSteps,
  infoContent,
  isOpen,
  onClose,
  serviceName,
}: ServiceHelpModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--app-overlay)] px-2 py-3"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        aria-modal="true"
        className="max-h-[92svh] w-full max-w-[980px] overflow-y-auto rounded-[0.9rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-4 text-[var(--app-text)] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-5"
        role="dialog"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--app-accent)]">
              Guia del servicio
            </p>
            <h2 className="mt-1 text-[1.35rem] font-semibold text-[var(--app-primary)] sm:text-[1.55rem]">
              {serviceName}
            </h2>
          </div>

          <button
            aria-label="Cerrar modal"
            className="text-[2rem] leading-none text-[var(--app-primary)] transition hover:text-[var(--app-text)] focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)]"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <section className="rounded-[var(--radius-lg)] border border-[var(--app-border)] bg-[var(--app-panel)] p-4">
            <h3 className="text-[1rem] font-semibold text-[var(--app-primary)]">
              Informacion del servicio
            </h3>
            <div className="mt-2 text-sm leading-relaxed text-[var(--app-text-secondary)] [&_em]:font-semibold [&_em]:text-[var(--app-text)]">
              {infoContent}
            </div>
          </section>

          <section className="rounded-[var(--radius-lg)] border border-[var(--app-border)] bg-[var(--app-panel)] p-4">
            <h3 className="text-[1rem] font-semibold text-[var(--app-primary)]">
              Flujo de consulta
            </h3>

            <ol className="mt-4 grid gap-3">
              {flowSteps.map((step, index) => (
                <li
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 rounded-[var(--radius-md)] border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-3"
                  key={`${index}-${step.title}`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--app-primary)] text-sm font-semibold text-[var(--app-primary-contrast)]">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[var(--app-text)]">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[var(--app-text-muted)]">
                      {step.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
    </div>
  )
}

export default ServiceHelpModal
