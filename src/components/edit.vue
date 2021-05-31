<template>

  <div class="edit-view" v-if="model">
    <navBar></navBar>
    <div class="info-list">

      <div class="upload-file">
        <van-uploader :after-read="afterRead" class="upload-img" preview-size="100vw" />
        <editBanner left="头像">
          <img :src="model.user_img" slot="right" class="user-img" v-if="model.user_img">
          <img src="../assets/img/user.jpg" slot="right" class="user-img" v-else>
        </editBanner>
      </div>

      <editBanner left="昵称" @bannerClick="show = true">
        <a href="javascript:;" slot="right">{{model.name}}</a>
      </editBanner>
      <editBanner left="账号">
        <a href="javascript:;" slot="right">{{model.username}}</a>
      </editBanner>
      <editBanner left="性别" @bannerClick="genderShow = true">
        <a href="javascript:;" slot="right" >{{model.gender==1?'男':'女'}}</a>
      </editBanner>
      <editBanner left="出生日期"></editBanner>
      <editBanner left="个性签名" @bannerClick="txtShow = true">
        <a href="javascript:;" slot="right">{{model.user_desc}}</a>
      </editBanner>
    </div>

    <van-dialog
    v-model="show"
    title="昵称"
    show-cancel-button
    @confirm="confirmNc"
    @cancel="cancel"
    >
      <van-field v-model="text" autofocus />
    </van-dialog>

    <van-dialog
    v-model="txtShow"
    title="个性签名"
    show-cancel-button
    @confirm="confirmCm"
    @cancel="cancel"
    >
      <van-field v-model="text" autofocus />
    </van-dialog>

    <van-action-sheet
    v-model="genderShow"
    :actions="actions"
    @select="onSelect"
    cancel-text="取消"
    />

    <div class="btn" @click="exit">退出登录</div>
    <div class="btn" @click="$router.back()">返回空间</div>
  </div>

</template>

<script>

  import navBar from './common/navBar.vue'
  import editBanner from './common/editBanner.vue'
  import { Toast } from 'vant';

  export default{
    data(){
      return{
        model:{},
        show:false,
        txtShow:false,
        genderShow:false,
        text: '',
        actions: [
          { name: '男',val:1},
          { name: '女',val:0},
        ],
      }
    },
    components:{
      navBar,
      editBanner
    },
    methods:{
      selectUser(){
        const res=this.$http.get('/user/'+localStorage.getItem('id')).then((res)=>{
          this.model=res.data[0]
        })

      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        //console.log(file);
        const fromData=new FormData()
        fromData.append('file',file.file)
        const res=this.$http.post('/upload',fromData).then((res)=>{
          this.model.user_img=res.data.url
          this.userUpdate()
        })

      },
      userUpdate(){
        const res=this.$http.post('/update/' + localStorage.getItem('id'),this.model).then((res)=>{
           if(res.data.code==200){
             Toast.success('修改成功')
           }
        })

      },
      confirmNc(){
        if(this.text){
          this.model.name=this.text;
          this.text='';
        }
        this.userUpdate()
      },
      confirmCm(){
        if(this.text){
          this.model.user_desc=this.text;
          this.text='';
        }
        this.userUpdate()
      },
      cancel(){
        this.text='';
      },
      onSelect(ev) {
        // 默认情况下点击选项时不会自动收起
        // 可以通过 close-on-click-action 属性开启自动收起
        this.genderShow = false;
        this.model.gender=ev.val;
        this.userUpdate();

      },
      exit(){
        localStorage.removeItem('token');
        this.$router.push('/home')
        this.$router.go(0);
      }
    },
    created(){
      this.selectUser()
    }
  }

</script>

<style>

  .edit-view .info-list{
    margin:.3rem 0;
    font-size: 4vw;
  }

  .edit-view .info-list a{
    color:#999;
  }

  .edit-view .btn{
    background:#fff;
    padding:.2rem;
    border-bottom: solid 1px #eee;
    color:#505050;
    font-size: 4vw;
    box-sizing: border-box;
    text-align: center;
  }

  .edit-view .upload-file{
    position: relative;
    overflow: hidden;
  }

  .edit-view .upload-img{
    position: absolute;
    top:0;
    right:0;
    opacity:0;
  }





</style>
