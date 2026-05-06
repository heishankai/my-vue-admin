<template>
  <div class="f-header">
    <div class="flex items-center">
      <span class="inline-block text-center shrink-0 w-[200px]">hello world</span>
      <el-tooltip :content="isMenuCollapse ? '展开菜单' : '收起菜单'" placement="bottom">
        <span
          class="inline-flex cursor-pointer h-full items-center"
          role="button"
          tabindex="0"
          @click="handleToggleMenuCollapse"
          @keydown.enter="handleToggleMenuCollapse"
          @keydown.space.prevent="handleToggleMenuCollapse"
        >
          <el-icon class="h-full">
            <Expand v-if="isMenuCollapse" />
            <Fold v-else />
          </el-icon>
        </span>
      </el-tooltip>
    </div>

    <div class="flex items-center gap-4">
      <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
        <span
          class="inline-flex cursor-pointer h-full items-center"
          role="button"
          tabindex="0"
          @click="toggleFullscreen"
        >
          <el-icon class="h-full"><FullScreen /></el-icon>
        </span>
      </el-tooltip>

      <el-dropdown @command="handleCommand">
        <span class="flex items-center gap-1 cursor-pointer text-white">
          <el-avatar :src="userInfo?.avatar || DEFAULT_AVATAR" />
          <span>{{ userInfo?.username }}</span>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <password-chang-modal ref="passwordChangModalRef" />
  </div>
</template>

<script lang="ts">
import { DEFAULT_AVATAR } from '@/constant'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@/hooks/useFullscreen'
import PasswordChangModal from './password-chang-modal.vue'

export default {
  name: 'FHeader',
}
</script>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ArrowDown, Expand, Fold, FullScreen } from '@element-plus/icons-vue'
import { useUserInfoStore, useLayoutStore } from '@/stores'

const router = useRouter()

const { isFullscreen, toggleFullscreen } = useFullscreen()
const [, setToken] = useCookieState('admin-token')

const passwordChangModalRef = ref<InstanceType<typeof PasswordChangModal>>()

const layoutStore = useLayoutStore()
const { isMenuCollapse } = storeToRefs(layoutStore)

const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)

/**
 * 下拉菜单
 */
const handleCommand = (command: string) => {
  if (command === 'logout') {
    handleLogout()
    return
  }

  if (command === 'changePassword') {
    passwordChangModalRef.value?.handleOpen({})
    return
  }
}

/**
 * 退出登录
 */
const handleLogout = () => {
  userInfoStore.clearUserInfo()
  setToken(undefined)
  router.replace('/login')
}

/**
 * 切换菜单展开和收缩状态
 */
const handleToggleMenuCollapse = () => {
  layoutStore.toggleMenuCollapse()
}
</script>

<style scoped>
/**
 * @reference 的意思是：「把 Tailwind 这套东西当作编译时的参照」，
 * 让这一段里的 Tailwind 指令（比如 @apply）能 正确解析， 
 * 不会像 @import 那样把整份 Tailwind 再输出一遍（避免重复、体积暴涨）
 */
@reference "tailwindcss";

:deep(.el-dropdown .el-tooltip__trigger:focus) {
  outline: none;
}

/* ================= components（组件层）================= */

/**
* @apply ：把工具类在构建时展开成真实 CSS。
* 例如 @apply flex items-center text-white 会生成等价于在 class ，
* 里写这几个 utility 的声明
*/
.f-header {
  @apply flex items-center justify-between w-full h-full px-4 bg-indigo-500 text-white;
}
</style>
