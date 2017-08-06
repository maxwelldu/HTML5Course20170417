# shop

> 这是一个使用Vue开发的商城项目

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#项目整体规划
在一个已经使用ajax技术实现的网站的基础之上，修改为一个vue的项目
动态网站的线上地址：http://60.205.209.241/yitao/index.html

##技术选型
vue-cli vue-router axios
##开发环境
  atom + git bash + webpack + npm + yarn
##前期准备
- 静态的商城网站
- API文档，API的postman测试用例
##组件规划
###页面级
  - 首页
  - 列表页
  - 详情页  
  - 注册弹窗
  - 购物车页
  - 结算页
  - 搜索页
  - 登录弹窗
###布局组件
  Layout
  头部组件
  底部组件
###业务组件
  - 商品组件
  - 轮播图
###TODO
  - 分类页面无法滚动
##开发进度
  首页布局组件完成
  头部完成
  底部完成
  路由完成
  商品组件完成
  列表页: 正常情况显示内容，无内容时，错误的页面请求
  详情页
  搜索页面,TODO：分页功能
  注册组件+验证
  登录组件+验证
