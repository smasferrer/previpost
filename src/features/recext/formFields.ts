import type { RecextConsultationFormValues } from './types'

export interface RecextFieldConfig {
  name: keyof RecextConsultationFormValues
  label: string
  placeholder: string
  type?: 'text' | 'select'
  fullWidth?: boolean
}

export const mandatoryFields: RecextFieldConfig[] = [
  { name: 'rut', label: 'RUT', placeholder: 'Hola' },
  { name: 'dv', label: 'DV', placeholder: 'Escriba dígito verificador' },
  { name: 'names', label: 'Nombres', placeholder: 'Escriba nombre del usuario' },
  {
    name: 'paternalLastName',
    label: 'Apellido Paterno',
    placeholder: 'Escriba el apellido paterno',
  },
  { name: 'maternalLastName', label: 'Apellido Materno', placeholder: 'Escriba el RUT' },
  { name: 'email', label: 'Email', placeholder: 'Escriba nombre del usuario' },
  { name: 'paymentType', label: 'Tipo Pago', placeholder: 'Escriba el apellido paterno' },
  { name: 'sex', label: 'Sexo', placeholder: 'Escriba el RUT' },
  { name: 'phone', label: 'Teléfono', placeholder: 'Escriba nombre del usuario' },
  {
    name: 'nationality',
    label: 'Nacionalidad',
    placeholder: 'Escriba el apellido paterno',
  },
  {
    name: 'returnUrl',
    label: 'URL de Retorno',
    placeholder: 'Escriba el RUT',
    fullWidth: true,
  },
]

export const optionalFields: RecextFieldConfig[] = [
  {
    name: 'workerType',
    label: 'Tipo Trabajador',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
  },
  {
    name: 'taxRegime',
    label: 'Régimen Tributario',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
  },
  { name: 'totalPayment', label: 'Total del Pago', placeholder: 'Seleccione tipo trabajador' },
  {
    name: 'fundsOrigin',
    label: 'Origen de los Fondos',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
  },
  { name: 'region', label: 'Región', placeholder: 'Seleccione tipo trabajador', type: 'select' },
  { name: 'city', label: 'Ciudad', placeholder: 'Seleccione tipo trabajador', type: 'select' },
  {
    name: 'commune',
    label: 'Comuna',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
  },
]
