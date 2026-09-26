import { defineStore } from 'pinia'
import clienteService from '../services/clienteService'

export const useClientesStore = defineStore('clientes', {
  state: () => ({
    clientes: [],
    clienteSeleccionado: null
  }),

  actions: {

    // Obtiene todos los clientes desde el backend.
    async cargarClientes() {
      const respuesta = await clienteService.listar()
      this.clientes = respuesta.data
    },

    // Busca un cliente específico por su ID.
    async buscarClientePorId(id) {
      const respuesta = await clienteService.buscarPorId(id)
      this.clientes = [respuesta.data]
    },

    // Registra un nuevo cliente.
    async crearCliente(cliente) {
      await clienteService.crear(cliente)
      await this.cargarClientes()
    },

    // Actualiza un cliente y mantiene únicamente el registro actualizado en la tabla.
    async actualizarCliente(id, cliente) {
      const respuesta = await clienteService.actualizar(id, cliente)
      this.clientes = [respuesta.data]
    },

    // Elimina un cliente y actualiza el listado.
    async eliminarCliente(id) {
      await clienteService.eliminar(id)
      await this.cargarClientes()
    },

    seleccionarCliente(cliente) {
      this.clienteSeleccionado = { ...cliente }
    },

    limpiarSeleccion() {
      this.clienteSeleccionado = null
    }
  }
})