
<template>
    
</template>

<script>
export default {
  methods: {
    open() {
      this.$alert("发布成功，经验值+10，可以到 [我的点评] 中查看", {
        confirmButtonText: "确定",
        type: "success",
        center: true,
      });
    },
  },
};
</script>

