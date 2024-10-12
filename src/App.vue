<template>
  <div v-if="AuthService.isLogged()">
    <NavBar />
    <router-view />
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<script setup>
  import NavBar from './components/NavBar.vue';
  import AuthService from '@/services/AuthService';
  import JwtService from './services/JwtService';

  import { onBeforeMount } from 'vue';

  onBeforeMount(() => {
    if(AuthService.isLogged()){
      JwtService.logOut();
    }
  })
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
