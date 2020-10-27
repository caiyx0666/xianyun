<template>
  <div id="container"></div>
</template>

<script>
export default {
  data() {
    return {
      map: [],
      hotelList: [],
    };
  },
  created() {
    this.logpage();
    this.loadMap();
  },
  mounted() {
      
    window.onLoad = () => {
      var map = new AMap.Map("container", {
        zoom: 20, //级别
        center: [113.428072, 23.129259], //中心点坐标
        viewMode: "3D", //使用3D视图
      });

      this.map = map;
    };

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=ba73350c7105f561cfc60dfa2679fcb6&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    logpage() {
      this.$axios({
        url: "/hotels",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => {
        // console.log(res.data);
        this.hotelList = res.data.data[0];
        console.log(this.hotelList);
      });
    },
    loadMap() {
      this.map = new AMap.Map("container", {
        zoom: 10, //级别
        center: [
          this.hotelList.location.longitude,
          this.hotelList.location.latitude,
        ], //中心点坐标
        viewMode: "3D", //使用3D视图
      });

      let markerList = [];
      this.hotelList.forEach((hotel, index) => {
        console.log(hotel);
        // console.log(this.map);
        // let content = `<div class="marker-route marker-marker-bus-from">${index}</div>`;
        var marker = new AMap.Marker({
          position: [hotel.location.longitude, hotel.location.latitude], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: hotel.name,
          iconLabel: index,
        });
        markerList.push(marker);
      });
      this.map.add(markerList);
      console.log(markerList);
    },
  },
};
</script>

<style scoped lang="less">
#container {
  width: 650px;
  height: 360px;
}
</style>