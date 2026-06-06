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
      className="min-h-[620px] border-[var(--app-border)] bg-[var(--app-surface)] px-2.5 py-3 sm:px-4 sm:py-4"
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[1.25rem] font-semibold text-[var(--app-text)]">
            Pegar JSON
          </h2>
          <p className="mt-1 max-w-2xl text-[0.95rem] text-[var(--app-text-muted)]">
            Pega la información del usuario y ejecuta la consulta sin completar
            el formulario manual.
          </p>
          <p className="mt-2 max-w-2xl rounded-[0.75rem] border border-[var(--app-accent)] bg-[var(--app-info-surface)] px-3 py-2 text-[0.9rem] text-[var(--app-info)]">
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
        className="min-h-[420px] resize-y border-[var(--app-input-border)] bg-[var(--app-input-bg)] text-[0.95rem] leading-relaxed text-[var(--app-json-value)]"
        error={errorMessage ?? undefined}
        label="Información del usuario"
        onChange={(event) => onJsonTextChange(event.target.value)}
        placeholder='{"rut":"1583677","dv":"K","nombres":"JUAN JOSE","apellidoP":"PEREZ"}'
        value={jsonText}
      />

      {!hasSelectedAfp ? (
        <p className="mt-3 rounded-[0.75rem] border border-[var(--app-warning)] bg-[var(--app-warning-surface)] px-3 py-2 text-[0.9rem] text-[var(--app-warning)]">
          Selecciona una AFP en el paso 1 para habilitar la ejecución.
        </p>
      ) : null}
    </Card>
  )
}

export default RecextJsonConsultationSection
