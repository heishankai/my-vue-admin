import { defineStore } from 'pinia'
import { getUserInfoService } from '@/service'
import { useRequest } from 'vue-hooks-plus'

/**
 * 用户信息管理
 * @param userInfo 用户信息
 * @param setUserInfo 设置用户信息
 * @param getUserInfo 获取用户信息
 */
export const useUserInfoStore = defineStore('userInfo', () => {
  const [userinfoLocal, setUserinfoLocal] = useLocalStorageState('userinfo', {
    defaultValue: {},
  })

  /**
   * 用户信息
   */
  const userInfo = ref<any>(userinfoLocal?.value ?? {})

  /**
   * 请求用户信息
   */
  const { loading, run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: ({ data }) => {
      if (data) {
        setUserInfo(data)
        setUserinfoLocal(data)
      }
    },
  })

  /**
   * 设置用户信息
   * @param value 用户信息
   */
  const setUserInfo = (value: any) => {
    userInfo.value = value
  }

  /**
   * 获取用户信息
   * @returns 用户信息
   */
  const getUserInfo = () => {
    return userInfo.value
  }

  /**
   * 请求用户信息
   */
  const fetchUserInfo = () => {
    run()
  }

  const clearUserInfo = () => {
    userInfo.value = {}
    setUserinfoLocal(undefined)
  }

  return {
    userInfo,
    loading,
    setUserInfo,
    getUserInfo,
    fetchUserInfo,
    clearUserInfo,
  }
})
