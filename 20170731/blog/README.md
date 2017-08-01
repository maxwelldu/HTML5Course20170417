#NodeJS+MongoDB的单用户博客API系统

##模型
user模型：
name: String
password: String
admin: Boolean

分类模型：
title: String
meta: {
  blog_count: Number
}

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
- 2.注册管理员 y
- 3.登录（授权，以下的api全部需要传递token才能使用）y
- 4.发布博文 y
- 9.删除博文 n
- 8.修改博文 n
- 10.删除评论 n

- 1.博文分类CRUD   y
- 5.分页显示出博文 y/未完善
- 6.根据分类显示出博文 y
- 7.发布评论 y
- 11.点赞功能 n
