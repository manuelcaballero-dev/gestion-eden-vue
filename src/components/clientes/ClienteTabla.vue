<template>
  <section class="card tabla-contenedor">
    <h3>Clientes registrados</h3>

    <!-- Consulta individual de clientes por ID -->
    <div class="busqueda">
      <label for="clienteId">Consultar por ID:</label>

      <input
        id="clienteId"
        v-model.number="idBusqueda"
        type="number"
        min="1"
        placeholder="ID"
        @keyup.enter="buscarPorId"
      />

      <button @click="buscarPorId">
        Buscar
      </button>

      <button
        class="secundario"
        @click="mostrarTodos"
      >
        Todos
      </button>
    </div>

    <p v-if="mensaje" class="mensaje">
      {{ mensaje }}
    </p>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cédula / NIT</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="cliente in store.clientes"
          :key="cliente.id"
        >
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.cedulaNit }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>{{ cliente.correo }}</td>

          <td class="acciones-tabla">
            <button @click="store.seleccionarCliente(cliente)">
              Editar
            </button>

            <button
              class="eliminar"
              @click="eliminar(cliente.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>

        <tr v-if="store.clientes.length === 0">
          <td colspan="6">
            No hay clientes para mostrar.
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { useClientesStore } from '../../stores/clientes'

export default {
  name: 'ClienteTabla',

  data() {
    return {
      store: useClientesStore(),
      idBusqueda: null,
      mensaje: ''
    }
  },

  async mounted() {
    // Consulta todos los clientes al cargar el componente.
    try {
      await this.store.cargarClientes()
    } catch (error) {
      console.error('Error al consultar clientes:', error)
    }
  },

  methods: {

    // Consulta un cliente específico utilizando su ID.
    async buscarPorId() {
      if (!this.idBusqueda) {
        this.mensaje = 'Ingrese un ID válido.'
        return
      }

      try {
        await this.store.buscarClientePorId(this.idBusqueda)
        this.mensaje = ''
      } catch (error) {
        console.error('Cliente no encontrado:', error)

        this.store.clientes = []
        this.mensaje = `No se encontró un cliente con ID ${this.idBusqueda}.`
      }
    },

    // Recupera nuevamente el listado completo.
    async mostrarTodos() {
      try {
        this.idBusqueda = null
        this.mensaje = ''
        await this.store.cargarClientes()
      } catch (error) {
        console.error('Error al consultar clientes:', error)
      }
    },

    // Elimina el cliente seleccionado.
    async eliminar(id) {
      const confirmar = confirm('¿Desea eliminar este cliente?')

      if (!confirmar) {
        return
      }

      try {
        await this.store.eliminarCliente(id)

        this.idBusqueda = null
        this.mensaje = ''

        if (this.store.clienteSeleccionado?.id === id) {
          this.store.limpiarSeleccion()
        }
      } catch (error) {
        console.error('Error al eliminar el cliente:', error)
        alert('No fue posible eliminar el cliente.')
      }
    }
  }
}
</script>