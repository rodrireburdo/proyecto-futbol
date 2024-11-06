<template>
    <h1>nuevo usuariooo</h1>
</template>

<script setup>
import AdminService from '@/services/AdminService';
import { onBeforeMount, ref } from 'vue';

let loadingC = ref(false)
let categories = ref([])
//let category = ref("")

const getAreas = async () => {
    loadingC.value = true
    const response = await AdminService.getAreas()
    categories.value = response ?? []
    loadingC.value = false
}

onBeforeMount(() => {
    getAreas()
})
</script>