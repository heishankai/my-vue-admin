<template>
  <el-dialog
    v-model="visible"
    title="修改密码"
    width="500"
    :before-close="handleCancel"
    destroy-on-close
    align-center
    :close-on-click-modal="false"
  >
    <el-form
      ref="changePasswordFormRef"
      :model="changePasswordForm"
      label-position="left"
      label-width="100px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="旧密码"
            prop="oldpassword"
            :rules="[{ required: true, message: '请输入旧密码' }]"
          >
            <el-input
              v-model="changePasswordForm.oldpassword"
              placeholder="请输入旧密码"
              clearable
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item
            label="新密码"
            prop="password"
            :rules="[{ required: true, message: '请输入新密码' }]"
          >
            <el-input
              v-model="changePasswordForm.password"
              placeholder="请输入新密码"
              show-password
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item
            label="确认密码"
            prop="repassword"
            :rules="[{ required: true, message: '请输入确认密码' }]"
          >
            <el-input
              v-model="changePasswordForm.repassword"
              placeholder="请输入确认密码"
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useRequest } from 'vue-hooks-plus'
// service
import { updatePasswordService } from '@/service'

defineOptions({ name: 'PasswordChangModal' })

const changePasswordFormRef = ref<FormInstance>()
const [visible, { setTrue, setFalse }] = useBoolean(false)
const changePasswordForm = reactive<any>({})

const { run, loading } = useRequest(updatePasswordService, {
  manual: true,
  onSuccess: () => {
    handleCancel()
    ElMessage.success('修改密码成功！')
  },
})

//打开弹窗
const handleOpen = (values: any) => {
  console.log(values, 'values')
  setTrue()
}

// 取消弹框
const handleCancel = () => {
  changePasswordFormRef?.value?.resetFields()
  setFalse()
}

// 提交
const handleSubmit = async () => {
  await changePasswordFormRef?.value?.validate?.()
  console.log(changePasswordForm, 'changePasswordForm')
  run(changePasswordForm)
}

defineExpose({ handleOpen })
</script>
