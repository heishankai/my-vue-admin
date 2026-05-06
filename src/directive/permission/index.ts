import type { DirectiveBinding } from 'vue'
import { useAuthStore } from '@/stores'

/**
 * 检查权限
 * @param el DOM元素
 * @param binding 绑定传入的属性
 */
const checkPermission = (el: HTMLElement, binding: DirectiveBinding<string[]>) => {
  const { authList = [] } = useAuthStore()

  if (!binding.value?.length || !authList?.length) return

  console.log(authList, 'authList')
  console.log(binding.value, 'binding.value')
  console.dir(el, 'el')

  // 检查权限是否全部存在
  const hasPermission = (binding.value || [])?.every((item: string) =>
    (authList || [])?.includes(item),
  )

  // 👉 控制显示 : 用 '' 是为了保持原有的样式
  el.style.display = hasPermission ? '' : 'none'
}

export default {
  // 挂载时
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  // 更新时
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
}
