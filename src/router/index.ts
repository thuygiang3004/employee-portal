import { createRouter, createWebHistory } from 'vue-router'
import NewRequest from '../pages/NewRequest.vue'
import Login from "@/pages/Login.vue";
import Calendar from "@/pages/Calendar.vue";
import ScheduleXCalendar from "@/pages/ScheduleXCalendar.vue";

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
    },
    {
      path: '/calendar',
      component: Calendar
    },
    {
      path: '/calendar-x',
      component: ScheduleXCalendar
    }
  ]
})

export default router 