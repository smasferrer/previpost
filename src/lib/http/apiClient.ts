import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from 'axios'
import { env } from '../../config/env'

export interface ApiError {
  status: number
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
  const responseMessage =
    typeof responseData === 'object' &&
    responseData !== null &&
    'message' in responseData &&
    typeof responseData.message === 'string'
      ? responseData.message
      : undefined

  return {
    status: error.response?.status ?? 0,
    message: responseMessage ?? error.message ?? 'Unexpected API error',
    details: responseData,
  }
}

apiClient.interceptors.request.use(withDefaultHeaders)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<unknown>) => Promise.reject(toApiError(error)),
)

export default apiClient
