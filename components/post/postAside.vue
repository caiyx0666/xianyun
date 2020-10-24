<template>
  <div class="aside">
    <!-- 顶部tab栏部分 -->
    <div class="asideTop">
      <!-- 标题 -->
      <div
        class="title"
        v-for="(title, index) in titleList"
        :key="index"
        @mouseover="mouseover(index)"
        @mouseleave="mouseleave()"
      >
        {{ title.type }} <span class="el-icon-arrow-right"></span>
      </div>
      <div class="right" v-if="currentIndex != -1">
        <div class="content" v-for="(city, index) in cityList" :key="index">
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
        轮播图
        <img src="#" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleList: [],
      cityList: [],
      currentIndex: -1,
    };
  },

  created() {
    this.$axios({
      url: "/posts/cities",
    }).then((res) => {
      console.log(res.data.data);
      this.titleList = res.data.data;
    });
  },
  methods: {
    mouseover(index) {
      this.cityList = this.titleList[index].children;
      console.log(this.cityList);
      this.currentIndex = index;
      console.log(this.currentIndex);
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
      left: 259px;
      border: 1px solid #ccc;
      top: 0;
      width: 300px;
      .content {
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        background-color: #fff;
        .num {
          font-style: italic;
          color: orange;
          font-size: 20px;
        }
        .city {
          color: orange;
          margin: 0 10px;
        }
        .dec {
          color: #bbb;
        }
      }
    }
  }
  .asideBottom {
    margin-top: 10px;
    .hot {
      line-height: 30px;
      height: 30px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
    }

    .hotCity {
      width: 260px;
      height: 174px;
      background-color: #ccc;
    }
  }
}
</style>