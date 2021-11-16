<!--
 * @Author: your name
 * @Date: 2021-11-16 21:33:46
 * @LastEditTime: 2021-11-16 21:54:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\Home.vue
-->
<template>
  <div>
    <h2>home</h2>
    <h2>home</h2>
    <h2>home</h2>
    <h2>home</h2>
    <h2>home</h2>
    <el-button type="info" @click="outLogin">退出登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    outLogin(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
}
</script>

<style>

</style>