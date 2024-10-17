<template>
    <div class="check">
        <div id="idInput">
            <h3>Introduzca el DNI del jugador</h3>
            <input type="number" id="miInput" v-model="jugador.dni" @input="handleInput">
        </div>
        <div v-if="jugador.dni > 0">
            <h3 v-if="jugador.dni && loading">Cargando...</h3>
            <h3 v-if="jugador.dni && !loading && !finded">No se pudo actualizar</h3>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';
import JwtService from '@/services/JwtService'
import AuthService from '@/services/AuthService';
import TecService from '@/services/TecService';

let timer = null;

const router = useRouter();

const loading = ref(false)
const finded = ref(false)

const jugador = ref({
  dni: null
})

const handleInput = () => {
    loading.value = true
    clearTimeout(timer);
    timer = setTimeout(() => {
        searchPlayer()
    }, 3000);
}

const searchPlayer = async () => {
    finded.value = false
    const response = await TecService.checkInPlayer(jugador.value.dni)
    if (response != null) {
        finded.value = true
        jugador.value.dni = null
    }
    loading.value = false
}

onBeforeMount(() => {
    if(!(AuthService.isLogged() && JwtService.getArea() == 'TECNICA')){
        router.push({ name: 'login' })
    }
})

onUnmounted(() => {
    router.push({ name: 'login' })
})
</script>

<style setup>
    .check {
        background-color: beige;
    }
</style>