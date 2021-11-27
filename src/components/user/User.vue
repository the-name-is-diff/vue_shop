<!--
 * @Author: your name
 * @Date: 2021-11-17 17:21:49
 * @LastEditTime: 2021-11-23 20:21:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\user\User.vue
-->
<template>
  <div class="user" v-if="userInfo !== null">
     <breadcrumb>
      <span slot="first">用户管理</span>
      <span slot="second">用户列表</span>
     </breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            @change="getUsersList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsersList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = !dialogVisible"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="userInfo.users" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="姓名" prop="username"> </el-table-column>
        <el-table-column label="邮箱" prop="email"> </el-table-column>
        <el-table-column label="电话" prop="mobile"> </el-table-column>
        <el-table-column label="状态" prop="">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" prop="">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改用户"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="searchUser(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除用户"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="searchUser1(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                @click="setUserRole(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        @getUserList="getUsersList"
        :pagesize="queryInfo.pagesize"
        :pagenum="queryInfo.pagenum"
        @setPageSize="setPageSize"
        @setPageNum="setPageNum"
      >
      </pagination>
    </el-card>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="70%"
      @close="clearAddUserForm"
      :modal="false"
    >
      <span v-if="addUserForm !== null">
        <el-form
          label-position="right"
          label-width="80px"
          :model="addUserForm"
          :rules="rules"
          ref="addUserForm"
        >
          <el-form-item label="用户名" :model="addUserForm" prop="username">
            <el-input v-model="addUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="addUserForm.password"
              show-password
              ref="showPassword"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addUserForm.mobile"></el-input>
          </el-form-item> </el-form
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息 -->
    <editUserInfo
      :editDialogVisible="editDialogVisible"
      @changeEdit="changeEdit"
      :editUserForm="editUserForm"
      @modifyUser="modifyUser"
    ></editUserInfo>
    <!-- 删除用户 -->
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%"
      :modal-append-to-body="false"
      v-if="editUserForm !== null"
    >
      <span>
        <span>用户名:</span>
        <h3>{{ editUserForm.username }}</h3>
        <p>是否删除用户"{{ editUserForm.username }}"</p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser(editUserForm.id)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 设置用户角色 -->
    <el-dialog
      title="设置用户角色"
      :visible.sync="setRoleDialogVisible"
      :modal-append-to-body="false"
      v-if="editUserForm !== null"
    >
      <div slot="footer" class="dialog-footer">
        <el-form
          label-width="80px"
        >
          <el-form-item label="用户名">
            <el-input v-model="editUserForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色名">
            <el-input v-model="editUserForm.rid" disabled></el-input>
          </el-form-item>
        
        <el-form-item>
          <el-select v-model="currentCheckedRole" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
        </el-form-item>
        </el-form>
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensureRole(editUserForm.id,currentCheckedRole)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "../Pagination.vue";
import EditUserInfo from "../EditUserInfo.vue";
import Breadcrumb from '../Breadcrumb.vue'
export default {
  data() {
    var checkemail = (rule, value, callback) => {
      const regEmial =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regEmial.test(value)) {
        return callback();
      }
      return callback(new Error("请输入合法的邮箱"));
    };
    var checkmobile = (rule, value, callback) => {
      const regEmial =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
      if (regEmial.test(value)) {
        return callback();
      }
      return callback(new Error("请输入合法的手机号码"));
    };

    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userInfo: null,
      dialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false,
      setRoleDialogVisible: false,
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      editUserForm: null,
      rolesList:null,
      currentCheckedRole:null,
      // 防暴力点击flag
      defense: 0,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            validator: checkemail,
            message: "请输入合法的邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            validator: checkmobile,
            message: "请输入合法的手机号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async getUsersList() {
      const { data } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (data.meta.status !== 200) {
        return this.$message.error("获取用户信息失败");
      }
      this.userInfo = data.data;
    },
    setPageNum(value) {
      this.queryInfo.pagenum = value;
    },
    setPageSize(value) {
      this.queryInfo.pagesize = value;
    },
    async userStateChanged(userInfo) {
      const { data } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      console.log(data);
      if (data.meta.status !== 200) {
        if (this.defense === 0) {
          this.$message.error({
            message: "用户状态更新失败",
            type: "error",
            duration: 1000,
          });
          this.defense = 1;
          setTimeout(() => {
            this.defense = 0;
          }, 1000);
        }
      } else {
        if (this.defense === 0) {
          this.$message({
            message: "用户状态更新成功",
            type: "success",
            duration: 1000,
          }),
            (this.defense = 1);
          setTimeout(() => {
            this.defense = 0;
          }, 1000);
        }
      }
    },
    addUser() {
      this.$refs.addUserForm.validate(async (valid) => {
        if (!valid) {
          return;
        }
        this.dialogVisible = false;
        const { data } = await this.$http.post("users", this.addUserForm);
        console.log(data);
        if (data.meta.status === 201) {
          this.$message({
            message: "用户创建成功",
            type: "success",
            duration: 1000,
          });
        } else {
          this.$message({
            message: "用户创建失败",
            type: "error",
            duration: 1000,
          });
        }
        this.getUsersList();
      });
    },
    clearAddUserForm() {
      this.$refs.addUserForm.resetFields();
    },
    changeEdit(flag) {
      this.editDialogVisible = flag;
    },
    async searchUser(id) {
      this.editDialogVisible = true;
      const { data } = await this.$http.get(`users/${id}`, id);
      this.editUserForm = data.data;
    },
    async searchUser1(id) {
      this.deleteDialogVisible = true;
      const { data } = await this.$http.get(`users/${id}`, id);
      this.editUserForm = data.data;
    },
    async modifyUser(obj) {
      console.log(obj);
      const { data } = await this.$http.put("users/" + this.editUserForm.id, {
        mobile: this.editUserForm.mobile,
        email: this.editUserForm.email,
      });
      console.log(data);
      this.editDialogVisible = false;
      this.getUsersList();
    },
    async deleteUser(id) {
      const { data } = await this.$http.delete("users/" + id, {
        id,
      });
      this.deleteDialogVisible = false;
      if (data.meta.status === 200) {
        this.$message({
          type: "success",
          message: "删除用户成功",
        });
        this.getUsersList();
      } else {
        this.$message.error("删除用户失败");
      }
    },
    async setUserRole(id) {
      this.setRoleDialogVisible = true;
      const { data } = await this.$http.get(`users/${id}`, id);
      this.editUserForm = data.data;
    },
    async getRoleList(){
      const {data} = await this.$http.get('roles');
      this.rolesList = data.data;
    },
    async ensureRole(id,rid){
      console.log(id);
      console.log(rid);
      this.setRoleDialogVisible = false
      const {data} = await this.$http.put(`users/${id}/role`,{
        rid:parseInt(rid)
      })
      console.log(data);
    }
  },
  created() {
    this.getUsersList();
    this.getRoleList();
  },
  components: {
    Pagination,
    EditUserInfo,
    Breadcrumb
  },
};
</script>

<style>
.el-table {
  margin-top: 20px;
}
</style>