<template>
    <ul class="navbar-nav">
        <li class="nav-item">   
            <h2>Area Medica</h2>
        </li>
        <li class="nav-item">   
            <router-link :to="{name: 'perfil'}" class="nav-link">Perfil </router-link>
        </li>
        <li class="nav-item">   
            <router-link :to="{name: 'atender'}" class="nav-link">Atender </router-link>
        </li>
        <li class="nav-item">   
            <router-link :to="{name: 'perfil'}" class="nav-link">Turnos </router-link>
        </li>
        <li class="nav-item">   
            <button @click="logOut">Cerrar Sesion</button>
        </li>
    </ul>
</template>

<script setup>
import AuthService from '@/services/AuthService';
import { useRouter } from 'vue-router';

const router = useRouter();

const logOut = () => {
    AuthService.logOut();
    router.push({ name: 'login' });
}

</script>