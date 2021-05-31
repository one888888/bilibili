<template>

  <div class="login-txt">

      <van-field v-model="text"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :rule="rule"
       />

  </div>

</template>

<script>

  export default {
    props:['label','type','placeholder','rule'],
    data() {
      return {
        text: '',
      };
    },
    watch:{
      text(){
        this.handleRule()
      }
    },
    methods:{
      handleRule(){
        const rue=new RegExp(this.rule)
        if(rue.test(this.text)){
          this.$emit('inputChange',this.text)
        }else{
          this.$emit('inputChange','')
        }
      }
    },
  };

</script>

<style>

  .login-txt .van-cell{
    margin:.3rem 0;
  }

</style>
