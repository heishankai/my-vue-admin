<template>
  <div class="notice-list-page">
    <div class="header-title">
      <el-button type="primary" icon="Plus" @click="handleAddNotice">新增</el-button>
      <el-button type="text" icon="Refresh" @click="handleRefresh" />
    </div>
    <el-table
      v-loading="loading"
      :data="noticeListData?.data?.list ?? []"
      row-key="id"
      :header-cell-style="{ background: '#F5F7FA', color: '#909399' }"
    >
      <el-table-column prop="title" label="公告标题" />
      <el-table-column prop="content" label="公告内容" />
      <el-table-column prop="create_time" label="发布时间" />
      <el-table-column prop="Operations" label="操作" width="180" align="center" fixed="right">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      size="small"
      background
      layout="total,prev,pager,next,sizes,jumper"
      :total="noticeListData?.data?.totalCount ?? 0"
      :current-page="currentPage"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NoticeListPage' })
// service
import { getNoticeListService } from './service'

// 分页大小
const pageSize = ref<number>(10)
const currentPage = ref<number>(1)

const {
  loading,
  run,
  data: noticeListData,
} = useRequest(getNoticeListService, {
  manual: true,
})

/**
 * 新增公告
 */
const handleAddNotice = () => {
  console.log('新增公告')
}

/**
 * 刷新
 */
const handleRefresh = () => {
  console.log('刷新')
  run({ page: currentPage.value })
}

/**
 * 分页大小改变
 * @param val 分页大小
 */
const handleSizeChange = (val: number) => {
  console.log('分页大小改变', val)
  pageSize.value = val
}

/**
 * 当前页改变
 * @param val 当前页
 */
const handleCurrentChange = (val: number) => {
  console.log('当前页改变', val)
  currentPage.value = val
}

/**
 * 编辑
 * @param row 行数据
 */
const handleEdit = (row: any) => {
  console.log(row, 'row')
}

/**
 * 删除
 * @param row 行数据
 */
const handleDelete = (row: any) => {
  console.log(row, 'row')
}

/**
 * 当前页改变
 * @param newVal 当前页
 */
watch(
  () => currentPage.value,
  (newVal) => {
    run({ page: newVal })
  },
)

onMounted(() => {
  run({ page: currentPage.value })
})
</script>

<style scoped>
.notice-list-page {
  background-color: #fff;
}

.header-title {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  padding: 12px;
  display: flex;
  justify-content: flex-end;
}
</style>
