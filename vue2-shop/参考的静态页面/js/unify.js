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
    };
    var sideberGoods = $("#sideberGoods ul");
    console.log(sideberGoods);
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_cart.php",
        "type":"GET",
        "dataType":"json",
        "data":{
            "token":localStorage.token
        },
        "success":function (response) {
            console.log(response);
            var html = "";
            for(var i = 0; i < response.data.length; i++) {
                var obj = response.data[i];
                html += "<li><a href='details.html?goods_id=" + obj.goods_id + "'><img src='" + obj.goods_thumb + "' alt=''><h1>"+ obj.goods_name +"</h1><span>"+obj.goods_price+"元</span></a></li>"
            }
            sideberGoods.html(html);
        }
    });
    var sideber = $("#sideber");
    var clickCart = $("#clickCart");
    var clickTop = $("#clickTop");
    clickCart.click(function () {
        if(parseInt(sideber.css("right")) <= -402) {
            sideber.animate({"right": 0}, 500);
        }else if(parseInt(sideber.css("right")) >= 0){
            sideber.animate({"right":-402}, 500);
        }
        console.log(sideber.css("right"));
    });
    clickTop.click(function () {
        $("body").animate({"scrollTop":"0px"},500);
    })
});
