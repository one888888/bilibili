<template>
  <div class="comment-container">

    <div v-for="(item,index) in commentList" :key="index">
      <div class="comment-item" >
        <section>
          <div class="user-img">
            <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img">
            <img v-else src="../../assets/img/noface.jpg">
          </div>
          <div class="comment-cont">
            <p>
              <span v-if="item.userinfo && item.userinfo.name">{{item.userinfo.name}}</span>
              <span v-else>此用户无姓名</span>
              <span v-if="!/function/.test(item.comment_date)">{{item.comment_date}}</span>
              <span v-else>1-04</span>
            </p>
            <p>
              {{item.comment_content}}
              <span class="publish-01" @click="publishClick(item.comment_id)">回复</span>
            </p>
          </div>
        </section>

        <div class="comment-txt">
          <commentItem
          v-if="item.child"
          :commentChild="item.child"
          @postPublish="publishClick"
          ></commentItem>
        </div>


      </div>

    </div>



  </div>
</template>

<script>

  // import {test} from '../../../test.js'
  import commentItem from './commentItem.vue'


  export default{
    data(){
      return {
        commentList:null
      }
    },
    components:{
      commentItem
    },
    methods:{
      commentData(){
        const res=this.$http.get('/comment/'+this.$route.params.id).then((res)=>{
          if(res.data){
            this.$emit('lengthselect',res.data.length)
          }
          this.commentList=this.changeCommentData(res.data)
        })
      },
      changeCommentData(data){
        function fn(temp) {
          let arr1 = []
          for (var i = 0; i < data.length; i++) {
            if (data[i].parent_id == temp) {
              arr1.push(data[i])
              data[i].child=fn(data[i].comment_id)

            }
          }

          return arr1
        }

        return fn(null)
      },
      publishClick(id){
        this.$emit('publishClick',id)
      }
    },
    created(){
      this.commentData()
    }
  }

</script>

<style>

  .comment-container{

  }

  .comment-container .comment-txt{
    margin-left:12vw
  }


  .comment-container section .user-img{
    float:left;
  }

  .comment-container .user-img img{
    width: 9vw;
    height: 9vw;
    border-radius: 50%;
    margin-right:3vw;
  }

  .comment-container .comment-item{
    padding:3vw 2vw;
    border-bottom: 1px solid #e7e7e7;
  }

  .comment-container .comment-item section{

  }

  .comment-container .comment-cont{
    flex: 1;
    font-size:3.5vw;
    margin-bottom: 1vw;
  }

  .comment-container .comment-cont p:nth-of-type(1){
    display: flex;
    justify-content: space-between;
    color:#757575
  }

  .comment-container .comment-cont p:nth-of-type(2){
    margin-top: 2.4vw;
    font-size: 3.46667vw;
    color: #212121;
    /* white-space: pre-line; */
    word-break: break-word;
    line-height: 6vw;
    margin-left: 12vw;
  }

  .comment-container .publish-01{
    float:right;
    color:#fb7299;
    font-size:3vw
  }



</style>
