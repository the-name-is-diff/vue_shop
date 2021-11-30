<!--
 * @Author: your name
 * @Date: 2021-11-30 08:38:17
 * @LastEditTime: 2021-11-30 09:34:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_shop\src\components\goods\order\Order.vue
-->
<template>
  <div class="order">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-input
        placeholder="请输入内容"
        v-model="searchId"
        class="input-with-select searchOrder"
        size="small"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table :data="ordersList.goods" border stripe style="width: 100%" v-if="ordersList">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180">
        </el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_pay ==='0'">未付款</el-tag>
            <el-tag type="success" v-else>已付款</el-tag>    
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.ceate_time | dateFormat}}}
          </template>
        </el-table-column>
        <el-table-column label="操作"> </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchListInfo.pagenum"
      :page-sizes="[1,2,5,10]"
      :page-size="searchListInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="ordersList.total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchId: "",
      searchListInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      ordersList: {},
    };
  },
  methods: {
    async getOrdersList() {
      const { data } = await this.$http.get("/orders", {
        params: this.searchListInfo,
      });
      this.ordersList = data.data;
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.searchListInfo.pagesize = val
        this.getOrdersList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.searchListInfo.pagenum = val
        this.getOrdersList();
      }
  },
  created() {
    this.getOrdersList();
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin: 15px !important;
}
.searchOrder {
  width: 350px !important;
}
</style>