<template>
  <div>
    <adminTop></adminTop>
    <main>
      <el-row>
        <el-col :span="24">
          <h3>患者管理</h3>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="15">
          <el-form :model="query" label-width="80px">
            <el-table-column label="序号" width="80px">
              <template slot-scope="scopes">
                {{ scopes.$index + 1 }}
              </template>
            </el-table-column>
            <el-form-item label="姓名" label-width="100px">
              <el-input
                v-model="query.condition"
                placeholder="患者姓名"
              ></el-input>
              <el-button type="primary" icon="el-icon-search" @click="queryByName">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 数据 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scopes">
              {{ scopes.row.sex == 0 ? "女" : "男" }}
            </template>
          </el-table-column>
          <el-table-column prop="flag" label="是否住院">
            <template slot-scope="scopes">
              {{ scopes.row.flag == 0 ? "未住院" : "住院" }}
            </template>
          </el-table-column>
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
       condition:''
      },
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("/patient/queryAll").then((res) => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    //通过名字查询
    queryByName(){
        console.log(this.query.condition);
        this.$http.get('/patient/queryPatientByName?name='+this.query.condition).then(res=>{
            this.tableData = res.data;
            return this.$message.success('获取成功')
        })    
        return this.$message.error('获取失败')
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