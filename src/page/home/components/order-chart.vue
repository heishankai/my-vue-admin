<template>
  <el-card shadow="hover" class="w-full min-w-0">
    <template #header>
      <div class="flex items-center justify-between">
        <span>订单概览</span>

        <el-radio-group v-model="scopeKey" size="small">
          <el-radio-button
            v-for="item in ORDER_CHART_SCOPE_LIST"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </template>

    <chart :option="chartOption" :loading="loading" width="100%" height="300px" />
  </el-card>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { Chart } from '@/components/index'
import { ORDER_CHART_SCOPE_LIST, buildOrderChartOption, type OrderChartData } from '../utils'
import { getOrderChartDataService } from '../service'

defineOptions({ name: 'OrderChart' })

const scopeKey = ref<string | number | boolean | undefined>('month')

const chartData = ref<OrderChartData>({
  x: [],
  y: [],
})

// 获取订单概览数据
const { loading, run } = useRequest(getOrderChartDataService, {
  manual: true,
  onSuccess: ({ data }) => data && (chartData.value = data),
})

// 监听时间范围变化
watch(scopeKey, (val) => val && run({ type: val }), { immediate: true })

/** 订单概览 图表配置 */
const chartOption = computed<EChartsOption>(() => buildOrderChartOption(chartData.value))
</script>
