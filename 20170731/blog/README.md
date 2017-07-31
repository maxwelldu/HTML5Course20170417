#NodeJS+MongoDB的单用户博客API系统

##模型
user模型：
name: String
password: String
admin: Boolean

分类模型：
title: String

博客模型：
title: String
body: String,
author: String,
comments: [{ body: String, date: Date}],
tags: [{title: String}],
date: { type: Date, default: Date.now},
hidden: Boolean,
meta: {
  votes: Number,
  favs: Number
}

##API列表有以下
- 注册管理员 y
- 登录（授权，以下的api全部需要传递token才能使用）y
- 发布博文 y
- 删除博文
- 修改博文
- 删除评论 

- 博文分类CRUD   y
- 分页显示出博文 y/未完善
- 根据分类显示出博文 y
- 发布评论 y
- 点赞功能
