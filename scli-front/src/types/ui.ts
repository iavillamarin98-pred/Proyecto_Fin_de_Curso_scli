/**
 * Tipos genéricos de UI, independientes del dominio académico.
 * Permiten que DataTable y CardGrid describan cómo mostrar cualquier
 * entidad sin acoplarse a sus campos concretos.
 */

/** Una columna de tabla para una entidad de tipo T. */
export interface TableColumn<T> {
  /** Clave usada como key de Vue; no necesita existir en T (ej. "acciones"). */
  key: string
  /** Encabezado visible. */
  label: string
  /** Cómo obtener el valor a mostrar a partir de la fila. */
  value?: (item: T) => string
  /** Ancho opcional (ej. "120px", "20%"). */
  width?: string
  /** Alineación del contenido de la columna. */
  align?: 'left' | 'center' | 'right'
}

/** Un campo a mostrar dentro de una tarjeta (vista de cards). */
export interface CardField<T> {
  key: string
  label: string
  value: (item: T) => string
  /** Si es true, se muestra como texto destacado (ej. el nombre principal). */
  destacado?: boolean
}

/** Tono semántico reutilizado por StatusBadge y otros indicadores. */
export type Tono = 'success' | 'warning' | 'danger' | 'info' | 'neutral'
