<!--
 * @Author: your name
 * @Date: 2021-11-21 11:57:37
 * @LastEditTime: 2021-11-21 14:52:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\roles\AddRoles.vue
-->
<template>
  <div class="addRoles">
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <span>
        <el-form ref="form" :model="addRolesForm" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="addRolesForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="addRolesForm.roleDesc"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item> -->
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelState()">取 消</el-button>
        <el-button type="primary"  @click="onSubmit"
          >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: null,
      addRolesForm:{
        roleName:'',
        roleDesc:''
      }
    };
  },
  methods: {
    cancelState() {
      this.$emit("isState");
    },
    async onSubmit(){    
      const {data} = await this.$http.post('roles',this.addRolesForm)
      this.$emit('isState')
      this.$emit('upList')
    }
  },
  props: ["cDialogVisible"],
  watch: {
    cDialogVisible() {
      this.dialogVisible = this.cDialogVisible;
    },
    
  },
};
</script>

<style>
</style>