import App from './App.vue'
import router from './router'
import './assets/css/index.less'

createApp(App).use(createPinia()).use(router).mount('#app')
