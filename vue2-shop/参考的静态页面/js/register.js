$(function(){
    var Name = $("#username");
    var Password = $("#password");
    var confirmPassword = $("#confirmPassword");
    var confirmPasswordSpan = $(".confirmPassword span");
    var NameSpan = $(".username span");
    var PasswordSpan = $(".password span");
    var username;
    var password;
    var reg = /[0-9A-z_]+/;
    console.log(Name);
    Name.focus(function () {
        NameSpan.html("3-20位数字字母下划线")
    });
    Name.blur(function () {
        username = Name.val();
        console.log(username);
        if(username === ""){
            NameSpan.html("请输入用户名！");
            return;
        }else if(username.length > 20 || username.length < 3){
            NameSpan.html("用户名错误，规定在3-20位数字字母下划线");
            return;
        }else if(reg.test(username)){
            $.ajax({
                "url":"http://h6.duchengjiu.top/shop/api_user.php",
                "type": "POST",
                "dataType":"json",
                "data":{
                    "status": "check",
                    "username": username
                },
                "success":function (response) {
                    console.log(response);
                    if(response.code === 0){
                        NameSpan.html("用户名可用");
                    }else if(response.code === 2001){
                        NameSpan.html("用户名已存在");
                    }
                }
            })
        }else{
            NameSpan.html("用户名错误，不能使用特殊字符");
            return;
        }

    });
    Password.focus(function () {
        PasswordSpan.html("6-20位之间,数字字母下划线");
    });
    Password.blur(function () {
        password = Password.val();
        if(password === ""){
            PasswordSpan.html("请输入密码!");
            return;
        }else if(password.length > 20 || password.length < 6){
            PasswordSpan.html("用户密码错误，规定在6-20位之间,数字字母下划线");
            return;
        }else if(reg.test(password)){
            PasswordSpan.html("用户密码正确");
        }else{
            PasswordSpan.html("用户密码错误，不能使用特殊字符");
            return;
        }
    });
    confirmPassword.focus(function () {
        confirmPasswordSpan.html("请输入确认密码");
    });
    confirmPassword.blur(function () {
        password = Password.val();
        confirmPass = confirmPassword.val();
        if(confirmPass == ""){
            confirmPasswordSpan.html("请输入确认密码");
            return;
        }else if(confirmPass == password){
            confirmPasswordSpan.html("重复密码正确");
        }else{
            confirmPasswordSpan.html("重复密码不一样");
            return;
        }
    });
    $("#registerBut").click(function () {
        username = Name.val();
        if(username === ""){
            NameSpan.html("请输入用户名！");
            return;
        }else if(username.length > 20 || username.length < 3){
            NameSpan.html("用户名错误，规定在3-20位数字字母下划线");
            return;
        }else if(reg.test(username)){
            $.ajax({
                "url":"http://h6.duchengjiu.top/shop/api_user.php",
                "type": "POST",
                "dataType":"json",
                "data":{
                    "status": "check",
                    "username": username
                },
                "success":function (response) {
                    console.log(response);
                    if(response.code === 0){
                        NameSpan.html("用户名可用");
                    }else if(response.code === 2001){
                        NameSpan.html("用户名已存在");
                    }
                }
            })
        }else{
            NameSpan.html("用户名错误，不能使用特殊字符");
            return;
        }
        password = Password.val();
        if(password === ""){
            PasswordSpan.html("请输入密码!");
            return;
        }else if(password.length > 20 || password.length < 6){
            PasswordSpan.html("用户密码错误，规定在6-20位之间,数字字母下划线");
            return;
        }else if(reg.test(password)){
            PasswordSpan.html("用户密码正确");
        }else{
            PasswordSpan.html("用户密码错误，不能使用特殊字符");
            return;
        }
        if(confirmPass == ""){
            confirmPasswordSpan.html("请输入确认密码");
        }else if(confirmPass == password){
            confirmPasswordSpan.html("重复密码正确");
        }else{
            confirmPasswordSpan.html("重复密码不一样");
            return;
        }
        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_user.php",
            "type": "POST",
            "dataType":"json",
            "data":{
                "status": "register",
                "username": username,
                "password": password
            },
            "success":function (response) {
                console.log(response);
                if(response.code === 0){
                    alert("注册成功");
                    location.href = "index.html";
                }else if(response.code === 2001){
                    alert("用户名已存在")
                }else{
                    alert("注册失败")
                }
            }
        })
    })
});