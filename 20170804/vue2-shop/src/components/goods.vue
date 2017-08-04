<template lang="html">
  <div>
    <img :src="obj.goods_thumb"/>
    <span><a href="">{{obj.goods_desc}}</a></span>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: {
        goods_thumb: '',
        goods_desc: '',
      },
    },
  },
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none;
}
</style>
