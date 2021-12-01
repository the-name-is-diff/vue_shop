<!--
 * @Author: your name
 * @Date: 2021-12-01 19:55:19
 * @LastEditTime: 2021-12-01 20:48:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_shop\src\components\report\Report.vue
-->
<template>
  <div class="report">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div id="main" style="width: 900px; height: 500px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
    reportInfo:{}
    }
  },
  created(){
      
  },
  async mounted() {
    
    const {data} = await this.$http.get(`reports/type/1`)
      if(data.meta.status==200){
        Object.assign(this.options,data.data)
      }
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(this.options);
  },
};
</script>

<style>
.el-breadcrumb {
  margin: 15px;
}
</style>