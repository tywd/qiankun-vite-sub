import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'
import router from './router'
import { createPinia } from 'pinia';
import App from './App.vue'
import '@/styles/index.scss';
import { isQiankunEnv } from './micro'

let app: VueApp<Element> | null = null
// 创建Pinia实例
const pinia = createPinia()

// 添加一个函数来确保样式正确加载
function ensureStylesLoaded() {
  // 检查是否已经存在样式链接
  const existingLink = document.querySelector('link[href*="index-Ce3oaff2.css"]');
  if (!existingLink) {
    // 动态添加样式链接
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './assets/index-Ce3oaff2.css';
    document.head.appendChild(link);
  }
}

function initApp(props: any = {}) {
  const { container } = props
  
  app = createApp(App)
  
  // 注册Element Plus
  app.use(ElementPlus)
  
  // 注册Element Plus图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  
  // 注册Vue Router
  app.use(router).use(pinia)
  
  // 全局属性
  app.config.globalProperties.$qiankun = props
  
  // 修复挂载逻辑：在微前端环境下直接使用container，独立运行时使用默认容器
  let containerElement
  if (container) {
    // 微前端环境：直接使用qiankun提供的container
    containerElement = container
    console.log('微前端模式 - 使用qiankun容器:', container)
  } else {
    // 独立运行：使用默认容器
    containerElement = document.querySelector('#app') || document.body
    console.log('独立运行模式 - 使用默认容器:', containerElement)
  }
  
  if (!containerElement) {
    console.error('找不到挂载容器！')
    return
  }
  
  console.log('系统管理应用挂载容器:', containerElement)
  
  // 在微前端环境中确保样式正确应用
  if (container && containerElement) {
    // 添加一个类名来标识微前端环境
    containerElement.classList.add('sub-app-container');
    
    // 确保样式正确加载
    setTimeout(() => {
      ensureStylesLoaded();
    }, 100);
  }
  
  app.mount(containerElement)
  
  // 添加路由就绪检查
  router.isReady().then(() => {
    console.log('系统管理子应用路由就绪')
    console.log('当前路由:', router.currentRoute.value.path)
    console.log('当前路由匹配:', router.currentRoute.value.matched.length)
  })
}

// 独立运行时
if (!isQiankunEnv) {
  initApp()
}

// qiankun生命周期
renderWithQiankun({
  mount(props) {
    console.log('系统管理模块 mount', props)
    initApp(props)
  },
  bootstrap() {
    console.log('系统管理模块 bootstrap')
  },
  unmount() {
    console.log('系统管理模块 unmount')
    if (app) {
      app.unmount()
      app = null
    }
  },
  update() {
    console.log('系统管理模块 update')
  }
})