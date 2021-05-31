<template>

  <div class="comment-title-container">
    <p class="comment-title">
      <span>评论</span>
      <span>({{dataLength}})</span>
    </p>
    <div class="comment-info" >
      <img :src="myuser.user_img" v-if="myuser">
      <img src="../../assets/img/noface.jpg" v-else>
      <input
      v-model="comContent"
      placeholder="说点什么..."
      ref="postInput"
      >
      <button @click="commentPublish">发表</button>
    </div>
  </div>

</template>

<script>

  export default{
    props:['dataLength'],
    data(){
      return {
        myuser:null,
        comContent:''
      }
    },
    methods:{
      myUserInfo(){
        const res=this.$http.get('/user/'+localStorage.getItem('id')).then((res)=>{
          this.myuser=res.data[0]
        })
      },
      commentPublish(){
        if(!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')){
          this.$msg.fail('请先登录')
          return
        }

        this.$emit('postComment',this.comContent)
        this.comContent=''
      },
      focusInput(){
        this.$refs.postInput.focus()

      }
    },
    created(){
      if(localStorage.getItem('token')){
        this.myUserInfo()
      }

    },
    updated(){

    }
  }

</script>

<style>

  .comment-title-container{
    padding:2vw;
  }

  .comment-title-container .comment-title{
    color:#505050;
    font-size:3.85vw;
  }

  .comment-title-container .comment-info{
    display: flex;
    margin:3vw 0;
  }

  .comment-title-container .comment-info img{
    width:9vw;
    height:9vw;
    border-radius:50%;
  }

  .comment-title-container .comment-info input{
    outline: none;
    border:0;
    background:#f4f4f4;
    border-radius:4vw;
    font-size:3.6vw;
    text-indent: 3vw;
    margin:0 3vw;
    flex:1
  }

  .comment-title-container .comment-info button{
    background:#fb7299;
    outline: none;
    border:0;
    color: #fff;
    font-size:3.6vw;
    padding:0 5vw;
    margin-left: auto;
    border-radius: 4vw;
  }

</style>
