<template>
  <section class="inicio">
    <h2>Bienvenido a Gestión Edén</h2>
    <p>
      Sistema para la gestión de información de la microempresa 'Edén Muisca'.
    </p>

    <RouterLink to="/clientes" class="boton">
      Gestionar clientes
    </RouterLink>
  </section>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>