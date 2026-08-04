/**
 * Tipos compartidos entre todos los módulos del frontend.
 * Reflejan estructuras genéricas que reutilizan varios microservicios
 * (paginación de Spring Data, forma estándar de error de la API).
 */

/** Metadatos de orden que Spring Data incluye dentro de un Page. */
export interface SortMeta {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

/** Metadatos de paginación (sub-objeto "pageable" de Spring Data). */
export interface PageableMeta {
  pageNumber: number
  pageSize: number
  sort: SortMeta
  offset: number
  paged: boolean
  unpaged: boolean
}

/**
 * Respuesta paginada estándar de Spring Data.
 * Todos los listados de academico-laboratorios-service y de
 * usuarios-service (docentes) devuelven esta forma.
 */
export interface Page<T> {
  content: T[]
  pageable: PageableMeta
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
  empty: boolean
  size: number
  number: number
  numberOfElements: number
  sort: SortMeta
}

/** Parámetros estándar para pedir una página al backend. */
export interface PageQuery {
  page?: number
  size?: number
  sort?: string
}

/**
 * Forma del error que devuelve el GlobalExceptionHandler de
 * academico-laboratorios-service (y equivalentes en los demás servicios).
 * `validationErrors` solo viene poblado en errores 400 de validación
 * (campo -> mensaje).
 */
export interface ApiError {
  timestamp?: string
  status?: number
  error?: string
  message?: string
  path?: string
  validationErrors?: Record<string, string> | null
}

/** Estado genérico de una operación async en un store/composable. */
export interface AsyncState {
  cargando: boolean
  error: string | null
}
