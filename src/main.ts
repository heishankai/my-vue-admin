import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/base.css'
import '@/styles/global.css'
import 'nprogress/nprogress.css'
import directive from '@/directive'

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component)
}

app.use(pinia)
app.use(directive)
app.use(router)
app.mount('#app')
