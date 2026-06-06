import { env } from '../../../config/env'
import type { ApiError } from '../../../lib/http/apiClient'
import apiClient from '../../../lib/http/apiClient'
import type {
  AfpOption,
  ApiCollectionResponse,
  CiudadDto,
  ComunaDto,
  OrigenAhorroDto,
  RecextConsultationRequest,
  RecextConsultationResponse,
  RegionDto,
  RutValidationResponse,
} from '../types'

const fallbackAfpOptions: AfpOption[] = [
  { value: 'planvital', label: 'PLANVITAL' },
  { value: 'capital', label: 'CAPITAL' },
  { value: 'provida', label: 'PROVIDA' },
  { value: 'modelo', label: 'MODELO' },
  { value: 'cuprum', label: 'CUPRUM' },
]

const apiPath = (path: string) => {
  const normalizedBaseUrl = env.apiBaseUrl.replace(/\/$/, '')

  return normalizedBaseUrl.endsWith('/api') ? path : `/api${path}`
}

export const getAfpOptions = async (): Promise<AfpOption[]> => {
  return fallbackAfpOptions
}

export const submitRecextConsultation = async (
  payload: RecextConsultationRequest,
): Promise<RecextConsultationResponse> => {
  try {
    const response = await apiClient.post<RecextConsultationResponse['data']>(
      apiPath('/form/external'),
      payload,
    )

    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    }
  } catch (error) {
    const apiError = error as ApiError

    throw {
      status: apiError.status || undefined,
      statusText: apiError.statusText,
      data: apiError.details,
      message: apiError.message,
    }
  }
}

export const getRegiones = async (): Promise<RegionDto[]> => {
  const { data } = await apiClient.get<RegionDto[]>(apiPath('/regiones'))

  return data
}

export const getCiudadesByRegion = async (region: string): Promise<CiudadDto[]> => {
  const { data } = await apiClient.get<CiudadDto[]>(
    apiPath(`/ciudades/${region}`),
  )

  return data
}

export const getComunasByCiudad = async (ciudad: string): Promise<ComunaDto[]> => {
  const { data } = await apiClient.get<ComunaDto[]>(apiPath(`/comunas/${ciudad}`))

  return data
}

export const getOrigenesAhorro = async (): Promise<OrigenAhorroDto[]> => {
  const { data } = await apiClient.get<OrigenAhorroDto[]>(
    apiPath('/origenes-ahorro'),
  )

  return data
}

export const validateRut = async (rut: string, dv: string): Promise<RutValidationResponse> => {
  const { data } = await apiClient.get<RutValidationResponse>(
    apiPath('/ruts-invalidos/validate'),
    { params: { rut, dv } },
  )

  return data
}
