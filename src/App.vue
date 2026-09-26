<template>
  <div class="app">
    <header class="encabezado">
      <div>
        <h1>Gestión Edén</h1>
        <p>Panel de gestión administrativa</p>
      </div>

      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/clientes">Clientes</RouterLink>
      </nav>
    </header>

    <main class="contenido">
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
