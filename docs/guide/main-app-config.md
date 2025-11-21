# 主应用配置说明

本指南详细介绍如何在主应用中配置本子应用。

## 配置文件位置

在主应用中，子应用的配置通常位于 `src/utils/index.ts` 文件中的 `getSubApp` 函数。

## 配置参数说明

### 基本配置

```typescript
{
    name: '系统管理', // 子应用名称，需唯一
    entry: 'http://localhost:8081', // 子应用入口地址
    container: '#micro-app-container', // 主应用中的挂载容器ID
    activeRule: '/sub-app', // 激活路由规则
    props: {
        routerBase: '/sub-app', // 路由基础路径
        mainAppInfo: {
            name: '主应用传递给子应用的信息'
        }
    }
}
```

### 配置参数详解

1. **name**: 子应用的唯一标识名称，在主应用中用于识别子应用
2. **entry**: 子应用的访问地址
   - 开发环境: 通常为 `http://localhost:8081`
   - 生产环境: 子应用的实际部署地址，如 `https://your-sub-app.vercel.app`
3. **container**: 主应用中用于挂载子应用的DOM元素ID
4. **activeRule**: 子应用的激活路由规则，当浏览器地址匹配此规则时加载子应用
5. **props**: 传递给子应用的参数对象

## 环境区分配置

为了适应不同环境，建议使用环境变量区分配置：

```typescript
export const getSubApp = () => {
    // 在生产环境中使用 Vercel 部署地址，开发环境中使用本地地址
    const isProd = process.env.NODE_ENV === 'production';
    const subAppEntry = isProd 
        ? process.env.VITE_SUB_APP_URL || 'https://your-sub-app.vercel.app' // 生产环境地址
        : 'http://localhost:8081'; // 开发环境地址

    return [
        {
            name: '系统管理',
            entry: subAppEntry,
            container: '#micro-app-container',
            activeRule: '/sub-app',
            props: {
                routerBase: '/sub-app',
                mainAppInfo: {
                    name: '主应用的全局参数传给子应用'
                }
            }
        }
    ]
};
```

## 路由配置

在主应用的路由配置文件中添加子应用的路由占位符：

```typescript
{
  path: '/sub-app/:path(.*)*',
  name: 'subApp',
  component: () => import('@/components/SubApp.vue')
}
```

## 注意事项

1. 子应用的 `activeRule` 必须与子应用的 `BASE_PATH` 环境变量保持一致
2. 主应用和子应用的通信可以通过 `props` 参数实现
3. 在 Vercel 部署时，建议使用环境变量管理子应用的实际部署地址
4. 子应用支持通过 `MICRO_APP_ACTIVE_RULE` 环境变量自定义微前端激活路径