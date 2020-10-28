<template>
  <div class="aside">
    <!-- 顶部tab栏部分 -->
    <div class="asideTop" @mouseleave="mouseleave()">
      <!-- 标题 -->
      <div
        class="title"
        v-for="(title, index) in titleList"
        :key="index"
        @mouseenter="mouseenter(index)"
      >
        {{ title.type }} <span class="el-icon-arrow-right"></span>
      </div>
      <div class="right" v-if="currentIndex != -1">
        <div
          class="content"
          v-for="(city, index) in cityList"
          :key="index"
          @click="$router.push(`/post?city=${city.city}`)"
        >
          <span class="num">{{ index + 1 }}</span>
          <span class="city">{{ city.city }}</span>
          <span class="dec">{{ city.desc }} </span>
        </div>
      </div>

      <!-- 右边隐藏的详情描述部分 -->
    </div>
    <!-- 推荐城市部分 -->
    <div class="asideBottom">
      <div class="hot">推荐城市</div>
      <div class="hotCity">
        <template>
          <el-carousel
            :interval="2000"
            height="174px"
            indicator-position="none"
            arrow="never"
          >
            <el-carousel-item v-for="(item, index) in valueList" :key="index">
              <img
                v-if="item.images.length != 0"
                :src="item.images[0]"
                alt=""
                @click="$router.push(`/post?city=${item.cityName}`)"
              />

              <!-- <img :src="valueList[0].images[0]" alt="" /> -->
              <img
                src="http://p4-q.mafengwo.net/s13/M00/02/39/wKgEaVzMTgKALFi5AAaKsyezLBE34.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90"
                alt=""
                @click="$router.push('/post?city=北京')"
              />
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
    </div>
  </div>
</template>
  

<script>
export default {
  props: ["valueList"],
  data() {
    return {
      titleList: [],
      cityList: [],
      currentIndex: -1,
    };
  },

  created() {
    // console.log(this.valueList[0].images[0]);
    this.$axios({
      url: "/posts/cities",
    }).then((res) => {
      // console.log(res.data.data);
      this.titleList = res.data.data;
    });
  },
  methods: {
    mouseenter(index) {
      this.cityList = this.titleList[index].children;
      // console.log(this.cityList);
      this.currentIndex = index;
      // console.log(this.currentIndex);
    },
    mouseleave() {
      this.currentIndex = -1;
    },
  },
};
</script>

<style lang="less" scoped>
.aside {
  width: 260px;
  .asideTop {
    position: relative;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    .title {
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      color: #333;
      height: 40px;
      font-size: 14px;
      display: flex;
      padding: 0 20px;
      align-items: center;
      justify-content: space-between;
      .el-icon-arrow-right {
        font-size: 20px;
        color: #888;
      }
    }
    .right {
      position: absolute;
      z-index: 99;
      left: 258px;
      border: 1px solid #ccc;
      top: -1px;
      width: 300px;
      .content {
        padding: 0 10px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        background-color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        cursor: pointer;
        .num {
          font-style: italic;
          color: orange;
          font-size: 20px;
        }

        .city {
          color: orange;
          margin: 0 10px;
        }
        .city:hover {
          text-decoration: underline;
        }
        .dec {
          color: #bbb;
        }
        .dec:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .asideBottom {
    margin-top: 20px;
    .hot {
      line-height: 30px;
      height: 30px;
      border-bottom: 1px solid #ccc;
      margin: 10px 0;
    }

    .hotCity {
      width: 260px;
      height: 174px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
}
</style>