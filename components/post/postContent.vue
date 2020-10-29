<template>
  <div class="con">
    <!-- 顶部搜索部分 -->
    <div class="search">
      <div class="big">
        <el-input
          placeholder="请输入内容"
          class="sousuo"
          v-model="value"
          @keyup.enter.native="searchClick"
        >
        </el-input>
        <span class="el-icon-search" @click="searchClick"></span>
      </div>
      <div class="hotCity">
        推荐:
        <!-- <nuxt-link to="/post?city=广州">-广州-</nuxt-link>
        <nuxt-link to="/post?city=上海">-上海-</nuxt-link>
        <nuxt-link to="/post?city=北京">-北京-</nuxt-link> -->
        <span
          v-for="(item, index) in cities"
          :key="index"
          @click="guangzhou(item)"
          >{{ item }}</span
        >
      </div>
    </div>
    <!-- 推荐攻略部分 -->
    <div class="title">
      <div class="strate">推荐攻略</div>
      <div class="button">
        <el-button type="primary" icon="el-icon-edit" @click="editorPage"
          >写游记</el-button
        >
      </div>
    </div>

    <!-- 文章列表部分 -->
    <div>
      <div class="message" v-if="totalList.total == 0">
        该城市还没攻略哦,快去写一条吧!
      </div>
      <PostArticle
        v-for="(article, index) in articleList"
        :key="index"
        :data="article"
      />

      <!-- 分页部分 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalList.total"
      />
    </div>
  </div>
</template>

<script>
import PostArticle from "@/components/post/postArticle";
export default {
  data() {
    return {
      cities: ["广州", "上海", "北京"],
      totalList: {},
      articleList: [],
      // 默认在第一页
      pageIndex: 1,

      // 默认显示五条
      pageSize: 5,
      start: 0,
      value: "",
    };
  },
  components: {
    PostArticle,
  },

  created() {
    this.getList();
    // console.log(this.$route.query.city);
  },
  watch: {
    // 监听url变化
    $route() {
      this.getList();
    },
  },
  methods: {
    guangzhou(item) {
      this.value = item;
      this.$router.push(`/post?city=${item}`);
    },
    getList() {
      let params = {
        _start: this.start,
        _limit: this.pageSize,
      };
      if (this.$route.query.city) {
        params.city = this.$route.query.city;
      }

      this.$axios({
        url: "/posts",
        params,
      }).then((res) => {
        console.log(res.data.data);
        this.articleList = res.data.data;
        this.totalList = res.data;
        // setTimeout(() => {
        this.$emit("sendArticleList", this.articleList);
        // }, 1000);
      });
    },

    currentChange(newPageIndex) {
      this.pageIndex = newPageIndex;
      this.start = (this.pageIndex - 1) * this.pageSize;
      this.getList();
    },
    sizeChange(newPageSize) {
      this.pageSize = newPageSize;
      this.getList();
    },

    searchClick() {
      if (this.value == "") {
        this.$message.closeAll();
        this.$message("请输入内容");
      }
      this.$router.push(`/post?city=${this.value}`);
    },

    editorPage() {
      this.$router.push("/post/article");
    },
  },
};
</script>

<style lang="less" scoped>
.con {
  width: 700px;
  padding-bottom: 50px;
  .search {
    .big {
      position: relative;
      /deep/ .sousuo {
        input {
          border: none;
          outline: none;
          border: 3px solid orange;
          margin-bottom: 2px;
        }
      }
      .el-icon-search {
        position: absolute;
        top: 8px;
        right: 10px;
        font-size: 25px;
        font-weight: 700;
        color: orange;
        cursor: pointer;
      }
    }
    .hotCity {
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;
      color: #555;

      span {
        margin: 0 10px;
      }
      span:hover {
        color: orange;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    .strate {
      font-size: 18px;
      color: orange;
      height: 60px;
      line-height: 60px;
      border-bottom: 3px solid orange;
    }
  }
  .message {
    width: 300px;
    margin: 100px auto;
  }
  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    justify-content: space-around;
  }
}
</style>