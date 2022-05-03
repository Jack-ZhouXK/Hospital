<template>
  <div class="wrap">
    <div class="wrap-top">
      <img src="../../assets/logo.png" alt="" />
      <h1>好医生在线</h1>
    </div>
    <!-- 面包屑 -->
    <nav>
      <div class="nav-main">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#f4f4f4">
          <el-menu-item index="1">
            网站首页
          </el-menu-item>
          <el-menu-item index="4">
            就医指南
          </el-menu-item>
          <el-menu-item index="5">
            新闻中心
          </el-menu-item>
          <el-menu-item index="6">
            注册登录
          </el-menu-item>
        </el-menu>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    "pageHomeTop";
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    //导航栏菜单跳转
    handleSelect(tab) {
      if (tab == 1) {
        this.$router.push('/pageHome')
      }
      if (tab == 4) {
        this.$router.push('/guide')
      }
      if (tab == 5) {
        this.$router.push('/journalism')
      }
      if (tab == 6) {
        this.$router.push('/login')
      }
    },
  },
};
</script>

<style scope lang="less">
.wrap {
  width: 100%;
  height: 180px;
}
.wrap-top {
  width: 80%;
  height: 65%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  img {
    width: 150px;
    height: 100px;
  }
  h1 {
    margin-left: 30px;
    color: blue;
  }
}
nav {
  background-color: #f4f4f4;
  height: 33%;
  .nav-main {
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}
.el-menu.el-menu--horizontal {
  display: flex;
  justify-content: space-between;
}
a {
  text-decoration: none;
}
</style>