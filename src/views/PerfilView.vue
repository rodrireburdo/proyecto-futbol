<template>
    <div v-if="!loading" class="perf">
        <h1>Perfil</h1>
        <img :src="fotoUrl" alt="Foto de perfil">
        <h3>Bienvenido, {{ perfil.name }}</h3>
        <h3>Email {{ perfil.email }}</h3>
        <h3 v-if="JwtService.getAuthority() == 'STAFF'">{{ perfil.rol }}</h3>
    </div>
    <div v-else>
        <h3>Cargando informacion del perfil..</h3>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthService from '../services/AuthService';
import JwtService from '@/services/JwtService';

const loading = ref(false)
const router = useRouter();

const fotoUrl = ref('') 

let perfil = ref({
    dni: "",
    name: "",
    email: "",
    area: "",
    rol: ""
})

const getProfile = async () => {
    loading.value = true;
    const user = await AuthService.getPerfil();
    fotoUrl.value = user.profilePhotoUrl
    perfil.value.dni = user.dni;
    perfil.value.name = user.name;
    perfil.value.email = user.email;
    perfil.value.area = user.areaN;
    perfil.value.rol = user.rolN;
    loading.value = false;
}

onBeforeMount(() => {
    if(!AuthService.isLogged()){
        router.push({ name: 'login' })
    }

    getProfile()
})
</script>

<style scoped lang="scss">
.perf {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h1 {
        color: #333;
        font-size: 2rem;
        margin-bottom: 15px;
    }

    h3 {
        color: #555;
        font-size: 1.2rem;
        margin-bottom: 10px;

        &:nth-child(3) {
            font-weight: bold;
        }
    }

    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover; /* Asegura que la imagen llene el área circular sin distorsión */
        display: block;
        margin: 0 auto 20px; /* Centra la imagen y añade un margen inferior */
    }
}

h3.loading {
    color: #007bff;
    text-align: center;
    margin-top: 20px;
}
</style>
