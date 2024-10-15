<template>
    <ul class="navbar-nav">
        <li class="nav-item">   
            <h2>Administradores</h2>
        </li>
        <li class="nav-item">   
            <router-link :to="{name: 'perfil'}" class="nav-link">Perfil </router-link>
        </li>
        <li class="nav-item">   
            <router-link :to="{name: 'perfil'}" class="nav-link">Categorias </router-link>
        </li>
        <li class="nav-item">   
            <router-link :to="{name: 'perfil'}" class="nav-link">Areas </router-link>
        </li>
        <li class="nav-item">   
            <router-link :to="{name: 'perfil'}" class="nav-link">Personal </router-link>
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