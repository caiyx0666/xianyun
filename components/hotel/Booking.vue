<template>
  <div class="booking">
    <el-table :data="hotelList" stripe>
      <el-table-column label="价格来源" width="430px" prop="name">
      </el-table-column>

      <el-table-column label="低价房型" width="430px" prop="bestType">
      </el-table-column>

      <el-table-column label="最低价格/每晚" class="lastNumber">
        <template slot-scope="scope"
          ><a
            href="https://hotels.ctrip.com/hotels/detail/?hotelId=65822792&checkIn=2020-10-25&checkOut=2020-10-26&cityId=2&minprice=&mincurr=&adult=1&children=0&ages=&crn=1&curr=&fgt=&stand=&stdcode=&hpaopts=&mproom=&allianceid=&sid=&ouid=&shoppingid=&roomkey=&highprice=-1&lowprice=0&showtotalamt=&hotelUniqueKey="
            target="_blank"
          >
            <span class="yellow">
              <i class="yellow1">¥</i>
              {{ scope.row.price }} </span
            >起<i class="el-icon-arrow-right yellow"></i
          ></a>
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
  font-size: 18px;
}
.yellow1 {
  padding: 0 1px;
}
</style>