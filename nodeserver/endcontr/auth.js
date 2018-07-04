var jsonparse= require('../jsonparse');
var resdata= require('../resdata');
//var ObjectID= require('mongodb').ObjectID;

module.exports = {
	auth(req,res){
		var cookie=jsonparse(req.headers.cookie);
		if(cookie){
			if(cookie.adminusername){
				return true;
			}else{
				res.end(JSON.stringify(resdata.resfail("请重新登陆!",1001)));
				return false;
			}
		}else{
			res.end(JSON.stringify(resdata.resfail("请重新登陆!",1001)));
			return false;
		}
	}
}