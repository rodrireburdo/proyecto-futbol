import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue' 
import CoachHomeView from '@/views/CoachHomeView.vue'
import PerfilView from '@/views/PerfilView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/coachHome',
    name: 'coachHome',
    component: CoachHomeView
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
