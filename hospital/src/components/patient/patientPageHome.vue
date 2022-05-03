<template>
  <div class="wrap">
    <h3>好医生在线预约问诊网站</h3>
    <el-row style="background-color: rgba(0, 0, 255, 0.1)">
      <el-col :span="4" :offset="20">
        <el-button type="primary" @click="outLogin">退出登录</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="1">
        <nav>
          <h3>病史</h3>
          <h3 @click="toRegistration">挂号</h3>
        </nav>
      </el-col>
      <el-col :span="18">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="patient.name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="info" label="症状"> </el-table-column>
          <el-table-column prop="time" label="患病时间"> </el-table-column>
          <el-table-column prop="doctor.name" label="就诊医生"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        name: "",
      },
      patient: {
        name: "",
        describe: "",
      },
      tableData: [],
    };
  },
  created() {
    this.getList();
   
  },
  methods: {
    toRegistration() {
      this.$router.push("/Registration");
    },
    outLogin() {
      sessionStorage.clear();
      if (sessionStorage.getItem("username") == null) {
        this.$message.success("退出成功");
        return this.$router.push("/PageHome");
      }
    },
    getList() {
      this.$http
        .get( "/patient/queryJudgeInfoByPatientId?id=" +  sessionStorage.getItem("userId")  )
        .then((res) => {
          this.tableData = res.data;
        }).catch(res =>{ return this.$message.error("服务器繁忙,请稍后重试");})
    },
  },
};
</script>

<style scoped lang="less">
.wrap {
  width: 80%;
  margin: 0 auto;
  h3 {
    color: rgba(0, 0, 255, 0.432);
    text-align: center;
  }
  nav {
    width: 80%;
    height: auto;
    margin-top: 20px;
    box-shadow: 5px 5px 5px #8d8383;
    h3 {
      height: 70px;
      line-height: 70px;
      cursor: pointer;
    }
    h3:nth-child(1) {
      background-color: rgba(0, 0, 255, 0.432);
    }
    h3:hover {
      background-color: rgba(0, 0, 255, 0.432);
    }
  }
}

.el-input {
  width: 40%;
}
</style>