<template>
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
        <div v-else>
            <p>El jugador no posee reportes médicos</p>
        </div>
        </div>
    </div>
    <div v-else>
        <h3 v-if="jugador.dni && loading">Cargando jugador...</h3>
        <h3 v-if="jugador.dni && !loading && !finded">No encontrado</h3>
    </div>
</template>

<script setup>
    import { ref, watch, defineProps, defineEmits } from 'vue'
    import MedService from '@/services/MedService'
        
    const props = defineProps({
        dni: {
            type: String,
            required: true
        }
    })

    const emit = defineEmits(['player-found']);
    
    const loading = ref(false)
    const finded = ref(false)
    const jugador = ref({
        dni: props.dni,
        name: "",
        email: "",
        medicalReports: []
    })
    const reportes = ref([])
    
    const searchPlayer = async () => {
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
    
    const fecha = (fechaJson) => {
        const fecha = new Date(fechaJson)
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' }
        return fecha.toLocaleString('es-ES', opciones)
    }

    let timer = null

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
  
<style scoped>
    .datos {
        margin-top: 10px;
    }
</style>