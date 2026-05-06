import request from '@/utils/request'
import type { ManagerListParams, AddManagerParams } from './type'

/**
 * 获取管理员列表
 * @param params 请求参数
 * @returns 管理员列表
 */
export const getManagerListService = (params: ManagerListParams) => {
  const { page = 1, limit = 10, keyword = '' } = params ?? {}
  return request.get(`/api/manager/${page}?limit=${limit}&keyword=${keyword}`)
}

/**
 * 新增管理员
 * @param data 新增管理员数据
 * @returns 新增管理员数据
 */
export const addManagerService = (data: AddManagerParams) => {
  return request.post('/api/manager', data)
}
