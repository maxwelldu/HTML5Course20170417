<template>
  <div id="app">
    <ul>
      <li v-for="(item, index) in navList">
        <a href="">{{item.cat_name}}</a>
      </li>
    </ul>
    <goods
      v-for="item in goodsList"
    :obj="item"></goods>
  </div>
</template>

<script>
import goods from './components/goods';

export default {
  name: 'app',
  components: {
    goods,
  },
  data() {
    return {
      navList: [],
      goodsList: [],
    };
  },
  created() {
    this.$http.get('http://h6.duchengjiu.top/shop/api_cat.php').then((response) => {
      this.navList = response.data.data;
    });

    this.$http.get('http://h6.duchengjiu.top/shop/api_goods.php').then((response) => {
      this.goodsList = response.data.data;
    });
  },
};
</script>

<style>
</style>
