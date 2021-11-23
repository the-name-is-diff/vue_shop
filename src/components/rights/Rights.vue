<!--
 * @Author: your name
 * @Date: 2021-11-19 10:38:42
 * @LastEditTime: 2021-11-21 12:11:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\rights\Rights.vue
-->
<template>
  <div class="rights" v-if="rightsList !== null">
    <el-card class="box-card">
      <el-table :data="rightsList.data" style="width: 100%" border>
        <el-table-column type="index" width="80%"></el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级" width="180">
          <template slot-scope="scope">
            <div>
              <el-tag v-if="scope.row.level==='0'">一级</el-tag>
              <el-tag type="success" v-if="scope.row.level==='1'">二级</el-tag>
              <el-tag type="info" v-if="scope.row.level==='2'">三级</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: [],
      type: ["list", "tree"],
    };
  },
  methods: {
    async getRightList() {
      const { data } = await this.$http.get("rights/list");
      this.rightsList = data;
    },
  },
  created() {
    this.getRightList();
  },
};
</script>

<style>
</style>