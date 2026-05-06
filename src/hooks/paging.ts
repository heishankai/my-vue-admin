/**
 * 分页 hook
 * @returns pageSize 分页大小
 * @returns currentPage 当前页
 */

export const usePaging = () => {
  const pageIndex = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  return {
    pageSize,
    pageIndex,
    total,
  }
}
