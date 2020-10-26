<template>
  <div>
    <div class="container">
      <!-- 面包屑导航栏 -->
      <el-row>
        <el-col>
          <div class="breadcrumb">首页 > 广州酒店 > xxx</div>
        </el-col>
      </el-row>

      <!-- 酒店详情 -->
      <el-row type="flex">
        <el-col :span="24">
          <div class="hotel">
            <h4>{{ hotelList.name }}</h4>
            <div class="info">{{ hotelList.alias }}</div>
            <div class="address el-icon-location">{{ hotelList.address }}</div>
          </div>
        </el-col>
      </el-row>

      <!-- 图片部分 -->
      <div class="photo">
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <div class="photoleft">
              <img :src="baseSrc" alt="" />
            </div>
          </el-col>

          <el-col :span="8">
            <div class="photoright">
              <div class="div" v-for="(item, index) in imgData" :key="index">
                <img :src="item.address" alt="" @click="handleClick(item)" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 导航栏组件 -->
    <Nav></Nav>
    <div class="container">
      <!-- 预定部分 -->
      <Booking :hotelList="hotelList.products"></Booking>
      <!-- 地图部分 -->
      <Map></Map>
      <!-- 基本信息部分 -->
      <Info :hotelList="hotelList"></Info>
      <!-- 评价部分 -->
      <Evaluate></Evaluate>
    </div>
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
      baseSrc: require("~/assets/images/1.jpeg"),
      imgData: [
        {
          address: require("~/assets/images/1.jpeg"),
        },
        {
          address: require("~/assets/images/2.jpeg"),
        },
        {
          address: require("~/assets/images/3.jpeg"),
        },
        {
          address: require("~/assets/images/4.jpeg"),
        },
        {
          address: require("~/assets/images/5.jpeg"),
        },
        {
          address: require("~/assets/images/6.jpeg"),
        },
      ],
    };
  },
  mounted() {
    this.logpage();
    console.log(this.hotelList.address);
  },
  methods: {
    logpage() {
      this.$axios({
        url: "/hotels?id=266",
      }).then((res) => {
        // console.log(res.data);
        this.hotelList = res.data.data[0];
        console.log(this.hotelList);
      });
    },
    handleClick(item) {
      this.baseSrc = item.address;
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
  margin-bottom: 10px;
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
  cursor: pointer;
  .photoleft {
    width: 640px;
    height: 360px;
    // background-color: #666;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .photoright {
    // background-color: #333;
    width: 350px;
    display: flex;
    flex-wrap: wrap;
    img {
      margin: 0 6px;
      margin-bottom: 11px;
      width: 160px;
      height: 110px;
      object-fit: cover;
    }
  }
}
</style>