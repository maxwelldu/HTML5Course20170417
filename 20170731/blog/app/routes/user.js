var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../../config');
app.set('superSecret', config.secret);

var apiRoutes = express.Router();
apiRoutes.post('/auth', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) {
      return res.json({success: false, message: "查询用户失败：" + err})
    };

    //如果找不到用户
    if (!user) {
      return res.json({success: false, message: '认证失败，用户名找不到'});
    } else if (user) {//如果有此用户，验证密码
      if (user.password != req.body.password) {
        return res.json({success: false, message:"认证失败，密码错误"});
      } else {
        //用户登录成功，用户名密码正确
        //创建token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 //设置过期时间
        });

        //返回token
        return res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });
      }
    }
  });
});

module.exports = apiRoutes;
