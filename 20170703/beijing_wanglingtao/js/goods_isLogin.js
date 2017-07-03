var userDom = $('#register');
//判断是否登录
if(localStorage.username){
    //用户登录了
    // '<a href="#" class="username">'+localStorage.username+'</a>'
    userDom[0].innerHTML='<a href="#" class="username">'+localStorage.username+'</a><a class="exit" href="#" id="exit">退出</a>';
}else{
    userDom.html('<a href="goods_login.html">登录</a>     <a href="goods_register.html">免费注册</a>');
}

var userExit = $('#exit');
userExit.click(function(){
    localStorage.clear();
    location.href='goods_login.html';
});/**
 * Created by Administrator on 2017/6/29.
 */
