/**
 * Created by 张美 on 2017/6/30.
 */
$(function() {
    $('input[name="username"]').blur(function () {
        console.log($(this).val());
        $.ajax({
            'url': "http://h6.duchengjiu.top/shop/api_user.php",
            'type': 'POST',
            'data': {
                'status': 'check',
                'username': $(this).val()
            },
            'dataType': 'json',
            'success': function (response) {
                console.log(response);
                if (response.code === 0) {
                    $('span[class="success"]').show();
                    $('span[class="error"]').hide();
                } else if (response.code === 2001) {
                    $('span[class="success"]').hide();
                    $("span[class='error']").show();
                    $('span[class="error"]').html("用户名已存在");
                }
            }
        })
    });
    $('#register').click(function () {
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        if (password.length < 6 || password.length > 20) {
            alert('密码长度在6到20位');
            return;
        }
        console.log([username, password]);
        $.ajax({
            'url': "http://h6.duchengjiu.top/shop/api_user.php",
            'type': 'POST',
            'dataType': 'json',
            'data': {
                'status': 'register',
                'username': username,
                'password': password
            },
            'success': function (response) {
                console.log(response);
                if (response.code === 0) {
                    $('div[class="init"]').show();
                    $('div[class="init"]').html("注册成功");
                    location.href = "index.html";
                }else if (response.code === 2001) {
                    $('div[class="init"]').show();
                    $('div[class="init"]').html("该ID以被人注册，请重新注册");
                }

            }
        });
    });
});