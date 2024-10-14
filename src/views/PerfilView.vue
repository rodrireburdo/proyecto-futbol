<template>
    <div>
        <h1>vista perfil </h1>
    </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import AuthService from '../services/AuthService';

const router = useRouter();

onBeforeMount(() => {
    if(!AuthService.isLogged()){
        router.push({ name: 'login' })
    }
})
</script>