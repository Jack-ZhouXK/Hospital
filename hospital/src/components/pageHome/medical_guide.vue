<template>
  <div class="wrap">
    <pageHomeTop></pageHomeTop>
    <img src="../../assets/就医指南 bunner.webp" alt="">
    <h1>
      <span style="color:#f1f1f1">Medical guide</span><br>
      就医指南
    </h1>
    <main>
      <el-row>
        <el-col :span="24" class="nav-title">
          <el-row>
            <el-col :span="6" :offset="18"><span>当前位置:</span>首页>就医指南>来院路线
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 主内容 -->
      <el-row class="content">
        <el-col :span="3" class="content-top">
          <ul class="content-ul">
            <li class="navicat_li"><i class="el-icon-map-location"></i> 来院路线</li>
            <li><i class="el-icon-takeaway-box"></i> 预约挂号</li>
            <li><i class="el-icon-headset"></i> 急诊就诊流程</li>
          </ul>
        </el-col>
        <el-col :span="16" :offset="4" class="content-main">
          <h2>来院路线</h2>
          <el-row>
            <el-col :span="20" :offset="2">
              <span>东区地址:</span>河北省石家庄市269号
            </el-col>
            <el-col :span="20" :offset="2">
              <span>西区地址:</span>吉林省长春市 269号
            </el-col>
            <el-col :span="20" :offset="2" style="margin-top:30px">
              <span>乘车路线(东区)</span>
            </el-col>
            <el-col :span="20" :offset="2">
              汽车东站乘坐:公交坐6路到医大一院下车,向北 步行300米
            </el-col>
            <el-col :span="20" :offset="2">
              汽车东站乘坐:公交坐9路到医大一院下车,向北 步行300米
            </el-col>
            <el-col :span="20" :offset="2" style="margin-top:30px">
              <span>乘车路线(西区)</span>
            </el-col>
            <el-col :span="20" :offset="2">
              汽车东站乘坐:公交坐6路到人民一院下车,向北 步行300米
            </el-col>
            <el-col :span="20" :offset="2">
              汽车东站乘坐:公交坐6路到人民一院下车,向北 步行300米
            </el-col>
            <el-col :span="20" :offset="2" style="margin-top:30px">
              <span>门诊导师电话:</span>12345679
            </el-col>
            <el-col :span="20" :offset="2">
              <span>医院办公室电话:</span>0311-122333
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
  data() {
    return {};
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
    height: 150px;
    .content-ul {
      list-style: none;
      padding: 0;
      margin: 0;
      height: 200px;
      box-shadow: 2px 15px 5px rgb(192, 185, 185);
      min-width: 190px;
      .navicat_li {
        background-color: #2f7cca;
        color: #fff;
      }
      li {
        height: 33%;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          margin-right: 5px;
        }
      }
      li:hover {
        background-color: #2f7cca;
        color: #fff;
        cursor: pointer;
      }
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
}
</style>