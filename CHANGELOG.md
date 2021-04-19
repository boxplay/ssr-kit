## v1.0.4

1. 增加全局动态挂载 js 功能
2. 修复服务端判断是否 h5 的精准度问题
3. 修复 check 未找到情况，全局添加状态码

## v1.0.3

1. .babelrc 文件更换成.js 文件，动态判断环境用
2. 去除 eslint 新版本不支持参数 import/no-cycle

## v1.0.2

1. 添加统一编译@kkb 系列包
2. node 层静态资源走 handle 方法
3. 添加@next/bundle-analyzer 打包分析工具
4. 修复 layout 组件初始样式不生效

## v1.0.1

1. 升级 next 到 10 版本，全面支持 react17 版本。
2. 重构 request 请求（safeRequest 方法），让请求层更在独立性灵活性，基于业务层判断请求逻辑全在 services 层中处理
3. 增加 node 层静态目录功能（koa-static），默认指向 public 目录
4. 升级 http-proxy-middleware 插件，语法替换成 createProxyMiddleware
5. 替换 koa-router 插件，升级成最新版本@koa/router，并且语法有所变动，全局匹配使用'(.\*)'
6. 调整优化部份 demo 页面案例
7. 添加 官方组件 images 使用案例，内置图像 domains 配置（img.kaikeba.com）
