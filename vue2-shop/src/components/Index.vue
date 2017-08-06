<template lang="html">
    <div>
      <div class="carouselContainer">
          <div class="sans">
              <small-carousel :list="smallCarouselList"></small-carousel>
              <big-carousel :list="bigCarouselList"></big-carousel>
              <div id="userLog">
                  <div class="headerPortrait"><img src="../assets/header/head.png" alt=""></div>
                  <a href="login.html">会员登录</a><a @click="showRegister=true">用户注册</a>
                  <div class="sign-in">
                      <img src="../assets/header/signIn1.png" alt="">
                      <img src="../assets/header/signIn.png" alt="">
                  </div>
              </div>
          </div>
      </div>
      <div class="standard">
          <a href="#"></a>
          <div class="standard-img"><h1>热门商品</h1></div>
      </div>
      <div class="goods" id="goods">
        <ul>
          <goods
            v-for="(item,index) in goodsList"
            :key="index"
          :item="item"
          ></goods>
        </ul>
      </div>
      <div id="sideber">
          <a href="cart.html">购物车</a>
          <div class="cartBut">
              <span id="clickCart"><img src="../assets/header/shopping211.png" alt=""></span>
              <span id="clickTop"><img src="../assets/header/br_up.png" alt=""></span>
          </div>
          <div id="enterCart" class="enterCart">
              <h1>总计:000000</h1><a href="cart.html">购物车结算</a>
          </div>
          <div class="sideberGoods" id="sideberGoods">
              <ul>

              </ul>
          </div>
      </div>

      <!-- <app-dialog @closeRegister="closeRegisterDialog" v-show="showRegister"><p>登录账户：<input type="text" placeholder="请输入账户" id="username"></p><p>登录密码：<input type="password" placeholder="请输入密码" name="" id="password"></p><button id="enter">登录</button></app-dialog> -->

      <register-dialog @close="closeRegisterDialog" v-show="showRegister"></register-dialog>
    </div>
</template>

<script>
import SmallCarousel from './base/SmallCarousel'
import BigCarousel from './base/BigCarousel'
import Goods from './base/Goods'
import AppDialog from './base/Dialog'
import RegisterDialog from './RegisterDialog'

export default {
  data () {
    return {
      smallCarouselList: [
        {url: 'http://www.baidu.com', title: '百度', img: 'http://60.205.209.241/yitao/image/header/hot2.jpg'},
        {url: 'http://www.baidu.com', title: '百度', img: 'http://60.205.209.241/yitao/image/header/hot1.jpg'}
      ],
      bigCarouselList: [
        {url: 'http://www.baidu.com', title: '百度', img: 'http://60.205.209.241/yitao/image/header/TB1BunHRVXXXXagaXXXXXXXXXXX-750-340.jpg'},
        {url: 'http://www.baidu.com', title: '百度', img: 'http://60.205.209.241/yitao/image/header/TB1jT3mRVXXXXXnXXXXXXXXXXXX-750-340.jpg'}
      ],
      goodsList: [],
      page: 1,
      pageSize: 10,
      lock: false,
      isEnd: false,
      showRegister: false
    }
  },
  created () {
    this.getGoods()
  },
  mounted () {
    window.onscroll = () => {
      if ((this.getScrollTop() + this.getWindowHeight()) / this.getScrollHeight() >= 0.9) {
        this.getGoods()
      }
    }
  },
  methods: {
    closeRegisterDialog () {
      this.showRegister = false
    },
    getGoods () {
      if (this.lock === true || this.isEnd === true) {
        return
      }
      this.lock = true
      this.$http.get(`http://h6.duchengjiu.top/shop/api_goods.php?page=${this.page}&pagesize=${this.pageSize}`).then((response) => {
        this.lock = false
        this.isEnd = response.data.data.length === 0
        this.page = parseInt(this.page) + 1
        response.data.data.forEach(v => {
          this.goodsList.push(v)
        })
      })
    },
    getScrollTop () {
      let scrollTop = 0
      let bodyScrollTop = 0
      let documentScrollTop = 0
      if (document.body) {
        bodyScrollTop = document.body.scrollTop
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
      return scrollTop
    },
    // 文档的总高度
    getScrollHeight () {
      let scrollHeight = 0
      let bodyScrollHeight = 0
      let documentScrollHeight = 0
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight
      }
      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
      return scrollHeight
    },
    // 浏览器视口的高度
    getWindowHeight () {
      var windowHeight = 0
      if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight
      } else {
        windowHeight = document.body.clientHeight
      }
      return windowHeight
    }
  },
  components: {
    SmallCarousel,
    BigCarousel,
    Goods,
    AppDialog,
    RegisterDialog
  }
}
</script>

<style lang="css" scoped>
.goods ul{
    height: 860px;
}

.carouselContainer{
    width:100%;
    background-color:rgb(158, 211, 193);
    height: 340px;
}
.sans{
    width: 1150px;
    margin:0 auto;
}


#userLog{
    width:200px;
    height: 340px;
    float:left;
    background: #ffffff;
}
.headerPortrait{
    margin: 10px 0;
}
#userLog{
    text-align: center;
}
#userLog a{
    display: inline-block;
    width: 80px;
    height: 30px;
    color:black;
    border:1px solid #fb3434;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    background:#ffffff;
    margin:10px 5px;
}
#userLog a:hover{
    background:#fb3434;
    color: #ffffff;
}
.sign-in{
    width: 200px;
    text-align: center;
    margin-top: 20px;
}
.sign-in img{
    width: 150px;
}
.sign-in img+img{
    width: 120px;
    margin-top: 10px;
}
</style>
