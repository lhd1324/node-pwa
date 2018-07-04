<template>
  <div class="content">
  	<div class="leftbox">
  		<ul>
  			<li @click="curstate=1">我创建的账号</li>
        <li @click="curstate=2">创建账号</li>
  			<li @click="curstate=3">分组管理</li>
  		</ul>
  	</div>
  	<div class="rightbox">
      <div class="useradmin" v-if="curstate==1">
    		<div class="userbox">
          <table>
            <thead><tr><th>用户名</th><th>所属组别</th><th>操作</th></tr></thead>
            <tbody>
              <tr v-for="(element,index) in  userlist">
                <td>
                  <input type="text" v-model="curuser.name" v-if="curuser.id==element._id&&curuser.editstate"/>
                  <span v-else>{{element.name}}</span>
                </td>
                <td>
                  <div class="groupsel" v-if="curuser.id==element._id&&curuser.editstate">
                    <h4 @click="curuser.groupstate=curuser.groupstate?false:true">{{curuser.groupname?curuser.groupname:""}}</h4>
                    <ul v-if="curuser.groupstate">
                      <li v-for="(ele,index) in grouplist" @click="selcurgroup(ele)">{{ele.groupname}}</li>
                    </ul>
                  </div>
                  <span v-else>{{element.groupname}}</span>
                </td>
                <td class="edit">
                  <a @click="editcuruser(element)" v-if="curuser.id!=element._id||!curuser.editstate">编辑</a>
                  <a @click="delcuruser(element)" v-if="curuser.id!=element._id||!curuser.editstate">删除</a>
                  <a v-if="curuser.id==element._id&&curuser.editstate" @click="updatecuruser()">修改</a>
                  <a v-if="curuser.id==element._id&&curuser.editstate" @click="exitchange()">取消</a>
                </td>
              </tr>
            </tbody>
          </table>
    		</div>
      </div>

      <div class="useradmin" v-if="curstate==2">
        <div class="userbox">
          <ul>
            <li><strong>用户名:</strong><input type="text" v-model="adduser.name"></li>
            <li>
              <strong>组别:</strong>
              <div class="groupsel">
                <h4 @click="adduser.groupstate=adduser.groupstate?false:true">{{adduser.groupname?adduser.groupname:""}}</h4>
                <ul v-if="adduser.groupstate">
                  <li v-for="(element,index) in grouplist" @click="addcurgroup(element)">{{element.groupname}}</li>
                </ul>
              </div>
            </li>
            <li><span class="edit"><a @click="createuser">添加</a></span></li>
          </ul>
        </div>
      </div>

      <div class="groupadmin" v-if="curstate==3">
        <div class="userbox">
          <ul>
            <li v-for="(element,index) in grouplist">
              <strong>组名:</strong>
              <span class="username" v-if="curgroup.groupid!=element._id" @click="selcurgroup(element)">{{element.groupname}}</span>
              <input type="text" v-model="curgroup.groupname" v-if="curgroup.groupid==element._id"> 
              <span class="edit" v-if="curgroup.groupid==element._id"><a @click="updategroup()">修改</a><a @click="exitselgroup()">取消</a></span>
            </li>
          </ul>
        </div>
        <div class="userbox">
          <ul>
            <li><strong>分组名:</strong><input type="text" v-model="groupname"> <span class="edit"><a @click="creategroup()">保存</a></span></li>
          </ul>
        </div>
      </div>
  	</div>
    <errortip :message.sync="errormsg"  v-if="errormsg.length>0"></errortip>
  </div>
</template>

<script src="../assets/js/adminav.js"></script>
<style lang="less" scoped> @import '../assets/css/adminav.less'; </style>
