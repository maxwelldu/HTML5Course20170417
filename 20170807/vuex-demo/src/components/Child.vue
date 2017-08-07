<template lang="html">
  <div>
    child组件：
    {{sum}}
    <button @click="add" type="button" name="button">添加</button>

    <grand-son></grand-son>
  </div>
</template>

<script>
import GrandSon from './GrandSon'
export default {
  components: {
    GrandSon
  },
  computed: {
    sum () {
      return this.$store.state.sum
    }
  },
  methods: {
    add () {
      this.$store.dispatch('increment')
    }
  }
}
</script>

<style lang="css">
</style>
