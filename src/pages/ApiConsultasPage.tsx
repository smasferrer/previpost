import { useState } from 'react'
import { useSearchParams } from 'react-router'
import {
  executeConsultaRut,
  executeConsultaToken,
  executeConsultaTransaccionesDia,
} from '../features/api-consultas/api/apiConsultasService'
import ApiConsultasResponsePanel from '../features/api-consultas/components/ApiConsultasResponsePanel'
import ApiConsultasTypeSelector from '../features/api-consultas/components/ApiConsultasTypeSelector'
import ConsultaRutForm from '../features/api-consultas/components/ConsultaRutForm'
import ConsultaTokenForm from '../features/api-consultas/components/ConsultaTokenForm'
import ConsultaTransaccionesDiaForm from '../features/api-consultas/components/ConsultaTransaccionesDiaForm'
import type {
  ApiConsultaResponse,
  ApiConsultasStatus,
  ApiConsultasType,
} from '../features/api-consultas/types'
import {
  buildConsultaRutRequest,
  buildConsultaTokenRequest,
  buildConsultaTransaccionesDiaRequest,
} from '../features/api-consultas/utils/buildApiConsultasPayload'
import PageHeader from '../shared/components/layout/PageHeader'
import ConsultationContextPanel from '../shared/components/layout/ConsultationContextPanel'
import ServiceHelpModal from '../shared/components/layout/ServiceHelpModal'
import { useAfpContext } from '../shared/context/AfpContext'

type ApiConsultasErrors = Partial<Record<ApiConsultasType, string>>

const getApiConsultasType = (value: string | null): ApiConsultasType | null => {
  if (value === 'rut' || value === 'transacciones-dia' || value === 'token') {
    return value
  }

  return null
}

const apiConsultasFlowSteps = [
  {
    title: 'Paso 1: Seleccionar tipo de consulta',
    description: 'Elige si la búsqueda será por RUT, por transacciones del día o por Token.',
  },
  {
    title: 'Paso 2: Seleccionar AFP',
    description: 'Actualmente API Consultas se encuentra habilitada exclusivamente para Cuprum.',
  },
  {
    title: 'Paso 3: Ingresar parámetros',
    description: 'Completa el RUT, la fecha o el token según el tipo de consulta seleccionado.',
  },
  {
    title: 'Paso 4: Ejecutar consulta',
    description: 'El backend obtiene un token de sesión y consulta la API externa con la credencial configurada.',
  },
]

function ApiConsultasPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedType = getApiConsultasType(searchParams.get('tipo')) ?? 'rut'
  const { afp } = useAfpContext()
  const [isServiceHelpOpen, setIsServiceHelpOpen] = useState(false)
  const [rut, setRut] = useState('')
  const [fecha, setFecha] = useState('')
  const [token, setToken] = useState('')
  const [errors, setErrors] = useState<ApiConsultasErrors>({})
  const [afpErrorMessage, setAfpErrorMessage] = useState<string | null>(null)
  const [responseStatus, setResponseStatus] = useState<ApiConsultasStatus>('idle')
  const [responseData, setResponseData] = useState<ApiConsultaResponse>()

  const setFieldError = (message: string) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [selectedType]: message,
    }))
    setResponseStatus('error')
    setResponseData(undefined)
  }

  const clearSelectedError = () => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [selectedType]: undefined,
    }))
  }

  const handleTypeChange = (type: ApiConsultasType) => {
    setResponseStatus('idle')
    setResponseData(undefined)
    setSearchParams({ tipo: type })
  }

  const handleSubmit = async () => {
    clearSelectedError()
    setResponseStatus('loading')

    if (!afp) {
      setAfpErrorMessage('Selecciona una AFP antes de ejecutar la consulta.')
      setResponseStatus('error')
      setResponseData(undefined)
      return
    }

    setAfpErrorMessage(null)

    if (selectedType === 'rut') {
      if (!rut.trim()) {
        setFieldError('Ingresa un RUT antes de ejecutar la consulta.')
        return
      }

      try {
        const response = await executeConsultaRut(
          buildConsultaRutRequest(afp, { rut: rut.trim() }),
        )

        setResponseData(response)
        setResponseStatus('success')
      } catch (error) {
        setResponseData(error as ApiConsultaResponse)
        setResponseStatus('error')
      }
      return
    }

    if (selectedType === 'transacciones-dia') {
      if (!fecha.trim()) {
        setFieldError('Selecciona una fecha antes de ejecutar la consulta.')
        return
      }

      try {
        const response = await executeConsultaTransaccionesDia(
          buildConsultaTransaccionesDiaRequest(afp, { fecha: fecha.trim() }),
        )

        setResponseData(response)
        setResponseStatus('success')
      } catch (error) {
        setResponseData(error as ApiConsultaResponse)
        setResponseStatus('error')
      }
      return
    }

    if (!token.trim()) {
      setFieldError('Ingresa un token antes de ejecutar la consulta.')
      return
    }

    try {
      const response = await executeConsultaToken(
        buildConsultaTokenRequest(afp, { token: token.trim() }),
      )

      setResponseData(response)
      setResponseStatus('success')
    } catch (error) {
      setResponseData(error as ApiConsultaResponse)
      setResponseStatus('error')
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
              description="Selecciona el tipo de consulta, completa los datos mínimos y ejecuta la llamada al backend."
              eyebrow="Servicio"
              title="API Consultas"
            />

            <ConsultationContextPanel allowedAfps={['cuprum']} />

            {afpErrorMessage ? (
              <p className="rounded-[0.75rem] border border-[var(--app-error)] bg-[var(--app-error-surface)] px-3 py-2 text-[0.9rem] text-[var(--app-error)]">
                {afpErrorMessage}
              </p>
            ) : null}

            <ApiConsultasTypeSelector
              selectedType={selectedType}
              onSelectType={handleTypeChange}
            />

            {selectedType === 'rut' ? (
              <ConsultaRutForm
                errorMessage={errors.rut}
                isSubmitting={responseStatus === 'loading'}
                onRutChange={(value) => {
                  setRut(value)
                  clearSelectedError()
                }}
                onSubmit={handleSubmit}
                rut={rut}
              />
            ) : null}

            {selectedType === 'transacciones-dia' ? (
              <ConsultaTransaccionesDiaForm
                errorMessage={errors['transacciones-dia']}
                fecha={fecha}
                isSubmitting={responseStatus === 'loading'}
                onFechaChange={(value) => {
                  setFecha(value)
                  clearSelectedError()
                }}
                onSubmit={handleSubmit}
              />
            ) : null}

            {selectedType === 'token' ? (
              <ConsultaTokenForm
                errorMessage={errors.token}
                isSubmitting={responseStatus === 'loading'}
                onSubmit={handleSubmit}
                onTokenChange={(value) => {
                  setToken(value)
                  clearSelectedError()
                }}
                token={token}
              />
            ) : null}
          </section>

          <ApiConsultasResponsePanel
            data={responseData}
            selectedType={selectedType}
            status={responseStatus}
          />
        </div>
      </div>

      <ServiceHelpModal
        flowSteps={apiConsultasFlowSteps}
        infoContent={
          <p>
            API Consultas es un servicio desarrollado a solicitud de la{' '}
            <em>AFP Cuprum</em>, cuyo propósito es exponer la información de la
            tabla <em>TRX_Rec_Externa_Bitacora</em> a las instituciones
            previsionales, permitiendo consultar el <em>estado de las transacciones</em>{' '}
            realizadas a través de Recaudación Externa. El servicio ofrece tres
            tipos de consulta: <em>por RUT</em>, <em>por transacciones del día</em>{' '}
            y <em>por Token</em>. Esta API responde a la necesidad de las
            instituciones de validar el estado de sus transacciones sin requerir{' '}
            <em>acceso directo a las bases de datos internas de Previred</em>,
            manteniendo así las políticas de seguridad y aislamiento de datos.
            Actualmente, el servicio se encuentra habilitado{' '}
            <em>exclusivamente para Cuprum</em>.
          </p>
        }
        isOpen={isServiceHelpOpen}
        onClose={() => setIsServiceHelpOpen(false)}
        serviceName="API Consultas"
      />
    </div>
  )
}

export default ApiConsultasPage
