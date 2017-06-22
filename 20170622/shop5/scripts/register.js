/**
 * Created by maxwell on 17/3/22.
 */
(function(){
  var form = document.forms.registerForm,
    nmsg = document.getElementById('message');

  function showMessage(clazz,msg){
    if (!clazz){
      nmsg.innerHTML = '';
      nmsg.classList.remove('j-suc');
      nmsg.classList.remove('j-err');
    }else{
      nmsg.innerHTML = msg;
      nmsg.classList.add(clazz);
    }
  }

  function disableSubmit(disabled){
    form.loginBtn.disabled = !!disabled;
    var method = !disabled?'remove':'add';
    form.loginBtn.classList[method]('j-disabled');
  }

  function invalidInput(node,msg){
    showMessage('j-err',msg);
    node.classList.add('j-error');
    node.focus();
  }

  function clearInvalid(node){
    showMessage();
    node.classList.remove('j-error');
  }

  form.username.addEventListener(
    'invalid',function(event){
      event.preventDefault();
      var input = form.username;
      invalidInput(input,'请输入正确的用户名');
    }
  );

  form.addEventListener(
    'input',function(event){
      // 还原错误状态
      clearInvalid(event.target);
      // 还原登录按钮状态
      disableSubmit(false);
    }
  );

  form.addEventListener(
    'submit',function(event){
      // 密码验证
      var input = form.password,
        pswd = input.value,
        emsg = '';
      if (pswd.length<6){
        emsg = '密码长度必须大于6位';
      }else if(!/\d/.test(pswd)||!/[a-z]/i.test(pswd)){
        emsg = '密码必须包含数字和字母';
      }
      // 密码验证不通过
      if (!!emsg){
        event.preventDefault();
        invalidInput(input,emsg);
        return;
      }
      input.value = ucshop.generatePassword(pswd);
      // 禁用提交按钮
      disableSubmit(true);
      event.preventDefault();
      //POST请求
      $.post(
        ucshop.getLoginOrRegisterAddress(),
        $.serializeString(form),
        function(err,d) {
          console.log(d);
          try {
            var dataJSON = JSON.parse(d);
            //还原注册按钮
            disableSubmit(false);
            //识别注册结果
            if (dataJSON.code == ucshop.CODE.success) {
              showMessage('j-suc', '注册成功!');
              form.reset();
              setTimeout(function(){
                location.href = 'login.html';
              }, 2000);
            } else if(dataJSON.code == ucshop.CODE.exists) {
              showMessage('j-err', '用户名已被注册');
              form.username.focus();
            } else {
              showMessage('j-err', '系统错误');
            }
          } catch(e) {
            console.log(e.errors);
          }
        }
      );
    }
  );

  ucshop.checkLoginStatus();
})();
