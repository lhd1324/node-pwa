var req=require("http");
var MongoClient = require('mongodb').MongoClient;  /*引入数据库 MongoClient*/
var DBconfig= require('./config');
var router= require('./endcontr/router');
var fontrouter= require('./frontcontr/router');
var auth= require('./frontcontr/auth');
var adminauth= require('./endcontr/auth');
var xss= require('./xss');
var static= require('./static');
var WS=require("ws").Server;
console.log(WS)
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
    var pathname=request.url.replace(/\//,"");
    console.log(pathname);
    if(pathname==""||/static/.test(pathname)||/pwatest/.test(pathname)){
        static(request,res,pathname)
    }else{
        res.setHeader("Access-Control-Allow-Origin","*");
        res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
        res.setHeader("Access-Control-Allow-Methods","POST,GET,OPTIONS");
        pathname=pathname.replace("/","")
        if(pathname!="login"&&pathname!="frontlogin"){
            var status=adminauth.auth(request,res);
            if(status){
                //router.endapp[pathname](request,res,basedb);
                try{
                    router.endapp[pathname](request,res,basedb);
                }catch(e){
                    res.end('{"mess":"頁面不存在","succ":"false"}')
                }
            }else{
            }
        }else{
            console.log("88888")
            router.endapp[pathname](request,res,basedb);
        }
    }
    //router.endapp[pathname](request,res,basedb);
}).listen(8888)

//创建websocket
/*
var wsserver=req.createServer(function(request,res){
    var pathname=request.url.replace(/\//g,"");
}).listen(81)
*/
wss = new WS({ port:80 });
wss.on('connection', function (ws,request) {
    //console.log(req.url)
    var pathname=request.url.replace(/\//g,"");
    var status=auth.auth(ws,request,basedb);
    if(status){
        ws.on('message', function (message) {
            if(pathname!="uploadheadimg"){
                message=xss(JSON.parse(message))
            }
            console.log(message);
            console.log("received:%s",message);
            fontrouter.frontapp[pathname](ws,message,basedb,request);
        });
    }else{
        ws.close();
        console.log("失败")
    }
});




