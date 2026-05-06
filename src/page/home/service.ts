import request from '@/utils/request'

/**
 * 获取订单概览数据
 * @param params
 * @returns
 */
export const getOrderChartDataService = (params: any) => {
  return request.get('/api/statistics3', { params })
}
