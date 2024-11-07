<template>
    <div class="personal">
        <div v-if="!editUser ">
            <h3 v-if="!crearUser"><button @click="crear">crear nuevo usuario</button></h3>
            <h3 v-else><button @click="crear">cancelar nuevo usuario</button></h3>
            <NewUser v-if="crearUser"/>
        </div>
        <div v-if="!crearUser && !editUser">
            <h3>usuarios</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>dni</th>
                        <th>Tipo de usuario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.dni">
                        <td>{{ user.name }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.dni }}</td>
                        <td>{{ user.userType }}</td>
                        <td><button>info</button></td>
                        <td><button @click="edit({...user})">editar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="!crearUser && editUser">
            <h3 v-if="editUser"><button @click="edit">cancelar editar</button></h3>
            <form  @submit.prevent="update">
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" v-model="user.name">
                    <p v-if="errors.name" class="error">{{ errors.name }}</p>
                </div>
                <div>
                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" v-model="user.lastName">
                    <p v-if="errors.lastName" class="error">{{ errors.lastName }}</p>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="user.email">
                    <p v-if="errors.email" class="error">{{ errors.email }}</p>
                </div>
                <div :aria-disabled="user.userTypeN !== 'STAFF'">
                    <label for="area">Área:</label>
                    <select id="area" v-model="user.areaN" :disabled="user.userTypeN !== 'STAFF'">
                        <option v-for="area in areas" :key="area.idArea" :value="area.nameArea">{{ area.nameArea }}</option>
                    </select>
                    <p v-if="errors.areaN" class="error">{{ errors.areaN }}</p>
                </div>
                <div :aria-disabled="user.userTypeN !== 'STAFF'">
                    <label for="role">Rol dentro del área:</label>
                    <select id="role" v-model="user.rolN" :disabled="user.userTypeN !== 'STAFF'">
                        <option v-for="rol in filteredRoles" :key="rol.idRole" :value="rol.roleName">{{ rol.roleName }}</option>
                    </select>
                    <p v-if="errors.rolN" class="error">{{ errors.rolN }}</p>
                </div>
                <div>
                    <button type="submit" class="btn-access">Registrar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import NewUser from '@/components/NewUser.vue';
import AdminService from '@/services/AdminService';
import AuthService from '@/services/AuthService';
import JwtService from '@/services/JwtService';
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

//let loadingC = ref(false)
let loadingU = ref(false)
let editUser = ref(false)
let crearUser = ref(false)
let users = ref([])
//let category = ref("")

/*const user = ref({
    dni: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    userTypeN: "",
    areaN: "",
    rolN: ""
})*/

const edit = (userP) => {
    if(editUser.value === false){
        getProfile(userP)
    }else{
        id.value = null
        user.value = {
            dni: "",
            name: "",
            lastName: "",
            email: "",
            password: "",
            userTypeN: "",
            areaN: "",
            rolN: ""
        }
    }

    editUser.value = !editUser.value

}

const crear = () => {
    crearUser.value = !crearUser.value
}

const getProfile = async (usera) => {
    const userp = await AdminService.getPerfil(usera.dni);
    console.log("userty ", usera.userType)
    id.value = userp.id;
    user.value.name = usera.name;
    user.value.lastName = usera.lastName
    user.value.email = userp.email;
    user.value.userTypeN = usera.userType;
    user.value.areaN = userp.areaN;
    user.value.rolN = userp.rolN
}

/*const getAreas = async () => {
    loadingC.value = true
    const response = await AdminService.getAreas()
    categories.value = response ?? []
    loadingC.value = false
}*/

const getUsers = async () => {
    loadingU.value = true
    const response = await AdminService.getUsers()
    users.value = response ?? []
    loadingU.value = false
}

let loadingC = ref(false)
let areas = ref([])
let roles = ref([])
const id = ref(null)
const user = ref({
    dni: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    userTypeN: "",
    areaN: "",
    rolN: ""
})



// Validaciones
const errors = ref({
    dni: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    userTypeN: "",
    areaN: "",
    rolN: ""
})

const filteredRoles = computed(() => {
    return roles.value.filter(rol => rol.area.nameArea === user.value.areaN)
})

const validateForm = () => {
    errors.value.dni = user.value.dni ? "" : "DNI es requerido.";
    errors.value.name = user.value.name ? "" : "Nombre es requerido.";
    errors.value.lastName = user.value.lastName ? "" : "Apellido es requerido.";
    errors.value.email = /\S+@\S+\.\S+/.test(user.value.email) ? "" : "Email inválido.";
    errors.value.password = user.value.password ? "" : "Contraseña es requerida.";
    errors.value.userTypeN = user.value.userTypeN ? "" : "Tipo de Usuario es requerido.";
    
    // Solo validar `areaN` y `rolN` si es STAFF
    if (user.value.userTypeN === 'STAFF') {
        errors.value.areaN = user.value.areaN ? "" : "Área es requerida para STAFF.";
        errors.value.rolN = user.value.rolN ? "" : "Rol es requerido para STAFF.";
    } else {
        errors.value.areaN = "";
        errors.value.rolN = "";
    }
}

// Computed para verificar si el formulario es válido

const update = async () => {
    validateForm();

    const response = await AdminService.updateUser(id.value,{...user.value})
    if(response){
        alert("actualizado con exito")
    }
    else{
        alert("fallo al actualizar")
    }
    getUsers()
    edit()
}

const getAreas = async () => {
    loadingC.value = true;
    const response = await AdminService.getAreas();
    areas.value = response ?? [];
    loadingC.value = false;
}

const getRoles = async () => {
    loadingC.value = true;
    const response = await AdminService.getRoles();
    roles.value = response ?? [];
    loadingC.value = false;
}


onBeforeMount(() => {
    if(!(AuthService.isLogged() || JwtService.getAuthority() != 'ADMINISTRATOR')){
        router.push({ name: 'login' })
    }

    getAreas()
    getRoles()
    getUsers()
})

</script>

<style scoped>
.personal{
    padding: 20px;
    margin-inline: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
}
</style>