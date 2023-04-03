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
</script>

<template>
  <div>
    <n-card
      v-for="(data, index) in list"
      :key="index"
      :title="data.date"
      hoverable
    >
      {{ data.title }}
    </n-card>
  </div>
</template>

<style scoped></style>
