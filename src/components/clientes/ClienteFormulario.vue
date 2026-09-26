<template>
  <section class="card">
    <h3>
      {{ store.clienteSeleccionado ? 'Editar cliente' : 'Registrar cliente' }}
    </h3>

    <form @submit.prevent="guardar">
      <label for="cedulaNit">Cédula / NIT</label>
      <input
        id="cedulaNit"
        v-model="cliente.cedulaNit"
        type="text"
        maxlength="20"
        required
      />

      <label for="nombre">Nombre</label>
      <input
        id="nombre"
        v-model="cliente.nombre"
        type="text"
        maxlength="100"
        required
      />

      <label for="telefono">Teléfono</label>
      <input
        id="telefono"
        v-model="cliente.telefono"
        type="text"
        maxlength="20"
      />

      <label for="correo">Correo</label>
      <input
        id="correo"
        v-model="cliente.correo"
        type="email"
        maxlength="120"
      />

      <div class="acciones">
        <button type="submit">
          {{ store.clienteSeleccionado ? 'Actualizar' : 'Guardar' }}
        </button>

        <button
          v-if="store.clienteSeleccionado"
          type="button"
          class="secundario"
          @click="cancelar"
        >
          Cancelar
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { useClientesStore } from '../../stores/clientes'

export default {
  name: 'ClienteFormulario',

  data() {
    return {
      store: useClientesStore(),

      cliente: {
        cedulaNit: '',
        nombre: '',
        telefono: '',
        correo: ''
      }
    }
  },

  watch: {
    // Carga en el formulario el cliente seleccionado desde la tabla.
    'store.clienteSeleccionado'(cliente) {
      if (cliente) {
        this.cliente = {
          cedulaNit: cliente.cedulaNit,
          nombre: cliente.nombre,
          telefono: cliente.telefono || '',
          correo: cliente.correo || ''
        }
      }
    }
  },

  methods: {
    // Registra un cliente nuevo o actualiza el seleccionado.
    async guardar() {
      try {
        if (this.store.clienteSeleccionado) {
          await this.store.actualizarCliente(
            this.store.clienteSeleccionado.id,
            this.cliente
          )
        } else {
          await this.store.crearCliente(this.cliente)
        }

        this.limpiar()
      } catch (error) {
        console.error('Error al guardar el cliente:', error)
        alert('No fue posible guardar el cliente.')
      }
    },

    cancelar() {
      this.limpiar()
    },

    limpiar() {
      this.cliente = {
        cedulaNit: '',
        nombre: '',
        telefono: '',
        correo: ''
      }

      this.store.limpiarSeleccion()
    }
  }
}
</script>