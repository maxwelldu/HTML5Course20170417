/**
 * Created by Administrator on 2017/6/27.
 */
$(function(){
    //添加检测用户名是否被用
    $('input[name="username"]').blur(function(){
        console.log( $(this).val() );
        shop.api.checkUsernameUnique($(this).val(), function(response){
            console.log(response);
            if (response.code === 0) {
                $("span[class='success']").show();
                $("span[class='error']").hide();
            } else if(response.code === 2001){//用户名已存在
                $('span[class="success"]').hide();
                $("span[class='error']").show();
                $('span[class="error"]').html("用户名已存在");
            }
        });
    });

    //点击注册按钮
    $('#submit').click(function(){
        //获得用户名和密码
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        //验证密码最小长度6位
        if (password.length < 6 || password.length > 20) {
            alert('密码长度在6到20位');
            return;
        }
        console.log([username, password]);
        shop.api.register(username, password, function(response){
            console.log(response);
        });
    });
});
$("#login").click(function() {
    location.href = "login.html";
});