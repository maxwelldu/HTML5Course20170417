$(function () {
    if(localStorage.getItem("token") != null){
        var user = $("#line");
        user.html("<a href='#'>"+localStorage.getItem('username')+"</a><a href='#' id='loginOn'>退出登录</a>");
    }
    $("#loginOn").click(function () {
        localStorage.clear();
        location.reload();
    });
    window.Login = Login;
    $("#login").click(function () {
        Login();
    });
    $.ajax({
       "url":"http://h6.duchengjiu.top/shop/api_cat.php",
        "type":"GET",
        "dataType":"json",
        "success":function (reaponse) {
            console.log(reaponse);
            var goodsList = $("#goodsList ul");
            for(var i = 0; i < reaponse.data.length; i++){
                var obj = reaponse.data[i];
                goodsList.append("<li><a href='List.html?cat_id=" + obj.cat_id + "'>" + obj.cat_name + "</a></li>")
            }
        }
    });
    function Login() {
        $("body").append("<div class='shade'></div>");
        $("body").append("<div class='loginContainer'><button class='login-off' id='loginOff'>关闭</button><p>登录账户：<input type='text' placeholder='请输入账户' id='username'></p><p>登录密码：<input type='password' placeholder='请输入密码' name='' id='password'></p><button id='enter'>登录</button></div>");
        window.onmousewheel = function (event) {
            event = event || window.event;
            event.preventDefault();
        };
        $("#enter").click(function () {
            var username = $("#username").val();
            var password = $("#password").val();
            $.ajax({
                "url": "http://h6.duchengjiu.top/shop/api_user.php",
                "type": "POST",
                "dataType": "json",
                "data": {
                    "status": "login",
                    "username": username,
                    "password": password
                },
                "success": function (response) {
                    console.log(response);
                    if (response.code === 0) {
                        var data = response.data;
                        for (var prop in data) {
                            if (data.hasOwnProperty(prop)) {
                                localStorage.setItem(prop, data[prop]);
                            }
                        }
                        location.reload();
                    } else {
                        alert('用户不存在');
                    }
                }
            });
            console.log([username, password]);
        });
        $("#loginOff").click(function () {
            $(".shade").remove();
            $(".loginContainer").remove();
            window.onmousewheel = function (event) {
                event = event || window.event;
                event.cancelable = false;
            };
        });
    }
    document.onscroll = function () {
        var scrTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrTop > 150){
            $("#goodsList").addClass("goodsList");
            $("header").css("padding-bottom",40);
        }else if(scrTop < 150){
            $("#goodsList").removeClass("goodsList");
            $("header").css("padding-bottom",0);
        }
    }
});
