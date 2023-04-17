<script setup lang='ts'>
defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
// const image_src="image.png"
</script>

<template>
  <div>
    <template v-for="(entry, index) in list" :key="index">
      <div class="my-[20px] rounded-[10px] overflow-hidden">
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
          <img src="https://img2.baidu.com/it/u=1361506290,4036378790&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500" alt="">
          {{ entry }}
        </nuxt-link>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
