<template lang="html">
  <div class="goods">
    <div class="img">
      <img :src="obj.goods_thumb" alt="">
      <div class="desc"><i>{{obj.price}}</i><span>{{obj.goods_name}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  props: {
    obj: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="css" scoped>
.goods {
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid green;
  width: 200px;
  height: 300px;
}
</style>
