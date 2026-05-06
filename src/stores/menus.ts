import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useUserInfoStore } from './userInfo'

/**
 * 菜单管理
 * @param menus 登录人的菜单列表
 * @param setMenus 设置菜单
 * @param getMenus 获取菜单
 */
export const useMenusStore = defineStore('menus', () => {
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)

  /**
   * 登录人的菜单列表
   */
  const menus = computed(() => userInfo.value?.menus ?? [])

  /**
   * 设置菜单
   * @param value 菜单
   */
  const setMenus = (value: any[]) => {
    userInfoStore.setUserInfo({
      ...userInfo.value,
      menus: value,
    })
  }

  /**
   * 获取菜单
   * @returns 菜单
   */
  const getMenus = () => {
    return menus.value
  }

  return {
    menus,
    setMenus,
    getMenus,
  }
})
