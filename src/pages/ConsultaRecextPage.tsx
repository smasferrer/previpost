import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import RecextFormSection from '../features/recext/components/RecextFormSection'
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
import {
  initialRecextFormValues,
  type RecextConsultationRequest,
  type RecextConsultationError,
  type RecextConsultationFormValues,
  type RecextConsultationResponse,
} from '../features/recext/types'
import { appPaths } from '../router/paths'

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
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false)
  const [formValues, setFormValues] = useState<RecextConsultationFormValues>(
    initialRecextFormValues,
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

  return (
    <main className="min-h-screen bg-[#1c1a22] px-4 py-6 text-[#f3f1e9] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1920px]">
        <RecextPageHeader />

        <div className="grid gap-5 xl:grid-cols-[1.03fr_0.97fr]">
          <section className="space-y-5">
            <RecextToolbar
              afp={afp}
              afpOptions={afpOptions}
              isLoading={isLoading}
              isError={isError}
              onAfpChange={setAfp}
              onSelectApiConsultas={() => navigate(appPaths.apiConsultas)}
            />

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
