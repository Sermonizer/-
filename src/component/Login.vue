<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="logo" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFromRules"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button :plain="true" type="primary" @click="submitForm"
            >登录</el-button
          >
          <el-button @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 登录表单的数据绑定区域
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 登录表单的输入校验区域
      loginFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 7, message: '用户名长度在2到7之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在6到15之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，对表单内容进行重置
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 点击提交按钮，进行表单验证
    submitForm() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post('login', this.loginForm)
          if (res.meta.status !== 200) {
            return this.$message.error('登录失败')
          } else {
            this.$message.success('登录成功')
            // 1. 将登录成功后返回的token保存到客户端的sessionstorage中
            //    1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
            //    1.2 token只应该在当前网页窗口打开时有效
            window.sessionStorage.setItem('token', res.data.token)
            // 2. 通过编程式导航跳转到后台主页，路由地址是/home
            this.$router.push('/home')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-color: #2d4d6d;
}
.login_box {
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  .avatar_box {
    width: 150px;
    height: 150px;
    border: 1px solid black;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0 0 10px #ddd;
    overflow: hidden;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  // 表单默认是怪异盒模型
  box-sizing: border-box;
  width: 100%;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
