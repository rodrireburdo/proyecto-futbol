<template>
  <div class="login-container">
    <LoginForm />
    <div class="image-container">
      <div class="overlay-text">
        <h2>PLAYER PASS</h2>
        <p>Un equipo conectado, un equipo ganador.</p>
      </div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/07/%D0%A4%D0%9A_%22%D0%9A%D0%BE%D0%BB%D0%BE%D1%81%22_%28%D0%97%D0%B0%D1%87%D0%B5%D0%BF%D0%B8%D0%BB%D0%BE%D0%B2%D0%BA%D0%B0%2C_%D0%A5%D0%B0%D1%80%D1%8C%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%29_-_%D0%A4%D0%9A_%22%D0%91%D0%B0%D0%BB%D0%BA%D0%B0%D0%BD%D1%8B%22_%28%D0%97%D0%B0%D1%80%D1%8F%2C_%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%29_%2818790931100%29.jpg" alt="foto deportes">
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
  width: auto;
  max-width: 1000px;
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
  width: 100%; 
  height: auto; 
  object-fit: cover;
  position: relative;   
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/0/07/%D0%A4%D0%9A_%22%D0%9A%D0%BE%D0%BB%D0%BE%D1%81%22_%28%D0%97%D0%B0%D1%87%D0%B5%D0%BF%D0%B8%D0%BB%D0%BE%D0%B2%D0%BA%D0%B0%2C_%D0%A5%D0%B0%D1%80%D1%8C%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%29_-_%D0%A4%D0%9A_%22%D0%91%D0%B0%D0%BB%D0%BA%D0%B0%D0%BD%D1%8B%22_%28%D0%97%D0%B0%D1%80%D1%8F%2C_%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%29_%2818790931100%29.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}


.overlay-text {
  position: absolute;
  top: 50%;
  left: 30%;
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