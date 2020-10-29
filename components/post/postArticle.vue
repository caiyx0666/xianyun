<template>
  <div class="contain">
    <!-- 单照片组件 -->
    <div class="singleContain" v-if="data.images.length == 1">
      <!-- 左边图片部分 -->
      <div class="photo" @click="handleClickArticle(data.id)">
        <img :src="data.images[0]" alt="" />
      </div>
      <!-- 右边内容 -->

      <div class="content">
        <!-- 上面标题 -->
        <div class="articleTitle" @click="handleClickArticle(data.id)">
          {{ data.title }}
        </div>
        <!-- 文章内容 -->
        <div class="article" @click="handleClickArticle(data.id)">
          {{ data.summary }}
        </div>
        <!-- 作者 -->
        <div class="subcontain">
          <div class="info">
            <div class="address">
              <span class="el-icon-location-outline"></span>
              {{ data.cityName }}
            </div>
            <div class="user" @click="handleClickUser">
              by
              <span class="userImg">
                <img
                  :src="$axios.defaults.baseURL + data.account.defaultAvatar"
                  alt=""
                />
              </span>

              <span class="username">
                {{ data.account.nickname }}
              </span>
            </div>
            <div class="viwer">
              <span class="el-icon-view"></span>
              {{ data.watch == null ? 0 : data.watch }}
            </div>
          </div>
          <div class="dianzan" @click="handleClickLike(data.id)">
            {{ data.like == null ? 0 : data.like }} 赞
          </div>
        </div>
      </div>
    </div>

    <!-- 双图片模式 -->
    <div class="twoContain" v-if="data.images.length == 2">
      <!-- 上面标题 -->
      <div class="articleTitle" @click="handleClickArticle(data.id)">
        {{ data.title }}
      </div>
      <!-- 文章内容 -->
      <div
        class="article"
        v-html="data.content"
        @click="handleClickArticle(data.id)"
      ></div>
      <!-- 图片部分 -->
      <div class="photo" @click="handleClickArticle(data.id)">
        <img :src="data.images[0]" alt="" />
        <img :src="data.images[1]" alt="" />
      </div>

      <!-- 作者 -->
      <div class="subcontain">
        <div class="info">
          <div class="address">
            <span class="el-icon-location-outline"></span> {{ data.cityName }}
          </div>
          <div class="user" @click="handleClickUser">
            by
            <span class="userImg">
              <img
                :src="$axios.defaults.baseURL + data.account.defaultAvatar"
                alt=""
              />
            </span>

            <span class="username">
              {{ data.account.nickname }}
            </span>
          </div>
          <div class="viwer">
            <span class="el-icon-view"></span>
            {{ data.watch == null ? 0 : data.watch }}
          </div>
        </div>
        <div class="dianzan" @click="handleClickLike(data.id)">
          {{ data.like == null ? 0 : data.like }} 赞
        </div>
      </div>
    </div>

    <!-- 多图片组件 -->
    <div class="multiContain" v-if="data.images.length >= 3">
      <!-- 上面标题 -->
      <div class="articleTitle" @click="handleClickArticle(data.id)">
        {{ data.title }}
      </div>
      <!-- 文章内容 -->
      <div
        class="article"
        v-html="data.content"
        @click="handleClickArticle(data.id)"
      ></div>
      <!-- 图片部分 -->
      <div class="photo" @click="handleClickArticle(data.id)">
        <img :src="data.images[0]" alt="" />
        <img :src="data.images[1]" alt="" />
        <img :src="data.images[2]" alt="" />
      </div>

      <!-- 作者 -->
      <div class="subcontain">
        <div class="info">
          <div class="address">
            <span class="el-icon-location-outline"></span> {{ data.cityName }}
          </div>
          <div class="user" @click="handleClickUser">
            by
            <span class="userImg">
              <img
                :src="$axios.defaults.baseURL + data.account.defaultAvatar"
                alt=""
              />
            </span>

            <span class="username"> {{ data.account.nickname }}</span>
          </div>
          <div class="viwer">
            <span class="el-icon-view"></span>
            {{ data.watch == null ? 0 : data.watch }}
          </div>
        </div>
        <div class="dianzan" @click="handleClickLike(data.id)">
          {{ data.like == null ? 0 : data.like }} 赞
        </div>
      </div>
    </div>

    <!-- 无图片组件 -->
    <div class="noContain" v-if="data.images.length == 0">
      <!-- 标题部分 -->
      <div class="articleTitle" @click="handleClickArticle(data.id)">
        {{ data.title }}
      </div>
      <!-- 文章内容 -->
      <div
        class="article"
        v-html="data.content"
        @click="handleClickArticle(data.id)"
      ></div>
      <!-- 用户信息 -->
      <div class="subcontain">
        <div class="info">
          <div class="address">
            <span class="el-icon-location-outline"></span>
            {{ data.cityName }}
          </div>
          <div class="user" @click="handleClickUser">
            by
            <span class="userImg">
              <img
                :src="$axios.defaults.baseURL + data.account.defaultAvatar"
                alt=""
              />
            </span>

            <span class="username"> {{ data.account.nickname }}</span>
          </div>
          <div class="viwer">
            <span class="el-icon-view"></span>
            {{ data.watch == null ? 0 : data.watch }}
          </div>
        </div>
        <div class="dianzan" @click="handleClickLike(data.id)">
          {{ data.like == null ? 0 : data.like }} 赞
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginVue from "~/pages/user/login.vue";
export default {
  props: ["data"],
  data() {
    return {};
  },

  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },

  methods: {
    handleClickUser() {
      this.$router.push("user/personal");
    },
    handleClickArticle(id) {
      console.log(id);
      this.$router.push("/post/detail?id=" + id);
    },
    handleClickLike(id) {
      if (!this.$store.state.user.userInfo.token) {
        this.$message.closeAll();
        this.$message.error("请先登录哦");
        this.$router.push("/user/login");
        return;
      }
      console.log(id);
      this.$axios({
        url: "/posts/like",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token,
        },
        params: {
          id,
        },
      })
        .then((res) => {
          console.log(res.data);

          if (res.data.message == "点赞成功") {
            this.data.like += 1;
            this.$message.success("点赞成功");
            return;
          }
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.singleContain {
  display: flex;
  margin: 20px 0;
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;
  .photo {
    margin-right: 10px;
    img {
      width: 220px;
      height: 150px;
      cursor: pointer;
      object-fit: cover;
    }
  }
  .content {
    width: 100%;
    .articleTitle {
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .articleTitle:hover {
      color: orange;
      cursor: pointer;
    }
    .article {
      height: 70px;
      font-size: 14px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 10px 0;
      cursor: pointer;
    }

    .subcontain {
      display: flex;
      font-size: 12px;
      justify-content: space-between;
      color: #888;
      margin-top: 10px;
      .info {
        display: flex;
        flex: 1;
        align-items: center;
        .user {
          margin: 0 20px;
          display: flex;
          align-items: center;
          .userImg {
            margin: 0 5px;
            img {
              height: 15px;
              width: 15px;
              vertical-align: middle;
              object-fit: cover;
            }
          }
          .username {
            color: orange;
          }
        }
        .user:hover {
          color: orange;
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .dianzan {
        font-size: 16px;
        color: orange;
        cursor: pointer;
      }
    }
  }
}

.twoContain {
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;
  .articleTitle {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .articleTitle:hover {
    color: orange;
    cursor: pointer;
  }
  .article {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
  .photo {
    img {
      width: 220px;
      height: 150px;
      margin-right: 9px;
      cursor: pointer;
      object-fit: cover;
    }
  }
  .subcontain {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    align-items: center;
    color: #888;
    margin-top: 10px;
    .info {
      display: flex;
      flex: 1;
      .user {
        margin: 0 20px;
        // border: 1px solid #000;
        display: flex;
        align-items: center;
        .userImg {
          margin: 0 5px;
          img {
            height: 15px;
            width: 15px;
            vertical-align: middle;
            object-fit: cover;
          }
        }
        .username {
          color: orange;
        }
      }
      .user:hover {
        color: orange;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .dianzan {
      font-size: 16px;
      color: orange;
      cursor: pointer;
    }
  }
}

.multiContain {
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;
  .articleTitle {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .articleTitle:hover {
    color: orange;
    cursor: pointer;
  }
  .article {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
  .photo {
    img {
      width: 220px;
      height: 150px;
      margin-right: 9px;
      cursor: pointer;
      object-fit: cover;
    }
  }
  .subcontain {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    align-items: center;
    color: #888;
    margin-top: 10px;
    .info {
      display: flex;
      .user {
        margin: 0 20px;
        display: flex;
        align-items: center;
        .userImg {
          margin: 0 5px;
          img {
            height: 15px;
            width: 15px;
            vertical-align: middle;
            object-fit: cover;
          }
        }
        .username {
          color: orange;
        }
      }
      .user:hover {
        color: orange;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .dianzan {
      font-size: 16px;
      color: orange;
      cursor: pointer;
    }
  }
}
.noContain {
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;
  .articleTitle {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .articleTitle:hover {
    color: orange;
    cursor: pointer;
  }
  .article {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
  .subcontain {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    align-items: center;
    color: #888;
    margin-top: 10px;
    .info {
      display: flex;
      align-items: center;
      .user {
        margin: 0 20px;
        display: flex;
        align-items: center;
        .userImg {
          margin: 0 5px;
          img {
            height: 15px;
            width: 15px;
            vertical-align: middle;
          }
        }
        .username {
          color: orange;
        }
      }
      .user:hover {
        color: orange;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .dianzan {
      font-size: 16px;
      color: orange;
      cursor: pointer;
    }
  }
}
</style>