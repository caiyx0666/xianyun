<template>
  <div class="banxin">
    <ul>
      <li class="lis" v-for="(item, index) in datas" :key="index">
        <div class="userinfo">
          <div class="picture">
            <img
              :src="$axios.defaults.baseURL + item.account.defaultAvatar"
              alt=""
            />
          </div>
          <div class="username">{{ item.account.nickname }}</div>
          <div class="member"><span>PLUS会员</span></div>
          <div class="time">2020-10-25</div>
        </div>
        <div class="evaluate">
          <div class="content">
            {{ item.content }}
          </div>
          <el-input
            class="revert"
            type="textarea"
            @focus="focuss(index)"
            @blur="blurs"
            :rows="1"
            placeholder="请输入内容"
            v-model="textarea[index]"
          >
          </el-input>

          <div v-show="eye == index" class="button">
            <div>回复</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eye: false,
      textarea: [],
      hotel: "",
      datas: {},
    };
  },
  mounted() {
    this.$axios({
      url: "/hotels/comments",
      params: {
        hotel: this.$route.query.id,
      },
    }).then((res) => {
      console.log(res);
      this.datas = res.data.data;
      console.log(this.datas);
    });
  },
  methods: {
    focuss(index) {
      this.eye = index;
    },
    blurs() {
      this.eye = -1;
    },
  },
};
</script>

<style lang="less" scoped>
.banxin {
  margin: 0 auto;
  width: 1000px;

  .lis {
    display: flex;
    width: 100%;
    margin: 20px 0 35px;
    .userinfo {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      text-align: center;
      width: 110px;
      height: 130px;
      .picture {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .username {
        width: 100%;
        height: 20px;
        font-size: 16px;
        color: #666;
      }
      .member {
        width: 100%;
        height: 15px;
        line-height: 15px;
        font-size: 14px;
        span {
          background-color: #414141;
          color: #fff38f;
        }
      }
      .time {
        width: 100%;
        height: 15px;
        line-height: 15px;
        font-size: 14px;
        color: #999;
      }
    }
    .evaluate {
      width: 890px;
      height: 100%;
      .content {
        width: 100%;
        height: 67px;
        font-size: 16px;
        color: #333;
        margin: 10px 0;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .revert {
        /deep/ textarea {
          transition: all 0.5s;
        }
        width: 100%;
        /deep/ .el-textarea__inner:focus {
          min-height: 6em !important;
        }
      }
      .button {
        display: flex;
        flex-direction: row-reverse;
        margin-top: 10px;
        div {
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
          background-color: #409eff;
          padding: 5px 12px;
        }
      }
    }
  }
}
</style>