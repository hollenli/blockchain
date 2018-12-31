var express = require('express');
var router = express.Router();

var controller = require("../models/controller");

router.get('/', function(req, res, next) {  
  if(!!req.session.user){
    if(!!req.query.username){
      if(req.session.user.username === req.query.username){
        res.render("detail", {account:req.session.user.username});
      }
      else{
        res.render("error", {error:{stack:"只能访问自己的数据！"}});
      }
    }
    else{
      res.redirect("/?username=" + req.session.user.username);
    }
  }
  else{
    res.render("detail", {account:'null'});
  }
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.get('/regist', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res, next){
  console.log(req.body);
  if(!!req.body.signout){
    req.session.destroy(function(){
      res.clearCookie("mycookie");
      res.redirect('/');
    });
  }
});

router.post('/signin', function(req, res, next) {
  var user = req.body;
  if(!!user.signin){
    try{
      controller.checkUser(user).then(function(data){
        req.session.regenerate(function(err){
            req.session.user = user;
            res.redirect("/?username=" + user.username);
          });
      })
      .catch(function(err){
        res.render('signin', {errUn:err,errPw:'Wrong password!'});
      });
    }
    catch(err){
      res.render('signin', {errUn:'The address does not exist!',errPw:err});
    }
  }
});

router.post('/regist', function(req, res, next) {
  var user = req.body;
  if (!!user.signup) {
    controller.addUser(user).then(function(data){
        res.render('register', {account:data});
      })
      .catch(function(err){
        console.log(err);
        res.render('register', {account:'failed!'});
      });
  }
});

module.exports = router;
