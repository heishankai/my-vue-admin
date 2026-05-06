<template>
  <div class="f-tag-list">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="tag-tabs"
      closable
      @tab-change="handleTabChange"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path !== HOME_PATH"
      />
    </el-tabs>
    <el-dropdown class="tag-actions" placement="bottom-start">
      <el-button class="h-[32px] w-[32px] !border-none" icon="ArrowDown" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>关闭其他</el-dropdown-item>
          <el-dropdown-item>全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import type { TabPaneName } from 'element-plus'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

defineOptions({ name: 'FTagList' })

/** 与 routes 中首页一致，常驻标签、不可关闭 */
const HOME_PATH = '/'

const route = useRoute()
const router = useRouter()

const activeTab = ref<TabPaneName | undefined>(route.path)
const tabList = ref<{ title: string; path: string }[]>([{ title: '首页', path: HOME_PATH }])

const normalizeTabPath = (path: string) => (path === '/home' ? HOME_PATH : path)

/**
 * 添加标签
 * @param tab
 */
const addTab = (tab: { title?: string; path: string }) => {
  const path = normalizeTabPath(tab.path)
  const title = path === HOME_PATH ? (tab.title ?? '首页') : (tab.title ?? path)

  if (tabList.value.find((item) => item.path === path)) {
    activeTab.value = path
    return
  }

  tabList.value.push({ title, path })
  activeTab.value = path
}

/**
 * 标签切换
 * @param name
 */
const handleTabChange = (name: TabPaneName) => {
  const path = normalizeTabPath(String(name))

  if (path !== route.path) {
    router.push(path)
    activeTab.value = name
  }
}

/**
 * 删除标签
 * @param name
 * 如果删除的是当前激活的标签，则跳转到下一个标签，如果下一个标签不存在，则跳转到首页
 */
const handleTabRemove = (name: TabPaneName) => {
  const targetPath = normalizeTabPath(String(name))

  const targetIndex = tabList.value.findIndex((item) => item.path === targetPath)

  if (targetIndex === -1) return

  const isRemoveActive = activeTab.value === targetPath

  const nextTab = tabList.value[targetIndex + 1] || tabList.value[targetIndex - 1]

  tabList.value.splice(targetIndex, 1)

  if (isRemoveActive) {
    router.push(nextTab?.path || HOME_PATH)
  }
}

onMounted(() => {
  addTab({
    title: typeof route.meta?.title === 'string' ? route.meta.title : undefined,
    path: route.path,
  })
})

onBeforeRouteUpdate((to) => {
  addTab({
    title: typeof to.meta?.title === 'string' ? to.meta.title : undefined,
    path: to.path,
  })
})
</script>

<style scoped>
@reference "tailwindcss";

.f-tag-list {
  @apply flex items-center gap-2 bg-gray-100 h-[44px] overflow-hidden;
}

.tag-tabs {
  flex: 1;
  min-width: 0;
}

.tag-actions {
  flex: 0 0 auto;
}

:deep(.el-tabs__header) {
  margin: 0;
  border-bottom: none;
}

:deep(.el-tabs__nav) {
  border: none !important;
}

:deep(.el-tabs__item) {
  flex: 0 0 auto;
  @apply bg-white rounded-md h-[32px] leading-[32px] mx-1;
  border: none !important;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  @apply h-[32px] leading-[32px];
}

:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>
