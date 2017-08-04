<template>
  <div class="hello">
    <h1 @click="change">Hello {{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    change () {
      this.msg = '你点我干嘛，我还没看懂'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal
  color: red
}

ul {
  list-style-type: none
  padding: 0
}

li {
  display: inline-block
  margin: 0 10px
}

a {
  color: #42b983
}
</style>
