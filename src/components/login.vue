<template>

  <div class="login-view">
    <loginTop middleTop="登录bilibili">
      <div class="right-btn" slot="rightTxt" @click="$router.push('/register')">注册账号</div>
    </loginTop>

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

    <loginBtn btnTxt="登录" @registerSubmit="registerSubmit"></loginBtn>

  </div>

</template>

<script>
  import loginTop from './common/loginTop.vue'
  import loginTxt from './common/loginTxt.vue'
  import loginBtn from './common/loginBtn.vue'
  //import {test} from '../../test.js'



  export default{
    name:'register',
    data(){
      return {
        model:{
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
        if(rulg.test(this.model.username) && rulg.test(this.model.password)){
          this.$http.post('/login',this.model).then(res=>{
            //console.log(res)
            this.$msg.fail(res.data.msg)
            if(res.data.code==301 || res.data.code==302){
              return
            }
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('id',res.data.id)
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
