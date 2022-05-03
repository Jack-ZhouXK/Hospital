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
          <h3 @click="toPageHome">病史</h3>
          <h3>挂号</h3>
        </nav>
      </el-col>
      <el-col :span="15" :offset="2" style="margin-top: 20px">
        <el-form ref="form" label-position="left">
          <el-form-item
            label="选择科室"
          >
            <el-select
              v-model="val"
              placeholder="请选择科室"
              @change="checkDep"
            >
              <el-option :label="dep.name" :value="dep.id"  v-for="dep in dempartment"  :key="dep.id"  ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="预约医生">
            <el-select  v-model="value"  placeholder="请选择医生"   @change="checkDoc" >
              <el-option
                :label="f.name"
                :value="f.id"
                v-for="f in filter"
                :key="f.id"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="病情描述">
            <el-input v-model="create.reserveInfo.info"  placeholder="病情描述" ></el-input>
          </el-form-item>
          <el-form-item label="预约时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="create.time"
              style="width: 150px"
            ></el-date-picker>
            ---
            <el-time-picker
              placeholder="选择时间"
              v-model="create.time"
              style="width: 150px"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="门诊费用">
            <el-input
              v-model="create.reserveInfo.price"
              placeholder="门诊费用(元)"
            ></el-input>
          </el-form-item>
          <el-button type="primary" style="width: 70%" @click="addReserveInfo" >立即创建</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dempartment: [],
      doctor: [],
      filter: [],
      create: {
        reserveInfo: {
          name: "",
          department: {
            id: 0,
          },
          doctor: {
            id: 0,
          },
          patient: {
            id: 0,
          },
          price: "99",
          flag: 0,
          info:''
        },
        userId: 0,
        time:''
      },
      value: "",
      val:''
    };
  },
  created() {
    this.loadingData();
  },
  methods: {
    toPageHome() {
      this.$router.push("/patientPageHome");
    },
    outLogin() {
      sessionStorage.clear();
      if (sessionStorage.getItem("username") == null) {
        this.$message.success("退出成功");
        return this.$router.push("/PageHome");
      }
    },
    loadingData() {
      this.$http.get("/department/queryAll").then((res) => {
        this.dempartment = res.data;
      });
      this.$http.get("/doctor/queryAll").then((res) => {
        this.doctor = res.data;
      });
    },
    checkDep(val) {
      this.filter = []
      this.value = ''
      this.create.reserveInfo.department.id = val;
      let index = 0;
      for (let key in this.doctor) {
        if (this.doctor[key].department.id === val) {
          this.filter[index] = this.doctor[key];
          index++;
        }
      }
      if (this.filter.length > 0) {
        this.create.reserveInfo.doctor.id = this.filter[0].id;
      }
    },
    checkDoc(val) {
      this.create.reserveInfo.doctor.id = val;
    },
    addReserveInfo() {
      this.create.userId = sessionStorage.getItem("userId");
      console.log(this.create);
      this.$http
        .post("/reserveInfo/addReserveInfo", this.create)
        .then((res) => {
          console.log(res);
          this.$message.success('挂号成功')
          this.create.time = '';
          this.value = '';
          this.val = '';
          this.create.reserveInfo.info = '';
        });
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
    h3:nth-child(2) {
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