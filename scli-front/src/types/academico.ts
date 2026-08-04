/**
 * Tipos del dominio académico-laboratorios.
 * Cada interfaz Request/Response corresponde 1:1 a un record DTO
 * de ec.edu.scli.academico.dto.* en el backend (puerto 8083).
 *
 * Jerarquía de infraestructura física:
 *   Campus -> Bloque -> Piso -> Laboratorio -> Equipo (con TipoEquipo)
 *
 * Jerarquía académica:
 *   Facultad -> Carrera -> Materia
 *   PeriodoLectivo (independiente)
 *   HorarioAcademico (une Materia + PeriodoLectivo + Laboratorio + docente)
 */

// ---------------------------------------------------------------------------
// Enums (coinciden exactamente con ec.edu.scli.academico.enums.*)
// ---------------------------------------------------------------------------

export type EstadoLaboratorio =
  | 'DISPONIBLE'
  | 'OCUPADO'
  | 'MANTENIMIENTO'
  | 'INACTIVO'

export const ESTADOS_LABORATORIO: EstadoLaboratorio[] = [
  'DISPONIBLE',
  'OCUPADO',
  'MANTENIMIENTO',
  'INACTIVO',
]

export const ETIQUETA_ESTADO_LABORATORIO: Record<EstadoLaboratorio, string> = {
  DISPONIBLE: 'Disponible',
  OCUPADO: 'Ocupado',
  MANTENIMIENTO: 'En mantenimiento',
  INACTIVO: 'Inactivo',
}

export type EstadoEquipo =
  | 'OPERATIVO'
  | 'CON_FALLAS'
  | 'MANTENIMIENTO'
  | 'FUERA_DE_SERVICIO'

export const ESTADOS_EQUIPO: EstadoEquipo[] = [
  'OPERATIVO',
  'CON_FALLAS',
  'MANTENIMIENTO',
  'FUERA_DE_SERVICIO',
]

export const ETIQUETA_ESTADO_EQUIPO: Record<EstadoEquipo, string> = {
  OPERATIVO: 'Operativo',
  CON_FALLAS: 'Con fallas',
  MANTENIMIENTO: 'En mantenimiento',
  FUERA_DE_SERVICIO: 'Fuera de servicio',
}

export type EstadoPeriodo = 'PLANIFICADO' | 'ACTIVO' | 'FINALIZADO'

export const ESTADOS_PERIODO: EstadoPeriodo[] = [
  'PLANIFICADO',
  'ACTIVO',
  'FINALIZADO',
]

export const ETIQUETA_ESTADO_PERIODO: Record<EstadoPeriodo, string> = {
  PLANIFICADO: 'Planificado',
  ACTIVO: 'Activo',
  FINALIZADO: 'Finalizado',
}

export type DiaSemana =
  | 'LUNES'
  | 'MARTES'
  | 'MIERCOLES'
  | 'JUEVES'
  | 'VIERNES'
  | 'SABADO'
  | 'DOMINGO'

export const DIAS_SEMANA: DiaSemana[] = [
  'LUNES',
  'MARTES',
  'MIERCOLES',
  'JUEVES',
  'VIERNES',
  'SABADO',
  'DOMINGO',
]

export const ETIQUETA_DIA_SEMANA: Record<DiaSemana, string> = {
  LUNES: 'Lunes',
  MARTES: 'Martes',
  MIERCOLES: 'Miércoles',
  JUEVES: 'Jueves',
  VIERNES: 'Viernes',
  SABADO: 'Sábado',
  DOMINGO: 'Domingo',
}

// ---------------------------------------------------------------------------
// Campus
// ---------------------------------------------------------------------------

export interface CampusRequest {
  codigo: string
  nombre: string
  direccion?: string | null
}

export interface CampusResponse {
  id: string
  codigo: string
  nombre: string
  direccion: string | null
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// Bloque (pertenece a un Campus)
// ---------------------------------------------------------------------------

export interface BloqueRequest {
  campusId: string
  codigo: string
  nombre: string
}

export interface BloqueResponse {
  id: string
  campusId: string
  codigo: string
  nombre: string
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// Piso (pertenece a un Bloque)
// ---------------------------------------------------------------------------

export interface PisoRequest {
  bloqueId: string
  numero: number
  descripcion?: string | null
}

export interface PisoResponse {
  id: string
  bloqueId: string
  numero: number
  descripcion: string | null
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// Laboratorio (pertenece a un Piso; baja lógica vía PATCH /estado)
// ---------------------------------------------------------------------------

export interface LaboratorioRequest {
  pisoId: string
  codigo: string
  nombre: string
  capacidad: number
  descripcion?: string | null
}

export interface LaboratorioEstadoRequest {
  estado: EstadoLaboratorio
}

export interface LaboratorioResponse {
  id: string
  pisoId: string
  codigo: string
  nombre: string
  capacidad: number
  descripcion: string | null
  estado: EstadoLaboratorio
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// TipoEquipo (catálogo)
// ---------------------------------------------------------------------------

export interface TipoEquipoRequest {
  codigo: string
  nombre: string
  descripcion?: string | null
}

export interface TipoEquipoResponse {
  id: string
  codigo: string
  nombre: string
  descripcion: string | null
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// Equipo (pertenece a Laboratorio + TipoEquipo; baja lógica vía PATCH /estado)
// ---------------------------------------------------------------------------

export interface EquipoRequest {
  laboratorioId: string
  tipoEquipoId: string
  codigoInventario: string
  numeroSerie?: string | null
  marca?: string | null
  modelo?: string | null
  procesador?: string | null
  memoriaRam?: string | null
  almacenamiento?: string | null
  direccionIp?: string | null
  direccionMac?: string | null
  observacion?: string | null
}

export interface EquipoEstadoRequest {
  estado: EstadoEquipo
}

export interface EquipoResponse {
  id: string
  laboratorioId: string
  tipoEquipoId: string
  codigoInventario: string
  numeroSerie: string | null
  marca: string | null
  modelo: string | null
  procesador: string | null
  memoriaRam: string | null
  almacenamiento: string | null
  direccionIp: string | null
  direccionMac: string | null
  estado: EstadoEquipo
  observacion: string | null
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// Facultad (baja lógica vía PATCH /estado con { activo })
// ---------------------------------------------------------------------------

export interface FacultadRequest {
  codigo: string
  nombre: string
  descripcion?: string | null
}

export interface FacultadEstadoRequest {
  activo: boolean
}

export interface FacultadResponse {
  id: string
  codigo: string
  nombre: string
  descripcion: string | null
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// Carrera (pertenece a una Facultad)
// ---------------------------------------------------------------------------

export interface CarreraRequest {
  facultadId: string
  codigo: string
  nombre: string
  descripcion?: string | null
}

export interface CarreraResponse {
  id: string
  facultadId: string
  codigo: string
  nombre: string
  descripcion: string | null
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// Materia (pertenece a una Carrera)
// ---------------------------------------------------------------------------

export interface MateriaRequest {
  carreraId: string
  codigo: string
  nombre: string
  numeroHoras: number
}

export interface MateriaResponse {
  id: string
  carreraId: string
  codigo: string
  nombre: string
  numeroHoras: number
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// PeriodoLectivo (sin baja lógica: no tiene DELETE ni PATCH /estado)
// ---------------------------------------------------------------------------

export interface PeriodoLectivoRequest {
  codigo: string
  nombre: string
  fechaInicio: string // ISO date (yyyy-MM-dd)
  fechaFin: string // ISO date (yyyy-MM-dd)
  estado?: EstadoPeriodo | null
}

export interface PeriodoLectivoResponse {
  id: string
  codigo: string
  nombre: string
  fechaInicio: string
  fechaFin: string
  estado: EstadoPeriodo
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// HorarioAcademico (sin baja lógica; docenteId referencia a usuarios-service)
// ---------------------------------------------------------------------------

export interface HorarioAcademicoRequest {
  materiaId: string
  periodoLectivoId: string
  laboratorioId?: string | null
  docenteId: string
  diaSemana: DiaSemana
  horaInicio: string // HH:mm:ss
  horaFin: string // HH:mm:ss
  paralelo: string
}

export interface HorarioAcademicoResponse {
  id: string
  materiaId: string
  periodoLectivoId: string
  laboratorioId: string | null
  docenteId: string
  diaSemana: DiaSemana
  horaInicio: string
  horaFin: string
  paralelo: string
  activo: boolean
  creadoEn: string
  actualizadoEn: string
}

// ---------------------------------------------------------------------------
// Endpoints internos (solo lectura, consumidos hoy por reservas-solicitudes;
// se tipan aquí por completitud del dominio, no se usan desde el frontend)
// ---------------------------------------------------------------------------

export interface ExisteResponse {
  existe: boolean
}

export interface LaboratorioDisponibilidadBaseResponse {
  laboratorioId: string
  estado: EstadoLaboratorio
  capacidad: number
  activo: boolean
}
