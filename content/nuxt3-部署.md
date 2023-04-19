---
title: nuxt3-部署
---

# nuxt3-部署

## 项目打包方式

- SSR：nuxt build。代码会被打包到.output目录，打包产物分为 public 和 server 两部分。入口为 index.mjs，可以使用 node 或 pm2 等进程管理工具启动服务，也可以配合nuxt preview启动预览服务。
- SPA：ssr:false + nuxt generate。产物只有 .output/public 中的静态文件，发布 .output/public 即可。但是 SPA 需要在运行时访问接口获取数据，因此仍然需要提供接口服务才能正常显示页面。
- SSG：nuxt generate。产物只有 .output/public 中的静态文件，发布 .output/public 即可。这种方式会在创建时生成页面内容，因此只需要提供静态服务即可预览。
- 其他服务：presets，可用于其他非 node 运行时打包，例如 deno，serverless，edge worker 等。产物根据预设不同会有不同，部署需要按照对应的平台进行操作。

## ssr

#### 1. 打包`npm run build`

在根目录中，会生成`.output`文件夹

#### 2. 启动服务

```
node .output/server/index.mjs
```

#### 3. 进程管理

1. 安装 pm2：`npm i pm2 -g`

2. 在服务器新建ecosystem.config.js配置文件

文件内容如下：
```js
module.exports = {
  apps: [
    {
      name: 'nuxt3-blog',
      port: '8080',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
```

启动服务：`pm2 start ecosystem.config.js`