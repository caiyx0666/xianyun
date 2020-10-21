<template>
  <div class="pageWrapper">
    <div class="leftWrapper">
      左侧边栏
    </div>
    <div class="main">
      右边主体部分
      <!-- 如果直接写，那么在服务器不认识，浏览器才认识
           所以会造成前后端渲染内容内容不一致，报错
           这里可以单独指定这一个标签要在客户端再渲染
       -->
       <client-only>
          <VueEditor />
       </client-only>
    </div>
  </div>
</template>

<script>
import {VueEditor} from 'vue2-editor'
export default {
    components: {
        VueEditor
    }
};
</script>

<style lang="less" scoped>
.pageWrapper {
  display: flex;
  margin:0 auto;
  min-width: 1000px;
  width: 1000px;

  .leftWrapper {
    width: 260px;
  }
}
</style>