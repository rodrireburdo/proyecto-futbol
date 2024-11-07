<template>
  <div class="login-container">
    <LoginForm />
    <div class="image-container">
      <div class="overlay-text">
        <h2>PLAYER PASS</h2>
        <p>Un equipo conectado, un equipo ganador.</p>
      </div>
      <img src="https://sportsmedicinesystems.com/wp-content/uploads/2021/08/Foro-virtual-El-deporte-dentro-y-fuera-de-la-cancha-2.jpg" alt="foto deportes">
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue';
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
  align-items: center;
}

.login-container {
  width: 1200px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.LoginForm {
  flex: 1;
  padding: 20px;
}

.image-container {
  flex: 1;
  position: relative; /* Position relative to contain the overlay */
  background-image: url("https://sportsmedicinesystems.com/wp-content/uploads/2021/08/Foro-virtual-El-deporte-dentro-y-fuera-de-la-cancha-2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5); /* Background for better readability */
  padding: 20px;
  border-radius: 8px;
}

.overlay-text h2 {
  font-size: 24px;
  margin: 0;
}

.overlay-text p {
  font-size: 16px;
  margin: 5px 0 0;
}
</style>