import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue' 
import PerfilView from '@/views/PerfilView.vue'
import AtenderView from '@/views/AtenderView.vue'
import JugadoresView from '@/views/JugadoresView.vue'
import CheckInView from '@/views/CheckInView.vue'
import PersonalView from '@/views/PersonalView.vue'
import CategoriesView from '@/views/CategoriesView.vue'
import AreasView from '@/views/AreasView.vue'
import SportsView from '@/views/SportsView.vue'
import RolesView from '@/views/RolesView.vue'

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
  },
  {
    path: '/jugadores',
    name: 'jugadores',
    component: JugadoresView
  },
  {
    path: '/llegada',
    name: 'checkin',
    component: CheckInView
  },
  {
    path: '/categorias',
    name: 'categories',
    component: CategoriesView
  },
  {
    path: '/areas',
    name: 'areas',
    component: AreasView
  },
  {
    path: '/personal',
    name: 'personal',
    component: PersonalView
  },
  {
    path: '/deportes',
    name: 'sports',
    component: SportsView
  },
  {
    path: '/roles',
    name: 'roles',
    component: RolesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
