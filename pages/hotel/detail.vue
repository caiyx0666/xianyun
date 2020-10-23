<template>
  <div class="container">
    <!-- 面包屑导航栏 -->
    <el-row>
      <el-col>
        <div class="breadcrumb">首页》广州》酒店</div>
      </el-col>
    </el-row>

    <!-- 酒店详情 -->
    <el-row type="flex">
      <el-col :span="24">
        <div class="hotel">
          <h4>{{ hotelList.name }}</h4>
          <div class="info">{{ hotelList.alias }}</div>
          <div class="address">{{ hotelList.address }}</div>
        </div>
      </el-col>
    </el-row>

    <!-- 图片部分 -->
    <div class="photo">
      <el-row type="flex" justify="space-between">
        <el-col :span="16">
          <div class="photoleft">大图</div>
        </el-col>

        <el-col :span="8">
          <div class="photoright">
            <div class="div">1</div>
            <div class="div">1</div>
            <div class="div">1</div>
            <div class="div">1</div>
            <div class="div">1</div>
            <div class="div">1</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 导航栏组件 -->
    <Nav></Nav>
    <!-- 预定部分 -->
    <Booking :hotelList="hotelList"></Booking>
    <!-- 地图部分 -->
    <Map></Map>
    <!-- 基本信息部分 -->
    <Info></Info>
    <!-- 评价部分 -->
    <Evaluate></Evaluate>
  </div>
</template>

<script>
import Booking from "../../components/hotel/Booking";
import Map from "../../components/hotel/Map";
import Info from "../../components/hotel/Info";
import Evaluate from "../../components/hotel/Evaluate";
import Nav from "../../components/hotel/Nav";
export default {
  data() {
    return {
      hotelList: {},
    };
  },
  mounted() {
    this.logpage();
    console.log(this.hotelList.address);
  },
  methods: {
    logpage() {
      this.$axios({
        url: "hotels?id=1",
      }).then((res) => {
        // console.log(res.data);
        this.hotelList = res.data.data[0];
        console.log(this.hotelList);
      });
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  // box-sizing: border-box;
}
.breadcrumb {
  padding: 20px 0;
}
.hotel {
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  color: #666;
  h4 {
    color: #333;
    font-weight: 400;
    font-size: x-large;
  }
}
.photo {
  margin: 40px 0;
  .photoleft {
    background-color: #666;
  }
  .photoright {
    background-color: #333;
  }
}
</style>