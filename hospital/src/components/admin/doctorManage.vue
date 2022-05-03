<template>
  <div>
    <adminTop></adminTop>
    <main>
      <el-row>
        <el-col :span="24" >
          <h3>医生管理</h3>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="15" style="margin-bottom:30px">
              <el-input
                v-model="name"
                placeholder="医生姓名"
              ></el-input>
              <el-button type="primary" icon="el-icon-search" @click="queryMethod">搜索</el-button>
        </el-col>
        <el-col :span="3" :offset="4">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="addDailogParam"
            >添加</el-button
          >
        </el-col>
        <!-- 数据 -->
        <el-table :data="tableData" border style="width: 100%;" >
          <el-table-column label="序号" width="80px">
            <template slot-scope="scopes">
              {{ scopes.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="昵称"></el-table-column>
          <el-table-column prop="type" label="是否为专家">
            <template slot-scope="scope">
              {{ scope.row.type == 0 ? "非专家" : "专家" }}
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              {{ scope.row.sex == 0 ? "女" : "男" }}
            </template>
          </el-table-column>
          <el-table-column prop="cardId" label="证件号"> </el-table-column>
          <el-table-column prop="department.name" label="所属部门">
          </el-table-column>
          <el-table-column prop="address" label="住址"> </el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="修改"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="
                    editDailogMethod(
                      scope.row.id,
                      scope.row.name,
                      scope.row.type,
                      scope.row.address
                    )
                  "
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
                  @click="deleteDocket(scope.row.user.id)"
                ></el-button>
              </el-tooltip>
              <!--编辑弹出层  -->
              <el-dialog title="编辑信息" :visible.sync="editDailog">
                <el-form :model="Doctor">
                  <el-form-item label="昵称">
                    <el-input
                      :value="Doctor.name"
                      autocomplete="off"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="是否为专家">
                    <el-switch
                      v-model="Doctor.type"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                  </el-form-item>
                  <el-form-item label="住址">
                    <el-input
                      v-model="Doctor.address"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="editDoctor"
                    >确认修改</el-button
                  >
                  <el-button type="info" @click="editDailog = false"
                    >取消</el-button
                  >
                </el-form>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
        <!-- 添加弹出层 -->
        <el-dialog title="添加医生" :visible.sync="addDailog">
          <el-form :model="RegDoctor">
            <el-form-item label="昵称">
              <el-input v-model="RegDoctor.doctor.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否为专家">
              <el-switch
                v-model="RegDoctor.doctor.type"
                autocomplete="off"
              ></el-switch>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="RegDoctor.doctor.sex" label="0">女</el-radio>
              <el-radio v-model="RegDoctor.doctor.sex" label="1">男</el-radio>
            </el-form-item>
            <el-form-item label="证件号">
              <el-input  v-model="RegDoctor.doctor.cardId"  autocomplete="off"  ></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
              <el-select  v-model="RegDoctor.doctor.department.id"  placeholder="请选择部门" >
                <el-option :label="depArray[i].name" :value="depArray[i].id" v-for="(dep,i) in depArray" :key="i"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="住址">
              <el-input  v-model="RegDoctor.doctor.address" autocomplete="off"  ></el-input>
            </el-form-item>
               <el-form-item label="账号">
              <el-input  v-model="RegDoctor.user.username" autocomplete="off"  ></el-input>
            </el-form-item>
               <el-form-item label="密码">
              <el-input  v-model="RegDoctor.user.password" autocomplete="off"  ></el-input>
            </el-form-item>
            <el-button type="primary" @click="addDoctorMethod">确认添加</el-button    >
            <el-button type="info" @click="addDailog = false">取消</el-button>
          </el-form>
        </el-dialog>
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
      name: "",
      radio: "1",
      //添加医生
      RegDoctor: {
        doctor:{
          name: "",
          type: 0,
          sex: 0,
          cardId: "",
          address: "",
          department: {
            id:0
          },
          
        },
        user:{
         username: "",
          password: "",
        }
  
      },
      depArray:[],
      // 获取数据
      tableData: [],
      Doctor: {
        type: "",
        address: "",
        name:'',
        id: "",
        user: {
          id: 0,
        },
      },
      editDailog: false,
      addDailog: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("/doctor/queryAll").then((res) => {
        this.tableData = res.data;
      });
    },
    deleteDocket(id) {
      this.Doctor.user.id = id;
      this.$http.post("/doctor/delete", this.Doctor).then((res) => {
        this.$message.success("删除成功");
        return this.getList();
      });
      return this.$message.error("服务繁忙,稍后重试");
    },
    editDailogMethod(id, name,type, address) {
      this.editDailog = true;
      this.Doctor.id = id;
      this.Doctor.name = name;
      if (type === 0) {
        this.Doctor.type = false;
      } else {
        this.Doctor.type = true;
      }
      this.Doctor.address = address;
    },
    //修改用户信息
    editDoctor() {
      if (this.Doctor.type === true) {
        this.Doctor.type = 1;
      } else {
        this.Doctor.type = 0;
      }
      this.$http.post("/doctor/update", this.Doctor).then((res) => {
        this.editDailog = false;
        this.$message.success("修改成功");
        return this.getList();
      });
    },
    addDailogParam(){
      this.addDailog = true
      this.$http.get("/department/queryAll").then(res=>{ this.depArray = res.data; })
    },
    // 添加医生
    addDoctorMethod() {
      if(this.RegDoctor.doctor.type){
        this.RegDoctor.doctor.type = 1
      }else{
        this.RegDoctor.doctor.type = 0
      }
      
      this.$http.post("/user/addDoctor",this.RegDoctor).then((res) => {
        this.addDailog = false;
        this.$message.success("添加成功");
        return this.getList();
      });
      this.addDailog = false;
    },
    //名字查询
    queryMethod(){
        this.$http.get("/doctor/queryDoctorByName?name="+this.name).then((res) => {
        this.$message.success("查询成功");
        this.tableData = res.data;
      });
      this.addDailog = false;
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