<template>
  <div class="container">
    <PostAside :valueList="valueList" />
    <PostContent @sendArticleList="sendArticleList" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueList: "",
    };
  },
  methods: {
    sendArticleList(articleList) {
      this.valueList = articleList;
      // console.log(this.valueList);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 20px auto;
}
</style>