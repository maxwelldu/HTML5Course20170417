<template lang="html">
  <div>
    <app-dialog @close="close">
      <p>注册账户：<input v-model="username" type="text" placeholder="请输入账户" id="username"></p>
      {{usernameError}}
      <p>密码：<input v-model="password" type="password" placeholder="请输入密码" name="" id="password"></p>
      {{passwordError}}
      <p>确认密码：<input v-model="repassword" type="password" name=""></p>
      {{repasswordError}}
      <button @click="register" :disabled="disable" id="enter">点击注册</button>
    </app-dialog>
  </div>
</template>

<script>
import AppDialog from './base/Dialog'
export default {
  data () {
    return {
      username: '',
      password: '',
      repassword: ''
    }
  },
  computed: {
    disable () {
      if (this.username.length === 0 || this.password.length < 6 || this.password !== this.repassword) {
        return true
      } else {
        return false
      }
    },
    usernameError () {
      if (this.username.length === 0) {
        return '用户名不能为空'
      } else {
        return ''
      }
    },
    passwordError () {
      return this.password.length < 6 ? '密码至少6位' : ''
    },
    repasswordError () {
      if (this.repassword.length !== 0) {
        return this.password === this.repassword ? '' : '两次密码不一致'
      }
      return ''
    }
  },
  components: {
    AppDialog
  },
  methods: {
    close () {
      this.$emit('close')
    },
    register () {
      // 如果注册成功，则自动请求一次登录的API，自动登录
      this.$http.post('http://h6.duchengjiu.top/shop/api_user.php', `username=${this.username}&password=${this.password}&status=register`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.$http.post('http://h6.duchengjiu.top/shop/api_user.php', `username=${this.username}&password=${this.password}&status=login`, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              for (let k in response.data.data) {
                console.log(k)
                localStorage.setItem(k, response.data.data[k])
                this.close()
                // 调用vuex里面的login action
                console.log(this.$store, this.$store.actions)
                this.$store.dispatch('login')
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
