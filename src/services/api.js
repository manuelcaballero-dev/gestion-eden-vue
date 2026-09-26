import axios from 'axios'

// Cliente HTTP centralizado para comunicarse con el backend de Gestión Edén.
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api