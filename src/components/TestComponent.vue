<template>
  <div :class="$style.container">
    <h1 :class="$style.title">CSS Modules 测试组件</h1>
    <p :class="$style.description">这是一个用于测试 CSS Modules 是否正常工作的组件</p>
  </div>
</template>

<script setup lang="ts">
// 这是一个测试组件，用于验证 CSS Modules 是否正常工作
</script>

<style module>
.container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.title {
  color: #409eff;
  font-size: 24px;
  margin-bottom: 10px;
}

.description {
  color: #666;
  font-size: 16px;
}
</style>