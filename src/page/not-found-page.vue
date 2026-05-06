<template>
  <el-result title="404" sub-title="页面未找到" icon="warning">
    <template #extra>
      <el-button type="primary" class="text-4xl font-bold underline" @click="router.back()"
        >返回</el-button
      >
    </template>
  </el-result>
</template>

<script setup lang="ts">
defineOptions({ name: 'NotFoundPage' })

const router = useRouter()
</script>

<style></style>
