# 路由配置

子应用的路由配置需要考虑独立运行和微前端环境两种情况，确保在不同环境下都能正常工作。

## 路由基础配置

### 1. 路由文件

子应用的路由配置位于 [router/index.ts](/src/router/index.ts) 文件中。

### 2. 基础路由配置

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { isQiankunEnv } from '@/micro'

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
  history: createWebHistory(isQiankunEnv ? '/qiankun-vite-sub' : '/'),
  routes
})

export default router
```

## 环境适配

### 1. 历史模式

根据运行环境设置不同的历史模式基础路径：

```typescript
const router = createRouter({
  history: createWebHistory(isQiankunEnv ? '/qiankun-vite-sub' : '/'),
  routes
})
```

在微前端环境下，基础路径需要与主应用中配置的 `activeRule` 保持一致。

### 2. 路由前缀

在微前端环境下，所有路由都需要添加相应的前缀：

```typescript
// 微前端环境下的路由
// /dashboard -> /qiankun-vite-sub/dashboard

// 独立运行环境下的路由
// /dashboard -> /dashboard
```

## 路由最佳实践

### 1. 动态路由导入

使用 `import.meta.glob` 动态导入所有视图组件，避免手动维护路由：

```typescript
// 动态导入所有视图组件
const views = import.meta.glob('../views/**/*.vue')

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
```

### 2. 路由守卫

可以配置路由守卫来实现权限控制等功能：

```typescript
// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 权限检查逻辑
  const isAuthenticated = checkAuth()
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

### 3. 路由元信息

通过 meta 字段存储路由相关信息：

```typescript
{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard.vue'),
  meta: { 
    title: '首页',
    requiresAuth: true
  }
}
```

## 路由调试

### 1. 路由监听

监听路由变化，便于调试：

```typescript
router.beforeEach((to, from, next) => {
  console.log('路由跳转:', from.path, '->', to.path)
  next()
})

router.afterEach((to, from) => {
  console.log('路由跳转完成:', to.path)
})
```

### 2. 路由错误处理

处理路由错误：

```typescript
router.onError((error) => {
  console.error('路由错误:', error)
  // 错误处理逻辑
})
```

## 路由与主应用集成

### 1. 路由映射

确保子应用的路由与主应用中的配置保持一致：

```typescript
// 主应用中的子应用配置
{
  name: '子应用',
  entry: 'http://localhost:8082',
  container: '#micro-app-container',
  activeRule: '/qiankun-vite-sub',
  props: {
    routerBase: '/qiankun-vite-sub'
  }
}
```

### 2. 路由跳转

在主应用中跳转到子应用：

```vue
<router-link to="/qiankun-vite-sub/dashboard">跳转到子应用</router-link>
```

或者使用编程式导航：

```typescript
router.push('/qiankun-vite-sub/dashboard')
```