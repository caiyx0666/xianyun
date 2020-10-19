<template>
  <div class="pageWrapper">
    <div class="leftWrapper">
      左侧边栏
    </div>
    <div class="main">
      右边主体部分
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.pageWrapper {
  display: flex;
  margin:0 auto;
  min-width: 1000px;
  width: 1000px;

  .leftWrapper {
    width: 260px;
  }
}
</style>