export default defineNuxtRouteMiddleware((to, from) => {
  console.log('具名中间件，影响指定页面：' + to, from)
})
