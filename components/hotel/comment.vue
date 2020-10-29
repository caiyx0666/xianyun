<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="commentInfo">
          <div class="commentImg">
            <img src="../../assets/images/4.jpeg" alt="" />
          </div>
          <div class="commentTitle">气球发动机</div>
          <div class="commentgrade">Lv8</div>
          <div class="commentDate">2020-10-25</div>
        </div>
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
      hotel: "",
      hotelComment: "",
    };
  },
  created() {
    this.$axios({
      url: "/hotels/comments",
      params: {
        hotel: this.$route.query.id,
      },
    }).then((res) => {
      // console.log(res.data.data);
      this.hotelComment = res.data.data;
      console.log(this.hotelComment);
    });
  },
  methods: {
    hide() {
      setTimeout(() => {
        this.active = false;
      }, 150);
    },
    handleClick() {
      this.$axios();
    },
  },
};
</script>

<style lang="less" scoped>
.commentInfo {
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #000;
  .commentImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid #f90;
    margin: 0 10px 0 20px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .commentTitle {
    font-size: 12px;
    color: #f90;
    padding-top: 16px;
    height: 30px;
    border: 1px solid #000;
    margin: 8px;
  }
  .commentgrade {
    font-size: 12px;
    color: red;
    border: 1px solid #000;
  }
  .commentDate {
    font-size: 12px;
    color: gray;
    border: 1px solid #000;
  }
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