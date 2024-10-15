<template>
    <div class="aten">
        <div id="idInput">
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
                    <h3>actualizacion de estado</h3>
                    <form class="login-form" @submit.prevent="saveReport">
                        <label for="stado">seleccione el nuevo estado</label>
                        <select id="stado" v-model="report.stateName">
                            <option v-for="state in states" :key="state.stateName" :value="state.stateName">{{ state.stateName }}</option>
                        </select>
                        <label for="stado">descripcion del nuevo estado</label>
                        <input type="text" v-model="report.comment">
                        <button type="submit" class="btn-access">Guardar</button>
                    </form>
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
import StateService from '@/services/StateService';

const loading = ref(false)
const finded = ref(false)
const router = useRouter();
let timer = null
const reportes = ref([])
const states = ref([])

let jugador = ref({
    dni: null,
    name: "",
    email: "",
    medicalReports: []
})

let report = ref({
    comment : "",	

    stateName : "",	

    medico : "",

    player : ""	
})

const handleInput = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        searchP();
    }, 2000);
}

const searchP = async () => {
    clearPlayer()
    loading.value = true;
    finded.value = false;
    const response = await MedService.searchPlayer(jugador.value.dni.toString())
    if(response != null){
        jugador.value.name = response.name
        jugador.value.email = response.email
        jugador.value.medicalReports = response.medicalReports ?? []

        reportes.value = jugador.value.medicalReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        finded.value = true;
    }
    loading.value = false;
}

const loadStates = async () => {
    const response = await StateService.listStates()
    if(response != null){
        states.value = response
    }
}

const fecha = (fechaJson) => {
    const fecha = new Date(fechaJson);

    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    return fecha.toLocaleString('es-ES', opciones);
}

const saveReport = async () => {
    if(report.value.stateName != "" && report.value.stateName.trim() != ""){
        report.value.player = jugador.value.dni
        report.value.medico = JwtService.getDni()
        const response = await MedService.saveReport({...report.value})
        console.log(response)
        if(response != null){
            report.value.comment = ""
            report.value.stateName = ""
            jugador.value.dni = null
            clearPlayer()
        }
    }else{
        alert("Debe seleccionar un estado y escribir una descripcion")
    }
    
}

const clearPlayer = () => {
    jugador.value.name = "",
    jugador.value.email = "",
    jugador.value.medicalReports = [],
    reportes.value = [],
    finded.value = false
}

onBeforeMount(() => {
    if(!(AuthService.isLogged() && JwtService.getArea() == 'MEDICA')){
        router.push({ name: 'login' })
    }

    loadStates();
})
</script>

<style setup>
    .aten {
        background-color: beige;
    }
</style>