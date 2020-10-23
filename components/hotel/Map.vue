<template>
  <div class="map">
    <div id="container"></div>
    <div class="ponit">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="风景" name="first" class="two">风景</el-tab-pane>
        <el-tab-pane label="交通" name="second" class="two">交通</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function () {
      var map = new AMap.Map("container", {
        zoom: 31,
        center: [113.324463, 23.10647],
      });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=d5192dea5a16faf3b3afdd0fb562d794&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    handleClick() {},
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
  }
}
#container {
  width: 650px;
  height: 360px;
}
</style>