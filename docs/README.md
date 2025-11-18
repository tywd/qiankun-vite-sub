# 文档站点使用指南

本文档站点基于 VitePress 构建，包含了关于 Qiankun 微前端子应用的完整文档。

## 目录结构

```
docs/
├── .vitepress/          # VitePress 配置
│   └── config.ts       # 配置文件
├── development/        # 开发文档
├── deployment/         # 部署文档
├── index.md            # 首页
└── README.md           # 本文档
```

## 开发指南

### 本地开发

```bash
# 启动文档开发服务器
pnpm docs:dev
```

### 构建文档

```bash
# 构建文档站点
pnpm docs:build
```

### 预览文档

```bash
# 预览构建后的文档
pnpm docs:preview
```

## 文档内容

1. **开发指南**: 详细介绍子应用的开发流程和配置
2. **部署指南**: 详细介绍如何将子应用部署到 Vercel

## 贡献文档

欢迎提交 Issue 和 Pull Request 来帮助我们改进文档。