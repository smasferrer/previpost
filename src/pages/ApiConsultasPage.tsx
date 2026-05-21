import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import logo from '../assets/img/logo.svg'
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
import { useRecextAfpOptionsQuery } from '../features/recext/hooks/useRecextAfpOptionsQuery'
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
import { appPaths } from '../router/paths'
import PageHeader from '../shared/components/layout/PageHeader'
import Card from '../shared/components/ui/Card'

type ApiConsultasErrors = Partial<Record<ApiConsultasType, string>>

function ApiConsultasPage() {
  const navigate = useNavigate()
  const [afp, setAfp] = useState('')
  const [selectedType, setSelectedType] = useState<ApiConsultasType>('rut')
  const [rut, setRut] = useState('')
  const [fecha, setFecha] = useState('')
  const [token, setToken] = useState('')
  const [errors, setErrors] = useState<ApiConsultasErrors>({})
  const [afpErrorMessage, setAfpErrorMessage] = useState<string | null>(null)
  const [responseStatus, setResponseStatus] = useState<ApiConsultasStatus>('idle')
  const [responseData, setResponseData] = useState<ApiConsultaResponse>()
  // TODO: Mover la carga de AFP a una capa compartida si API Consultas y Rec. Externa la siguen usando.
  const {
    data: afpOptions = [],
    isLoading: isLoadingAfps,
    isError: isAfpError,
  } = useRecextAfpOptionsQuery()

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
    setSelectedType(type)
    setResponseStatus('idle')
    setResponseData(undefined)
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
    <main className="min-h-screen bg-[#1c1a22] px-2 py-3 text-[#f3f1e9] sm:px-3 lg:px-4">
      <div className="mx-auto max-w-[1920px]">
        <Link to={appPaths.home}>
          <img src={logo} alt="PreviPost" className="mb-5 w-[126px] sm:w-[154px]" />
        </Link>

        <div className="grid gap-5 xl:grid-cols-[7fr_3fr]">
          <section className="space-y-5">
            <Card className="border-white/5 bg-[#281b12]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[0.9rem] border border-[#f79b63] bg-[#4b2a17] px-3 py-2">
                  <span className="mb-2 block text-[1rem] font-medium text-[#f79b63] sm:text-[1.1rem]">
                    Consulta seleccionada
                  </span>
                  <div className="relative border-b border-[#f79b63] pb-1">
                    <select
                      value="api"
                      onChange={(event) => {
                        if (event.target.value === 'recext') {
                          navigate(appPaths.consultaRecext)
                        }
                      }}
                      className="w-full appearance-none bg-transparent pr-3.5 text-[1rem] text-[#f3f1e9] outline-none sm:text-[1.05rem]"
                    >
                      <option value="recext">Consulta Rec. Externa</option>
                      <option value="api">API Consultas</option>
                    </select>
                    <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[0.8rem] text-[#f3f1e9]">
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <PageHeader
              description="Selecciona el tipo de consulta, completa los datos mínimos y ejecuta la llamada al backend."
              eyebrow="Servicio"
              title="API Consultas"
            />

            <Card as="section" className="border-white/5 bg-[#1c1c1c]">
              <label className="block max-w-xl">
                <span className="mb-2 block text-[0.9rem] font-semibold text-[#f79b63]">
                  AFP
                </span>
                <div className="relative rounded-[0.75rem] border border-white/10 bg-[#111015] px-3 py-2">
                  <select
                    className={`w-full appearance-none bg-transparent pr-6 text-[1rem] outline-none ${
                      afp ? 'text-[#f3f1e9]' : 'text-[#6a666f]'
                    }`}
                    onChange={(event) => {
                      setAfp(event.target.value)
                      setAfpErrorMessage(null)
                    }}
                    value={afp}
                  >
                    <option value="" disabled>
                      {isLoadingAfps
                        ? 'Cargando AFP...'
                        : isAfpError
                          ? 'No fue posible cargar AFP'
                          : 'Seleccione AFP a consultar'}
                    </option>
                    {afpOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[0.8rem] text-[#f3f1e9]">
                    ▼
                  </span>
                </div>
              </label>

              {afpErrorMessage ? (
                <p className="mt-3 rounded-[0.75rem] border border-[#f79b63]/40 bg-[#2b1712] px-3 py-2 text-[0.9rem] text-[#ffb28b]">
                  {afpErrorMessage}
                </p>
              ) : null}
            </Card>

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
            status={responseStatus}
          />
        </div>
      </div>
    </main>
  )
}

export default ApiConsultasPage
