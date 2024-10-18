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

<style scoped>
.navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 8px;

    .nav-item {
        margin: 10px 0;

        h2 {
            font-size: 1.8rem;
            font-weight: bold;
            color: #343a40; 
        }

        .nav-link {
            text-decoration: none;
            font-size: 1.2rem;
            color: #007bff; 
            padding: 8px;
            border-radius: 4px;
            transition: background-color 0.3s, color 0.3s;

            &:hover {
                background-color: #007bff;
                color: #fff; 
            }
        }

        button {
            font-size: 1.2rem;
            color: #dc3545; 
            background-color: transparent;
            border: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            transition: background-color 0.3s, color 0.3s;

            &:hover {
                background-color: #dc3545;
                color: #fff;
            }
        }
    }
}
</style>
