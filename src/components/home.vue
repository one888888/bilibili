<template>

  <div :class="!maskShow?'home-view':'home-view not-scroll'  ">

      <navBar></navBar>

      <section>
        <div class="tab-btn" @click="navShow">
          <van-icon name="arrow-down" />
        </div>

        <van-tabs v-model="active"  swipeable title-active-color="#fb7299">
          <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
            <van-list
              v-model="item.loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
            </van-list>
            <div class="detail-parent">
              <cover
              class="detail-item"
              v-if="active==index"
              v-for="(categoryitem,categoryindex) in item.list"
              :key="categoryindex"
              :detailitem="categoryitem"
              ></cover>
            </div>
          </van-tab>
        </van-tabs>

        <div :class="!maskShow?'drawer-box':'drawer-box to-bottom'" ref="element">
          <a
          href="javascript:;"
          v-for="(item,index) in navMark"
          :key="index"
          :class="{activeColor:colorIndex==index}"
          @click="changeColor(item,index)"
          >
            {{item}}
          </a>
          <div @click="navHide"><van-icon name="arrow-up" /></div>
        </div>
        <div class="mask" v-show="maskShow" @click="navHide"></div>
      </section>



  </div>

</template>

<script>
  import navBar from './common/navBar.vue'
  import cover from './cover.vue'

  //let height= this.$refs.element.offsetHeight;

  export default{
    data(){
      return{
        category:[],
        active:0,
        colorIndex:-1,
        maskShow:false,
        navMark:[]
      }
    },
    components:{
      navBar,
      cover
    },
    methods:{
      selectCategory(){
        const res=this.$http.get('/category').then((res)=>{
          this.changeCategory(res.data)
        })
      },
      changeCategory(data){
        const category1=data.map((item,index)=>{
          item.list=[];
          item.page=0;
          item.pagesize=10;
          item.finished=false;
          item.loading=false;
          this.navMark.push(item.title)

          return item


        })

        this.category=category1
        this.selectArticle()
      },
      selectArticle(){
        const categoryitem=this.categoryItem()
        const res=this.$http.get('/detail/'+categoryitem._id,{
          params:{
            page:categoryitem.page,
            pagesize:categoryitem.pagesize
          }
        }).then((res)=>{
          categoryitem.list.push(...res.data)
          categoryitem.loading=false
          if(res.data.length<categoryitem.pagesize){
            categoryitem.finished=true
          }
        })


      },
      categoryItem(){
        const categoryitem=this.category[this.active]
        return categoryitem
      },
      onLoad(){
        const categoryitem=this.categoryItem()
        setTimeout(()=>{
          categoryitem.page+=1
          this.selectArticle()
        },1000)

      },
      navShow(){
        this.maskShow=true
      },
      navHide(){
        this.maskShow=false
      },
      changeColor(item,index){
        this.colorIndex = index;
        this.maskShow=false;
        this.active=index
      }

    },
    watch:{
      active(){
        this.selectArticle()
      }
    },
    created(){
      this.selectCategory()

    },
    mounted(){
      //let height= this.$refs.element.offsetHeight;
      //console.log(height)

    }
  }

</script>

<style>
  .not-scroll{
    height: 100vh;
    overflow: hidden;
  }

  .home-view{
    background:#fff;
  }

  .home-view .detail-parent{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2vw;
  }

  .home-view .detail-item{
    width:47vw;
    margin-bottom: 2vw;
  }

  .home-view section{
    position: relative;
    overflow: hidden;
  }

  .home-view section .tab-btn{
    position: absolute;
    right: 0;
    top:0;
    background:#fff;
    z-index: 99;
    height:44px;
    line-height: 44px;
  }

  .home-view .tab-btn .van-icon{
    margin:0 3vw
  }

  .mask{
    position: absolute;
    right: 0;
    top:0;
    left:0;
    bottom:0;
    background:rgba(0,0,0,.3);
    z-index: 888;
  }

  .drawer-box{
    background:#fff;
    position: absolute;
    width: 100%;
    z-index: 889;
    top:0;
    transform: translateY(-100%);
    transition:.2s ease-out;
    padding:2vw 3vw;
    box-sizing: border-box;
  }

  .drawer-box div{
    clear: both;
  }

  .drawer-box a{
    float:left;
    margin: 2vw;

    color: #757575;
    font-size: 3.73333vw;
  }

  .to-bottom{
    transform: translateY(0);
  }

  .drawer-box div{
    text-align: center;
  }

  .van-tabs--line .van-tabs__wrap{
    padding-right:8vw
  }

  .drawer-box a.activeColor {
    color:#fb7299;
  }


</style>
