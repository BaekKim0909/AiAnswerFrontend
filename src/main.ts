import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import router from './router'
import '@/access'

const app = createApp(App)

app.use(ArcoVue)
app.use(createPinia().use(persist))
app.use(router)

app.mount('#app')
