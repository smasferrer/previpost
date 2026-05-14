export type ServiceCode = 'recext' | 'api'

export interface SelectOption {
  value: string
  label: string
}

export type AfpOption = SelectOption

export interface RecextConsultationFormValues {
  rut: string
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

export interface ApiCollectionResponse<T> {
  data?: T[]
  items?: T[]
  results?: T[]
}
