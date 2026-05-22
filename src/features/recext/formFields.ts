import type { RecextConsultationFormValues } from './types'

export interface RecextFieldConfig {
  name: keyof RecextConsultationFormValues
  label: string
  placeholder: string
  type?: 'text' | 'select'
  fullWidth?: boolean
  clearable?: boolean
}

export const mandatoryFields: RecextFieldConfig[] = [
  { name: 'rut', label: 'RUT', placeholder: 'Ingrese RUT sin puntos ni guión' },
  { name: 'dv', label: 'DV', placeholder: 'Ingrese dígito verificador' },
  { name: 'names', label: 'Nombres', placeholder: 'Ingrese nombres' },
  {
    name: 'paternalLastName',
    label: 'Apellido Paterno',
    placeholder: 'Ingrese apellido paterno',
  },
  { name: 'maternalLastName', label: 'Apellido Materno', placeholder: 'Ingrese apellido materno' },
  { name: 'email', label: 'Email', placeholder: 'Ingrese email' },
  { name: 'paymentType', label: 'Tipo Pago', placeholder: 'Seleccione tipo de pago', type: 'select' },
  { name: 'sex', label: 'Sexo', placeholder: 'Seleccione sexo', type: 'select' },
  { name: 'phone', label: 'Teléfono', placeholder: 'Ingrese teléfono' },
  {
    name: 'nationality',
    label: 'Nacionalidad',
    placeholder: 'Seleccione nacionalidad',
    type: 'select',
  },
  {
    name: 'returnUrl',
    label: 'URL de Retorno',
    placeholder: 'Ingrese URL de retorno',
    fullWidth: true,
  },
]

export const optionalFields: RecextFieldConfig[] = [
  {
    name: 'workerType',
    label: 'Tipo Trabajador',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
    clearable: true,
  },
  {
    name: 'taxRegime',
    label: 'Régimen Tributario',
    placeholder: 'Seleccione régimen tributario',
    type: 'select',
    clearable: true,
  },
  { name: 'totalPayment', label: 'Total del Pago', placeholder: 'Ingrese monto a pagar' },
  {
    name: 'fundsOrigin',
    label: 'Origen de los Fondos',
    placeholder: 'Seleccione origen de fondos',
    type: 'select',
    clearable: true,
  },
  { name: 'region', label: 'Región', placeholder: 'Seleccione región', type: 'select', clearable: true },
  { name: 'city', label: 'Ciudad', placeholder: 'Seleccione ciudad', type: 'select', clearable: true },
  {
    name: 'commune',
    label: 'Comuna',
    placeholder: 'Seleccione comuna',
    type: 'select',
    clearable: true,
  },
]
