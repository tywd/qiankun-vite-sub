# 常见问题解答

## 样式隔离相关问题

### 1. 为什么子应用需要样式隔离？

在微前端架构中，多个子应用和主应用在同一个页面中运行，如果没有适当的样式隔离措施，可能会出现以下问题：
1. 子应用的样式影响到主应用或其他子应用的显示效果
2. 多个子应用之间使用了相同的 CSS 类名导致冲突
3. 第三方组件库（如 Element Plus）的样式相互干扰

### 2. 子应用如何实现样式隔离？

我们采用了多种方案来实现样式隔离：

#### CSS Modules
在子应用中启用 CSS Modules，为类名生成唯一的哈希值：

```typescript
// vite.config.ts
css: {
  modules: {
    generateScopedName: '[name]__[local]___[hash:base64:5]'
  }
}
```

使用 CSS Modules 的组件示例：

```vue
<template>
  <div :class="$style.container">
    <h1 :class="$style.title">子应用标题</h1>
  </div>
</template>

<style module>
.container {
  padding: 20px;
}

.title {
  color: blue;
}
</style>
```

#### Scoped CSS
在 Vue 组件中使用 scoped CSS，确保样式只作用于当前组件：

```vue
<template>
  <div class="container">
    <h1 class="title">子应用标题</h1>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

.title {
  color: blue;
}
</style>
```

### 3. CSS Modules 和 Scoped CSS 有什么区别？

#### CSS Modules
- 为类名生成唯一的哈希值，如 `.container__abc123`
- 需要在模板中使用 `$style` 对象引用类名
- 提供更强的样式隔离能力

#### Scoped CSS
- 为组件添加唯一属性选择器，如 `[data-v-123456]`
- 可以直接使用类名，无需特殊语法
- 提供组件级别的样式隔离

### 4. 什么时候使用 CSS Modules，什么时候使用 Scoped CSS？

#### 推荐使用 CSS Modules 的场景：
1. 需要动态绑定类名的组件
2. 对样式隔离要求非常严格的组件
3. 大型项目中需要避免命名冲突的组件

#### 推荐使用 Scoped CSS 的场景：
1. 简单的静态样式组件
2. 不需要动态绑定类名的组件
3. 快速开发和原型设计

### 5. 如何处理 Element Plus 等第三方组件库的样式冲突？

对于第三方组件库，我们建议采用以下方案：

1. **按需引入**：只引入需要的组件和样式，减少样式冲突的可能性
2. **样式覆盖**：使用更具体的选择器来覆盖默认样式
3. **命名空间包装**：将第三方组件库的样式包装在特定的命名空间中

```scss
// 子应用中使用 Element Plus
.sub-app {
  // 覆盖 Element Plus 样式
  .el-button {
    // 子应用特定的按钮样式
  }
}
```

## 部署相关问题

### 1. 为什么 .env 文件不提交到线上？

.env 文件通常包含敏感信息（如 API 密钥、数据库密码等），提交到代码仓库会有安全风险。正确的做法是：
1. 将 .env 文件添加到 .gitignore 中
2. 在部署平台（如 Vercel）的环境变量设置中配置这些变量
3. 在代码中通过 `process.env.VARIABLE_NAME` 访问这些变量

### 2. Vercel 自动化部署如何获取环境变量？

在 Vercel 中，环境变量通过以下方式配置：
1. 在 Vercel 项目设置中添加环境变量
2. 在部署时，Vercel 会自动将这些变量注入到运行环境中
3. 代码中可以通过 `process.env.VARIABLE_NAME` 访问这些变量

### 3. 子应用独立部署时如何配置 BASE_PATH？

在 Vercel 部署子应用时，需要在项目设置中添加 BASE_PATH 环境变量：
1. 进入 Vercel 项目设置页面
2. 选择 "Environment Variables" 选项卡
3. 添加环境变量 `BASE_PATH`，值为 `/sub-app`（需要与主应用中配置的 activeRule 保持一致）

### 4. 为什么子应用独立部署后样式丢失？

子应用独立部署后样式丢失可能有以下几个原因：
1. **CSS Modules 配置问题**：确保在独立运行时也启用了 CSS Modules
2. **资源路径问题**：检查 CSS 文件和静态资源的路径是否正确
3. **构建配置问题**：确保 Vite 构建配置正确处理了 CSS 文件

解决方案：
1. 检查 `vite.config.ts` 中的 CSS 配置
2. 确保 `base` 路径配置正确
3. 验证构建输出目录中的 CSS 文件是否存在

## 微前端相关问题

### 1. 子应用如何检测是否在微前端环境中运行？

子应用通过以下方式检测是否在微前端环境中运行：

```typescript
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

// 全局变量：是否在qiankun环境中运行
export const isQiankunEnv = qiankunWindow.__POWERED_BY_QIANKUN__;
```

### 2. 子应用如何支持独立运行？

子应用支持独立运行，通过以下方式实现：
1. **环境检测**：检测是否在 Qiankun 环境中运行
2. **独立初始化**：在非 Qiankun 环境中直接初始化应用
3. **路由配置**：根据运行环境动态配置路由基础路径

```typescript
// 独立运行时
if (!isQiankunEnv) {
  initApp()
}
```

### 3. 子应用如何与主应用通信？

子应用与主应用之间可以通过以下方式通信：
1. **Props 接收**：通过 mount 生命周期函数接收主应用传递的 props
2. **全局状态管理**：使用 Qiankun 提供的全局状态管理功能
3. **事件总线**：通过自定义事件总线实现通信

### 4. 如何处理跨域问题？

在开发环境中，可以通过以下方式处理跨域问题：
1. **代理配置**：在 Vite 配置中设置代理
2. **CORS 配置**：在服务端设置 CORS 头
3. **开发服务器配置**：确保开发服务器支持跨域请求

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

## 开发相关问题

### 1. 如何调试子应用在主应用中的表现？

可以通过以下方式调试子应用在主应用中的表现：
1. **浏览器开发者工具**：使用 Chrome DevTools 检查元素和网络请求
2. **控制台日志**：在子应用中添加详细的日志输出
3. **独立运行测试**：先确保子应用可以独立运行，再测试在主应用中的表现

### 2. 如何处理子应用的路由配置？

子应用的路由配置需要考虑两种运行环境：
1. **微前端环境**：使用主应用传递的路由基础路径
2. **独立运行环境**：使用默认的路由基础路径

```typescript
// 路由基础路径：在qiankun中时使用主应用配置的activeRule
export const baseUrl = isQiankunEnv ? '/sub-app' : '/';
```

### 3. 如何优化子应用的性能？

可以通过以下方式优化子应用的性能：
1. **代码分割**：使用 Vite 的代码分割功能
2. **懒加载**：对路由组件和第三方库进行懒加载
3. **资源压缩**：启用 Vite 的资源压缩功能

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vue-vendor': ['vue', 'vue-router'],
        'element-vendor': ['element-plus', '@element-plus/icons-vue'],
      }
    }
  }
}
```