<template>
    <div class="personal">
        <div>
            <h3><button @click="crear">crear nuevo usuario</button></h3>
            <NewUser v-if="crearUser"/>
        </div>
        <div>
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
                        <td><button @click="edit(user.id)">editar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import NewUser from '@/components/NewUser.vue';
import AdminService from '@/services/AdminService';
import AuthService from '@/services/AuthService';
import JwtService from '@/services/JwtService';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

//let loadingC = ref(false)
let loadingU = ref(false)
//let categories = ref([])
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

const crear = () => {
    crearUser.value = !crearUser.value
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

onBeforeMount(() => {
    if(!(AuthService.isLogged() || JwtService.getAuthority() != 'ADMINISTRATOR')){
        router.push({ name: 'login' })
    }

    //getAreas()
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