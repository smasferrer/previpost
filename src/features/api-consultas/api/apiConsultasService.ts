import type { ApiError } from '../../../lib/http/apiClient'
import apiClient from '../../../lib/http/apiClient'
import type {
  ApiConsultasPayload,
  ApiConsultasPlaceholderResponse,
  ApiConsultaResponse,
  ConsultaRutRequest,
  ConsultaRutResponse,
  ConsultaTokenRequest,
  ConsultaTokenResponse,
  ConsultaTransaccionesDiaRequest,
  ConsultaTransaccionesDiaResponse,
} from '../types'

const buildApiConsultasError = (error: unknown) => {
  const apiError = error as ApiError

  return {
    codigoHttp: apiError.status || 0,
    datos: [],
    fecha: '',
    message: apiError.message || 'No fue posible ejecutar la consulta.',
    path: '',
    totalRegistros: 0,
  } satisfies ApiConsultaResponse
}

export const executeConsultaRut = async (
  request: ConsultaRutRequest,
): Promise<ConsultaRutResponse> => {
  try {
    const { data } = await apiClient.get<ConsultaRutResponse>(
      `/api/consultas/${encodeURIComponent(request.afp)}/rut/${encodeURIComponent(request.rut)}`,
      {
        params: {
          limit: request.limit,
          offset: request.offset,
        },
      },
    )

    return data
  } catch (error) {
    throw buildApiConsultasError(error)
  }
}

export const executeConsultaTransaccionesDia = async (
  request: ConsultaTransaccionesDiaRequest,
): Promise<ConsultaTransaccionesDiaResponse> => {
  try {
    const { data } = await apiClient.get<ConsultaTransaccionesDiaResponse>(
      `/api/consultas/${encodeURIComponent(request.afp)}/fecha/${encodeURIComponent(request.fecha)}`,
      {
        params: {
          limit: request.limit,
          offset: request.offset,
        },
      },
    )

    return data
  } catch (error) {
    throw buildApiConsultasError(error)
  }
}

export const executeConsultaToken = async (
  request: ConsultaTokenRequest,
): Promise<ConsultaTokenResponse> => {
  try {
    const { data } = await apiClient.get<ConsultaTokenResponse>(
      `/api/consultas/${encodeURIComponent(request.afp)}/token/${encodeURIComponent(request.token)}`,
    )

    return data
  } catch (error) {
    throw buildApiConsultasError(error)
  }
}

export const executeApiConsultasPlaceholder = async (
  payload: ApiConsultasPayload,
): Promise<ApiConsultasPlaceholderResponse> => {
  // Fallback/mock de desarrollo. ApiConsultasPage usa las llamadas reales.
  // Este placeholder no llama servicios externos ni URLs ficticias.
  await Promise.resolve()

  return {
    mock: true,
    message: 'Placeholder temporal de desarrollo: consulta preparada sin llamada HTTP.',
    payload,
  }
}
