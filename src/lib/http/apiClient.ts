import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from 'axios'
import { env } from '../../config/env'

export interface ApiError {
  status: number
  statusText?: string
  message: string
  details?: unknown
}

const apiClient = axios.create({
  baseURL: env.apiBaseUrl || undefined,
  timeout: env.apiTimeoutMs,
})

const withDefaultHeaders = (config: InternalAxiosRequestConfig) => {
  const headers = AxiosHeaders.from(config.headers)

  headers.set('Accept', 'application/json')
  headers.set('Content-Type', 'application/json')
  headers.set('X-Requested-With', 'XMLHttpRequest')
  headers.set(env.securityHeaderName, env.securityHeaderValue)

  if (env.apiAuthToken) {
    headers.set('Authorization', `Bearer ${env.apiAuthToken}`)
  }

  config.headers = headers

  return config
}

const toApiError = (error: AxiosError<unknown>): ApiError => {
  const responseData = error.response?.data
  const requestUrl = `${error.config?.baseURL ?? ''}${error.config?.url ?? ''}`
  const fallbackNetworkMessage = requestUrl
    ? `No fue posible conectar con el backend (${requestUrl}). Revisa que el servicio esté levantado y que VITE_API_BASE_URL apunte al puerto correcto.`
    : 'No fue posible conectar con el backend. Revisa que el servicio esté levantado.'
  const responseMessage =
    typeof responseData === 'object' &&
    responseData !== null &&
    'message' in responseData &&
    typeof responseData.message === 'string'
      ? responseData.message
      : undefined
  const responseError =
    typeof responseData === 'object' &&
    responseData !== null &&
    'error' in responseData &&
    typeof responseData.error === 'string'
      ? responseData.error
      : undefined

  return {
    status: error.response?.status ?? 0,
    statusText: error.response?.statusText,
    message:
      responseMessage ??
      responseError ??
      (error.response ? error.message : fallbackNetworkMessage),
    details: responseData,
  }
}

apiClient.interceptors.request.use(withDefaultHeaders)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<unknown>) => Promise.reject(toApiError(error)),
)

export default apiClient
