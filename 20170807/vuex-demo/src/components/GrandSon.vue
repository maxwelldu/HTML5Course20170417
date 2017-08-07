<template lang="html">
  <div>
    {{sum}}
    <button @click="add" type="button" name="button">+</button>
  </div>
</template>

<script>
export default {
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
