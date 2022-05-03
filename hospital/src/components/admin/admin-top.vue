<template>
  <div>
    <nav>
      <el-row class="nav_row">
        <el-col :span="6">
          <h3>好医生在线预约问诊网站</h3>
        </el-col>
        <el-col :span="10">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-submenu index="2">
              <template slot="title">系统管理</template>
              <el-menu-item index="21">医生管理 </el-menu-item>
              <el-menu-item index="22">患者管理</el-menu-item>
              <el-menu-item index="23">药品管理 </el-menu-item>
              <el-menu-item index="24">科目查询管理 </el-menu-item>
              <el-menu-item index="25">疾病管理 </el-menu-item>
            </el-submenu>
            <el-menu-item index="1">预约管理</el-menu-item>
            <el-menu-item index="2">病史管理</el-menu-item>
            <el-menu-item index="4">管理员管理 </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4" :offset="4">
          <el-row class="navi">
            <el-col :span="10">欢迎:<span>{{ username }}</span></el-col >
            <el-col :span="10" :offset="4" > <span @click="outLogin">退出登录</span> </el-col>
          </el-row>
        </el-col>
      </el-row>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    "admin-top"
    return {
      activeIndex: '1',
      activeIndex2: '1',
      username:''
    };
  },
  created(){
       this.loadingUsername()
  },
  methods: {
    handleSelect(tab) {
      console.log(tab);
      if (tab == 1) {
        this.$router.push('/makeManage')
      }
      if (tab == 2) {
        this.$router.push('/MedicalManage')
      }
      if (tab == 4) {
        this.$router.push('/adminManage')
      }
      if (tab == 21) {
        this.$router.push('/doctorManage')
      }
      if (tab == 22) {
        this.$router.push('/patientManage')
      }
      if (tab == 23) {
        this.$router.push('/drugsManage')
      }
        if (tab == 24) {
        this.$router.push('/subjectSelect')
      }
      if (tab == 25) {
        this.$router.push('/diseaseManage')
      }
    },
    loadingUsername(){
      this.username = sessionStorage.getItem('username')
    },
    outLogin(){
        sessionStorage.clear();
        if(sessionStorage.getItem('username')==null){
             this.$message.success('退出成功')
             return this.$router.push('/PageHome')
        }
    }
  }
}
</script>

<style scoped lang="less">
nav {
  width: 100%;
  height: 100%;
  background: linear-gradient(#0070c3, #00adde) left;
  color: #f4f4f4;
  .nav_row {
    text-align: center;
    line-height: 61px;
  }
  h3 {
    margin: 0;
    padding: 0;
  }
}
.el-menu {
  background: linear-gradient(#0070c3, #00adde) left;
}
.el-menu--horizontal > .el-menu-item {
  color: #f4f4f4 !important;
}
.system {
  color: #f4f4f4 !important;
}
.el-menu--popup {
  min-width: 120px !important;
}
.navi {
  cursor: pointer;
}
</style>
