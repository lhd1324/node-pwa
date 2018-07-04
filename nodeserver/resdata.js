
module.exports = {
	ressucc(data,mes){
		return {
			data:data,
			message:mes,
			succ:true
		}
	},
	resfail(mes,code){
		console.log(code)
		if(!code){
			code=0;
		}
		return {
			mess:mes,
			succ:false,
			code:code
		}
	}
}