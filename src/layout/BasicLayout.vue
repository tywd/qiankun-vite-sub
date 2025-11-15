<template>
  <el-container class="layout-container">
    <!-- <el-header class="layout-header">
      <div class="header-left">
        <h2>子应用管理系统</h2>
      </div>
      <div class="header-right">
        <el-dropdown>
          <el-avatar :size="32" icon="UserFilled" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header> -->
    
    <el-container>
      <el-aside class="layout-sidebar" width="200px">
        <Sidebar />
      </el-aside>
      
      <el-main class="layout-main">
        <TabsView />
        <div class="main-content">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import TabsView from './TabsView.vue'
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.layout-header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left h2 {
  margin: 0;
  color: #409eff;
}

.layout-sidebar {
  background: #001529;
  border-right: 1px solid #e4e7ed;
}

.layout-main {
  padding: 0;
}

.main-content {
  padding: 20px;
  height: calc(100% - 40px);
  overflow: auto;
}
</style>