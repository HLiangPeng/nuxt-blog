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
