<template>

  <div class="login-btn" @click="registerClick()">
    {{btnTxt}}
  </div>

</template>

<script>

  export default{
    props:['btnTxt'],
    methods:{
      registerClick(){
        this.$emit('registerSubmit')
      }
    }
  }

</script>

<style>

  .login-btn{
    height:45px;
    background:#ff9db5;
    display:flex;
    justify-content:center;
    align-items: center;
    border-radius:22.5px;
    color:#fff;
    font-size:.32rem;
    margin:15px 10px;
  }

</style>
