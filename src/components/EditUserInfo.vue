<!--
 * @Author: your name
 * @Date: 2021-11-18 17:39:51
 * @LastEditTime: 2021-11-19 09:15:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\EditUserInfo.vue
-->
<template>
  <div class="editUserInfo">
    <el-dialog
      title="修改用户"
      :visible.sync="cEditDialogVisible"
      width="30%"
      @closed="editResetForm"
      :modal-append-to-body='false'
    >

      <span v-if="cEditUserForm!==null">
        <el-form
          label-position="right"
          label-width="80px"
          :model="cEditUserForm"
          :rules="rules"
          ref="editUserFormRef"
          
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="cEditUserForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="cEditUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="cEditUserForm.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="changeEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
      cEditDialogVisible: this.editDialogVisible,
      cEditUserForm:this.editUserForm,
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
  props: ["editDialogVisible",'editUserForm'],
  methods: {
    changeEdit() {
      this.$refs.editUserFormRef.validate(valid=>{
        if(!valid){
          return
        }
        console.log(this.cEditUserForm);
        this.$emit('modifyUser',this.cEditUserForm)
      })
      
      
      
    },
    cancelEdit() {
      this.cEditDialogVisible = false;
      this.$emit("changeEdit", this.cEditDialogVisible);
    },
    editResetForm(){
      // this.$refs.editUserFormRef.resetFields();
    }
  },
  watch:{
    editUserForm(newValue){
      this.cEditUserForm = newValue
      console.log("这里是变化的",this.cEditUserForm);
    },
    editDialogVisible(newValue){
      this.cEditDialogVisible = newValue
    }
  }
};
</script>

<style>
</style>