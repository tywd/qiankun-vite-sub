import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Qiankun Vite 子应用文档',
  description: '基于 Vite 和 Qiankun 的微前端子应用开发指南',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '开发指南', link: '/development/' },
      { text: '部署指南', link: '/deployment/' }
    ],
    
    sidebar: {
      '/development/': [
        {
          text: '开发指南',
          items: [
            { text: '环境搭建', link: '/development/setup' },
            { text: '生命周期实现', link: '/development/lifecycle' },
            { text: '独立运行配置', link: '/development/standalone' },
            { text: '路由配置', link: '/development/routing' }
          ]
        }
      ],
      '/deployment/': [
        {
          text: '部署指南',
          items: [
            { text: 'Vercel 部署', link: '/deployment/vercel' },
            { text: '独立部署配置', link: '/deployment/independent' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})