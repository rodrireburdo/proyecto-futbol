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

<style scoped lang="scss">
.aten {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto;

    #idInput {
        margin-bottom: 20px;

        h3 {
            margin-bottom: 10px;
            color: #333;
        }

        input {
            width: 100%;
            padding: 10px;
            font-size: 1.1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-bottom: 15px;
        }
    }

    .newReport {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: 20px;

        h3 {
            margin-bottom: 15px;
            color: #007bff;
        }

        .login-form {
            display: flex;
            flex-direction: column;

            label {
                font-weight: bold;
                margin-bottom: 5px;
                color: #555;
            }

            select, input {
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 1rem;
            }

            .btn-access {
                padding: 10px 20px;
                background-color: #28a745;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1.1rem;
                transition: background-color 0.3s;

                &:hover {
                    background-color: #218838;
                }
            }
        }
    }
}
</style>