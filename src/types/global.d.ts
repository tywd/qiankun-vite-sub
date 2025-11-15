// Global type definitions for the application

// Mocks for qiankun window object
interface Window {
  __POWERED_BY_QIANKUN__: boolean
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string
}

// Element Plus Icons
declare module '@element-plus/icons-vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}