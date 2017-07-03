/**
 * Created by Administrator on 2017/6/27 0027.
 */
var username = $('input[name = "username"]');
var password = $('input[name = "password"]');
var passwordshow = $('#passwordshow');
var usernameshow = $('#usernameshow');
username.focus(function () {
    usernameshow.html('用户名为3-20位 请不要输入符号~');
});
username.blur(function () {
    if(username.val().length < 6  || username.val().length > 20 && /\w/){
        usernameshow.attr("class","red");
        return;
    }else {
        usernameshow.removeClass("red");
        $.ajax({
            "url" : "http://h6.duchengjiu.top/shop/api_user.php",
            "type" : "POST",
            "dataType" : "json",
            "data": {
                "status": "check",
                "username": username.val(),
            },
            "success": function(response){
                console.log(response);
                if (response.code === 0){
                    usernameshow.html('用户名可用~');
                } else if (response.code === 2001){
                    usernameshow.html('用户名别人用了~');
                }
            }
        })
    }
});

password.focus(function () {
    passwordshow.html('密码为3-20位~');
});
password.blur(function () {
    if(password.val().length < 6  || password.val().length > 20){
        console.log(password.length);
        passwordshow.attr("class","red");
    }else {
        passwordshow.removeClass("red");
    }
});

$('#regist').click(function(){
    $.ajax({
        "url" : "http://h6.duchengjiu.top/shop/api_user.php",
        "type" : "POST",
        "dataType" : "json",
        "data": {
            "status": "register",
            "username": username.val(),
            "password" : password.val()
        },
        "success": function(response){
            console.log(response);
            alert(response.message);
            if (response.code === 0){
                $.ajax({
                    "url" : "http://h6.duchengjiu.top/shop/api_user.php",
                    "type" : "POST",
                    "dataType" : "json",
                    "data": {
                        "status": "login",
                        "username": username.val(),
                        "password" : password.val()
                    },
                    "success": function(response){
                        console.log(response);
                        alert(response.message);
                        var obj = response;
                        if(obj.code === 0){
                            for(var k in obj.data){
                                if (obj.data.hasOwnProperty(k)){
                                    localStorage.setItem(k,obj.data[k])
                                }
                            }
                            window.location.href="index.html";
                        }else if(obj.code == 2003){
                            alert("您还没有注册，请先注册");
                        }else if(obj.code == 1001){
                            alert("密码错误");
                        }
                    }
                })
            }
        }
    })
});

