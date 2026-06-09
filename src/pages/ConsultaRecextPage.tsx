import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import RecextFormSection from '../features/recext/components/RecextFormSection'
import RecextJsonConsultationSection from '../features/recext/components/RecextJsonConsultationSection'
import RecextPasteUserModal from '../features/recext/components/RecextPasteUserModal'
import RecextResponsePanel from '../features/recext/components/RecextResponsePanel'
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
import { useRutValidationQuery } from '../features/recext/hooks/useRutValidationQuery'
import { parsePastedUserJson } from '../features/recext/parsePastedUserJson'
import { validateRutMod11 } from '../features/recext/validateRutMod11'
import { validateApellidoField, validateEmailField, validateNombreField, validateTelefonoField } from '../features/recext/validateFormFields'
import {
  emptyRecextFormValues,
  type RecextConsultationRequest,
  type RecextConsultationError,
  type RecextConsultationFormValues,
  type RecextConsultationResponse,
} from '../features/recext/types'
import ConsultationContextPanel from '../shared/components/layout/ConsultationContextPanel'
import PageHeader from '../shared/components/layout/PageHeader'
import ServiceHelpModal from '../shared/components/layout/ServiceHelpModal'
import { useAfpContext } from '../shared/context/AfpContext'

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
  const { afp } = useAfpContext()
  const [consultationMode, setConsultationMode] =
    useState<RecextConsultationMode>('json')
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false)
  const [isServiceHelpOpen, setIsServiceHelpOpen] = useState(false)
  const [jsonText, setJsonText] = useState('')
  const [jsonErrorMessage, setJsonErrorMessage] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<RecextConsultationFormValues>(
    emptyRecextFormValues,
  )
  const hasRutAndDv = Boolean(formValues.rut.trim() && formValues.dv.trim())
  const isRutMod11Valid = hasRutAndDv && validateRutMod11(formValues.rut, formValues.dv)
  const rutValidation = useRutValidationQuery(
    isRutMod11Valid ? formValues.rut : '',
    isRutMod11Valid ? formValues.dv : '',
  )
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
  const isRutFormatoInvalido = hasRutAndDv && !isRutMod11Valid
  const isRutBloqueado = rutValidation.data?.invalido === true
  const nombresError = validateNombreField(formValues.names)
  const apellidoPaternoError = validateApellidoField(formValues.paternalLastName)
  const apellidoMaternoError = validateApellidoField(formValues.maternalLastName)
  const emailError = validateEmailField(formValues.email)
  const telefonoError = validateTelefonoField(formValues.phone)
  const fieldErrors: Partial<Record<keyof RecextConsultationFormValues, string>> = {}
  if (isRutFormatoInvalido) fieldErrors.dv = 'El dígito verificador no corresponde al RUT ingresado.'
  if (isRutBloqueado) fieldErrors.rut = 'Este RUT se encuentra bloqueado y no puede realizar la consulta.'
  if (nombresError) fieldErrors.names = nombresError
  if (apellidoPaternoError) fieldErrors.paternalLastName = apellidoPaternoError
  if (apellidoMaternoError) fieldErrors.maternalLastName = apellidoMaternoError
  if (emailError) fieldErrors.email = emailError
  if (telefonoError) fieldErrors.phone = telefonoError
  const errorsByField = fieldErrors
  const canSubmit =
    showForm &&
    hasMandatoryFields &&
    isRecextAfpCode(afp) &&
    !isRutFormatoInvalido &&
    !isRutBloqueado &&
    !nombresError &&
    !apellidoPaternoError &&
    !apellidoMaternoError &&
    !emailError &&
    !telefonoError
  const optionsByField = {
    paymentType: [
      { value: 'APV', label: 'APV' },
      { value: 'CUENTA2', label: 'CUENTA2' },
    ],
    sex: [
      { value: 'M', label: 'Masculino' },
      { value: 'F', label: 'Femenino' },
    ],
    nationality: [
      { value: '0', label: 'Chileno' },
      { value: '1', label: 'Extranjero' },
    ],
    workerType: [
      { value: 'dependiente', label: 'Trabajador dependiente' },
      { value: 'independiente', label: 'Trabajador independiente' },
    ],
    taxRegime: formValues.paymentType === 'APV'
      ? [
          { value: 'A', label: 'Régimen A' },
          { value: 'B', label: 'Régimen B' },
        ]
      : formValues.paymentType === 'CUENTA2'
        ? [{ value: 'G', label: 'Régimen General' }]
        : [],
    fundsOrigin: origenesAhorro.map((origen) => ({
      value: String(origen.codOrigenAhorro),
      label: origen.glosa,
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
      ...(name === 'paymentType' ? { taxRegime: '' } : {}),
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

  const getPastedUserFormValues = (payload: Record<string, unknown>) => {
    const nextFormValues = mapPastedUserToFormValues(formValues, payload)
    const missingMandatoryField = mandatoryFields.find(
      ({ name }) => !nextFormValues[name].trim(),
    )

    if (missingMandatoryField) {
      return {
        errorMessage: `El JSON no incluye un valor para el campo obligatorio: ${missingMandatoryField.label}.`,
        values: null,
      }
    }

    return {
      errorMessage: null,
      values: nextFormValues,
    }
  }

  const handlePrefillPastedUserData = (payload: Record<string, unknown>) => {
    const { errorMessage, values } = getPastedUserFormValues(payload)

    if (errorMessage || !values) {
      return errorMessage
    }

    setFormValues(values)

    return null
  }

  const handleLoadPastedUserData = (payload: Record<string, unknown>) => {
    if (!isRecextAfpCode(afp)) {
      return 'Selecciona una AFP antes de cargar y consultar datos.'
    }

    const { errorMessage, values: nextFormValues } =
      getPastedUserFormValues(payload)

    if (errorMessage || !nextFormValues) {
      return errorMessage
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
    <div className="text-[var(--app-text)]">
      <div>
        <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
          <section className="space-y-5">
            <PageHeader
              titleActions={
                <button
                  className="rounded-[var(--radius-sm)] px-1 py-1 text-sm font-semibold text-[var(--app-primary)] transition hover:text-[var(--app-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)]"
                  onClick={() => setIsServiceHelpOpen(true)}
                  type="button"
                >
                  Información del servicio
                </button>
              }
              description="Selecciona la AFP, carga la información del usuario y ejecuta la consulta al backend."
              eyebrow="Servicio"
              title="Recaudación Externa"
            />

            <ConsultationContextPanel />

            <div className="flex justify-stretch sm:justify-start">
              <div className="inline-flex w-full border-b border-[var(--app-border)] sm:w-fit">
                <button
                  className={`flex-1 border-b-2 px-3 py-2 text-[0.95rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)] sm:flex-none ${
                    consultationMode === 'json'
                      ? 'border-[var(--color-secondary)] text-[var(--color-secondary)]'
                      : 'border-transparent text-[var(--app-tab-inactive)] hover:text-[var(--color-secondary-hover)]'
                  }`}
                  onClick={() => handleModeChange('json')}
                  type="button"
                >
                  Pegar JSON
                </button>
                <button
                  className={`flex-1 border-b-2 px-3 py-2 text-[0.95rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)] sm:flex-none ${
                    consultationMode === 'manual'
                      ? 'border-[var(--color-secondary)] text-[var(--color-secondary)]'
                      : 'border-transparent text-[var(--app-tab-inactive)] hover:text-[var(--color-secondary-hover)]'
                  }`}
                  onClick={() => handleModeChange('manual')}
                  type="button"
                >
                  Ingreso manual
                </button>
              </div>
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
                errorsByField={errorsByField}
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
        onLoadUserData={handlePrefillPastedUserData}
      />

      <ServiceHelpModal
        flowSteps={stepsByMode[consultationMode]}
        infoContent={
          <p>
            Recaudación Externa, también conocida como <em>Botón Embebido</em> o{' '}
            <em>Depósitos Directos</em>, corresponde a una aplicación de Previred
            que actúa como <em>una extensión de las instituciones previsionales</em>,
            permitiendo que sus clientes realicen pagos de <em>APV</em> y/o{' '}
            <em>Cuenta 2</em> directamente desde el sitio web de cada AFP. Esto se
            logra mediante la integración de una página de Previred embebida en el
            flujo de pago de la institución, asegurando una{' '}
            <em>experiencia fluida para el usuario final</em> sin que este deba
            abandonar el sitio de su AFP.
          </p>
        }
        isOpen={isServiceHelpOpen}
        onClose={() => setIsServiceHelpOpen(false)}
        serviceName="Recaudación Externa"
      />
    </div>
  )
}

export default ConsultaRecextPage
