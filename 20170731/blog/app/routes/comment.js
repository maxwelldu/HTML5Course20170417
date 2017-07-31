var express = require('express');
var Blog = require('../models/blog');
var apiRoutes = express.Router();

apiRoutes.post('/', function(req, res) {
  var {id, body} = req.body;
  Blog.findById(id, function (err, blog) {
    if (err) {
      return res.json({success: false, message: "文章不存在" + err});
    };

    blog.comments.push({body});
    blog.save(function (err) {
      if (err) {
        return res.json({success: false, message: "发布评论失败" + err});
      }
      return res.json({success: true, message: "发布评论成功"});
    });
  });
});

module.exports = apiRoutes;
