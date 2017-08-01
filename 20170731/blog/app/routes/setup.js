var express = require('express');
var User = require('../models/user');

var apiRoutes = express.Router();
apiRoutes.get('/', function(req, res) {
  var admin = new User({
    name: 'admin',
    password: 'admin888',
    admin: true
  });
  admin.save(function(err) {
    if (err) {
      return res.json({success: false, "message": "管理员创建失败"});
    }
    return res.json({success: true, "message": "管理员创建成功"});
  });
});

module.exports = apiRoutes;
