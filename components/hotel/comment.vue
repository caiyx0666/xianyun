<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="commentInfo">
          <div class="commentImg">
            <img src="../../assets/images/4.jpeg" alt="" />
          </div>
          <div class="commentTitle">地球发动机</div>
        </div>
        <div class="commentgrade">Lv8</div>
        <div class="commentDate">2020-10-25</div>
      </el-col>
      <el-col :span="20">
        <div class="oldComment"></div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="添加回复"
          v-model="textarea"
          @focus="active = true"
          @blur="hide"
        >
        </el-input>
        <el-button type="primary" round v-if="active" @click="handleClick"
          >回复</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      active: false,
    };
  },
  // created() {
  //   this.$axios({
  //     url: "/hotels/comments?id=266",
  //   }).then((res) => {
  //     console.log(res.data);
  //   });
  // },
  methods: {
    hide() {
      setTimeout(() => {
        this.active = false;
      }, 150);
    },
    handleClick() {
      console.log(1);
    },
  },
};
</script>

<style lang="less" scoped>
.commentInfo {
  height: 60px;
  display: flex;
  .commentImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid #f90;
    margin: 0 10px 0 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .commentTitle {
    font-size: 16px;
    color: #f90;
    padding-top: 16px;
    height: 30px;
  }
}
.commentgrade {
  font-size: 12px;
  color: red;
}
.commentDate {
  font-size: 14px;
  color: gray;
}

/deep/.el-textarea__inner {
  transition: all 0.25s linear;
}
/deep/.el-textarea__inner:focus {
  min-height: 6em !important;
}
.el-button.is-round {
  float: right;
  margin-top: 5px;
  border-radius: 13px;
  padding: 10px 26px;
}
</style>