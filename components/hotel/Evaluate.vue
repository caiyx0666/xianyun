<template>
  <div class="container">
    <h4>😍真实用户评价😍</h4>
    <div class="grade">
      <el-row :gutter="20" type="flex" align="middle">
        <el-col :span="4">
          <div class="evaluate">
            😎总评数：148 <br />
            😘好评数: 43 <br />
            😭差评数：5 <br />
          </div>
        </el-col>

        <!-- 推荐 -->
        <el-col :span="5" class="big">
          <el-rate
            v-model="hotelList.stars"
            disabled
            show-score
            text-color="#ff9900"
            :score-template="`${hotelList.stars}分`"
          >
          </el-rate>

          <!-- 一般 -->
          <div v-if="hotelList.stars < 3" class="small">
            <svg>
              <circle
                cx="100"
                cy="50"
                r="40"
                stroke="#f90"
                stroke-width="2"
                fill="none"
                stroke-opacity="0.3"
              />
              <text
                x="72"
                y="61"
                fill="#f90"
                font-size="28px"
                fill-opacity="0.3"
              >
                一般
              </text>
            </svg>
          </div>
          <!-- 推荐 -->
          <div v-if="hotelList.stars >= 3 && hotelList.stars < 5" class="small">
            <svg class="revolve">
              <circle
                cx="100"
                cy="50"
                r="40"
                stroke="#f90"
                stroke-width="2"
                fill="none"
                stroke-opacity="0.3"
              />
              <text
                x="72"
                y="61"
                fill="#f90"
                font-size="28px"
                fill-opacity="0.3"
              >
                推荐
              </text>
            </svg>
          </div>
          <!-- 非常推荐 -->
          <div v-if="hotelList.stars > 5" class="small">
            <svg class="revolve">
              <circle
                cx="100"
                cy="50"
                r="40"
                stroke="#f90"
                stroke-width="2"
                fill="none"
                stroke-opacity="0.3"
              />
              <text
                x="72"
                y="61"
                fill="#f90"
                font-size="28px"
                fill-opacity="0.3"
              >
                非常推荐
              </text>
            </svg>
          </div>
        </el-col>

        <!-- 环境 -->
        <el-col :span="3" class="gradeLeft">
          <el-progress
            type="circle"
            :percentage="
              hotelList.scores.environment
                ? hotelList.scores.environment * 10
                : 74
            "
            :show-text="false"
            v-if="hotelList.scores"
            :width="80"
            color="#f90"
            :stroke-width="3"
          ></el-progress>
          <div class="centerText" v-if="hotelList.scores">
            <div>环境</div>
            <div class="textLeft" v-if="hotelList.scores.environment == null">
              7.4
            </div>
            <div v-else>
              {{ hotelList.scores.environment }}
            </div>
          </div>
        </el-col>

        <!-- 产品 -->
        <el-col :span="3" class="gradeLeft">
          <el-progress
            type="circle"
            :percentage="
              hotelList.scores.product ? hotelList.scores.product * 10 : 75
            "
            :show-text="false"
            v-if="hotelList.scores"
            :width="80"
            color="#f90"
            :stroke-width="3"
          ></el-progress>
          <div class="centerText" v-if="hotelList.scores">
            <div>产品</div>
            <div class="textLeft" v-if="hotelList.scores.product == null">
              7.5
            </div>
            <div v-else>
              {{ hotelList.scores.product }}
            </div>
          </div>
        </el-col>

        <!-- 服务 -->
        <el-col :span="3" class="gradeLeft">
          <el-progress
            type="circle"
            :percentage="
              hotelList.scores.service ? hotelList.scores.product * 10 : 72
            "
            :show-text="false"
            :stroke-width="3"
            v-if="hotelList.scores"
            :width="80"
            color="#f90"
          ></el-progress>
          <div class="centerText" v-if="hotelList.scores">
            <div>服务</div>
            <div class="textLeft" v-if="hotelList.scores.service == null">
              7.2
            </div>
            <div v-else>
              {{ hotelList.scores.service }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
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
    };
  },
  props: ["hotelList"],
};
</script>


<style scoped lang="less">
.container {
  width: 100%;
  padding: 40px 0;
}

.big {
  position: relative;
  z-index: 5;
  .small {
    position: absolute;
    top: -77px;
    left: -23px;
    transform: rotate(-40deg);
  }
}
h4 {
  text-align: center;
  font-size: 28px;
  padding: 20px 0 40px 0;
}
.evaluate {
  color: #666666;
}
.el-progress {
  padding: 0 30px;
}
.gradeLeft {
  position: relative;

  .centerText {
    position: absolute;
    top: 19px;
    left: 65px;
    font-size: 16px;
    color: #f90;

    .textLeft {
      // margin: 0 6px;

      text-align: center;
    }
  }
}
.gradeLeft .centerText[data-v-5635ceaf] {
  text-align: center;
}
</style>