# 独立部署配置

本指南介绍子应用的独立部署配置，适用于子应用需要独立运行的场景。

## 独立部署架构

在独立部署架构中，子应用作为一个完整的应用部署到 Vercel，不依赖于主应用。

### 部署优势

1. **独立运行**：子应用可以独立运行和访问
2. **独立部署**：可以独立部署和更新
3. **灵活扩展**：可以根据需要独立扩展
4. **便于测试**：可以独立进行测试和调试

## 独立部署配置

### 1. 项目配置

确保子应用项目包含以下配置文件：

1. [package.json](/package.json)：包含构建脚本
2. [vercel.json](/vercel.json)：Vercel 配置文件
3. [vite.config.ts](/vite.config.ts)：Vite 配置文件

### 2. 环境变量

在子应用的 Vercel 项目设置中配置环境变量：

```
BASE_PATH=/
```

注意：在独立部署模式下，`BASE_PATH` 应该设置为根路径 `/`。

### 3. Vite 配置

在子应用的 [vite.config.ts](/vite.config.ts) 中配置基础路径：

```typescript
// 获取基础路径，Vercel部署时使用环境变量，本地开发时使用默认值
const base = process.env.BASE_PATH || '/';

// https://vite.dev/config/
export default defineConfig({
  base: base, // 设置基础路径，确保在Vercel上正确部署
  // 其他配置...
})
```

### 4. 路由配置

在子应用的 [router/index.ts](/src/router/index.ts) 中配置路由基础路径：

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import { isQiankunEnv } from '@/micro'

const router = createRouter({
  history: createWebHistory(isQiankunEnv ? process.env.BASE_PATH || '/' : '/'),
  routes
})

export default router
```

## 部署流程

### 1. 部署流程

1. 将子应用代码推送到 GitHub 仓库
2. 在 Vercel 中创建新项目并连接到子应用仓库
3. 配置环境变量
4. 触发部署
5. 记录子应用的部署地址

### 2. 自动化部署

为子应用配置 GitHub Actions 工作流：

**子应用工作流 (.github/workflows/deploy-sub.yml)：**

```yaml
name: Deploy Sub App to Vercel

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build project
        run: pnpm build

      - name: Deploy to Vercel (Preview)
        if: github.event_name == 'pull_request'
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Deploy to Vercel (Production)
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 3. Secrets 配置

在 GitHub 仓库中配置相应的 Secrets：

- `VERCEL_TOKEN`: Vercel 访问令牌
- `VERCEL_ORG_ID`: Vercel 组织 ID
- `VERCEL_PROJECT_ID`: 子应用的 Vercel 项目 ID

## 验证部署

### 1. 独立验证

1. 访问子应用部署地址，确认子应用正常运行

### 2. 功能验证

1. 测试所有页面和功能是否正常
2. 检查路由跳转是否正常
3. 验证表单提交和数据展示是否正常

### 3. 错误排查

1. 检查浏览器控制台错误信息
2. 检查网络请求是否正常
3. 确认环境变量配置是否正确
4. 验证路由配置是否正确

## 与主应用集成

当需要将独立部署的子应用集成到主应用时：

### 1. 更新主应用配置

在主应用中更新子应用的配置信息：

```typescript
export const getSubApp = () => {
    return [
        {
            name: '子应用',
            entry: 'https://your-sub-app.vercel.app', // 子应用的独立部署地址
            container: '#micro-app-container',
            activeRule: '/qiankun-vite-sub',
            props: {
                routerBase: '/qiankun-vite-sub',
                mainAppInfo: {
                    name: '主应用传递给子应用的信息'
                }
            }
        }
    ]
};
```

### 2. 重新部署主应用

更新配置后，需要重新部署主应用以应用更改。

## 最佳实践

### 1. 版本管理

1. 维护子应用的版本号
2. 在配置中记录版本信息，便于问题排查

### 2. 配置管理

1. 使用环境变量管理不同环境的配置
2. 避免在代码中硬编码部署地址

### 3. 监控和日志

1. 实现应用性能监控
2. 记录关键操作日志
3. 设置错误告警机制

### 4. 安全性

1. 保护敏感信息，如 API 密钥
2. 实现适当的访问控制
3. 定期更新依赖包