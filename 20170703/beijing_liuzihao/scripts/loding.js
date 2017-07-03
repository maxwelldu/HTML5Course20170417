/**
 * Created by Administrator on 2017/6/27 0027.
 */
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

$('#lod').click(function(){
    console.log(1);
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
                var callbackurl = location.hash.substr(13);
                if (callbackurl) {
                    location.assign(callbackurl);
                } else {
                    window.location.href="index.html";
                }


            }else if(obj.code == 2003){
                alert("您还没有注册，请先注册");
            }else if(obj.code == 1001){
                alert("密码错误");
            }
        }
    })
});
