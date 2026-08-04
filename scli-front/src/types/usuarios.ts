/**
 * Tipos de solo-lectura para datos consumidos de usuarios-service
 * (puerto 8082). El frontend académico NO escribe en este servicio,
 * solo lo consulta para resolver el nombre de un docente en
 * HorarioAcademico.docenteId.
 *
 * Cadena real: Docente.perfilId -> Perfil.nombres/apellidos
 */

export interface DocenteResponse {
  id: string
  perfilId: string
  codigoDocente: string
  tituloAcademico: string | null
  departamento: string | null
  tipoContrato: string | null
  dedicacion: string | null
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

export interface PerfilResponse {
  id: string
  identificacion: string
  nombres: string
  apellidos: string
  emailInstitucional: string | null
  emailPersonal: string | null
  telefono: string | null
  direccion: string | null
  fechaNacimiento: string | null
  fotoUrl: string | null
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

/**
 * Vista combinada Docente + Perfil, ya resuelta, lista para mostrar
 * en un selector o en una columna de tabla ("Ing. María Torres").
 */
export interface DocenteResuelto {
  docenteId: string
  perfilId: string
  nombreCompleto: string
  codigoDocente: string
  departamento: string | null
}
