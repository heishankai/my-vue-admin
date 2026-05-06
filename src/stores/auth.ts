import { defineStore } from 'pinia'
/**
 * 权限管理
 * @param auth 权限
 * @param setAuth 设置权限
 * @param getAuth 获取权限
 */
export const useAuthStore = defineStore('auth', () => {
  const [userInfoLocal]: any = useLocalStorageState('userinfo', {
    defaultValue: {},
  })

  const authList = ref<any[]>(userInfoLocal?.value?.ruleNames ?? [])

  /**
   * 设置权限列表
   * @param value 权限列表
   */
  const setAuthList = (value: any) => {
    authList.value = value
  }

  /**
   * 获取权限列表
   * @returns 权限列表
   */
  const getAuthList = () => {
    return authList.value
  }

  return {
    authList,
    setAuthList,
    getAuthList,
  }
})
