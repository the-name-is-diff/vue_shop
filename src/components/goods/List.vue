<!--
 * @Author: your name
 * @Date: 2021-11-27 17:32:38
 * @LastEditTime: 2021-11-27 22:59:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_shop\src\components\goods\List.vue
-->
<template>
  <div class="list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="searchInfo"
            class="input-with-select"
            @keyup.enter.native="searchGood"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchGood"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addShowForm">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="GoodsList.goods" stripe style="width: 100%" border v-if="GoodsList!==null">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goods_price" label="价格"> </el-table-column>
        <el-table-column prop="goods_weight" label="重量"> </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改商品信息"
              placement="top"
              :enterable="false"
            >
              <el-button type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除商品"
              placement="top"
              :enterable="false"
            >
              <el-button type="danger" icon="el-icon-delete" @click="deleteGood(scope.row.goods_id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
      <!-- 添加商品 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 5,
      GoodsList: null,
      searchInfo: "",
      addDialogVisible: false,
      addGoodInfo: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: "",
      },
    };
  },
  methods: {
    async getGoodsList() {
      const { data } = await this.$http.get("goods", {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      });
      this.GoodsList = data.data;
      console.log(data.data);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
      this.searchInfo ? this.searchGood() : this.getGoodsList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(`当前页: ${val}`);
      this.getGoodsList();
      this.searchInfo ? this.searchGood() : this.getGoodsList();
    },
    async searchGood() {
      const { data } = await this.$http.get("goods", {
        params: {
          query: this.searchInfo,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      });
      this.GoodsList = data.data;
    },
    deleteGood(id){
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const {data} = await this.$http.delete(`goods/${id}`);
          console.log(id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getGoodsList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },
    addShowForm(){
      this.$router.push('addgoods')
    }
  },
  created() {
    this.getGoodsList();
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin: 15px;
}
</style>