<template lang="html">
  <div class="carousel">
      <ul class="carouselUl">
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="{'active': index === idx}"
            v-show="index === idx"
          ><a href="#"><img :src="item.img" :alt="item.title"></a></li>
      </ul>
      <ul class="circle">
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="{'circleLi': index === idx}"
            @mouseover="show(index)"
            ></li>
      </ul>
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
    show (index) {
      this.idx = index
    },
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
  .carousel{
    width:100%;
    height: 340px;
    background:coral;
  }
  .carousel{
    width: 750px;
    height: 340px;
    float: left;
    overflow: hidden;
    position: relative;
  }
  .carouselUl {
    width: 5000px;
    height: 340px;
    position: absolute;
    top:0;
    left:0;
    z-index: 1;
  }
  .carouselUl>li {
    float:left;
  }
  .circle{
    width:60px;
    height: 20px;
    position: absolute;
    left: 0;
    right:0;
    margin: 0 auto;
    bottom: 10px;
    z-index: 3;
  }
  .circle>li{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255,50,0,0.3);
    float: left;
    margin: 0 5px;
  }
  .circle>li.circleLi{
    background: rgba(255,50,0,1);
  }
</style>
