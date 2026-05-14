import { env } from '../../../config/env'
import apiClient from '../../../lib/http/apiClient'
import type {
  AfpOption,
  ApiCollectionResponse,
  RecextConsultationFormValues,
} from '../types'

const fallbackAfpOptions: AfpOption[] = [
  { value: 'cuprum', label: 'CUPRUM' },
  { value: 'habitat', label: 'HABITAT' },
  { value: 'modelo', label: 'MODELO' },
  { value: 'planvital', label: 'PLANVITAL' },
]

const extractCollection = (
  payload: AfpOption[] | ApiCollectionResponse<AfpOption>,
): AfpOption[] => {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload.data ?? payload.items ?? payload.results ?? []
}

export const getAfpOptions = async (): Promise<AfpOption[]> => {
  if (!env.apiBaseUrl) {
    return fallbackAfpOptions
  }

  const { data } = await apiClient.get<AfpOption[] | ApiCollectionResponse<AfpOption>>(
    '/rex/afps',
  )

  return extractCollection(data)
}

export const submitRecextConsultation = async (
  payload: RecextConsultationFormValues,
) => {
  const { data } = await apiClient.post('/rex/consultations', payload)

  return data
}
