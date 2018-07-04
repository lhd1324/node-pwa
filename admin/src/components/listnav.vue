<template>
  <div class="content">
  	<div class="leftbox">
  		<ul>
  			<li @click="curgroupid=''">所有成员</li>
  			<li @click="curgroupid=$parent.userinfo.groupid">我组成员</li>
  			<li v-for="(ele,index) in grouplist" @click="curgroupid=ele._id">{{ele.groupname}}</li>
  		</ul>
  	</div>
  	<div class="rightbox">
  		<div class="grouplist" v-for="(ele,index) in userlist">
  			<div class="headimg" v-if="ele.headimg">
  				<img :src="'http://127.0.0.1:8666/'+ele.headimg" />
  			</div>
  			<div class="personinfo">
  				<p><strong>姓名:</strong>{{ele.name}}</p>
  				<p><strong>邮箱:</strong>{{ele.email}}</p>
  				<p v-if="ele.phone"><strong>联系电话:</strong>{{ele.phone}}</p>
  				<p class="detailsinfo" v-if="ele.details"><strong>其他信息:</strong>{{ele.details}}</p>
  			</div>
  			<div class="operationbox" v-if="ele.groupid==$parent.userinfo.groupid">
  				<a v-if="ele.status!=2" @click="setadmin(ele,2)" class="set" title="设置为管理员"></a>
          <a v-if="ele.status==2" @click="setadmin(ele,1)" class="exit" title="取消管理员"></a>
  				<a class="del" title="删除该成员" ></a>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script src="../assets/js/listnav.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped> @import '../assets/css/listnav.less'; </style>
