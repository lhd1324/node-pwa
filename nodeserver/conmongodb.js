var req=require("http");
var MongoClient = require('mongodb').MongoClient;  /*引入数据库 MongoClient*/
var DBconfig= require('./config');
var basedb=null; //初始化数据库

//连接数据库
connectdb(DBconfig.config)
function connectdb(option){
    var basedata=null;
    MongoClient.connect('mongodb://'+option.url+":"+option.port,function(err,db){  /*连接数据库*/
        if(err){
            console.log(err);
            return;
        }
        basedb=db.db(option.dbname);
    })
}

req.createServer(function(request,res){
    var data=basedb.collection('pwa').find();
    data.toArray(function(err,docs){
        var aaa=JSON.stringify(docs);
            res.write(aaa)
            res.end();
    })
}).listen(8888)