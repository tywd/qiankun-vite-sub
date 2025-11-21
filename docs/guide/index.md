# 快速开始

本指南将详细介绍如何将本子应用接入到主应用中。

## 接入前提

1. 主应用需要是一个基于 Qiankun 的微前端主应用
2. 主应用需要安装 `qiankun` 依赖
3. 主应用需要正确配置子应用注册信息

## 接入步骤

### 1. 主应用配置

在主应用中注册本子应用，需要在主应用的 `src/utils/index.ts` 文件中添加子应用配置：

```typescript
export const getSubApp = () => {
    // 在生产环境中使用 Vercel 部署地址，开发环境中使用本地地址
    const isProd = process.env.NODE_ENV === 'production';
    const subAppEntry = isProd 
        ? 'https://your-sub-app.vercel.app' // 替换为实际的 Vercel 部署地址
        : 'http://localhost:8081';

    return [
        {
            name: '系统管理', // 子应用名称
            entry: subAppEntry, // 子应用入口
            container: '#micro-app-container', // 挂载容器
            activeRule: '/sub-app', // 激活路由
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

### 2. 主应用路由配置

在主应用中添加子应用的路由占位符，通常在 `src/router/index.ts` 中添加：

```typescript
{
  path: '/sub-app/:path(.*)*',
  name: 'subApp',
  component: () => import('@/components/SubApp.vue')
}
```

### 3. 配置说明

- `name`: 子应用的唯一标识名称
- `entry`: 子应用的访问地址，生产环境应使用实际的部署地址
- `container`: 子应用在主应用中的挂载容器 ID
- `activeRule`: 子应用的激活路由规则
- `props`: 传递给子应用的参数

## 注意事项

1. 子应用的 `activeRule` 必须与子应用的 `BASE_PATH` 环境变量保持一致
2. 在 Vercel 部署时，需要正确配置 `BASE_PATH` 环境变量
3. 子应用的端口在开发环境中默认为 8081，可根据需要调整