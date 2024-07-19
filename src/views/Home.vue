<script setup lang="ts">
import AppCard from '@/components/AppCard.vue'
import { ref, watchEffect } from 'vue'
import { REVIEW_STATUS_ENUM } from '@/Model/Enum/app'
import type { AppQueryRequest } from '@/Model/App'
import { listAppVoByPageService } from '@/api/app'
import { Message } from '@arco-design/web-vue'
// 初始化搜索条件（不应该被修改）
const initSearchParams = {
  pageIndex: 1,
  pageSize: 12,
  reviewStatus: REVIEW_STATUS_ENUM.PASS
}
const searchParams = ref<AppQueryRequest>({
  ...initSearchParams
})
//数据总数：
const total = ref<number>(0)
//数据
const dataList = ref([])
//加载数据
const loadData = async () => {
  var response = await listAppVoByPageService(searchParams.value)
  if ((await response).status === 200) {
    dataList.value = response.data?.records
    total.value = response.data?.total
  } else {
    Message.error('数据加载失败')
  }
}
//分页
const onPageChange = (page: number) => {
  searchParams.value.pageIndex = page
}

watchEffect(() => {
  loadData()
})
</script>

<template class="body">
  <div class="searchBar">
    <a-input-search
      :style="{ width: '320px', marginBottom: '20px' }"
      placeholder="快速发现你的应用"
      button-text="搜索"
      search-button
    />
  </div>
  <a-list
    class="list-demo-action-layout"
    :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
    :bordered="false"
    :data="dataList"
    :pagination-props="{
      pageSize: searchParams.pageSize,
      current: searchParams.pageIndex,
      total,
      showTotal: true
    }"
    @page-change="onPageChange"
  >
    <template #item="{ item }">
      <AppCard :app="item" />
    </template>
  </a-list>
</template>
<style scoped></style>
