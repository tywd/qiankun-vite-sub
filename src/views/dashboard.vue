<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <p>Welcome to the qiankun-vite-sub application.</p>
    <div class="features">
      <el-card class="feature-card">
        <template #header>
          <div class="card-header">
            <span>功能特性</span>
          </div>
        </template>
        <div class="feature-item">
          <el-tag type="success">Vue 3</el-tag>
          <el-tag type="primary">Vite</el-tag>
          <el-tag type="warning">TypeScript</el-tag>
          <el-tag type="danger">Qiankun</el-tag>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// 子应用仪表盘页面
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.features {
  margin-top: 20px;
}

.feature-card {
  max-width: 600px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feature-item {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>