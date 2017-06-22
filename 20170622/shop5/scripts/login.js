/**
 * Created by maxwell on 17/3/22.
 */
(function(){
  var form = document.forms.loginForm,
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
            console.log(dataJSON);
            //还原登录按钮状态
            disableSubmit(false);
            //识别登录结果
            console.log(dataJSON);
            if (dataJSON.code == ucshop.CODE.success) {
              showMessage('j-suc', '登录成功');
              //保存用户信息
              ucshop.saveLoginedUser(dataJSON.data);
              setTimeout(function(){
                location.href = 'index.html';
              },2000);
            } else if(dataJSON.code == ucshop.CODE.not_exists) {
              showMessage('j-err', '用户名不存在');
              form.username.focus();
            } else if(dataJSON.code == ucshop.CODE.password) {
              showMessage('j-err', '密码错误');
            } else {
              showMessage('j-err', '系统错误');
            }
          } catch(e) {

          }
        }
      );
    }
  );

  ucshop.checkLoginStatus();
})();
