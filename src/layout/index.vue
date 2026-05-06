<template>
  <el-container class="common-layout">
    <el-header>
      <f-header />
    </el-header>

    <el-container>
      <el-aside class="shadow-md" :width="`${menuWidth}px`">
        <f-menu />
      </el-aside>

      <el-main class="layout-main bg-gray-100">
        <div class="layout-main__tags">
          <f-tag-list />
        </div>
        <div class="route-view">
          <router-view v-slot="{ Component, route }">
            <!--
            如果路由配置了 keepAlive，则缓存组件，否则不缓存
            超过10个最久没活动的就会取消缓存 （防止内存泄露）
            缓存组件的 key 为路由的 fullPath 防止组件 vue 的 vnode复用问题
           -->
            <transition name="route-fade" appear>
              <keep-alive :max="10">
                <component
                  :is="Component"
                  v-if="route.meta.keepAlive"
                  :key="`keep-alive-${route.fullPath}`"
                />
              </keep-alive>
            </transition>
            <transition name="route-fade" appear>
              <component
                :is="Component"
                v-if="!route.meta.keepAlive"
                :key="`normal-${route.fullPath}`"
              />
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutComponent' })
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

// components
import FHeader from './components/f-header.vue'
import FMenu from './components/f-menu.vue'
import FTagList from './components/f-tag-list.vue'

const layoutStore = useLayoutStore()
const { menuWidth } = storeToRefs(layoutStore)
</script>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100%;
}

/* header 以下这一层要吃掉剩余高度，否则 aside 只会跟内容等高 */
.common-layout > .el-container {
  flex: 1;
  min-height: 0;
}

.el-aside {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.2s ease;
}

.el-header {
  padding: 0;
}

.el-main.layout-main {
  min-width: 0;
  min-height: 0;
  padding: 0 12px 12px 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout-main__tags {
  flex-shrink: 0;
}

.route-view {
  position: relative;
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: auto;
}

/* 路由过渡动画 */
.route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity 0.12s ease;
}

.route-fade-enter-from,
.route-fade-leave-to {
  opacity: 0;
}

.route-fade-leave-active {
  position: absolute;
  inset: 0;
  width: 100%;
  pointer-events: none;
}
</style>
