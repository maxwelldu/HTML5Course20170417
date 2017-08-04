<template>
  <div id="goods-list">
    商品列表页
    {{ $route.params.cat_id }}

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
    <div class="page">
      <span @click="prev">上一页</span>
      <span @click="next">下一页</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goods-list',
  created() {
  },
  data: function data() {
    return {
      goods: [],
      pagesize: 8,
      page: 1,
      catId: 0,
    };
  },
  methods: {
    showGoodsList() {
      const catId = this.catId;
      this.$http.get(`http://h6.duchengjiu.top/shop/api_goods.php?cat_id=${catId}&pagesize=${this.pagesize}&page=${this.page}`)
      .then((response) => {
        const data = response.data;
        this.goods = data.data;
      });
    },
    prev() {
      this.page = this.page - 1;
      if (this.page < 1) {
        this.page = 1;
      }
      this.showGoodsList();
    },
    next() {
      this.page = this.page + 1;
      this.showGoodsList();
    },
  },
  mounted() {
    this.catId = this.$route.params.cat_id;
    this.showGoodsList();
  },
  beforeRouteUpdate(to, from, next) {
    this.catId = to.params.cat_id;
    this.showGoodsList();
    next();
  },
};
</script>
<style lang="css">
.page {
  overflow: hidden;
  margin-top: 10px;
  padding: 10px 10px;
}
</style>
