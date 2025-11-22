# 生命周期实现

本子应用基于 `vite-plugin-qiankun` 插件实现了 Qiankun 微前端生命周期。

## 生命周期函数

在 [src/main.ts](/qiankun-vite-sub/src/main.ts) 文件中，我们实现了以下 Qiankun 生命周期函数：

```typescript
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
```

## 生命周期说明

### bootstrap

- **触发时机**: 子应用首次加载时触发
- **用途**: 初始化子应用所需资源，如全局变量、配置等
- **注意**: 此时子应用尚未挂载到DOM中

### mount

- **触发时机**: 子应用挂载时触发
- **用途**: 初始化子应用实例并挂载到指定DOM容器
- **参数**: 接收主应用传递的props参数
- **实现**: 调用 `initApp(props)` 初始化Vue应用

### unmount

- **触发时机**: 子应用卸载时触发
- **用途**: 清理子应用实例和相关资源
- **实现**: 调用Vue应用的 `unmount()` 方法并清空引用

### update

- **触发时机**: 主应用调用 `update` 方法时触发
- **用途**: 更新子应用状态或数据
- **注意**: 本子应用暂未实现具体更新逻辑

## 应用初始化函数

`initApp` 函数负责初始化Vue应用实例：

```typescript
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
  app.mount(containerElement)
}
```

## 独立运行支持

为了支持子应用独立运行，我们添加了环境判断：

```typescript
// 独立运行时
if (!isQiankunEnv) {
  initApp()
}
```

当子应用不运行在Qiankun环境中时，会直接调用 `initApp()` 进行初始化。

## 微前端环境检测

在 [src/micro/index.ts](/qiankun-vite-sub/src/micro/index.ts) 中实现了微前端环境检测：

```typescript
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

// 全局变量：是否在qiankun环境中运行
export const isQiankunEnv = qiankunWindow.__POWERED_BY_QIANKUN__;
```

## 路由配置

子应用的路由配置在 [src/router/index.ts](/qiankun-vite-sub/src/router/index.ts) 中实现，支持微前端环境和独立运行环境：

```typescript
const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})
```

其中 `baseUrl` 根据运行环境自动切换：

```typescript
// 路由基础路径：在qiankun中时使用主应用配置的activeRule
export const baseUrl = isQiankunEnv ? '/sub-app' : '/';
```

## 样式隔离

为避免子应用与主应用或其他子应用之间的样式冲突，采用了以下策略：

1. **CSS Modules**：在 Vite 配置中启用 CSS Modules，为类名生成唯一哈希值
2. **Scoped CSS**：在 Vue 组件中使用 scoped CSS，确保样式只作用于当前组件
3. **命名规范**：采用 BEM 命名规范，确保类名的唯一性
4. **详细方案**：请参考 [样式隔离方案](/guide/style-isolation) 文档