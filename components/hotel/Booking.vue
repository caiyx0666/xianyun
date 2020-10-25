<template>
  <div class="booking">
    <el-table :data="hotelList" stripe>
      <el-table-column label="价格来源" width="430px" prop="name">
      </el-table-column>

      <el-table-column label="低价房型" width="430px" prop="bestType">
      </el-table-column>

      <el-table-column label="最低价格/每晚" class="lastNumber">
        <template slot-scope="scope">
          <span class="yellow">
            <i class="yellow1">¥</i>
            {{ scope.row.price }} </span
          >起<i class="el-icon-arrow-right yellow"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["hotelList"],
};
</script>


<style scoped lang="less">
.booking {
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  margin: 50px 0;
}
.lastNumber {
  font-size: 16px;
}
.yellow {
  color: #f90;
  padding: 0 5px;
}
.yellow1 {
  padding: 0 1px;
}
</style>