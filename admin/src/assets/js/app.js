export default {
  name: 'App',
  data(){
  	return {
  		username:"",
  		userid:"",
  		userinfo:{}
  	}
  },
  created(){
  	let that = this;
  	that.getuserinfo();
  },
  methods:{
  	getuserinfo(){
  		let that = this;
		this.$root.createxhr({
			url:"/getuserinfo/",
			data:{
			},
			type:"post",
			success(res){
				console.log(res)
				if(res.succ){
					that.userinfo=res.data.data[0];
				}
			},
			error(data){
				console.log(data)
			}
		});
  	}
  }
}
