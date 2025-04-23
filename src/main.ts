import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import focus from '@/directives/Vfocus';

const app = createApp(App)

app.directive('focus', focus);

app.mount('#app')