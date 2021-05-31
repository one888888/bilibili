<template>

  <div class="user-detail">
    <!-- part1 -->
    <div>
      <div class="user-img">
        <img :src="userInfo.user_img" v-if="userInfo.user_img">
        <img src="../../assets/img/user.jpg" v-else>
      </div>
      <div class="user-edit">
        <div>
          <p>
            <span>--</span>
            <span>粉丝</span>
          </p>
          <i></i>
          <p>
            <span>4</span>
            <span>关注</span>
          </p>
          <i></i>
          <p>
            <span>--</span>
            <span>获赞</span>
          </p>
        </div>
        <div>
          <div class="edit-btn" @click="$router.push('/edit')">编辑资料</div>
        </div>
      </div>
    </div>

    <!-- part2 -->
    <div>
      <h2>{{userInfo.name}}</h2>
      <div class="content">
        <p>这个人很神秘，什么都没有写</p>
        <a @click="showContent" v-if="!onOff">展开</a>
        <a @click="showContent" v-else>收起</a>
      </div>
      <div class="tags" v-show="onOff">
        <span>uid:319148023</span>
      </div>
    </div>


  </div>

</template>

<script>
  export default{
    props:['userInfo'],
    data(){
      return{
        onOff:false
      }
    },
    methods:{
      showContent(){
        this.onOff=!this.onOff;
      }
    },
    created(){

    }
  }


</script>

<style>

  .user-detail{
    background:#fff;

  }

  .user-detail .user-img{
    width: 22vw;
    height: 22vw;
    border-radius: 50%;
    overflow: hidden;
    margin-right:.5rem
  }

  .user-detail>div:nth-of-type(1){
    display: flex;
    padding:0 12px;
    padding-top:12px;
  }

  .user-detail .user-edit{
    flex:1;

  }

  .user-detail .user-edit>div:nth-of-type(1){
    display: flex;
    align-items: center;
  }

  .user-detail .user-edit div p{
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size:0.26rem;
    color:#999;
  }

  .user-detail .user-edit div p span:nth-of-type(1){
    color:#212121;
    font-size:0.3rem;
  }

  .user-detail .user-edit div i{
    display: block;
    width:1px;
    height:4vw;
    background:#e7e7e7
  }

  .user-detail .edit-btn{
    background: #fff;
    border: 1px solid #fb7299;
    color: #fb7299;
    height: 8vw;
    line-height: 8vw;
    box-sizing: border-box;
    border-radius: 1.06667vw;
    font-size: 3.73333vw;
    margin-top: 3.2vw;
    text-align: center;
  }

  .user-detail>div:nth-of-type(2){
    padding:12px;
    border-bottom: 1px solid #e7e7e7;
  }

  .user-detail>div:nth-of-type(2) h2{
    font-size: 4.8vw;
    color: #212121;
    max-width: 62.66667vw;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    font-weight:normal;
  }

  .user-detail>div:nth-of-type(2) p{
    margin-top: 2.13333vw;
    font-size: 3.46667vw;
    color: #999;
    line-height: 4.53333vw;
    width: 80vw;
    height: 4.53333vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }

  .user-detail>div:nth-of-type(2) .content a{
    float:right;
    color:#1389bf;
    margin-top: 0.86667vw;
    font-size: 3.8vw;
  }

  .user-detail>div:nth-of-type(2) .content{
    overflow: hidden;
  }

  .user-detail>div:nth-of-type(2) .tags{
    margin-top: 1.86667vw;
    margin-bottom: -1.33333vw;
   /* display: none; */
  }

  .user-detail>div:nth-of-type(2) .tags span{
    display: inline-block;
    font-size: 4vw;
    padding: 0.53333vw 1.33333vw;
    margin-right: -2.66667vw;
    color: #505050;
    background: #f4f4f4;
    border-radius: 0.53333vw;
    -webkit-transform: scale(.71);
    transform: scale(.71);
    -webkit-transform-origin: left;
    transform-origin: left;
  }

</style>
