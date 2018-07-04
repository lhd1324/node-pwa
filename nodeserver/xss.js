var jsonparse= require('./jsonparse');

module.exports = function(body){
	if(body){
		var word={'label':{"script":true,"a":false,"link":true,"em":true,}}
		console.log(body);
		//var body=jsonparse(body);
		function filterword(ele){
			var ele=ele;
			for(let key in word.label){
				if(word.label[key]){
					var reg=new RegExp('<'+key,"gi")
					ele=ele.replace(reg,"< "+key)
					var reg=new RegExp('</'+key,"gi")
					ele=ele.replace(reg,"< / "+key)
				}
			}
			return ele;
		}
		for(let key in body){
			body[key]=filterword(body[key])
		}
		console.log(body);
		return body;
	}else{
		return null;
	}
}