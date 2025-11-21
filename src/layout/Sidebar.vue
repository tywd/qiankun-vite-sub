<template>
  <div class="sidebar-container">
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#409eff"
      router
    >
      <el-menu-item index="/dashboard">
        <el-icon><House /></el-icon>
        <span>仪表盘</span>
      </el-menu-item>
      
      <el-sub-menu index="project">
        <template #title>
          <el-icon><Folder /></el-icon>
          <span>项目管理</span>
        </template>
        <el-menu-item index="/project/virtual-list">虚拟列表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { House, Folder } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = ref(route.path)

watch(route, () => {
  activeMenu.value = route.path
}, { immediate: true })
</script>

<style>
.sidebar-container {
  height: 100%;
}

.sidebar-menu {
  border-right: none;
  height: 100%;
}

.el-menu-item {
  background-color: #001529 !important;
}

.el-menu-item:hover {
  background-color: #001f3f !important;
}

.el-sub-menu .el-menu-item {
  background-color: #000c17 !important;
}

.el-sub-menu .el-menu-item:hover {
  background-color: #001f3f !important;
}
</style>