(function(){
	var SUBinfo={
		getinfo(){
		},
		createxhr(options){
			var str=[];
			console.log(options)
			for(let key in options.data){
				str.push(key+"="+options.data[key]);
			}
			str=str.join("&")
			var xhr=new XMLHttpRequest();
			if(options.type.toLowerCase()==='get'){
				xhr.open(options.type,options.url+"?"+str,true);
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xhr.send()
			}
			if(options.type.toLowerCase()==='post'){
				xhr.open(options.type,options.url,true);
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xhr.send(str)
			}
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					
			        if(xhr.status == 200){
			            
			            var data=JSON.parse(xhr.response);
			            options.success(data)
			        }
			    }else{
			    	console.log(xhr);
			    	options.error(xhr)
			    }
			}
		},
		bindnode(){
			var username=document.getElementById('username').value;
			var pwd=document.getElementById('pwd').value;
			console.log(username)
			console.log(pwd)
			if(username.length<=0||username.match("^[ ]+$")||pwd.length<=0||pwd.match("^[ ]+$")){
				document.getElementById('errinfo').innerHTML="账号和密码不能为空";
				return;
			}else{
				this.createxhr({
					url:"http://127.0.0.1:8888/frontlogin/",
					data:{
						username:username,
						pwd:pwd
					},
					type:"post",
					success(res){
						console.log(res);
						if(!res.succ){
							document.getElementById('errinfo').innerHTML=res.mess;
						}else{
							//location.href="/pwatest/static/"
							location.href="/"
						}
					},
					error(data){
						console.log(data);
					}
				})
			}
		},
		getloginstate(){

		},
		bindevent(){
			let that = this;
			document.getElementById("subbtn").onclick=function(){
				that.bindnode()
			}
		}
	}
	//console.log(SUBinfo.createxhr())
	SUBinfo.bindevent()
})()