<template>
  <div class="hello">
    <h1>{{ counter }}</h1>
    <button @click="add" type="button" name="button">+</button>

    <h1>{{sum}}</h1>
    <button @click="increment" type="button" name="button">+</button>

    <child></child>
  </div>
</template>

<script>
import Child from './Child'
export default {
  name: 'hello',
  components: {
    Child
  },
  data () {
    return {
      counter: 0
    }
  },
  computed: {
    sum () {
      return this.$store.state.sum
    }
  },
  methods: {
    add () {
      this.counter++
    },
    increment () {
      this.$store.dispatch('increment')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
