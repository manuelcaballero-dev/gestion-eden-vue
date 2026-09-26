<template>
  <section>
    <h2>Módulo de Clientes</h2>

    <div class="modulo-clientes">
      <ClienteFormulario />
      <ClienteTabla />
    </div>
  </section>
</template>

<script>
import ClienteFormulario from '../components/clientes/ClienteFormulario.vue'
import ClienteTabla from '../components/clientes/ClienteTabla.vue'

export default {
  name: 'ClientesView',

  components: {
    ClienteFormulario,
    ClienteTabla
  }
}
</script>