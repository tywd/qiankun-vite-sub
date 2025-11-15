<template>
  <div class="tabs-container">
    <el-tabs
      v-model="activeTab"
      type="card"
      closable
      @tab-remove="removeTab"
      class="tabs-view"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.path"
        :label="tab.title"
        :name="tab.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Tab {
  title: string
  path: string
}

const route = useRoute()
const router = useRouter()

const activeTab = ref(route.path)
const tabs = ref<Tab[]>([
  { title: '仪表盘', path: '/dashboard' }
])

// 监听路由变化，自动添加标签页
watch(route, (newRoute) => {
  activeTab.value = newRoute.path
  
  // 如果标签页不存在，则添加
  const existingTab = tabs.value.find(tab => tab.path === newRoute.path)
  if (!existingTab) {
    const title = newRoute.meta?.title as string || newRoute.name as string || newRoute.path
    tabs.value.push({ title, path: newRoute.path })
  }
}, { immediate: true })

// 关闭标签页
const removeTab = (targetName: string) => {
  const tabsList = tabs.value
  let activeName = activeTab.value
  
  if (activeName === targetName) {
    tabsList.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tabsList[index + 1] || tabsList[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  
  activeTab.value = activeName
  tabs.value = tabsList.filter(tab => tab.path !== targetName)
  
  // 如果关闭的是当前标签页，跳转到新的激活标签页
  if (targetName === route.path) {
    router.push(activeName)
  }
}
</script>

<style scoped>
.tabs-container {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
}

.tabs-view {
  padding: 0 20px;
}

:deep(.el-tabs__header) {
  margin: 0;
}

:deep(.el-tabs__nav) {
  border: none;
}

:deep(.el-tabs__item) {
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
}
</style>