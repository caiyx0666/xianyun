<template>
  <div class="first_head">
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
              <img
                :src="baseSrc"
                alt=""
                @click="(show = true), (dialogTableVisible = true)"
              />
              <div v-if="show == true">
                <el-dialog
                  :visible.sync="dialogTableVisible"
                  width="800px"
                  height="400px"
                >
                  <div class="block">
                    <el-carousel
                      trigger="click"
                      height="400px"
                      :autoplay="false"
                    >
                      <el-carousel-item
                        v-for="(item, index) in imgData"
                        :key="index"
                      >
                        <img
                          :src="item.address"
                          alt=""
                          class="testImg"
                          width="800px"
                          height="400px"
                        />
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </el-dialog>
              </div>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="photoright">
              <div class="div" v-for="(item, index) in imgData" :key="index">
                <img
                  :src="item.address"
                  alt=""
                  @click="(show = true), (dialogTableVisible = true)"
                />
                <!-- <img :src="item.address" alt="" @click="handleClick(item)" /> -->
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
        <ul id="liAll">
          <li
            @click="bookingJump"
            ref="liBook"
            :class="{ active: activeIndex == 1 }"
          >
            预定
          </li>
          <li
            @click="mapJump"
            ref="liMap"
            :class="{ active: activeIndex == 2 }"
          >
            位置
          </li>
          <li @click="infoJump" :class="{ active: activeIndex == 3 }">
            基本信息
          </li>
          <li @click="evaluateJump" :class="{ active: activeIndex == 4 }">
            点评
          </li>
        </ul>
        <div class="cang">
          <span class="shou"></span>
          <span class="shouTwo"></span>
          <span>收藏</span>
        </div>
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
      <Evaluate1></Evaluate1>
    </div>

    <el-backtop :bottom="100">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      show: false,
      showStart: false,
      dialogTableVisible: false,
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
      isNoTrackScroll: false,
      activeIndex: 1,
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
        if (!this.isNoTrackScroll) {
          this.activeIndex = 0;
        }
      }
    };
  },

  methods: {
    getToggle(num) {
      this.activeIndex = num;
    },
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
      this.isNoTrackScroll = true;
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
          this.isNoTrackScroll = false;
          clearInterval(timer);
        }
      }, 8);
    },
    logpage() {
      this.$axios({
        url: "/hotels",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => {
        // console.log(res.data);
        this.hotelList = res.data.data[0];
        console.log(this.hotelList);
      });
    },
    // handleClick(item) {
    //   this.baseSrc = item.address;
    // },
    mapJump() {
      var map = this.$refs.map.$el;
      this.scrollToElement(map);
      // var litwo = this.$refs.liMap;
      // map.classList.add("active");
      // console.log(litwo);
      // litwo.classList.add("active");
      // var litwo = document.querySelectorAll("#ulAll li");
      // console.log(litwo);
      // var lione = this.$refs.liAll;
      // console.log(lione);
      // var liall = document.querySelectorAll("#liAll>li");

      // for (var i = 0; i < liall.length; i++) {
      //   liall[i].classList.remove("active");
      // }
      // liall[1].classList.add("active");
      this.getToggle(2);
    },
    bookingJump() {
      var book = this.$refs.book.$el;
      this.scrollToElement(book);
      var lione = this.$refs.liBook;

      // var liall = document.querySelectorAll("#liAll>li");

      // for (var i = 0; i < liall.length; i++) {
      //   liall[i].classList.remove("active");
      // }
      // liall[0].classList.add("active");
      this.getToggle(1);
    },
    infoJump() {
      var info = this.$refs.info.$el;
      this.scrollToElement(info);
      // var liall = document.querySelectorAll("#liAll>li");

      // for (var i = 0; i < liall.length; i++) {
      //   liall[i].classList.remove("active");
      // }
      // liall[2].classList.add("active");
      this.getToggle(3);
    },
    evaluateJump() {
      var evaluate = this.$refs.evaluate.$el;
      this.scrollToElement(evaluate);
      // var liall = document.querySelectorAll("#liAll>li");

      // for (var i = 0; i < liall.length; i++) {
      //   liall[i].classList.remove("active");
      // }
      // liall[3].classList.add("active");
      this.getToggle(4);
    },
    handleClick() {
      this.$router.push("/hotel");
    },
  },
};
</script>

<style scoped lang="less">
// .first_head {
//   width: 100%;
//   height: 100vh;
//   overflow: scroll;
//   // overflow-x: hidden;
// }
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
  position: relative;
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

        // &:hover {
        //   border-bottom: 3px #f90 solid;
        //   color: #f90;
        // }
      }
      .active {
        border-bottom: 3px #f90 solid;
        color: #f90;
      }
    }

    .cang {
      font-size: 14px;
      position: absolute;
      left: 1032px;
      top: 18px;
      align-items: center;
      display: flex;
      .shou {
        width: 25px;
        height: 25px;
        display: block;
        background: url("../../assets/images/hotel-detail-icon9@2x.png")
          no-repeat -100px 0px ~"/" 400px 300px;
        padding: 0 5px 0 0;
      }
      .shouTwo {
        width: 25px;
        height: 25px;
        display: block;
        background: url("../../assets/images/hotel-detail-icon9@2x.png")
          no-repeat -100px -30px ~"/" 400px 300px;
        padding: 0 5px 0 0;
      }
    }
  }
}

.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.1);
}
.fixed {
  position: fixed;
  z-index: 999;
}
</style>