import { onMounted, onUnmounted, shallowRef } from 'vue'
import * as echarts from 'echarts'
import type { Ref } from 'vue'

/**
 * @description ECharts Hook
 * 负责：
 * 1. 初始化实例
 * 2. 自动 resize（容器变化）
 * 3. 销毁实例（防止内存泄漏）
 */
export const useChart = (chartRef: Ref<HTMLDivElement | null>) => {
  /**
   * ECharts 实例
   * 👉 用 ref 保证整个生命周期只创建一次
   */
  const chartInstance = shallowRef<echarts.ECharts | null>(null)
  let observer: ResizeObserver | null = null

  onMounted(() => {
    // 容器不存在直接退出（避免空指针）
    if (!chartRef.value) return

    // 初始化 ECharts 实例
    chartInstance.value = echarts.init(chartRef.value)

    /**
     * 使用 ResizeObserver 监听容器尺寸变化
     * 👉 解决：flex布局 / 侧边栏收起 / tab切换 等场景
     */
    observer = new ResizeObserver(() => {
      // ⚠️ resize 是重排操作，这里是最基础版本（可加节流优化）
      chartInstance.value?.resize()
    })

    // 开始监听当前 DOM
    observer.observe(chartRef.value)
  })

  onUnmounted(() => {
    // 清理观察者
    observer?.disconnect()
    // 销毁图表实例
    chartInstance.value?.dispose()
  })

  return {
    chartInstance,
  }
}
