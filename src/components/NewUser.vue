<template>
    <div>
        <form @submit.prevent="register">
            <div>
                <label for="dni">DNI:</label>
                <input type="text" id="dni" v-model="user.dni">
                <p v-if="errors.dni" class="error">{{ errors.dni }}</p>
            </div>
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
            <div>
                <label for="password">Contraseña:</label>
                <input type="password" id="password" v-model="user.password">
                <p v-if="errors.password" class="error">{{ errors.password }}</p>
            </div>
            <div>
                <label for="userType">Tipo de Usuario:</label>
                <select id="userType" v-model="user.userTypeN">
                    <option v-for="uType in userTypes" :key="uType" :value="uType">{{ uType }}</option>
                </select>
                <p v-if="errors.userTypeN" class="error">{{ errors.userTypeN }}</p>
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
                <button type="submit" class="btn-access" :disabled="loadingC || !formValid">Registrar</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import AdminService from '@/services/AdminService';
import { ref, onBeforeMount, computed } from 'vue';

let loadingC = ref(false)
let areas = ref([])
let roles = ref([])
const userTypes = ref(["PLAYER", "STAFF", "ADMINISTRATOR"])

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
const formValid = computed(() => {
    validateForm();
    return Object.values(errors.value).every(error => error === "");
})

const register = async () => {
    validateForm();
    if (!formValid.value) return;

    const response = await AdminService.postUser({...user.value})
    if(response){
        alert("creado con exito")
    }
    else{
        alert("fallo al crear")
    }
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
    getAreas();
    getRoles();
})
</script>

<style scoped>
.error {
    color: red;
    font-size: 0.8em;
}
</style>
