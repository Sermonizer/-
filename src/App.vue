<template>
  <div id="app">
    <div class="loginForm">
      <el-form>
        <el-form-item></el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  background-color: #2d4d6d;
}
.loginForm {
  width:450px;
  height: 360px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
</style>
