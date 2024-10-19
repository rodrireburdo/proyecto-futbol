<template>
    <div class="navbar-container">
        <!-- Botón de hamburguesa, visible en móviles cuando el menú está cerrado -->
        <button class="hamburger-btn" @click="toggleMenu" v-if="!isMenuOpen && isMobile">
            ☰
        </button>

        <!-- Botón de cerrar menú, visible en móviles cuando el menú está abierto -->
        <button class="close-btn" @click="toggleMenu" v-if="isMenuOpen && isMobile">
            ✖
        </button>

        <!-- Menú de navegación -->
        <ul class="navbar-nav" :class="{ open: isMenuOpen }">
            <li class="nav-item">
                <h2>Área Médica</h2>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'perfil' }" class="nav-link" @click="closeMenu">Perfil</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'atender' }" class="nav-link" @click="closeMenu">Atender</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'perfil' }" class="nav-link" @click="closeMenu">Turnos</router-link>
            </li>
            <li class="nav-item">
                <button @click="logOut">Cerrar Sesión</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/AuthService';

const router = useRouter();
const isMenuOpen = ref(false);

const isMobile = computed(() => window.innerWidth <= 768);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

const logOut = () => {
    AuthService.logOut();
    router.push({ name: 'login' });
};
</script>


<style scoped>
.navbar-container {
    position: relative;
}

.hamburger-btn,
.close-btn {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #007bff;
    padding: 10px;
    display: none;
}

.navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
}

.navbar-nav.open {
    display: flex;
}

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

@media (max-width: 768px) {
    .nav-item {
        h2 {
            color: #fff;
        }
    }

    .navbar-nav {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.97);
        color: white;
        z-index: 50;
        /* Menu sobrepuesto */
        padding: 60px 20px 20px;
        /* Espacio superior para el botón de cierre */
    }

    .navbar-nav.open {
        display: flex;
    }

    .hamburger-btn {
        display: block;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 100;
        /* Botón de hamburguesa sobre el menú */
    }

    .close-btn {
        display: block;
        position: fixed;
        top: 10px;
        left: 10px;
        color: white;
        z-index: 100;
        /* Botón de cierre sobre el menú */
    }
}
</style>