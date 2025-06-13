import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import {setupCalendar} from 'v-calendar'
import {createPinia} from "pinia";

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(setupCalendar, {}) // Move this before .mount()

app.mount('#app') // Now mount the app