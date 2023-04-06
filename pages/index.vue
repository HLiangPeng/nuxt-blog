<script setup lang="ts">
type ListType = {
    id: string;
    title: any;
    date: Date | string;
}

const list: ListType[] = await $fetch('/api/post')
// const list = listData.map((data) => {
//   data.date = (data.date as Date).getTime() + ''
//   return data
// })

// setTimeout(() => {
//   showError('文件不存在')
// }, 3000)

definePageMeta({
  middleware(to, from) {
    console.log('匿名中间件，具体页面执行', to, from)
  }
})

function handleToDetail () {
  navigateTo('/detail')
}

</script>

<template>
  <div>
    <NuxtErrorBoundary>
      <template #error="{ error }">
        <p>An error occurred: {{ error }}</p>
      </template>
    </NuxtErrorBoundary>
    <n-card
      v-for="(data, index) in list"
      :key="index"
      hoverable
      class="mb-2 cursor-pointer"
      @click="handleToDetail"
    >
      {{ data.title }}
    </n-card>
  </div>
</template>

<style scoped></style>
