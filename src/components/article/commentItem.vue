<template>

  <div class="comment-item-container">
    <section v-for="(item,index) in commentChild" :key="index">
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
        <p v-if="!temp">
          {{item.comment_content}}<span class="publish" @click="postItemComment(item.comment_id)">回复</span>
        </p>
        <p v-else>
          <a class="reply">回复 {{item.parent_user_info.name}}：</a>
          {{item.comment_content}}
          <span class="publish" @click="postItemComment(item.comment_id)">回复</span>
          </p>
      </div>

      <commentItem
      :commentChild="item.child"
      :temp="true"
      @postChild="postChild"
      ></commentItem>

    </section>

  </div>

</template>

<script>

  export default{
    name:'commentItem',
    props:['commentChild','temp'],
    methods:{
      postItemComment(id){
        this.$emit('postChild',id)
        this.$emit('postPublish',id)
      },
      postChild(id){
        this.postItemComment(id)
        this.$emit('postPublish',id)
      }
    }
  }

</script>

<style>
  .comment-item-container{
    clear: both;
  }

  .comment-item-container section{
    background: #f4f4f4;
    padding: 2.66667vw 0;
    border-radius: 1.06667vw;

  }

  .comment-item-container section .user-img{
    margin-left:2vw
  }

  .comment-item-container section .comment-cont{
    margin-right:2vw
  }

  .comment-item-container section .reply{
    color:#5090cc;
  }

  .comment-item-container .publish{
    float:right;
    color:#fb7299;
    font-size:3vw
  }
</style>
