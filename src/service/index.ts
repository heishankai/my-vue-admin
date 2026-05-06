import Request from '@/utils/request'

/**
 * 获取用户信息 和 权限菜单 请求
 */
export const getUserInfoService = async () => {
  return await Request.post('/api/getinfo')
}

export interface updatePasswordServiceType {
  oldpassword: string
  password: string
  repassword: string
}

/**
 * 修改密码  /updatepassword
 */
export const updatePasswordService = async (data: updatePasswordServiceType) => {
  return await Request.post(`/api/updatepassword`, data)
}
