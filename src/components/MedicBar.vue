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
    </ul>
</template>

<script setup>

</script>