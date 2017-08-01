var express = require('express');
var Blog = require('../models/blog');

var apiRoutes = express.Router();
//显示所有的博客
apiRoutes.get('/', function(req, res) {
  var {category} = req.query;
  var whereObj = {};
  if (category) {
    var reg = new RegExp('^'+category+'$');
    whereObj = {category: reg};
  }

  Blog.find(whereObj, function(err, blogs) {
    if (err) {
      return res.json({success: false, "message":"查找所有博客失败" + err});
    }
    return res.json({success: true, data: blogs});
  });
});
//发布博客
apiRoutes.post('/', function(req, res) {
  var {title, body, author, tags, hidden, category} = req.body;
  if (title.length < 3) {
    return res.json({success: false, "message":"博客标题不能小于3位"});
  }
  //tags转换成对象数组
  var tagsArray = tags.split(',');
  var tagsObjArray = [];
  tagsArray.forEach(function(v){
    tagsObjArray.push({title: v});
  });

  var blog = new Blog({
    title,
    body,
    author,
    category,
    tags: tagsObjArray,
    hidden
  });
  blog.save(function(err) {
    if (err) {
      return res.json({success: false, "message": "博客发布失败" + err});
    }
    return res.json({success: true, "message": "博客发布成功"});
  });
});

module.exports = apiRoutes;
