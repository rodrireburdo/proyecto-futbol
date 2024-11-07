<template>
    <div class="fondoVista">
        <h1>categories</h1>
        <div v-if="!loadingS && !editingC">
            <h3>Nueva Categoria</h3>
            <div>
                <form @submit.prevent="save">
                    <div>
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" v-model="category.categoryName">
                    </div>
                    <div>
                        <label for="sport">Deporte:</label>
                        <select id="sport" v-model="category.sport">
                            <option v-for="sport in sports" :key="sport.idSport" :value="sport.sportName">{{ sport.sportName }}</option>
                        </select>
                    </div>
                    <button>guardar</button>
                </form>
            </div>
        </div>
        <div>
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Deporte</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="category in categories" :key="category.idCategory">
                    <td>{{ category.categoryName }}</td>
                    <td>{{ category.sport }}</td>
                    <td>
                        <button @click="edit({...category})">Editar</button>
                    </td>
                </tr>
            </table>
        </div>
        <div v-if="editingC">
            <form @submit.prevent="editCategory">
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" v-model="category.categoryName">
                </div>
                <div>
                    <label for="sport">Deporte:</label>
                    <select id="sport" v-model="category.sport">
                        <option v-for="sport in sports" :key="sport.idSport" :value="sport.sportName">{{ sport.sportName }}</option>
                    </select>
                </div>
                <button>guardar</button>
            </form>
        </div>
    </div> 
</template>

<script setup>
import AuthService from '@/services/AuthService';
import CategoriesService from '@/services/CategoriesService';
import JwtService from '@/services/JwtService';
import SportService from '@/services/SportService';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const sports = ref([])
const categories = ref([])
const loadingC = ref(false)
const loadingS = ref(false)
const editingC = ref(false)

const edit = async (categoryE) => {
    editingC.value = true;
    console.log(category)
    category.value = categoryE;
}

const editCategory = async () => {
    try {
        const response = await CategoriesService.editCategory(category.value);
        if(response.status > 199 && response.status < 300){
            getCategories()
            alert("categoria actualizada correctamente");
        }else{
            alert("no se pudo actualizar la categoria");
        }
    } catch (error) {
        console.error(error)
    }
    editingC.value = false;
}

const save = async () => {
    try {
        console.log(category.value)
        const response = await CategoriesService.saveCategory(category.value);
        if(response.status === 201){
            getCategories()
            alert("categoria creada correctamente");
        }else{
            alert("no se pudo crear la categoria");
        }
    } catch (error) {
        console.error(error)
    }
    category.value = {
        idCategory: null,
        categoryName: "",
        sport: ""
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

const getCategories = async () => {
    loadingC.value = true;
    try {
        const response = await CategoriesService.getCategories()
        categories.value = response ?? []
    } catch (error) {
        console.error(error)
    }
    loadingC.value = false;
}

const category = ref({
  idCategory: null,
  categoryName: "",
  sport: ""
})

onBeforeMount(() => {
    if(!(AuthService.isLogged() || JwtService.getAuthority() != 'ADMINISTRATOR')){
        router.push({ name: 'login' })
    }

    getCategories()
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