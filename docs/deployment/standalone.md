# 独立部署指南

本子应用支持独立部署，可以作为独立的 Vue 应用运行。

## 独立部署优势

1. **独立开发**: 子应用可以独立于主应用进行开发和测试
2. **独立部署**: 子应用可以部署到独立的服务器或平台
3. **灵活扩展**: 可以根据需要独立扩展子应用功能
4. **团队协作**: 不同团队可以负责不同的子应用开发

## 部署步骤

### 1. 构建项目

在项目根目录下执行构建命令：

```bash
pnpm build
```

构建完成后，会在 `dist` 目录下生成部署文件。

### 2. 部署到静态服务器

将 `dist` 目录下的所有文件部署到静态服务器或 CDN 上。

### 3. 配置服务器

确保服务器正确配置路由重定向，将所有路由请求重定向到 `index.html`。

对于 Nginx，可以使用以下配置：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 环境变量配置

独立部署时，可以通过环境变量配置应用行为：

- `BASE_PATH`: 应用的基础路径，默认为 `/`
- `PORT`: 开发服务器端口，默认为 8081
- `MICRO_APP_ACTIVE_RULE`: 微前端激活路径，默认为 `/sub-app`

> **注意**: 为了安全起见，`.env` 文件不应提交到代码仓库。项目中提供了 `.env.example` 文件作为配置模板，使用时请复制该文件为 `.env` 并根据实际需求修改配置值。

## 本地开发

### 启动开发服务器

```bash
pnpm dev
```

默认会在 `http://localhost:8081` 启动开发服务器。

### 构建和预览

```bash
# 构建项目
pnpm build

# 预览构建结果
pnpm preview
```

## 与主应用集成

当作为独立应用运行时，子应用会使用默认的路由配置和样式。当集成到主应用中时，子应用会自动适配主应用的路由和样式环境。

### 微前端环境检测

子应用通过以下方式检测是否运行在微前端环境中：

```typescript
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

// 全局变量：是否在qiankun环境中运行
export const isQiankunEnv = qiankunWindow.__POWERED_BY_QIANKUN__;
```

### 路由适配

根据运行环境自动切换路由基础路径：

```typescript
// 路由基础路径：在qiankun中时使用主应用配置的activeRule
// 从环境变量获取微前端激活路径，如果没有则使用默认值
const activeRule = process.env.MICRO_APP_ACTIVE_RULE || '/sub-app';
export const baseUrl = isQiankunEnv ? activeRule : '/';
```

## 注意事项

1. 独立部署时，子应用的路由配置会使用默认的基础路径 `/`
2. 集成到主应用时，子应用会使用主应用配置的 `activeRule` 作为基础路径
3. 确保独立部署的服务器支持 SPA 应用的路由重定向