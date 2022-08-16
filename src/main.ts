import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/index.css'
import './assets/css/index.less'

createApp(App).use(createPinia()).use(router).mount('#app')
