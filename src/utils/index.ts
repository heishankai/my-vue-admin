import nprogress from 'nprogress'
/**
 * 显示全屏 nprogress
 */
export const showFullScreenNprogress = () => {
  nprogress.start()
}

/**
 * 隐藏全屏 nprogress
 */
export const hideFullScreenNprogress = () => {
  nprogress.done()
}
