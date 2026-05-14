export interface RecextFieldConfig {
  label: string
  placeholder: string
  type?: 'text' | 'select'
}

export const mandatoryFields: RecextFieldConfig[] = [
  { label: 'RUT', placeholder: 'Hola' },
  { label: 'Nombres', placeholder: 'Escriba nombre del usuario' },
  { label: 'Apellido Paterno', placeholder: 'Escriba el apellido paterno' },
  { label: 'Apellido Materno', placeholder: 'Escriba el RUT' },
  { label: 'Email', placeholder: 'Escriba nombre del usuario' },
  { label: 'Tipo Pago', placeholder: 'Escriba el apellido paterno' },
  { label: 'Sexo', placeholder: 'Escriba el RUT' },
  { label: 'Teléfono', placeholder: 'Escriba nombre del usuario' },
  { label: 'Nacionalidad', placeholder: 'Escriba el apellido paterno' },
]

export const optionalFields: RecextFieldConfig[] = [
  {
    label: 'Tipo Trabajador',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
  },
  {
    label: 'Régimen Tributario',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
  },
  { label: 'Total del Pago', placeholder: 'Seleccione tipo trabajador' },
  {
    label: 'Origen de los Fondos',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
  },
  { label: 'Comuna', placeholder: 'Seleccione tipo trabajador', type: 'select' },
  { label: 'Ciudad', placeholder: 'Seleccione tipo trabajador', type: 'select' },
  { label: 'Región', placeholder: 'Seleccione tipo trabajador', type: 'select' },
]
