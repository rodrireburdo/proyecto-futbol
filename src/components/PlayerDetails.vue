<template>
    <div v-if="!loading && finded">
        <div class="historial" v-if="info">
            <button @click="toggleInfo" v-if="reportes.length > 0">historial</button>
            <div class="datos">
                <h3>{{ jugador.name }}</h3>
                <h4>Contacto: {{ jugador.email }}</h4>
                <div v-if="reportes.length > 0">
                    <p>estado: {{ reportes[0].stateName }}</p>
                    <p>comentario: {{ reportes[0].comment }}</p>
                    <p>fecha: {{ fechaArg(reportes[0].createdAt) }}</p>
                    <p>medico: {{ reportes[0].medico }}</p>
                    <p>especialidad: {{ reportes[0].especialidad }}</p>
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
                            <option value="">todos</option>
                            <option v-for="state in estados" :key="state.stateName" :value="state.stateName">{{ state.stateName }}</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Comentario</th>
                            <th>Fecha</th>
                            <th>Medico</th>
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
    import StateService from '@/services/StateService';

    let timer = null
        
    const props = defineProps({
        dni: {
            type: String,
            required: true
        }
    })

    const emit = defineEmits(['player-found']);
    
    const loading = ref(false)
    const finded = ref(false)
    const info = ref(true)
    const jugador = ref({
        dni: props.dni,
        name: "",
        email: "",
        medicalReports: []
    })
    const reportes = ref([])
    const estados = ref([])
    const estado = ref("")

    const getStates = async () => {
        const response = await StateService.listStates()
        estados.value = response ?? []
    }

    const filteredReports = computed(() => {
        return reportes.value.filter(report => {
            // Filtro por estado
            let matchState = estado.value === "" || (report && report.stateName === estado.value)

            // Filtro por fecha
            /*let matchDate = true
            if (startDate.value && endDate.value && jugador.estadoAct) {
                const createdAt = new Date(jugador.estadoAct.createdAt)
                const start = new Date(startDate.value)
                const end = new Date(endDate.value)
                matchDate = createdAt >= start && createdAt <= end
            }*/

            return matchState 
            //&& matchDate
        })
    })

    const toggleInfo = () => {
        info.value =!info.value
    }
    
    const searchPlayer = async () => {
        info.value = true
        loading.value = true
        finded.value = false
        const response = await MedService.searchPlayer(jugador.value.dni)
        if (response != null) {
            jugador.value.name = response.name
            jugador.value.email = response.email
            jugador.value.medicalReports = response.medicalReports ?? []
            reportes.value = jugador.value.medicalReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            finded.value = true
        emit('player-found', true);
        }
        else {
            emit('player-found', false);
        }
        loading.value = false
    }
    
    const fechaArg = (fechaJson) => {
        const fecha = new Date(fechaJson);

        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' };
        return fecha.toLocaleString('es-ES', opciones);
    }

    onBeforeMount(() => {
        if(props.dni == null || props.dni.length > 5){
            loading.value = true
            searchPlayer()
            getStates()
        }else{
            loading.value = false
        }
    })

    watch(() => props.dni, (newDni) => {
        loading.value = true
        if(newDni.length > 5) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                jugador.value.dni = props.dni
                if (props.dni) {
                    searchPlayer()
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
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
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

h3 {
    color: #333;
    font-size: 1.5rem;
}

h3, h4 {
    margin: 20px 0;
    text-align: center;
}
</style>

