import Button from '../../../shared/components/ui/Button'
import Card from '../../../shared/components/ui/Card'

interface ConsultaTransaccionesDiaFormProps {
  errorMessage?: string | null
  fecha: string
  isSubmitting: boolean
  onFechaChange: (value: string) => void
  onSubmit: () => void
}

function ConsultaTransaccionesDiaForm({
  errorMessage,
  fecha,
  isSubmitting,
  onFechaChange,
  onSubmit,
}: ConsultaTransaccionesDiaFormProps) {
  return (
    <Card as="section" className="border-[var(--app-border)] bg-[var(--app-surface)]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[1.25rem] font-semibold text-[var(--app-text)]">
            Transacciones por día
          </h2>
          <p className="mt-1 text-[0.95rem] text-[var(--app-text-muted)]">
            Selecciona una fecha para preparar la consulta diaria.
          </p>
        </div>
        <Button isLoading={isSubmitting} loadingLabel="Preparando..." onClick={onSubmit}>
          Preparar consulta
        </Button>
      </div>

      <label className="block max-w-xl">
        <span className="mb-2 block text-[0.9rem] font-semibold text-[var(--app-text)]">
          Fecha
        </span>
        <input
          className="w-full rounded-[var(--radius-sm)] border border-[var(--app-input-border)] bg-[var(--app-input-bg)] px-3 py-2 text-[1rem] text-[var(--app-input-text)] outline-none transition focus:border-[var(--app-accent)] focus:ring-2 focus:ring-[var(--app-focus-ring)]"
          onChange={(event) => onFechaChange(event.target.value)}
          type="date"
          value={fecha}
        />
      </label>

      {errorMessage ? (
        <p className="mt-3 rounded-[0.75rem] border border-[var(--app-error)] bg-[var(--app-error-surface)] px-3 py-2 text-[0.9rem] text-[var(--app-error)]">
          {errorMessage}
        </p>
      ) : null}
    </Card>
  )
}

export default ConsultaTransaccionesDiaForm
