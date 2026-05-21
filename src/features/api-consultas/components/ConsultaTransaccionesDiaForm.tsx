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
    <Card as="section" className="border-white/5 bg-[#1c1c1c]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[1.25rem] font-semibold text-[#f3f1e9]">
            Transacciones por día
          </h2>
          <p className="mt-1 text-[0.95rem] text-[#96959a]">
            Selecciona una fecha para preparar la consulta diaria.
          </p>
        </div>
        <Button isLoading={isSubmitting} loadingLabel="Preparando..." onClick={onSubmit}>
          Preparar consulta
        </Button>
      </div>

      <label className="block max-w-xl">
        <span className="mb-2 block text-[0.9rem] font-semibold text-[#f3f1e9]">
          Fecha
        </span>
        <input
          className="w-full rounded-[0.75rem] border border-white/10 bg-[#111015] px-3 py-2 text-[1rem] text-[#f3f1e9] outline-none transition focus:border-[#02d3ff] focus:ring-2 focus:ring-[#02d3ff]/30"
          onChange={(event) => onFechaChange(event.target.value)}
          type="date"
          value={fecha}
        />
      </label>

      {errorMessage ? (
        <p className="mt-3 rounded-[0.75rem] border border-[#f79b63]/40 bg-[#2b1712] px-3 py-2 text-[0.9rem] text-[#ffb28b]">
          {errorMessage}
        </p>
      ) : null}
    </Card>
  )
}

export default ConsultaTransaccionesDiaForm
