<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="./assets/logo.png" alt="logo">
      </div>
      <el-form :model="form">
        <el-form-item v-model="form.name"></el-form-item>
        <el-form-item v-model="form.password"></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
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
  width:450px;
  height: 360px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
</style>
