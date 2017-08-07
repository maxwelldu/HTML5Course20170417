<template lang="jade">
  div
    div.shade
    div.loginContainer
      button.login-off#loginOff
  <div>
    <div class="shade"></div>
    <div class="loginContainer"><button class="login-off" id="loginOff" @click="closeDialog">关闭</button>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
.shade{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.2);
    position: fixed;
    z-index: 10;
    top:0;
    left:0;
}
.loginContainer{
    width:450px;
    height: 200px;
    background: #ff6300;
    position: fixed;
    top:30%;
    left: 36%;
    border: 5px solid rgba(0,0,0,0.3);
    z-index: 11;
    padding:50px 0;
}
.loginContainer .login-off{
    width: 50px;
    height: 20px;
    color: #ffffff;
    position: absolute;
    top: 10px;
    background:none;
    border:none;
    right: 10px;
}
.loginContainer p{
    text-align: center;
    width:100%;
    height: 30px;
    color: #ffffff;
    margin:30px 0;
}
.loginContainer input{
    width: 200px;
    height: 30px;
    /*float:left;*/
    /*margin: 25px 50px;*/
}
.loginContainer #enter{
    width: 80px;
    height: 30px;
    margin-left: 85px;
    background: #ffffff;
    color:#fb3434;
    border: none;
}
</style>
