


$(function () {
    $('#Password').blur(function () {
       var password = $('input[name = "password"]').val();
        if((password === '' || password.length < 6 || password.length > 20)){
            $('#register-pa-span').html("格式错误").css("color", "red").show();
            return;
        } else{
            $('#register-pa-span').html("格式错误").css("color", "red").hide();
            $('#register-pa-span').html("格式正确").css("color", "green").show();
        }

    });
    $('#Passwords').blur(function () {
        var passwords = $('input[name = "passwords"]').val();
        var password = $('input[name = "password"]').val();
        if(password === passwords){
            $("#register-pas-span").html("重复输入密码一致").css("color", "green").show();
        }else{
            $("#register-pas-span").html("重复输入密码一致").css("color", "green").hide();
            $("#register-pas-span").html("重复输入密码不一致").css("color", "red").show();
            return;
        }
    });
   $('#Username').blur(function () {
       var username = $('input[name = "username"]').val();

      $.ajax({
          "url": "http://h6.duchengjiu.top/shop/api_user.php",
          "type": "POST",
          "dataType": "json",
          "data":{
              "status": "check",
              "username": username
          },
          "success": function (response) {
              console.log(response);

              if(response.code === 0){
                  $('#register-us-span').html("用户名可使用").css("color","green").show();

              } else if(response.code === 2001){
                  $('#register-us-span').html("用户名已注册").css("color","red").show();
                  return;
              } else if(/[A-z0-9_]+/.test(username === '' || username.length < 20 || username.length > 3)){
                  $('#register-us-span').html('请输入3-20位字母数字下划线组合').css("color",'red').show();
                  return;
              }

          }
      })
   });
$('#But').click(function () {
   var username = $('input[name="username"]').val();
   var password = $('input[name="password"]').val();
   var passwords = $('input[name="passwords"]').val();




   console.log([username, password]);

    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "type": "POST",
        "dataType": "json",
        "data": {
            "status": "register",
            "username": username,
            "password": password
        },
        "success": function (response) {
            if((password === '' || password.length < 6 || password.length > 20)){
                $('#register-pa-span').html("格式错误").css("color", "red").show();
                    return;
            } else{
                $('#register-pa-span').html("格式错误").css("color", "red").hide();
                $('#register-pa-span').html("格式正确").css("color", "green").show();
            }
            if(password === passwords){
                $("#register-pas-span").html("重复输入密码一致").css("color", "green").show();
            }else{
                $("#register-pas-span").html("重复输入密码一致").css("color", "green").hide();
                $("#register-pas-span").html("重复输入密码不一致").css("color", "red").show();
                return;
            }
            if(response.code === 0){
                $('#register-us-span').html("用户名可使用").css("color","green").show();

            } else if(response.code === 2001){
                $('#register-us-span').html("用户名已注册").css("color","red").show();
                return;
            } else if(/[A-z0-9_]+/.test(username === '' || username.length < 20 || username.length > 3)){
                $('#register-us-span').html('请输入3-20位字母数字下划线组合').css("color",'red').show();
                return;
            }
            location.assign('http://localhost:63342/%E7%AC%AC%E4%BA%8C%E5%A4%A9/index.html?_ijt=kgmve9efblme5jhrhuvkma9pa');
            alert("注册成功");
        }
    })
  })
});