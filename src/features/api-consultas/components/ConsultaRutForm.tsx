import Button from '../../../shared/components/ui/Button'
import Card from '../../../shared/components/ui/Card'

interface ConsultaRutFormProps {
  errorMessage?: string | null
  isSubmitting: boolean
  onRutChange: (value: string) => void
  onSubmit: () => void
  rut: string
}

function ConsultaRutForm({
  errorMessage,
  isSubmitting,
  onRutChange,
  onSubmit,
  rut,
}: ConsultaRutFormProps) {
  return (
    <Card as="section" className="border-white/5 bg-[#1c1c1c]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[1.25rem] font-semibold text-[#f3f1e9]">
            Consulta por RUT
          </h2>
          <p className="mt-1 text-[0.95rem] text-[#96959a]">
            Ingresa el RUT sin puntos, guión ni dígito verificador para preparar la consulta.
          </p>
        </div>
        <Button isLoading={isSubmitting} loadingLabel="Preparando..." onClick={onSubmit}>
          Preparar consulta
        </Button>
      </div>

      <label className="block max-w-xl">
        <span className="mb-2 block text-[0.9rem] font-semibold text-[#f3f1e9]">
          RUT
        </span>
        <input
          className="w-full rounded-[0.75rem] border border-white/10 bg-[#111015] px-3 py-2 text-[1rem] text-[#f3f1e9] outline-none transition placeholder:text-[#6a666f] focus:border-[#02d3ff] focus:ring-2 focus:ring-[#02d3ff]/30"
          onChange={(event) => onRutChange(event.target.value)}
          placeholder="Ej: 12345678"
          type="text"
          value={rut}
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

export default ConsultaRutForm
