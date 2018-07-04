var jsonparse= require('../jsonparse');
var xss= require('../xss');
var resdata= require('../resdata');
var ObjectID= require('mongodb').ObjectID;
var fs= require('fs');

module.exports = {
	frontapp:{
		login(ws,mes,basedb,req){
			var cookie=jsonparse(req.headers.cookie);
			ws.send(JSON.stringify(resdata.ressucc({username:unescape(cookie.username)},"登录成功")));
			//ws.send(JSON.stringify(resdata.resfail("转到登录页")));
		},
		outlogin(ws,mes,basedb){
			ws.close()
		},
		searchuser(ws,mes,basedb){
			if(!mes||!mes.groupid){
				var data=basedb.collection('user').find({},{pwd:0});
			}else{
			    var data=basedb.collection('user').find({groupid:mes.groupid},{pwd:0});
			}
			data.toArray(function(err,docs){
				
				ws.send(JSON.stringify(resdata.ressucc({data:docs},"获取成功！")));
			})
		},
		//根据关键字匹配用户
		keysearchuser(ws,mes,basedb){
			if(!mes||!mes.key){
				var data=basedb.collection('user').find({},{pwd:0});
			}else{
				var text=new RegExp(mes.key,"i")
			    //var data=basedb.collection('user').find({$orgroupid:mes.groupid},{pwd:0});
			    var data=basedb.collection('user').find({$or:[{name:text},{email:text}]},{pwd:0});
			}
			data.toArray(function(err,docs){
				
				ws.send(JSON.stringify(resdata.ressucc({data:docs},"获取成功！")));
			})
		},
		searchgrouplist(ws,mes,basedb){
		    var data=basedb.collection('groupcon').find();
			    data.toArray(function(err,docs){
			    if(docs.length>0){
			    	ws.send(JSON.stringify(resdata.ressucc({data:docs},"获取成功！")));
			    }else{
			    	ws.send(JSON.stringify(resdata.resfail("获取失败")));
			    }
			})
		},
		//获取个人详情
		getdetail(ws,mes,basedb){
			var data=basedb.collection('user').find({_id:ObjectID(mes.id)},{pwd:0});
			    data.toArray(function(err,docs){
			    if(docs.length>0){
			    	ws.send(JSON.stringify(resdata.ressucc({data:docs},"获取成功！")));
			    }else{
			    	ws.send(JSON.stringify(resdata.resfail("获取失败")));
			    }
			})
		},
		//获取当前用户详情
		getuserdetail(ws,mes,basedb,req){
			var cookie=jsonparse(req.headers.cookie);
			//5aba2bae5eb6e31ad00e3151
			var data=basedb.collection('user').find({name:unescape(cookie.username)},{pwd:0});
			    data.toArray(function(err,docs){
			    	
			    if(docs.length>0){
			    	ws.send(JSON.stringify(resdata.ressucc({data:docs},"获取成功！")));
			    }else{
			    	ws.send(JSON.stringify(resdata.resfail("获取失败")));
			    }
			})
		},
		updatedetail(ws,mes,basedb,req){
			var cookie=jsonparse(req.headers.cookie);
			var data=basedb.collection('user').update({name:unescape(cookie.username)},{"$set":{job:mes.job,phone:mes.phone,email:mes.email,detail:mes.detail}})
			    .then(function(result){
			    	
				    ws.send(JSON.stringify(resdata.ressucc(result.result,"修改成功！")));
			    });
		},
		uploadheadimg(ws,mes,basedb,req){
			var cookie=jsonparse(req.headers.cookie);
			var time=new Date().getTime();
			fs.writeFile("/pwatest/headimg/"+time+unescape(cookie.username)+".png",mes,function(err){
				if(err){
					console.log(err)
				}else{
					var data=basedb.collection('user').update({name:unescape(cookie.username)},{"$set":{headimg:time+unescape(cookie.username)+".png"}})
				    .then(function(result){
					    ws.send(JSON.stringify(resdata.ressucc({headimg:time+unescape(cookie.username)+".png"},"上传成功！")));
				    });
					console.log("保存成功")
				}
			})
		}
	}
}