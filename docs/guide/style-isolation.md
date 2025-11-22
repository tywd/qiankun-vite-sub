# 子应用样式隔离方案

在微前端架构中，子应用需要确保其样式不会与主应用或其他子应用产生冲突。本文档详细介绍子应用采用的样式隔离方案。

## 样式冲突问题

在 qiankun 微前端架构中，子应用可能面临以下样式冲突问题：
1. 子应用的样式影响到主应用的显示效果
2. 多个子应用之间使用了相同的 CSS 类名
3. Element Plus 等第三方组件库样式相互干扰

## 解决方案

我们采用了多种方案来解决样式冲突问题：

### 1. CSS Modules

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

### 2. Scoped CSS

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

### 3. CSS 命名空间前缀

为子应用的全局样式添加命名空间前缀：

```scss
// 子应用全局样式
.sub-app {
  .container {
    padding: 20px;
  }
  
  .title {
    color: blue;
  }
}
```

### 4. BEM 命名规范

采用 BEM 命名规范，确保类名的唯一性：

```scss
.sub-app__container { }
.sub-app__title { }
.sub-app__button--primary { }
```

## 实施效果

通过以上方案的组合使用，我们有效解决了子应用的样式冲突问题：
1. CSS Modules 为类名生成唯一哈希值，避免命名冲突
2. Scoped CSS 确保组件级别的样式隔离
3. 命名空间前缀和 BEM 规范增强样式可维护性
4. 与主应用的样式完全隔离，互不影响

## 最佳实践

1. **优先使用 CSS Modules**：对于需要动态类名的组件，优先使用 CSS Modules
2. **组件级别隔离**：在组件级别使用 scoped 或 CSS Modules
3. **全局样式管理**：对全局样式使用命名空间前缀
4. **第三方组件库处理**：对 Element Plus 等第三方组件库使用命名空间包装
5. **样式变量管理**：使用 CSS 自定义属性隔离主题变量