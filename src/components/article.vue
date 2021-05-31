<template>

  <div class="article-view" v-if="model">
    <navBar></navBar>
    <div class="detail-info">
      <div class="video">
        <!-- <video :src="model.content" controls></video> -->
        <video src="../assets/video/m1.mp4" controls poster="../assets/img/m1.jpg"></video>
      </div>
      <div class="detail-info-txt">
        <div class="title">
          <span>{{model.category.title}}</span>
          <span>{{model.name}}</span>
        </div>
        <div class="info">
          <span>{{model.userinfo.name}}</span>
          <span>14.6万观看</span>
          <span>192弹幕</span>
          <span>{{model.date}}</span>
        </div>
        <div class="btn">
          <span
          @click="collectionClick"
          :class="active?'active':''"
          ><van-icon name="star" />收藏</span>

          <span
          @click="subScriptClick"
          :class="subscriptActive?'active':''"
          ><van-icon name="add-square" />关注</span>

          <span><van-icon name="share" />分享</span>
        </div>
      </div>

      <div class="detail-parent">
        <cover
        v-for="(item,index) in commendList"
        :key="index"
        :detailitem="item"
        class="detail-item"
        ></cover>
      </div>

      <commentTitle
        :dataLength="lens"
        @postComment="postSuccess"
        ref="commentInput"
      ></commentTitle>

      <comment
        @lengthselect="ev=>lens=ev"
        @publishClick="postChildClick"
        ref="commentPublish"
      ></comment>

    </div>


  </div>

</template>

<script>

  import navBar from './common/navBar.vue'
  import cover from './cover.vue'
  import commentTitle from './article/commentTitle.vue'
  import comment from './article/comment.vue'

  import { Toast } from 'vant';



  export default{
    data(){
      return {
        model:null,
        commendList:null,
        myuser:null,
        lens:null,
        postCom:{
          article_id:null,
          comment_content:'',
          comment_date:'',
          parent_id:null
        },
        active:null,
        subscriptActive:null,
      }
    },
    components:{
      navBar,
      cover,
      commentTitle,
      comment
    },
    methods:{
      articleitemData(){
        const res=this.$http.get('/article/'+this.$route.params.id).then((res)=>{
          this.model=res.data[0]
          if(this.model) {
            this.subScriptInit()
          }
        })
      },
      commendData(){
        const res=this.$http.get('/commend').then((res)=>{
          this.commendList=res.data
        })
      },
      //发表评论
      postSuccess(e){
        const date=new Date()
        let m=date.getMonth()+1
        let d=date.getDate()
        let str=this.toDubble(m)+'-'+this.toDubble(d)

        this.postCom.comment_content=e
        this.postCom.comment_date=str
        this.postCom.article_id=this.$route.params.id
        const res=this.$http.post('/comment_post/'+localStorage.getItem('id'),this.postCom).then((res)=>{
          //this.$router.go(0)   刷新页面
          this.$refs.commentPublish.commentData()
          this.postCom.parent_id=null
          if(res.status==200){
            Toast.success('发表成功')
          }
        })

      },
      toDubble(num){
        if(num<10){
          return '0'+num
        }else{
          return ''+num
        }
      },
      postChildClick(id){
        this.postCom.parent_id=id
        this.$refs.commentInput.focusInput()
      },
      //收藏
      collectionClick(){
        if(localStorage.getItem('token')){
          const res=this.$http.post('/collection/'+localStorage.getItem('id'),{
            article_id:this.$route.params.id
          }).then((res)=>{

            if(res.data.msg=='收藏成功'){
              this.active=true
            }else{
              this.active=false
            }
            this.$msg.fail(res.data.msg)
          })
        }
      },
      //进入页面是否收藏
      collectionInit(){
        if(localStorage.getItem('token')){
          const res=this.$http.get('/collection/'+localStorage.getItem('id'),{
            params:{
              article_id:this.$route.params.id
            }
          }).then((res)=>{
            this.active=res.data.success
          })
        }
      },
      //关注
      subScriptClick(){
        if(localStorage.getItem('token')){
          const res=this.$http.post('/sub_scription/'+localStorage.getItem('id'),{
            sub_id:this.model.userid
          }).then((res)=>{

            if(res.data.msg=='关注成功'){
              this.subscriptActive=true
            }else{
              this.subscriptActive=false
            }
            this.$msg.fail(res.data.msg)
          })
        }
      },

      subScriptInit(){
        if(localStorage.getItem('token')){
          const res=this.$http.get('/sub_scription/'+localStorage.getItem('id'),{
            params:{
              sub_id:this.model.userid
            }
          }).then((res)=>{
            this.subscriptActive=res.data.success
          })
        }
      },

    },
    created(){
      this.articleitemData()
      this.commendData()
      this.collectionInit()
    },
    watch:{
      $route(){
        this.articleitemData()
        this.commendData()
        this.collectionInit()
      }
    }
  }

</script>

<style>
  .article-view{
    background: #fff;
  }

  .article-view .detail-info .video video{
    width:100%
  }

  .article-view .detail-info-txt{
    padding: 2vw;

  }

  .article-view .detail-info-txt .title{
    color: #212121;

    display: flex;
    align-items: center;
  }

  .article-view .detail-info-txt .title span:nth-of-type(1){
    color:#fb7299;
    font-size:3.2vw;
    background: #f4f4f4;
    border-radius: 3.2vw;
    padding: 0 1.6vw;

  }

  .article-view .detail-info-txt .title span:nth-of-type(2){
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:80vw
  }

  .article-view .detail-info-txt .info{
    font-size: 3.2vw;
    margin-top: 2.66667vw;
    color: #999;
  }

  .article-view .detail-info-txt .info span{
    margin-right: 2.13vw;
  }

  .article-view .detail-info-txt .info span:nth-of-type(1){
    color:#212121
  }

  .article-view .detail-info-txt .btn{
    display: flex;
    margin-top:2vw;
    font-size:3vw
  }

  .article-view .detail-info-txt .btn span{
    display: flex;
    align-items: center;
    color:#757575;
    margin-right:5vw
  }

  .article-view .detail-info-txt .btn .van-icon{
    font-size:5vw;
    margin-right:.5vw
  }

  .article-view .detail-parent{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2vw;
  }

  .article-view .detail-item{
    width:47vw;
    margin-bottom: 2vw;
  }

  .article-view .detail-info-txt .btn span.active{
    color:#fb7299
  }

</style>
