import Request from '@/utils/request'

interface loginServiceType {
  username: string
  password: string
}

/**
 * 登录 请求
 * @param loginServiceType
 * @returns Promise<{ data: { token: string } }>
 */
export const loginService = async (data: loginServiceType) => {
  return await Request.post('/api/login', data)
}
