//引入mongoose
var mongoose  = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/test');

//获取db对象
var db = mongoose.connection;
//添加error事件
db.on('error', console.error.bind(console, 'connection error:'));
//添加打开事件，只会执行一次，执行的话表示数据库被打开
db.once('open', function(callback){
  console.log('connection success');

  //定义一个小猫的schema，静态的, 里面有一个name属性
  var kittySchema = mongoose.Schema({
    name: String
  });
  kittySchema.methods.speak = function() {
    var greeting = this.name ? "Meow name is " + this.name : "I don't have name";
    console.log(greeting);
  }

  //将 scheme打入到一个Kitten模型，这个模型是一个类
  var Kitten = mongoose.model('Kitten', kittySchema);
  //上面的代码都是为了定义一个Model,以后对数据的操作只需要调用几个方法

  //实例化一个小沉默对象
  // var silence = new Kitten({name: "hello"});
  // console.log(silence.name);
  // // silence.speak();
  //
  // silence.save(function(err, silence) {
  //   if (err) return console.err(err);
  //   silence.speak();
  // });

  //查找所有的小猫
  Kitten.find(function(err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });
  //过滤一下，查找小s开头的小猫
  Kitten.find({name: /^s/}, function(err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });
  Kitten.find({name: /l/}, function(err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });




});
