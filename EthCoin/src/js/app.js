App = {
  web3Provider: null,
  contracts: {},
  account:'0x0',

  init:function() {
    return App.initWeb3();

    },

  initWeb3: async function() {
    if(typeof web3 !== 'undefined'){
      App.web3Provider=web3.currentProvider;
      web3=new Web3(web3.currentProvider);
    }
    else{
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3=new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("sheeraCoin.json", function(sheeraCoin){
      App.contracts.sheeraCoin = TruffleContract(sheeraCoin);
      App.contracts.sheeraCoin.setProvider(App.web3Provider);
      return App.render();
    });
  },

  render:function(){
    web3.eth.getCoinbase(function (err, account){
      if(err == null){
        console.log(account);
        console.log(web3.eth.accounts);
      }
    });
  },
  createAccount:function(){var coin_instance;
  App.contracts.sheeraCoin.deployed().then(function(instance){
    coin_instance=instance;
    var cust_name=document.getElementById("cust_name").value;
    var cust_pin=document.getElementById("cust_pin").value;
    return coin_instance.createAccount(cust_name,cust_pin)
  }).then(function(txn){
    if(txn.receipt.status == "0x1"){
      alert("Account successfully created!");
    }
    else{
      alert("failed");
    }
  })},

  checkBalance:function(){var coin_instance;
    App.contracts.sheeraCoin.deployed().then(function(instance){
    coin_instance = instance;
    var bal_pin=document.getElementById("bal_pin").value;
    var balance;
    return coin_instance.checkBalance(bal_pin)
  }).then(function(out){
      alert(Number(out))
  })},

  transferMoney:function(){var coin_instance;
  App.contracts.sheeraCoin.deployed().then(function(instance){
    coin_instance = instance;
    var receiver_address = document.getElementById("receiver_address").value;
    var amount = document.getElementById("amount").value;
    var pin = document.getElementById("pin").value;
    return coin_instance.transfer_coin(receiver_address,amount,pin)
  }).then(function(txn){
    if(txn.receipt.status == "0x1"){
      alert("Transfer successful!");
    }
    else{
      alert("failed");
    }
  })}
};
$(function() {
  $(window).load(function() {
    App.init();
  });
});
