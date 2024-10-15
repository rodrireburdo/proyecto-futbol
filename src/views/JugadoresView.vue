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
                <div >
                    <p>estado</p>
                </div>
                <div>
                    <p>por fecha</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>cargando categorias</p>
        </div>
        <div>
            <div v-if="jugadores.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="jugador in jugadores" :key="jugador.dni">
                            <td>{{ jugador.name }}</td>
                            <td v-if="jugador.estadoAct != null">{{ jugador.estadoAct.stateName }}</td>
                            <td v-else>sin estado</td>
                            <td v-if="jugador.estadoAct != null">{{ fecha(jugador.estadoAct.createdAt) }}</td>
                            <td><button>detalle</button></td>
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
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthService from '@/services/AuthService';
import JwtService from '@/services/JwtService';
import TecService from '@/services/TecService';

const router = useRouter();

let jugadores = ref([])
let categories = ref([])
let category = ref("")
let timer = null
let loadingC = ref(false)
let loadingP = ref(false)

const getCategories = async () => {
    loadingC.value = true
    const response = await TecService.getCategories()
    categories.value = response ?? []
    loadingC.value = false
}

const getJugadores = async (idCategory) => {
    loadingP.value = true
    const response = await TecService.getPlayers(idCategory)
    jugadores.value = response ?? []
    loadingP.value = false
}

const handleCategory = async () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        jugadores.value = []
        getJugadores(category.value);
    }, 2000);
}

const fecha = (fechaJson) => {
    const fecha = new Date(fechaJson);

    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    return fecha.toLocaleString('es-ES', opciones);
}

onBeforeMount(() => {
    if(!(AuthService.isLogged() && JwtService.getArea() == 'TECNICA')){
        router.push({ name: 'login' })
    }

    getCategories()
})
</script>

<style setup>
    .jugadores {
        background-color: beige;
    }
</style>