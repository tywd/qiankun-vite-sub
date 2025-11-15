export interface AppNavTab {
  id: string
  app: string
  name: string
  path: string
  isActive: boolean
}

export interface MenuItem {
  id: string
  title: string
  path: string
  icon?: string
  children?: MenuItem[]
}

export interface TabItem {
  id: string
  name: string
  path: string
  closable: boolean
}