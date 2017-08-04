<template>
  <div id="index">
    <div class="goods">
      <div class="goods-item" v-for="(item, index) in goods">
        <router-link :to="{ path: '/detail/' + item.goods_id}">
          <img :src="item.goods_thumb"/>
          <p>{{item.goods_name}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  created() {
    this.$http.get('http://h6.duchengjiu.top/shop/api_goods.php')
    .then((response) => {
      const data = response.data;
      this.goods = data.data;
    });
  },
  data: function data() {
    return {
      goods: [],
    };
  },
};
</script>
<style lang="css">
</style>
