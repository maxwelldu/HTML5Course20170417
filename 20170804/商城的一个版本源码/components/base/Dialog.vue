<template lang="html">
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover" v-if="show" @click="close"></div>
      <transition name="drop">
        <div class="dialog-content" v-if="show">
          <p class="dialog-close" @click="close">x</p>
          <slot>empty</slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('on-close');
    },
  },
};
</script>

<style lang="css" scoped>
  .drop-enter-active {
    transition: all .5s ease;
  }
  .drop-leave-active {
    transition:all .3s ease;
  }
  .drop-enter {
    transform: translateY(-500px);
  }
  .drop-leave-active {
    transform: translateY(-500px);
  }
  /*向下掉的动画样式结束*/
  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .dialog-content {
    position: fixed;
    top: 20%;
    left: 50%;
    width: 50%;
    max-height: 50%;
    margin-left: -25%;
    padding: 2%;
    overflow: auto;
    background: #fff;
    z-index: 10;
    border: 2px solid #464068;
    line-height: 1.6;
  }
  .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }
  .dialog-close:hover {
    color: #4fc08d;
  }
</style>
