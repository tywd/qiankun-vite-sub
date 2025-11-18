# 开发指南

本指南将详细介绍如何开发基于 Vite 和 Qiankun 的微前端子应用。

## 开发环境搭建

### 1. 环境要求

- Node.js >= 16
- pnpm >= 7
- Git

### 2. 项目初始化

```bash
# 克隆项目
git clone <项目地址>

# 进入项目目录
cd qiankun-vite-sub

# 安装依赖
pnpm install
```

### 3. 启动开发服务器

```bash
# 启动开发服务器
pnpm dev
```

默认情况下，开发服务器将在 `http://localhost:8082` 上运行。

## 项目结构

```
src/
├── components/          # 公共组件
├── layout/              # 布局组件
├── micro/               # 微前端相关配置
├── router/              # 路由配置
├── stores/              # 状态管理
├── styles/              # 样式文件
├── types/               # TypeScript 类型定义
├── utils/               # 工具函数
├── views/               # 页面视图
├── App.vue             # 根组件
└── main.ts             # 入口文件
```

## 开发流程

详细的开发流程请参考以下文档：

- [生命周期实现](./lifecycle.md): 详细介绍如何实现 Qiankun 生命周期函数
- [独立运行配置](./standalone.md): 介绍如何配置子应用的独立运行模式
- [路由配置](./routing.md): 介绍子应用的路由配置方式