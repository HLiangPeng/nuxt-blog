---
title: nuxt基础-中间件
---

# nuxt基础-中间件

在其他框架中，中间件的概念是对行为的一种拦截。nuxt中也不例外，这里分为两种：

- Route middleware：路由中间件；
- Server middleware：服务器中间件。

## 路由中间件

路由中间件并不是一定运行在客户端的中间件，而是运行在 Nuxt 应用中 Vue 渲染部分，`路由中间件会在进入路由之前被调用`，如果是 SSR，这个执行时刻既可能在服务端（首屏），也可能在客户端。

### 中间件类型

路由中间件根据影响范围和使用方式的不同，又分为三种：

- 匿名中间件：只影响一个页面，不可复用；

- 具名中间件：指定若干影响页面，可复用、组合；

- 全局中间件：影响所有页面，文件名需要加后缀 global。

### 中间件使用

#### 1. 匿名中间件用法

我们只需要在使用到的vue文件中，通过definePageMeta函数定义middleware即可。

```js
definePageMeta({
  middleware(to, from) {
    console.log('匿名中间件，具体页面执行', to, from)
  }
})
```

使用场景：用于监听单个组件路由变化

#### 2. 具名中间件用法

定义具名中间件

```ts
// middleware/mid.ts
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('具名中间件，影响指定页面：' + to, from)
})
```

具名中间件使用，在需要用到的组件中

```js
definePageMeta({
  middleware: ['mid']
})
```

使用场景：用于可复用的路由监听逻辑

#### 3. 全局中间件用法

在根目录的`middleware`文件中，创建文件名为`任意名字.global.ts`。当有.global时，nuxt3自动实别为全局中间件

```ts
// middleware/mid.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('全局中间件，影响指定页面')
})
```

### 最佳实践

中间件可以获取目标路由 to 和来源路由 from，还有两个很常用的工具方法：

- abortNavigation(error)：跳过，留在 from；
- navigateTo(route)：指定跳转目标。

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.id === '1') {
    return abortNavigation()
  }
  return navigateTo('/')
})
```

## 服务端中间件使用

每当请求到达服务器时，会在处理其他路由之前先执行中间件。因此可以用服务端中间件做一些诸如：请求头检测、请求日志、扩展请求上下文对象等等任务。

### 服务端中间件使用

跟客户端一样，Nuxt 会自动读取 ~/server/middleware 中的文件作为服务端中间件，例如下面请求日志中间件：

```js
// /server/middleware/mid.ts
export default defineEventHandler((event) => {
  console.log('New request: ' + event.node.req.url)
})
```
`如果没有效果，别忘记重启服务`

中间件还可以执行审查、扩展上下文或抛出错误：
```ts
export default defineEventHandler((event) => {
  // 扩展上下文对象
  event.context.userInfo = { user: ‘cunzhang’ }
  // 审查请求信息
  const id = parseInt(event.context.params.id) as number
  if (!Number.isInteger(id)) {
    // 抛出错误
    return sendError(createError({
      statusCode: 400,
      statusMessage: 'ID should be an integer',
    }))
  }
})
```

#### 范例：保护指定服务端接口

下面我们完成一个接口保护的需求：用户如果未登录，不能调用 /api/detail/xxx。

首先实现一个 server 中间件，检查指定接口请求中是否包含 token，~/server/middleware/auth.ts：

```ts
import { H3Event } from "h3";

export default defineEventHandler((event) => {
  // 请求不被允许时返回响应错误
  const isAllowed = protectAuthRoute(event);
  if (!isAllowed) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthorized" })
    );
  }
});

function protectAuthRoute(event: H3Event) {
  const protectedRoutes = ["/api/detail"];
  // path 不以 protectedRoutes 中任何项为起始则允许请求
  if (
    !event?.path ||
    !protectedRoutes.some((route) => event.path?.startsWith(route))
  ) {
    return true;
  }
  return authCheck(event);
}

// 检查是否已认证
function authCheck(event: H3Event) {
  const token = getHeader(event, "token");
  if (!token) {
    return false;
  }
  return true;
}
```