import type {
  RecextAfpCode,
  RecextConsultationFormValues,
  RecextConsultationRequest,
} from './types'

const afpCredentials: Record<RecextAfpCode, { rutAfp: string; password: string }> = {
  planvital: { rutAfp: '98.001.200-k', password: 'R3cExt3rnaPvr04' },
  capital: { rutAfp: '98.000.000-1', password: 'Cpt#PrD98gt' },
  provida: { rutAfp: '76.265.736-8', password: '7f588f375f' },
  modelo: { rutAfp: '76.762.250-3', password: 'R3cExt3rnaPvr09' },
  cuprum: { rutAfp: '76.240.079-0', password: 'R3cExt3rnaPvr08' },
}

const toNumberOrNull = (value: string) => {
  const trimmedValue = value.trim()

  return trimmedValue ? Number(trimmedValue) : null
}

export const isRecextAfpCode = (value: string): value is RecextAfpCode =>
  value in afpCredentials

export const buildRecextRequest = (
  formValues: RecextConsultationFormValues,
  selectedAfp: RecextAfpCode,
): RecextConsultationRequest => ({
  login: afpCredentials[selectedAfp],
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
