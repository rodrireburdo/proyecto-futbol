<template>
    <div class="jugadores">
        <div class="filtros" v-if="!loadingC">
            <div>
                <label for="cat">seleccione la categoria</label>
                <select id="cat" v-model="category" @input="handleCategory">
                    <option v-for="category in categories" :key="category.idCategory" :value="category.idCategory">{{ category.categoryName }}</option>
                </select>
            </div>
            <div v-if="category != ''">
                <div v-if="jugadores.length > 0">
                    <label for="stado">filtre por estado</label>
                    <select id="stado" v-model="state">
                        <option value="">Todos</option> 
                        <option v-for="estado in states" :key="estado.stateName" :value="estado.stateName">{{ estado.stateName }}</option>
                    </select>
                </div>
                <div>
                    <p>Filtre por fecha y hora de último ingreso</p>
                    <label for="startDate">Desde:</label>
                    <input type="datetime-local" id="startDate" v-model="startDate" @change="handleCategory">
                    
                    <label for="endDate">Hasta:</label>
                    <input type="datetime-local" id="endDate" v-model="endDate" @change="handleCategory">
                </div>
            </div>
        </div>
        <div v-else>
            <p>cargando categorias</p>
        </div>
        <div>
            <div v-if="showDetail">
                <h3>Detalles del jugador</h3>
                <PlayerDetails v-if="showDetail" :dni="jugador.dni" @player-found="onJugadorEncontrado" />
            </div>
            <div v-if="jugadores.length > 0">
                <div>
                    <h3>lista de jugadores</h3>
                    <button @click="handleCategory">actualizar</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Ultimo ingreso</th>
                            <th>Estado</th>
                            <th>Fecha revision</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="jugador in filteredJugadores" :key="jugador.dni">
                            <td>{{ jugador.name }}</td>
                            <td v-if="jugador.lastCheckIn != null">{{ fechaArg(jugador.lastCheckIn) }}</td>
                            <td v-else>sin ingreso</td>
                            <td v-if="jugador.estadoAct != null">{{ jugador.estadoAct.stateName }}</td>
                            <td v-else>sin estado</td>
                            <td v-if="jugador.estadoAct != null">{{ fechaArg(jugador.estadoAct.createdAt) }}</td>
                            <td v-else>sin estado</td>
                            <td><button @click="detailPlayer(jugador.dni)">detalle</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else-if="!loadingP && category != ''">
                <p>cargando jugadores</p>
            </div>
            <div v-else>
                <p v-if="category != ''">No hay jugadores registrados en esta categoria.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import AuthService from '@/services/AuthService';
import JwtService from '@/services/JwtService';
import TecService from '@/services/TecService';
import PlayerDetails from '@/components/PlayerDetails.vue';
import StateService from '@/services/StateService';

const router = useRouter();

let jugadores = ref([])
let categories = ref([])
let category = ref("")
let states = ref([])
let state = ref("")
let timer = null
let loadingC = ref(false)
let loadingP = ref(false)
let showDetail = ref(false)
let startDate = ref("")
let endDate = ref("")
const jugador = ref({
  dni: null
})

const filteredJugadores = computed(() => {
    return jugadores.value.filter(jugador => {
        showDetail.value = false
        // Filtro por estado
        let matchState = state.value === "" || (jugador.estadoAct && jugador.estadoAct.stateName === state.value)

        // Filtro por fecha
        /*let matchDate = true
        if (startDate.value && endDate.value && jugador.estadoAct) {
            const createdAt = new Date(jugador.estadoAct.createdAt)
            const start = new Date(startDate.value)
            const end = new Date(endDate.value)
            matchDate = createdAt >= start && createdAt <= end
        }*/

        let matchCheckIn = true
        if (startDate.value && endDate.value && jugador.lastCheckIn) {
            const checkInDate = new Date(jugador.lastCheckIn)
            const start = new Date(startDate.value)
            const end = new Date(endDate.value)
            matchCheckIn = checkInDate >= start && checkInDate <= end
        }

        return matchState && matchCheckIn
        //&& matchDate
    })
})

const getCategories = async () => {
    loadingC.value = true
    const response = await TecService.getCategories()
    categories.value = response ?? []
    loadingC.value = false
}

const getStates = async () => {
    loadingC.value = true
    const response = await StateService.listStates()
    states.value = response ?? []
    loadingC.value = false
}

const getJugadores = async (idCategory) => {
    loadingP.value = true
    const response = await TecService.getPlayers(idCategory)
    jugadores.value = response ?? []
    loadingP.value = false
}

const handleCategory = async () => {
    showDetail.value = false
    clearTimeout(timer);
    timer = setTimeout(() => {
        jugadores.value = []
        state.value = ""
        getJugadores(category.value);
    }, 500);
}

const fechaArg = (fechaJson) => {
    const fecha = new Date(fechaJson);

    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' };
    return fecha.toLocaleString('es-ES', opciones);
}

const detailPlayer = (dni) => {
    jugador.value.dni = dni
    showDetail.value = true
}

const onJugadorEncontrado = (data) => {
    showDetail.value = data
}

onBeforeMount(() => {
    if(!(AuthService.isLogged() && JwtService.getArea() == 'TECNICA')){
        router.push({ name: 'login' })
    }

    getStates()
    getCategories()
})
</script>

<style setup>
    .jugadores {
        background-color: beige;
    }
</style>