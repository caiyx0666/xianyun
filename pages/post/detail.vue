<template>
  <!-- 这里是攻略文章详情页 -->
  <div class="detail">
    <!-- 面包屑，路径 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="way">
      <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="main">
      <!-- 攻略详情 -->
      <div class="left" v-if="details">
        <!-- 文章标题 -->
        <h1>{{details.title}}</h1>
        <div class="post-info">
          <!-- 文章发布时间 -->
          <span>攻略：{{details.created_at}}</span>
          <!-- 阅读量 -->
          <span>阅读：{{details.watch}}</span>
        </div>

        <!-- 文章内容 -->
        <div class="article" v-html="details.content"></div>

        <!-- 功能图标 -->
        <div class="icon">
          <div>
            <i class="el-icon-edit-outline"></i>
            评论(4)
          </div>
          <div>
            <i class="el-icon-share"></i>
            分享
          </div>
        </div>

        <!-- 评论区 -->
        <div class="comment">
          <div class="pinglun">评论</div>
          <!-- 评论框 -->
          <div class="text-box">
            <el-input
              ref="input"
              resize="none"
              type="textarea"
              :rows="2"
              placeholder="说点什么吧..."
              v-model="textarea"
            ></el-input>
          </div>
          <div class="picture">
            <!-- 上传图片 -->
            <div class="uploadPic">
              <!-- on-success 用来拿上传图片成功后的数据 -->
              <!-- file-list 是拿来放上传成功后的图片 -->
              <el-upload
                :action="this.$axios.defaults.baseURL + '/upload'"
                name="files"
                list-type="picture-card"
                :on-success="picsURL"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="img"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </div>
            <!-- 提交按钮 -->
            <div class="submit">
              <el-button type="primary" @click="submitReply">提交</el-button>
            </div>
          </div>
          <!-- 评论内容 -->
          <div class="commentBox" v-if="commentList">
            <Main :comment="comment" v-for="comment in commentList" :key="comment.id" />
          </div>

          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[2, 5, 10, 20]"
              :page-size="pageSize"
              :current-page="pageIndex"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageList.total"
            ></el-pagination>
          </div>
        </div>
      </div>

      <!-- 相关攻略 -->
      <div class="right">
        <div class="top">相关攻略</div>
        <ArticlesList />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import loginVue from "../user/login.vue";
export default {
  data() {
    return {
      // 评论框
      textarea: "",
      // 图片
      pics: [],
      img: [],
      // 文章数据
      details: [],
      // 上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      // 评论数据
      commentList: [],
      // 翻页数据
      pageList: {},
      currentPage: 1,
      // 默认每页显示2条
      pageSize: 2,
      // 当前页码的下标
      pageIndex: 1
    };
  },
  // 获取文章数据
  created() {
    // 获取文章数据;
    this.detail();
    // 获取评论
    this.reply();
  },
  methods: {
    // 每页条数改变的函数
    handleSizeChange(newPageSize) {
      this.pageSize = newPageSize;
      console.log("1", this.pageSize);
      this.pageIndex = 1;
      this.reply();
    },
    // 切换页面时的函数
    handleCurrentChange(newPageIndex) {
      this.pageIndex = newPageIndex;
      console.log("2", this.pageIndex);
      this.reply();
    },
    // 封装获取文章数据
    detail() {
      this.$axios({
        url: "/posts?id=" + this.$route.query.id
      }).then(res => {
        console.log(res.data.data);
        // 修改获取到的文章数据里的 created_at 时间戳，转换为需要渲染的数据格式，再存到 details
        res.data.data[0].created_at = moment(
          res.data.data[0].created_at
        ).format("YYYY-MM-DD HH:mm");
        this.details = res.data.data[0];
      });
    },
    // 封装获取评论函数
    reply() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _limit: this.pageSize,
          _start: (this.pageIndex - 1) * this.pageSize
        }
      }).then(res => {
        console.log("这里是评论", res.data);
        this.pageList = res.data;
        this.commentList = res.data.data;
      });
    },
    // 图片URL
    // 饿了么组件属性 on-success 文件上传成功时的钩子触发的函数，获取 pics 数据
    picsURL(response, file, fileList) {
      console.log("url", response);
      this.pics.push(response[0]);
    },
    // 提交评论按钮
    submitReply() {
      // data 是下面发送请求需要的参数,用一个对象打包参数
      let data = {
        content: this.textarea,
        post: this.$route.query.id,
        pics: this.pics
      };
      // 判断 main_id 有数据,就将回复id的参数 follow 添加到 data 对象里面
      if (this.$store.state.user.main_id) {
        data.follow = this.$store.state.user.main_id;
      }
      console.log(data);

      // 上面data的数据处理是为了点击提交评论的时候，判断是回复评论还是评论文章
      this.$axios({
        // post请求
        method: "post",
        url: "/comments",
        data,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res);
        if (this.$store.state.user.main_id) {
          this.$store.commit("user/mainId", "");
        }
        this.textarea = "";
        this.pics = [];
        this.img = [];
        this.reply();
      });
    },
    // 图片移出
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 图片放大预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  watch: {
    // 监听 store 里面 main_id 数据的变化
    "$store.state.user.main_id"() {
      console.log("进来了");
      // 判断 main_id 有数据
      if (this.$store.state.user.main_id) {
        // 就让输入框高亮,输入框绑定 ref="input" 属性拿到输入框
        this.$refs.input.focus();
      }
    },
    // 监听路由地址id的变化
    "$route.query.id"() {
      console.log("id变了");
      // 获取文章数据;
      this.detail();
      // 获取评论
      this.reply();
    }
  }
};
</script>

<style lang="less" scoped>
.commentBox {
  border: 1px solid #e4e4e4;
  margin-bottom: 10px;
  cursor: pointer;
}
.detail {
  width: 1000px;
  margin: 0 auto;
  //   面包屑,路径
  .way {
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
    font-size: 14px;
    padding: 20px 0;
  }
  .main {
    display: flex;
    //   攻略详情
    .left {
      width: 700px;
      // 文章标题
      h1 {
        padding: 20px 0;
        border-bottom: 1px solid #e4e4e4;
      }
      // 文章的图片
      .article {
        /deep/ img {
          max-width: 100%;
        }
      }
      // 发布时间和阅读量
      .post-info {
        text-align: right;
        padding: 20px 0;
        color: #888;
        span {
          margin-left: 20px;
        }
      }
      // 功能图标
      .icon {
        display: flex;
        justify-content: center;
        padding: 50px 0 30px;
        text-align: center;
        .el-icon-edit-outline,
        .el-icon-share {
          display: flex;
          padding: 0 20px;
          color: #ffa500;
          font-size: 50px;
        }
      }
      // 评论区
      .comment {
        .pinglun {
          font-weight: 500;
          margin-bottom: 20px;
        }
        .text-box {
          margin-bottom: 20px;
        }
        .picture {
          display: flex;
          margin-bottom: 30px;
          .uploadPic {
            flex: 1;
          }
        }
      }
    }
    // 相关攻略
    .right {
      width: 280px;
      margin-left: 20px;
      .top {
        font-size: 18px;
        padding: 10px 0;
        border-bottom: 1px solid #e4e4e4;
      }
    }
  }
}
.block {
  text-align: center;
  margin-bottom: 20px;
}
</style>