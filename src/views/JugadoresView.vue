<template>
    <div class="jugadores">
        <div class="filtros" v-if="!loadingC">
            <div>
                <label for="cat">Seleccione la categoría</label>
                <select id="cat" v-model="category" @input="handleCategory">
                    <option v-for="category in categories" :key="category.idCategory" :value="category.idCategory">{{ category.categoryName }}</option>
                </select>
            </div>
            <div v-if="category !== ''">
                <div v-if="jugadores.length > 0">
                    <div>
                        <h3>Lista de jugadores</h3>
                        <button @click="handleCategory">Actualizar</button>
                    </div>
                    <div class="table-container">
                        <table v-if="isDesktop">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Último ingreso</th>
                                    <th>Estado</th>
                                    <th>Fecha revisión</th>
                                    <th>Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="jugador in filteredJugadores" :key="jugador.dni">
                                    <td>{{ jugador.name }}</td>
                                    <td v-if="jugador.lastCheckIn">{{ fechaArg(jugador.lastCheckIn) }}</td>
                                    <td v-else>sin ingreso</td>
                                    <td v-if="jugador.estadoAct">{{ jugador.estadoAct.stateName }}</td>
                                    <td v-else>sin estado</td>
                                    <td v-if="jugador.estadoAct">{{ fechaArg(jugador.estadoAct.createdAt) }}</td>
                                    <td v-else>sin estado</td>
                                    <td><button @click="detailPlayer(jugador.dni)">Detalle</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else>
                            <div v-for="jugador in filteredJugadores" :key="jugador.dni" class="player-card">
                                <h4>{{ jugador.name }}</h4>
                                <p><strong>Último ingreso:</strong> {{ jugador.lastCheckIn ? fechaArg(jugador.lastCheckIn) : 'sin ingreso' }}</p>
                                <p><strong>Estado:</strong> {{ jugador.estadoAct ? jugador.estadoAct.stateName : 'sin estado' }}</p>
                                <p><strong>Fecha revisión:</strong> {{ jugador.estadoAct ? fechaArg(jugador.estadoAct.createdAt) : 'sin estado' }}</p>
                                <button @click="detailPlayer(jugador.dni)">Detalle</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="!loadingP">
                    <p>No hay jugadores registrados en esta categoría.</p>
                </div>
                <div v-else>
                    <p>Cargando jugadores...</p>
                </div>
            </div>
            <div v-else>
                <p v-if="categories.length === 0">Cargando categorías...</p>
            </div>
            <div v-if="showDetail">
                <h3>Detalles del jugador</h3>
                <PlayerDetails v-if="showDetail" :dni="jugador.dni" @player-found="onJugadorEncontrado" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, computed, onMounted } from 'vue';
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
const isDesktop = ref(true); // Variable para verificar si es desktop

// Función para verificar si es mobile o desktop
const checkDeviceType = () => {
    isDesktop.value = window.innerWidth >= 768; // Puedes ajustar el ancho según lo que consideres como 'desktop'
}

// Verifica el tipo de dispositivo al cargar el componente
onMounted(() => {
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType); // Escucha cambios de tamaño de ventana
});

// Limpia el listener al destruir el componente
onBeforeMount(() => {
    window.removeEventListener('resize', checkDeviceType);
});
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
<style scoped lang="scss">
.jugadores {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;

    // Contenedor para el scroll horizontal
    .table-container {
        overflow-x: auto; // Permite el scroll horizontal
        margin-bottom: 20px; // Añade un margen inferior
    }

    .filtros {
        margin-bottom: 20px;
        padding: 15px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        div {
            margin-bottom: 15px;

            label {
                font-weight: bold;
                margin-right: 10px;
            }

            select, input {
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 1rem;
                width: 100%;
            }
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;

        thead {
            background-color: #007bff;
            color: white;

            th {
                padding: 10px;
                text-align: left;
                font-weight: normal;
                white-space: nowrap; // Evita que el texto se divida en varias líneas
                width: 150px; // Ajusta el ancho según lo necesites
            }
        }

        tbody {
            tr:nth-child(even) {
                background-color: #f9f9f9;
            }

            td {
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #ddd;

                button {
                    padding: 6px 12px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;

                    &:hover {
                        background-color: #0056b3;
                    }
                }
            }
        }

        tbody tr:hover {
            background-color: #f1f1f1;
        }
    }

    h3 {
        margin-bottom: 20px;
        color: #333;
    }

    button {
        padding: 10px 20px;
        margin-bottom: 10px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;

        &:hover {
            background-color: #218838;
        }
    }

    p {
        color: #666;
        font-size: 1.1rem;
    }

    .mobile-table {
        display: flex;
        flex-direction: column;
        gap: 15px; // Espacio entre las tarjetas

        .player-card {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;

            h4 {
                margin: 0 0 10px;
                color: #333;
            }

            p {
                margin: 5px 0;
                color: #666;
                font-size: 1rem;
            }

            button {
                margin-top: 10px;
                padding: 8px 16px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s;

                &:hover {
                    background-color: #0056b3;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .jugadores {
        padding: 10px;

        .filtros {
            padding: 10px;

            div {
                margin-bottom: 10px;

                label {
                    font-size: 0.9rem; // Ajusta el tamaño del texto
                }

                select, input {
                    padding: 6px;
                    font-size: 0.9rem; // Ajusta el tamaño del texto
                }
            }
        }

        h3 {
            font-size: 1.5rem; // Ajusta el tamaño del título
        }

        .table-container {
            table {
                display: none;
            }
        }

        button {
            padding: 8px 16px; // Ajusta el tamaño del botón
            font-size: 0.9rem; // Ajusta el tamaño del texto
        }

        p {
            font-size: 1rem; // Ajusta el tamaño del texto
        }
    }
}
</style>