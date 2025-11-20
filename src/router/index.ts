import { baseUrl } from '@/micro'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 动态导入所有视图组件
const views = import.meta.glob('../views/**/*.vue')

// 自动注册路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  }
]

// 自动注册views目录下的所有路由
Object.keys(views).forEach((key) => {
  const name = key.match(/\.\.\/views\/(.*)\.vue/)?.[1]?.toLowerCase() || ''
  if (name) {
    const path = name.startsWith('project/') ? `/${name}` : `/${name}`
    routes.push({
      path: path,
      name: name.replace(/\//g, '-'),
      component: views[key]
    })
  }
})

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})

export default router