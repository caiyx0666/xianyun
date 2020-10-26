<template>
  <div class="container">
    <h4>288条真是用户评论</h4>
    <div class="grade">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="evaluate">
            总评数：148 <br />
            好评数: 43 <br />
            差评数：5 <br />
          </div>
        </el-col>

        <el-col :span="5">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
        </el-col>

        <el-col :span="15" class="gradeLeft">
          <el-progress
            type="dashboard"
            :percentage="percentage"
            :color="colors"
            :width="80"
          ></el-progress>

          <el-progress
            type="dashboard"
            :percentage="percentage"
            :color="colors"
            :width="80"
          ></el-progress>

          <el-progress
            type="dashboard"
            :percentage="percentage"
            :color="colors"
            :width="80"
          ></el-progress>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="reply">
      <h3>全部点评</h3>
      <div class="bottom">
        <el-row>
          <el-col :span="4">
              <img src="" alt=""> xxx用户
          </el-col>
          <el-col :span="20">

          </el-col>
        </el-row>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 10,
      colors: [
        {
          color: "#f56c6c",
          percentage: 20,
        },
      ],
      value: 3.5,
    };
  },
};
</script>


<style scoped lang="less">
.container {
  width: 100%;
  margin: 40px 0;
}
h4 {
  text-align: center;
  font-size: 28px;
  padding-bottom: 20px;
}
.evaluate {
  color: #666666;
}
.el-progress {
  padding: 0 30px;
}
</style>