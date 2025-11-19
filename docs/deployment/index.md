# 部署指南

本指南将详细介绍如何将子应用部署到 Vercel 平台。

## 部署架构

子应用可以独立部署到 Vercel，也可以作为微前端架构的一部分与主应用集成。

### 部署策略

1. **独立部署**：子应用可以独立部署到 Vercel，作为一个完整的应用运行
2. **集成部署**：子应用作为主应用的子模块部署，通过主应用进行访问

## 部署准备

### 1. Vercel 账户

确保您拥有 Vercel 账户，如果没有，请访问 [Vercel官网](https://vercel.com/) 注册。

### 2. GitHub 集成

将您的项目推送到 GitHub，并在 Vercel 中集成 GitHub 账户。

### 3. 项目创建

在 Vercel 中为子应用创建项目：

1. 点击 "New Project"
2. 选择子应用的 GitHub 仓库
3. 设置项目名称（例如：qiankun-vite-sub）
4. 保留其他默认设置

## 部署配置

### 1. 环境变量配置

在 Vercel 项目设置中配置必要的环境变量：

- `BASE_PATH`: 子应用的基础路径，必须与主应用中配置的 `activeRule` 一致

### 2. 构建配置

确保 [package.json](/package.json) 中包含正确的构建脚本：

```json
{
  "scripts": {
    "build": "vue-tsc && vite build",
    "vercel-build": "pnpm install && pnpm build"
  }
}
```

### 3. Vercel 配置文件

项目根目录下需要包含 [vercel.json](/vercel.json) 配置文件：

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": {
        "cache-control": "public,max-age=31536000,immutable"
      },
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 部署步骤

详细的部署步骤请参考以下文档：

- [Vercel 部署](./vercel.md): 详细介绍如何在 Vercel 上部署子应用
- [独立部署配置](./independent.md): 介绍子应用的独立部署配置
- [故障排除与维护](./troubleshooting.md): 部署问题解决方案和维护指南