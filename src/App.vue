<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepalive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>



<script>
  // import register from './components/register.vue'
  // import login from './components/login.vue'

  import {toRem} from './assets/js/media.js'


  export default {
    name: 'App',
    methods:{

    },
    created(){
      //this.toRem()
    },

    mounted(){
      toRem()
    }


  }
</script>

<style>
  /* @import "./assets/css/media.css"; */

  *{margin:0;padding:0;}
  li{list-style:none;}
  body{background:#f4f4f4;font-size:16px;font-family: PingFangSC-Regular;}
  img{width: 100%;}

  .flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
