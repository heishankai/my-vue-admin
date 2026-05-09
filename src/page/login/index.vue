<template>
  <el-row class="login-page">
    <el-col
      :lg="16"
      :md="12"
      class="bg-indigo-500"
      :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center' }"
    >
      <h1 class="text-6xl font-bold text-white">欢迎光临</h1>
    </el-col>
    <el-col
      :lg="8"
      :md="12"
      class="bg-slate-50"
      :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center' }"
    >
      <login-form />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import LoginForm from './components/login-form.vue'

defineOptions({ name: 'LoginPage' })

/**
 * @description 响应式布局
 * lg ： ≥1200px 左边是16 右边是8
 * md ： ≥992px 左边是12 右边是12
 */
</script>

<script setup lang="ts"></script>

<style scoped lang="scss">
.login-page {
  width: 100vw;
  height: 100vh;
}
</style>
