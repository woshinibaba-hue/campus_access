import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/index.css'
import './assets/css/index.less'

// test API
// import request from './server'
// request
//   .get({
//     url: '/get',
//     params: {
//       name: 'zs'
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

createApp(App).use(createPinia()).use(router).mount('#app')
