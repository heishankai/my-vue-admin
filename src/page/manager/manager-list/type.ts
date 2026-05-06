/**
 * 管理员列表请求参数
 */
export interface ManagerListParams {
  page: number
  limit: number
  keyword?: string
}

/**
 * 新增管理员请求参数
 */
export interface AddManagerParams {
  username: string
  password: string
  status: number
  avatar: string
  role_id?: number
}
