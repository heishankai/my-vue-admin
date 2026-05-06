<template>
  <div class="f-menu">
    <el-menu
      :key="router?.currentRoute?.value?.path || '/'"
      :default-active="router?.currentRoute?.value?.path || '/'"
      class="!border-0"
      :collapse="isMenuCollapse"
      :collapse-transition="false"
      unique-opened
      @select="handleSelect"
    >
      <template v-for="item in menus" :key="item?.id">
        <el-sub-menu v-if="item?.child?.length" :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <el-menu-item v-for="child in item.child" :key="child.id" :index="child?.frontpath">
            <el-icon>
              <component :is="child.icon" />
            </el-icon>
            <span>{{ child.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useLayoutStore, useMenusStore } from '@/stores'

defineOptions({ name: 'FMenu' })

const router = useRouter()

const layoutStore = useLayoutStore()
const { isMenuCollapse } = storeToRefs(layoutStore)

const menusStore = useMenusStore()
const { menus } = storeToRefs(menusStore)

// 菜单选择
const handleSelect = (key: string) => {
  console.log(key)
  router.push(key)
}
</script>

<style scoped>
@reference "tailwindcss";

.f-menu {
  flex: 1;
  min-height: 0;
  overflow: auto;
  transition: width 0.2s ease;
  @apply bg-white;
}

/* 隐藏滚动条 ：WebKit 内核的浏览器 如：iOS Safari、Chrome、Edge 等*/
.f-menu::-webkit-scrollbar {
  display: none;
}
</style>
