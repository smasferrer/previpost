import type {
  RecextConsultationError,
  RecextConsultationResponse,
} from '../types'

interface RecextResponsePanelProps {
  error?: RecextConsultationError | null
  isLoading: boolean
  response?: RecextConsultationResponse
  statusLabel: string
}

const formatJson = (value: unknown) => {
  if (value === undefined || value === null) {
    return ''
  }

  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const getValidUrl = (value: unknown) => {
  if (typeof value !== 'string') {
    return null
  }

  try {
    const url = new URL(value)

    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}

const findReturnUrl = (value: unknown): string | null => {
  if (!isRecord(value)) {
    return null
  }

  const documentedUrl = getValidUrl(value.data?.urlPrevired)

  if (documentedUrl) {
    return documentedUrl
  }

  for (const fieldName of ['urlPrevired', 'urlRetorno', 'returnUrl']) {
    const url = getValidUrl(value[fieldName])

    if (url) {
      return url
    }
  }

  for (const fieldValue of Object.values(value)) {
    if (isRecord(fieldValue)) {
      const url = findReturnUrl(fieldValue)

      if (url) {
        return url
      }
    }
  }

  return null
}

const buildStatusLabel = (
  response: RecextConsultationResponse | undefined,
  error: RecextConsultationError | null | undefined,
  fallbackLabel: string,
) => {
  if (response) {
    return [response.status, response.statusText].filter(Boolean).join(' ')
  }

  if (error) {
    if (error.status) {
      return [error.status, error.statusText].filter(Boolean).join(' ')
    }

    return 'Sin respuesta HTTP'
  }

  return fallbackLabel
}

const buildStatusClassName = (
  response: RecextConsultationResponse | undefined,
  error: RecextConsultationError | null | undefined,
) => {
  if (response) {
    return 'border-[#65d47a]/40 bg-[#112318] text-[#8df0a0]'
  }

  if (error) {
    return error.status
      ? 'border-[#f79b63]/40 bg-[#2b1712] text-[#ffb28b]'
      : 'border-[#f7d263]/40 bg-[#292312] text-[#ffe08a]'
  }

  return 'border-white/5 bg-[#111015] text-[#96959a]'
}

const getVisiblePayload = (
  response: RecextConsultationResponse | undefined,
  error: RecextConsultationError | null | undefined,
) => {
  if (response) {
    return response.data
  }

  if (error?.data !== undefined) {
    return error.data
  }

  if (error) {
    return { message: error.message }
  }

  return undefined
}

function RecextResponsePanel({
  error,
  isLoading,
  response,
  statusLabel,
}: RecextResponsePanelProps) {
  const visiblePayload = getVisiblePayload(response, error)
  const returnUrl = findReturnUrl(response?.data)
  const visibleStatusLabel = isLoading
    ? statusLabel
    : buildStatusLabel(response, error, statusLabel)
  const statusClassName = isLoading
    ? buildStatusClassName(undefined, undefined)
    : buildStatusClassName(response, error)

  const handleOpenReturnUrl = () => {
    if (!returnUrl) {
      return
    }

    window.open(returnUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <aside className="rounded-[1.2rem] bg-[#25232d] p-4 shadow-[0_18px_38px_rgba(0,0,0,0.16)] sm:p-5">
      <div className="mb-4 rounded-[1rem] bg-[#19181f] px-6 py-5">
        <h3 className="mb-3 text-[1rem] font-semibold text-[#96959a] sm:text-[1.05rem]">
          Usuario
        </h3>
        <p className="text-[1rem] font-semibold text-[#96959a] sm:text-[1.05rem]">
          Ultimos registros:
        </p>
      </div>

      <div className="rounded-[1rem] bg-[#1b1a22] p-4">
        <div
          className={`mb-4 rounded-[0.8rem] border px-6 py-3 text-[1rem] font-semibold sm:text-[1.05rem] ${statusClassName}`}
        >
          {visibleStatusLabel}
        </div>

        <div className="min-h-[435px] rounded-[0.95rem] bg-[#1b1a22] p-5 text-[0.95rem] text-[#96959a]">
          {isLoading ? 'Consultando backend...' : null}
          {!isLoading && error ? (
            <p className="text-[#f79b63]">
              {error.message || 'No fue posible ejecutar la consulta.'}
            </p>
          ) : null}
          {!isLoading && !error && response !== undefined ? (
            <p>Consulta ejecutada correctamente.</p>
          ) : null}
          {!isLoading && !error && returnUrl ? (
            <div className="mt-5 rounded-[0.8rem] border border-[#34d5d0]/30 bg-[#111015] p-4">
              <p className="mb-2 text-[0.85rem] font-semibold text-[#34d5d0]">
                URL de retorno detectada
              </p>
              <input
                className="mb-3 w-full rounded-[0.55rem] border border-white/10 bg-[#1b1a22] px-3 py-2 text-[0.85rem] text-[#f3f1e9] outline-none"
                readOnly
                value={returnUrl}
              />
              <button
                className="rounded-[0.65rem] bg-[#f26f45] px-4 py-2 text-[0.9rem] font-semibold text-white transition hover:bg-[#ff825d] focus:outline-none focus:ring-2 focus:ring-[#34d5d0]"
                onClick={handleOpenReturnUrl}
                type="button"
              >
                Abrir URL de retorno
              </button>
            </div>
          ) : null}
        </div>

        <div className="mt-4 overflow-hidden rounded-[0.95rem] bg-[#111015]">
          <div className="border-b border-white/5 px-5 py-1.5 text-[0.9rem] font-semibold text-[#96959a]">
            Json
          </div>
          <pre className="min-h-[258px] overflow-auto bg-[#1b1a22] p-5 text-[0.85rem] leading-relaxed text-[#96959a]">
            {formatJson(visiblePayload)}
          </pre>
        </div>
      </div>
    </aside>
  )
}

export default RecextResponsePanel
