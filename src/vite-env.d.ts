/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_API_AUTH_TOKEN?: string
  readonly VITE_API_TIMEOUT_MS?: string
  readonly VITE_API_SECURITY_HEADER_NAME?: string
  readonly VITE_API_SECURITY_HEADER_VALUE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
