<template>
  <div>
    <input type="text" v-model="content" />
    <button @click="handleClick">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      hotel: 268,
      score: {
        location: 4,
        service: 4,
        fancility: 3,
        all: 3,
      },
    };
  },
  methods: {
    handleClick() {
      this.$axios({
        method: "post",
        url: "/comments",
        data: { content: this.content, hotel: "268", score: this.score },
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token,
        },
      }).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>

<style>
</style>