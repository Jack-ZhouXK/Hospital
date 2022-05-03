<template>
  <div>
    <adminTop></adminTop>
    <main>
      <el-row>
        <el-col :span="24">
          <h3>药品管理</h3>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="15">
          <el-form :model="query" label-width="80px">
            <el-form-item label="姓名" label-width="100px">
              <el-input
                v-model="query.condition"
                placeholder="药品查询"
              ></el-input>
              <el-button type="primary" icon="el-icon-search" @click="queryByDrugsName">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3" :offset="4">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="addDailog = true"
            >添加</el-button
          >
        </el-col>
        <!-- 数据 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="序号" width="80px">
            <template slot-scope="scopes">
              {{ scopes.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="药品名称"></el-table-column>
          <el-table-column prop="num" label="药品数量"> </el-table-column>
          <el-table-column prop="price" label="药品价格(元)"></el-table-column>
          <el-table-column prop="address" label="操作" width="180px">
            <template slot-scope="scopes">
              <el-tooltip
                class="item"
                effect="dark"
                content="修改"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="editDrugs(scopes.row.id,scopes.row.name,scopes.row.num,scopes.row.price)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-delete-solid"
                  @click="deleteById(scopes.row.id)"
                ></el-button>
              </el-tooltip>
              <!--编辑弹出层  -->
              <el-dialog title="编辑药品" :visible.sync="editDailog">
                <el-form :model="edit">
                  <el-form-item label="药品名称">
                    <el-input
                      v-model="edit.name"
                      autocomplete="off"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="药品数量">
                    <el-input v-model="edit.num" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="药品价格">
                    <el-input
                      v-model="edit.price"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="editDoctor(scopes.row.id)"
                    >确认修改</el-button
                  >
                  <el-button type="info" @click="editDailog = false"
                    >取消</el-button
                  >
                </el-form>
              </el-dialog>
              <!-- 添加弹出层 -->
              <el-dialog title="添加药品" :visible.sync="addDailog">
                <el-form v-model="Drugs">
                  <el-form-item label="药品">
                    <el-input
                      v-model="Drugs.name"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="数量">
                    <el-input
                      v-model="Drugs.num"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="价格">
                    <el-input
                      v-model="Drugs.price"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="addDrug"
                    >确认添加</el-button
                  >
                  <el-button type="info" @click="addDailog = false"
                    >取消</el-button
                  >
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
        condition: "",
      },
      editDailog: false,
      addDailog: false,
      tableData: [],
      Drugs: {
        id: 0,
        name: "",
        type: "",
        num: 0,
        price: "",
      },
      Drugs: {
        name: "",
        price: "",
        num: "",
      },
      edit: {
        id:'',
        name:'',
        num: "",
        price: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("/drugs/queryAll").then((res) => {
        this.tableData = res.data;
      });
    },
    deleteById(id) {
      this.Drugs.id = id;
      this.$http
        .post("/drugs/delete", this.Drugs)
        .then((res) => {
          this.$message.success("删除成功");
          return this.getList();
        })
        .catch((mess) => {
          this.$message.error("删除失败" + mess);
        });
    },
    editDrugs(id,name,num,price){
      this.editDailog = true
      this.edit.name = name
      this.edit.id = id
      this.edit.num = num
      this.edit.price = price
    },
    editDoctor(){
      this.$http.post('drugs/update',this.edit).then(res=>{
        console.log(res);
        this.$message.success('更新成功')
        this.editDailog = false
        return this.getList()
      })
    },
    addDrug() {
      this.$http.post('/drugs/addDrugs',this.Drugs).then(res=>{
        this.addDailog = false
        this.$message.success('添加成功')
        return this.getList()
      })
    },
    queryByDrugsName(){
        this.$http.get('/drugs/queryDrugsByName?name='+this.query.condition).then(res=>{
        this.$message.success('查询成功')
        return this.tableData = res.data;
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