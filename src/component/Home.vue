<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/jd.jpg" alt="系统图标">
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">登出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">Aside</el-aside>
      <!-- 右侧内容区域 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear()
      // 重定向到登录页
      this.$router.push('./login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  // 左右对齐
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      height: 60px;
      width: 60px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #EAEDF1;
}
</style>
