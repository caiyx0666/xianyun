<template>
  <div class="con">
    <!-- 顶部搜索部分 -->
    <div class="search">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        class="input"
      >
      </el-input>
      <div class="hotCity">
        推荐:
        <span class="adress"> 广州</span>
        <span class="adress"> 上海</span>
        <span class="adress"> 北京</span>
      </div>
    </div>
    <!-- 推荐攻略部分 -->
    <div class="title">
      <div class="strate">推荐攻略</div>
      <div class="button">
        <el-button type="primary" icon="el-icon-edit">写游记</el-button>
      </div>
    </div>

    <!-- 文章列表部分 -->
    <div>
      <PostArticle />
    </div>
  </div>
</template>

<script>
import PostArticle from "@/components/post/postArticle";
export default {
  components: {
    PostArticle,
  },
};
</script>

<style lang="less" scoped>
.con {
  width: 700px;

  .search {
    .input {
      outline: none;
      border: 3px solid orange;
      margin-bottom: 2px;
    }
    .hotCity {
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;
      color: #555;
      .adress {
        margin: 0 6px;
      }
      .adress:hover {
        color: orange;
        cursor: pointer;
        text-decoration: underline;
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
}
</style>