import request from '@/utils/request'

/**
 * 获取公告列表
 * @param params 请求参数
 * @returns 公告列表
 */
export const getNoticeListService = (params: any) => {
  return request.get(`/api/notice/${params.page}`)
}
