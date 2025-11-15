import { defineStore } from 'pinia'
import type { TabItem } from '@/types'

interface TabsState {
  tabs: TabItem[]
}

export const useTabsStore = defineStore('tabs', {
  state: (): TabsState => ({
    tabs: []
  }),
  
  actions: {
    addTab(tab: TabItem) {
      // 检查标签页是否已存在
      const existingTab = this.tabs.find(t => t.path === tab.path)
      if (!existingTab) {
        this.tabs.push(tab)
      }
    },
    
    removeTab(id: string) {
      this.tabs = this.tabs.filter(tab => tab.id !== id)
    },
    
    clearTabs() {
      this.tabs = []
    }
  }
})