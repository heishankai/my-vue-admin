<template>
  <el-card shadow="hover" class="w-full min-w-0">
    <template #header>
      <div class="flex items-center justify-between">
        <span>数据占比</span>

        <el-radio-group v-model="scopeKey" size="small">
          <el-radio-button
            v-for="item in PIE_CHART_SCOPE_LIST"
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
import { PIE_CHART_SCOPE_LIST, buildPieChartOption, type PieChartData } from '../utils'
import { getPieChartDataService } from '../service'

defineOptions({ name: 'PieChart' })

const scopeKey = ref<string | number | boolean | undefined>('goods')

const chartData = ref<PieChartData>({
  goods: [],
  order: [],
})

const { loading, run } = useRequest(getPieChartDataService, {
  manual: true,
  onSuccess: ({ data }) => data && (chartData.value = data),
})

onMounted(() => run())

const chartOption = computed<EChartsOption>(() => {
  const key = (scopeKey.value === 'order' ? 'order' : 'goods') as keyof PieChartData
  return buildPieChartOption(chartData.value[key] ?? [])
})
</script>
