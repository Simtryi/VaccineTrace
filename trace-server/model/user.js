let mongoose = require('mongoose');

// 1、定义schema
const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,'用户名不能为空']
    },
    password:{
        type:String,
        required:[true,'密码不能为空']
    },
    type:{
        type:Number,

    }
});

// 2、暴露model
module.exports = mongoose.model('User',userSchema)

