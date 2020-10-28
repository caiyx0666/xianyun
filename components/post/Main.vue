<template>
  <!-- 这是主评论组件页面 -->
  <div class="detail_main">
    <div class="top">
      <img
        v-if="comment.account.defaultAvatar"
        :src="$axios.defaults.baseURL+comment.account.defaultAvatar"
        alt
      />
      <span>{{comment.account.nickname}}</span>
      <div class="detail_date">{{comment.created_at | setTime}}</div>
    </div>

    <!-- 这里是父评论组件 -->
    <Parent :parentData="comment.parent" v-if="comment.parent" />

    <!-- 评论的内容和图片 -->
    <div class="contentPics" @mouseenter="isshow=true" @mouseleave="isshow=false">
      <!-- 评论内容 -->
      <div class="mainContent">{{comment.content}}</div>
      <!-- 评论图片 -->
      <div class="mainPics" v-if="comment.pics.length > 0">
        <img
          v-for="(pics,index) in comment.pics"
          :key="index"
          :src="$axios.defaults.baseURL + pics.url"
        />
      </div>
      <div class="mainReply">
        <el-button size="small" type="text" @click="handleReply" v-show="isshow">回复</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      isshow: false
    };
  },
  props: ["comment"],
  //   管道过滤器，渲染发布时间
  filters: {
    setTime(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    }
  },
  methods: {
    handleReply() {
      console.log("点击了回复", this.comment.id);
      // 点击回复评论时将回复的id存到store里面,
      this.$store.commit("user/setFollow", this.comment.id);
      this.$store.commit("user/setReplyName", this.comment.account.nickname);
    }
  }
};
</script>

<style lang="less" scoped>
.detail_main {
  border-bottom: 1px dashed #e4e4e4;
  padding: 20px 20px 0;
  &:last-child {
    border-bottom: none;
  }
  .top {
    display: flex;
    font-size: 12px;
    img {
      width: 16px;
      height: 16px;
    }
    span {
      margin: 0 10px 20px;
    }
    .detail_date {
      color: #888;
    }
  }
  .contentPics {
    .mainContent {
      margin: 0 30px 0;
    }
    .mainPics {
      img {
        width: 50px;
        height: 50px;
      }
    }
    .mainReply {
      height: 30px;
      text-align: right;
    }
  }
}
</style>