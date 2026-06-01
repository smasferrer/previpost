import { useAfpContext } from '../../context/AfpContext'
import AppSelect from '../ui/AppSelect'
import Card from '../ui/Card'

interface ConsultationContextPanelProps {
  allowedAfps?: string[]
  className?: string
}

function ConsultationContextPanel({
  allowedAfps,
  className = '',
}: ConsultationContextPanelProps) {
  const { afp, afpOptions, isAfpError, isLoadingAfps, setAfp } = useAfpContext()

  const visibleOptions = allowedAfps
    ? afpOptions.filter((option) => allowedAfps.includes(option.value))
    : afpOptions

  return (
    <Card
      as="section"
      className={`grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(220px,300px)] sm:items-end ${className}`}
    >
      <div>
        <p className="text-[0.95rem] font-semibold text-[var(--app-primary)]">
          Contexto de consulta
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--app-text-muted)]">
          La AFP seleccionada se usará para ejecutar las consultas de este módulo.
        </p>
      </div>

      <AppSelect
        disabled={isLoadingAfps || isAfpError}
        errorMessage={isAfpError ? 'Reintenta recargando la pagina.' : null}
        label="AFP activa"
        onChange={setAfp}
        options={visibleOptions.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
        placeholder={
          isLoadingAfps
            ? 'Cargando AFP...'
            : isAfpError
              ? 'No fue posible cargar AFP'
              : 'Selecciona una AFP'
        }
        value={afp}
      />
    </Card>
  )
}

export default ConsultationContextPanel
