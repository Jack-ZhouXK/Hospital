<template>
  <div class="wrap">
    <pageHomeTop></pageHomeTop>
    <main>
      <el-row>
        <el-col :span="5" :offset=1>
          <div class="main-left">
            <table>
              <tr>
                <th colspan="2">快捷导航</th>
              </tr>
              <tr>
                <td><i class="el-icon-s-custom"></i>专家介绍</td>
                <td class="active_td"><i class="el-icon-s-unfold"></i>科室介绍</td>
              </tr>
              <tr>
                <td class="active_td"><i class="el-icon-notebook-1 "></i>就医指南</td>
                <td><i class="el-icon-timer"></i>坐诊时间</td>
              </tr>
              <tr>
                <td><i class="el-icon-map-location"></i>来院路线</td>
                <td class="active_td"><i class="el-icon-search"></i>信息查询</td>
              </tr>
            </table>
          </div>
        </el-col>
        <el-col :span="15" :offset=3>
          <div class="main-right">
            <img :src="imageUrl[currentIndex]" alt="">
          </div>
        </el-col>
        <el-col :span="24">
          <div class="footer">
            <h2>
              <i class="el-icon-back"></i>
              重点科室
              <i class="el-icon-right"></i>
            </h2>
            <div class="footer-main">
              <div class="footer-main-content">
                <img src="../../assets/心脏.webp" alt="">
                <h4>心血管内科一病区</h4>
              </div>
              <div class="footer-main-content">
                <img src="../../assets/心脏.webp" alt="">
                <h4>心血管内科二病区</h4>
              </div>
              <div class="footer-main-content">
                <img src="../../assets/神经.webp" alt="">
                <h4>神经内科一病区</h4>
              </div>
              <div class="footer-main-content">
                <img src="../../assets/神经.webp" alt="">
                <h4>神经内科二病区</h4>
              </div>
              <div class="footer-main-content">
                <img src="../../assets/药壶.webp" alt="">
                <h4>中医康复科</h4>
              </div>
            </div>
          </div>
        </el-col>

      </el-row>

    </main>

  </div>
</template>

<script>
import pageHomeTop from "./page_home_top.vue";
import pageHome1 from '../../assets/pageHome1.jpg'
import pageHome2 from '../../assets/pageHome2.jpg'
import pageHome3 from '../../assets/pageHome3.jpg'
import pageHome4 from '../../assets/pageHome4.jpg'
import pageHome5 from '../../assets/pageHome5.jpg'

export default {
  components: {
    pageHomeTop,
  },
  data() {
    return {
      imageUrl: [pageHome1, pageHome2, pageHome3, pageHome4, pageHome5],
      currentIndex: 1

    }
  },
  created() {
    setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex >= 5) this.currentIndex = 1
    }, 2000);
  },
};
</script>

<style scoped lang="less">
main {
  width: 80%;
  height: auto;
  margin: 50px auto;
  .main-left {
    height: 400px;
    border: 1px solid #aa9a9a;
  }
  .main-right {
    height: 500px;
    width: 100%;
    box-shadow: 10px 10px rgba(0, 68, 255, 0.438);
    img {
      width: 100%;
      height: 100%;
    }
  }

  .footer {
    margin-top: 100px;
    height: 500px;
  }
}

.main-left {
  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
  }
  table > tr {
    td,
    th {
      text-align: center;
    }
    td {
      cursor: pointer;
      font-size: 13px;
    }
    td:hover {
      background-color: #f1f1f1;
    }
    th {
      border-bottom: 1px solid #aa9a9a;
    }
  }
}
.active_td {
  background-color: #f1f1f1;
}
.footer {
  h2 {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-family: "楷体";
    color: rgba(0, 0, 0, 0.596);
    i {
      cursor: pointer;
    }
  }
  .footer-main {
    width: 100%;
    height: 220px;
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    .footer-main-content {
      height: 80%;
      width: 200px;
      background-color: #f4f4f4;
      img {
        width: 110px;
        height: 110px;
        border: 1px solid #aa9a9a;
        border-radius: 50%;
        position: relative;
        left: calc(50% - 55px);
        top: -40px;
        background-color: #fff;
      }
      h4 {
        margin: 0;
        text-align: center;
        font-family: "楷体";
        font-weight: 300;
      }
    }
    .footer-main-content:hover {
      position: relative;
      top: -10px;
      height: 90%;
      width: 220px;
      background-color: #fcfcfc85;
    }
  }
}
</style>