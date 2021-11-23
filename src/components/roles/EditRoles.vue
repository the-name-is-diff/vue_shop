<!--
 * @Author: your name
 * @Date: 2021-11-21 15:03:39
 * @LastEditTime: 2021-11-21 16:23:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\roles\EditRoles.vue
-->
<template>
  <div class="editRoles">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <span v-if="searchRole !== null">
        <el-form
          label-width="80px"
          :model="searchRole"
          :rules="EditRules"
          ref="EditRules1"
        >
          <el-form-item label="角色ID">
            <el-input v-model="searchRole.roleId" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="searchRole.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="searchRole.roleDesc"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelState">取 消</el-button>
        <el-button type="primary" @click="onsubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      searchRole: null,
      EditRules: {
        roleName: [
          { required: true, message: "请输入角色名字", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "blur" },
        ],
        roleDesc: [
          { min: 2, max: 15, message: "长度在2到15个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    cancelState() {
      this.$emit("isEditState");
    },
    async onsubmit() {
      this.$refs.EditRules1.validate(async (valid) => {
        console.log(valid);
        if (!valid) {
          return;
        }
        this.$message.success("提交成功");
        const { data } = await this.$http.put("roles/" + this.searchRole.roleId,
          {
            roleName: this.searchRole.roleName,
            roleDesc: this.searchRole.roleDesc,
          }
        );
        this.$emit("upList");
        this.$emit("isEditState");
      });
    },
  },
  props: ["cDialogVisible", "cSearchRole"],
  watch: {
    cSearchRole(newValue) {
      this.searchRole = newValue;
    },
    cDialogVisible(newValue) {
      this.dialogVisible = newValue;
    },
  },
};
</script>

<style>
</style>