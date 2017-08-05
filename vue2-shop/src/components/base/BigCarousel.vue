<template lang="html">
  <div class="carousel" id="carousel" >
      <ul id="carouselUl">
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="{'active': index === idx}"
            v-show="index === idx"
          ><a href="#"><img :src="item.img" :alt="item.title"></a></li>
      </ul>
      <ul id="circle">
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

<style lang="css">
</style>
