<template>
  <el-container class="home-container">
    <!-- 页面头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 页面侧边框 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 折叠展开按钮 -->
        <div class="toggle-button" @click="toggleCollapse">
          <i class="el-icon-s-unfold" style="font-size: 20px"></i>
        </div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="iscollapse_transition"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 页面主体 -->
      <el-main>
        <!--路由站位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      //导航栏数据
      menuList: [],
      //图标数组
      iconsObj: {
        101: 'el-icon-user',
        102: 'el-icon-s-tools',
        103: 'el-icon-star-on',
        104: 'el-icon-zoom-in',
        105: 'el-icon-eleme',
      },
      //折叠状态
      isCollapse: false,
      //折叠动画
      iscollapse_transition: false,
      //二级菜单选中高亮
      activePath: '',
    }
  },
  //创建就执行的生命周期函数
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    //退出功能
    loginOut() {
      //清空sessionStorage
      window.sessionStorage.clear()
      if (sessionStorage.getItem('token') == null) {
        this.$message.info('退出成功,期待下次光临!')
        //重定向到登录页面
        this.$router.push('/login')
      }
    },
    //获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('user/menus')
      if (res.status != 200) {
        return this.$message.error(res.message)
      }
      this.menuList = res.data
    },
    //菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    //保存链接激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath;
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      width: 60px;
    }
  }
}
.el-aside {
  background-color: #373d41;
  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>