<template>
  <el-button type="text" @click="open">1</el-button>
</template>

<script>
export default {
  methods: {
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
        .catch(() => {
          
        });
    },
  },
};
</script>
<style scoped lang="less">
</style>