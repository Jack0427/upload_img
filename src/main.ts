import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {
  WarningFilled,
  Plus,
  CircleCheckFilled
} from '@element-plus/icons-vue'

import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(ElementPlus)
app.component('WarningFilled', WarningFilled)
app.component('Plus', Plus)
app.component('CircleCheckFilled', CircleCheckFilled)
app.mount('#app')
