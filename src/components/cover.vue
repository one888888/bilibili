<template>

  <div class="cover-view" @click="pathPush">
    <div class="detail-list">
      <div class="img-parent">
        <img :src="detailitem.img" v-if="!/node/.test(this.detailitem.img)">
        <img src="../assets/img/exp.jpg" v-else>
        <div>
          <span class="video"><van-icon name="tv-o" />111.6万</span>
          <span class="comment"><van-icon name="other-pay" />{{len}}</span>
        </div>
      </div>
      <p>{{detailitem.name}}</p>
    </div>
  </div>

</template>

<script>

  export default{
    props:['detailitem'],
    data(){
      return {
        imgUrl:'',
        len:10
      }
    },
    methods:{
      pathPush(){
        if(this.$route.path != `/article/${this.detailitem.id}`) {
            this.$router.push(`/article/${this.detailitem.id}`)
        }
      }
    },
    created(){
      // let pattern=/node/
      // let str=''+this.detailitem.img
      // if(pattern.test(str)){
      //   this.imgUrl='/static/img/exp.0ddf643.jpg'
      // }else{
      //   this.imgUrl=this.detailitem.img
      // }

      if(this.detailitem.commentlen){
        this.len=this.detailitem.commentlen
      }else{
        this.len
      }

    }
  }

</script>

<style>

  .cover-view .item-img{
    width: 100%;
    display: block;
  }

  .cover-view .detail-list{

  }

  .cover-view .detail-list p{
    font-size: 3.2vw;
    color: #212121;
    margin-top: 1.6vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .cover-view .img-parent{
    position: relative;
    height:26.5vw;
    color:#fff;
    font-size:4vw;
    overflow: hidden;
  }

  .cover-view .img-parent div{
    position:absolute;
    left:0;
    bottom:0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 2vw;
    padding-bottom: 1vw;
    box-sizing: border-box;
    background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
  }

  .cover-view .img-parent div span{
    display: flex;
    align-items: center;
  }

  .cover-view .img-parent div .van-icon{
    margin-right:1vw
  }

</style>
