<template>
  <div class="wrap">
    <h3>好医生在线预约问诊网站</h3>
    <el-row>
      <el-col :span="10" style="margin-top: 30px">
        <el-form ref="Info" :model="form" label-width="80px">
          <el-form-item label="患者姓名">
            <el-input v-model="form.name"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="queryByName"></el-button>
            <el-button type="primary" style="margin-left: 30px" @click="outLogin" >退出登录</el-button >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="序号" width="180">
            <template slot-scope="scopes">
              {{ scopes.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
           <el-table-column prop="info" label="病情描述" width="180">
          </el-table-column>
          <el-table-column prop="time" label="预约时间"> </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scopes">
            <el-button type="text" @click="medicalDialogMethod(scopes.row.patient.id)">查看病史</el-button >
            <el-button type="text" @click="diagnose(scopes.row.id,scopes.row.name,scopes.row.info)">诊断</el-button >
             </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 查看病史弹出层 -->
    <el-dialog title="查看病史" :visible.sync="medicalDialog">
      <el-table :data="medical">
        <el-table-column
          property="info"
          label="既往病史"
          width="150"
        ></el-table-column>
        <el-table-column
          property="time"
          label="患病时间"
          width="200"
        ></el-table-column>
        <el-table-column property="doctor.name" label="就诊医生"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 诊断弹出层 -->
    <el-dialog title="诊断" :visible.sync="diagnoseDialog">
      <el-form :model="patient">
        <el-form-item label="患者名称">
          <el-input v-model="table_name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="患者描述">
          <el-input v-model="info_name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="医生诊断">
          <el-input type="textarea" v-model="RegJudgeInfo.judgeInfo.info"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diagnoseDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitDiagnose" >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 开药弹出层 -->
    <el-dialog title="开药" :visible.sync="prescribe">
      <el-form :model="patient">
        <el-form-item label="患者名称">
          <el-input v-model="patient.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-table :data="tableData">
          <el-table-column
            property="date"
            label="药品名称"
            width="150"
          ></el-table-column>
          <el-table-column label="数量">
             <el-input v-model="number" placeholder="请输入内容">></el-input>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="prescribe = false">取 消</el-button>
        <el-button type="primary" @click="prescribe = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      medicalDialog: false,
      diagnoseDialog: false,
      prescribe: false,
      number:0,
      form: {
        name: "",
      },
      medical:[],
      patient: {
        name: "",
        describe: "",
      },
      RegJudgeInfo:{
        judgeInfo:{
          info:'',
          patient:{
            id:0
          }
        },
        reserveInfo:{
          id:0,
          flag:1
        },
        userId:0
      },
      tableData: [],
      table_name:'',
      info_name:''
    }
  },
  created(){
    this.getList()
  },
   methods:{
       outLogin(){
        sessionStorage.clear();
        if(sessionStorage.getItem('username')==null){
             this.$message.success('退出成功')
             return this.$router.push('/PageHome')
        }
      },
      getList(){
        this.$http.get('reserveInfo/queryAll').then(res=>{
          this.$message.success('获取成功')
          console.log(res.data);
          return this.tableData = res.data;
        }).catch(res=>{return this.$message.error('获取失败')})
      },
      medicalDialogMethod(id){
        this.medicalDialog = true
        this.$http.get('judgeInfo/queryJudgeInfo?id='+id).then(res=>{
          this.medical = res.data
          console.log(res.data);
          this.$message.success('success')
        }).catch(res =>{  
          this.$message.error(res)})
      },
      diagnose(id,name,info){
          this.diagnoseDialog = true
          this.RegJudgeInfo.judgeInfo.patient.id = id;
          this.RegJudgeInfo.reserveInfo.id = id;
          this.table_name = name;
          this.info_name = info
      },
      submitDiagnose(){
          this.diagnoseDialog = false
          this.RegJudgeInfo.userId = sessionStorage.getItem('userId');
          this.$http.post('/judgeInfo/addJudgeInfo',this.RegJudgeInfo).then(res=>{
            this.$message.success('诊断成功')
            return this.getList()
          }).catch(res=>{
             return this.$message.error('服务器繁忙,请稍后重试')
          })
      },
      queryByName(){
          this.$http.get('reserveInfo/queryReserveByName?patientName='+this.form.name).then(res=>{
             this.tableData = res.data;
             return this.$message.success('获取成功')
          }).catch(res=>{
             return this.$message.success('服务器繁忙,请稍后重试')
          })
      }
  }
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
}
.el-input {
  width: 40%;
}
</style>