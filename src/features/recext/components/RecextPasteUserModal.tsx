import { useState } from 'react'
import { parsePastedUserJson } from '../parsePastedUserJson'

interface RecextPasteUserModalProps {
  isOpen: boolean
  isSubmitting: boolean
  onCancel: () => void
  onLoadUserData: (payload: Record<string, unknown>) => string | null
}

function RecextPasteUserModal({
  isOpen,
  isSubmitting,
  onCancel,
  onLoadUserData,
}: RecextPasteUserModalProps) {
  const [jsonText, setJsonText] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (!isOpen) {
    return null
  }

  const handleCancel = () => {
    setJsonText('')
    setErrorMessage(null)
    onCancel()
  }

  const handleLoad = () => {
    const parseResult = parsePastedUserJson(jsonText)

    if (!parseResult.success) {
      setErrorMessage(parseResult.errorMessage)
      return
    }

    const loadError = onLoadUserData(parseResult.payload)

    if (loadError) {
      setErrorMessage(loadError)
      return
    }

    handleCancel()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--app-overlay)] px-2 py-3"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleCancel()
        }
      }}
    >
      <section
        aria-modal="true"
        className="w-full max-w-[900px] rounded-[0.9rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-3 text-[var(--app-text)] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-4"
        role="dialog"
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <h2 className="text-[1.35rem] font-semibold text-[var(--app-primary)] sm:text-[1.55rem]">
            Prellenar información
          </h2>
          <button
            aria-label="Cerrar modal"
            className="text-[2rem] leading-none text-[var(--app-primary)] transition hover:text-[var(--app-text)] focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)]"
            onClick={handleCancel}
            type="button"
          >
            ×
          </button>
        </div>

        <label className="block">
          <span className="mb-4 block text-[1.05rem] text-[var(--app-text)] sm:text-[1.2rem]">
            Inserta o pega la información del usuario:
          </span>
          <textarea
            className="min-h-[220px] w-full resize-y rounded-[var(--radius-sm)] border border-[var(--app-input-border)] bg-[var(--app-input-bg)] p-2 text-[0.95rem] leading-relaxed text-[var(--app-json-value)] outline-none transition placeholder:text-[var(--app-input-placeholder)] focus:border-[var(--app-accent)] focus:ring-2 focus:ring-[var(--app-focus-ring)]"
            onChange={(event) => {
              setJsonText(event.target.value)
              setErrorMessage(null)
            }}
            placeholder='{"rut":"1583677","dv":"K","nombres":"JUAN JOSE"}'
            value={jsonText}
          />
        </label>

        {errorMessage ? (
          <p className="mt-3 rounded-[0.65rem] border border-[var(--app-error)] bg-[var(--app-error-surface)] px-2 py-1.5 text-[0.95rem] text-[var(--app-error)]">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="rounded-[var(--radius-sm)] px-2 py-1 text-left text-[1rem] font-semibold text-[var(--app-text-secondary)] transition hover:text-[var(--app-text)] focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)]"
            onClick={handleCancel}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="rounded-[var(--radius-sm)] bg-[var(--app-primary)] px-3 py-1.5 text-[1rem] font-semibold text-[var(--app-primary-contrast)] transition hover:bg-[var(--app-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            onClick={handleLoad}
            type="button"
          >
            Prellenar formulario
          </button>
        </div>
      </section>
    </div>
  )
}

export default RecextPasteUserModal
