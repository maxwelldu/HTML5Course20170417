<template lang="html">
  <header>
      <nav>
          <div class="header-nav">
              <router-link to="/">欢迎来到一淘网，阿里巴巴旗下生活省钱利器！</router-link>
              <ul>
                  <li id="line" v-if="!username || username.length <= 0">
                      <a href="#" id="login" class="login">亲！请登录</a>
                      <a @click="showRegister = true" id="register" class="register">或注册</a>
                  </li>
                  <li id="line" v-if="username && username.length > 0">
                      <a href="#" id="login" class="login">{{username}}</a>
                      <a @click="logout" href="#">退出</a>
                  </li>
                  <li><a href="OMS.html">我的订单</a></li>
                  <li><a href="cart.html" id="cart">购物车</a></li>
                  <li><a href="#">消息</a></li>
                  <li><a href="#">我的积分</a></li>
              </ul>
          </div>
      </nav>
      <div class="header-top">
          <div class="logo">
              <router-link to="/">
                  <img src="../assets/header/logo.png" alt="" class="logo">
              </router-link>
          </div>
          <div class="container">
              <input @keyup.enter="navigateToSearch" v-model="search_text" type="text" id="search" class="search">
              <button @click="navigateToSearch" id="searchBut" class="searchBut">
                  <img src="../assets/header/search.png" alt=""></button>
          </div>
          <div class="download">
              <div class="qr-dow">
                  <img src="../assets/header/qr.png" alt="">
              </div>
          </div>
      </div>

      <register-dialog @close="closeRegisterDialog" v-show="showRegister"></register-dialog>
  </header>
</template>

<script>
import RegisterDialog from './RegisterDialog'
export default {
  data () {
    return {
      search_text: '',
      showRegister: false
    }
  },
  computed: {
    username () {
      return this.$store.state.user.username
    }
  },
  methods: {
    navigateToSearch () {
      this.$router.push({name: 'Search', params: {search_text: this.search_text}})
    },
    closeRegisterDialog () {
      this.showRegister = false
    },
    logout () {
      this.$store.dispatch('logout')
    }
  },
  components: {
    RegisterDialog
  }
}
</script>

<style lang="css" scoped>
</style>
