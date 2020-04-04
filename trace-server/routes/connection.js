// 1、连接数据库
let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/trace");

let db = mongoose.connection;

// 监听成功事件
db.on('connected',()=>{
    console.log("connect MongoDB success！");

});

// 监听错误事件
db.on('error',err=>{
    console.log(err.toString());
});