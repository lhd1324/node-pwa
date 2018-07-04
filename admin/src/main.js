// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created(){

  },
  methods:{
  	createxhr(options){
		var str=[];
		var baseurl="http://127.0.0.1:8888"
		for(let key in options.data){
			str.push(key+"="+options.data[key]);
		}
		str=str.join("&")
		var xhr=new XMLHttpRequest();
		if(options.type.toLowerCase()==='get'){
			xhr.open(options.type,baseurl+options.url+"?"+str,true);
			xhr.setRequestHeader("Content-type","application/json");
			xhr.send()
		}
		if(options.type.toLowerCase()==='post'){
			xhr.open(options.type,baseurl+options.url,true);
			xhr.setRequestHeader("Content-type","application/json");
			xhr.send(str)
		}
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
		        if(xhr.status == 200){
		        	var data=JSON.parse(xhr.response);
		        	if(!data.succ&&data.code=="1001"){
		        		location.href="/static/login.html";
		        	}else{
			            options.success(data)
			        }
		        }
		    }else{
		    	options.error(xhr)
		    }
		}
	}
  }
})
