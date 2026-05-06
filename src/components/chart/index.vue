<script setup lang="ts">
import { useChart } from '@/hooks'
import type { ChartProps } from './type'

defineOptions({ name: 'Chart' })

const props = withDefaults(defineProps<ChartProps>(), {
  width: '100%',
  height: '300px',
  option: () => ({}),
  loading: false,
})

const chartRef = ref<HTMLDivElement | null>(null)
const { chartInstance } = useChart(chartRef)

watch(
  () => props.loading,
  (loading) => {
    if (!chartInstance.value) return

    if (loading) {
      chartInstance.value?.showLoading()
      return
    }

    chartInstance.value?.hideLoading()
  },
)

watch(
  () => props.option,
  (option) => {
    if (!chartInstance.value) return
    chartInstance.value.setOption(option, false)
  },
  { deep: true },
)

onMounted(() => {
  nextTick(() => {
    chartInstance.value?.setOption(props.option, false)

    if (props?.loading) {
      chartInstance.value?.showLoading()
    }
  })
})
</script>

<template>
  <div ref="chartRef" :style="{ width: props?.width, height: props?.height }"></div>
</template>

<style></style>
