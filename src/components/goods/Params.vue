<!--
 * @Author: your name
 * @Date: 2021-11-25 20:00:00
 * @LastEditTime: 2021-11-27 17:10:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_shop\src\components\goods\Params.vue
-->
<template>
  <div class="params">
    <el-card class="box-card">
      <el-alert
        title="只允许选择第三级分类的相关数据"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-row>
        <el-col
          >选择商品分类：
          <el-cascader
            v-if="cateList !== []"
            clearable
            v-model="checkCate"
            :options="cateList"
            :props="{
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
            }"
            @blur="clearSelect"
            ref="paramstRef"
            @change="checkSelection"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            :disabled="isDisabled"
            @click="addDialogVisible = true"
            >添加参数</el-button
          >
          <el-table :data="manyTableForm" style="width: 100%" border>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  :type="tagColor[index % 5]"
                  closable
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  @close="paramsTagsClose(item,scope.row.attr_vals)"
                  >{{ item }}</el-tag>
                  <!-- 添加按钮 -->
                  <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" @click="showEditDialog(scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  @click="confirmAgain(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            :disabled="isDisabled"
            @click="addDialogVisible = true"
            >添加属性</el-button
          >
          <el-table
            :data="onlyTableForm"
            style="width: 100%"
            border
            v-if="onlyTableForm !== null"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  :type="tagColor[index % 5]"
                  closable
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  @close="paramsTagsClose(item,scope.row.attr_vals)"
                  >{{ item }}</el-tag>
                  <!-- 添加按钮 -->
                  <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" @click="showEditDialog(scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  @click="confirmAgain(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :modal-append-to-body="false"
      :title="'添加' + isCurrentName"
      :visible.sync="addDialogVisible"
      width="30%"
    >
      <span>
        <el-form
          label-width="80px"
          :model="addParams"
          :rules="addParamsRules"
          ref="addParamsRef"
        >
          <el-form-item label="参数名称" prop="attr_name">
            <el-input v-model="addParams.attr_name"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改参数 -->
    <el-dialog
      :modal-append-to-body="false"
      :title="'修改' + isCurrentName"
      :visible.sync="editDialogVisible"
      width="30%"
    >
      <span>
        <el-form
          label-width="80px"
          :model="editParams"
          :rules="editParamsRules"
          ref="editParamsRef"
          v-if="editParams !== null || editParams1 !== null"
        >
          <el-form-item label="参数名称" prop="attr_name">
            <el-input v-model="editParams.attr_name"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkEditParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],
      checkCate: [],
      activeName: "many",
      tableForm: null,
      manyTableForm: null,
      onlyTableForm: null,
      editAttrId: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      tagColor: ["", "success", "info", "warning", "danger"],
      tagList: [],
      addParams: {
        attr_name: "",
      },
      editParams: null,
      editParams1: null,
      addParamsRules: {
        attr_name: [
          { required: true, message: "请输入参数或属性名称", triggle: "blur" },
        ],
      },
      editParamsRules: {
        attr_name: [
          { required: true, message: "请输入参数或属性名称", triggle: "blur" },
        ],
      },
    };
  },
  computed: {
    isDisabled() {
      return this.checkCate.length !== 3 ? true : false;
    },
    isCurrentName() {
      if (this.activeName === "many") {
        return "动态参数";
      }
      return "静态参数";
    },
  },
  methods: {
    async getCateList() {
      const { data } = await this.$http.get("categories");
      if (data.meta.status !== 200) {
        this.$message.error("过去列表失败");
      }
      this.cateList = data.data;
    },
    clearSelect() {
      this.$refs.paramstRef.$refs.panel.clearCheckedNodes();
    },
    async getTableForm() {
      const { data } = await this.$http.get(
        `categories/${this.checkCate[this.checkCate.length - 1]}/attributes`,
        {
          params: {
            sel: this.activeName,
          },
        }
      );
      data.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
        item.inputVisible = false;
        item.inputValue = ''
      });
      if (this.activeName == "many") {
        this.manyTableForm = data.data;
      } else {
        this.onlyTableForm = data.data;
      }
      this.tableForm = data.data;
    },
    checkSelection() {
      if (this.checkCate.length !== 3) {
        this.checkCate = null;
        this.manyTableForm = []
        this.onlyTableForm = []
      }
      this.getTableForm();
    },
    handleClick(tab, event) {
      this.getTableForm();
    },
    handleChangeAdd() {},
    checkParams() {
      this.$refs.addParamsRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data } = await this.$http.post(
          `categories/${this.checkCate[this.checkCate.length - 1]}/attributes`,
          {
            attr_name: this.addParams.attr_name,
            attr_sel: this.activeName,
          }
        );
        console.log(data);
        this.addDialogVisible = false;
        this.getTableForm();
      });
    },
    checkEditParams() {
      this.$refs.editParamsRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data } = await this.$http.put(
          `categories/${this.checkCate[this.checkCate.length - 1]}/attributes/${
            this.editAttrId
          }`,
          {
            attr_name: this.editParams.attr_name,
            attr_sel: this.activeName,
          }
        );
        console.log(data);
        console.log(this.checkCate[this.checkCate.length - 1]);
        console.log(this.editAttrId);
        this.editDialogVisible = false;
        this.getTableForm();
      });
    },
    async confirmAgain(id) {
      const { data } = await this.$http.delete(
        `categories/${
          this.checkCate[this.checkCate.length - 1]
        }/attributes/${id}`
      );
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      this.getTableForm();
    },
    async showEditDialog(id) {
      const { data } = await this.$http.get(
        `categories/${this.checkCate[this.checkCate.length - 1]}/attributes/${
          id.attr_id
        }`,
        {
          attr_sel: this.activeName,
        }
      );
      console.log(id);
      console.log(data);
      this.editParams = data.data;
      this.editAttrId = id.attr_id;
      this.editDialogVisible = true;
    },
    showInput(obj){
      obj.inputVisible = true;
      this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    async handleInputConfirm(obj){
      console.log(321123);
      obj.attr_vals.push(obj.inputValue.trim())
      const {data} = await this.$http.put(`categories/${this.checkCate[this.checkCate.length -1 ]}/attributes/${obj.attr_id}`
      ,{
        attr_name : obj.attr_name,
        attr_sel:this.activeName,
        attr_vals: obj.attr_vals.join(' ')
      })
      console.log(data);
      obj.inputVisible = false
    },
    paramsTagsClose(tag,obj) {
        obj.splice(obj.indexOf(tag), 1);
    },
  },
  created() {
    this.getCateList();
  },
  watch: {
    checkCate(newValue) {
      if (!newValue) {
        this.checkCate = [];
      }
    },
  },
};
</script>

<style scoped>
.el-alert {
  margin-bottom: 20px;
}
.input-new-tag{
  width: 15%;
}
</style>