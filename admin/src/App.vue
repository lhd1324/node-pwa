<template>
  <div id="app">
    <div class="nav">
    	<a class="logo"></a>
    	<nav><router-link :to="{ name: 'listnav'}">成员列表</router-link><router-link :to="{ name: 'adminav'}">管理面板</router-link></nav>
    	<div class="personal">
    		<img src="">
    		<span class="">{{userinfo.name}}</span>
    		<a href="/static/login.html">退出</a>
    	</div>
    </div>
    <router-view/>
  </div>
</template>

<script src="./assets/js/app.js"></script>

<style lang="less" > @import './assets/css/reset.less'; </style>
<style lang="less" scoped> @import './assets/css/app.less'; </style>
