<template>
  <!-- <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="预定" name="first">预定</el-tab-pane>
    <el-tab-pane label="位置" name="second">位置</el-tab-pane>
    <el-tab-pane label="基本信息" name="third">基本信息</el-tab-pane>
    <el-tab-pane label="点评" name="fourth">点评</el-tab-pane>
  </el-tabs> -->
  <div class="nav">
    <div>
      <ul>
        <li>预定</li>
        <li>位置</li>
        <li>基本信息</li>
        <li>点评</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.nav {
  width: 100vw;
  border-bottom: 1px solid #dedede;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  ul {
    // position: fixed;
    width: 1000px;
    margin: 0 auto;
    display: flex;
    left: 0;
    height: 50px;
    line-height: 50px;
    z-index: 10;
    li {
      padding: 0 50px;
    }
  }
}
</style>