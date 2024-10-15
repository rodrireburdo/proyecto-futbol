<template>
    <div v-if="!loading" class="perf">
        <h1>vista perfil </h1>
        <h3>Bienvenido, {{ perfil.name }}</h3>
        <h3>email {{ perfil.email }}</h3>
        <h3 v-if="JwtService.getAuthority() == 'STAFF'">{{ perfil.rol }}</h3>
    </div>
    <div v-else>
        <h3>cargando informacion del perfil</h3>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthService from '../services/AuthService';
import JwtService from '@/services/JwtService';

const loading = ref(false)
const router = useRouter();

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

<style scoped>
    .perf {
        background-color: aliceblue;
    }
</style>