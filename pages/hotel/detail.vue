<template>
  <div>
    <div class="container">
      <!-- 面包屑导航栏 -->
      <el-row>
        <el-col>
          <div class="breadcrumb">
            您在这里：酒店 >
            <span @click="handleClick">{{ hotelList.real_city }}</span> >
            {{ hotelList.name }}
          </div>
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
    <!-- <Nav></Nav> -->
    <div class="nav" ref="nav">
      <div :class="{ fixed: isFixed }">
        <ul>
          <li @click="bookingJump">预定</li>
          <li @click="mapJump">位置</li>
          <li @click="infoJump">基本信息</li>
          <li @click="evaluateJump">点评</li>
        </ul>
      </div>
    </div>
    <div class="container">
      <!-- 预定部分 -->
      <Booking :hotelList="hotelList.products" ref="book"></Booking>
      <!-- 地图部分 -->
      <Map ref="map" :hotelList1="hotelList.location"></Map>
      <!-- 基本信息部分 -->
      <Info :hotelList="hotelList" ref="info"></Info>
      <!-- 评价部分 -->
      <Evaluate ref="evaluate" :hotelList="hotelList"></Evaluate>
      <!-- 评论部分 -->
      <comment></comment>
    </div>
  </div>
</template>

<script>
import Booking from "../../components/hotel/Booking";
import Map from "../../components/hotel/Map";
import Info from "../../components/hotel/Info";
import Evaluate from "../../components/hotel/Evaluate";
import loginVue from "../user/login.vue";
// import Nav from "../../components/hotel/Nav";

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
      isFixed: false,
    };
  },
  computed: {},
  mounted() {
    this.logpage();
    console.log(this.hotelList.address);

    window.onscroll = () => {
      let offset = this.getPageOffsetTop(this.$refs.nav);

      if (offset < window.pageYOffset) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    };
  },
  methods: {
    getPageOffsetTop(elm) {
      let offset = 0;
      while (true) {
        if (elm == document.body) {
          return offset;
        }
        offset += elm.offsetTop;
        elm = elm.offsetParent;
      }
    },
    scrollToElement(elm) {
      var t = elm.offsetTop - 60;

      let offset = window.pageYOffset;
      let timer = null;
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(() => {
        window.scrollTo(0, offset);
        offset += offset - t < 0 ? 12 : -12;
        if (Math.abs(offset - t) < 12) {
          window.scrollTo(0, t);
          clearInterval(timer);
        }
      }, 8);
    },
    logpage() {
      this.$axios({
        url: "/hotels?id=95",
      }).then((res) => {
        // console.log(res.data);
        this.hotelList = res.data.data[0];
        console.log(this.hotelList);
      });
    },
    handleClick(item) {
      this.baseSrc = item.address;
    },
    mapJump() {
      var map = this.$refs.map.$el;
      this.scrollToElement(map);
    },
    bookingJump() {
      var book = this.$refs.book.$el;
      this.scrollToElement(book);
    },
    infoJump() {
      var info = this.$refs.info.$el;
      this.scrollToElement(info);
    },
    evaluateJump() {
      var evaluate = this.$refs.evaluate.$el;
      this.scrollToElement(evaluate);
    },
    handleClick() {
      this.$router.push("/hotel");
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
  cursor: pointer;
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
  margin: 30px 0;
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
.nav {
  cursor: pointer;
  width: 100vw;
  height: 50px;
  & > div {
    width: 100vw;
    height: 50px;
    border-bottom: 1px solid #dedede;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;
    background-color: #fff;
    ul {
      // position: fixed;
      width: 1000px;
      margin: 0 auto;
      display: flex;
      height: 50px;
      line-height: 50px;
      z-index: 10;
      li {
        padding: 0 50px;
      }
    }
  }
}

.fixed {
  position: fixed;
  z-index: 999;
}
</style>