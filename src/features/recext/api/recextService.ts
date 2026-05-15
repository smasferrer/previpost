import { env } from '../../../config/env'
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
} from '../types'

const fallbackAfpOptions: AfpOption[] = [
  { value: 'planvital', label: 'PLANVITAL' },
  { value: 'capital', label: 'CAPITAL' },
  { value: 'provida', label: 'PROVIDA' },
  { value: 'modelo', label: 'MODELO' },
  { value: 'cuprum', label: 'CUPRUM' },
]

const extractCollection = (
  payload: AfpOption[] | ApiCollectionResponse<AfpOption>,
): AfpOption[] => {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload.data ?? payload.items ?? payload.results ?? []
}

const apiPath = (path: string) => {
  const normalizedBaseUrl = env.apiBaseUrl.replace(/\/$/, '')

  return normalizedBaseUrl.endsWith('/api') ? path : `/api${path}`
}

export const getAfpOptions = async (): Promise<AfpOption[]> => {
  if (!env.apiBaseUrl) {
    return fallbackAfpOptions
  }

  try {
    const { data } = await apiClient.get<AfpOption[] | ApiCollectionResponse<AfpOption>>(
      '/rex/afps',
    )

    return extractCollection(data)
  } catch {
    return fallbackAfpOptions
  }
}

export const submitRecextConsultation = async (
  payload: RecextConsultationRequest,
): Promise<RecextConsultationResponse> => {
  const { data } = await apiClient.post<RecextConsultationResponse>(
    '/api/form/external',
    payload,
  )

  return data
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
