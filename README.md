# qiankun-vite-sub 模板

这是一个基于 Vite 和 Vue 3 的微前端子应用模板，适用于 qiankun 微前端架构。

构建来自 https://github.com/tywd/tywd-toolkit.git 工具

## 使用方法

1. 确保已安装 CLI 工具：
   ```bash
   npm install -g @tyteam/team-cli
   ```

2. 使用 CLI 创建项目：
   ```bash
   team-cli create my-project
   ```
   在交互式界面中选择 `qiankun-vite-sub` 模板

3. 进入项目目录并安装依赖：
   ```bash
   cd my-project
   pnpm install
   ```

4. 启动开发服务器：
   ```bash
   pnpm dev
   ```

## 项目特性

- 基于 Vite 5 + Vue 3 + TypeScript
- 集成 Element Plus UI 组件库
- 支持 SCSS 样式预处理
- 集成 Pinia 状态管理
- 支持 Vue Router 路由管理
- 集成 qiankun 微前端支持
- 支持 VitePress 文档系统

## 目录结构

```
src/
├── components/        # 公共组件
├── layout/           # 布局组件
├── micro/            # 微前端配置
├── router/           # 路由配置
├── stores/           # 状态管理
├── styles/           # 样式文件
├── types/            # 类型定义
├── utils/            # 工具函数
└── views/            # 页面视图
```

## 微前端配置

该模板已预配置了 qiankun 微前端支持，在 [src/micro/index.ts](src/micro/index.ts) 中可以找到相关的生命周期函数。

## 构建和部署

构建生产版本：
```bash
pnpm build
```

预览生产构建：
```bash
pnpm preview
```

## 代码规范

该模板集成了完整的代码规范工具：

- **ESLint**: JavaScript/TypeScript 代码检查
- **Prettier**: 代码格式化
- **Stylelint**: CSS/SCSS 样式检查
- **Commitlint**: Git 提交信息规范检查
- **Husky**: Git hooks
- **lint-staged**: 对暂存文件进行检查

可以通过以下命令检查代码：
```bash
pnpm lint
```

自动修复代码问题：
```bash
pnpm lint:fix
```

## 文档

该模板集成了 VitePress 文档系统，可以通过以下命令启动文档开发服务器：
```bash
pnpm docs:dev
```

构建文档：
```bash
pnpm docs:build
```

预览文档：
```bash
pnpm docs:preview
```