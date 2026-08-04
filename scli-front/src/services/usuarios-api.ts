import axios from 'axios'

/**
 * Cliente HTTP de SOLO LECTURA hacia usuarios-service (puerto 8082).
 *
 * El módulo académico no escribe nada en usuarios-service. Este cliente
 * existe únicamente para resolver datos de docente (nombre, código,
 * departamento) al mostrar/crear un HorarioAcademico, que en el backend
 * solo guarda un docenteId (UUID) sin nombre.
 */

const baseURL = import.meta.env.VITE_USUARIOS_API_URL

if (!baseURL) {
  throw new Error('La variable VITE_USUARIOS_API_URL no está configurada')
}

export const usuariosApi = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

usuariosApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('scli_access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

usuariosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('scli_access_token')
      sessionStorage.removeItem('scli_auth_user')
    }

    return Promise.reject(error)
  },
)
