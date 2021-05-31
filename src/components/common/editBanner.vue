<template>

  <div class="edit-banner" @click="bannerClick">
    <span>{{left}}</span>
    <span>
      <slot name="right"></slot>
    </span>
  </div>

</template>

<script>

  export default{
    props:['left'],
    methods:{
      bannerClick(){
        this.$emit('bannerClick')
      }
    }
  }

</script>

<style>

  .edit-banner{
    background:#fff;
    border-bottom: solid 1px #eee;
    padding:.2rem .3rem;
    color:#505050;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 4vw;
  }

  .edit-banner i{
    color:#999;
    font-style: normal;
  }

  .edit-banner .user-img{
    width:12vw;
    height:12vw;
    border-radius:50%;
  }
</style>
