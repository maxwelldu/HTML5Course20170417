/**
 * Created by Administrator on 2017/6/27.
 */
var username = $('#userName');
var password = $('#password');
var userLabel = $('#userLabel');
var passLabel = $('#passLabel');
var loginBtn = $('#loginBtn');
var oInputs = $('input');

oInputs.each(function(index, input) {
  input.onfocus = function () {
    if (this.name === 'userName') {

      userLabel.css('color', '#CFC8D5');
      userLabel.text('请输入用户名');

    } else if (this.name === 'password') {

      passLabel.css('color', '#CFC8D5');
      passLabel.text('请输入密码');

    }
  };
  input.onblur =function(){
    if(this.name === 'userName'){
      userVal = this.value;
      if(userVal === undefined || userVal ===''){
        console.log(userVal);
        userLabel.text('用户名不能为空');
        userLabel.css('color', 'red');
        return;
      }else{
        userLabel.text('');
      }
    }
    if(this.name === 'password'){
      passVal = password.val();
      if(passVal === ''){
        passLabel.css('color','red');
        passLabel.text('请输入密码');
      }else if(passVal !== ''){
        passLabel.text('');
      }
    }
  }
});


loginBtn.click(function(){
  $.ajax({
    url: 'http://h6.duchengjiu.top/shop/api_user.php',
    dataType: 'json',
    type: 'post',
    data:{
      status:'login',
      username: userVal,
      password: passVal
    },
    success: function(resp){
      for(var val in resp.data){
        localStorage.setItem(val,resp.data[val]);
      }
      location.href='index.html';
    }
  });



});
