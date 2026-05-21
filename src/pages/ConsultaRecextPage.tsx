import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import RecextFormSection from '../features/recext/components/RecextFormSection'
import RecextJsonConsultationSection from '../features/recext/components/RecextJsonConsultationSection'
import RecextPageHeader from '../features/recext/components/RecextPageHeader'
import RecextPasteUserModal from '../features/recext/components/RecextPasteUserModal'
import RecextResponsePanel from '../features/recext/components/RecextResponsePanel'
import RecextToolbar from '../features/recext/components/RecextToolbar'
import {
  getCiudadesByRegion,
  getComunasByCiudad,
  getOrigenesAhorro,
  getRegiones,
  submitRecextConsultation,
} from '../features/recext/api/recextService'
import {
  buildRecextRequest,
  isRecextAfpCode,
} from '../features/recext/buildRecextRequest'
import { mandatoryFields } from '../features/recext/formFields'
import { useRecextAfpOptionsQuery } from '../features/recext/hooks/useRecextAfpOptionsQuery'
import { parsePastedUserJson } from '../features/recext/parsePastedUserJson'
import {
  emptyRecextFormValues,
  type RecextConsultationRequest,
  type RecextConsultationError,
  type RecextConsultationFormValues,
  type RecextConsultationResponse,
} from '../features/recext/types'
import { appPaths } from '../router/paths'

type RecextConsultationMode = 'json' | 'manual'

interface RecextStep {
  description: string
  title: string
}

const stepsByMode: Record<RecextConsultationMode, RecextStep[]> = {
  json: [
    {
      title: 'Paso 1: Seleccionar AFP',
      description:
        'La AFP define las credenciales y el código que se enviará en la consulta.',
    },
    {
      title: 'Paso 2: Pegar JSON',
      description: 'Usa el JSON armado con la información del usuario.',
    },
    {
      title: 'Paso 3: Ejecutar consulta',
      description: 'Validamos el JSON y enviamos el request al backend.',
    },
  ],
  manual: [
    {
      title: 'Paso 1: Seleccionar AFP',
      description:
        'La AFP sigue siendo necesaria para construir la consulta.',
    },
    {
      title: 'Paso 2: Completar campos',
      description: 'Ingresa manualmente los datos obligatorios del usuario.',
    },
    {
      title: 'Paso 3: Ejecutar consulta',
      description: 'El formulario manual usa el request actual de Rec. Externa.',
    },
  ],
}

const stringifyPastedValue = (value: unknown) => {
  if (value === undefined || value === null) {
    return ''
  }

  return String(value)
}

const mapPastedUserToFormValues = (
  currentValues: RecextConsultationFormValues,
  payload: Record<string, unknown>,
): RecextConsultationFormValues => ({
  ...currentValues,
  rut: stringifyPastedValue(payload.rut),
  dv: stringifyPastedValue(payload.dv),
  names: stringifyPastedValue(payload.nombres),
  paternalLastName: stringifyPastedValue(payload.apellidoP),
  maternalLastName: stringifyPastedValue(payload.apellidoM),
  email: stringifyPastedValue(payload.email),
  returnUrl: stringifyPastedValue(payload.urlRetorno),
  paymentType: stringifyPastedValue(payload.tipoPago),
  sex: stringifyPastedValue(payload.sexo),
  phone: stringifyPastedValue(payload.telefono),
  nationality: stringifyPastedValue(payload.nacionalidad),
  workerType: stringifyPastedValue(payload.tipoTrabajador),
  taxRegime: stringifyPastedValue(payload.regimenTributario),
  totalPayment: stringifyPastedValue(payload.totalPago),
  fundsOrigin: stringifyPastedValue(payload.origenFondos),
  commune: stringifyPastedValue(payload.comuna),
  city: stringifyPastedValue(payload.ciudad),
  region: stringifyPastedValue(payload.region),
})

function ConsultaRecextPage() {
  const navigate = useNavigate()
  const [afp, setAfp] = useState('')
  const [consultationMode, setConsultationMode] =
    useState<RecextConsultationMode>('json')
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false)
  const [jsonText, setJsonText] = useState('')
  const [jsonErrorMessage, setJsonErrorMessage] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<RecextConsultationFormValues>(
    emptyRecextFormValues,
  )
  const { data: afpOptions = [], isLoading, isError } = useRecextAfpOptionsQuery()
  const { data: regiones = [] } = useQuery({
    queryKey: ['recext', 'regiones'],
    queryFn: getRegiones,
  })
  const { data: origenesAhorro = [] } = useQuery({
    queryKey: ['recext', 'origenes-ahorro'],
    queryFn: getOrigenesAhorro,
  })
  const { data: ciudades = [] } = useQuery({
    queryKey: ['recext', 'ciudades', formValues.region],
    queryFn: () => getCiudadesByRegion(formValues.region),
    enabled: Boolean(formValues.region),
  })
  const { data: comunas = [] } = useQuery({
    queryKey: ['recext', 'comunas', formValues.city],
    queryFn: () => getComunasByCiudad(formValues.city),
    enabled: Boolean(formValues.city),
  })
  const consultationMutation = useMutation<
    RecextConsultationResponse,
    RecextConsultationError,
    RecextConsultationRequest
  >({
    mutationFn: submitRecextConsultation,
  })

  const showForm = afp !== ''
  const hasMandatoryFields = mandatoryFields.every(({ name }) =>
    formValues[name].trim(),
  )
  const canSubmit = showForm && hasMandatoryFields && isRecextAfpCode(afp)
  const optionsByField = {
    fundsOrigin: origenesAhorro.map((origen) => ({
      value: String(origen.codOrigenAhorro),
      label: `${origen.glosa} (${origen.codOrigenAhorro})`,
    })),
    region: regiones.map((region) => ({
      value: String(region.codRegion),
      label: `${region.glosa} (${region.codRegion})`,
    })),
    city: ciudades.map((ciudad) => ({
      value: String(ciudad.codCiudad),
      label: `${ciudad.glosa} (${ciudad.codCiudad})`,
    })),
    commune: comunas.map((comuna) => ({
      value: String(comuna.codComuna),
      label: `${comuna.glosa} (${comuna.codComuna})`,
    })),
  }
  const responseStatusLabel = consultationMutation.isPending
    ? 'Consultando'
    : consultationMutation.isError
      ? 'Error'
      : consultationMutation.isSuccess
        ? 'OK'
        : 'Estado'

  const handleFieldChange = (
    name: keyof RecextConsultationFormValues,
    value: string,
  ) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
      ...(name === 'region' ? { city: '', commune: '' } : {}),
      ...(name === 'city' ? { commune: '' } : {}),
    }))
  }

  const handleSubmit = () => {
    if (!canSubmit) {
      return
    }

    if (!isRecextAfpCode(afp)) {
      return
    }

    consultationMutation.mutate(buildRecextRequest(formValues, afp))
  }

  const handleLoadPastedUserData = (payload: Record<string, unknown>) => {
    if (!isRecextAfpCode(afp)) {
      return 'Selecciona una AFP antes de cargar y consultar datos.'
    }

    const nextFormValues = mapPastedUserToFormValues(formValues, payload)
    const missingMandatoryField = mandatoryFields.find(
      ({ name }) => !nextFormValues[name].trim(),
    )

    if (missingMandatoryField) {
      return `El JSON no incluye un valor para el campo obligatorio: ${missingMandatoryField.label}.`
    }

    setFormValues(nextFormValues)
    consultationMutation.mutate(buildRecextRequest(nextFormValues, afp))

    return null
  }

  const handleJsonTextChange = (value: string) => {
    setJsonText(value)
    setJsonErrorMessage(null)
  }

  const handleJsonSubmit = () => {
    const parseResult = parsePastedUserJson(jsonText)

    if (!parseResult.success) {
      setJsonErrorMessage(parseResult.errorMessage)
      return
    }

    const loadError = handleLoadPastedUserData(parseResult.payload)

    if (loadError) {
      setJsonErrorMessage(loadError)
      return
    }

    setJsonErrorMessage(null)
  }

  const handleModeChange = (nextMode: RecextConsultationMode) => {
    setConsultationMode(nextMode)

    if (nextMode === 'manual') {
      setFormValues(emptyRecextFormValues)
    }
  }

  return (
    <main className="min-h-screen bg-[#1c1a22] px-2 py-3 text-[#f3f1e9] sm:px-3 lg:px-4">
      <div className="mx-auto max-w-[1920px]">
        <RecextPageHeader />

        <div className="grid gap-5 xl:grid-cols-[7fr_3fr]">
          <section className="space-y-5">
            <RecextToolbar
              afp={afp}
              afpOptions={afpOptions}
              isLoading={isLoading}
              isError={isError}
              onAfpChange={setAfp}
              onSelectApiConsultas={() => navigate(appPaths.apiConsultas)}
            />

            <div className="rounded-[1rem] border border-white/5 bg-[#111015] p-3">
              <p className="mb-3 text-[0.95rem] font-semibold text-[#f79b63]">
                Flujo de consulta
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {stepsByMode[consultationMode].map((step) => (
                  <div
                    className="rounded-[0.75rem] border border-white/5 bg-[#1b1a22] p-3"
                    key={step.title}
                  >
                    <p className="text-[0.9rem] font-semibold text-[#f3f1e9]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[0.85rem] leading-relaxed text-[#96959a]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="inline-flex rounded-[0.85rem] bg-[#111015] p-1">
              <button
                className={`rounded-[0.65rem] px-3 py-1.5 text-[0.95rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#02d3ff]/50 ${
                  consultationMode === 'json'
                    ? 'bg-[#f79b63] text-[#111015]'
                    : 'text-[#96959a] hover:text-[#f3f1e9]'
                }`}
                onClick={() => handleModeChange('json')}
                type="button"
              >
                Pegar JSON
              </button>
              <button
                className={`rounded-[0.65rem] px-3 py-1.5 text-[0.95rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#02d3ff]/50 ${
                  consultationMode === 'manual'
                    ? 'bg-[#f79b63] text-[#111015]'
                    : 'text-[#96959a] hover:text-[#f3f1e9]'
                }`}
                onClick={() => handleModeChange('manual')}
                type="button"
              >
                Ingreso manual
              </button>
            </div>

            {consultationMode === 'json' ? (
              <RecextJsonConsultationSection
                errorMessage={jsonErrorMessage}
                hasSelectedAfp={isRecextAfpCode(afp)}
                isSubmitting={consultationMutation.isPending}
                jsonText={jsonText}
                onJsonTextChange={handleJsonTextChange}
                onSubmit={handleJsonSubmit}
              />
            ) : (
              <RecextFormSection
                showForm={showForm}
                values={formValues}
                optionsByField={optionsByField}
                canSubmit={canSubmit}
                isSubmitting={consultationMutation.isPending}
                onFieldChange={handleFieldChange}
                onPasteUserClick={() => setIsPasteModalOpen(true)}
                onSubmit={handleSubmit}
              />
            )}
          </section>

          <RecextResponsePanel
            error={consultationMutation.error}
            isLoading={consultationMutation.isPending}
            response={consultationMutation.data}
            statusLabel={responseStatusLabel}
          />
        </div>
      </div>

      <RecextPasteUserModal
        isOpen={isPasteModalOpen}
        isSubmitting={consultationMutation.isPending}
        onCancel={() => setIsPasteModalOpen(false)}
        onLoadUserData={handleLoadPastedUserData}
      />
    </main>
  )
}

export default ConsultaRecextPage
