<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="40%"
    @close="handleDialogClose"
  >
    <!-- 新增用户 -->
    <el-form
      :model="addUserForm"
      :rules="addUserFormRules"
      ref="addUserFormRef"
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
      <el-button type="primary" @click="addUserPrefix">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { validateEmail, validateMobile } from './Validate'
import Users from '../Users.vue'
export default {
  data() {
    return {
      // 控制新增用户时对话框的开闭的布尔值
      dialogVisible: false,
      // 新增用户时填写的表单
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 新增用户时的表单验证规则
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击取消按钮，对话框关闭，表单重置的回调
    handleDialogClose() {
      this.$refs.addUserFormRef.resetFields()
    },
    // 添加用户表单前的预校验
    addUserPrefix() {
      // 表单校验函数
      this.$refs.addUserFormRef.validate(async valid => {
        if (valid) {
          // 发起添加用户的网络请求
          const { data: res } = await this.$http.post('users', this.addUserForm)
          if (res.meta.status !== 201) {
            return this.$message.error('添加用户失败')
          }
          this.$message.success('添加用户成功')
          // 关闭对话框
          this.dialogVisible = false
          // 重新获取用户列表
          Users.getAllUserList()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
