<template>
  <NavBars v-if="isLogeed"/>
  <h1 v-if="isLogeed">es logueado</h1>
  <router-view />
</template>

<script setup>
import NavBars from './components/NavBars.vue';

import { computed } from 'vue';
import AuthService from './services/AuthService';

const isLogeed = computed(() => AuthService.isLogg.value);
</script>

<style lang="scss">
  body {
  background-color: #333;
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
