<template>
  <div class="parentBox" v-if="parentData">
    <div class="main_parent">
      <div class="parentTop">
        <!-- 用户名 -->
        <span>{{parentData.account.nickname}}</span>
        <!-- 日期 -->
        <div class="parentDate">{{parentData.created_at | setTime}}</div>
      </div>

      <!-- 递归组件自己调用自己 -->
      <parent v-if="parentData.parent" :parentData="parentData.parent" />

      <div class="reply" @mouseenter="isshow=true" @mouseleave="isshow=false">
        <!-- 评论内容 -->
        <div class="parentContent">{{parentData.content}}</div>

        <!-- 评论图片 -->
        <div class="parentPics" v-if="parentData.pics.length > 0 ">
          <img
            v-for="(pics,index) in parentData.pics"
            :key="index"
            :src="$axios.defaults.baseURL + pics.url"
          />
        </div>

        <!-- 回复按钮 -->
        <div class="parentReply">
          <el-button size="small" type="text" @click="handleReply" v-show="isshow">回复</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import loginVue from "../../pages/user/login.vue";
export default {
  data() {
    return {
      isshow: false
    };
  },
  //   递归组件自己调用自己必写属性名
  name: "parent",
  props: ["parentData"],
  methods: {
    handleReply() {
      console.log("点击了回复", this.parentData);
      // 点击回复评论时将回复的id存到store里面,
      if (this.parentData.id) {
        this.$store.commit("user/setFollow", this.parentData.id);
        this.$store.commit(
          "user/setReplyName",
          this.parentData.account.nickname
        );
      }
    }
  },
  //   管道过滤器,渲染发布时间
  filters: {
    setTime(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style lang="less" scoped>
.parentBox {
  border: 1px solid #e4e4e4;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 5px 10px 20px;
  .main_parent {
    .parentTop {
      display: flex;
      font-size: 12px;
      .parentDate {
        margin-left: 5px;
        color: #888;
      }
    }
    .reply {
      .parentContent {
        margin: 10px 0;
      }
      .parentPics {
        img {
          width: 50px;
          height: 50px;
        }
      }
      .parentReply {
        text-align: right;
        height: 10px;
      }
    }
  }
}
</style>