export interface CodigoPrevInfo {
  motivo: string
  descripcion: string
}

export const CODIGOS_PREV: Record<string, CodigoPrevInfo> = {
  PVR000: {
    motivo: 'N/A',
    descripcion: 'Transacción Exitosa.',
  },

  // Problemas con el pagador
  PVR_PG_001: {
    motivo: 'Problemas al consultar el pagador.',
    descripcion: 'Fallo de comunicación entre backend y Base de datos (PREVIRED)',
  },
  PVR_PG_002: {
    motivo: 'Problemas al insertar el pagador',
    descripcion: 'Fallo de comunicación entre backend y Base de datos (PREVIRED)',
  },
  PVR_PG_003: {
    motivo: 'Problemas al actualizar el pagador.',
    descripcion: 'Fallo de comunicación entre backend y Base de datos (PREVIRED)',
  },

  // Códigos de error PVR_999 → PVR_977
  PVR_999: {
    motivo: 'Problemas al consultar el periodo Trabajador independiente',
    descripcion: 'Fallo de comunicación entre backend y Base de datos (PREVIRED)',
  },
  PVR_998: {
    motivo: 'Problemas al consultar el periodo Trabajador dependiente.',
    descripcion: 'Fallo de comunicación entre backend y Base de datos (PREVIRED)',
  },
  PVR_997: {
    motivo: 'No existe la nómina. el flujo no puede continuar.',
    descripcion: 'Fallo en la inserción dentro de base de datos PREVIRED',
  },
  PVR_996: {
    motivo: 'Problemas con el servicio de la búsqueda de bancos.',
    descripcion: 'Fallo en la obtención de datos PREVIRED',
  },
  PVR_995: {
    motivo: 'Campo no puede ser nulo.',
    descripcion: 'Error de formulario o datos enviados desde AFP a PREVIRED Nulos',
  },
  PVR_994: {
    motivo: 'Campo no puede estar vacío',
    descripcion: 'Error de formulario o datos enviados desde AFP a PREVIRED en blanco',
  },
  PVR_993: {
    motivo: 'Validación módulo 11 no exitosa.',
    descripcion: 'RUT Inválido',
  },
  PVR_992: {
    motivo: 'Campo con tamaño máximo excedido.',
    descripcion: 'Campo de formulario excede limites definidos',
  },
  PVR_991: {
    motivo: 'Campo sin tamaño mínimo.',
    descripcion: 'Datos enviados desde AFP o formulario no cumple con largo mínimo',
  },
  PVR_990: {
    motivo: 'Campo sin reglas de validación mínimas.',
    descripcion: 'Datos enviados desde la AFP no cumplen validaciones',
  },
  PVR_989: {
    motivo: 'No tiene los permisos necesarios para ejecutar este servicio.',
    descripcion: 'Token de autentificación no válido',
  },
  PVR_988: {
    motivo: 'Problemas al autentificarse al SSO',
    descripcion: 'Credenciales AFP no válidas, fallo en comunicación SSO PREVIRED o timeout',
  },
  PVR_987: {
    motivo: 'El token id no coincide con algún registro previo en base de datos.',
    descripcion: 'Token no corresponde a RUT enviado por AFP.',
  },
  PVR_986: {
    motivo: 'No existe transacción. Generé una nueva petición.',
    descripcion: 'Pagador no existe en registros PREVIRED',
  },
  PVR_985: {
    motivo: 'Fallo en accesos a base de datos.',
    descripcion: 'Problemas con autentificación Base de datos PREVIRED',
  },
  PVR_984: {
    motivo: 'Crash del aplicativo.',
    descripcion: 'Errores no controlados',
  },
  PVR_983: {
    motivo: 'Token Inactivo, Favor generar uno nuevamente',
    descripcion: 'Token de autentificación no válido',
  },
  PVR_982: {
    motivo: 'Se está intentando acceder al front sin registrar datos de algún cliente AFP.',
    descripcion: 'Token no posee transacción válida',
  },
  PVR_981: {
    motivo: 'Folio no puede ser nulo.',
    descripcion: 'Fallo en la generación de datos en PREVIRED',
  },
  PVR_980: {
    motivo: 'ID de token no puede ser nulo.',
    descripcion: 'Token de autentificación no válido',
  },
  PVR_979: {
    motivo: 'Campo no puede tener espacios.',
    descripcion: 'Datos enviados desde AFP no cumplen validaciones de formato.',
  },
  PVR_978: {
    motivo: 'Problemas contra Base de Datos',
    descripcion: 'Error genérico',
  },
  PVR_977: {
    motivo: 'URL de retorno no consistente.',
    descripcion: 'URL de retorno no consistente.',
  },
}
