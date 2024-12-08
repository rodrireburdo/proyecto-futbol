<template>
    <div v-if="!loading && finded">
        <div class="historial" v-if="info && !history">
            <button @click="toggleInfo" v-if="reportes.length > 0">Historial</button>
            <div class="datos">
                <div id="perfil">
                    <div class="image-container">
                        <img :src="jugador.urlPhoto" alt="">
                    </div>
                    <div class="info">
                        <h3>{{ jugador.name }}</h3>
                        <h4>Contacto: {{ jugador.email }}</h4>
                    </div>
                </div>
                
                <div v-if="reportes.length > 0">
                    <p>Estado: {{ lastReport.stateName }}</p>
                    <p>Comentario: {{ lastReport.comment }}</p>
                    <p>Fecha: {{ fechaArg(lastReport.createdAt) }}</p>
                    <p>Médico: {{ lastReport.medico }}</p>
                    <p>Especialidad: {{ lastReport.especialidad }}</p>
                </div>
                <div v-else>
                    <p>El jugador no posee reportes médicos</p>
                </div>
            </div>
        </div>

        <div class="historial" v-else>
            <button @click="toggleInfo">Perfil</button>
            <div v-if="reportes.length > 0">
                <div class="filtros">
                    <div>
                        <label for="estado">Estado:</label>
                        <select id="estado" v-model="estado">
                            <option value="">Todos</option>
                            <option v-for="state in estados" :key="state.stateName" :value="state.stateName">
                                {{ state.stateName }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <button @click="prevPage" :disabled="page === 0">Anterior</button>
                        <button @click="nextPage" :disabled="page >= totalPages - 1">Siguiente</button>
                        <p>Página {{ page + 1 }} de {{ totalPages }}</p>
                    </div>
                </div>
                <table class="responsive-table">
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Comentario</th>
                            <th>Fecha</th>
                            <th>Médico</th>
                            <th>Especialidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="report in filteredReports" :key="report.createdAt">
                            <td>{{ report.stateName }}</td>
                            <td>{{ report.comment }}</td>
                            <td>{{ fechaArg(report.createdAt) }}</td>
                            <td>{{ report.medico }}</td>
                            <td>{{ report.especialidad }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>No hay reportes disponibles.</p>
            </div>
        </div>
        
    </div>
    <div v-else>
        <h3 v-if="jugador.dni && loading">Cargando jugador...</h3>
        <h3 v-if="jugador.dni && !loading && !finded">No encontrado</h3>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onBeforeMount, computed } from 'vue'
import MedService from '@/services/MedService'
import StateService from '@/services/StateService'

let timer = null

const props = defineProps({
    dni: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['player-found'])

const loading = ref(false)
const finded = ref(false)
const info = ref(true)
const jugador = ref({
    dni: props.dni,
    urlPhoto: "",
    name: "",
    email: "",
    medicalReports: []
})
const reportes = ref([])
const lastReport = ref({})
const estados = ref([])
const estado = ref("")
const history = ref(false)
const oldPlayer = ref("")

const page = ref(0);
const size = ref(5);
const totalPages = ref(1);

const getStates = async () => {
    const response = await StateService.listStates()
    estados.value = response ?? []
}

const filteredReports = computed(() => {
    return reportes.value.filter(report => {
        let matchState = estado.value === "" || (report && report.stateName === estado.value)
        return matchState
    })
})

const toggleInfo = () => {
    info.value = history.value ? true : !info.value
    history.value = !history.value
}

const searchPlayer = async () => {
    info.value = true;
    loading.value = true;
    finded.value = false;
    const response = await MedService.searchPlayer(jugador.value.dni, page.value, size.value);
    if (response != null) {
        jugador.value.name = response.player.name;
        jugador.value.urlPhoto = response.player.profilePhotoUrl;
        jugador.value.email = response.player.email;
        jugador.value.medicalReports = response.player.medicalReports ?? [];

        jugador.value.medicalReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if(oldPlayer.value !== jugador.value.name) {
            let reports = response.player.medicalReports ?? []
            reports = reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            lastReport.value = reports[0] ?? {}
        }

        reportes.value = jugador.value.medicalReports;
        totalPages.value = response.totalPages;
        finded.value = true;
        emit('player-found', true);
    } else {
        emit('player-found', false);
    }
    loading.value = false;
};

const nextPage = () => {
    if (page.value < totalPages.value - 1) {
        page.value++;
        searchPlayer();
    }
};

const prevPage = () => {
    if (page.value > 0) {
        page.value--;
        searchPlayer();
    }
};

const fechaArg = (fechaJson) => {
    const fecha = new Date(fechaJson)
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' }
    return fecha.toLocaleString('es-ES', opciones)
}

onBeforeMount(() => {
    if (props.dni == null || props.dni.length > 5) {
        loading.value = true
        searchPlayer()
        getStates()
    } else {
        loading.value = false
    }
})

let interval = null;

watch(() => props.dni, (newDni) => {
    loading.value = true
    if(newDni.length > 5) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            jugador.value.dni = props.dni
            if (props.dni) {
                history.value = false
                page.value = 0
                searchPlayer()
                interval = setInterval(() => {
                    if(!loading.value){
                        oldPlayer.value = jugador.value.name
                        clearInterval(interval);
                    }
                }, 100)
            }
        }, 2000);
    }
        
})
</script>
<style scoped lang="scss">
.historial {
    background-color: #f8f9fa; // Fondo claro
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

    button {
        background-color: #007bff; // Color azul para el botón
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #0056b3; // Cambia el color al hacer hover
        }
    }

    h3, h4 {
        margin: 10px 0;
        color: #343a40; // Color oscuro para los títulos
    }

    .datos {
        margin-top: 10px;

        p {
            font-size: 1rem;
            margin: 5px 0;
        }
    }

    .filtros {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        label {
            margin-right: 10px;
            font-size: 1rem;
        }

        select {
            padding: 5px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;

        th, td {
            padding: 5px; // Aumentar el padding
            text-align: left;
            border-bottom: 1px solid #ddd;
            font-size: 1rem; // Aumentar tamaño de fuente
            line-height: 1.5; // Aumentar espacio entre líneas
        }

        th {
            background-color: #007bff;
            color: white;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2; // Filas alternas de distinto color
        }

        tr:hover {
            background-color: #e9ecef; // Color al hacer hover
        }
    }
}

img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover; /* Asegura que la imagen llene el área circular sin distorsión */
        display: block;
        margin: 0 auto 20px; /* Centra la imagen y añade un margen inferior */
}

.image-container {
    background-image: none !important;
}

/* Estilos para pantallas móviles */
@media (max-width: 768px) {
    table {
        width: 100%; // Asegurarse de que la tabla ocupe todo el ancho
        display: block; // Hacer la tabla un bloque para que se adapte
        overflow-x: auto; // Habilitar scroll horizontal si es necesario
        border: 0; // Quitar borde de la tabla
    }

    thead {
        display: none; // Ocultar encabezado
    }

    tr {
        display: flex; // Usar flexbox para filas
        flex-direction: column; // Apilar los elementos en columnas
        margin-bottom: 10px; // Espaciado entre filas
        border: 1px solid #ddd; // Agregar borde a cada fila
        border-radius: 8px; // Bordes redondeados
        padding: 10px; // Espaciado interno
        background-color: #fff; // Fondo blanco para filas
        width: 100%; // Asegurarse de que las filas ocupen todo el ancho
    }

    td {
        display: flex; // Usar flexbox para celdas
        padding: 8px 0; // Espaciado vertical
        border-bottom: 1px solid #ddd; // Borde inferior
        font-size: 1rem; // Aumentar tamaño de fuente
        width: 100%; // Asegurarse de que las celdas ocupen todo el ancho
    }

    td::before {
        content: attr(data-label); // Mostrar el título del campo
        font-weight: bold; // Negrita
        margin-right: 10px; // Espaciado a la derecha
    }
}

h3 {
    color: #333;
    font-size: 1.5rem;
}

h3, h4 {
    margin: 20px 0;
    text-align: center;
}
</style>