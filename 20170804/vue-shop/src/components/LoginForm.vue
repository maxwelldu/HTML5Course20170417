<template lang="html">
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      errorText: ''
    }
  },
  computed: {
    userErrors () {
      let status = true
      let errorText = ''
      if (this.usernameModel.length > 0 && !/@/g.test(this.usernameModel)) {
        status = false
        errorText = '不包含@'
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      let status = true
      let errorText = ''
      if (this.passwordModel.length > 0 && !/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码不是1-6位'
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    onLogin () {
      this.errorText = ''
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '请检查用户名和密码'
        return
      }
      this.$http.get('http://localhost:3000/login')
      .then((response) => {
        this.$emit('has-login', response.data)
      })
    }
  }
}
</script>

<style lang="css">
</style>
