<script setup lang="ts">
defineOptions({ name: 'HomePage' })
// components
import { FormDrawer } from '@/components/index'
import OrderChart from './components/order-chart.vue'

const formDrawerRef = ref<InstanceType<typeof FormDrawer>>()

const handleOpenFormDrawer = () => {
  formDrawerRef.value?.handleOpen({})
}

const handleSubmit = async () => {
  console.log('handleSubmit')
}
</script>

<template>
  <div class="w-full">
    <el-button type="primary" @click="handleOpenFormDrawer">主要按钮1</el-button>
    <form-drawer ref="formDrawerRef" @submit="handleSubmit">
      <div v-for="item in 1000" :key="item">
        {{ item }}
      </div>
    </form-drawer>
    <el-row :gutter="20">
      <el-col v-permission="['getStatistics3,GET', 'updateRule,POST']" :span="12">
        <order-chart />
      </el-col>
    </el-row>
  </div>
</template>

<style></style>
