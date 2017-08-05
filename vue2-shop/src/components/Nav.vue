<template lang="html">
  <div  id="goodsList">
      <ul id="goodsListUl">
        <li v-for="obj in navList"><a href='List.html?cat_id='>{{obj.cat_name}}</a></li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: []
    }
  },
  created () {
    // 请求ajax获取数据
    this.$http.get('http://h6.duchengjiu.top/shop/api_cat.php').then((response) => {
      this.navList = response.data.data
    })
  }
}
</script>

<style lang="css">
</style>
