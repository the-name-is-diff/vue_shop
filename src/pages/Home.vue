<!--
 * @Author: your name
 * @Date: 2021-11-16 21:33:46
 * @LastEditTime: 2021-11-19 08:37:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\Home.vue
-->
<template>
  <div class="home">
    <el-container>
      <el-aside wdith="200">
        <aside-nav :isCollapse="isCollapse"></aside-nav>
      </el-aside>
      <el-container>
        <el-header> 
          <div class="left_header">
            <el-button icon="el-icon-s-fold" @click="showAside" ref="showBtn" class="showBtn"></el-button>
            <breadcrumb></breadcrumb>
          </div>
          <el-button type="info" icon="el-icon-close" circle @click="outLogin" size="small"></el-button>
        </el-header>
        <el-main>
          <router-view  class="animate__animated animate__fadeIn"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import AsideNav from '../components/AsideNav.vue'
  import Breadcrumb from '../components/Breadcrumb.vue'
export default {
  data() {
    return {
      isCollapse:false,
      d:1
    }
  },
  methods: {
    outLogin(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    showAside(){
      this.isCollapse = !this.isCollapse;
      // console.log(this.$refs.showBtn.$el);
      this.$refs.showBtn.$el.style.transform = 'rotate('+this.d*90+'deg)'
      if(this.d ===0){
        this.d +=1
      }
      else{
        this.d -=1
      }
    }
  },
  components:{
    AsideNav,
    Breadcrumb
  }
}
</script>

<style scoped>
.home{
  height: 100%;
}
.el-container{
  height: 100%;
}
.el-header{
  background-color: rgb(239,242,247);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside{
  background-color: rgb(48,65,86);
  width: initial !important;
}
.el-main{
  background-color: rgb(233,237,240);
}
.showBtn{
  transition: 0.3s ease;
  margin-right: 30px;
}
.left_header{
  display: flex;
  align-items: center;
}
</style>