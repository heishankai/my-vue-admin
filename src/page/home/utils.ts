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
/** 饼图单项 */
export interface PieChartItem {
  label: string
  value: number
}

/** 饼图接口数据形状 */
export interface PieChartData {
  goods: PieChartItem[]
  order: PieChartItem[]
}

/**
 * 饼图 统计维度列表
 */
export const PIE_CHART_SCOPE_LIST: { label: string; value: keyof PieChartData }[] = [
  { label: '商品统计', value: 'goods' },
  { label: '订单统计', value: 'order' },
]

const PIE_CHART_COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#4f46e5', '#c7d2fe', '#e0e7ff']

/**
 * 根据接口数据生成 ECharts 配置（饼图）
 */
export const buildPieChartOption = (data: PieChartItem[]): EChartsOption => {
  return {
    color: PIE_CHART_COLORS,
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['62%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          formatter: '{b}\n{d}%',
        },
        data: (data ?? []).map((item) => ({
          name: item.label,
          value: item.value,
        })),
      },
    ],
  }
}

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
