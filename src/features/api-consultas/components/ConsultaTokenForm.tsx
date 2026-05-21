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
    <Card as="section" className="border-white/5 bg-[#1c1c1c]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[1.25rem] font-semibold text-[#f3f1e9]">
            Consulta por token
          </h2>
          <p className="mt-1 text-[0.95rem] text-[#96959a]">
            Ingresa el token asociado a la consulta.
          </p>
        </div>
        <Button isLoading={isSubmitting} loadingLabel="Preparando..." onClick={onSubmit}>
          Preparar consulta
        </Button>
      </div>

      <Textarea
        className="min-h-[180px] border-white/10 bg-[#111015] font-mono text-[#f3f1e9]"
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
