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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2 py-3"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleCancel()
        }
      }}
    >
      <section
        aria-modal="true"
        className="w-full max-w-[900px] rounded-[0.9rem] bg-[#322a42] p-3 text-[#f3f1e9] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-4"
        role="dialog"
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <h2 className="text-[1.35rem] font-semibold text-[#fff38b] sm:text-[1.55rem]">
            Cargar información de Usuario
          </h2>
          <button
            aria-label="Cerrar modal"
            className="text-[2rem] leading-none text-[#fff38b] transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#fff38b]/60"
            onClick={handleCancel}
            type="button"
          >
            ×
          </button>
        </div>

        <label className="block">
          <span className="mb-4 block text-[1.05rem] text-[#f3f1e9] sm:text-[1.2rem]">
            Inserta o pega la información del usuario a consultar:
          </span>
          <textarea
            className="min-h-[220px] w-full resize-y rounded-[0.75rem] border border-white/25 bg-[#1f1b2a] p-2 font-mono text-[0.95rem] leading-relaxed text-[#ffa36f] outline-none transition placeholder:text-[#8f879a] focus:border-[#02d3ff] focus:ring-2 focus:ring-[#02d3ff]/30"
            onChange={(event) => {
              setJsonText(event.target.value)
              setErrorMessage(null)
            }}
            placeholder='{"rut":"1583677","dv":"K","nombres":"JUAN JOSE"}'
            value={jsonText}
          />
        </label>

        {errorMessage ? (
          <p className="mt-3 rounded-[0.65rem] border border-[#f79b63]/40 bg-[#1f1b2a] px-2 py-1.5 text-[0.95rem] text-[#f79b63]">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="rounded-[0.65rem] px-2 py-1 text-left text-[1rem] font-semibold text-[#f3f1e9] transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            onClick={handleCancel}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="rounded-[0.65rem] bg-[#ff9b63] px-3 py-1.5 text-[1rem] font-semibold text-[#111015] transition hover:bg-[#ffad7f] focus:outline-none focus:ring-2 focus:ring-[#02d3ff]"
            disabled={isSubmitting}
            onClick={handleLoad}
            type="button"
          >
            {isSubmitting ? 'Consultando...' : 'Cargar y consultar datos'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default RecextPasteUserModal
