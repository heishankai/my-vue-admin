import { defineStore } from 'pinia'

export const MENU_EXPANDED_WIDTH = 250
export const MENU_COLLAPSED_WIDTH = 64

/**
 * 布局管理
 * 管理菜单的展开和收缩状态，以及菜单的宽度
 * @param isMenuCollapse 菜单是否展开
 * @param menuWidth 菜单宽度
 * @param toggleMenuCollapse 切换菜单展开和收缩状态
 * @param setMenuCollapse 设置菜单展开和收缩状态
 */
export const useLayoutStore = defineStore('layout', () => {
  /**
   * 菜单是否展开
   */
  const isMenuCollapse = ref<boolean>(false)

  /**
   * 菜单宽度
   */
  const menuWidth = computed<number>(() =>
    isMenuCollapse.value ? MENU_COLLAPSED_WIDTH : MENU_EXPANDED_WIDTH,
  )

  /**
   * 切换菜单展开和收缩状态
   */
  const toggleMenuCollapse = () => {
    isMenuCollapse.value = !isMenuCollapse.value
  }

  /**
   * 设置菜单展开和收缩状态
   * @param collapse 是否展开
   */
  const setMenuCollapse = (collapse: boolean) => {
    isMenuCollapse.value = collapse
  }

  return {
    isMenuCollapse,
    menuWidth,
    toggleMenuCollapse,
    setMenuCollapse,
  }
})
