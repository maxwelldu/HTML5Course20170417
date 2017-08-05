<template lang="html">
  <li><i :class="{'Hot': item.is_hot == 1}"></i><img :src="item.goods_thumb" :alt="item.goods_desc" :title="item.goods_desc"><h1>{{item.goods_name}}</h1><span>￥:{{item.price}}</span><p>{{item.goods_desc}}</p><router-link :to="'/detail/'+item.goods_id"></router-link></li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="css" scoped>
li {
    width: 200px;
    height: 398px;
    float:left;
    position: relative;
    background: #ffffff;
    border: 2px solid transparent;
    border-top:2px solid #ff4411;
    margin: 15px 18px;
    transition: 1s;
    overflow: hidden;
}
li:hover{
    border: 2px solid #ff4411;
}
li:hover h1{
    top:0;
}
li img{
    width: 200px;
    height:200px;
}
li h1{
    width:100%;
    line-height: 30px;
    position: absolute;
    top: -30px;
    color:#ffffff;
    text-align: center;
    background:rgba(251,52,52,0.8);
    transition: 0.5s;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
li span{
    display: block;
    width: 100px;
    padding: 10px;
    color: #ffffff;
    background:#ff4411;
    font-size: 20px;
    font-weight: bold;
}
li p{
    padding:20px 5px;
    text-indent: 2em;
    line-height: 30px;
}
li a{
    position: absolute;
    top:0;
    display: block;
    width:100%;
    height:100%;
    z-index: 2;
}
</style>
