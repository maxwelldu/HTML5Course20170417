var express = require('express');
var Category = require('../models/category');

var apiRoutes = express.Router();
//添加分类
apiRoutes.post('/', function(req, res) {
  var title = req.body.title;
  var category = new Category({title});
  //相当于下面这一行，ES5的写法
  // var category = new Category({title: title});
  category.save(function(err){
    if (err) {
      return res.json({"success": false, "message": "添加分类失败"});
    }
    return res.json({"success": true, "message": "添加分类成功"});
  });
});
//显示所有分类
apiRoutes.get('/', function(req, res) {
  Category.find(function(req, categories){
    return res.json({
      "success": true,
      "message": "获取分类成功",
      "data": categories
    });
  });
});
//更新分类
apiRoutes.put('/', function(req, res) {
  var {title, newtitle} = req.body;
  Category.findOneAndUpdate({"title": title}, {"title": newtitle}, function(err, category){
    if (err) {
      return res.json({
        "success": false,
        "message": "更新分类失败"
      });
    }

    return res.json({
      "success": true,
      "message": "更新分类成功"
    });
  });
});
//删除分类
apiRoutes.delete('/', function(req, res) {
  var {title} = req.body;
  Category.remove({title: title}, function(err){
    if (err) {
      return res.json({
        "success": false,
        "message": "分类删除失败，请联系管理员"
      });
    }
    return res.json({
      "success": true,
      "message": "分类删除成功"
    });
  });
});
module.exports = apiRoutes;
