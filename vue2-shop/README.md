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
ES6 vue-cli Element vue-router axios vue-axios vuex jade stylus
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

  将所有的ajax请求都放到actions里面，返回的所有数据都存放到state
  使用Element的组件
  购物车页面


##Vuex
###使用Vue
- cnpm i -S vuex
- 项目根目录新建一个store目录，里面放置一个index.js
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
}
const mutations = {
  login (state) {
    state.user = {
      avatar
    }
  }
}
const actions = {
  login ({ commit }) {
    commit('login')
  }
}
const getters = {
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
```
- 在main.js中
```
import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: { Layout }
})
```

VueComponent  dispatch Action
Action commit mutation
mutation change state
state computed VueComponent
