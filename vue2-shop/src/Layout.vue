<template>
  <div id="app">
    <app-header></app-header>
    <section>
      <app-nav></app-nav>
      <router-view></router-view>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/Header'
import AppFooter from './components/Footer'
import AppNav from './components/Nav'
import Index from './components/Index'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppNav,
    Index,
    AppFooter
  }
}
</script>

<style lang="css">
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; font-family: 楷体}
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
h1, h2, h3, h4, h5, h6{ font-size:100%; }
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none; }
a:hover { text-decoration:underline; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
table { border-collapse:collapse; border-spacing:0; }
/*首页头部底部的样式*/
body, html{
    /*height:100%;*/
}
header{
    width: 100%;
    height: 152px;
    background: #ffffff;
}
nav{
    width: 100%;
    height: 40px;
    background:#f8f8f8;
    border-bottom:1px solid #ebebeb;
}
.header-nav{
    width: 1200px;
    height: inherit;
    margin:0 auto;
}
.header-nav a {
    font-size: 12px;
    line-height: 40px;
    color:#333333;
    float:left;
}
.header-nav ul{
    float: right;
}
.header-nav ul li{
    float: left;
    margin:0 10px;
}
.header-nav ul li a.login{
    color: #ff4411;
}
.header-top{
    width: 1200px;
    height:110px;
    margin:0 auto;
}
.logo{
    width: 310px;
    height: 110px;
    float: left;
}
.container{
    width: 550px;
    height: 48px;
    text-align: center;
    float:left;
    padding: 30px 0;
}
.search{
    width: 400px;
    height: 44px;
    border:2px solid #fb3434;
    border-radius: 5px 0 0 5px;
    float:left;
    outline: none;
    font-size: 15px;
    padding: 0 15px;
}
.searchBut{
    width: 60px;
    height: 48px;
    background: #fb3434;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
    float: left;
}
.searchBut img{
    width: 25px;
    height: 25px;
    margin: 12px auto;
}
.standard-img{
    width: 300px;
    height: 120px;
    background:url("./assets/header/TB1adb0OFXXXXXzapXXXXXXXXXX-245-81.png") no-repeat;
    background-size: 100%;
    margin: 0 auto;
}
.standard-img h1{
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    color:#ff4411;
}
.download{
    width: 320px;
    height: 110px;
    float:right;
    background:url("./assets/header/download.png");
    background-size: 100%;
    position: relative;
    cursor: pointer;
}
.qr-dow{
    width: 115px;
    height: 150px;
    position: absolute;
    top: 110px;
    left: 154px;
    display: none;
    z-index: 10;
}
.qr-dow img{
    width:100%;
    height:100%;
}
.download:hover .qr-dow{
    display: block;
}
section{
    width:100%;
    overflow: hidden;
    position: relative;
}
#goodsList{
    width:100%;
    height: 50px;
    background:#fb3434;
}
#goodsList ul{
    width: 1200px;
    height: 50px;
    margin:0 auto;
}
.goodsList{
    position: fixed;
    top:0;
    left:0;
    transition: 1s;
    z-index: 5;
}
#goodsList ul li{
    float:left;
    width: 120px;
    line-height: 50px;
    text-align: center;
}
#goodsList ul li:hover{
    background:orange;
}
#goodsList ul li a{
    display: block;
    width:100%;
    height:100%;
    color:#ffffff;
}
.Hot{
    display: inline-block;
    width: 50px;
    height: 50px;
    background:url("./assets/header/TB1czH5PXXXXXbNXpXXXXXXXXXX-136-122.png");
    background-size:100% 100%;
    position: absolute;
    left: 10px;
    top: -4px;
}
.goods{
    width: 1200px;
    margin:0 auto;
    overflow: hidden;
    position: relative;
}
footer{
    width:100%;
    height: 350px;
    background:#444444;
}
.footer-container{
    width: 1200px;
    height: 350px;
    margin:0 auto;
}
.footer-left, .footer-right{
    width: 480px;
    height: 250px;
    float: left;
}
.footer-canter{
    width: 200px;
    height: 250px;
    float:left;
    text-align: center;
}
.footer-canter h1{
    width:100%;
    color: #ffffff;
    font-size: 30px;
    margin-top: 10px;
}
.footer-canter img{
    width: 135px;
    height: 165px;
    margin-top: 10px;
}
footer ul{
    float:left;
    font-size: 20px;
    color: #ffffff;
    margin:35px 0 0 115px;
    line-height: 30px;
}
footer ul li a{
    font-size: 15px;
    color: #ffffff;
}
.footer-container p{
    width:100%;
    height: 50px;
    float:left;
    text-align: center;
}
.footer-container p a{
    display: inline-block;
    color: #999999;
    padding:0 10px;
}
.footer-container h6{
    width: 100%;
    height: 20px;
    text-align: center;
    float: left;
    color: #999999;
}
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
.But{
    width: 880px;
    height: 30px;
    position: absolute;
    bottom: 10px;
    z-index: 2;
    left:0;
    right:0;
    margin:0 auto;
}
.But button{
    cursor: pointer;
    width: 80px;
    height: 30px;
    float:left;
    border:1px solid #fb3434;
    background: #ffffff;
}
.But button:hover{
    background:#ff4411;
    color: #ffffff;
}
.page{
    width: 720px;
    height: 30px;
    float: left;
    overflow: hidden;
}
#pageBut{
    margin:0 auto;
}
#sideber{
    width: 400px;
    height:100%;
    border:2px solid #fb3434;
    position: fixed;
    top:0;
    right:-402px;
    background:#ffffff;
    z-index: 20;
}
.cartBut{
    width: 30px;
    height: 64px;
    position: absolute;
    top:0;
    bottom:0;
    margin: auto 0;
    left: -30px;
    border:2px solid #fb3434;
    box-sizing: border-box;
    border-radius: 5px 0 0 5px;
}
.cartBut>span{
    display: block;
    width: 100%;
    background: #ffffff;
    height: 30px;
    cursor: pointer;
}
.cartBut>span:hover{
    background:#fb3434;
}
.cartBut>span>img{
    width: 100%;
    height: 100%;
}
#sideber>a{
    display: block;
    width:100%;
    height: 30px;
    padding:0 10px;
    box-sizing: border-box;
    clear-after:left;
    color: #ffffff;
    background:#fb3434;
    line-height: 30px;
}
.enterCart{
    width:100%;
    height: 60px;
    border-top:1px solid #fb3434;
    position: absolute;
    bottom:0;
    background:#fb3434;
}
.enterCart>h1{
    float:left;
    width: 200px;
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    padding:0 20px;
    color: #ffffff;
}
.enterCart>a{
    display: inline-block;
    width: 80px;
    height: 30px;
    background:#fb3434;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    padding: 5px 10px;
    float:right;
    margin:10px 10px;
}
.sideberGoods{
    width:100%;
    height: 80%;
    overflow: auto;
}
.sideberGoods ul {

}
.sideberGoods ul li{
    border:1px solid #fb3434;
    height: 100px;
    box-sizing: border-box;
    margin:5px 5px;
    padding:0 5px;
}
.sideberGoods ul li img{
    width: 100px;
    height: 100%;
    margin-right: 10px;
    float: left;
}
.sideberGoods ul li a {
    color: #000;
}
.sideberGoods ul li h1{
    float: left;
    width: 250px;
    font-size: 20px;
    margin:5px 0;
}
.sideberGoods ul li span{
    font-size: 20px;
    float: left;
    color:red;
}

.standard{
  width: 1200px;
  height: 200px;
  margin:0 auto;
}
.standard a{
  display: block;
  width:100%;
  height: 80px;
  background:url("./assets/header/standard.png");
  background-size: 100%;
}
.standard-img h1{
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color:#ff4411;
}
</style>
