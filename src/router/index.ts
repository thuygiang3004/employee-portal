import { createRouter, createWebHistory } from 'vue-router'
import NewRequest from '../pages/NewRequest.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/new-request',
      name: 'NewRequest',
      component: NewRequest
    },
    {
      path: '/',
      redirect: '/new-request'
    }
  ]
})

export default router 