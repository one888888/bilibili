<template>

  <div class="user-info-view">
    <navBar></navBar>
    <div class="banner"></div>
    <userDetail :userInfo="model"></userDetail>
  </div>

</template>

<script>
  import navBar from './common/navBar.vue'
  import userDetail from './userComponent/userDetail.vue'

  export default{
    data(){
      return {
        model:{}
      }
    },
    components:{
      navBar,
      userDetail
    },
    methods:{
      userInfoData(){

        const res=this.$http.get('/user/'+localStorage.getItem('id')).then((res)=>{
          this.model=res.data[0]
        })

      }
    },
    created(){
      this.userInfoData()
    }
  }

</script>

<style>
  .user-info-view .banner{
    width: 100vw;
    height: 24vw;
    background:url(../assets/img/bannerTop_new.png) center;
    background-size:cover;
  }


</style>
