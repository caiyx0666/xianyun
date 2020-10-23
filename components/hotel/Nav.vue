<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="预定" name="first">预定</el-tab-pane>
    <el-tab-pane label="位置" name="second">位置</el-tab-pane>
    <el-tab-pane label="基本信息" name="third">基本信息</el-tab-pane>
    <el-tab-pane label="点评" name="fourth">点评</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style scoped lang="less">
.nav {
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #dedede;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
  line-height: 50px;
  position: relative;
  z-index: 10;
}
</style>