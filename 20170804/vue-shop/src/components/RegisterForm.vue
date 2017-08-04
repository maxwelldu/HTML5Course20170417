<template lang="html">
  <div class="register-form">
    <div class="g-form">
      <div class="g-form-line success">
        {{success}}
      </div>
      <div class="g-form-line error">
        {{error}}
      </div>
      <div class="g-form-line">
        <span class="g-form-label">用户名:</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入用户名">
        </div>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码:</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码">
        </div>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onRegister">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      success: '',
      error: ''
    }
  },
  methods: {
    onRegister () {
      const url = 'http://h6.duchengjiu.top/shop/api_user.php'
      const data = `status=register&username=${this.usernameModel}&password=${this.passwordModel}`
      const header = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      this.$http.post(url, data, header)
      .then((response) => {
        if (response.data.code === 0) {
          this.success = '注册成功, 请登录'
          this.error = ''
          setTimeout(() => {
            this.$emit('register-success', response.data)
          }, 3000)
        } else {
          this.error = response.data.message
          this.success = ''
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
