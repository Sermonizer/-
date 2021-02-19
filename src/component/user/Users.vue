<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8"
          ><el-input placeholder="请输入内容"
            ><el-button
              slot="append"
              icon="el-icon-search"
            ></el-button></el-input
        ></el-col>
        <el-col :span="6"
          ><el-button type="primary">添加用户</el-button></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户数据列表的请求参数
      queryObj: {
        query: '',
        pagenum: 2,
        pagesize: 2
      },
      // 用户列表
      userList: [],
      // 所有用户
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取用户列表方法
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryObj
      })
      if (res.meta.status !== 200) {
        return this.$message.error('用户列表请求失败')
      }
      this.userList = res.data.users
      this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>
</style>
