import { defineStore } from 'pinia'
import type { MenuItem } from '@/types'

interface MenuState {
  menuItems: MenuItem[]
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    menuItems: []
  }),
  
  actions: {
    setMenuItems(items: MenuItem[]) {
      this.menuItems = items
    },
    
    addMenuItem(item: MenuItem) {
      this.menuItems.push(item)
    },
    
    removeMenuItem(id: string) {
      this.menuItems = this.menuItems.filter(item => item.id !== id)
    }
  }
})