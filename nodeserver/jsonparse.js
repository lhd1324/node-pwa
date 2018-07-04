
module.exports = function(body){
	if(body){
		body=body.replace(/=/g,":'");
		body=body.replace(/&/g,"',");
		body=body.replace(/;/g,"',");
		body="{"+body+"'}";
		function strToJson(str){ 
		    var json = (new Function("return " + str))(); 
		    return json; 
		}
		body=strToJson(body);
		return body;
	}else{
		return null;
	}
}