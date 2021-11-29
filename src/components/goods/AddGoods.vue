<!--
 * @Author: your name
 * @Date: 2021-11-27 23:00:26
 * @LastEditTime: 2021-11-29 21:04:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_shop\src\components\goods\AddGoods.vue
-->
<template>
  <div class="addgoods">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
      <el-steps
        :space="200"
        :active="activeName - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="addForm"
        :rules="Addformrules"
        ref="addGoodsFormRef"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-tabs
          tab-position="left"
          v-model="activeName"
          :before-leave="changeTab"
          @tab-click="tabHandleClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input type="number" v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input type="number" v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input type="number" v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="checkCate"
                :options="cateList"
                :props="{
                  expandTrigger: 'hover',
                  label: 'cat_name',
                  value: 'cat_id',
                }"
                @change="cateChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 商品参数复选框 -->
            <el-form-item
              :label="item.attr_name"
              v-for="item in manyTableData"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  v-for="(item1, index) in item.attr_vals"
                  :label="item1"
                  :key="index"
                  border
                  >{{ item1 }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTableData"
              :key="item.attr_id"
            >
              <el-input
                v-model="item.attr_vals"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              class="upload-demo"
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleResponse"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor
              ref="myQuillEditor"
              v-model="addForm.goods_introduce"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            />
        <el-button type="primary" class="addBtn" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form> </el-card
    ><el-dialog
      title="预览商品图片"
      :visible.sync="PicDialogVisible"
      width="50%"
      :modal-append-to-body="false"
    >
      <img :src="picPath" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      activeName: 0,
      checkCate: [],
      cateList: null,
      manyTableData: null,
      onlyTableData: null,
      checkedManyParams: null,
      PicDialogVisible: false,
      picPath: null,
      editorOption:'',
      form:{
        goods_name: "",
        goods_cat: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: [],
      },
      addForm: {
        goods_name: "",
        goods_cat: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: [],
      },
      Addformrules: {
        goods_name: [
          { required: true, message: "商品名称不能为空", triggle: "blur" },
        ],
        // goods_cat: [
        //   { required: true, message: "商品分类不能为空", triggle: "blur" },
        // ],
        goods_price: [
          { required: true, message: "商品价格不能为空", triggle: "blur" },
        ],
        goods_number: [
          { required: true, message: "商品数量不能为空", triggle: "blur" },
        ],
        goods_weight: [
          { required: true, message: "商品重量不能为空", triggle: "blur" },
        ],
      },
      headerObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
    };
  },
  methods: {
    async getCateList() {
      const { data } = await this.$http.get("categories");
      this.cateList = data.data;
    },
    cateChange(value) {
      if (this.checkCate.length !== 3) {
        this.checkCate = [];
      }
      console.log(value);
      this.checkCate = value;
      this.addForm.goods_cat = value;
    },
    changeTab(oldName, newName) {
      let flag = false;
      if (oldName === "0") {
        return (flag = true);
      }
      const flag1 = this.addForm.goods_name ? true : false;
      const flag2 = this.addForm.goods_price ? true : false;
      const flag3 = this.addForm.goods_weight ? true : false;
      const flag4 = this.addForm.goods_number ? true : false;
      const flag5 = this.checkCate.length === 3 ? true : false;
      const totalFlag = flag1 && flag2 && flag3 && flag4 && flag5;
      return totalFlag;
    },
    async getParamsList(sel) {
      const { data } = await this.$http.get(
        `categories/${this.checkCate[this.checkCate.length - 1]}/attributes`,
        {
          params: {
            sel: sel,
          },
        }
      );
      if (data.meta.status === 200) {
        data.data.forEach((item) => {
          item.attr_vals =
            item.attr_vals === "" ? [] : item.attr_vals.split(" ");
        });
      }
      if (sel === "many") {
        this.manyTableData = data.data;
        this.manyTableData.forEach(item => {
          const newInfo = {attr_id:item.attr_id , attr_value:item.attr_vals}
        });
      } else {
        this.onlyTableData = data.data;
        this.onlyTableData.forEach(item => {
          const newInfo = {attr_id:item.attr_id , attr_value:item.attr_vals}
          this.addForm.attrs.push(newInfo)
        });
      }
      
      this.form.attrs = this.addForm.attrs;
    },
    async tabHandleClick(tab, event) {
      if (this.activeName === "1") {
        this.getParamsList("many");
      }
      if (this.activeName == "2") {
        const { data } = await this.$http.get(
        `categories/${this.checkCate[this.checkCate.length - 1]}/attributes`,
        {
          params: {
            sel: "only",
          },
        }
      );
        this.onlyTableData = data.data;
        this.onlyTableData.forEach(item => {
          const newInfo = {attr_id:item.attr_id , attr_value:item.attr_vals}
          this.addForm.attrs.push(newInfo)
        });
      this.form.attrs = this.addForm.attrs;
      }
    },
    handlePreview(file) {
      this.PicDialogVisible = true;
      this.picPath = file.url;
      console.log(file);
    },
    handleRemove(file) {
      const filePath = file.response.data.tmp_path;
      const index = this.addForm.pics.findIndex((path) => {
        return path == filePath;
      });
      this.addForm.pics.splice(index, 1);
    },
    handleResponse(response) {
      this.addForm.pics.push(response.data.tmp_path);
      console.log(this.addForm.pics);
    },
     onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      async addGoods(){
         this.form = JSON.parse(JSON.stringify(this.addForm));
         console.log(this.form);
         this.form.goods_cat = this.form.goods_cat.join(",")
         const {data} = await this.$http.post('goods',{
           goods_name:this.form.goods_name,
           goods_cat:this.form.goods_cat,
           goods_price:this.form.goods_price,
           goods_number:this.form.goods_number,
           goods_weight:this.form.goods_weight,
           goods_introduce:this.form.goods_introduce,
           pics:this.form.pics,
           attrs:this.form.attrs
         })
         console.log(data);
         if(data.meta.status===201){
           this.$router.push('/goods')
         }
      }
  },

  created() {
    this.getCateList();
  },
};
</script>

<style >
.el-breadcrumb {
  margin: 15px;
}
.el-steps {
  margin: 10px;
}
.el-tabs {
  margin-top: 20px;
}
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.el-dialog img {
  width: 100%;
}
.ql-editor{
  height: 300px !important;
}
.addBtn{
  margin: 20px 0 0 0;
}
</style>