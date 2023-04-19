---
title: nuxt3-踩坑
---

# nuxt3-踩坑

### $refs获取dom

如果用到ref去操作dom，不能使用reactive去进行响应式，只能使用ref定义初始化

```js
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

## 图片引入问题

### 静态图片引入

我们需要把图片资源放在public目录下

比如我们放的目录是`public/static/a.png`，那么在代码中我们src中直接写`static/a.png`

### 动态图片引入

我们需要替代的是文件名，记住需要用变量替代的只是**文件名**，而不是整个路径

```js
const img = '***'

<img :src="`/static/img/${img}.png`>
```

## nuxt中无法访问windows对象

因为在服务端我们无法获取到windows等对象，并且也无法通过if(windows)过滤，但凡出现了windows都会报错

解决办法：把相应的操作放在onMounted函数中，确保是在客户端渲染的

## 在onMounted调用接口，界面渲染问题

因为服务端的限制问题，比如上面无法访问windows对象问题，所以我们有些后端数据也需要在`onMounted`获取。

但是这里就出现了一个问题，界面数据并没有渲染到页面中，并且也无法打印数据。

解决方案：发现在setup、onMounted都调用下接口，界面正常渲染

## 如何使用element-plus icon

官方文档提供的写法：

```html
<el-icon :size="20">
  <Edit />
</el-icon>
```
它会提示[Vue warn]: Failed to resolve component: Edit，这个Edit组件不存在。

解决方案：在每个icon组件名前加ElIcon即可

```html
<el-icon :size="20">
  <ElIconEdit />
</el-icon>
```

方案二：unplugin-icons