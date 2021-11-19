<!--
 * @Author: your name
 * @Date: 2021-11-16 19:03:34
 * @LastEditTime: 2021-11-17 08:18:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后台管理\vue_shop\src\components\Login.vue
-->
<template>
  <div class="login_container">
    <div class="login_box animate__animated animate__fadeInDown">
      <h2>用户登录</h2>
      <el-form
       ref="form" 
       :model="form" 
       label-width="70px" 
       class="login_form" 
       :rules="loginFromRules">
        <el-form-item label="用户名" prop="username">
        <el-input 
        placeholder="请输入用户名"  
        prefix-icon="el-icon-user-solid" 
        v-model="form.username"
        ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
        <el-input 
        placeholder="请输入密码"  
        prefix-icon="el-icon-lock" 
        show-password 
        v-model="form.password"
        ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="formValidate">登录</el-button>
          <el-button type="info" @click="clearLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import 'animate.css'
export default {
  data() {
    return {
      form:{
        username:'admin',
        password:'123456'
      },
      loginFromRules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    clearLoginForm(){
      this.$refs.form.resetFields();
    },
    formValidate(){
      this.$refs.form.validate(async flag=>{
        if(!flag){
          this.$message.error('用户名或密码错误')
          }
        else{
          const {data} = await this.$http.post('login',this.form)
          if(data.meta.status === 200){
            this.$message({
              message:'登陆成功',
              type:'success'
            })
            window.sessionStorage.setItem('token',data.data.token)
            this.$router.push('home')
          }
          else{
            this.$message('登陆失败')
          }
        }
      })
    }
  }
}
</script>

<style  scoped>
.login_container{
  background-color: #324057;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: calc(50% - 225px);
  top: calc(50% - 150px);
  text-align: center;
}
.login_box h2{
  color: rgb(112,39,39);
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.login_form{
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: 15px;
}
</style>