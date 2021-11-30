<!--
 * @Author: your name
 * @Date: 2021-11-30 08:38:17
 * @LastEditTime: 2021-11-30 15:39:43
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
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="searchId"
            @keyup.enter="searchOrder"
            class="input-with-select searchOrder"
            ><el-button
              slot="append"
              icon="el-icon-search"
              @click="searchOrder"
            ></el-button>
          </el-input>
        </el-col>
        <el-col></el-col>
      </el-row>

      <el-table
        :data="ordersList.goods"
        border
        stripe
        style="width: 100%"
        v-if="ordersList"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180">
        </el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.order_pay === '0'">未付款</el-tag>
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button
            type="success"
            icon="el-icon-location"
            @click="showProgressBox"
          ></el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchListInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="searchListInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ordersList.total"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="物流信息"
      :visible.sync="locationDialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="locationDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      searchedOrder: {},
      locationDialogVisible: false,
       activities: [{
          content: '快递开始派送',
          timestamp: '2018-04-15'
        }, {
          content: '快递员开始分拣',
          timestamp: '2018-04-13'
        }, {
          content: '订单创建成功',
          timestamp: '2018-04-11'
        }]
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
      this.searchListInfo.pagesize = val;
      this.getOrdersList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.searchListInfo.pagenum = val;
      this.getOrdersList();
    },
    async searchOrder() {
      const { data } = await this.$http.get(`orders${this.searchId}`);
      if (data.meta.tstaus === 200) {
        this.ordersList = data.data;
      }
      console.log(data);
    },
    async showProgressBox() {
      this.locationDialogVisible = true;
    },
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
</style>