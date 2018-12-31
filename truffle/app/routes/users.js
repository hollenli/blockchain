var express = require('express');
var router = express.Router();

var controller = require("../models/controller");

router.get('/getbalance', function(req, res, next) {
	var para = req.session.user;
	try{
		controller.getBalance(para).then(function(data){
			res.send(data);
		})
	}
	catch(err){
		res.send(err);
	};
	
});

router.post('/create', function(req, res, next) {
	var para = req.session.user;
	para.price = parseInt(req.body.price);
	para.percentage = parseInt(req.body.percentage);
	try{
		controller.createContract(para).then(function(data){
			res.send(data);
		})
	}
	catch(err){
		res.send(err);
	};
	
});

router.post('/getprice', function(req, res, next) {
	var para = req.body;
	para.username = req.session.user.username;
  	try{
		controller.getPrice(para).then(function(data){
			res.send(data);
		})
	}
	catch(err){
		console.log(err);
		res.send(err);
	};
});

router.post('/setprice', function(req, res, next) {
	var para = req.body;
	para.price = parseInt(req.body.price);
	para.username = req.session.user.username;
  	try{
		controller.setPrice(para).then(function(data){
			res.send('OK');
		})
	}
	catch(err){
		console.log(err);
		res.send(err);
	};
});

router.post('/getpercentage', function(req, res, next) {
  	var para = req.body;
	para.username = req.session.user.username;
  	try{
		controller.getPercentage(para).then(function(data){
			res.send(data);
		})
	}
	catch(err){
		console.log(err);
		res.send(err);
	};
});

router.post('/setpercentage', function(req, res, next) {
	var para = req.body;
	para.percentage = parseInt(req.body.percentage);
	para.username = req.session.user.username;
  	try{
		controller.setPercentage(para).then(function(data){
			res.send('OK');
		})
	}
	catch(err){
		console.log(err);
		res.send(err);
	};
});

router.post('/addhospital', function(req, res, next) {
	var para = req.body;
	para.username = req.session.user.username;
  	try{
		controller.addHospital(para).then(function(data){
			res.send('OK');
		})
	}
	catch(err){
		console.log(err);
		res.send(err);
	};
});

router.post('/addperson', function(req, res, next) {
	var para = req.body;
	para.value = parseInt(req.body.value);
	para.username = req.session.user.username;
  	try{
		controller.addPerson(para).then(function(data){
			res.send('OK');
		})
	}
	catch(err){
		console.log(err);
		res.send('error');
	};
});

router.post('/givebill', function(req, res, next) {
	var para = req.body;
	para.value = parseInt(req.body.value);
	para.username = req.session.user.username;
  	try{
		controller.giveBill(para).then(function(data){
			res.send('OK');
		})
	}
	catch(err){
		console.log(err);
		res.send('error');
	};
});

router.post('/checkfee', function(req, res, next) {
	var para = req.body;
	para.username = req.session.user.username;
	console.log(para);
  	try{
		controller.checkFee(para).then(function(data){
			res.send(data);
		})
	}
	catch(err){
		console.log(err);
		res.send('error');
	};
});

router.post('/pay', function(req, res, next) {
	var para = req.body;
	para.value = parseInt(req.body.value);
	para.username = req.session.user.username;
  	try{
		controller.pay(para).then(function(data){
			res.send('OK');
		})
	}
	catch(err){
		console.log(err);
		res.send('error');
	};
});

module.exports = router;
