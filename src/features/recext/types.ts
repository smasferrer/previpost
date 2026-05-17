export type ServiceCode = 'recext' | 'api'

export interface SelectOption {
  value: string
  label: string
}

export type AfpOption = SelectOption

export type RecextAfpCode = 'planvital' | 'capital' | 'provida' | 'modelo' | 'cuprum'

export interface RecextConsultationFormValues {
  rut: string
  dv: string
  names: string
  paternalLastName: string
  maternalLastName: string
  email: string
  paymentType: string
  sex: string
  phone: string
  nationality: string
  returnUrl: string
  workerType: string
  taxRegime: string
  totalPayment: string
  fundsOrigin: string
  commune: string
  city: string
  region: string
}

export const initialRecextFormValues: RecextConsultationFormValues = {
  rut: '23429289',
  dv: '7',
  names: 'JUAN JOSE',
  paternalLastName: 'PEREZ',
  maternalLastName: 'SOTO',
  email: 'mail@mail.com',
  paymentType: 'CUENTA2',
  sex: 'M',
  phone: '958864728',
  nationality: '0',
  returnUrl: 'https://google.cl',
  workerType: 'dependiente',
  taxRegime: 'G',
  totalPayment: '230000',
  fundsOrigin: '7',
  commune: '196',
  city: '141',
  region: '6',
}

export interface RecextConsultationRequest {
  login: {
    rutAfp: string
    password: string
  }
  datosCliente: {
    afp: RecextAfpCode
    rut: string
    dv: string
    nombres: string
    apellidoP: string
    apellidoM: string
    email: string
    urlRetorno: string
    tipoPago: string
    sexo: string
    telefono: string
    nacionalidad: string
    tipoTrabajador: string
    regimenTributario: string
    totalPago: string
    origenFondos: number | null
    comuna: number | null
    ciudad: number | null
    region: number | null
  }
}

export interface ApiCollectionResponse<T> {
  data?: T[]
  items?: T[]
  results?: T[]
}

export type RecextJsonValue =
  | string
  | number
  | boolean
  | null
  | RecextJsonValue[]
  | { [key: string]: RecextJsonValue }

export interface RecextConsultationResponse {
  codigoPrev?: string
  data?: {
    urlPrevired?: string
    [key: string]: RecextJsonValue | undefined
  }
  [key: string]: RecextJsonValue | undefined
}

export interface RegionDto {
  codRegion: number
  glosa: string
}

export interface CiudadDto {
  codCiudad: number
  glosa: string
  codRegion: number
}

export interface ComunaDto {
  codComuna: number
  codComunaSii: number
  glosa: string
  codCiudad: number
  codTelefonico: number
}

export interface OrigenAhorroDto {
  codOrigenAhorro: number
  glosa: string
  estado: number
}
