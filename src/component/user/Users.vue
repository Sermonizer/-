<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体区域 -->
    <el-card>
      <!-- 用户搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 输入框双向绑定query属性，添加获取用户列表方法 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryObj.query"
            clearable
            @clear="getUserList"
          >
            <!-- 搜索按钮 -->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getSearchList"
            ></el-button></el-input
        ></el-col>
        <el-col :span="6"
          ><el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <!-- 指定slot作用域插槽接收当前数据，并且能够覆盖prop的内容 -->
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="handleStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" class="editColumn">
          <template>
            <!-- 操作按钮 -->
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryObj.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryObj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 对话框显示区域 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <!-- 新增用户 -->
      <el-form
        :model="addUserForm"
        :rules="addUserRules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户数据列表的请求参数
      queryObj: {
        // 搜索关键词
        query: '',
        // 当前是第几页
        pagenum: 1,
        // 当前页面显示数据条数
        pagesize: 2
      },
      // 保存用户列表的对象
      userList: [],
      // 所有用户条数
      total: 0,
      dialogVisible: false,
      // 新增用户时填写的表单
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 新增用户时的表单验证规则
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号码格式不正确', trigger: 'blur' }
        ]
      }
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
    },
    // 搜索时获取用户列表的方法，将queryObj的页码改为1
    getSearchList() {
      this.queryObj.pagenum = 1
      this.getUserList()
    },
    // 当前页面显示条数发生改变时触发的事件
    handleSizeChange(newSize) {
      this.queryObj.pagesize = newSize
      // 触发该事件时向后台请求数据
      this.getUserList()
    },
    // 翻页时触发的事件
    handleCurrentChange(newPage) {
      this.queryObj.pagenum = newPage
      this.getUserList()
    },
    // 更新用户状态时触发的回调
    async handleStateChange(newInfo) {
      const { data: res } = await this.$http.put(
        `users/${newInfo.id}/state/${newInfo.mg_state}`
      )
      // 判断请求是否成功
      if (res.meta.status !== 200) {
        // 若不成功，将页面上的状态更新回原来的状态
        newInfo.mg_state = !newInfo.mg_state
        return this.$message.error('用户状态更改失败')
      }
      this.$message.success('用户状态更新成功')
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 20px;
}
</style>
