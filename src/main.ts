import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { setupCalendar } from 'v-calendar'

const app = createApp(App)

app.use(router)
app.use(setupCalendar, {}) // Move this before .mount()

app.mount('#app') // Now mount the app