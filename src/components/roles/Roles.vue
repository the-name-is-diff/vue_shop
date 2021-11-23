<!--
 * @Author: your name
 * @Date: 2021-11-21 11:22:56
 * @LastEditTime: 2021-11-22 10:55:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\roles\Roles.vue
-->
<template>
  <div class="Roles">
    <el-card class="box-card">
      <el-button type="primary" @click="addRoles">添加用户</el-button>
      <el-table
        :data="rolesList"
        style="width: 100%"
        border
        v-if="rolesList !== null"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              class="borbottom vcenter"
              :class="{ bortop: index === 0 }"
              v-for="(item, index) in scope.row.children"
              :key="item.id"
            >
              <el-col :span="5">
                <el-tag
                  class="animate__animated animate__flipInY"
                  closable
                  @close="removeRightTig(scope.row, item2.id)"
                  >{{ item.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  class="bortop vcenter"
                  v-for="(item1, index) in item.children"
                  :key="item1.id"
                >
                  <el-col :span="6">
                    <el-tag
                      class="animate__animated animate__flipInY"
                      type="success"
                      closable
                      @close="removeRightTig(scope.row, item1.id)"
                      >{{ item1.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      class="animate__animated animate__flipInY"
                      closable
                      @close="removeRightTig(scope.row, item2.id)"
                      type="info"
                      v-for="(item2, index) in item1.children"
                      :key="item2.id"
                      >{{ item2.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit-outline"
              @click="EditRoles(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteRoles(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="success"
              icon="el-icon-setting"
              @click="showSetRight('tree',scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add-roles
      :cDialogVisible="addDialogVisible"
      @isState="isState"
      @upList="getRolesList"
    ></add-roles>
    <edit-roles
      :cDialogVisible="EditDialogVisible"
      :cSearchRole="searchRole"
      @isEditState="isEditState"
      @upList="getRolesList"
    >
    </edit-roles>
    <!-- 展示获得权限 -->
    <el-dialog
    v-if="showAllRights !==null && defaultRights !==[]"
      title="分配权限"
      :visible.sync="setDialogVisible"
      width="30%"
      :modal-append-to-body="false"
      @closed="refreshDefaultRights"
    >
      <span>
        <el-tree
          ref="rightTreeRef"
          :data="showAllRights"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="defaultRights"
          :props="rightsProps"
        >
        </el-tree>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCheckedRights()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "animate.css";
import AddRoles from "./AddRoles.vue";
import EditRoles from "./EditRoles.vue";
export default {
  components: {
    AddRoles,
    EditRoles,
  },
  data() {
    return {
      addDialogVisible: false,
      rolesList: null,
      searchRole: null,
      EditDialogVisible: false,
      setDialogVisible: false,
      showAllRights:null,
      currentRoleId:'',
      defaultRights:[],
      rightsProps:{
        children:'children',
        label:'authName'
      }
    };
  },
  methods: {
    async getRolesList() {
      const { data } = await this.$http.get("roles");
      this.rolesList = data.data;
    },
    isState() {
      this.addDialogVisible = false;
    },
    isEditState() {
      this.EditDialogVisible = false;
    },
    addRoles() {
      this.addDialogVisible = true;
    },
    async EditRoles(id) {
      this.EditDialogVisible = true;
      const { data } = await this.$http.get("roles/" + id, {
        id,
      });
      this.searchRole = data.data;
    },
    async deleteRoles(id) {
      const { data } = await this.$http.delete("roles/" + id);
      if (data.meta.status === 200) {
        this.$message.success("删除成功");
        this.getRolesList();
      } else {
        this.$message.error("删除失败");
      }
    },
    removeRightTig(role, rightid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await this.$http.delete(
            `roles/${role.id}/rights/${rightid}`
          );
          role.children = data.data;

          this.$message({
            type: "success",
            message: "删除成功！",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async showSetRight(type,obj) {
      const { data } = await this.$http.get("rights/" + type);
      console.log(data);
      this.getCheckedRights(obj,this.defaultRights)
      this.currentRoleId = obj.id
      this.setDialogVisible = true;
      this.showAllRights = data.data
    },
    getCheckedRights(node,arr){
      if(!node.children){
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getCheckedRights(item,arr)
      });
    },
    refreshDefaultRights(){
      this.defaultRights = []
    },
    async saveCheckedRights(){
    const keys =[
      ...this.$refs.rightTreeRef.getHalfCheckedNodes(),
      ...this.$refs.rightTreeRef.getCheckedKeys()
    ]
    console.log(keys);
    const str = keys.toString()
    const {data} = await this.$http.post(`roles/${this.currentRoleId}/rights`,{
      rids:str
    })
    if(data.meta.status === 200){
      this.$message.success('角色权限更新成功')
    }
    else{
      this.$message.error('角色权限更新失败')
    }
    this.setDialogVisible = false
    this.getRolesList()
    }
  },
  created() {
    this.getRolesList();
  },
};
</script>

<style>
.el-tag {
  margin: 10px;
  margin-left: 40px;
}
.borbottom {
  border-bottom: 1px solid #ddd;
}
.bortop {
  border-top: 1px solid #ddd;
}
</style>