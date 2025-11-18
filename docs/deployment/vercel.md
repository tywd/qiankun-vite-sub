# Vercel 部署

本指南详细介绍如何将子应用部署到 Vercel 平台。

## 部署前准备

### 1. 获取 Vercel 令牌

1. 登录到 [Vercel](https://vercel.com/)
2. 进入您的账户设置页面 (Settings > Tokens)
3. 创建一个新的令牌 (Create Token)
4. 保存令牌，稍后会用到

### 2. 获取组织 ID

1. 在 Vercel 控制台点击右上角头像
2. 选择 "Settings"
3. 在 "General" 选项卡中找到 "Organization ID"

## 子应用部署

### 1. 创建 Vercel 项目

1. 在 Vercel 控制台点击 "New Project"
2. 选择子应用的 GitHub 仓库
3. 设置项目名称（例如：qiankun-vite-sub）
4. 保留其他默认设置

### 2. 配置环境变量

在子应用的 Vercel 项目设置中配置环境变量：

1. 进入项目设置页面
2. 选择 "Environment Variables" 选项卡
3. 添加以下环境变量：
   - `BASE_PATH`: /qiankun-vite-sub (需要与主应用中配置的 activeRule 保持一致)

### 3. 部署子应用

1. 在 Vercel 项目页面点击 "Deploy"
2. 等待构建和部署完成
3. 记录部署地址

## Vite 配置

确保子应用的 [vite.config.ts](/vite.config.ts) 中正确配置了基础路径：

```typescript
// 获取基础路径，Vercel部署时使用环境变量，本地开发时使用默认值
const base = process.env.BASE_PATH || '/';

// https://vite.dev/config/
export default defineConfig({
  base: base, // 设置基础路径，确保在Vercel上正确部署
  // 其他配置...
})
```

## GitHub Actions 自动化部署

项目已配置 GitHub Actions 实现自动化部署，您可以在 `.github/workflows/deploy-vercel.yml` 文件中查看配置。

### 配置 Secrets

在 GitHub 仓库中配置以下 Secrets：

1. 进入仓库设置页面
2. 选择 "Secrets and variables" > "Actions"
3. 添加以下 secrets:
   - `VERCEL_TOKEN`: Vercel 访问令牌
   - `VERCEL_ORG_ID`: Vercel 组织 ID
   - `VERCEL_PROJECT_ID`: 子应用的 Vercel 项目 ID

## 验证部署

### 1. 访问子应用

1. 打开子应用的 Vercel 部署地址
2. 确认子应用正常加载

### 2. 检查控制台

1. 打开浏览器开发者工具
2. 检查控制台是否有错误信息
3. 检查网络请求是否正常

## 常见问题和解决方案

### 1. 页面刷新后出现 404 错误

**问题**: 页面刷新后出现 404 错误

**解决方案**:
1. 检查 Vercel 配置中的路由重定向规则
2. 确认所有路由都正确重定向到 index.html

### 2. 样式或资源加载失败

**问题**: 页面样式错乱或图片等资源无法加载

**解决方案**:
1. 检查 Vercel 配置中的路由规则
2. 确认 Vite 配置中的 base 路径设置正确
3. 检查构建输出目录是否正确

### 3. 路由无法正常工作

**问题**: 路由跳转不正常

**解决方案**:
1. 检查路由配置是否正确
2. 确认基础路径设置是否正确
3. 检查主应用中的子应用配置是否正确

## 后续维护

1. **代码更新**: 推送到 main 分支会自动触发生产环境部署
2. **Pull Request**: 创建 PR 会自动创建预览部署
3. **环境变量更新**: 在 Vercel 控制台更新环境变量后需要重新部署
4. **依赖更新**: 更新依赖后需要重新部署以应用更改