import api from './api'

// Servicio encargado de las operaciones REST del módulo Clientes.
const clienteService = {

  listar() {
    return api.get('/clientes')
  },

  buscarPorId(id) {
    return api.get(`/clientes/${id}`)
  },

  crear(cliente) {
    return api.post('/clientes', cliente)
  },

  actualizar(id, cliente) {
    return api.put(`/clientes/${id}`, cliente)
  },

  eliminar(id) {
    return api.delete(`/clientes/${id}`)
  }
}

export default clienteService