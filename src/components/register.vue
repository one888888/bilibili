<template>

  <div class="register-view">
    <loginTop middleTop="注册bilibili">
      <div class="right-btn" slot="rightTxt" @click="$router.push('/login')">已有账号</div>
    </loginTop>

    <loginTxt
      label="姓名"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      @inputChange="res=>model.name=res"
    ></loginTxt>
    <loginTxt
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputChange="res=>model.username=res"
    ></loginTxt>
    <loginTxt
      label="密码"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputChange="res=>model.password=res"
    ></loginTxt>

    <loginBtn btnTxt="注册" @registerSubmit="registerSubmit"></loginBtn>

  </div>

</template>

<script>
  import loginTop from './common/loginTop.vue'
  import loginTxt from './common/loginTxt.vue'
  import loginBtn from './common/loginBtn.vue'
  // import {fn} from '../../test.js'



  export default{
    name:'register',
    data(){
      return {
        model:{
          name:'',
          username:'',
          password:''
        }

      }
    },
    components:{
      loginTop,
      loginTxt,
      loginBtn
    },
    methods:{
      registerSubmit(){
        //console.log('注册按钮被点击')
        let rulg=/^.{6,16}$/
        if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){
          this.$http.post('/register',this.model).then(res=>{

            this.$msg.fail(res.data.msg)
            console.log(res)
            localStorage.setItem('id',res.data.id)
            localStorage.setItem('token',res.data.objtoken)

            setTimeout(()=>{
              this.$router.push('/userInfo')
            },1000)
          })


        }else{
          this.$msg.fail('请输入正确的姓名或密码');
        }

      }
    },
    created(){

    }

  }

</script>

<style>



</style>
