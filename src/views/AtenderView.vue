<template>
    <div class="aten">
        <div>
            <h3>introduzca el dni del jugador</h3>
            <input type="number" id="miInput" v-model="jugador.dni" @input="handleInput">
        </div>
        <div v-if="!loading && finded">
            <div class="datos">
                <h3>{{ jugador.name }}</h3>
                <h4>Contacto: {{ jugador.email }}</h4>
                <div v-if="reportes.length > 0">
                    <p>estado: {{ reportes[0].stateName }}</p>
                    <p>comentario: {{ reportes[0].comment }}</p>
                    <p>fecha: {{ fecha(reportes[0].createdAt) }}</p>
                    <p>medico: {{ reportes[0].medico }}</p>
                    <p>especialidad: {{ reportes[0].especialidad }}</p>
                </div>
                <div v-else class="datos">
                    <p v-if="jugador.dni > 0">el jugador no posee reportes medicos</p>
                </div>
                <div class="newReport">
                    <MedReportForm/>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 v-if="jugador.dni > 0">cargando jugador</h3>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue'

import AuthService from '../services/AuthService';
import JwtService from '@/services/JwtService';
import MedService from '@/services/MedService';
import MedReportForm from '@/components/MedReportForm.vue';

const loading = ref(false)
const finded = ref(false)
const router = useRouter();
let timer = null
const reportes = ref([])

let jugador = ref({
    dni: null,
    name: "",
    email: "",
    medicalReports: []
})

const handleInput = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        searchP();
    }, 2000);
}

const searchP = async () => {
    loading.value = true;
    finded.value = false;
    const response = await MedService.searchPlayer(jugador.value.dni.toString())
    if(response != null){
        jugador.value.name = response.name
        jugador.value.email = response.email
        jugador.value.medicalReports = response.medicalReports ?? []

        reportes.value = jugador.value.medicalReports
        finded.value = true;
    }
    loading.value = false;
} 

const fecha = (fechaJson) => {
    const fecha = new Date(fechaJson);

    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return fecha.toLocaleString('es-ES', opciones);
}

onBeforeMount(() => {
    if(!(AuthService.isLogged() && JwtService.getArea() == 'MEDICA')){
        router.push({ name: 'login' })
    }
})
</script>

<style setup>
    .aten {
        background-color: beige;
    }
</style>