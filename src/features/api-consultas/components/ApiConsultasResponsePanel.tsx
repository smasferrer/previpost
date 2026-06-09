import ResponsePanel from '../../../shared/components/feedback/ResponsePanel'
import JsonViewer from '../../../shared/components/feedback/JsonViewer'
import type {
  ApiConsultaResponse,
  ApiConsultaTransaccion,
  ApiConsultasStatus,
  ApiConsultasType,
} from '../types'

interface ApiConsultasResponsePanelProps {
  data?: ApiConsultaResponse
  status: ApiConsultasStatus
  selectedType: ApiConsultasType
}

const statusLabels: Record<ApiConsultasStatus, string> = {
  idle: 'Pendiente',
  loading: 'Consultando',
  success: 'OK',
  error: 'Error',
}

const noRecordsMessage = 'No existe registros para esa consulta.'

const formatTransactionDetail = (transaction: ApiConsultaTransaccion) =>
  JSON.stringify(transaction, null, 2)

const getTransactionHeader = (transaction: ApiConsultaTransaccion) =>
  transaction.idTransaccion || 'ID de transacción no informado'

const buildTransactionDescription = (transaction: ApiConsultaTransaccion) => {
  const rut = transaction.rut && transaction.dv ? `${transaction.rut}-${transaction.dv}` : null
  const estado = transaction.glosaEstadoTransaccion || transaction.estadoTransaccion

  return [rut, estado, transaction.monto ? `$${transaction.monto}` : null]
    .filter(Boolean)
    .join(' · ')
}

function TransactionListResponseContent({
  data,
}: {
  data: ApiConsultaResponse
}) {
  if (!data.datos.length) {
    return (
      <div className="rounded-[0.3rem] border border-[var(--app-border)] bg-[var(--app-panel)] p-3 text-[var(--app-text-muted)]">
        {noRecordsMessage}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-[0.3rem] border border-[var(--app-border)] bg-[var(--app-panel)] px-3 py-2">
        <span className="text-[0.85rem] text-[var(--app-text-muted)]">
          Total registros
        </span>
        <span className="text-[0.95rem] font-semibold text-[var(--app-text)]">
          {data.totalRegistros}
        </span>
      </div>

      <div className="space-y-2">
        {data.datos.map((transaction, index) => (
          <details
            className="group overflow-hidden rounded-[0.3rem] border border-[var(--app-border)] bg-[var(--app-panel)] [&_summary::-webkit-details-marker]:hidden"
            key={`${transaction.idTransaccion || 'transaccion'}-${index}`}
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-3 py-2 transition hover:bg-[var(--app-surface-muted)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--app-focus-ring)]">
              <span className="min-w-0 flex-1">
                <span className="block text-[0.78rem] font-semibold uppercase text-[var(--app-text-muted)]">
                  ID transacción
                </span>
                <span className="block break-all text-[0.95rem] font-semibold text-[var(--app-primary)]">
                  {getTransactionHeader(transaction)}
                </span>
                {buildTransactionDescription(transaction) ? (
                  <span className="block text-[0.82rem] text-[var(--app-text-muted)]">
                    {buildTransactionDescription(transaction)}
                  </span>
                ) : null}
              </span>
              <svg
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-[var(--app-text-muted)] transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </summary>
            <JsonViewer
              className="max-h-[340px] border-t border-[var(--app-border)] bg-[var(--app-json-bg)] p-3 text-[0.82rem] text-[var(--app-text-muted)]"
              jsonText={formatTransactionDetail(transaction)}
            />
          </details>
        ))}
      </div>
    </div>
  )
}

function ApiConsultasResponsePanel({
  data,
  selectedType,
  status,
}: ApiConsultasResponsePanelProps) {
  const shouldShowTransactionListView =
    (selectedType === 'rut' ||
      selectedType === 'transacciones-dia' ||
      selectedType === 'token') &&
    status === 'success' &&
    data

  return (
    <ResponsePanel
      className="min-h-[360px] min-w-0 max-w-full border border-[var(--app-border)] bg-[var(--app-surface)]"
      content={
        shouldShowTransactionListView ? (
          <TransactionListResponseContent data={data} />
        ) : undefined
      }
      data={data}
      emptyMessage="Selecciona un tipo de consulta y completa el formulario para ejecutar la consulta."
      status={status}
      statusLabel={statusLabels[status]}
      title="Respuesta API Consultas"
    />
  )
}

export default ApiConsultasResponsePanel
