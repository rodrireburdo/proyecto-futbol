<template>
    <div class="personal">
        <div>
            <h3><button @click="crear">crear nuevo usuario</button></h3>
            <NewUser v-if="crearUser"/>
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

let loadingC = ref(false)
let categories = ref([])
let crearUser = ref(false)
//let category = ref("")

const crear = () => {
    crearUser.value = !crearUser.value
}

const getAreas = async () => {
    loadingC.value = true
    const response = await AdminService.getAreas()
    categories.value = response ?? []
    loadingC.value = false
}

onBeforeMount(() => {
    if(!(AuthService.isLogged() || JwtService.getAuthority() != 'ADMINISTRATOR')){
        router.push({ name: 'login' })
    }

    getAreas()
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