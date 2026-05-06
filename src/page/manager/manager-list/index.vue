<template>
  <div class="notice-list-page">
    <el-form
      ref="formRef"
      class="search-form"
      :model="searchForm"
      label-position="left"
      label-width="80"
    >
      <el-row :gutter="12">
        <el-col :span="8">
          <el-form-item
            prop="username"
            label="管理员"
            :rules="[{ required: true, message: '请输入管理员名称' }]"
          >
            <el-input v-model="searchForm.username" placeholder="管理员" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属角色" prop="region">
            <el-select v-model="searchForm.region" placeholder="Activity zone" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="date">
            <el-date-picker
              v-model="searchForm.date"
              style="width: 100%"
              type="date"
              placeholder="Pick a date"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="end">
        <el-button type="primary" icon="search">搜索</el-button>
        <el-button @click="handleSearchReset">重置</el-button>
      </el-row>
    </el-form>

    <div style="height: 12px; background-color: #f5f7fa"></div>

    <el-row justify="space-between" class="header-title">
      <el-button type="primary" icon="Plus" @click="handleAddNotice">新增</el-button>
      <el-button type="text" icon="Refresh" @click="handleRefresh" />
    </el-row>

    <el-table
      v-loading="loading"
      :data="managerListData?.data?.list ?? []"
      row-key="id"
      :header-cell-style="{ background: '#F5F7FA', color: '#909399' }"
    >
      <el-table-column prop="username" label="管理员" />
      <el-table-column prop="role.name" label="所属角色" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
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
      :total="managerListData?.data?.totalCount ?? 0"
      :current-page="currentPage"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ManagerListPage' })
import type { FormInstance } from 'element-plus'
// service
import { getManagerListService } from './service'

// 分页大小
const pageSize = ref<number>(10)
const currentPage = ref<number>(1)
const formRef = ref<FormInstance>()
const searchForm = reactive<Record<string, any>>({
  username: '',
})

/**
 * 重置
 */
const handleSearchReset = () => {
  formRef.value?.resetFields()
  currentPage.value = 1
  pageSize.value = 10
}

const {
  loading,
  run,
  refresh,
  data: managerListData,
} = useRequest(getManagerListService, {
  manual: true,
})

/**
 * 状态改变
 * @param row 行数据
 */
const handleStatusChange = (row: any) => {
  console.log(row, 'row')
}

/**
 * 新增公告
 */
const handleAddNotice = () => {
  console.log('新增公告')
}

/**
 * 刷新
 */
const handleRefresh = () => refresh()

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
  () => [currentPage.value, pageSize.value],
  ([page, limit]) => {
    run({ page, limit })
  },
)

onMounted(() => {
  run({ page: currentPage.value, limit: pageSize.value })
})
</script>

<style scoped lang="scss">
.notice-list-page {
  background-color: #fff;
}

.search-form {
  padding: 12px;
}

.header-title {
  padding: 12px;
}

.pagination {
  padding: 12px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  row-gap: 8px;
  max-width: 100%;
}
</style>
