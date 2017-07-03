//判断当前用户是否登录，未登录显示登录，登录则显示用户名
if(localStorage.getItem("token")){
    $("#name").html(localStorage.getItem("username"));
    $("#name").css({
        "color": "red"
    });
}
