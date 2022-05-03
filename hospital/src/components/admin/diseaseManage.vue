<template>
  <div>
    <adminTop></adminTop>
    <main>
      <el-row>
        <el-col :span="24">
          <h3>疾病管理</h3>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="15">&nbsp;</el-col>
        <el-col :span="3" :offset="4">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            style="margin-bottom: 20px"
            @click="addDailog=true">添加</el-button
          >
        </el-col>
        <!-- 数据 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="序号" width="180px">
            <template slot-scope="scopes">
              {{ scopes.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="疾病名称"></el-table-column>
          <el-table-column prop="info" label="介绍"> </el-table-column>
          <el-table-column prop="address" label="操作" width="180px">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-delete-solid"
                  @click="deleteById(scope.row.id)"
                ></el-button>
              </el-tooltip>
                 <!-- 添加弹出层 -->
               <el-dialog title="添加疾病" :visible.sync="addDailog">
                  <el-form v-model="addDisease">
                   <el-form-item label="名称">
                    <el-input v-model="addDisease.name" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="介绍">
                    <el-input v-model="addDisease.info" type="textarea" autocomplete="off"></el-input>
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
        doctor: "",
      },
      addDailog:false,
      addDisease:{
        name:'',
        info:''
      },
      tableData: [],
      disease: {
        id: 0,
        name: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("/disease/queryAll").then((res) => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    deleteById(id) {
      this.disease.id = id;
      this.$http
        .post("/disease/delete", this.disease)
        .then((res) => {
          this.$message.success("删除成功");
          return this.getList();
        })
        .catch((mess) => {
          this.$message.error("删除失败" + mess);
        });
    },
    addDailogs(){
       this.$http.post('/disease/addDisease',this.addDisease).then(res=>{
        this.addDailog = false
        this.$message.success('添加成功')
        return this.getList()
      }).catch(res=>{ return this.$message.error('添加失败')})
     
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