---
title: error错误处理
---
# error错误处理

### 通过自定义插件捕获报错信息

1. 在插件中创建一个错误插件plugins/error.ts
2. 通过`nuxt.vueApp.config.errorHandler`捕获vue的报错 或者 `nuxt.hook`捕获vue和app的错误
```ts
export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.config.errorHandler = (err) => {
    console.log('vue error handler', err)
  }
  nuxt.hook('vue:error', (err) => {
    console.log('vue:error', err)
  })
  nuxt.hook('app:error', (err) => {
    console.log('app:error', err)
  })
})
```

### 错误页面处理

1. 在根目录新建error.vue，当有错误的时候，自动会跳转到这个组件
```ts
const props = defineProps({
  error: Object
})
console.log(props.error)
const router = useRouter()
// 点击重试
const retry = () => {
  window.location.href = props.error!.url
}
// 在您的页面、组件和插件中，您可以使用 清除所有错误并重定向。clearError
const handleError = () => clearError({ redirect: '/' })
```
2. 注意上面的props.error，这是一个内置的api， `showError` 函数传入的
```js
showError('文件不存在')
```
当我们执行的时候，就会跳转到error页面，并且传入入参数。

## 内置错误组件NuxtErrorBoundary

[NuxtErrorBoundary文档](https://nuxt.com/docs/api/components/nuxt-error-boundary#nuxterrorboundary)

事件  @error：组件的默认插槽引发错误时发出的事件。
```vue
<template>
  <NuxtErrorBoundary @error="logSomeError">
    <!-- ... -->
  </NuxtErrorBoundary>
</template>
```
插槽  #error：指定出错时要显示的回退内容。
```vue
<template>
  <NuxtErrorBoundary>
    <!-- ... -->
    <template #error="{ error }">
      <p>An error occurred: {{ error }}</p>
    </template>
  </NuxtErrorBoundary>
</template>
```

## 服务端接口处理

我们只需要在接口里，直接通过`createError`给前端抛出错误
```js
throw createError({
  statusCode: 404,
  statusMessage: "文章不存在"
});
```