<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <el-breadcrumb-item 
      v-for="(item, index) in breadcrumbItems" 
      :key="index"
      :to="item.path"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface BreadcrumbItem {
  title: string
  path: string
}

const route = useRoute()
const breadcrumbItems = ref<BreadcrumbItem[]>([])

// 根据路由生成面包屑
const generateBreadcrumb = () => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  const first = matched[0]
  
  if (first && first.name !== 'Dashboard') {
    breadcrumbItems.value = [
      { title: '首页', path: '/dashboard' },
      ...matched.map(item => ({
        title: item.meta?.title as string || item.name as string,
        path: item.path
      }))
    ]
  } else {
    breadcrumbItems.value = matched.map(item => ({
      title: item.meta?.title as string || item.name as string,
      path: item.path
    }))
  }
}

// 监听路由变化
watch(route, () => {
  generateBreadcrumb()
}, { immediate: true })
</script>

<style scoped>
.breadcrumb-container {
  padding: 10px 20px;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
}
</style>