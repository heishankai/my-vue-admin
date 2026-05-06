<template>
  <el-drawer
    v-model="visible"
    direction="rtl"
    :close-on-click-modal="false"
    :before-close="handleCancel"
    :size="size"
    :title="title"
    :destroy-on-close="destroyOnClose"
  >
    <slot></slot>
    <template #footer>
      <div>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="loading" @click="submit">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { useBoolean } from 'vue-hooks-plus'
defineOptions({ name: 'FormDrawer' })

interface FormDrawerProps {
  size?: string | number
  title?: string
  destroyOnClose?: boolean
  loading?: boolean
}

withDefaults(defineProps<FormDrawerProps>(), {
  size: '30%',
  title: '',
  destroyOnClose: true,
})

/** 类型化 emits，模板里 @submit 才会被识别为合法监听器（strictTemplates） */
const emit = defineEmits<{
  submit: []
}>()

const [visible, { setTrue, setFalse }] = useBoolean(false)

// 打开
/**
 * 父组件可传占位参数 `handleOpen({})`，此处不使用入参
 */
const handleOpen = (_payload?: unknown) => {
  setTrue()
}

// 取消
const handleCancel = () => setFalse()

// 提交
const submit = async () => {
  await emit('submit')
}

defineExpose({ handleOpen, handleCancel, submit })
</script>

<style scoped></style>
