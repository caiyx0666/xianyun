<template>
  <div class="booking">
    <el-table :data="tableData" stripe>
      <el-table-column label="价格来源" width="430px" prop="data">
      </el-table-column>
      <el-table-column label="低价房型" width="430px" prop="name">
      </el-table-column>
      <el-table-column label="最低价格/每晚" prop="address"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          data: "携程",
          name: "高级大床房A",
          address: "￥217",
        },
        {
          data: "携程",
          name: "高级大床房A",
          address: "￥217",
        },
        {
          data: "携程",
          name: "高级大床房A",
          address: "￥217",
        },
      ],
    };
  },
  props: ["hotelList"],
};
</script>


<style scoped lang="less">
.booking {
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
}
</style>