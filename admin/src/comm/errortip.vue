<template>
<transition name="fade">
  <div class="deltips" v-if="message.length>0">
    <p>{{message}}</p>
    <!-- <span class="del-ok" @click.stop="ok()">确定</span>
    <span class="del-exit" @click.stop="exit()">取消</span> -->
  </div>
</transition>
</template>

<script>
export default {
  name: 'errortip',
  props: [
    'message'
  ],
  data () {
    return {
      msg: '',
      showstate:true
    }
  },
  created(){
  },
  mounted:function(){
  },
  methods:{
    ok:function(){
      var that = this;
      that.$emit('ok');
    },
    exit:function(){
      var that = this;
      that.$emit('exit');
    }
  }
}
</script>
<style lang="less" scoped>
  .deltips{
    position:absolute;
    min-width:220px;
    /*height:60px;*/
    border: 1px solid #dc8b8b;
    text-align:center;
    background-color:#fff;
    z-index: 100;
    top:50%;
    left:50%;
    border-radius: 100px;
    transform:translate(-50%,-50%);
    p{
      line-height: 25px;
      margin:10px 15px 10px;
      text-align: center;
      color:#e25f50;
    }
    span{
      display:inline-block;
      width:45px;
      height:25px;
      line-height: 25px;
      margin:0 10px;
    }
    .del-ok{
      background-color:#5896ff;
      color:#fff;
      cursor: pointer;
    }
    .del-exit{
      background-color:#e0e0e0;
      color:#333;
      cursor: pointer;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>