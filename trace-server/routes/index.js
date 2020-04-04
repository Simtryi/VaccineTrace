let express = require('express');
let router = express.Router();
require('./connection')
const User = require('../model/user')
const md5 = require('blueimp-md5')
const filter = {password:0,__v:0}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '疫苗防伪追溯系统' });
});

// 登录的路由
router.post('/login',(req,res)=>{
  const {username,password} = req.body;
  User.findOne({username,password:md5(password)},filter,(err,result)=>{
    if(result){//登录成功
      res.cookie('username',username,{maxAge:1000*60*60*24*30});
      const data = {username:result.username,type:result.type,to:'true'};
      res.send({code:0,data});
    }
    else{//登录失败
      res.send({code:1,msg:'用户名或密码不正确！'});
    }
  });
});

// 注册的路由
router.post('/register',(req,res)=>{
  //1、获取请求参数
  const {username,password,type} = req.body;

  //2、处理
  //用户是否存在
  User.findOne({username},function(err,result){
    if(result){
      //3、返回响应数据
      res.send({code:1,msg:'此用户已存在！'});
    }
    else{
      new User({username,type,password:md5(password)}).save(function(err,result){
        const data = {username,type,_id:result._id,to:"true"};
        res.cookie('username',username,{maxAge:1000*60*60*24*30});
        res.send({code:0,data});
      })
    }
  })
});

// 修改账户的路由
router.post('/account',(req,res)=>{
  //1、获取请求参数
  const {username,password,newpassword} = req.body;

  //2、处理
  //用户是否存在
  User.findOne({username,password:md5(password)},async function(err,result){
    if(!result){
      //3、返回响应数据
      res.send({code:1,msg:'用户名或密码不正确！'});
    }
    else{
      User.updateOne({username:username},{password:md5(newpassword)},(err,result)=>{
        if(result){
          res.send({code:0,msg:"您已修改成功！"});

        }
        else if(err){
          res.send({code:0,msg:"您修改失败！"});
        }
      });


    }
  })
});
module.exports = router;
