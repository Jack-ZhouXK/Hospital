<template>
  <div>
    <adminTop></adminTop>
    <main>
      <el-row>
        <el-col :span="24">
          <h3>病史管理</h3>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="15">
          <el-form :model="query" label-width="80px">
            <el-form-item label="姓名" label-width="100px">
              <el-input v-model="query.name" placeholder="患者姓名"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="queryByName">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 数据 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="patient.name" label="姓名"></el-table-column>
          <el-table-column prop="patient.sex" label="性别">
             <template slot-scope="scope">
              {{ scope.row.patient.sex == 0 ? "女" : "男" }}
            </template>
          </el-table-column>
          <el-table-column prop="doctor.name" label="主治医生"></el-table-column>
          <el-table-column prop="info" label="病情"></el-table-column>
          <el-table-column prop="time" label="诊断时间"></el-table-column>
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
      },
      tableData: [ ],
      JudgeInfo:{
        id:0
      }
    };
  },
   created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("/judgeInfo/queryAll").then((res) => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    deleteDocket(id) {
      this.JudgeInfo.id = id;
      this.$http.post("/judgeInfo/delete", this.JudgeInfo).then((res) => {
        this.$message.success("删除成功");
         return this.getList();
      }).catch(res=>{ return this.$message.error("服务繁忙,稍后重试");})
     
    },
    queryByName(){
       this.$http.get("/patient/queryJudgeInfoByName?name="+this.query.name).then((res) => {
        this.$message.success("查询成功");
        return this.tableData = res.data;
      }).catch(res=>{ return this.$message.error("服务繁忙,稍后重试");})
     
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