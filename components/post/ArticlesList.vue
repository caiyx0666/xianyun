<template>
  <!-- 这是相关攻略组件页面 -->
  <div v-if="strategyList.length != 0">
    <div
      class="articles"
      v-for="item in strategyList"
      :key="item.id"
      @click="$router.push('/post/detail?id=' + item.id)"
    >
      <!-- 判断为了当前阅读的文章不在相关攻略显示 -->
      <div class="box" v-if="item.id != $route.query.id">
        <div class="left">
          <img v-if="item.images[0]" :src="item.images[0]" alt />
          <img v-else src="@/assets/img/timg.png" />
        </div>
        <div class="right">
          <div class="head">{{item.title}}</div>
          <div class="foot">
            <span>{{item.created_at | setTime}}</span>
            <span>阅读 {{item.watch || 0}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      strategyList: []
    };
  },
  created() {
    this.$axios({
      url: "/posts/recommend?id=" + this.$route.query.id
    }).then(res => {
      console.log("相关攻略", res.data.data);
      this.strategyList = res.data.data;
    });
  },
  //   管道过滤器，渲染发布时间
  filters: {
    setTime(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style lang="less" scoped>
.articles {
  display: flex;
  cursor: pointer;
  padding: 20px 0;
  border-bottom: 1px solid #e4e4e4;
  .left {
    margin-right: 10px;
    img {
      object-fit: cover;
      width: 80px;
      height: 80px;
    }
  }
  .right {
    display: flex;
    height: 80px;
    flex-direction: column;
    justify-content: space-between;
    .head {
      font-size: 16px;
    }
    .foot {
      font-size: 12px;
      color: #888;
    }
  }
}
</style>