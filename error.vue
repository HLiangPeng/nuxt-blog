<script setup lang="ts">
const props = defineProps({
  error: Object
})
console.log(props.error)
// const router = useRouter()
const retry = () => {
  window.location.href = props.error!.url
}
// 在您的页面、组件和插件中，您可以使用 清除所有错误并重定向。clearError
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="pt-10">
    <h1 class="text-2xl text-center mb-2">
      出了点错 - {{ props.error?.statusCode }}
    </h1>
    <div @click="retry">重试</div>
    <div @click="handleError">回到首页</div>
    <!-- <NEmpty description="你什么也找不到">
      <template #extra>
        <n-button @click="retry">
          重试
        </n-button>
        <n-button @click="handleError">
          回到首页
        </n-button>
      </template>
    </NEmpty> -->
  </div>
</template>
