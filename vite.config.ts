import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

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
        enabled: false, // 若没此json文件，先开启，生成后在关闭
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true
      },
      resolvers: ElementPlusResolver()
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'icon' // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
          // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
          // alias: { park: 'icon-park' } 集合的别名
          // enabledCollections: ['ep', 'entypo'] // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
        })
      ]
    }),
    Icons({
      // scale: 1, // 缩放
      compiler: 'vue3', // 编译方式
      // defaultClass: '', // 默认类名
      // defaultStyle: '', // 默认样式
      autoInstall: true // 自动下载
      // jsx: 'react' // jsx支持
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
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
