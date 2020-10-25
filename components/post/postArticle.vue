<template>
  <div class="contain">
    <!-- 单照片组件 -->
    <div class="singleContain" v-if="data.images.length == 1">
      <!-- 左边图片部分 -->
      <div class="photo">
        <img :src="data.images[0]" alt="" />
      </div>
      <!-- 右边内容 -->

      <div class="content">
        <!-- 上面标题 -->
        <div class="articleTitle">{{ data.title }}</div>
        <!-- 文章内容 -->
        <div class="article">{{ data.summary }}</div>
        <!-- 作者 -->
        <div class="subcontain">
          <div class="info">
            <div class="address">
              <span class="el-icon-location-outline"></span> {{ data.cityName }}
            </div>
            <div class="user" @click="handleClickUser">
              by
              <span class="userImg"></span>

              <span class="username"> 地球发动机 </span>
            </div>
            <div class="viwer">
              <span class="el-icon-view"></span> {{ data.watch }}
            </div>
          </div>
          <div class="dianzan">{{ data.like }} 赞</div>
        </div>
      </div>
    </div>

    <!-- 双图片模式 -->
    <div class="twoContain" v-if="data.images.length == 2">
      <!-- 上面标题 -->
      <div class="articleTitle">{{ data.title }}</div>
      <!-- 文章内容 -->
      <div class="article" v-html="data.content"></div>
      <!-- 图片部分 -->
      <div class="photo">
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
            <span class="userImg"></span>

            <span class="username"> 地球发动机 </span>
          </div>
          <div class="viwer">
            <span class="el-icon-view"></span> {{ data.watch }}
          </div>
        </div>
        <div class="dianzan">{{ data.like }} 赞</div>
      </div>
    </div>

    <!-- 多图片组件 -->
    <div class="multiContain" v-if="data.images.length >= 3">
      <!-- 上面标题 -->
      <div class="articleTitle">{{ data.title }}</div>
      <!-- 文章内容 -->
      <div class="article" v-html="data.content"></div>
      <!-- 图片部分 -->
      <div class="photo">
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
            <span class="userImg"></span>

            <span class="username"> 地球发动机 </span>
          </div>
          <div class="viwer">
            <span class="el-icon-view"></span> {{ data.watch }}
          </div>
        </div>
        <div class="dianzan">{{ data.like }} 赞</div>
      </div>
    </div>

    <!-- 无图片组件 -->
    <div class="noContain" v-if="data.images.length == 0">
      <!-- 标题部分 -->
      <div class="articleTitle">{{ data.title }}</div>
      <!-- 文章内容 -->
      <div class="article" v-html="data.content"></div>
      <!-- 用户信息 -->
      <div class="subcontain">
        <div class="info">
          <div class="address">
            <span class="el-icon-location-outline"></span>
            {{ data.cityName }}
          </div>
          <div class="user" @click="handleClickUser">
            by
            <span class="userImg"></span>

            <span class="username"> 地球发动机 </span>
          </div>
          <div class="viwer">
            <span class="el-icon-view"></span> {{ data.watch }}
          </div>
        </div>
        <div class="dianzan">{{ data.like }} 赞</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],

  methods: {
    handleClickUser() {
      this.$router.push("user/personal");
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
    }
  }
  .content {
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
        .user {
          margin: 0 20px;
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
      }
    }
  }
  .dianzan {
    font-size: 16px;
    color: orange;
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
    }
  }
  .subcontain {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    color: #888;
    margin-top: 10px;
    .info {
      display: flex;
      .user {
        margin: 0 20px;
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
    }
  }
  .subcontain {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    color: #888;
    margin-top: 10px;
    .info {
      display: flex;
      .user {
        margin: 0 20px;
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
    color: #888;
    margin-top: 10px;
    .info {
      display: flex;
      .user {
        margin: 0 20px;
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
    }
  }
}
</style>