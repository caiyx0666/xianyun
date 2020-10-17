<template>
   <section class="contianer">
        <el-row type="flex" justify="space-between">
            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>过滤条件</div>
                
                <!-- 分页组件 -->
                  <el-pagination
                    v-if="flightsData.flights"
                    background
                    :pager-count="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-size="pageSize"
                    :page-sizes="[2,5,10,20,50]"
                    @size-change="sizeChange"
                    :total="flightsData.flights.length"
                    @current-change="currentChange"
                />

                <!-- 航班头部布局 -->
                <FlightsListHead />

                <!-- 航班信息 -->
                 <FlightsItem 
                    v-for="flight in dataList"
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
            flightsData: {},
                // 添加一个数组, 准备存放分页数据
            dataList: [],
            pageIndex: 1,
            pageSize: 10,
        }
    },
    created() {
        this.$axios({
            url: '/airs',
            params: this.$route.query
        }).then(res=>{
            console.log(res.data);
            this.flightsData = res.data
            this.getList()
        })
    },
    methods:{
        getList(){
            // 根据当前页码，和每页长度计算出，开始和结束的index
            // 从 this.flightsData.flights 数组当中截取需要显示的数据
            // 放入 dataList 当中
            let beginIndex = (this.pageIndex - 1) * this.pageSize
            let endIndex = beginIndex + this.pageSize
            this.dataList = this.flightsData.flights.slice(
                beginIndex,
                endIndex
            )
        },
        // 每页显示的条数发生变化
        currentChange(newPageIndex){
            this.pageIndex = newPageIndex
            this.getList()
        },
        // 页数发生变化
        sizeChange(newPageSize){
            this.pageSize = newPageSize
            this.getList()
        }
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