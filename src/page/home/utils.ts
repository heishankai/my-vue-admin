import type { EChartsOption } from 'echarts'

/**
 * 订单概览 时间范围列表
 */
export const ORDER_CHART_SCOPE_LIST: { label: string; value: string }[] = [
  {
    label: '近1个月',
    value: 'month',
  },
  {
    label: '近一周',
    value: 'week',
  },
  {
    label: '近24小时',
    value: 'hour',
  },
]

/** 订单柱状图接口数据形状 */
export interface OrderChartData {
  x: string[]
  y: number[]
}

/**
 * 根据接口数据生成 ECharts 配置（订单概览柱状图）
 */
export const buildOrderChartOption = (data: OrderChartData): EChartsOption => {
  return {
    grid: [{ left: 0, right: 0, top: 20, bottom: 0, containLabel: true }],
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data?.x ?? [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data?.y ?? [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180,180,180,0.2)',
        },
        itemStyle: {
          color: '#6366f1',
        },
      },
    ],
  }
}
