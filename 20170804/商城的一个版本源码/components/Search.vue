<template>
  <div id="search">
    <div class="goods">
      <div class="goods-item" v-for="(item, index) in goods">
        <router-link :to="{ path: '/detail/' + item.goods_id }">
          <img :src="item.goods_thumb"/>
          <p>{{item.goods_name}}</p>
        </router-link>
      </div>
      <div v-if="!goods.length">
        商品为空
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'search',
  data() {
    return {
      goods: [],
    };
  },
  mounted() {
    const searchText = this.$route.params.search_text;
    this.searchGoods(searchText);
  },
  methods: {
    searchGoods(searchText) {
      this.$http.get(`http://h6.duchengjiu.top/shop/api_goods.php?search_text=${searchText}`)
      .then((response) => {
        const data = response.data;
        this.goods = data.data;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    const searchText = to.params.search_text;
    this.searchGoods(searchText);
    next();
  },
};
</script>
<style>
</style>
