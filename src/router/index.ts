import { createRouter, createWebHistory } from 'vue-router'
import NewRequest from '../pages/NewRequest.vue'
import Login from "@/pages/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/new-request',
      name: 'NewRequest',
      component: NewRequest
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/new-request'
    }
  ]
})

export default router 