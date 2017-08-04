<template>
  <div id="app">
    <!-- 头部 -->
    <div id="app-headr" class="app-head">
      <div class="app-head-inner">
        <!-- 导航栏 -->
        <div class="head-nav">
          <ul>
            <li v-for="(item, index) in navList">
              <router-link :to="{path: '/list/' + item.cat_id }">
              {{ item.cat_name }}
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 头部登录注册 -->
        <div class="head-menu">
          <router-link :to="{ path: '/'}">首页</router-link>
          <a @click="register">注册</a>
          <a @click="login">登录</a>
        </div>
        <div class="head-search">
          <input type="text" v-model="search_text" @keyup.13="search" placeholder="请输入搜索的商品名称">
          <button type="button" name="button" @click="search">搜索</button>
          <div class="search-goods">
            <div class="goods-item" v-for="(item, index) in goods">
              <router-link :to="{ path: '/detail/' + item.goods_id}">
                <img :src="item.goods_thumb"/>
                <p>{{item.goods_name}}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <div class="app-foot">
      © 2013-2015 北京良仓文化传播有限公司版权所有 京ICP备13010677号-1 京公网安备11010502025627
    </div>

    <m-dialog :show="showLogin" @on-close="closeDialog('showLogin')">
      <login-form></login-form>
    </m-dialog>
    <m-dialog :show="showRegister" @on-close="closeDialog('showRegister')">
      <register-form @register-success="registerSuccess"></register-form>
    </m-dialog>
  </div>
</template>

<script>
import Dialog from './components/base/Dialog'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'

export default {
  name: 'app',
  components: {
    MDialog: Dialog,
    RegisterForm,
    LoginForm
  },
  created () {
    this.$http.get('http://lc.shudong.wang/api_cat.php')
    .then((response) => {
      const data = response.data
      this.navList = data.data
    })
  },
  data () {
    return {
      search_text: '',
      navList: [],
      goods: [],
      showLogin: false,
      showRegister: false
    }
  },
  methods: {
    register () {
      this.showRegister = true
    },
    login () {
      this.showLogin = true
    },
    closeDialog (attr) {
      this[attr] = false
    },
    registerSuccess () {
      this.closeDialog('showRegister')
      this.login()
    },
    search () {
      this.$router.push({ path: `/search/${this.search_text}` })
      /*
      this.$http.get(`http://lc.shudong.wang/api_goods.php?search_text=${this.search_text}`)
      .then((response) => {
        const data = response.data
        this.goods = data.data
      })
      */
    }
  }
}
</script>

<style>
/*reset.css*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/*Global Style*/
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
/*Global Style*/

/*Layout style S*/
.app-head {
  background: #363636;
  color: #b2b2b2;
  line-height: 90px;
  width: 100%;
}
.app-head .app-head-inner {
  width: 1200px;
  margin: 0 auto;
}
.app-head .app-head-inner img{
  width: 50px;
  margin-top: 20px;
}
.app-head .app-head-inner .head-nav{
  float: left;
  width: 500px;
}
.app-head .app-head-inner .head-nav ul{
  overflow: hidden;
}
.app-head .app-head-inner .head-nav ul li{
  cursor: pointer;
  float: left;
  padding: 0 10px;
}
.app-head .app-head-inner .head-menu {
  float: right;
}
.app-head .app-head-inner .head-menu a {
  padding: 0 10px;
}
.container{
  width: 1200px;
  margin: 0 auto;
}
.app-foot {
  width: 100%;
  height: 80px;
  line-height: 80px;
  margin-top: 30px;
  clear: both;
  background: #e3e4e8;
  text-align: center;
}
/*Layout style E*/

/*common style S*/
.hr {
  height: 1px;
  width: 100%;
  background: #ddd;
}
.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
.button:hover {
  background: #4fc08d;
}
/*common style E*/
.g-form {

}
.g-form-line {
  padding: 15px 0;
}
.success {
  color: green;
}
.error {
  color: red;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn {
  padding-left: 100px;
}
.g-form-error {
  color: red;
  padding-left: 15px;
}
/*form style E*/

/*layout style*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.goods {
  overflow: hidden;
}
.goods-item {
  float: left;
  width: 250px;
  margin-right: 10px;
}
.goods-item img {
  width: 100%;
}
</style>
