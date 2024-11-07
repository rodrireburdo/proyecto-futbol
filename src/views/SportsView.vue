<template>
<div class="fondoVista">
    <h1>Deportes</h1>
    <div v-if="!loadingS && !editingS">
        <h3>Nuevo deporte</h3>
        <div>
            <form @submit.prevent="save">
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" v-model="sport.sportName">
                </div>
                <button>guardar</button>
            </form>
        </div>
    </div>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Deporte</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sport in sports" :key="sport.idSport">
                    <td>{{ sport.sportName }}</td>
                    <td>
                        <button @click="edit({...sport})">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="editingS">
        <form @submit.prevent="editsport">
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="sport.sportName">
            </div>
            <button>guardar</button>
        </form>
    </div>
</div> 
</template>

<script setup>
import AuthService from '@/services/AuthService';
import JwtService from '@/services/JwtService';
import SportService from '@/services/SportService';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const sports = ref([])
const loadingS = ref(false)
const editingS = ref(false)

const edit = async (sportE) => {
    editingS.value = true;
    sport.value = sportE;
}

const editsport = async () => {
    try {
        const response = await SportService.editSport(sport.value);
        if(response.status > 199 && response.status < 300){
            getSports()
            alert("deporte actualizado correctamente");
        }else{
            alert("no se pudo actualizar el deporte");
        }
    } catch (error) {
        console.error(error)
    }
    editingS.value = false;
}

const save = async () => {
    try {
        const response = await SportService.saveSport(sport.value);
        if(response.status === 201){
            getSports()
            alert("categoria creada correctamente");
        }else{
            alert("no se pudo crear la categoria");
        }
    } catch (error) {
        console.error(error)
    }
    sport.value = {
        idsport: null,
        sportName: "",
    }
}

const getSports = async () => {
    loadingS.value = true;
    try {
        const response = await SportService.getSports()
        sports.value = response ?? []
    } catch (error) {
        console.error(error)
    }
    loadingS.value = false;
}

const sport = ref({
    idsport: null,
    sportName: ""
})

onBeforeMount(() => {
if(!(AuthService.isLogged() || JwtService.getAuthority() != 'ADMINISTRATOR')){
    router.push({ name: 'login' })
}

getSports()
})
</script>

<style scoped>
.fondoVista{
padding: 20px;
margin-inline: 10px;
background-color: #f5f5f5;
border-radius: 8px;
}
</style>