<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { deleteUserByIdService, getUserListService } from '@/api/user'
import { Message } from '@arco-design/web-vue'
import type { UserQueryRequest } from '@/Model/User'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'

// 初始化搜索条件（不应该被修改）
const initSearchParams = {
  pageIndex: 1,
  pageSize: 10
}
//查询条件
const searchParams = ref<UserQueryRequest>({
  ...initSearchParams
})
//数据总数：
const total = ref(0)

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    bodyCellStyle: {
      fontSize: '10px'
    },
    align: 'center',
    width: 110
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    align: 'center'
  },
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '头像',
    slotName: 'userAvatar'
  },
  {
    title: '简介',
    dataIndex: 'userProfile',
    align: 'center'
  },
  {
    title: '权限',
    dataIndex: 'userRole'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    slotName: 'createTime',
    align: 'center'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    slotName: 'updateTime',
    align: 'center'
  },
  {
    title: '操作',
    slotName: 'optional'
  }
]
const dataList = ref([])
//加载数据
const LoadData = async () => {
  const response = await getUserListService(searchParams.value)
  if (response.status === 200) {
    dataList.value = response.data.records
    total.value = response.data.total
  }
}
//分页查询
const onPageChanging = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageIndex: page
  }
  LoadData()
}
//删除用户
const deleteUser = async (id: string) => {
  const response = await deleteUserByIdService(id)
  if (response.status === 200) {
    Message.success(response.data || '删除成功')
    LoadData()
  } else if (response.status === 204) {
    Message.info('用户不存在')
  } else {
    Message.error('请求失败')
  }
}
const doSearch = () => {
  LoadData()
}
onMounted(() => {
  LoadData()
})
</script>

<template>
  <a-form :model="searchParams" layout="inline" :style="{ marginLeft: '30px' }">
    <a-form-item field="id" label="ID:">
      <a-input v-model="searchParams.id" placeholder="请输入用户ID" allow-clear />
    </a-form-item>
    <a-form-item field="userAccount" label="用户名:">
      <a-input v-model="searchParams.userAccount" placeholder="请输入用户名" allow-clear />
    </a-form-item>
    <a-form-item>
      <a-button @click="doSearch" type="primary" :style="{ width: '100px' }">查询</a-button>
    </a-form-item>
  </a-form>
  <a-table
    :columns="columns"
    :data="dataList"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.pageIndex,
      total: total
    }"
    @page-change="onPageChanging"
  >
    <template #userAvatar="{ record }">
      <a-avatar shape="square" :size="64">
        <img alt="avatar" :src="record.userAvatar" />
      </a-avatar>
    </template>
    <template #createTime="{ record }">
      {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
    </template>
    <template #updateTime="{ record }">
      {{ dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
    </template>
    <template #optional="{ record }">
      <a-button status="danger" @click="deleteUser(record.id)">删除</a-button>
    </template>
  </a-table>
</template>

<style scoped></style>
