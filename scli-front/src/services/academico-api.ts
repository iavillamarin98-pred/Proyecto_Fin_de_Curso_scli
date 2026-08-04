import axios from 'axios'

/**
 * Cliente HTTP para academico-laboratorios-service (puerto 8083).
 *
 * Nota de arquitectura: se apunta directo al servicio (igual que
 * services/api.ts hace con auth-service) y NO a través del API Gateway,
 * porque el gateway actualmente no tiene una ruta funcional hacia este
 * servicio (su RouterFunction real solo enruta auth-service y
 * usuarios-service; la ruta declarada en su application.yml para
 * "/api/v1/academico/**" tampoco coincide con las rutas reales de los
 * controllers, que no usan ese prefijo). Cuando el equipo corrija el
 * gateway, este archivo es el único lugar que habría que actualizar.
 */

const baseURL = import.meta.env.VITE_ACADEMICO_API_URL

if (!baseURL) {
  throw new Error('La variable VITE_ACADEMICO_API_URL no está configurada')
}

export const academicoApi = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

academicoApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('scli_access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

academicoApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('scli_access_token')
      sessionStorage.removeItem('scli_auth_user')
    }

    return Promise.reject(error)
  },
)
