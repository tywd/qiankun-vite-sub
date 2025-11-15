<template>
  <div class="virtual-list-container">
    <h1>虚拟列表示例</h1>
    <p>这是一个虚拟列表组件示例</p>
    <div class="list-container">
      <el-card v-for="item in 100" :key="item" class="list-item">
        <div class="item-content">
          <h3>项目 {{ item }}</h3>
          <p>这是项目 {{ item }} 的描述信息</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// 虚拟列表示例页面
</script>

<style scoped>
.virtual-list-container {
  padding: 20px;
}

.list-container {
  max-height: 500px;
  overflow-y: auto;
}

.list-item {
  margin-bottom: 10px;
}

.item-content h3 {
  margin: 0 0 10px 0;
}

.item-content p {
  margin: 0;
  color: #666;
}
</style>