<template>
  <div class="layout">
    <NavBars v-if="isLogged" class="navbar" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBars from './components/NavBars.vue';
import { computed } from 'vue';
import AuthService from './services/AuthService';

const isLogged = computed(() => AuthService.isLogg.value);
</script>

<style lang="scss">
.layout {
  display: flex;
  height: 100vh; 
  width: 100vw;  
}

.navbar {
  width: 250px; 
  padding: 20px;
}

.content {
  flex: 1; 
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
</style>
