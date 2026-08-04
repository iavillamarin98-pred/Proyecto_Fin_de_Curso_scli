import { ref } from 'vue'
import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { ApiError, Page, PageQuery } from '@/types/common'

/**
 * Config de un recurso REST. Un mismo composable sirve para las 11
 * entidades del dominio académico: solo cambia el `basePath`, el tipo
 * de respuesta/petición, y si el listado viene paginado.
 *
 * - Campus, Facultad, Carrera, Piso, Laboratorio, Equipo, TipoEquipo,
 *   Materia, PeriodoLectivo -> paginated: true (backend devuelve Page<T>)
 * - HorarioAcademico -> paginated: false (backend devuelve List<T> plano)
 */
export interface CrudConfig {
  api: AxiosInstance
  basePath: string
  paginated?: boolean
}

/** Parámetros de listado: paginación + filtros libres por query string. */
export type CrudListParams = PageQuery & Record<string, string | number | boolean | undefined>

function extraerMensajeError(exception: unknown): string {
  if (axios.isAxiosError<ApiError>(exception)) {
    return exception.response?.data?.message ?? 'Ocurrió un error de comunicación con el servidor'
  }

  return 'Ocurrió un error inesperado'
}

export function useCrud<TResponse, TRequest = Partial<TResponse>>(config: CrudConfig) {
  const paginated = config.paginated ?? true

  const items = ref<TResponse[]>([])
  const totalElements = ref(0)
  const totalPages = ref(0)
  const paginaActual = ref(0)
  const tamanioPagina = ref(20)

  const cargando = ref(false)
  const guardando = ref(false)
  const error = ref<string | null>(null)

  async function listar(params: CrudListParams = {}): Promise<void> {
    cargando.value = true
    error.value = null

    try {
      const response = await config.api.get(config.basePath, { params })

      if (paginated) {
        const pagina = response.data as Page<TResponse>

        items.value = pagina.content
        totalElements.value = pagina.totalElements
        totalPages.value = pagina.totalPages
        paginaActual.value = pagina.number
        tamanioPagina.value = pagina.size
      } else {
        const lista = response.data as TResponse[]

        items.value = lista
        totalElements.value = lista.length
        totalPages.value = 1
        paginaActual.value = 0
      }
    } catch (exception: unknown) {
      error.value = extraerMensajeError(exception)
      throw exception
    } finally {
      cargando.value = false
    }
  }

  async function obtenerPorId(id: string): Promise<TResponse> {
    const response = await config.api.get<TResponse>(`${config.basePath}/${id}`)
    return response.data
  }

  async function crear(payload: TRequest): Promise<TResponse> {
    guardando.value = true
    error.value = null

    try {
      const response = await config.api.post<TResponse>(config.basePath, payload)
      return response.data
    } catch (exception: unknown) {
      error.value = extraerMensajeError(exception)
      throw exception
    } finally {
      guardando.value = false
    }
  }

  async function actualizar(id: string, payload: TRequest): Promise<TResponse> {
    guardando.value = true
    error.value = null

    try {
      const response = await config.api.put<TResponse>(`${config.basePath}/${id}`, payload)
      return response.data
    } catch (exception: unknown) {
      error.value = extraerMensajeError(exception)
      throw exception
    } finally {
      guardando.value = false
    }
  }

  /** Baja lógica vía DELETE (Campus, Carrera, Piso, Materia, Bloque, TipoEquipo). */
  async function eliminar(id: string): Promise<void> {
    guardando.value = true
    error.value = null

    try {
      await config.api.delete(`${config.basePath}/${id}`)
    } catch (exception: unknown) {
      error.value = extraerMensajeError(exception)
      throw exception
    } finally {
      guardando.value = false
    }
  }

  /**
   * Cambio de estado vía PATCH /{id}/estado (Facultad, Laboratorio, Equipo).
   * El cuerpo lo arma cada vista según su propio DTO
   * (FacultadEstadoRequest, LaboratorioEstadoRequest, EquipoEstadoRequest).
   */
  async function cambiarEstado<TEstadoRequest>(
    id: string,
    payload: TEstadoRequest,
  ): Promise<TResponse> {
    guardando.value = true
    error.value = null

    try {
      const response = await config.api.patch<TResponse>(
        `${config.basePath}/${id}/estado`,
        payload,
      )
      return response.data
    } catch (exception: unknown) {
      error.value = extraerMensajeError(exception)
      throw exception
    } finally {
      guardando.value = false
    }
  }

  return {
    items,
    totalElements,
    totalPages,
    paginaActual,
    tamanioPagina,
    cargando,
    guardando,
    error,
    listar,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    cambiarEstado,
  }
}
