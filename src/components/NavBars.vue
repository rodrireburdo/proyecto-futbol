<template>
    <div class="navs">
        <div v-if="userType == 'ADMINISTRATOR'">
            <AdminBar/>
        </div>
        <div v-else-if="userType == 'PLAYER'">
            <PlayerBar/>
        </div>
        <div v-else-if="area == 'MEDICA'">
            <MedicBar/>
        </div>
        <div v-else>
            <CoachBar/>
        </div>
    </div>
</template>

<script setup>
import JwtService from './../services/JwtService';
import { ref } from "vue"
import AdminBar from './AdminBar.vue';
import PlayerBar from './PlayerBar.vue';
import MedicBar from './MedicBar.vue';
import CoachBar from './CoachBar.vue';

const userType = ref(JwtService.getAuthority())
const area = ref(JwtService.getArea() ?? JwtService.getArea());

</script>

<style>

.navs {
    display: flex;
    justify-content: space-between;
    max-width: 250px;
    padding: 10px;
}
</style>