<template>
  <div class="flex w-full max-w-sm min-w-0 flex-col items-center p-4">
    <h2 class="text-3xl font-bold text-gray-800">欢迎回来</h2>

    <div class="flex items-center justify-center my-5">
      <span class="h-px w-10 bg-gray-300"></span>
      <span class="mx-2 text-gray-300">账号密码登录</span>
      <span class="h-px w-10 bg-gray-300"></span>
    </div>

    <el-form ref="loginFormRef" class="ep-form-fill w-full" :model="loginForm">
      <el-row>
        <el-col :span="24">
          <el-form-item prop="username" :rules="[{ required: true, message: '请输入用户名' }]">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
              clearable
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码' }]">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
              :prefix-icon="Lock"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-button
        type="primary"
        :loading="loading"
        size="large"
        class="w-full"
        round
        @click="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useCookieState } from 'vue-hooks-plus'
import { useRouter } from 'vue-router'
// service
import { loginService } from '../service'
import { useUserInfoStore } from '@/stores'

defineOptions({ name: 'LoginForm' })

const router = useRouter()
const userInfoStore = useUserInfoStore()

const loginFormRef = ref<FormInstance>()

const [, setToken] = useCookieState('admin-token', {
  defaultValue: '',
  // expires: 7, // 比如设置 7 天后过期
})

const loginForm = reactive({
  username: '',
  password: '',
})

/**
 * 登录请求
 */
const { loading, run } = useRequest(loginService, {
  manual: true,
  onSuccess: (res) => {
    if (!res?.data?.token) return
    setToken(res?.data?.token)
    /**
     * 异步获取用户信息
     */
    userInfoStore.fetchUserInfo()

    router.push('/')
  },
})

/**
 * 登录提交
 */
const handleLogin = async () => {
  const isValid = await loginFormRef?.value?.validate?.()

  if (!isValid) return

  run(loginForm)
}
</script>

<style scoped lang="scss"></style>
