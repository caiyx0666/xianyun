<template>
   <section class="contianer">
        <el-row type="flex" justify="space-between">
            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>过滤条件</div>

                <!-- 航班头部布局 -->
                <FlightsListHead />

                <!-- 航班信息 -->
                 <FlightsItem 
                    v-for="flight in flightsData.flights"
                    :key="flight.id"
                    :data="flight"
                />
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                侧边栏
            </div>
        </el-row>
    </section>
</template>

<script>
export default {
    data(){
        return{
            flightsData: {}
        }
    },
    created() {
        this.$axios({
            url: '/airs',
            params: this.$route.query
        }).then(res=>{
            console.log(res.data);
            this.flightsData = res.data
        })
    }
}
</script>

<style lang="less" scoped>
    .contianer {
        width: 1000px;
        margin: 20px auto;
    }

    .flights-content {
        width: 745px;
        font-size: 14px;
    }

    .aside {
        width: 240px;
    }
</style>