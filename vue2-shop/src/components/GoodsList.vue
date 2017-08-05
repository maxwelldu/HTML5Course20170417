<template lang="html">
  <div>
    <div class="standard-img" id="standard-img"><h1>分类商品</h1></div>
    <div class="goods" id="goods">
      <ul>
        <goods
          v-for="(item,index) in goodsList"
          :key="index"
          :item="item">
        </goods>
      </ul>
    </div>
  </div>
</template>

<script>
  import Goods from './base/Goods'
  export default {
    components: {
      Goods
    },
    data () {
      return {
        goodsList: [],
        cat_id: 0,
        page: 1,
        pageSize: 10,
        lock: false,
        isEnd: []
      }
    },
    mounted () {
      window.onscroll = () => {
        if ((this.getScrollTop() + this.getWindowHeight()) / this.getScrollHeight() >= 0.9) {
          this.getGoods()
        }
      }

      // 清空当前页面的所有商品列表
      this.goodsList = []
      this.page = 1
      this.cat_id = this.$route.params.cat_id
      this.getGoods()
    },
    methods: {
      getGoods () {
        if (this.lock === true || this.isEnd[this.cat_id] === true) {
          return
        }
        this.lock = true
        this.$http.get(`http://h6.duchengjiu.top/shop/api_goods.php?cat_id=${this.cat_id}&page=${this.page}&pagesize=${this.pageSize}`).then((response) => {
          this.lock = false
          this.isEnd[this.cat_id] = response.data.data.length === 0
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
    beforeRouteUpdate (to, from, next) {
      this.goodsList = []
      this.page = 1
      this.cat_id = to.params.cat_id
      // 设置每个分类的是否结束
      this.isEnd[to.params.cat_id] = false
      this.getGoods()
      next()
    }
  }
</script>

<style lang="css" scoped>

</style>
