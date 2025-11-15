import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

// 全局变量：是否在qiankun环境中运行
export const isQiankunEnv = qiankunWindow.__POWERED_BY_QIANKUN__;