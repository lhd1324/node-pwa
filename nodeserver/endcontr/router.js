var jsonparse= require('../jsonparse');
var resdata= require('../resdata');
var ObjectID= require('mongodb').ObjectID;

module.exports = {
	endapp:{
		frontlogin(req,res,basedb){
			var body="";
			var date=new Date();
			//date.setTime(date.getTime()+8*3600*1000+5*60*1000);
			date.setTime(date.getTime()+5*60*1000);
			//date.setTime(date.getTime());
		    req.on('data', function (chunk) {
		        body += chunk;
		    });
		    req.on('end',function(chunk){
			    body=jsonparse(body);
			    console.log(body);
			    if(!body){
			    	res.end(JSON.stringify(resdata.resfail("请重新登陆!")));
			    	return;
			    }
			    var data=basedb.collection('user').find({name:body.username,pwd:body.pwd});
			    data.toArray(function(err,docs){
			    	console.log(docs)
			    	if(docs.length>0){
			    		res.setHeader("Set-Cookie",'username='+escape(body.username)+';path=/;HttpOnly;expires='+date.toGMTString());
			    		res.writeHead(200, {'Content-Type': 'text/plain,charset=utf-8' });
			    		res.end(JSON.stringify(resdata.ressucc({},"登陆成功！")));
			    	}else{
			    		res.writeHead(200, {'Content-Type': 'text/plain,charset=utf-8' });
			    		res.end(JSON.stringify(resdata.resfail("登陆失败!")));
			    	}
			    })
			})
		},
		frontoutlogin(req,res){
			var date=new Date();
			//date.setTime(date.getTime()+8*3600*1000+5*60*1000);
			date.setTime(date.getTime()-10*60*1000);
			res.setHeader("Set-Cookie",'username=;path=/;HttpOnly;expires='+date.toGMTString());
			res.writeHead(200, {'Content-Type': 'text/plain,charset=utf-8' });
			res.end(JSON.stringify(resdata.resfail("已退出!")));
		},
		login(req,res,basedb){
			var body="";
			var date=new Date();
			//date.setTime(date.getTime()+8*3600*1000+5*60*1000);
			date.setTime(date.getTime()+5*60*1000);
			//date.setTime(date.getTime());
		    req.on('data', function (chunk) {
		        body += chunk;
		    });
		    req.on('end',function(chunk){
			    body=jsonparse(body);
			    console.log(body)
			    if(!body){
			    	res.end(JSON.stringify(resdata.resfail("请重新登陆!")));
			    	return;
			    }
			    var data=basedb.collection('user').find({name:body.username,pwd:body.pwd,status:"2"});
			    data.toArray(function(err,docs){
			    	console.log(docs)
			    	if(docs.length>0){
			    		res.setHeader("Set-Cookie",'adminusername='+escape(body.username)+';path=/;HttpOnly;expires='+date.toGMTString());
			    		res.writeHead(200, {'Content-Type': 'text/plain,charset=utf-8' });
			    		res.end(JSON.stringify(resdata.ressucc({},"登陆成功！")));
			    	}else{
			    		res.writeHead(200, {'Content-Type': 'text/plain,charset=utf-8' });
			    		res.end(JSON.stringify(resdata.resfail("登陆失败!该用户不存在，或者不是管理员")));
			    	}
			    })
			})
		},
		getuserinfo(req,res,basedb){
			var cookie=jsonparse(req.headers.cookie);
			if(cookie){
				if(cookie.adminusername){
					var body=""
					var data=basedb.collection('user').find({name:cookie.adminusername},{pwd:0});
					data.toArray(function(err,docs){
					    //console.log(docs)
					    if(docs.length>0){
					    	res.end(JSON.stringify(resdata.ressucc({data:docs},"获取成功！")));
					    }else{
					    	res.end(JSON.stringify(resdata.resfail("获取失败")));
					    }
					})
		    	}
			}
		},
		outlogin(req,res){
			var date=new Date();
			//date.setTime(date.getTime()+8*3600*1000+5*60*1000);
			date.setTime(date.getTime()-10*60*1000);
			res.setHeader("Set-Cookie",'adminusername=;path=/;HttpOnly;expires='+date.toGMTString());
			res.writeHead(200, {'Content-Type': 'text/plain,charset=utf-8' });
			res.end(JSON.stringify(resdata.resfail("已退出!")));
		},
		createuser(req,res,basedb){
			var body=""
		    req.on('data', function (chunk) {
		        body += chunk;
		    });
		    req.on('end',function(){
			    body=jsonparse(body);
			    basedb.createCollection('user',function(err,res){
		    		if(err){
		    			return;
		    		}else{
		    		}
		    	});
		    	var data=basedb.collection('user').find({name:body.name});
				    data.toArray(function(err,docs){
				    if(docs.length>0){
				    	res.end(JSON.stringify(resdata.resfail(body.name+"已存在!")));
				    }else{
				    	try{
					    	basedb.collection('user').insert({name:body.name,pwd:"123456",groupid:body.groupid});
					    	res.end(JSON.stringify(resdata.ressucc({},"创建成功！")));
					    } catch(e) {
					    	res.end(JSON.stringify(resdata.resfail("创建失败!")));
					    }
				    }
				})
			})
		},
		updateuser(req,res,basedb){
			var body=""
		    req.on('data', function (chunk) {
		        body += chunk;
		    });
		    req.on('end',function(){
			    body=jsonparse(body);
			    console.log(body);
			    var data=basedb.collection('user').update({_id:ObjectID(body.id)},{"$set":{name:body.name,groupid:body.groupid}})
			    .then(function(result){
			    	console.log(result.result)
				    res.end(JSON.stringify(resdata.ressucc(result.result,"修改成功！")));
			    });
			})
		},
		deluser(req,res,basedb){
			var body=""
		    req.on('data', function (chunk) {
		        body += chunk;
		    });
		    req.on('end',function(){
			    body=jsonparse(body);
			    var data=basedb.collection('user').find({_id:ObjectID(body.id)});
			    data.toArray(function(err,docs){
				    if(docs.length>0){
				    	basedb.collection('user').remove({_id:ObjectID(body.id)})
				    	.then(function(result){
				    		console.log(result.result)
				    		res.end(JSON.stringify(resdata.ressucc(result.result,"删除成功！")));
				    	});
				    }else{
				    	res.end(JSON.stringify(resdata.resfail("删除失败!")));
				    }
				})
			})
		},
		searchuser(req,res){

		},
		setadmin(req,res,basedb){
			var body=""
		    req.on('data', function (chunk) {
		        body += chunk;
		    });
		    req.on('end',function(){
			    body=jsonparse(body);
			    console.log(body);
			    var data=basedb.collection('user').update({_id:ObjectID(body.id)},{"$set":{status:body.status}})
			    .then(function(result){
			    	console.log(result.result)
				    res.end(JSON.stringify(resdata.ressucc(result.result,"设置成功！")));
			    });
			})
		},
		searchuserlist(req,res,basedb){
			var body=""
			req.on('data', function (chunk) {
		        body += chunk;
		    });
		    req.on('end',function(){
		    	body=jsonparse(body);
		    	console.log(body)
		    	if(!body||!body.groupid){
			    	var data=basedb.collection('user').find({},{pwd:0});
			    }else{
			    	var data=basedb.collection('user').find({groupid:body.groupid},{pwd:0});
			    }
				data.toArray(function(err,docs){
				    //console.log(docs)
				    //if(docs.length>0){
				    	res.end(JSON.stringify(resdata.ressucc({data:docs},"获取成功！")));
				    //}else{
				    //	res.end(JSON.stringify(resdata.resfail("获取失败")));
				    //}
				})
			})
		},
		searchgrouplist(req,res,basedb){
			var body=""
		    //req.on('end',function(){
		    	var data=basedb.collection('groupcon').find();
				    data.toArray(function(err,docs){
				    	//console.log(docs)
				    if(docs.length>0){
				    	res.end(JSON.stringify(resdata.ressucc({data:docs},"获取成功！")));
				    }else{
				    	res.end(JSON.stringify(resdata.resfail("获取失败")));
				    }
				})
			//})
		},
		creategroup(req,res,basedb){
			var body=""
		    req.on('data', function (chunk) {
		        body += chunk;
		    });
		    req.on('end',function(){
		    	body=jsonparse(body);
			    basedb.createCollection('groupcon',function(err,res){
		    		if(err){

		    			return;
		    		}else{
		    		}
		    	});
		    	var data=basedb.collection('groupcon').find({groupname:body.groupname});
				    data.toArray(function(err,docs){
				    	//console.log(docs)
				    if(docs.length>0){
				    	res.end(JSON.stringify(resdata.resfail(body.groupname+"已存在!")));
				    }else{
				    	try{
					    	basedb.collection('groupcon').insert({groupname:body.groupname});
					    	res.end(JSON.stringify(resdata.ressucc({},"创建成功！")));
					    } catch(e) {
					    	res.end(JSON.stringify(resdata.resfail("创建失败!")));
					    }
				    }
				})
			})
		},
		updategroup(req,res,basedb){
			var body=""
		    req.on('data', function (chunk) {
		        body += chunk;
		    });

		    req.on('end',function(){
			    body=jsonparse(body);
			    console.log(body);
			    var data=basedb.collection('groupcon').update({_id:ObjectID(body.id)},{"$set":{groupname:body.groupname}})
			    .then(function(result){
			    	console.log(result.result)
				    res.end(JSON.stringify(resdata.ressucc(result.result,"修改成功！")));
			    });
			})
		}
	},
}