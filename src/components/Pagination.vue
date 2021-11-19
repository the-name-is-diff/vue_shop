<!--
 * @Author: your name
 * @Date: 2021-11-17 22:10:21
 * @LastEditTime: 2021-11-17 22:40:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\Pagination.vue
-->
<template>
  <div class="Pagination">
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="cPagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="cPagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      
      >
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 1,
      cPagesize:this.pagesize,
      cPagenum:this.pagenum
    }
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.$emit('setPageSize',val)
        this.$emit('getUserList')
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.cPagenum = val
        this.$emit('setPageNum',val)
        this.$emit('getUserList')
      }
  },
  props:['pagesize','pagenum']
}
</script>

<style>

</style>