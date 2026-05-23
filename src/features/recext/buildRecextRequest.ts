import type {
  RecextAfpCode,
  RecextConsultationFormValues,
  RecextConsultationRequest,
} from './types'

const toNumberOrNull = (value: string) => {
  const trimmedValue = value.trim()

  return trimmedValue ? Number(trimmedValue) : null
}

const validAfpCodes = new Set<string>(['planvital', 'capital', 'provida', 'modelo', 'cuprum'])

export const isRecextAfpCode = (value: string): value is RecextAfpCode =>
  validAfpCodes.has(value)

export const buildRecextRequest = (
  formValues: RecextConsultationFormValues,
  selectedAfp: RecextAfpCode,
): RecextConsultationRequest => ({
  datosCliente: {
    afp: selectedAfp,
    rut: formValues.rut.trim(),
    dv: formValues.dv.trim(),
    nombres: formValues.names.trim(),
    apellidoP: formValues.paternalLastName.trim(),
    apellidoM: formValues.maternalLastName.trim(),
    email: formValues.email.trim(),
    urlRetorno: formValues.returnUrl.trim(),
    tipoPago: formValues.paymentType.trim(),
    sexo: formValues.sex.trim(),
    telefono: formValues.phone.trim(),
    nacionalidad: formValues.nationality.trim(),
    tipoTrabajador: formValues.workerType.trim(),
    regimenTributario: formValues.taxRegime.trim(),
    totalPago: formValues.totalPayment.trim(),
    origenFondos: toNumberOrNull(formValues.fundsOrigin),
    comuna: toNumberOrNull(formValues.commune),
    ciudad: toNumberOrNull(formValues.city),
    region: toNumberOrNull(formValues.region),
  },
})
