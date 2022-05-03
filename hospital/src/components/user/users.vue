<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="10">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUsersButton()">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <!-- 想要添加索引列,直接type=index即可 -->
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="roleName" label="角色"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mgState" @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 enterable:鼠标是否可进入到tooltip中 -->
            <el-tooltip effect="dark" content="修改角色" placement="top" :enterable="false" @click="editUser(scope.row.id)">
              <el-button type="primary" icon="el-icon-edit" @click="changeEditStatus(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除角色" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </el-tooltip>
            <!-- 分配角色按钮-->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!-- 内容主体区域 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="addForm.roleName" placeholder="请选择角色">
              <el-option label="用户" value="用户"></el-option>
              <el-option label="管理员" value="管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUsers">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改用户对话框 -->
      <el-dialog title="修改用户" :visible.sync="editDialogStatus" width="50%" @close="colseEditDailog">
        <!-- 内容主体区域 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="用户名" prop="username" :disabled="false">
            <el-input v-model="addForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogStatus = false">取 消</el-button>
          <el-button type="primary" @click="showEditDialog(addForm)">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //自定义验证密码的规则
    var checkPhone = (rule, value, cb) => {
      //验证手机号的正则表达式
      const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regPhone.test(value)) {
        //合法的手机号
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      //获取用户列表的请求参数对象
      queryInfo: {
        query: '',
        //当前的页数
        pageNum: 0,
        //当前每页显示多少条数据
        pageSize: 2,
      },
      //请求接收服务器返回的数据
      userList: [],
      total: 0,
      // 是否显示对话框
      addDialogVisible: false,
      //添加用户的表单数据
      addForm: {
        username: '',
        phone: '',
        roleName: '',
      },
      //添加表单验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          //自定义校验规则
          { validator: checkPhone, trigger: 'blur' },
        ],
      },
      //修改用户对话框的显示与隐藏
      editDialogStatus: false,
    }
  },
  created() {
    //获取用户数据
    this.getUserList()
  },
  methods: {
    //获取用户数据
    async getUserList() {
      const { data: res } = await this.$http.get('user/users', {
        params: this.queryInfo,
      })
      if (res.status != 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userList = res.data.records
      this.total = res.total
    },
    //监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getUserList()
    },
    //监听用户状态的改变
    async userStateChange(userInfo) {
      const { data: res } = await this.$http.get(`user/UpdateUserState`, {
        params: { id: userInfo.id, state: userInfo.mgState },
      })
      if (res.status != 200) {
        userInfo.mgState = !userInfo.mgState
        return this.$message.error('更新用户状态失败')
      }
      return this.$message.success('修改成功')
    },
    //弹出添加用户对话框
    addUsersButton() {
      this.addDialogVisible = true
    },
    //关闭菜单清空内容
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    //添加用户
    addUsers() {
      //预校验
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        //发送添加用户请求
        const { data: ref } = await this.$http.post(
          'user/addUser',
          this.addForm
        )
        if (ref.status === 200) {
          //隐藏对话框,刷新页面数据
          this.addDialogVisible = false
          this.getUserList()
          return this.$message.success('添加成功!')
        }
        return this.$message.error('添加失败!')
      })
    },
    //弹出修改用户对话框
    async changeEditStatus(id) {
      this.editDialogStatus = true
      //查询数据
      const { data: res } = await this.$http.get(`user/userById?id=` + id)
      this.addForm = res.data
    },
    //修改用户
    showEditDialog(params) {
      console.log(params);
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        //发送修改用户请求
        const { data: ref } = await this.$http.post('user/editUser', params)
        if (ref.status === 200) {
          //隐藏对话框,刷新页面数据
          this.editDialogStatus = false
          this.getUserList()
          return this.$message.success('修改成功!')
        }
        return this.$message.error('修改失败!')
      })
    },
    //关闭修改对话框编辑事件
    colseEditDailog() {
      this.$refs.addFormRef.resetFields()
    }
  },
}
</script>

<style lang="less" scoped>
</style>