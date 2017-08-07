###使用Vue
- 运行之前先打开 localhost:8080, 如果没有显示服务找不到，说明你之前已经启动了一个vue的项目；如果你在命令行中按ctrl+z, 这个服务就会在后台运行，你需要手动的到任务管理器中的进程，找到node.exe的进程杀掉，再执行
- 如果你项目当中一直使用的是npm，则不要使用cnpm; 反之你一直在用cnpm, 则不要用npm
- 如果发现node_modules里面有很多下划线开头的这种文件夹，则表示是使用的cnpm
- 打开对应的编辑器，配置一下tab大小为2个空格，不会的话百度搜索一下，比如sublime tabsize调整
- 一次缩进是两个空格，不要tab和space混用
- 配置cnpm别名
```
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"
```
- cnpm config set loglevel http // 配置日志将网络请求也打印出来
- cnpm i -g vue-cli   // 如果已经安装过则不需要再安装
- vue init webpack vuex-demo
  7个回车，两个n, 按一下ctrl+c
- cd vuex-demo
- cnpm i
- cnpm i -S vuex
- 项目根目录src下面新建一个store目录，里面放置一个index.js
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
