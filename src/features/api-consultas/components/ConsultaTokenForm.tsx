import Button from '../../../shared/components/ui/Button'
import Card from '../../../shared/components/ui/Card'
import Textarea from '../../../shared/components/ui/Textarea'

interface ConsultaTokenFormProps {
  errorMessage?: string | null
  isSubmitting: boolean
  onSubmit: () => void
  onTokenChange: (value: string) => void
  token: string
}

function ConsultaTokenForm({
  errorMessage,
  isSubmitting,
  onSubmit,
  onTokenChange,
  token,
}: ConsultaTokenFormProps) {
  return (
    <Card as="section" className="border-[var(--app-border)] bg-[var(--app-surface)]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[1.25rem] font-semibold text-[var(--app-text)]">
            Consulta por token
          </h2>
          <p className="mt-1 text-[0.95rem] text-[var(--app-text-muted)]">
            Ingresa el token asociado a la consulta.
          </p>
        </div>
        <Button isLoading={isSubmitting} loadingLabel="Preparando..." onClick={onSubmit}>
          Preparar consulta
        </Button>
      </div>

      <Textarea
        className="min-h-[180px] border-[var(--app-input-border)] bg-[var(--app-input-bg)] font-mono text-[var(--app-input-text)]"
        error={errorMessage ?? undefined}
        label="Token"
        onChange={(event) => onTokenChange(event.target.value)}
        placeholder="Pega el token de consulta"
        value={token}
      />
    </Card>
  )
}

export default ConsultaTokenForm
