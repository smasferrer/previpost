interface ParsePastedUserJsonSuccess {
  payload: Record<string, unknown>
  success: true
}

interface ParsePastedUserJsonError {
  errorMessage: string
  success: false
}

type ParsePastedUserJsonResult =
  | ParsePastedUserJsonError
  | ParsePastedUserJsonSuccess

const isJsonObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const parsePastedUserJson = (
  jsonText: string,
): ParsePastedUserJsonResult => {
  let parsedValue: unknown

  try {
    parsedValue = JSON.parse(jsonText)
  } catch {
    return {
      success: false,
      errorMessage: 'El contenido ingresado no es un JSON válido.',
    }
  }

  if (!isJsonObject(parsedValue)) {
    return {
      success: false,
      errorMessage: 'El JSON debe ser un objeto. No se permiten arrays.',
    }
  }

  return {
    success: true,
    payload: parsedValue,
  }
}
