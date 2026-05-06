import { computed, onMounted, onUnmounted, shallowRef, toValue, type MaybeRefOrGetter } from 'vue'

/**
 * 全屏目标：可以是普通 DOM 引用，也可以是 `ref` / `computed` 等响应式来源。
 * 不传则表示「整页」：`document.documentElement`（`<html>`）。
 */
type Target = MaybeRefOrGetter<HTMLElement | null | undefined>

/**
 * 解析出最终要调用 `requestFullscreen()` 的 DOM 节点。
 * - 未传 `target`：整页全屏。
 * - 传了但当前值为 `null`（例如 ref 尚未挂上）：同样回退到整页，避免报错。
 */
const resolveTarget = (target?: Target): HTMLElement => {
  const el = target === undefined ? null : toValue(target)
  return el ?? document.documentElement
}

/** 当前处于全屏模式的元素；没有全屏时为 `null`（标准属性名，无前缀）。 */
const getFullscreenElement = (): Element | null => {
  return document.fullscreenElement
}

/**
 * 浏览器原生全屏（W3C Fullscreen API），不依赖第三方库。
 *
 * 注意：`ref` 必须在调用 `openFullscreen` / `toggleFullscreen` 时已指向真实 DOM（一般在用户点击时调用即可）。
 *
 * @param target 可选。全屏目标节点；不传则使用 `document.documentElement`（整页）。
 *
 * @returns 响应式状态与控制方法
 * @returns isFullscreen 是否认为「当前 hook 所关心的目标」处于全屏（与 `fullscreenchange` 同步）
 * @returns isSupported 环境是否具备 `requestFullscreen`（粗略检测）
 * @returns openFullscreen 进入全屏（Promise，失败时需在业务里 `try/catch` 若需要提示用户）
 * @returns closeFullscreen 退出全屏
 * @returns toggleFullscreen 在当前状态基础上切换
 */
export function useFullscreen(target?: Target) {
  /** 是否处于全屏；用 shallowRef 即可，只替换布尔值 */
  const isFullscreen = shallowRef(false)

  const isSupported = computed(
    () => typeof document.documentElement.requestFullscreen === 'function',
  )

  /**
   * 根据浏览器当前全屏元素，更新 `isFullscreen`。
   * 判定为 true：当前全屏元素就是目标元素，或是目标元素内部节点（兼容嵌套边缘情况）。
   */
  const sync = () => {
    const fs = getFullscreenElement()
    const el = resolveTarget(target)
    isFullscreen.value = fs !== null && (fs === el || el.contains(fs))
  }

  const openFullscreen = async () => {
    if (!isSupported.value) return
    const el = resolveTarget(target)
    // 已是目标元素全屏，避免重复调用
    if (getFullscreenElement() === el) return
    // 若页面上由其它元素占据全屏，必须先退出，否则部分浏览器拒绝切换目标
    if (getFullscreenElement()) await document.exitFullscreen()
    await el.requestFullscreen()
  }

  const closeFullscreen = async () => {
    if (!getFullscreenElement()) return
    await document.exitFullscreen()
  }

  const toggleFullscreen = async () => {
    if (isFullscreen.value) await closeFullscreen()
    else await openFullscreen()
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', sync)
    // 挂载后立即对齐一次（例如从其它页面前进后退、或其它代码触发的全屏）
    sync()
  })

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', sync)
    // 不在此强制 exitFullscreen：避免卸载子组件却关掉用户仍想保留的全屏页，按需由业务处理
  })

  return {
    isFullscreen,
    isSupported,
    openFullscreen,
    closeFullscreen,
    toggleFullscreen,
  }
}
