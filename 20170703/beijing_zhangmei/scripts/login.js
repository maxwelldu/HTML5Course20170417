/**
 * Created by 张美 on 2017/6/30.
 */
$(function(){
    $('#login').click(function () {
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        console.log([username, password]);
        $.ajax({
            'url': 'http://h6.duchengjiu.top/shop/api_user.php',
            'type': 'POST',
            'data': {
                'status': 'login',
                'username': username,
                'password': password
            },
            'dataType': 'json',
            'success': function (response) {
                console.log(response);
                if (response.code === 0) {
                    var data = response.data;
                    for (var prop in data) {
                        if (data.hasOwnProperty(prop)) {
                            localStorage.setItem(prop, data[prop]);
                        }
                    }
                    var callbackurl = location.hash.substr(13);
                    if (callbackurl) {
                        location.assign(callbackurl);
                    } else {
                        location.href='index.html';
                    }
                }
            }
        });
    });
});