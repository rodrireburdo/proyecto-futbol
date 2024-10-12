<template>
    <h1>Hola entrenador</h1>
</template>

<script setup>
    import { onBeforeMount} from 'vue';
    import { useRouter } from 'vue-router'; // Llamado correcto fuera de la función
    import AuthService from '@/services/AuthService';

    const router = useRouter();

    onBeforeMount(() => {
        if(!AuthService.isLogged()){
            router.push({ name: 'login' })
        }
    })
</script>