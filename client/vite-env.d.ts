/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FROM_COMPANY: string
  readonly VITE_FROM_NAME: string
  readonly VITE_FROM_COUNTRY: string
  readonly VITE_FROM_EMAIL: string
  readonly VITE_TO_COMPANY: string
  readonly VITE_TO_NAME: string
  readonly VITE_TO_COUNTRY: string
  readonly VITE_TO_EMAIL: string
  readonly VITE_VALUE: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}