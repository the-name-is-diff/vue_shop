<!--
 * @Author: your name
 * @Date: 2021-11-17 08:22:03
 * @LastEditTime: 2021-11-17 19:30:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\copmponents\AsideNav.vue
-->
<template>
  <div class="AsideNav">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group> -->
    
    <el-menu 
    class="el-menu-vertical-demo" 

    :collapse="isCollapse"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409eff"
    :unique-opened="true"
    :router="true"
    :default-active=activeItem
    >
  <!-- <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      <span slot="title">分组一</span>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="分组2">
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu> -->
  <el-submenu v-for="item in menuList" :key="item.id" :index="item.id+''">
    <template slot="title">
      <i :class="iconList[item.order-1]"></i>
      <span slot="title">{{item.authName}}</span>     
    </template>
    <el-menu-item v-for="p in item.children" :key="p.item" :index="p.path+''" @click="setActive(p.path+'')">
      <template slot="title">
      <i class="el-icon-menu"></i>
      <span slot="title">{{p.authName}}</span>     
    </template>
    </el-menu-item>
  </el-submenu>
</el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList:null,
      iconList:[
        'el-icon-user-solid',
        'el-icon-key',
        'el-icon-s-goods',
        'el-icon-shopping-cart-full',
        'el-icon-edit-outline'
        ],
        activeItem:window.sessionStorage.getItem('index')
    }
  },
  props:['isCollapse'],
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      async getMenuList(){
        const {data} = await this.$http.get('/menus');
        console.log(data);
        if(data.meta.status === 200){
          this.menuList = data.data
        }
        else{
          this.$message.error(data.meta.msg);
        }
      },
      setActive(index){
        window.sessionStorage.setItem('index',index)
      }
  },
  created() {
    this.getMenuList()
  },
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    border: none !important;
  }
  .el-menu-vertical-demo{
    border: none !important;
  }
</style>