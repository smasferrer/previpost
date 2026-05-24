export type ApiConsultasType = 'rut' | 'transacciones-dia' | 'token'

export type ApiConsultasStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ConsultaRutFormValues {
  rut: string
}

export interface ConsultaRutRequest {
  afp: string
  limit: number
  offset: number
  rut: string
}

export interface ConsultaTransaccionesDiaFormValues {
  fecha: string
}

export interface ConsultaTransaccionesDiaRequest {
  afp: string
  fecha: string
  limit: number
  offset: number
}

export interface ConsultaTokenFormValues {
  token: string
}

export interface ConsultaTokenRequest {
  afp: string
  token: string
}

export interface ApiConsultaTransaccion {
  idSolicitud: string
  idTransaccion: string
  folio: string | null
  timeStampInicio: string
  timeStampPago: string | null
  dispositivo: string
  rut: string
  dv: string
  nombres: string
  apellidoP: string
  apellidoM: string
  email: string
  monto: string | null
  tipoPago: string
  regimenTributario: string | null
  glosaBanco: string | null
  estadoTransaccion: string
  glosaEstadoTransaccion: string | null
}

export interface ApiConsultaResponse {
  path: string
  fecha: string
  message: string
  codigoHttp: number
  datos: ApiConsultaTransaccion[]
  totalRegistros: number
}

export type ConsultaRutResponse = ApiConsultaResponse
export type ConsultaTransaccionesDiaResponse = ApiConsultaResponse
export type ConsultaTokenResponse = ApiConsultaResponse

export type ApiConsultasFormValuesByType = {
  rut: ConsultaRutFormValues
  'transacciones-dia': ConsultaTransaccionesDiaFormValues
  token: ConsultaTokenFormValues
}

export type ApiConsultasPayload =
  | {
      filtros: ConsultaRutRequest
      tipoConsulta: 'rut'
    }
  | {
      filtros: ConsultaTransaccionesDiaRequest
      tipoConsulta: 'transacciones-dia'
    }
  | {
      filtros: ConsultaTokenRequest
      tipoConsulta: 'token'
    }

export interface ApiConsultasPlaceholderResponse {
  message: string
  mock: true
  payload: ApiConsultasPayload
}
