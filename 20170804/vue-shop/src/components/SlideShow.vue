<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="nowHref">
        <transition name="slide-trans">
          <img v-show="isShow" :src="nowSrc" :alt="nowTitle">
        </transition>
        <transition name="slide-trans-old">
          <img :src="nowSrc" :alt="nowTitle">
        </transition>
      </a>
    </div> <!-- 显示图片 -->
    <h2>{{ nowTitle }}</h2> <!-- 显示文字 -->
    <ul class="slide-pages"> <!-- 显示页码 -->
      <li @click="goto(prevIndex)">&lt</li>
      <li v-for="(item,index) in slideList" @click="goto(index)">
        <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <li @click="goto(nextIndex)">&gt</li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    slideList: {
      type: Array,
      default: []
    },
    invTime: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      nowIndex: 0, // 当前的索引值信号量
      isShow: true,
      invId: 0 // 定时器的ID
    }
  },
  computed: {
    prevIndex () {
      return this.nowIndex === 0 ? this.slideList.length - 1 : this.nowIndex - 1
    },
    nextIndex () {
      return this.nowIndex === this.slideList.length - 1 ? 0 : this.nowIndex + 1
    },
    nowHref () {
      return this.slideList.length > 0 ? this.slideList[this.nowIndex].href : '#'
    },
    nowSrc () {
      return this.slideList.length > 0 ? this.slideList[this.nowIndex].src : '#'
    },
    nowTitle () {
      return this.slideList.length > 0 ? this.slideList[this.nowIndex].title : ''
    }
  },
  methods: {
    runInv () { // 定时执行切换幻灯片
      this.invId = setInterval( () => {
        this.goto(this.nextIndex)
      }, this.invTime)
    },
    clearInv () {
      clearInterval(this.invId)
    },
    goto (index) { // 切换幻灯片的效果
      console.log(index)
      this.isShow = false
      setTimeout( () => {
        this.isShow = true
        this.nowIndex = index
      }, 10)
    }
  },
  mounted () {
    this.runInv ()
  }
}
</script>

<style media="screen" scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
/*定义动画样式*/
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 30px;
  line-height: 30px;
  bottom: 0;
  padding-left: 15px;
  text-align: left;
  color: #fff;
  background: #000;
  opacity: .5;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
/*幻灯片样式结束*/
</style>
