<template>
  <div>
    <adminTop></adminTop>
    <main>
      <el-row>
        <el-col :span="24">
          <h3>科目查询管理</h3>
        </el-col>
        <el-col :span="3" :offset="20" style="margin-bottom: 20px">
          <el-button type="primary" icon="el-icon-circle-plus-outline"
           @click="addDailog=true">添加</el-button
          >
        </el-col>
        <!-- 数据 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="科室名称"></el-table-column>
          <el-table-column  label="操作" width="80px">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteById(scope.row.id)"
                ></el-button>
              </el-tooltip>
              <!-- 添加弹出层 -->
               <el-dialog title="添加科室" :visible.sync="addDailog">
                  <el-form v-model="addSubject">
                   <el-form-item label="科室名称">
                    <el-input v-model="addSubject.name" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-button type="primary" @click="addDailogs">确认添加</el-button>
                   <el-button type="info" @click="addDailog=false">取消</el-button>
                  </el-form>
               </el-dialog>
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
        name: "",
        toTime: "",
      },
      addSubject:{
        name:''
      },
      tableData: [],
      Department:{
        id:0,
        name:''
      },
      addDailog:false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("/department/queryAll").then((res) => {
        this.tableData = res.data;
      });
    },
    deleteById(id) {
      this.Department.id = id;
      this.$http
        .post("/department/delete", this.Department)
        .then((res) => {
          this.$message.success("删除成功");
          return this.getList();
        })
        .catch((mess) => {
          this.$message.error("删除失败" + mess);
        });

    },
    addDailogs(){
       this.$http.post('/department/addDepartment',this.addSubject).then(res=>{
       this.addDailog = false
       this.$message.success('添加成功')
       return this.getList()
      }).catch(res=>{
        this.$message.error('添加失败')
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