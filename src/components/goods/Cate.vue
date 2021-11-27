<!--
 * @Author: your name
 * @Date: 2021-11-23 18:20:58
 * @LastEditTime: 2021-11-24 22:38:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\goods\Cate.vue
-->
<template>
  <div class="cate" v-if="CateList !== null">
    <breadcrumb>
      <span slot="first">商品管理</span>
      <span slot="second">商品分类</span>
    </breadcrumb>
    <el-card class="box-card">
      <el-button type="primary" @click="addCate">添加分类</el-button>

      <tree-table
        border
        show-index
        :data="CateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-row-hover="false"
      >
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: lightfreen"></i>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="info" v-else>三级</el-tag>
        </template>
        <template slot="opt" slot-scope="scope">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </tree-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="queryinfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryinfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="CateListLength"
        >
        </el-pagination>
        <el-dialog
        v-if="ParentCateList!==[]"
          title="添加分类"
          :visible.sync="AddDialogVisible"
          width="30%"
          :modal-append-to-body="false"
          @close="resetForm"
        >
          <span>
            <el-form label-width="80px" :model="addCateForm" :rules="rules" ref="addCateRefs">
              <el-form-item label="分类名称"  prop="cat_name">
                <el-input v-model="addCateForm.cat_name"></el-input>
              </el-form-item>
              <el-form-item label="分类层级">
                <div class="block">
                  <el-cascader
                  clearable
                    v-model="checkedCate"
                    :options="ParentCateList"
                    :props="{ expandTrigger: 'hover', label:'cat_name',value:'cat_id', checkStrictly:true }"
                    @change="ParentCateChange"
                    ref="selectionRef"
                  ></el-cascader>
                </div>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="AddDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitAddCateForm"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "../Breadcrumb.vue";
export default {
  data() {
    return {
      queryinfo: {
        type: 3,
        pagenum: 1,
        pagesize: 1,
      },
      AddDialogVisible: false,
      CateList: [],
      CateListLength: 0,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
      addCateForm: {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0,
      },
      rules: {
        "cat_name": [
           { required: true, message: "请输入分类名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      ParentCateList:[],
      checkedCate:null
    };
  },
  components: {
    Breadcrumb,
  },
  methods: {
    async getCateList() {
      const { data } = await this.$http.get("categories", {
        type: 3,
        pagenum: parseInt(this.queryinfo.pagenum),
        pagesize: parseInt(this.queryinfo.pagesize),
      });
      this.CateList = data.data;
      this.CateListLength = data.data.length;
    },
    handleSizeChange(val) {
      this.queryinfo.pagesize = val;
      this.getCateList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.queryinfo.pagenum = val;
      this.getCateList();
      console.log(`当前页: ${val}`);
    },
    addCate() {
      this.AddDialogVisible = true;
      this.getParentCate()
    },
    async getParentCate(){
      const {data} = await this.$http.get('categories',{
        params:{
          type:2
        }
      })
      this.ParentCateList = data.data

    },
    resetForm(){
      this.$refs.addCateRefs.resetFields()
      this.checkedCate = []
    },
    ParentCateChange(){
      if(this.ParentCateList.length>0){
        this.addCateForm.cat_level = this.checkedCate.length
        this.addCateForm.cat_pid = this.checkedCate[this.checkedCate.length-1]
      }else{
        this.addCateForm.cat_level = 0
        this.addCateForm.cat_pid = 0
      }
    },
    async submitAddCateForm(){
      const {data} = await this.$http.post('categories',this.addCateForm)
      if(data.meta.status ==201){
        this.$message({
          type:'success',
          message:'添加分类成功'
        })
      }
      else{
        this.$message.error('添加分类失败');
      }
      this.AddDialogVisible = false
      this.getCateList()
      
    }
  },
  created() {
    this.getCateList();
  },
};
</script>

<style>
</style>