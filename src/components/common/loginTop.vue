<template>

  <div class="login-top">
    <div></div>
    <div>{{middleTop}}</div>
    <div>
      <slot name="rightTxt"></slot>
    </div>
  </div>



</template>

<script>

export default{
  props:['middleTop']
}

</script>

<style>



  .login-top{
    height:45px;
    background:#fff;
    display: flex;
  }

  .login-top>div{
    flex:1;
    display: flex;
    justify-content: center;
    align-items:center;
    font-size:.32rem
  }
  
  .login-top .right-btn{
    font-size:14px;
    color:#333;
  }


</style>
