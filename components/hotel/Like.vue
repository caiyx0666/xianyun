<template>
  <div>
    <el-row>
      <el-col>酒店名字(酒店英文) <span>*</span>为必选项 </el-col>
      <el-col :span="4"> <span>*</span>总体评价 </el-col>
      <el-col class="start" :span="20">
        <el-rate v-model="rateValue" show-text :texts="text" allow-half>
        </el-rate>
        <span>点击星星打分</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4"> <span>*</span>位置 </el-col>
      <el-col class="startOne" :span="20">
        <el-rate v-model="rateValue1" show-text :texts="text" allow-half>
        </el-rate>
        <span>给位置打分</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4"> <span>*</span>清洁度 </el-col>
      <el-col class="startTwo" :span="20">
        <el-rate v-model="rateValue2" show-text :texts="text" allow-half>
        </el-rate>
        <span>给清洁度打分</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4"> <span>*</span>设施 </el-col>
      <el-col class="startThree" :span="20">
        <el-rate v-model="rateValue3" show-text :texts="text" allow-half>
        </el-rate>
        <span>给设施打分</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4"> <span>*</span>服务 </el-col>
      <el-col class="startThree" :span="20">
        <el-rate v-model="rateValue4" show-text :texts="text" allow-half>
        </el-rate>
        <span>给服务打分</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4"> <span>*</span>舒适度 </el-col>
      <el-col class="startThree" :span="20">
        <el-rate v-model="rateValue5" show-text :texts="text" allow-half>
        </el-rate>
        <span>给舒适度打分</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4"> <span>*</span>餐饮 </el-col>
      <el-col class="startThree" :span="20">
        <el-rate v-model="rateValue6" show-text :texts="text" allow-half>
        </el-rate>
        <span>给餐饮打分</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4"> <span>*</span>内容 </el-col>
      <el-col>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="textarea2"
        >
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
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
    };
  },
  //   methods: {
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
  //   },
};
</script>

<style scoped lang="less">
.start {
  display: flex;
  width: 300px;
  height: 100px;
}
.startOne {
  display: flex;
  width: 300px;
  height: 100px;
}
.startOne {
  display: flex;
  width: 300px;
  height: 100px;
}
</style>