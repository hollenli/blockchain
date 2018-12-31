var querystring = require('querystring');
var url = require('url');

var Web3 = require("web3");
// 创建web3对象
var web3 = new Web3();
// 连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

//var contract = require('truffle-contract');
var insurance = require('./../../build/contracts/insurance');

controller = {};
myContract = null;

web3.eth.getAccounts(console.log);

function getContract(para) {
  if (myContract == null || myContract.options.address != para.address) {
    myContract = new web3.eth.Contract(insurance.abi,para.address);
  }
}

controller.addUser = function(user) {
  return web3.eth.personal.newAccount(user.password).then(function(data) {
    return Promise.resolve(data);
  });
};

controller.getBalance = function(user) {
  return web3.eth.getBalance(user.username).then(function(data) {
    return Promise.resolve(data);
  });
};

controller.checkUser = function(user) {
  return web3.eth.personal.unlockAccount(user.username,user.password,10000).then(function(err,data) {
    if (!!err) {
      web3.eth.dedaultAccount = user.username;
      return Promise.resolve(data);
    }
    else{
      return Promise.rejected(err);
    }
  });
};

controller.createContract = function(para) {
  console.log(para)
  myContract = new web3.eth.Contract(insurance.abi);
  return myContract.deploy({
    data:insurance.bytecode,
    arguments:[para.price,para.percentage]
  })
  .send({
    from:para.username,
    gas:15000000
  })
  .on('transactionHash', function(transactionHash){
    console.log("deploy transaction hash: ", transactionHash)
  })
  .on('receipt', function(receipt){
    console.log("deploy receipt: ", receipt)
  })
  .on('confirmation', function(confirmationNum, receipt){
    console.log("got confirmations number: ", confirmationNum)
  })
  .then(function(instance){
    return Promise.resolve(instance.options.address);
  });
};

controller.getPrice = function(para) {
  getContract(para);
  return myContract.methods.getPrice().call({from:para.username}, function(err,data){
    return Promise.resolve(data);
  });
};

controller.setPrice = function(para) {
  getContract(para);
  return myContract.methods.setPrice(para.price).send({from:para.username}).then(function(data){
    return Promise.resolve(data);
  });
};

controller.getPercentage = function(para) {
  getContract(para);
  return myContract.methods.getPercentage().call({from:para.username}, function(err,data){
    return Promise.resolve(data);
  });
};

controller.setPercentage = function(para) {
  getContract(para);
  return myContract.methods.setPercentage(para.percentage).send({from:para.username}).then(function(data){
    return Promise.resolve(data);
  });
};

controller.addHospital = function(para) {
  getContract(para);
  return myContract.methods.addHospital().send({from:para.username}).then(function(data){
    return Promise.resolve(data);
  });
};

controller.addPerson = function(para) {
  getContract(para);
  console.log(para);
  return myContract.methods.addPerson().send({from:para.username,value:para.value}).then(function(data){
    return Promise.resolve(data);
  });
};

controller.giveBill = function(para) {
  getContract(para);
  console.log(para);
  return myContract.methods.giveBill(para.to,para.value).send({from:para.username}).then(function(data){
    return Promise.resolve(data);
  });
};

controller.checkFee = function(para) {
  getContract(para);
  console.log(para);
  return myContract.methods.checkFee(para.to).call({from:para.username},function(err,data){
    return Promise.resolve(data);
  });
};

controller.pay = function(para) {
  getContract(para);
  console.log(para);
  return myContract.methods.pay(para.to).send({from:para.username,value:para.value}).then(function(data){
    return Promise.resolve(data);
  });
};

module.exports = controller;