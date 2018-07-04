var jsonparse= require('../jsonparse');
var resdata= require('../resdata');
//var ObjectID= require('mongodb').ObjectID;

module.exports = {
	auth(ws,req,basedb){
		var cookie=jsonparse(req.headers.cookie);
		if(cookie){
			if(cookie.username){
				return true;
			}else{
				ws.send(JSON.stringify(resdata.resfail("登陆失效")));
				ws.close();
				return false;
			}
		}else{
			ws.send(JSON.stringify(resdata.resfail("登陆失效,请登录！")));
			ws.close();
			return false;
		}
	}
}