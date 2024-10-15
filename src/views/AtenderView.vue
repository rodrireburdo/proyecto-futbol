<template>
  <div class="aten">
    <div id="idInput">
      <h3>Introduzca el DNI del jugador</h3>
      <input type="number" id="miInput" v-model="jugador.dni" @input="handleInput">
    </div>

    <!-- Componente hijo para mostrar los detalles del jugador -->
    <PlayerDetails v-if="jugador.dni" :dni="jugador.dni.toString()" @player-found="onJugadorEncontrado" />

    <!-- Formulario de nuevo reporte -->
    <div class="newReport" v-if="jugador.dni && finded">
      <h3>Actualización de estado</h3>
      <form class="login-form" @submit.prevent="saveReport">
        <label for="stado">Seleccione el nuevo estado</label>
        <select id="stado" v-model="report.stateName">
          <option v-for="state in states" :key="state.stateName" :value="state.stateName">{{ state.stateName }}</option>
        </select>
        <label for="stado">Descripción del nuevo estado</label>
        <input type="text" v-model="report.comment">
        <button type="submit" class="btn-access">Guardar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import PlayerDetails from '../components/PlayerDetails.vue'
import JwtService from '@/services/JwtService'
import MedService from '@/services/MedService'
import StateService from '@/services/StateService'
import AuthService from '@/services/AuthService';

const router = useRouter();

const jugador = ref({
  dni: null
})

const finded = ref(false)
const loading = ref(false)
const states = ref([])

let report = ref({
  comment: "",
  stateName: "",
  medico: "",
  player: ""
})

const handleInput = () => {
    loading.value = true;
    finded.value = false;
}

const onJugadorEncontrado = (data) => {
  finded.value = data;
  loading.value = false;
};

const loadStates = async () => {
  const response = await StateService.listStates()
  if (response != null) {
    states.value = response
  }
}

const saveReport = async () => {
  if (report.value.stateName !== "" && report.value.stateName.trim() !== "") {
    report.value.player = jugador.value.dni
    report.value.medico = JwtService.getDni()
    const response = await MedService.saveReport({ ...report.value })
    if (response != null) {
      report.value.comment = ""
      report.value.stateName = ""
      jugador.value.dni = null
      finded.value = false
    }
  } else {
    alert("Debe seleccionar un estado y escribir una descripción")
  }
}

onBeforeMount(() => {
    if(!(AuthService.isLogged() && JwtService.getArea() == 'MEDICA')){
        router.push({ name: 'login' })
    }

    loadStates();
})
</script>

<style scoped>
.aten {
  background-color: beige;
}
.newReport {
  margin-top: 20px;
}
</style>