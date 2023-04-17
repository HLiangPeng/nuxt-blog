<script setup lang='ts'>

</script>

<template>
  <div class="left-aside divide-y divide-primary">
    <!-- 我的信息 -->
    <div class="flex flex-col items-center py-[20px]">
      <img src="/avatar.jpg" class="rounded-full w-[130px] h-[130px] mb-[10px] border-2 border-bg" alt="">
      <div class="font-bold">
        取黄粱一梦
      </div>
      <div class="text-[12px]">
        我也曾追逐过光
      </div>
    </div>
    <!-- 导航 -->
    <div class="py-[20px] leading-10">
      <div class="text-[12px] px-[20px]">
        导航
      </div>
      <div class="flex flex-col text-[14px]">
        <nuxt-link class="px-[20px] pl-[30px] hover:bg-hover" to="/">code积累</nuxt-link>
        <nuxt-link class="px-[20px] pl-[30px] hover:bg-hover" to="/live">生活轶事</nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
