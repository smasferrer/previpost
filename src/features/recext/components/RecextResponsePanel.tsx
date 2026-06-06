import type {
  RecextConsultationError,
  RecextConsultationResponse,
} from '../types'
import { CODIGOS_PREV } from '../codigosPrev'
import JsonViewer from '../../../shared/components/feedback/JsonViewer'

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
    return 'border-[var(--app-success)] bg-[var(--app-success-surface)] text-[var(--app-success)]'
  }

  if (error) {
    return error.status
      ? 'border-[var(--app-error)] bg-[var(--app-error-surface)] text-[var(--app-error)]'
      : 'border-[var(--app-warning)] bg-[var(--app-warning-surface)] text-[var(--app-warning)]'
  }

  return 'border-[var(--app-border)] bg-[var(--app-panel)] text-[var(--app-text-muted)]'
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
    <aside className="min-w-0 rounded-[1.2rem] bg-[var(--app-surface)] p-2 shadow-[var(--shadow-md)] sm:p-2.5">
      <div className="rounded-[1rem] bg-[var(--app-surface-muted)] p-2">
        <div className="mb-4 flex min-w-0 flex-col gap-3 rounded-[0.95rem] bg-[var(--app-panel)] px-3 py-2.5">
          <h3 className="text-[1rem] font-regular text-[var(--app-text)] sm:text-[1.05rem]">
            Respuesta Consulta Rec. Externa
          </h3>
          <div
            className={`flex min-w-0 items-center justify-between gap-3 rounded-[0.8rem] border px-3 py-1.5 text-[1rem] font-regular sm:text-[0.90rem] ${statusClassName}`}
          >
            <span className="shrink-0">Estado:</span>
            <span className="min-w-0 truncate text-right">{visibleStatusCode}</span>
          </div>
        </div>

        <div className="mt-4 min-w-0 overflow-hidden rounded-[0.95rem] bg-[var(--app-panel)]">
          <div className="border-b border-[var(--app-border)] px-2.5 py-1 text-[0.9rem] font-regular text-[var(--app-text-muted)]">
            JSON / resultado
          </div>
          <JsonViewer
            className="line-clamp-[12] max-h-[300px] min-h-[258px] overflow-hidden break-all bg-[var(--app-json-bg)] p-2.5 text-[0.85rem] text-[var(--app-text-muted)]"
            emptyMessage="Ejecuta una consulta para ver la respuesta del backend."
            jsonText={visibleJson}
          />
        </div>

        {isLoading ? (
          <p className="mt-4 rounded-[0.95rem] bg-[var(--app-surface-muted)] p-2.5 text-[0.95rem] text-[var(--app-text-muted)]">
            Consultando backend...
          </p>
        ) : null}
        {!isLoading && error ? (
          <p className="mt-4 rounded-[0.95rem] bg-[var(--app-error-surface)] p-2.5 text-[0.95rem] text-[var(--app-error)]">
            {error.message || 'No fue posible ejecutar la consulta.'}
          </p>
        ) : null}
        {!isLoading && !error && returnUrl ? (
          <div className="mt-4 rounded-[0.8rem] border border-[var(--app-accent)] bg-[var(--app-panel)] p-2">
            <p className="mb-2 text-[0.85rem] font-semibold text-[var(--app-accent)]">
              URL de retorno detectada
            </p>
            <input
              className="mb-3 w-full rounded-[0.55rem] border border-[var(--app-input-border)] bg-[var(--app-input-bg)] px-1.5 py-1 text-[0.85rem] text-[var(--app-input-text)] outline-none"
              readOnly
              value={returnUrl}
            />
            <button
              className="rounded-[var(--radius-sm)] bg-[var(--app-primary)] px-2 py-1 text-[0.9rem] font-semibold text-[var(--app-primary-contrast)] transition hover:bg-[var(--app-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)]"
              onClick={handleOpenReturnUrl}
              type="button"
            >
              Abrir URL de retorno
            </button>
          </div>
        ) : null}
        {!isLoading && codigoPrevStr ? (
          <div className="mt-4 rounded-[0.8rem] border border-[var(--app-primary)] bg-[var(--app-panel)] p-3">
            <p className="mb-3 text-[0.85rem] font-semibold text-[var(--app-primary)]">
              Código de respuesta Previred
            </p>
            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="shrink-0 text-[0.8rem] text-[var(--app-text-muted)]">Código de Error:</span>
                <span className="text-[0.95rem] font-bold text-[var(--app-primary)]">
                  {codigoPrevStr}
                </span>
              </div>
              {codigoPrevInfo ? (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="shrink-0 text-[0.8rem] text-[var(--app-text-muted)]">Motivo del Error:</span>
                    <span className="text-[0.85rem] text-[var(--app-text)]">{codigoPrevInfo.motivo}</span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="shrink-0 text-[0.8rem] text-[var(--app-text-muted)]">Descripción:</span>
                    <span className="text-[0.85rem] text-[var(--app-text)]">{codigoPrevInfo.descripcion}</span>
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
