<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/jd.jpg" alt="系统图标" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">登出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-collapse" @click="toggleCollapse">|||</div>
        <!-- unique-opened: 是否只能打开一个子菜单 collapse：是否水平折叠菜单-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 循环渲染一级菜单，动态绑定index值 -->
          <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
            <!-- 模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsList[item.id]"></i>
              <!-- 动态绑定菜单文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="handleActive('/' + subItem.path)"
            >
              <i class="el-icon-menu"></i>
              {{ subItem.authName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单栏数据
      menuList: [],
      // 图标id和类
      iconsList: {
        125: 'el-icon-user',
        103: 'el-icon-lock',
        101: 'el-icon-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-data'
      },
      // 保存折叠状态的对象
      isCollapse: false,
      // 当前高亮激活的路径
      activePath: ''
    }
  },
  // created钩子创建一个实例之后会被运行的代码
  created() {
    // 获取所有的菜单数据
    this.getAsideMenuList()
    // 从sessionStorage里读取当前激活的链接
    this.activePath = window.sessionStorage.getItem('subItemPath')
  },
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear()
      // 重定向到登录页
      this.$router.push('./login')
    },
    async getAsideMenuList() {
      // data解构赋值
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(res)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    handleActive(subItemPath) {
      window.sessionStorage.setItem('subItemPath', subItemPath)
      this.activePath = subItemPath
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
  transition: width 0.6s;
  .el-menu {
    border-right: 0;
  }
  .toggle-collapse {
    background-color: #4a5064;
    color: #fff;
    line-height: 24px;
    font-size: 10px;
    text-align: center;
    cursor: pointer;
  }
}

.el-main {
  background-color: #eaedf1;
}
</style>
