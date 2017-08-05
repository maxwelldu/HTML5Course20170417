<template lang="html">
  <div>
    <div class="standard-img" id="standard-img"><h1>商品详情</h1></div>
    <div class="goods" id="goods">
      <div id="goodsDetails" class="goodsDetails">
        <div id="ImgContainer">
          <img :src="item.goods_thumb" :alt="item.goods_desc" :title="item.goods_desc">
          <div class="detailsShade" id="deailsShade"></div>
          <div class="detailBigImg" id="deailBigImg">
            <img src="">
          </div>
        </div>
        <h1>{{item.goods_name}}</h1>
        <b>￥{{item.price}} </b>
        <p></p>
        <div id="goodsNumber" class="goodsNumber">
          <button class="numLeft" id="numLeft">-</button><input type="tel" class="goodsNmu" id="goodsNmu" min="1" max="10" value="1"><button class="numRight" id="numRight">+</button>
        </div>
        <br><a href="#">立即购买</a><a id="purchase">加入购物车</a>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: {}
    }
  },
  mounted () {
    this.$http.get(`http://h6.duchengjiu.top/shop/api_goods.php?goods_id=${this.$route.params.goods_id}`).then((response) => {
      this.item = response.data.data[0]
    })
  }
}
</script>

<style lang="css" scoped>
.goodsDetails{
    width:100%;
    border-top:2px solid #ff4411;
    border-bottom:2px solid #ff4411;
    overflow: hidden;
    font-size: 25px;
    padding: 50px 0 50px 0;
    margin-bottom: 20px;
}
#purchase{
    cursor: pointer;
}
.goodsDetails h1{
    width: 640px;
    font-size: 25px;
    padding: 50px;
    float:left;
}
.goodsDetails b{
    color:red;
    float:left;
}
.goodsDetails p{
    width: 640px;
    padding: 30px;
    text-indent: 2em;
    float:left;
}
.goodsNumber{
    width: 600px;
    float:left;
    padding-left: 30px;
}
.goodsNmu{
    width: 50px;
    height: 50px;
    text-align: center;
}
.numLeft, .numRight{
    width: 54px;
    height: 54px;
}
.goodsDetails a{
    float:left;
    width: 150px;
    height: 50px;
    background:#fb3434;
    color: #ffffff;
    text-align: center;
    line-height: 50px;
    margin: 30px 30px;
}
#ImgContainer{
    width: 433px;
    height: 433px;
    float:left;
    border:1px solid #ff4411;
    margin: 10px;
    position: relative;
}
#ImgContainer>img{
    width: 433px;
    height: 433px;
}
.detailsShade{
    width: 200px;
    height: 200px;
    background:rgba(0,255,0,0.5);
    position: absolute;
    top:0;
    left:0;
    display: none;
}
.detailBigImg{
    width:500px;
    height: 500px;
    border: 1px solid #757373;
    position: absolute;
    top:0;
    left: 450px;
    overflow: hidden;
    display: none;
    position: relative;
}
.detailBigImg>img{
    width: 800px;
    height: 800px;
    position: absolute;
    top:0;
    left:0;
}
</style>
