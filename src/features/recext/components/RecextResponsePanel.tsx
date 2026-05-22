import type {
  RecextConsultationError,
  RecextConsultationResponse,
} from '../types'
import { CODIGOS_PREV } from '../codigosPrev'

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

const jsonTokenPattern =
  /("(?:\\u[\dA-Fa-f]{4}|\\[^u]|[^\\"])*"(?=\s*:))|("(?:\\u[\dA-Fa-f]{4}|\\[^u]|[^\\"])*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false|null)\b|([{}[\]])/g

const renderJsonWithColors = (jsonText: string) => {
  if (!jsonText) {
    return null
  }

  const parts = []
  let currentIndex = 0

  for (const match of jsonText.matchAll(jsonTokenPattern)) {
    const matchIndex = match.index ?? 0

    if (matchIndex > currentIndex) {
      parts.push(jsonText.slice(currentIndex, matchIndex))
    }

    const [token, key, stringValue, numberValue, literalValue, bracket] = match
    const colorClassName = bracket
      ? 'text-[#00CDE8]'
      : key
        ? 'text-white'
        : stringValue || numberValue || literalValue
          ? 'text-[#FFA06C]'
          : 'text-[#96959a]'

    parts.push(
      <span className={colorClassName} key={`${matchIndex}-${token}`}>
        {token}
      </span>,
    )

    currentIndex = matchIndex + token.length
  }

  if (currentIndex < jsonText.length) {
    parts.push(jsonText.slice(currentIndex))
  }

  return parts
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

  const documentedUrl = getValidUrl(isRecord(value.data) ? value.data.urlPrevired : undefined)

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

const buildStatusCode = (
  response: RecextConsultationResponse | undefined,
  error: RecextConsultationError | null | undefined,
  fallbackLabel: string,
) => {
  if (response) {
    return String(response.status)
  }

  if (error) {
    if (error.status) {
      return String(error.status)
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
  const visibleJson = formatJson(visiblePayload)
  const returnUrl = findReturnUrl(response?.data)
  const visibleStatusCode = isLoading
    ? statusLabel
    : buildStatusCode(response, error, statusLabel)
  const statusClassName = isLoading
    ? buildStatusClassName(undefined, undefined)
    : buildStatusClassName(response, error)

  const codigoPrev =
    response?.data?.codigoPrev ??
    (isRecord(error?.data) ? (error.data as Record<string, unknown>).codigoPrev : undefined)
  const codigoPrevStr = typeof codigoPrev === 'string' && codigoPrev.trim() ? codigoPrev.trim() : null
  const codigoPrevInfo = codigoPrevStr ? (CODIGOS_PREV[codigoPrevStr] ?? null) : null

  const handleOpenReturnUrl = () => {
    if (!returnUrl) {
      return
    }

    window.open(returnUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <aside className="min-w-0 rounded-[1.2rem] bg-[#25232d] p-2 shadow-[0_18px_38px_rgba(0,0,0,0.16)] sm:p-2.5">
      <div className="mb-4 rounded-[1rem] bg-[#19181f] px-3 py-2.5">
        <h3 className="mb-3 text-[1rem] font-semibold text-[#96959a] sm:text-[1.05rem]">
          Usuario
        </h3>
        <p className="text-[1rem] font-semibold text-[#96959a] sm:text-[1.05rem]">
          Ultimos registros:
        </p>
      </div>

      <div className="rounded-[1rem] bg-[#1b1a22] p-2">
        <div
          className={`mb-4 flex min-w-0 items-center justify-between gap-3 rounded-[0.8rem] border px-3 py-1.5 text-[1rem] font-semibold sm:text-[1.05rem] ${statusClassName}`}
        >
          <span className="shrink-0">Estado:</span>
          <span className="min-w-0 truncate text-right">{visibleStatusCode}</span>
        </div>

        <div className="mt-4 min-w-0 overflow-hidden rounded-[0.95rem] bg-[#111015]">
          <div className="border-b border-white/5 px-2.5 py-1 text-[0.9rem] font-semibold text-[#96959a]">
            Json
          </div>
          <pre className="line-clamp-[12] max-h-[300px] min-h-[258px] overflow-hidden whitespace-pre-wrap break-all bg-[#1b1a22] p-2.5 text-[0.85rem] leading-relaxed text-[#96959a]">
            {renderJsonWithColors(visibleJson)}
          </pre>
        </div>

        {isLoading ? (
          <p className="mt-4 rounded-[0.95rem] bg-[#1b1a22] p-2.5 text-[0.95rem] text-[#96959a]">
            Consultando backend...
          </p>
        ) : null}
        {!isLoading && error ? (
          <p className="mt-4 rounded-[0.95rem] bg-[#1b1a22] p-2.5 text-[0.95rem] text-[#f79b63]">
            {error.message || 'No fue posible ejecutar la consulta.'}
          </p>
        ) : null}
        {!isLoading && !error && returnUrl ? (
          <div className="mt-4 rounded-[0.8rem] border border-[#34d5d0]/30 bg-[#111015] p-2">
            <p className="mb-2 text-[0.85rem] font-semibold text-[#34d5d0]">
              URL de retorno detectada
            </p>
            <input
              className="mb-3 w-full rounded-[0.55rem] border border-white/10 bg-[#1b1a22] px-1.5 py-1 text-[0.85rem] text-[#f3f1e9] outline-none"
              readOnly
              value={returnUrl}
            />
            <button
              className="rounded-[0.65rem] bg-[#f26f45] px-2 py-1 text-[0.9rem] font-semibold text-white transition hover:bg-[#ff825d] focus:outline-none focus:ring-2 focus:ring-[#34d5d0]"
              onClick={handleOpenReturnUrl}
              type="button"
            >
              Abrir URL de retorno
            </button>
          </div>
        ) : null}
        {!isLoading && codigoPrevStr ? (
          <div className="mt-4 rounded-[0.8rem] border border-[#f79b63]/30 bg-[#111015] p-3">
            <p className="mb-3 text-[0.85rem] font-semibold text-[#f79b63]">
              Código de respuesta Previred
            </p>
            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="shrink-0 text-[0.8rem] text-[#96959a]">Código de Error:</span>
                <span className="font-mono text-[0.95rem] font-bold text-[#f79b63]">
                  {codigoPrevStr}
                </span>
              </div>
              {codigoPrevInfo ? (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="shrink-0 text-[0.8rem] text-[#96959a]">Motivo del Error:</span>
                    <span className="text-[0.85rem] text-[#f3f1e9]">{codigoPrevInfo.motivo}</span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="shrink-0 text-[0.8rem] text-[#96959a]">Descripción:</span>
                    <span className="text-[0.85rem] text-[#f3f1e9]">{codigoPrevInfo.descripcion}</span>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  )
}

export default RecextResponsePanel
