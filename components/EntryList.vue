<script setup lang='ts'>
interface Entry {
  title: string,
  date: string
}
type List = Entry[]

defineProps({
  list: {
    type: Array as PropType<List>,
    default: () => []
  }
})
// const image_src="image.png"
</script>

<template>
  <div>
    <template v-for="(entry, index) in list" :key="index">
      <div class="my-[20px] rounded-[10px] overflow-hidden bg-primary">
        <nuxt-link to="/detail">
          <!-- <NuxtImg
            src="https://img2.baidu.com/it/u=1361506290,4036378790&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
            fit="inside"
            class="justify-self-end rounded-[3px] cursor-pointer"
          /> -->
          <!-- <img
            :src="require(`~/assets/${image_src}`)"
            width="70px"
            height="80px"
          /> -->
          <img
            class="w-[100%] h-52"
            src="https://img2.baidu.com/it/u=1361506290,4036378790&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
            alt=""
          >
          <div class="h-52 p-[30px]">
            <div class=" divide-y divide-primary">
              <div class="text-[18px]">
                {{ entry.title }}
              </div>
              <div class="text-[14px]">
                {{ entry.date }}
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
