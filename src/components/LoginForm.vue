<template>
    <div class="div-login">
        <form class="login-form" @submit.prevent="access">
            <!-- Mensaje de error para el DNI -->
            <p v-if="errorDni" class="error-message">*El DNI debe contener exactamente 8 números</p>
            <input v-model="dni" id="dni" class="input-dni" placeholder="Número de documento" type="text" />
            
            <!-- Mensaje de error para la contraseña -->
            <p v-if="errorPassword" class="error-message">*La contraseña debe tener al menos 6 caracteres</p>
            <input v-model="password" type="password" class="input-dni" placeholder="Contraseña" />

            <button type="submit" class="btn-access">Acceder</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Llamado correcto fuera de la función
import AuthService from '@/services/AuthService';

const dni = ref('');
const password = ref('');

const errorDni = ref(false);
const errorPassword = ref(false);

const router = useRouter(); // Declarado correctamente fuera de la función

//const authService = new AuthService()

const access = async () =>{
    // Resetear errores
    errorDni.value = false;
    errorPassword.value = false;

    // Validación de DNI y contraseña
    const dniRegex = /^\d{8}$/;
    if (!dniRegex.test(dni.value)) {
        errorDni.value = true;
    }

    if (password.value.length < 6) {
        errorPassword.value = true;
    }

    // Si no hay errores, redirigir a la vista CoachHome
    if (await AuthService.logIn(dni.value.toString(), password.value)) {
        router.push({ name: 'perfil' }); // Verifica que la ruta tenga este nombre
    }else{
        alert('DNI o contraseña incorrectos'); // Añadir un mensaje personalizado
    }
}

</script>


<style scoped>
.error-message {
    color: red;
    font-size: 12px;
}
</style>


<style scoped lang="scss">
html, body {
    height: 100%;
    margin: 0;
}

.div-login {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0;
    padding: 50px; 
    box-sizing: border-box;

}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 10px;
}

.label-dni {
    margin-bottom: 15px;
    color: #333;
}

.input-dni {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.btn-access {
    padding: 10px 20px;
    color: #fff;
    background-color: blue;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
}

.btn-access:hover {
    background-color: green;
}

.error-message {
    color: red;
    margin-bottom: 10px;
}
</style>