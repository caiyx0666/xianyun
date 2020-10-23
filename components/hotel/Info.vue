<template>
  <div class="container">
    <div class="info">
      <el-row>
        <el-col :span="4">基本信息</el-col>
        <el-col :span="5">入住时间：14：00之后</el-col>
        <el-col :span="5">离店时间：12：00之前</el-col>
        <el-col :span="5">2010年开业/2010年装修</el-col>
        <el-col :span="5">酒店规模：153间客房</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20">热水壶</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20">-</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20">锦江</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 240px;
  margin: 40px 0;
}

.el-col {
  border-bottom: 1px solid #eeeeee;
}
</style>