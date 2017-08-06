<template lang="html">
  <div>
    <ul>
      <goods
        v-for="(item,index) in goodsList"
        :item="item"
        :key="index"
      ></goods>
    </ul>
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
      search_text: '',
      goodsList: []
    }
  },
  mounted () {
    this.search_text = this.$route.params.search_text
    this.searchGoods()
  },
  beforeRouteUpdate (to, from, next) {
    this.search_text = to.params.search_text
    this.searchGoods()
    next()
  },
  methods: {
    searchGoods () {
      this.$http.get(`http://h6.duchengjiu.top/shop/api_goods.php?search_text=${this.search_text}&pagesize=100`).then((response) => {
        this.goodsList = response.data.data
      })
    }
  }
}
</script>

<style lang="css">
</style>
