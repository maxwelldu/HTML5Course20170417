1. MongoDB安装和基本使用
- 下载安装MongoDB
- 打开 `C:\Program Files\MongoDB\Server\3.4\bin`
  `3.4是版本号可能会不一样`
- 将上面的路径添加到系统的环境变量中,配置完成之后关闭打开的命令行，重新打开
- 打开C盘，新建一个data目录，打开data, 新建一个db目录
- 打开命令行，输入 `mongod` 启动mongodb数据库
- 打开一个新的命令行，输入 `mongo` 进入到mongodb客户端
- 后面即可使用mongodb的各种命令了
- 使用数据库(如果没有则自动创建)：`use test;`  
- 添加数据到user表（首次会自动创建集合）: `db.user.insert( {"name":"ucai.com","age":51} );`
- 查找user表所有数据：`db.user.find();`
- 删除数据：`db.user.remove({"name":"ucai.com"});`
- 更新数据：`db.user.update({name:"ucai.com"}, {$set:{age:55}});`
- 通过nodejs操作mongodb数据库

2. blog的API制作
- 注册
- 登录（授权，以下的api全部需要传递token才能使用）
- 发布博文
- 删除博文
- 修改博文
- 分页显示出博文
- 发布评论
- 删除评论
- 点赞功能
