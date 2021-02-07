<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="./assets/logo.png" alt="logo" />
      </div>
      <!-- 登录表单区域 -->
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      form: {
        name: '11',
        password: '22'
      }
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
</style>
