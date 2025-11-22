import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router';
import { useTabsStore } from '../stores/tabs';
import { useMenuStore } from '../stores/menu';
import { baseUrl } from '@/micro';
import { getAllRoute, transformRoutes } from '@/utils';

// 基础路由
const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard.vue'),
    meta: { title: '子应用看板' }
  },
  {
    // 兜底路由：处理所有未匹配的路径
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/dashboard'
  }
];

// 动态获取的其他所有路由
const _routes: any[] = getAllRoute()
const mainRoutes: RouteRecordRaw[] = transformRoutes(_routes);
const routes: RouteRecordRaw[] = [...baseRoutes, ...mainRoutes];

// 创建路由
const router: Router = createRouter({
  history: createWebHistory(baseUrl),
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log('sub-路由守卫:', to, {
    to: to.path,
    from: from.path,
    fullPath: to.fullPath,
    matched: to.matched.length,
  })
  const tabsStore = useTabsStore();
  const menuStore = useMenuStore();
  menuStore.mergeMenu(getAllRoute());
  if (to.meta?.title) {
    document.title = `子应用 - ${to.meta.title}`
    // 设置激活的菜单
    const menuItem = menuStore.findMenuByPath(to.path);
    if (menuItem) {
      menuStore.setActiveMenu(menuItem.id);
      // 添加标签页
      tabsStore.addTab({
        id: menuItem.id,
        name: to.meta.title as string,
        path: to.path,
        closable: to.path !== '/dashboard',
      });
    }
  }
  next()
})

router.afterEach((to) => {
  console.log('子应用路由切换完成:', to.path)
})

// 动态导入所有视图组件
// const views = import.meta.glob('../views/**/*.vue')

// // 自动注册路由
// const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     redirect: '/dashboard'
//   }
// ]

// // 自动注册views目录下的所有路由
// Object.keys(views).forEach((key) => {
//   const name = key.match(/\.\.\/views\/(.*)\.vue/)?.[1]?.toLowerCase() || ''
//   if (name) {
//     const path = name.startsWith('project/') ? `/${name}` : `/${name}`
//     routes.push({
//       path: path,
//       name: name.replace(/\//g, '-'),
//       component: views[key]
//     })
//   }
// })

// const router = createRouter({
//   history: createWebHistory(baseUrl),
//   routes
// })

export default router