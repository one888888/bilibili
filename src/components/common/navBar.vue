<template>

  <div class="nav-bar-container">
    <div class="logo flex-center">
      <span
      class="iconfont icon-bilibili"
      v-if="$route.fullPath!='/home'"
      @click="goHome"
      ></span>
      <span
      v-else
      class="iconfont icon-bilibili"
      ></span>
    </div>
    <div>
      <span class="iconfont icon-sousu"></span>
    </div>
    <div class="flex-center">
      <img :src="imgUrl" @click="$router.push('/edit')" v-if="imgUrl">
      <img src="../../assets/img/noface.jpg" v-else @click="$router.push('/login')">
    </div>
    <div class="flex-center">
      <button>下载 App</button>
    </div>
  </div>

</template>

<script>

  export default{
    data(){
      return{
        imgUrl:''
      }
    },
    methods:{
      goHome(){
        this.$router.push('/home');
        this.$router.go(0);
      },
    },
    mounted(){
      if(localStorage.getItem('token')){
        const res=this.$http.get('/user/'+localStorage.getItem('id')).then((res)=>{
          this.imgUrl=res.data[0].user_img
        })
      }
    }

  }

</script>

<style>

  @import url("../../assets/css/iconfont.css");

  .nav-bar-container{
    height:.9rem;
    background: #fff;
    display: flex;
    padding:0 .2rem;
  }

  .nav-bar-container .logo .icon-bilibili{
    font-size:.65rem;
    color:#fb7299;
  }

  .nav-bar-container>div:nth-of-type(2){
    flex:1;
    display: flex;
    align-items: center;
    position: relative;
  }

  .nav-bar-container>div:nth-of-type(2) span{
    color:#aaa;
    position: absolute;
    right:10px;
    padding:10px;
    font-size:.4rem;
  }

  .nav-bar-container>div:nth-of-type(3) img{
    width:.5rem;
    border-radius:50%;
  }

  .nav-bar-container>div:nth-of-type(4){
    margin-left:.3rem
  }

  .nav-bar-container>div:nth-of-type(4) button{
    width: 1.7rem;
    height: .5rem;
    background: #fb7299;
    border: none;
    border-radius:.1rem;
    color: #fff;
    font-size:.28rem;
  }





</style>
