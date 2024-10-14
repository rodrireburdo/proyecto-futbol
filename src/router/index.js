import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue' 
import PerfilView from '@/views/PerfilView.vue'
import AtenderView from '@/views/AtenderView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilView
  },
  {
    path: '/atender',
    name: 'atender',
    component: AtenderView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
