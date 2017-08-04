<template>
  <div id="detail">
    {{ $route.params.goods_id }}
    <div class="goods" v-if="goods">
      <img :src="goods.goods_thumb" :alt="goods.goods_name">
      <p>{{goods.goods_desc}}</p>
      <span>{{goods.goods_price}}</span>
      <button type="button" name="button">购买</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'detail',
  data() {
    return {
      goods: null,
    };
  },
  created() {
    const goodsId = this.$route.params.goods_id;
    this.$http.get(`http://h6.duchengjiu.top/shop/api_goods.php?goods_id=${goodsId}`)
    .then((response) => {
      const data = response.data;
      this.goods = data.data[0];
    });
  },
};
</script>
<style lang="css">
</style>
