# 子应用部署到 Vercel 的详细操作说明

本文档提供了如何使用 GitHub Actions 将 qiankun-vite-sub 子应用项目自动部署到 Vercel 的完整指南。

## 微前端架构中的子应用部署

本子应用是微前端架构的一部分，需要与主应用配合使用。部署时需要注意以下几点：

1. 子应用需要独立部署
2. 子应用的部署路径需要与主应用中的配置保持一致
3. 子应用需要正确处理路由基路径

## 前置条件

1. 一个 Vercel 账户
2. 一个 GitHub 账户
3. 该子应用已推送到 GitHub 仓库

## 第一步：获取 Vercel 令牌和项目信息

1. 登录到 [Vercel](https://vercel.com/)
2. 进入你的账户设置页面 (Settings > Tokens)
3. 创建一个新的令牌 (Create Token)
4. 记下这个令牌，稍后会用到

## 第二步：在 Vercel 上创建项目

1. 在 Vercel 控制台点击 "New Project"
2. 选择要部署的 GitHub 仓库
3. 设置项目名称（例如：qiankun-vite-sub）
4. 设置环境变量：
   - `BASE_PATH`: /qiankun-vite-sub (需要与主应用中配置的 activeRule 保持一致)
5. 保留其他默认设置，然后点击 "Deploy"

## 第三步：获取 Vercel 项目标识

部署完成后，你需要获取以下信息：
- `VERCEL_ORG_ID`: 你的 Vercel 组织 ID
- `VERCEL_SUB_PROJECT_ID`: 你的项目 ID

你可以在项目设置的 "General" 页面找到这些信息。

## 第四步：在 GitHub 仓库中设置 Secrets

1. 在 GitHub 仓库中，进入 Settings > Secrets and variables > Actions
2. 添加以下 secrets:
   - `VERCEL_TOKEN`: 你在第一步中创建的令牌
   - `VERCEL_ORG_ID`: 你的 Vercel 组织 ID
   - `VERCEL_SUB_PROJECT_ID`: 你的 Vercel 项目 ID

## 第五步：配置和触发部署

### 自动部署

GitHub Actions 工作流已经配置为在以下情况下自动触发：
- 当向 `main` 分支推送代码时，将部署到生产环境
- 当创建针对 `main` 分支的 Pull Request 时，将创建预览部署

### 手动触发部署

你也可以手动触发部署：
1. 在 GitHub 仓库中，进入 Actions 选项卡
2. 选择 "Deploy Sub App to Vercel" 工作流
3. 点击 "Run workflow" 按钮

## 部署配置详情

### GitHub Actions 工作流 (deploy-vercel.yml)

工作流包含以下步骤：
1. 检出代码
2. 设置 Node.js 环境
3. 安装 pnpm
4. 安装项目依赖
5. 构建项目
6. 部署到 Vercel

### 环境变量

工作流使用以下环境变量：
- `VERCEL_TOKEN`: Vercel 访问令牌
- `VERCEL_ORG_ID`: Vercel 组织 ID
- `VERCEL_SUB_PROJECT_ID`: Vercel 项目 ID
- `BASE_PATH`: 子应用的基础路径（在 Vercel 项目设置中配置）

## 故障排除

### 构建失败

如果构建失败，请检查：
1. 依赖安装是否成功
2. `pnpm build` 命令是否能在本地正常运行
3. 是否有 TypeScript 或其他编译错误

### 部署失败

如果部署失败，请检查：
1. Vercel 令牌是否正确且未过期
2. `VERCEL_ORG_ID` 和 `VERCEL_SUB_PROJECT_ID` 是否正确
3. GitHub Actions secrets 是否已正确设置

### 微前端集成问题

如果子应用无法正确加载：
1. 检查子应用的 Vercel 部署地址是否正确
2. 检查主应用中子应用的 entry 配置是否正确
3. 检查子应用的 base 路径配置是否与 activeRule 一致
4. 检查浏览器控制台是否有跨域错误

## 本地测试

在推送代码之前，建议在本地测试构建过程：

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build

# 预览构建结果
pnpm preview
```

## 监控和日志

你可以在以下位置查看部署状态和日志：
1. GitHub Actions: 仓库的 Actions 选项卡
2. Vercel 控制台: 项目的部署历史和日志

## 回滚

如果需要回滚到之前的部署版本：
1. 在 Vercel 控制台的 "Deployments" 页面
2. 找到要回滚到的部署版本
3. 点击 "Promote to Production" 按钮