<template>
  <div class="wrap">
    <pageHomeTop></pageHomeTop>
    <img src="../../assets/新闻中心.webp" alt="" />
    <h1>
      <span style="color: #f1f1f1">News Center</span><br />
      新闻中心
    </h1>
    <main>
      <el-row>
        <el-col :span="24" class="nav-title">
          <el-row>
            <el-col :span="4" :offset="20"
              ><span>当前位置:</span>首页>新闻中心
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 主内容 -->
      <el-row class="content">
        <el-col :span="5" :offset="1" class="content-top">
          <el-row>
            <el-col :span="5" :offset="3">
              <img src="../../assets/预约挂号.webp" alt="" />
              <p>预约挂号</p>
            </el-col>
            <el-col :span="5" :offset="7">
              <img src="../../assets/专家介绍.webp" alt="" />
              <p>专家介绍</p>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col :span="5" :offset="3">
              <img src="../../assets/科室介绍.webp" alt="" />
              <p>科室介绍</p>
            </el-col>
            <el-col :span="5" :offset="7">
              <img src="../../assets/就医指南.webp" alt="" />
              <p>就医指南</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="16" :offset="2" class="content-main">
          <h2>新闻中心</h2>
          <el-row v-for="item in NoticeInfo" :key="item.id">
            <el-col :span="16" :offset="1">
              {{ item.info }}
            </el-col>
            <el-col :span="4" :offset="2" >
              {{ item.time }}
            </el-col>
            <el-col :span="24">
              <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
import pageHomeTop from "./page_home_top.vue";
export default {
  components: {
    pageHomeTop,
  },
  created() {
    this.loading();
  },
  data() {
    return {
      NoticeInfo: [],
    };
  },
  methods: {
    loading() {
      this.$http.get("notice/queryAll").then((res) => {
        this.NoticeInfo = res.data;
      });
    },
  },
};
</script>

<style scoped lang="less">
.wrap {
  img {
    width: 100%;
    height: 250px;
  }
  h1 {
    position: absolute;
    top: 25%;
    color: rgba(46, 43, 43, 0.603);
    left: calc(30%);
  }
}
main {
  width: 80%;
  height: auto;
  margin: 0 auto;
  .nav-title {
    font-size: 13px;
    font-family: "楷体";
    color: rgba(68, 65, 65, 0.349);
    border-bottom: 1px double rgb(134, 131, 131);
    padding-bottom: 10px;
    padding-top: 10px;
    span {
      color: rgba(0, 0, 0, 0.658);
    }
  }
}
.content {
  margin-top: 30px;
  .content-top {
    box-shadow: 2px 15px 5px rgb(192, 185, 185);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #696565;
      box-shadow: 3px 3px 1px #c7c1c1;
    }
    img:hover {
      width: 110%;
      height: 100%;
    }
    p {
      margin-top: 0;
      text-align: center;
      font-family: "楷体";
      color: #696565;
    }
  }
}
.content-main {
  box-shadow: 2px 15px 5px rgb(192, 185, 185);
  background-color: #f4f4f4;
  font-family: "楷体";
  font-size: 18px;

  span {
    color: #3972af;
  }
  .el-divider--horizontal {
    margin: 10px 0px;
  }
  .el-col {
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
}
}
</style>