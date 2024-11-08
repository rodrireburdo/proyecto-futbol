<template>
  <div class="layout">
    <div v-if="isLogged && currentPage" class="navbar">
      <NavBars />
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBars from './components/NavBars.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from './services/AuthService';


const router = useRouter();

const currentPage = computed(() => {
  return router.currentRoute.value.name !== 'checkin'
});

const isLogged = computed(() => AuthService.isLogg.value);
</script>

<style lang="scss">
.layout {
  display: flex;
  //grid-template-columns: 250px 1fr; /* La primera columna es de 250px y la segunda ocupa el espacio restante */
  
  padding: 20px;
  margin-inline: 10px;
  height: auto;
  width: 100vw;

}

.navbar {
  padding: 20px;
}

.content {
  padding: 20px;
  overflow-y: auto;
}

body {
  background-size: 16px 16px;
  font-family: "Roboto Condensed", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

/* Para pantallas más pequeñas, ajusta el layout */
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr; /* Colapsa a una columna */
    grid-template-rows: auto 1fr; /* La navbar y luego el contenido */
  }

  .navbar {
    width: 100%; /* Ajusta la barra de navegación a toda la pantalla */
  }
}
</style>