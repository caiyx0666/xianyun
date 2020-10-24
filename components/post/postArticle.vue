<template>
  <div class="contain">
    <!-- 单照片组件 -->
    <div class="singleContain">
      <!-- 左边图片部分 -->
      <div class="photo">
        <img src="#" alt="" />
      </div>
      <!-- 右边内容 -->

      <div class="content">
        <!-- 上面标题 -->
        <div class="articleTitle">小蛮腰广州塔</div>
        <!-- 文章内容 -->
        <div class="article">
          造型独特的“小蛮腰”广州塔，犹如一颗璀璨的明珠屹立在珠江边，成为羊城新八景之一。别看她“身材苗条”，塔内可是蕴藏了丰富的休闲玩乐，等待您去掀开她的面纱。这座直逼云霄的高塔，如何在有限的时间打卡不同楼层？跟着这篇实用指南，一起游广州塔！
        </div>
        <!-- 作者 -->
        <div class="subcontain">
          <div class="info">
            <div class="address">
              <span class="el-icon-location-outline"></span> 广州
            </div>
            <div class="user">
              by
              <span class="userImg"></span>

              <span class="username"> 地球发动机 </span>
            </div>
            <div class="viwer"><span class="el-icon-view"></span> 711</div>
          </div>
          <div class="dianzan">11 赞</div>
        </div>
      </div>
    </div>

    <!-- 多图片组件 -->
    <div class="multiContain">
      <!-- 上面标题 -->
      <div class="articleTitle">小蛮腰广州塔</div>
      <!-- 文章内容 -->
      <div class="article">
        造型独特的“小蛮腰”广州塔，犹如一颗璀璨的明珠屹立在珠江边，成为羊城新八景之一。别看她“身材苗条”，塔内可是蕴藏了丰富的休闲玩乐，等待您去掀开她的面纱。这座直逼云霄的高塔，如何在有限的时间打卡不同楼层？跟着这篇实用指南，一起游广州塔！
      </div>
      <!-- 图片部分 -->
      <div class="photo">
        <div class="pic"></div>
        <div class="pic"></div>
        <div class="pic"></div>
      </div>

      <!-- 作者 -->
      <div class="subcontain">
        <div class="info">
          <div class="address">
            <span class="el-icon-location-outline"></span> 广州
          </div>
          <div class="user">
            by
            <span class="userImg"></span>

            <span class="username"> 地球发动机 </span>
          </div>
          <div class="viwer"><span class="el-icon-view"></span> 711</div>
        </div>
        <div class="dianzan">11 赞</div>
      </div>
    </div>

    <!-- 无图片组件 -->

    <div class="noContain">
      <!-- 标题部分 -->
      <div class="articleTitle">小蛮腰广州塔</div>
      <!-- 文章内容 -->
      <div class="article">
        造型独特的“小蛮腰”广州塔，犹如一颗璀璨的明珠屹立在珠江边，成为羊城新八景之一。别看她“身材苗条”，塔内可是蕴藏了丰富的休闲玩乐，等待您去掀开她的面纱。这座直逼云霄的高塔，如何在有限的时间打卡不同楼层？跟着这篇实用指南，一起游广州塔！
      </div>
      <!-- 用户信息 -->
      <div class="subcontain">
        <div class="info">
          <div class="address">
            <span class="el-icon-location-outline"></span> 广州
          </div>
          <div class="user">
            by
            <span class="userImg"></span>

            <span class="username"> 地球发动机 </span>
          </div>
          <div class="viwer"><span class="el-icon-view"></span> 711</div>
        </div>
        <div class="dianzan">11 赞</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.singleContain {
  display: flex;
  margin: 20px 0;
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;
  .photo {
    width: 220px;
    height: 150px;
    margin-right: 10px;
    background-color: #ccc;
  }
  .content {
    flex: 1;

    .articleTitle {
      font-size: 18px;
      height: 40px;
      line-height: 40px;
    }
    .article {
      font-size: 14px;
      color: #666;
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
      }
      .dianzan {
        font-size: 16px;
        color: orange;
      }
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
  }
  .article {
    font-size: 14px;
    color: #666;
  }
  .photo {
    display: flex;
    .pic {
      width: 220px;
      height: 150px;
      margin-right: 10px;
      background-color: #ccc;
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
  }
  .article {
    font-size: 14px;
    color: #666;
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
    }
    .dianzan {
      font-size: 16px;
      color: orange;
    }
  }
}
</style>