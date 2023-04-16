// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 自动导入
  imports: {
    dirs: [
      // 扫描顶层目录中模块
      'composables',
      // 扫描内嵌一层深度的模块，指定特定文件名和后缀名
      // 'composables/*/index.{ts,js,mjs,mts}',
      // 扫描给定目录中所有模块
      // 'composables/**'
    ]
  },
  alias: {
    public: '/public'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    "@huntersofbook/naive-ui-nuxt"
  ]
})
