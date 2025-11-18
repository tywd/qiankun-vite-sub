import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { name } from './package.json'
import qiankun from 'vite-plugin-qiankun'

// 获取基础路径，Vercel部署时使用环境变量，本地开发时使用默认值
const base = process.env.BASE_PATH || '/';

// https://vite.dev/config/
export default defineConfig({
  base: base, // 设置基础路径，确保在Vercel上正确部署
  plugins: [
    vue(),
    qiankun(name, {
      useDevMode: true
    })
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  server: {
    port: 8082,
    host: '0.0.0.0',
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'element-vendor': ['element-plus', '@element-plus/icons-vue'],
        }
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    minify: 'terser'
  }
})