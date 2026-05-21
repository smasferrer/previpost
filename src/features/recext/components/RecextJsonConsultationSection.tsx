import Button from '../../../shared/components/ui/Button'
import Card from '../../../shared/components/ui/Card'
import Textarea from '../../../shared/components/ui/Textarea'

interface RecextJsonConsultationSectionProps {
  errorMessage?: string | null
  hasSelectedAfp: boolean
  isSubmitting: boolean
  jsonText: string
  onJsonTextChange: (value: string) => void
  onSubmit: () => void
}

function RecextJsonConsultationSection({
  errorMessage,
  hasSelectedAfp,
  isSubmitting,
  jsonText,
  onJsonTextChange,
  onSubmit,
}: RecextJsonConsultationSectionProps) {
  const isSubmitDisabled = isSubmitting || !hasSelectedAfp || !jsonText.trim()

  return (
    <Card
      as="section"
      className="min-h-[620px] border-white/5 bg-[#1c1c1c] px-2.5 py-3 sm:px-4 sm:py-4"
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[1.25rem] font-semibold text-[#f3f1e9]">
            Pegar JSON
          </h2>
          <p className="mt-1 max-w-2xl text-[0.95rem] text-[#96959a]">
            Pega la información del usuario y ejecuta la consulta sin completar
            el formulario manual.
          </p>
          <p className="mt-2 max-w-2xl rounded-[0.75rem] border border-[#02d3ff]/20 bg-[#10242b] px-3 py-2 text-[0.9rem] text-[#7ce8ff]">
            La AFP seleccionada se usa para construir la consulta y aplicar sus
            credenciales asociadas.
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          disabled={isSubmitDisabled}
          isLoading={isSubmitting}
          loadingLabel="Consultando..."
          onClick={onSubmit}
        >
          Validar y ejecutar
        </Button>
      </div>

      <Textarea
        className="min-h-[420px] resize-y border-white/10 bg-[#111015] font-mono text-[0.95rem] leading-relaxed text-[#ffa36f]"
        error={errorMessage ?? undefined}
        label="Información del usuario"
        onChange={(event) => onJsonTextChange(event.target.value)}
        placeholder='{"rut":"1583677","dv":"K","nombres":"JUAN JOSE","apellidoP":"PEREZ"}'
        value={jsonText}
      />

      {!hasSelectedAfp ? (
        <p className="mt-3 rounded-[0.75rem] border border-[#ffe08a]/30 bg-[#292312] px-3 py-2 text-[0.9rem] text-[#ffe08a]">
          Selecciona una AFP en el paso 1 para habilitar la ejecución.
        </p>
      ) : null}
    </Card>
  )
}

export default RecextJsonConsultationSection
