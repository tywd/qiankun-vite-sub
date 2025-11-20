import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

// 全局变量：是否在qiankun环境中运行
export const isQiankunEnv = qiankunWindow.__POWERED_BY_QIANKUN__;

// 路由基础路径：在qiankun中时使用主应用配置的activeRule
export const baseUrl = isQiankunEnv ? '/sub-app' : '/';