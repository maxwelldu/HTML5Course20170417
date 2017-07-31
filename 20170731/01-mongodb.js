var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/test';

var insertData = function(db, cb) {
  //连接到集合 students;
  var collection = db.collection('students');
  var data = [{"name":"changkun"}, {"name":"zihao"}];
  collection.insert(data, function(err, result){
    if (err) {
      console.log('Error:' + err);
      return;
    }
    cb(result);
  });
  /*
  db.collection('students').insert([
    {"name": "changkun"},
    {"name": "zihao"},
  ], function(err, result){
    cb(result);
  });
  */
}

var selectData = function(db, cb) {
  var collection = db.collection('students');
  var whereStr = {"name":"zihao"};
  collection.find(whereStr).toArray(function(err, result){
    if (err) {
      console.log('Error: ' + err);
      return;
    }
    cb(result);
  });
}

var updateData = function(db, cb) {
  var collection = db.collection('students');
  var whereStr = {"name": "zihao"};
  var updateStr = {$set: {"age": 3}};
  collection.update(whereStr, updateStr, function(err, result){
    if (err) {
      console.log("Error: " + err);
      return;
    }
    cb(result);
  });
}

var deleteData = function(db, cb) {
  var collection = db.collection('students');
  var whereStr = {"name":"zihao"};
  collection.remove(whereStr, function(err, result){
    cb(result);
  });
}

MongoClient.connect(DB_CONN_STR, function(err, db){
  console.log('连接成功');

/*
  //添加数据
  insertData(db, function(result){
    console.log(result);
  });
  */

  //修改数据
  /*
  updateData(db, function(result){
    console.log(result);
  });
  */

  //删除数据
  deleteData(db, function(result){
    console.log(result);
  });

  //查询数据
  selectData(db, function(result){
    console.log(result);
  });


});
