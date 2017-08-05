<template lang="html">
  <div id="goodsHot">
    <span @click="showPrev" class="leftSpan" id="leftSpan"><img src="../../assets/section/left.png" alt=""></span>
    <transition-group tag='ul' id="goodsHotUl" name="move">
          <li
          v-for="(item, index) in list"
          :key="index"
          :class="{'active': index === idx}"
          v-show="index === idx"
          ><a :href="item.url"><img :src="item.img" :alt="item.title"></a></li>
    </transition-group>
    <span @click="showNext" class="rightSpan" id="rightSpan"><img src="../../assets/section/right.png" alt=""></span>
</div>
</template>

<script>
export default {
  props: {
    // 轮播数组，里面包括链接地址、图片和标题
    list: {
      type: Array,
      default: []
    }
  },
  mounted () {
    setInterval(this.showNext, 2000)
  },
  data () {
    // 当前的轮播图显示的索引
    return {
      idx: 0
    }
  },
  methods: {
    showNext () {
      this.idx++
      if (this.idx >= this.list.length) {
        this.idx = 0
      }
    },
    showPrev () {
      this.idx--
      if (this.idx < 0) {
        this.idx = this.list.length - 1
      }
    }
  }
}
</script>

<style lang="css" scoped>
#goodsHot{
    width:200px;
    height: 340px;
    float:left;
    position: relative;
    overflow: hidden;
}
#goodsHot>span{
    width: 30px;
    height: 20px;
    position: absolute;
    top:0;
    bottom:0;
    margin:auto 0;
    z-index: 3;
    background:rgba(0,0,0,0.1);
    padding: 5px;
    cursor: pointer;
    display: none;
}
#goodsHot:hover span{
    display: block;
}
.leftSpan{
    left:0;
}
.rightSpan{
    right:0;
}
#goodsHot>span>img{
    width: 30px;
    height:20px;
}
#goodsHotUl{
    position: absolute;
    width: 1000px;

    top:0;
    left:0;
}
#goodsHotUl>li{
    float:left;
    width: 200px;
    height: 340px;
}
#goodsHotUl>li>a>img{
    width: 200px;
    height: 340px;
}

.move-enter-active, .move-leave-active {
  transition: opacity .5s
}
.move-enter, .move-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
