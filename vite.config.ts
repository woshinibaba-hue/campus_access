import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      // 解决eslint报错，无法找到
      eslintrc: {
        enabled: true, // 若没此json文件，先开启，生成后在关闭
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true
      },
      resolvers: ElementPlusResolver()
    }),
    Components({
      resolvers: ElementPlusResolver()
    })
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  // 配置proxy代理，解决开发阶段跨域问题
  server: {
    proxy: {
      '/api': {
        // 代理地址
        target: 'http://localhost:3000',
        // 将请求地址改为代理地址
        changeOrigin: true,
        // 重写请求路径
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
