import ResponsePanel from '../../../shared/components/feedback/ResponsePanel'
import type { ApiConsultasStatus } from '../types'

interface ApiConsultasResponsePanelProps {
  data?: unknown
  status: ApiConsultasStatus
}

const statusLabels: Record<ApiConsultasStatus, string> = {
  idle: 'Pendiente',
  loading: 'Consultando',
  success: 'OK',
  error: 'Error',
}

function ApiConsultasResponsePanel({
  data,
  status,
}: ApiConsultasResponsePanelProps) {
  return (
    <ResponsePanel
      className="min-h-[360px] border border-white/5 bg-[#25232d]"
      data={data}
      emptyMessage="Selecciona un tipo de consulta y completa el formulario para ejecutar la consulta."
      status={status}
      statusLabel={statusLabels[status]}
      title="Respuesta API Consultas"
    />
  )
}

export default ApiConsultasResponsePanel
