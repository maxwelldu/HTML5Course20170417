//当页面DOM结构加载完成之后执行
$(function(){
    //检测用户名是否被使用
    $("input[name='username']").blur(function(){
        console.log($(this).val());
        $.ajax({
            "url": "http://h6.duchengjiu.top/shop/api_user.php",
            "type": "POST",
            "data": {
                "status": "check",
                "username": $(this).val()
            },
            "dataType": "json",
            "success": function(response){
                console.log(response);
                if(response.code === 0){
                    $("span[class='success-username']").show();
                    $("span[class='error-username']").hide();
                }else if(response.code === 2001){
                    $("span[class='success-username']").hide();
                    $("span[class='error-username']").show();
                    $("span[class='error-username']").html("用户名已存在");
                }
            }
        })
    });
    //点击注册按钮
    $("#register").click(function(){
        //获得用户名和密码
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();
        var ensurePassword = $("input[name='ensure-password']").val();
        //验证密码最小长度6位
        if(password.length < 6 || password.length > 20){
            alert("密码长度在6到20位");
            return;
        }
        if(password !== ensurePassword){
            alert("密码不一致请重新输入");
            return;
        }
        console.log([username,password,ensurePassword]);
        $.ajax({
            "url": "http://h6.duchengjiu.top/shop/api_user.php",
            "type": "POST",
            "dataType": "json",
            "data": {
                "status": "register",
                "username": username,
                "password": password
            },
            "success": function(response){
                console.log(response);
                location.assign("login.html");
            }
        })
    })
});


/*
 *:TODO
 //表单验证，用户名，密码，并给出友好的提示
 //提交表单之后有两种情况：
 成功的时候给出注册成功的提示
 失败的时候把错误信息显示出来
 //防止表单重复提交
 //用户名是否可以被注册
 */

