import { App } from 'vue'
import permission from './permission'

export default {
  install(Vue: App) {
    // 权限指令
    Vue.directive('permission', permission)
  },
}
