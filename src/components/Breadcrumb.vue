<!--
 * @Author: your name
 * @Date: 2021-11-17 19:26:21
 * @LastEditTime: 2021-11-23 20:21:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\Breadcrumb.vue
-->
<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <slot name="first"></slot>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <slot name="second"></slot>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <slot name="third"></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.breadcrumb{
  margin: 15px;
}
</style>