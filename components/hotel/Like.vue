<template>
  <div class="content">
    <div class="tou">
      <el-col> {{ hotelList.name }} <span>*</span>为必选项 </el-col>
    </div>
    <ul class="content1">
      <li>
        <el-row>
          <el-col :span="4" class="zuobian"> <span>*</span>总体评价 </el-col>
          <el-col class="start" :span="20">
            <el-rate v-model="rateValue" :colors="colors" allow-half> </el-rate>
            <span class="hongse">点击星星打分</span>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row>
          <el-col :span="4" class="zuobian"> <span>*</span>位置 </el-col>
          <el-col class="start" :span="20">
            <el-rate v-model="rateValue1" :colors="colors" allow-half>
            </el-rate>
            <span class="hongse">给位置打分</span>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row>
          <el-col :span="4" class="zuobian"> <span>*</span>清洁度 </el-col>
          <el-col class="start" :span="20">
            <el-rate v-model="rateValue2" :colors="colors" allow-half>
            </el-rate>
            <span class="hongse">给清洁度打分</span>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row>
          <el-col :span="4" class="zuobian"> <span>*</span>设施 </el-col>
          <el-col class="start" :span="20">
            <el-rate v-model="rateValue3" :colors="colors" allow-half>
            </el-rate>
            <span class="hongse">给设施打分</span>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row>
          <el-col :span="4" class="zuobian"> <span>*</span>服务 </el-col>
          <el-col class="start" :span="20">
            <el-rate v-model="rateValue4" :colors="colors" allow-half>
            </el-rate>
            <span class="hongse">给服务打分</span>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row>
          <el-col :span="4" class="zuobian"> <span>*</span>舒适度 </el-col>
          <el-col class="start" :span="20">
            <el-rate v-model="rateValue5" :colors="colors" allow-half>
            </el-rate>
            <span class="hongse">给舒适度打分</span>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row>
          <el-col :span="4" class="zuobian"> <span>*</span>餐饮 </el-col>
          <el-col class="start" :span="20">
            <el-rate v-model="rateValue6" :colors="colors" allow-half>
            </el-rate>
            <span class="hongse">给餐饮打分</span>
          </el-col>
        </el-row>
      </li>

      <li>
        <el-row>
          <el-col :span="4" class="zuobian"> <span>*</span>内容 </el-col>
        </el-row>
      </li>
      <li>
        <div class="abc">
          <el-col>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="100字+3图，有机会评为优质点评！"
              v-model="textarea2"
            >
            </el-input>
          </el-col>
          <p>内容不超过10000字</p>
        </div>
      </li>
      <li>
        <div class="button" @click="open">提交</div>
      </li>
    </ul>

      <el-button
      type="text"
      @click="open"
      :showCancelButton="false"
    ></el-button>
  </div>
</template>

<script>
export default {
  props: ["hotelList"],
  data() {
    return {
      rateValue: null, //在此定义双向绑定的数据
      textarea2: "",
      rateValue1: null,
      rateValue2: null,
      rateValue3: null,
      rateValue4: null,
      rateValue5: null,
      rateValue6: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    };
  },
  methods: {
    //     loadByScore() {
    //       this.rateValue = null;
    //       //通过调用接口
    //       GetEvaluationScoringDetailResultForPanel()
    //         .then((data) => {
    //           if (data && data.Id) {

    //             this.rateValue = data.EvaluatingScore;
    //           }
    //         })
    //         .catch((err) => {
    //           return;
    //         });
    //     },

    //     changeValue(value) {
    //       console.log(value);
    //     },
    open() {
      this.$alert("发布成功，经验值+10，可以到 [我的点评] 中查看", {
        confirmButtonText: "确定",
        type: "success",
        center: true,
      }).then(() => {
        // 子组件接收，即可关闭
        this.$emit("showDianOne");
        this.$message({
          type: "success",
          message: "提交成功",
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
.start {
  display: flex;
  width: 300px;
  height: 25px;
}

.content {
  background-color: #fff;
  position: absolute;
  right: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  margin: 0 auto;
  width: 930px;
  padding: 30px;
  // border: 1px solid #000;
  .tou {
    width: 100%;
    height: 25px;
    color: #444;
    font-size: 22px;
    margin-bottom: 30px;
  }
  .content1 {
    li {
      height: 25px;
      font-size: 14px;
      margin-top: 10px;
      // border: 1px solid #000;
      .zuobian {
        text-align: right;
        padding-right: 15px;
      }
      .hongse {
        color: #999;
      }

      &:nth-child(9) {
        height: 70px;
        padding-left: 160px;
        .abc {
          width: 700px;
          margin-top: -50px;
        }
        p {
          font-size: 13px;
          color: #999;
        }
      }
      &:nth-child(10) {
        height: 70px;
        padding-left: 160px;
        .button {
          width: 130px;
          height: 36px;
          text-align: center;
          line-height: 36px;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 40px;
          background-color: #ff8a00;
        }
      }
    }
  }
  span {
    color: red;
  }
}
</style>