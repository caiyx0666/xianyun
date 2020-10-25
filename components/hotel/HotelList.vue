<template>
  <div class="container">
      <!-- 封面 -->
          <img :src="hotel.photos">
      <!-- 中间的文字介绍部分 -->
      <div class="introduce">
          <h4>{{ hotel.name }}</h4>
          <div class="alias">{{ hotel.alias }}</div>
          <div class="data">
              <!-- 评分星级 -->
              <div class="stars">
                  <el-rate
                    v-model="hotel.stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    :score-template="`${hotel.stars}分`">
                   </el-rate>
              </div>
                <div class="flex1">
                    <span>{{ hotel.all_remarks }}</span>条评价
                </div>
                <div class="flex1">
                    <span>{{ hotel.very_good_remarks }}</span>篇游记
                </div>
          </div>
          <div class="place">
              <i class="el-icon-location-information"></i>位于：{{ hotel.address }}
          </div>
      </div>
      <!-- 右边的房间信息 -->
      <div class="roomList">
          <el-table
            :data="hotel.products"
            :show-header="false">
            <el-table-column
                prop="name"
                label="名称">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <span class="price">￥{{ scope.row.price }}</span>起
                    <i class="el-icon-arrow-right"></i>
                </template>
            </el-table-column>
          </el-table>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        hotel:{
            type: Object,
            default(){
                return{}
            }
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    display: flex;
    justify-content: space-between;
    padding: 25px 0;
    border-bottom: 1px solid #eee;

    img {
        width: 320px;
        height: 210px;
        object-fit: cover;
    }

    .introduce {
        flex: 1;
        padding: 0 20px;

        h4 {
            font-weight: 400;
            font-size: x-large;
        }

        .alias {
            color: #999;
            padding-top: 4px;
        }

        .data {
            padding: 8px 0;
            display: flex;
            align-items: center;

            div {
                &.flex1 {
                    flex: 1;
                }
                &.stars {
                    width: 41%;
                }

                span {
                    color: #f90;
                }
            }

        }

        .place {
            font-size: 14px;
            color: #666;
        }
    }

    .roomList {
        padding-top: 30px;
        width: 234px;

        .price {
            color: #f90;
            font-size: larger;
        }
    }
}
</style>