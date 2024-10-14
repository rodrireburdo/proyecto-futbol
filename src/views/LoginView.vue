<template>
    <LoginForm />
</template>
<script setup>
  import LoginForm from '@/components/LoginForm.vue';
  import AuthService from '@/services/AuthService';

  import { onBeforeMount } from 'vue';

  onBeforeMount(() => {
    if(AuthService.isLogg){
      AuthService.logOut()
    }
  })
</script>
<style>
    body {
        background-image: url("../assets/Fondos/FondoLogin.jpg");
        background-size: cover; 
        background-position: center;
        background-repeat: no-repeat; 
        width: 100vw; 
        height: 100vh; 
        display: flex;
        justify-content: center; 
        padding-top: 30px;
    }
</style>