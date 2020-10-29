<template>
  <div class="first_head" v-if="hotelList">
    <div class="row" v-if="show" @click="show = false"></div>
    <div class="rowOne" v-if="showDian" @click="showDian = false"></div>
    <div class="container">
      <!-- 面包屑导航栏 -->
      <el-row>
        <el-col>
          <div class="breadcrumb">
            <span style="font-weight: 700">您在这里：</span>
            酒店 >
            <span @click="handleClick">{{ hotelList.real_city }}</span> >
            {{ hotelList.name }}
          </div>
        </el-col>
      </el-row>

      <!-- 酒店详情 -->
      <el-row type="flex">
        <el-col :span="20">
          <div class="hotel">
            <h4>{{ hotelList.name }}</h4>
            <div class="info">{{ hotelList.alias }}</div>
            <div class="address el-icon-location">
              {{ hotelList.address }}
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="hotelScore">
            <!-- 左 -->
            <div class="fen">
              <span>{{ hotelList.stars }}</span
              >分
            </div>
            <!-- 中 -->
            <div class="xian"><i></i></div>
            <div class="you">
              <!-- 右上 -->
              <div v-if="hotelList.stars < 3" class="good">一般</div>
              <div
                v-if="hotelList.stars >= 3 && hotelList.stars < 5"
                class="good"
              >
                推荐
              </div>
              <div v-if="hotelList.stars > 5" class="good">非常推荐</div>
              <!-- 右下 -->
              <div class="youxia el-icon-chat-dot-round">200评论</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 图片部分 -->
      <div class="photo">
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <div class="photoleft">
              <img :src="baseSrc" alt="" @click="show = true" />

              <!-- 轮播图 -->
              <div class="block" v-if="show == true">
                <el-carousel height="470px" :autoplay="false">
                  <el-carousel-item
                    v-for="(item, index) in imgData"
                    :key="index"
                  >
                    <img
                      :src="item.address"
                      alt=""
                      class="testImg"
                      width="800px"
                      height="470px"
                    />
                  </el-carousel-item>
                </el-carousel>
                <div class="close el-icon-close" @click="show = false"></div>
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

        <div class="dianOne" @click="showDian = true" v-if="!isShowDian">
          <span class="shouThree el-icon-document-copy"></span>
          <el-button type="text"></el-button>
          <span>评分</span>
        </div>
        <div class="dianTwo" @click="showDian = true" v-if="isShowDian">
          <span class="shouThree el-icon-document-copy"></span>
          <el-button type="text"></el-button>
          <span>评分</span>
        </div>

        <div class="cangOne" @click="isShowStart" v-if="!showPrice">
          <span class="shou el-icon-star-off" v-if="showStart"></span>
          <span
            class="shouTwo el-icon-star-on"
            v-if="!showStart"
            @click="open"
          ></span>
          <el-button type="text" @click="open" v-if="!showStart"></el-button>
          <span>收藏</span>
        </div>

        <div class="cang" @click="isShowStart" v-else>
          <span class="shou el-icon-star-off" v-if="showStart"></span>
          <span
            class="shouTwo el-icon-star-on"
            v-if="!showStart"
            @click="open"
          ></span>
          <el-button type="text" @click="open" v-if="!showStart"></el-button>
          <span>收藏</span>
        </div>

        <div
          class="price"
          v-if="(hotelList.products, showPrice)"
          :class="{ showprice: showPrice }"
        >
          每晚<span>¥{{ hotelList.products[0].price }}</span>
        </div>
        <div
          class="navBooking"
          :class="{ showprice: showPrice }"
          v-if="showPrice"
        >
          预定
        </div>
      </div>
    </div>
    <Like
      v-if="showDian"
      :hotelList="hotelList"
      @showDianOne="showDianOne"
    ></Like>
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
      showDian: false,
      showStart: true,
      showPrice: false,

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
      msgBox: null,
      isShowDian: false,
    };
  },
  computed: {},
  mounted() {
    this.logpage();
    console.log(this.hotelList.address);

    window.onscroll = () => {
      // 拿到nav距离页面可视窗口的距离
      let offset = this.getPageOffsetTop(this.$refs.nav);
      //  如果nav的距离小于页面滚动的距离那么nav就固定
      if (offset < window.pageYOffset) {
        this.isFixed = true;
        // nav导航栏固定显示预定&价钱
        this.showPrice = true;
        this.isShowDian = true;
      } else {
        this.isFixed = false;
        this.showPrice = false;
        this.isShowDian = false;
        if (!this.isNoTrackScroll) {
          // 上面加了动态class，如果再nav不固定的时候，isNoTrackScroll=false就给activeIndex=0
          // 这样子不固定的时候nav就不会有下划线
          this.activeIndex = 0;
        }
      }
    };
  },

  methods: {
    showDianOne() {
      this.showDian = false;
    },
    open() {
      this.$confirm("真的要取消收藏吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "取消成功!",
          });
        })
        .catch(() => {});
    },
    isShowStart() {
      // 防止重复点击不停弹出新的提示框
      this.showStart = !this.showStart;
      if (this.showStart) {
        return;
      }
      if (!this.showStart) {
        if (this.msgBox) {
          this.msgBox.close();
        }

        this.msgBox = this.$message.success("已经收藏啦！");
        console.log(this.msgBox);
        return;
      }
    },
    getToggle(num) {
      // 调用函数让activeIndex=传入的num的时候，自动添加active的动态class类名
      this.activeIndex = num;
    },
    getPageOffsetTop(elm) {
      // offset就是距离
      // 获取元素距离页面顶部的距离
      let offset = 0;
      while (true) {
        if (elm == document.body) {
          return offset;
        }
        // offsetTop：元素到上一个offsetParent顶部的距离
        // 如果元素有多个爸爸，就要累加offsetTop
        offset += elm.offsetTop;
        // 距离元素最近的一个有定位的爸爸，如果爸爸都不符合条件，offsetParent为body
        elm = elm.offsetParent;
      }
    },
    scrollToElement(elm) {
      // 给nav导航加一个旗帜，来到了这里就是true
      // 就是滚动的时候，让下划线一直是true的状态
      this.isNoTrackScroll = true;
      // 因为顶部有60px的头部，所以要-60，不然会挡住
      var t = elm.offsetTop - 60;
      // window.pageYOffset当前滚动的距离
      let offset = window.pageYOffset;
      // 先清空定时器
      let timer = null;
      if (timer) {
        clearInterval(timer);
      }

      timer = setInterval(() => {
        window.scrollTo(0, offset);
        // 每次步进12 每次位移的越多 速度越快
        // 如果距离小于12就直接等于目标
        // 不然可能一直在目标两边反复横跳都去不到目标
        offset += offset - t < 0 ? 12 : -12;
        if (Math.abs(offset - t) < 12) {
          window.scrollTo(0, t);
          // 旗帜在这里结束变为false
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
        console.log(res.data);
        this.hotelList = res.data.data[0];
        // console.log(this.hotelList);
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
      // var lione = this.$refs.liBook;

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
  position: relative;
  h4 {
    color: #333;
    font-weight: 400;
    font-size: x-large;
  }
}
.address {
  margin-top: 7px;
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
      border-radius: 4px;
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
      border-radius: 4px;
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
      font-size: 16px;
      position: absolute;
      left: 980px;
      top: 17px;
      align-items: center;
      display: flex;
    }
    .cangOne {
      font-size: 14px;
      position: absolute;
      left: 1174px;
      top: 19px;
      align-items: center;
      display: flex;
    }
    .shou {
      // width: 25px;
      // height: 25px;
      // display: block;
      // background: url("../../assets/images/hotel-detail-icon9@2x.png") no-repeat -100px
      //   0px ~"/" 400px 300px;
      padding: 0 5px 0 0;
      font-size: 22px;
      color: #f90;
    }
    .shouTwo {
      // width: 25px;
      // height: 25px;
      // display: block;
      // background: url("../../assets/images/hotel-detail-icon9@2x.png") no-repeat -100px -30px
      //   ~"/" 400px 300px;
      padding: 0 5px 0 0;
      font-size: 22px;
      color: #f90;
    }
    .shouThree {
      font-size: 22px;
      color: #f90;
    }
    .dianOne {
      position: absolute;
      left: 1080px;
      top: 17px;
      font-size: 14px;
    }
    .dianTwo {
      position: absolute;
      left: 890px;
      top: 17px;
      font-size: 14px;
    }
    .price {
      position: absolute;
      left: 1085px;
      top: 18px;
      font-size: 14px;
      span {
        margin-left: 5px;
        color: #f90;
        font-size: 16px;
        font-weight: 700;
      }
    }
    .navBooking {
      position: absolute;
      left: 1174px;
      top: 18px;
      width: 48px;
      height: 24px;
      line-height: 24px;
      border-radius: 6px;
      background-color: #f90;
      font-size: 14px;
      text-align: center;

      color: #fff;
    }
  }
}

.el-dialog__wrapper {
  background-color: rgba(115, 115, 115, 0.1);
}

.fixed {
  position: fixed;
  z-index: 999;
}
.row {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 200;
}
.rowOne {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 200;
}
.el-carousel {
  width: 800px;
  .el-carousel-item {
    .testImg {
      object-fit: cover;
    }
  }
}
.block {
  position: absolute;
  top: -120px;
  left: 80px;
  z-index: 999;

  .close {
    width: 50px;
    height: 50px;
    // background-color: rgb(224, 220, 214);
    text-align: center;
    line-height: 50px;
    position: absolute;
    top: -44px;
    right: -62px;
    font-size: 58px;
    color: #fff;
  }
}
.hotelScore {
  margin-top: 25px;
  font-size: 14px;
  display: flex;
  width: 170px;
  height: 50px;
  // border: 1px solid #000;
  color: #6e7478;
  .fen {
    margin-top: 4px;
    width: 70px;
    height: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    color: #ff8a00;
    // border: 1px solid rgb(134, 63, 63);
  }
  .xian {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 5px;
    height: 50px;
    padding: 0 10px;
    // border: 1px solid rgb(177, 40, 40);
    i {
      display: inline-block;
      width: 2px;
      height: 45px;
      background-color: #cccccc;
    }
  }
  .good {
    width: 75px;
    font-size: 18px;
    height: 28px;
    line-height: 28px;
    color: #6e7478;
    // border: 1px solid #000;
  }
  .youxia {
    width: 75px;
    font-size: 14px;
    color: #666666;
  }
}
</style>