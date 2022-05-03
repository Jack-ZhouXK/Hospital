<template>
  <body>
    <h2 class="title">好医生在线预约问诊网站</h2>
    <div class="main">
      <div class="Login_div">
        <el-form
          ref="loginFormRef"
          class="login_form"
          :model="loginForm"
          :rules="loginFormRules"
        >
          <h1>登录</h1>
          <span>请登录您的账号</span>
          <div class="eneter">
            <el-form-item prop="username">
              <el-input
                prefix-icon="el-icon-user"
                v-model="loginForm.username"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                prefix-icon="el-icon-goods"
                v-model="loginForm.password"
                type="password"
              ></el-input>
            </el-form-item>
          </div>
          <a href="#">忘记密码？</a>
          <el-form-item>
            <el-button type="primary" @click="login" class="submit_button"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="Options_div">
        <div id="Switch_Registered">
          <h1>还没有账号？</h1>
          <p>立即注册，和我们一起开始旅程吧</p>
          <button id="Registered_button" @click="Registered_button">
            前往注册
          </button>
        </div>
        <div id="Switch_Login">
          <h1>已有账号？</h1>
          <p>请使用您的帐号进行登录</p>
          <button id="Login_button" @click="Login_button">前往登录</button>
        </div>
      </div>
      <div class="Registered_div">
        <el-form
          ref="loginFormRef"
          class="login_form"
          :model="regForm"
          :rules="loginFormRules"
        >
          <h1>注册</h1>
          <span>注册您的第一个账号</span>
          <div class="eneter">
            <el-form-item prop="username">
              <el-input
                prefix-icon="el-icon-user"
                v-model="regForm.username"
                placeholder="请输入注册用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                prefix-icon="el-icon-goods"
                v-model="regForm.password"
                type="password"
                placeholder="请输入注册密码"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="name">
              <el-input
                prefix-icon="el-icon-s-custom"
                v-model="regForm.name"
                placeholder="姓名"
              >
              </el-input>
            </el-form-item>
          </div>
          <button class="submit_button" @click="register">注册</button>
        </el-form>
      </div>
    </div>
  </body>
</template>


<script>
import $ from "jquery";
export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      // 注册表单的数据绑定对象
      regForm: {
        username: "",
        password: "",
        name: "",
      },
      dialogVisible:true,
      ////表单验证规则对象,数据的校验规则
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        // 验证姓名是否合法
          name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //登录按钮表单预验证
    login() {
      //发送请求,发生Promise解决方案把参数变成异步,该参数等待即可
      this.$http.post("user/login", this.loginForm).then((res) => {
        if(res.data.status != 200){
           return this.$message.error('登录失败,账号或密码错误')
        }
         this.$message.success('登录成功')
         sessionStorage.setItem('userId',res.data.id)
         sessionStorage.setItem('username',res.data.username)
         console.log(res.data);
        if(res.data.role==0){
            //通过编程式导航跳转到后台首页,路由地址为管理员管理页面
            return this.$router.push("/adminManage");
        }
        if(res.data.role==1){
            // 跳转医生页面 后期完善
             return this.$router.push("/doctorPageHome");
        }
        if(res.data.role==2){
           // 跳转患者界面 后期完善
             return this.$router.push("/patientPageHome");
        }
      });
    },
    //注册验证
    register() {
      this.$http.post("user/addCommoner", this.regForm).then((res) => {
        if(res.data.status != 200){
           return this.$message.error('注册失败,'+res.data.msg)
        }
          if(res.data.status == 200){
            this.$message.success('注册成功')
        }
      });
    },
    // 表单切换功能
    Registered_button() {
      $(".Login_div").animate({ width: "0", opacity: "0" });
      $(".Registered_div").animate({ width: "50%", opacity: "1" });
      $("#Switch_Registered").animate({ opacity: "0" });
      $("#Switch_Login").animate({ opacity: "1" });
      $("#Switch_Registered").slideUp();
      $("#Switch_Login").slideDown();
    },
    // 表单切换功能
    Login_button() {
      $(".Registered_div").animate({ width: "0", opacity: "0" });
      $(".Login_div").animate({ width: "50%", opacity: "1" });
      $("#Switch_Login").animate({ opacity: "0" });
      $("#Switch_Registered").animate({ opacity: "1" });
      $("#Switch_Login").slideUp();
      $("#Switch_Registered").slideDown(500);
    },
  },
};
</script>


<style lang="less" scoped>
* {
  box-sizing: border-box;
}
div {
  display: block;
}
body {
  // background: url(../../assets/logo.png) no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  // background: linear-gradient(antiquewhite, rgb(135, 199, 185));
}
button {
  outline: none;
}
h1 {
  font-weight: bold;
  margin-top: 15%;
}
form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}
input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  outline: none;
}
a {
  color: black;
  font-size: 15px;
  text-decoration: none;
  margin: 20px 0;
}
.main {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  display: flex;
  overflow: hidden;
  width: 800px;
  height: 480px;
  max-width: 100%;
  min-height: 480px;
  margin: 0 auto;
  top: calc(50% - 240px);
}
.title {
  width: 30%;
  position: absolute;
  top: 10%;
  left: calc(43%);
  margin-top: 0;
}
.Login_div {
  background: #fff;
  width: 50%;
  height: 100%;
  opacity: 1;
  text-align: center;
}
.Options_div {
  background: #fff;
  background-color: #ff445e;
  width: 50%;
  height: 100%;
  color: #fff;
  text-align: center;
}
.Options_div h1 {
  margin: 30% 0 30px 0;
}
.Options_div span {
  font-size: 15px;
  letter-spacing: 1px;
}
.Options_div button {
  background: transparent;
  border: 1px solid #fff;
  border-radius: 20px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 5px;
  margin-top: 8%;
}
.Registered_div {
  background: #fff;
  width: 0;
  height: 100%;
  opacity: 0;
}
.Registered_div .submit_button {
  margin-top: 5%;
}
.eneter {
  margin-top: 10%;
}
.submit_button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 5px;
}
#Switch_Registered {
  width: 100%;
  height: 100%;
  opacity: 1;
}
#Switch_Login {
  width: 100%;
  height: 100%;
  display: none;
  opacity: 0;
}
</style>