/**
 * Created by Administrator on 2017/6/27.
 */
var username = $('#username');
var password = $('#password');
var rePassword = $('#rePassword');
var mobile = $('#mobile');
var userLabel = $('#userLabel');
var passLabel = $('#passLabel');
var rePassLabel = $('#rePassLabel');
var mobileLabel = $('#mobileLabel');
var registerBtn = $('#registerBtn');
var oInputs = $('input');


oInputs.each(function(index, input){
  input.onfocus=function(){
    if(this.name === 'userName'){

      userLabel.css('color','#CFC8D5');
      userLabel.text('用户名为3-20位字母数字下滑线');

    }else if(this.name === 'password'){

      passLabel.css('color','#CFC8D5');
      passLabel.text('最小长度为6位,最长20');

    }else if(this.name === 'rePassword'){

        rePassLabel.css('color','#CFC8D5');
        rePassLabel.text('请再次输入密码');

    }else if(this.name === 'mobile'){

        mobileLabel.css('color','#CFC8D5');
        mobileLabel.text('手机号格式都懂得~~');

    }
  };
  input.onblur=function(){
    if(this.name === 'userName'){
      var userVal = this.value;
      $.ajax({
        url: 'http://h6.duchengjiu.top/shop/api_user.php',
        dataType: 'json',
        type: 'post',
        data:{
          status:'check',
          username:userVal
        },
        success: function(resp){
          console.log(resp.code);
          if(resp.code === 0){
            userLabel.css('color','#CFC8D5');
            userLabel.text('用户名可用');
          }else{
            userLabel.css('color','red');
            userLabel.text('用户名不可用');
            return;
          }
        }
      })
    }else if(this.name === 'password'){
      var passVal = this.value;
      if(!check('password',passVal)){
        passLabel.css('color','red');
        passLabel.text('密码不符合要求');
        return;
      }else{
        passLabel.css('color','#CFC8D5');
        passLabel.text('密码 is OK');
      }
    }else if(this.name === 'rePassword'){
      if(!check('rePassword')){
        rePassLabel.css('color','red');
        rePassLabel.text('输入的密码前后不一致');
        return;
      }else{
        rePassLabel.css('color','#CFC8D5');
        rePassLabel.text('密码正确');
      }
    }else if(this.name === 'mobile'){
      var mobVal = mobile.val();
      if(!check('mobile',mobVal)){
        mobileLabel.css('color','red');
        mobileLabel.text('手机号格式不正确');
        return;
      }else{
        mobileLabel.css('color','#CFC8D5');
        mobileLabel.text('格式正确');

      }
    }
  };
});

registerBtn.click(function(){
  userVal = username.val();
  passVal = password.val();
  rePassVal = rePassword.val();
  mobVal = mobile.val();
  var data = {
    status: 'register',
    username: userVal,
    password: passVal
  };
  $.ajax({
    url: 'http://h6.duchengjiu.top/shop/api_user.php',
    dataType: 'json',
    type: 'post',
    data: data,
    success: function (resp) {
      console.log(resp);
    }
  });
});

