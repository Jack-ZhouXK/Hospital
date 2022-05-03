<template>
  <div>
    <adminTop></adminTop>
    <main>
      <el-row>
        <el-col :span="24">
          <h3>预约管理</h3>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="15">
          <el-form :model="query" label-width="80px">
            <el-form-item label="姓名" label-width="100px">
              <el-input v-model="query.name" placeholder="患者姓名"></el-input>
              <el-input v-model="query.doctor" placeholder="预约医生" style="width: 200px"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="queryByNameAndDoctor">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 数据 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="序号" width="80px">
            <template slot-scope="scopes">
              {{ scopes.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="患者名称"> </el-table-column>
          <el-table-column prop="department.name" label="科室"> </el-table-column>
          <el-table-column prop="doctor.name" label="预约医生"> </el-table-column>
          <el-table-column prop="time" label="预约时间"> </el-table-column>
          <el-table-column prop="price" label="门诊费"> </el-table-column>
        </el-table>
      </el-row>
    </main>
  </div>
</template>

<script>
import adminTop from "./admin-top.vue";
export default {
  components: {
    adminTop,
  },
  data() {
    return {
      query: {
        name: "",
        doctor: "",
      },
      tableData: [ ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("/reserveInfo/queryAll").then((res) => {
        this.tableData = res.data;
        console.log(res.data);
      });
    },
    deleteDocket(id) {
      this.Doctor.user.id = id;
      this.$http.post("/reserveInfo/delete", this.Doctor).then((res) => {
        this.$message.success("删除成功");
         return this.getList();
      });
      return this.$message.error("服务繁忙,稍后重试");
    },
    queryByNameAndDoctor(){
      this.$http.post("/reserveInfo/queryByPatientName?patientName="+this.query.name+"&doctorName="+this.query.doctor).then((res) => {
        this.$message.success("查询成功");
        return this.tableData = res.data;
      }).catch(res =>{
        return this.$message.error("服务繁忙,稍后重试");
      })
      
    }
  },
};
</script>

<style scoped lang="less">
main {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  h3 {
    font-family: "楷体";
    font-weight: 300;
    color: rgba(0, 0, 0, 0.633);
  }
  .el-input {
    width: 30%;
  }
}
</style>