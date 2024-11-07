<template>
<div class="fondoVista">
    <h1>Roles</h1>
    <div v-if="!loadingA && !editingR">
        <h3>Nueva Rol</h3>
        <div>
            <form @submit.prevent="save">
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" v-model="role.roleName">
                </div>
                <div>
                    <label for="rol">Area:</label>
                    <select id="rol" v-model="role.area">
                        <option v-for="area in areas" :key="area.idArea" :value="area">{{ area.nameArea }}</option>
                    </select>
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
                    <th>Area</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roles" :key="role.idRole">
                    <td>{{ role.roleName }}</td>
                    <td>{{ role.area.nameArea }}</td>
                    <td>
                        <button @click="edit({...role})">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="editingR">
        <form @submit.prevent="editRole">
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="role.roleName">
            </div>
            <div>
                <label for="rol">Area:</label>
                <select id="rol" v-model="role.area">
                    <option v-for="area in areas" :key="area.idArea" :value="area">{{ area.nameArea }}</option>
                </select>
            </div>
            <button>guardar</button>
        </form>
    </div>
</div> 
</template>

<script setup>
import AdminService from '@/services/AdminService';
import AuthService from '@/services/AuthService';
import JwtService from '@/services/JwtService';
import RoleService from '@/services/RoleService';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const roles = ref([])
const areas = ref([])
const loadingA = ref(false)
const editingR = ref(false)

const edit = async (roleE) => {
    editingR.value = true;
    role.value = roleE;
}

const editRole = async () => {
try {
    const response = await RoleService.editRole(role.value);
    if(response.status > 199 && response.status < 300){
        getRoles()
        alert("Rol actualizada correctamente");
    }else{
        alert("no se pudo actualizar la Rol");
    }
} catch (error) {
    console.error(error)
}
editingR.value = false;
}

const save = async () => {
try {
    const response = await RoleService.saveRole(role.value);
    if(response.status > 199 && response.status < 400){
        getRoles()
        alert("Rol creado correctamente");
    }else{
        alert("no se pudo crear el Rol");
    }
} catch (error) {
    console.error(error)
}
role.value ={
    idRole: null,
    roleName: "",
    area: {
            idArea: null,
            nameArea: ""
    }
}
}

const getRoles = async () => {
    try {
        const response = await RoleService.getRoles()
        roles.value = response ?? []
    } catch (error) {
        console.error(error)
    }
}

const getAreas = async () => {
    loadingA.value = true;
    try {
        const response = await AdminService.getAreas()
        areas.value = response ?? []
    } catch (error) {
        console.error(error)
    }
    loadingA.value = false;
}

const role = ref({
    idRole: null,
    roleName: "",
    area: {
            idArea: null,
            nameArea: ""
    }
})

onBeforeMount(() => {
    if(!(AuthService.isLogged() || JwtService.getAuthority() != 'ADMINISTRATOR')){
        router.push({ name: 'login' })
    }

    getAreas()
    getRoles()
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