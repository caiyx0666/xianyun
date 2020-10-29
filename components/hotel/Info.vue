<template>
  <div class="infoContainer">
    <div class="info">
      <el-row>
        <el-col :span="4">基本信息</el-col>
        <el-col :span="5">入住时间：14：00之后</el-col>
        <el-col :span="5">离店时间：12：00之前</el-col>
        <el-col :span="5"
          >{{ hotelList.creation_time }}/{{ hotelList.renovat_time }}</el-col
        >
        <el-col :span="5">酒店规模：{{ hotelList.roomCount }}间客房</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">酒店服务</el-col>
        <el-col :span="20" v-if="hotelList.hotelassets">
          <span v-if="(hotelList.hotelassets.type == '酒店服务') == 0">
            <i class="facility">暂无数据</i>
          </span>
          <span v-else>
            <span v-for="(item, index) in hotelList.hotelassets" :key="index">
              <i v-if="item.type == '酒店服务'" class="facility">{{
                item.name
              }}</i>
            </span>
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20" v-if="hotelList.hotelassets">
          <span v-if="hotelList.hotelassets.length == 0">
            <i class="facility">暂无数据</i>
          </span>
          <span v-else>
            <span v-for="(item, index) in hotelList.hotelassets" :key="index">
              <i
                v-if="item.type == '主要设施' || item.type == '房间设施'"
                class="facility"
                >{{ item.name }}</i
              >
            </span>
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20" v-if="hotelList.hotelbrand == null">
          <span class="facility"> 暂无数据 </span>
        </el-col>
        <!-- <span v-if="hotelList.hotelbrand.name"> -->
        <!-- <span v-for="(item, index) in hotelList.hotelassets" :key="index"> -->
        <!-- <i v-if="item.type == '房间设施'" class="facility">{{
                item.name
              }}</i> -->
        <!-- <i class="facility"> {{ hotelList.hotelbrand.name }}</i> -->
        <!-- </span> -->
        <!-- </span> -->
        <el-col :span="20" v-else>
          <span class="facility">
            {{ hotelList.hotelbrand.name }}
          </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotelList"],
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 240px;
  margin: 40px 0;
}

.el-col {
  border-bottom: 1px solid #eeeeee;
  padding: 15px 0;
}
.facility {
  margin: 0 10px 0 0;
  padding: 10px 15px;
  color: #666;
  background-color: #eeeeee;
  font-size: 14px;
  text-align: center;
  border-radius: 7px;
}
</style>