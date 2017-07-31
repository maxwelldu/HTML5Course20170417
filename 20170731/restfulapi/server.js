//引入 express 框架
var express = require('express');
//获取express
var app = express();
//引入body-parser模块
var bodyParser = require('body-parser');
//引入morgan模块，打印信息
var morgan = require('morgan');
//引入mongoose, 方便对mongodb进行操作
var mongoose = require('mongoose');
//引入jsonwebtoken模块，方便的生成token
var jwt = require('jsonwebtoken');

//引入自己写的config文件，里面只有一个config对象，里面有一个secret和database属性
var config = require('./config');
//引入自定义的user对象，里面定义了model, model里面定义了对应的schema
var User = require('./app/models/user');
//得到环境变量里面设置的端口，如果没有则使用默认的8080
var port = process.env.PORT || 8080;
//连接到mongodb数据库
mongoose.connect(config.database);
//给应用程序里面设置一个属性superSecret, 值为配置里面的secret
app.set('superSecret', config.secret);
//使用bodyParser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//使用morgan中间件，显示请求的信息
app.use(morgan('dev'));
//路由，get方式访问网站根目录时处理
app.get('/', function(req, res){
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});
//路由，访问setup时，帮我们新建一个用户
app.get('/setup', function(req, res) {
  var nick = new User({
    name: 'nick',
    password: 'test',
    admin: true
  });
  nick.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({success: true});
  });
});
//路由：post访问/auth进行认证
app.post('/auth', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    //如果找不到用户
    if (!user) {
      res.json({success: false, message: '认证失败，用户名找不到'});
    } else if (user) {//如果有此用户，验证密码
      if (user.password != req.body.password) {
        res.json({success: false, message:"认证失败，密码错误"});
      } else {
        //用户登录成功，用户名密码正确
        //创建token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 //设置过期时间
        });

        //返回token
        res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });
      }
    }
  });
});

//api路由开始
var apiRoutes = express.Router();
//路由：访问/api/时
apiRoutes.get('/', function(req, res){
  res.json({"message": 'Welcome to the collest API on earth!'});
});
//apiRoutes的中间件，只要访问 /api/开头的内容都会进入这个中间件进行处理，这里主要做了token验证
apiRoutes.use(function(req, res, next) {
  console.log('中间件被访问');
  //得到post中的token,没有获取get中的token,再没有得到headers中的x-access-token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //如果有token
  if (token) {
    //验证token
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({success: false, message:'token信息错误'});
      } else {
        req.decoded = decoded;
        //流水线进行下一个路由
        next();
      }
    });
  } else {
    //设置 返回码403
    return res.status(403).send({
      success: false,
      message: '没有提供token!'
    });
  }

});

//返回所有用户信息
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(req, users){
    res.json(users);
  });
});
//当访问到/api时，使用apiRoutes这个对象处理
app.use('/api', apiRoutes);
//路由结束

//监听端口
app.listen(port);
console.log('Magic happends at http://localhost:' + port);
