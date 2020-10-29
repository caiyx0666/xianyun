<template>
  <div class="area">
    <div class="san"></div>
    <div class="areaFirst">周边国家和地区</div>
    <div class="middle">
      <div>韩国 <i>Korea</i></div>
      <div>朝鲜 <i>North Korea</i></div>
      <div>日本 <i>Japan</i></div>
      <div>俄罗斯 <i>Russia</i></div>
      <div>蒙古国 <i>Mongolia</i></div>
      <div>老挝 <i>Laos</i></div>
    </div>

    <div class="areaLast">>>更多国家和地区</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.area {
  position: relative;
  .san {
    position: absolute;
    left: 17px;
    top: -11px;
    border-style: solid;
    border-width: 5px 5px 5px 5px;
    border-color: transparent transparent #ccc transparent;
    width: 0px;
    height: 0px;
    transform: rotate(-360deg);
  }
  cursor: pointer;
  width: 150px;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  font-size: 12px;
  .areaFirst {
    font-weight: 700;
    padding: 20px 0 0 10px;
  }
  i {
    color: #cccccc;
  }
  .areaLast {
    color: #f90;
    padding: 3px 0 0 30px;
  }
  .middle {
    padding: 0 10px;
    > div {
      padding: 3px;
    }
    :hover {
      background-color: #ff99003d;
      color: #f90;
    }
  }
}
</style>