<template>
  <div id="index">
    <div class="goods">
      <div class="goods-item" v-for="(item, index) in goods">
        <router-link :to="{ path: '/detail/' + item.goods_id}">
          <goods :obj="item"></goods>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Goods from './Goods'

export default {
  name: 'index',
  components: {
    Goods
  },
  created () {
    this.$http.get('http://h6.duchengjiu.top/shop/api_goods.php')
    .then((response) => {
      this.goods = response.data.data
    })
  },
  data: function data () {
    return {
      goods: []
    }
  }
}
</script>
<style lang="css">
</style>
