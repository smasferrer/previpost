import type {
  ApiConsultasFormValuesByType,
  ApiConsultasPayload,
  ApiConsultasType,
  ConsultaRutRequest,
  ConsultaTokenRequest,
  ConsultaTransaccionesDiaRequest,
} from '../types'

const DEFAULT_RUT_LIMIT = 100
const DEFAULT_FECHA_LIMIT = 70
const DEFAULT_OFFSET = 1

export const buildConsultaRutRequest = (
  afp: string,
  values: ApiConsultasFormValuesByType['rut'],
): ConsultaRutRequest => ({
  afp: afp.trim(),
  limit: DEFAULT_RUT_LIMIT,
  offset: DEFAULT_OFFSET,
  rut: values.rut.trim(),
})

export const buildConsultaTransaccionesDiaRequest = (
  afp: string,
  values: ApiConsultasFormValuesByType['transacciones-dia'],
): ConsultaTransaccionesDiaRequest => ({
  afp: afp.trim(),
  fecha: values.fecha.trim(),
  limit: DEFAULT_FECHA_LIMIT,
  offset: DEFAULT_OFFSET,
})

export const buildConsultaTokenRequest = (
  afp: string,
  values: ApiConsultasFormValuesByType['token'],
): ConsultaTokenRequest => ({
  afp: afp.trim(),
  token: values.token.trim(),
})

export const buildApiConsultasPayload = <TType extends ApiConsultasType>(
  afp: string,
  type: TType,
  values: ApiConsultasFormValuesByType[TType],
): ApiConsultasPayload => {
  if (type === 'rut') {
    return {
      tipoConsulta: 'rut',
      filtros: buildConsultaRutRequest(
        afp,
        values as ApiConsultasFormValuesByType['rut'],
      ),
    }
  }

  if (type === 'transacciones-dia') {
    return {
      tipoConsulta: 'transacciones-dia',
      filtros: buildConsultaTransaccionesDiaRequest(
        afp,
        values as ApiConsultasFormValuesByType['transacciones-dia'],
      ),
    }
  }

  return {
    tipoConsulta: 'token',
    filtros: buildConsultaTokenRequest(
      afp,
      values as ApiConsultasFormValuesByType['token'],
    ),
  }
}
