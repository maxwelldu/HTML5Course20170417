/**
 *
 * Created by sks on 2017/3/21.
 */
(function () {
  window.ucshop = {
    /**
     * API地址前缀
     * @type {string}
     */
    API_PREFIX: "http://h6.duchengjiu.top/shop/",
    // API_PREFIX: "http://lc.shudong.wang/",
    /**
     * 错误码, 0表示成功
     * @type {number}
     */
    CODE: {
      success     : 0,//成功
      empty       : 1,//数据为空
      failed      : 2,//失败
      sys_err     : 3,//系统错误，请联系管理员
      username    : 1000,//用户名错误，格式不正确，规定在3-20位数字字母下划线
      password    : 1001,//密码错误，格式不对，规定在6-20位数字字母下划线
      tokenerr    : 1002,//非法的TOKEN
      tokennone   : 1003,//TOKEN为空
      param_err   : 1004,//参数错误
      expire      : 2000,//资源过期
      exists      : 2001,//资源已存在
      not_exists  : 2002,//资源不存在
      conn_err    : 3000,//数据库连接错误
      sql_err     : 3001,//SQL语句错误
    },
    API_FILE : {
      login_or_register : 'api_user.php',
      user_info         : 'api_userinfo.php',
      cat               : 'api_cat.php',
      goods             : 'api_goods.php',
      position          : 'api_position.php',
      ad                : 'api_ad.php',
      cart              : 'api_cart.php',
      order             : 'api_order.php',
    },

    /**
     * 获取API的完整地址
     * @param filename
     * @returns {string}
     */
    getApiAddress: function (filename) {
      return this.API_PREFIX + filename;
    },
    getGoodsCategoryAddress : function() {
      return this.API_PREFIX + this.API_FILE.cat;
    },
    getLoginOrRegisterAddress : function() {
      return this.API_PREFIX + this.API_FILE.login_or_register;
    },
    getUserInfoAddress : function() {
      return this.API_PREFIX + this.API_FILE.user_info;
    },
    getGoodsAddress : function() {
      return this.API_PREFIX + this.API_FILE.goods;
    },
    getPositionAddress : function() {
      return this.API_PREFIX + this.API_FILE.position;
    },
    getAdAddress : function() {
      return this.API_PREFIX + this.API_FILE.ad;
    },
    getCartAddress : function() {
      return this.API_PREFIX + this.API_FILE.cart;
    },
    getOrderAddress : function() {
      return this.API_PREFIX + this.API_FILE.order;
    },

    /**
     * 自定义密码加密
     * @param password
     * @returns {string}
     */
    generatePassword : function(password) {
      return md5(password).substr(0,20);
    },

    /**
     * 保存用户登录信息在本地
     * @param userinfo
     */
    saveLoginedUser : function(userinfo) {
      //存储登录状态到本地,增加记住我的登录状态
      localStorage.clear();
      userinfo['login_at'] = Date.now();
      userinfo['is_login'] = true;
      for(k in userinfo){
        localStorage.setItem(k, userinfo[k]);
      }
    },

    /**
     * 获取用户的TOKEN
     */
    getUserToken : function() {
      return localStorage.getItem("token");
    },

    /**
     * 检查登录状态
     * @param succ
     * @param fail
     * @returns {*}
     */
    checkLogin : function(succ,fail) {
      var closeTime = 1000*3600*24*7;
      if(localStorage.is_login && (Date.now()-localStorage.login_at < closeTime)){
        return succ();
      }
      localStorage.clear();
      fail();
    },
    /**
     * 退出
     */
    logout : function() {
      localStorage.clear();
    },
    /**
     * 检查登录状态
     */
    checkLoginStatus : function() {
      //检查登录状态
      this.checkLogin(function(){
        $.getElementsByClassName('login')[0].style.display = 'none';
        $.getElementsByClassName('userinfo')[0].style.display = 'block';
        $.getElementsByClassName('username')[0].innerHTML = localStorage.getItem("username");
        //如果当前页面是登录或注册页，则自动跳到首页
        console.log(location.pathname);
        if (location.pathname.indexOf('register.html')!=-1 || location.pathname.indexOf('login.html')!=-1) {
          location.href = 'index.html';
        }
      }, function(){
        $.getElementsByClassName('login')[0].style.display = 'block';
        $.getElementsByClassName('userinfo')[0].style.display = 'none';
        $.getElementsByClassName('username')[0].innerHTML = "";
      });
      //设置退出按钮的事件
      var oLogout = document.getElementById("logout");
      oLogout.addEventListener('click', function(){
        ucshop.logout();
        window.location.href = 'index.html';
      },false);
    },

    /**
     * 获取用户登录的TOKEN
     */
    getLoginedToken : function() {
      return localStorage.getItem('token');
    }

  };


})();
