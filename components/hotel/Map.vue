<template>
  <div class="map">
    <div id="container"></div>
    <div class="ponit">
      <!-- <el-tab-pane label="交通" name="second" class="two">交通</el-tab-pane> -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风景" class="two" name="风景">
          <ul v-if="rim">
            <li
              v-for="(item, index) in hotelList"
              :key="index"
              @mouseenter="rimenter(item)"
            >
              <span class="character">{{ item.title }}</span>
              <span class="distance">{{ item.distance }}米</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="交通" class="two" name="交通">
          <ul v-if="rim">
            <li
              v-for="(item, index) in hotelList"
              :key="index"
              @mouseenter="rimenter(item)"
            >
              <span class="character">{{ item.title }}</span>
              <span class="distance">{{ item.distance }}米</span>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "风景",
      hotelList: [],
      rim: [],
      map: [],
      placeSearch: [],
      distance: {},
    };
  },
  props: ["hotelList1"],
  watch: {
    activeName() {
      // console.log(this.map);
      //  this.placeSearch.clear();清楚搜索结果
      this.placeSearch.clear();
      this.hotelList = [];
      // 设置搜素时候的type属性
      this.placeSearch.setType(this.activeName == "交通" ? "交通" : "风景");
      this.logActive();
    },
    hotelList1() {
      this.logMap();
    },
  },
  mounted() {
    // window.onLoad = () => {
    //   var map = new AMap.Map("container", {
    //     zoom: 50,
    //     center: this.hotelList.location.longitude
    //       ? [
    //           this.hotelList.location.longitude,
    //           this.hotelList.location.latitude,
    //         ]
    //       : [113.324463, 23.10647],
    //   });
    //   this.map = map;
    //   AMap.service(["AMap.PlaceSearch"], () => {
    //     //构造地点查询类
    //     var placeSearch = new AMap.PlaceSearch({
    //       type: "风景", // 兴趣点类别
    //       pageSize: 20, // 单页显示结果条数
    //       pageIndex: 1, // 页码
    //       citylimit: true, //是否强制限制在设置的城市内搜索
    //       map: map, // 展现结果的地图实例
    //       autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    //     });
    //     this.placeSearch = placeSearch;
    //     this.logActive();
    //   });
    // };
    // var url =
    //   "https://webapi.amap.com/maps?v=1.4.15&key=d5192dea5a16faf3b3afdd0fb562d794&callback=onLoad";
    // var jsapi = document.createElement("script");
    // jsapi.charset = "utf-8";
    // jsapi.src = url;
    // document.head.appendChild(jsapi);
  },
  methods: {
    logMap() {
      this.$nextTick(() => {
        //this.$nextTick强行执行一次
        window.onLoad = () => {
          // 创建一个实例
          var map = new AMap.Map("container", {
            zoom: 50,
            // 中心点是每次获取酒店列表的location
            center: [this.hotelList1.longitude, this.hotelList1.latitude],
          });
          // 因为想要再其他地方调用map，所以要把map存进去data里面，这样子全局就可以调用了
          this.map = map;
          AMap.service(["AMap.PlaceSearch"], () => {
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
              type: "风景", // 兴趣点类别
              pageSize: 20, // 单页显示结果条数
              pageIndex: 1, // 页码
              citylimit: true, //是否强制限制在设置的城市内搜索
              map: map, // 展现结果的地图实例
              autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });
            // 和全局调用map同理
            this.placeSearch = placeSearch;
            // 调用函数
            this.logActive();
          });
        };
        // 引入js文件，一定要引入地图js文件，不然地图无法显示

        var url =
          "https://webapi.amap.com/maps?v=1.4.15&key=d5192dea5a16faf3b3afdd0fb562d794&callback=onLoad";
        var jsapi = document.createElement("script");
        jsapi.charset = "utf-8";
        jsapi.src = url;
        document.head.appendChild(jsapi);
      });
    },
    handleClick(tab, event) {
      console.log(this.activeName);
      console.log(tab, event);
    },
    // 设置地图中心点/级别
    rimenter(item) {
      // console.log("这里是item", item);
      this.map.setCenter([item.position[0], item.position[1]]); //设置地图中心点
    },
    logActive() {
      var cpoint = [this.hotelList1.longitude, this.hotelList1.latitude]; //中心点坐 标
      this.placeSearch.searchNearBy("", cpoint, 2000, (status, result) => {
        // 直接调用高德的方法，result返回一个结果
        // console.log(result);
        // console.log(result.poiList.pois);
        //  遍历出我想要的东西，return出去
        this.hotelList = result.poiList.pois.map((hotel) => {
          var marker = new AMap.Marker({
            title: hotel.name,
            position: [hotel.location.R, hotel.location.Q],
            distance: hotel.distance,
          });
          return {
            title: hotel.name,
            position: [hotel.location.R, hotel.location.Q],
            distance: hotel.distance,
          };
        });
        // console.log("这里是hotelList", this.hotelList);
      });
    },
  },
};
</script>

<style scoped lang="less">
.map {
  width: 100%;
  margin: 40px 0;
  display: flex;
}
.ponit {
  width: 350px;
  height: 360px;
  padding-left: 20px;
  .two {
    overflow: auto;
    height: 300px;
    width: 340px;
    cursor: pointer;
    display: flex;
    ul {
      width: 100%;
      margin: 0 10px 0;
      li {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #666;
        display: flex;
        .character {
          flex: 1;
        }
        .distance {
          width: 50px;
        }
      }
    }
  }
}
#container {
  width: 650px;
  height: 360px;
}
</style>