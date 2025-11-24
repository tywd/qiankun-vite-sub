import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Qiankun Vite 子应用文档',
  description: '基于 Vite 和 Qiankun 的微前端子应用文档',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '接入指南', link: '/guide/' },
      { text: '部署说明', link: '/deployment/' },
      { text: '常见问题', link: '/faq' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '接入指南',
          items: [
            { text: '快速开始', link: '/guide/index' },
            { text: '主应用配置', link: '/guide/main-app-config' },
            { text: '生命周期实现', link: '/guide/lifecycle' },
            { text: '样式隔离方案', link: '/guide/style-isolation' },
            { text: '样式隔离总结', link: '/guide/style-isolation-summary' }
          ]
        }
      ],
      '/deployment/': [
        {
          text: '部署说明',
          items: [
            { text: 'Vercel 部署', link: '/deployment/vercel' },
            { text: 'Vercel 部署问题修复指南', link: '/deployment/troubleshooting' },
            { text: '独立部署', link: '/deployment/standalone' },
            { text: '部署检查清单', link: '/deployment/checklist' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})