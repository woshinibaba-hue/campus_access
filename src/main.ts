import App from './App.vue'
import router from './router'
import './assets/css/index.less'

import { vLoading } from 'element-plus/es/components/loading/src/directive'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App).use(createPinia()).use(router)

// 注册 element-plus loading组件，解决自动化导入不生效情况
app.directive('load', vLoading)

app.mount('#app')
