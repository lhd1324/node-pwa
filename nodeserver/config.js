module.exports = {
	config:{
		url:"127.0.0.1",//数据库ip
		dbname:"pwa",
		port:"27017",
		root:"",
		password:"123456",
		db:null
	},
	connectdb(option){
		var basedata=null;
		MongoClient.connect('mongodb://'+option.url+":"+option.port,function(err,db){  /*连接数据库*/
	        if(err){
	            return;
	        }
	        var basedb=db.db(option.dbname);
	        if(basedb){
		        return basedata;
		    }else{
		    	return null;
		    }
	    })
	}
}