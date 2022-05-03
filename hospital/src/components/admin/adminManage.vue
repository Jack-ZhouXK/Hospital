<template>
  <div>
    <adminTop></adminTop>
    <main>
      <el-row>
        <el-col :span="24">
          <h3>管理员管理</h3>
        </el-col>
        <!-- 搜索框 -->
        <!-- <el-col :span="3" :offset="21" style="margin-bottom:30px">
          <el-button type="primary" icon="el-icon-circle-plus-outline"
            >添加</el-button
          >
        </el-col> -->
        <!-- 数据 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column  label="序号" >
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
          </el-table-column>
          <el-table-column prop="username" label="账号" >
          </el-table-column>
          <el-table-column prop="password" label="密码"> </el-table-column>
          <!-- <el-table-column  label="操作">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
            >
              <el-button type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button type="primary" icon="el-icon-delete-solid"></el-button>
            </el-tooltip>
          </el-table-column> -->
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
        condition: "",
      },
      tableData: [],
    };
  },
  created(){
    this.getList()
  },
  methods:{
      getList(){
          this.$http.get('user/queryAllAdmin').then(res=>{
            return this.tableData = res.data;
          }).catch(res =>{
            return this.$message.error('获取失败')
          })
         
      }
  }
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