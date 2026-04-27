<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import AppButton from '@/components/AppButton.tsx'
const a = ref(1)
console.log(a.value)
</script>

<template>
  <div>
    <h1>手动搭建的 Vue 3 + TS 项目!</h1>
    <HelloWorld msg="恭喜你，搭建成功！" />
    <el-button type="primary">主要按钮1</el-button>
    <AppButton label="Click me" />
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: #42b983;
  cursor: pointer;

  &:hover {
    color: $primary-color;
    font-size: $font-size-base;
  }
}
</style>
