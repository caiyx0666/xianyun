<template>
  <div>飞机票结果页</div>
</template>

<script>
export default {
    created() {
        this.$axios({
            url: '/airs',
            params: this.$route.query
        }).then(res=>{
            console.log(res.data);
        })
    }
}
</script>

<style>

</style>