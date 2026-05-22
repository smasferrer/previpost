const NOMBRE_REGEX = /^[A-Za-zÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü '.-]*$/

const CARACTERES_PERMITIDOS_MSG = "Solo se permiten letras, tildes, Ñ y los caracteres ' . - y espacio."

export const validateNombreField = (value: string): string | null => {
  if (!value) return null
  if (value.length < 2) return 'Debe tener al menos 2 caracteres.'
  if (value.length > 100) return 'No puede superar los 100 caracteres.'
  if (!NOMBRE_REGEX.test(value)) return CARACTERES_PERMITIDOS_MSG
  return null
}

export const validateApellidoField = (value: string): string | null => {
  if (!value) return null
  if (value.length < 2) return 'Debe tener al menos 2 caracteres.'
  if (value.length > 50) return 'No puede superar los 50 caracteres.'
  if (!NOMBRE_REGEX.test(value)) return CARACTERES_PERMITIDOS_MSG
  return null
}

export const validateTelefonoField = (value: string): string | null => {
  if (!value) return null
  if (!/^\d+$/.test(value)) return 'Solo se permiten números.'
  if (value.length < 8) return 'Debe tener al menos 8 dígitos.'
  if (value.length > 10) return 'No puede superar los 10 dígitos.'
  return null
}

export const validateEmailField = (value: string): string | null => {
  if (!value) return null
  if (value.length > 50) return 'No puede superar los 50 caracteres.'

  const parts = value.split('@')
  if (parts.length !== 2) return 'Debe contener exactamente un "@".'

  const [name, domain] = parts

  if (name.length < 2) return 'El nombre (antes del "@") debe tener al menos 2 caracteres.'
  if (!/^[A-Za-z0-9]/.test(name)) return 'El nombre debe comenzar con una letra o número.'
  if (!/[A-Za-z0-9]$/.test(name)) return 'El nombre debe terminar con una letra o número.'

  if (domain.length < 5) return 'El dominio (después del "@") debe tener al menos 5 caracteres.'
  if (!/^[A-Za-z0-9]/.test(domain)) return 'El dominio debe comenzar con una letra o número.'
  if (!/[A-Za-z0-9]$/.test(domain)) return 'El dominio debe terminar con una letra o número.'
  if (/\.\./.test(domain)) return 'El dominio no puede contener puntos consecutivos.'
  if (!domain.includes('.')) return 'El dominio debe tener al menos dos partes separadas por ".".'

  return null
}
