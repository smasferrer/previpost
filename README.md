# Previpost Frontend

Frontend web de Previpost para consultar y probar servicios asociados a Recaudacion Externa y API Consultas. La aplicacion esta construida con React, TypeScript, Vite, React Router, TanStack Query, Axios y Tailwind CSS.

## Funcionalidades

- Selector global de AFP para construir consultas contra el backend.
- Pantalla de Recaudacion Externa con modo JSON e ingreso manual.
- Prellenado del formulario manual desde JSON pegado en un modal.
- Validacion de RUT modulo 11 y consulta de RUT bloqueado contra backend.
- Carga de regiones, ciudades, comunas y origenes de ahorro desde tablas maestras.
- Envio del formulario de Recaudacion Externa al backend.
- Pantalla API Consultas con busquedas por RUT, transacciones del dia y token.
- Paneles de respuesta con JSON coloreado, scroll y mensajes para consultas sin registros.
- Soporte de temas visuales y logos por theme.
- Build productivo servido por Nginx en contenedor.

## Stack

| Area | Tecnologia |
| --- | --- |
| Framework UI | React 19 |
| Lenguaje | TypeScript |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Data fetching/cache | TanStack Query |
| HTTP client | Axios |
| Estilos | Tailwind CSS + CSS variables |
| Servidor productivo | Nginx |
| Contenedor | Podman/OCI mediante `Containerfile` |

## Estructura

```text
src/
  config/                  Variables de entorno parseadas para runtime
  features/
    api-consultas/         Formularios, API client y tipos de API Consultas
    recext/                Formularios, validaciones, request builder y API de Rec. Externa
  lib/
    http/                  Cliente Axios compartido
    query/                 QueryClient de TanStack Query
  pages/                   Paginas principales de la aplicacion
  providers/               Providers globales
  router/                  Rutas y navegacion lateral
  shared/
    components/            UI, layout, paneles y componentes de marca
    context/               Contexto global de AFP
    styles/                Tokens CSS
    theme/                 Theming y logos
```

## Rutas

| Ruta | Descripcion |
| --- | --- |
| `/` | Home con accesos a servicios. |
| `/consulta-recext` | Consulta de Recaudacion Externa. |
| `/api-consultas?tipo=rut` | API Consultas por RUT. |
| `/api-consultas?tipo=transacciones-dia` | API Consultas por transacciones del dia. |
| `/api-consultas?tipo=token` | API Consultas por token/transaccion. |

## Configuracion

La aplicacion lee variables de entorno con prefijo `VITE_` desde Vite. Se pueden definir en `.env`, `.env.local` o en el ambiente de build.

| Variable | Default | Uso |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `''` | URL base del backend. Si queda vacia, se usan rutas relativas. |
| `VITE_API_AUTH_TOKEN` | `''` | Token Bearer opcional enviado en `Authorization`. |
| `VITE_API_TIMEOUT_MS` | `15000` | Timeout de Axios en milisegundos. |
| `VITE_API_SECURITY_HEADER_NAME` | `X-Previpost-Client` | Nombre del header de seguridad/custom. |
| `VITE_API_SECURITY_HEADER_VALUE` | `previpost-frontend` | Valor del header de seguridad/custom. |

Ejemplo local:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT_MS=15000
VITE_API_SECURITY_HEADER_NAME=X-Previpost-Client
VITE_API_SECURITY_HEADER_VALUE=previpost-frontend
```

El cliente HTTP agrega por defecto:

- `Accept: application/json`
- `Content-Type: application/json`
- `X-Requested-With: XMLHttpRequest`
- Header custom definido por `VITE_API_SECURITY_HEADER_NAME`
- `Authorization: Bearer <token>` cuando `VITE_API_AUTH_TOKEN` existe

## Instalacion

Requisitos:

- Node.js compatible con el proyecto.
- npm.
- Acceso al registry configurado en `.npmrc`, si aplica en el ambiente corporativo.

Instalar dependencias:

```bash
npm install --legacy-peer-deps
```

## Scripts

| Comando | Descripcion |
| --- | --- |
| `npm run dev` | Levanta Vite en modo desarrollo. |
| `npm run build` | Genera el build productivo en `dist/`. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |
| `npm run preview` | Sirve localmente el build generado por Vite. |

Desarrollo local:

```bash
npm run dev
```

Build productivo:

```bash
npm run build
```

## Servicios Consumidos

### Recaudacion Externa

Implementacion principal:

- `src/pages/ConsultaRecextPage.tsx`
- `src/features/recext/api/recextService.ts`
- `src/features/recext/buildRecextRequest.ts`
- `src/features/recext/components/`

Endpoints usados:

| Metodo | Path | Uso |
| --- | --- | --- |
| `POST` | `/api/form/external` | Envia el formulario de Recaudacion Externa. |
| `GET` | `/api/regiones` | Lista regiones. |
| `GET` | `/api/ciudades/{region}` | Lista ciudades por region. |
| `GET` | `/api/comunas/{ciudad}` | Lista comunas por ciudad. |
| `GET` | `/api/origenes-ahorro` | Lista origenes de ahorro. |
| `GET` | `/api/ruts-invalidos/validate?rut=&dv=` | Valida si un RUT esta bloqueado. |

Si `VITE_API_BASE_URL` termina en `/api`, el helper evita duplicar el prefijo y llama paths como `/form/external`. Si no termina en `/api`, antepone `/api`.

### API Consultas

Implementacion principal:

- `src/pages/ApiConsultasPage.tsx`
- `src/features/api-consultas/api/apiConsultasService.ts`
- `src/features/api-consultas/components/`
- `src/features/api-consultas/utils/buildApiConsultasPayload.ts`

Endpoints usados:

| Metodo | Path | Uso |
| --- | --- | --- |
| `GET` | `/api/consultas/{afp}/rut/{rut}` | Busca transacciones por RUT. |
| `GET` | `/api/consultas/{afp}/fecha/{fecha}` | Busca transacciones del dia. |
| `GET` | `/api/consultas/{afp}/token/{token}` | Busca por token/transaccion. |

Las busquedas por RUT y fecha envian paginacion por query params:

- RUT: `limit=100`, `offset=1`
- Fecha: `limit=70`, `offset=1`

Cuando la API responde `200` pero `datos` viene vacio, el panel muestra:

```text
No existe registros para esa consulta.
```

Esto aplica para busqueda por RUT, por token/transaccion y por transacciones del dia.

## Flujo Recaudacion Externa

La pantalla `/consulta-recext` permite dos modos:

| Modo | Comportamiento |
| --- | --- |
| `Pegar JSON` | Pega un JSON de usuario y ejecuta la consulta con el boton `Validar y ejecutar`. |
| `Ingreso manual` | Completa los campos manualmente o usa `Prellenar informacion` para rellenar el formulario desde JSON. La consulta se ejecuta solo con el boton `Consultar`. |

El modal `Prellenar informacion` no consulta al backend. Solo parsea el JSON, valida campos obligatorios y carga valores en el formulario.

Mapeo esperado desde JSON pegado hacia formulario:

| JSON | Formulario |
| --- | --- |
| `rut` | `rut` |
| `dv` | `dv` |
| `nombres` | `names` |
| `apellidoP` | `paternalLastName` |
| `apellidoM` | `maternalLastName` |
| `email` | `email` |
| `urlRetorno` | `returnUrl` |
| `tipoPago` | `paymentType` |
| `sexo` | `sex` |
| `telefono` | `phone` |
| `nacionalidad` | `nationality` |
| `tipoTrabajador` | `workerType` |
| `regimenTributario` | `taxRegime` |
| `totalPago` | `totalPayment` |
| `origenFondos` | `fundsOrigin` |
| `comuna` | `commune` |
| `ciudad` | `city` |
| `region` | `region` |

Validaciones del formulario:

- Campos obligatorios definidos en `src/features/recext/formFields.ts`.
- RUT y DV mediante modulo 11.
- RUT bloqueado mediante `/api/ruts-invalidos/validate`.
- Nombre, apellidos, email y telefono mediante `validateFormFields.ts`.
- AFP valida para construir payload de Recaudacion Externa.

## Flujo API Consultas

La pantalla `/api-consultas` selecciona el tipo mediante el query param `tipo`.

Tipos soportados:

- `rut`
- `transacciones-dia`
- `token`

La AFP seleccionada es obligatoria. El panel de contexto limita visualmente API Consultas a Cuprum.

Estados del panel:

| Estado | Label |
| --- | --- |
| `idle` | `Pendiente` |
| `loading` | `Consultando` |
| `success` | `OK` |
| `error` | `Error` |

Las respuestas con transacciones se muestran como una lista expandible. Cada item incluye el ID de transaccion, RUT, estado y monto cuando existen. El detalle completo se renderiza como JSON coloreado.

## Componentes Compartidos

| Componente | Uso |
| --- | --- |
| `AppShell` | Layout principal con topbar/sidebar. |
| `PageHeader` | Encabezado de paginas. |
| `ConsultationContextPanel` | Contexto de servicio y seleccion de AFP. |
| `ServiceHelpModal` | Modal informativo de servicio. |
| `ResponsePanel` | Panel generico de respuesta. |
| `JsonViewer` | Render de texto/JSON en `<pre>` con colores y scroll. |
| `Button`, `Card`, `Textarea`, `AppSelect` | Elementos UI base. |

`JsonViewer` mantiene `overflow-auto`, por lo que conserva scroll cuando el contenido excede el contenedor. El wrapping esta configurado para no cortar palabras de forma arbitraria.

## Theming

Los colores y tokens visuales viven principalmente en:

- `src/shared/styles/tokens.css`
- `src/shared/theme/themeOptions.ts`
- `src/shared/theme/ThemeProvider.tsx`

La UI usa variables CSS como:

- `--app-primary`
- `--app-primary-hover`
- `--color-secondary`
- `--color-secondary-hover`
- `--app-surface`
- `--app-border`
- `--app-text`
- `--app-text-muted`

El boton `Prellenar informacion` usa el mismo color de texto que los tabs activos: `--color-secondary`, sin borde ni color de fondo.

## Build y Contenedor

El `Containerfile` realiza un build multi-stage:

1. Usa una imagen corporativa Node/UBI como builder.
2. Copia `.npmrc` y `package*.json`.
3. Ejecuta `npm install --legacy-peer-deps`.
4. Copia el codigo fuente.
5. Ejecuta `npm run build`.
6. Copia `dist/` a una imagen Nginx/UBI.
7. Sirve la aplicacion desde `/opt/app-root/src` en el puerto `8080`.

Construir imagen:

```bash
podman build -f Containerfile -t previred/previpost-front .
```

Ejecutar localmente:

```bash
podman run -p 8092:8080 previred/previpost-front
```

La configuracion Nginx esta en `nginx/nginx.conf` y usa:

```nginx
try_files $uri $uri/ /index.html;
```

Esto permite que React Router funcione correctamente al refrescar rutas internas.

## Checklist de Verificacion

Antes de subir cambios:

```bash
npm run lint
npm run build
```

Para validar manualmente:

- Abrir `/consulta-recext`.
- Seleccionar AFP.
- Probar `Pegar JSON` y confirmar que ejecuta desde `Validar y ejecutar`.
- Probar `Ingreso manual` y confirmar que `Prellenar informacion` solo rellena campos.
- Ejecutar `Consultar` y revisar el panel de respuesta.
- Abrir `/api-consultas?tipo=rut`.
- Probar RUT sin registros y confirmar mensaje `No existe registros para esa consulta.`.
- Repetir para `tipo=transacciones-dia` y `tipo=token`.

## Notas de Desarrollo

- No hay tests unitarios configurados en `package.json`; la verificacion disponible hoy es lint y build.
- La seleccion global de AFP se gestiona en `src/shared/context/AfpContext.tsx`.
- TanStack Query se inicializa desde `src/lib/query/queryClient.ts`.
- El manejo de errores HTTP esta centralizado en `src/lib/http/apiClient.ts`.
- Las respuestas de error de API Consultas se normalizan a `ApiConsultaResponse` con `datos: []` y `totalRegistros: 0`.
