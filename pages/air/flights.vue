<template>
   <section class="contianer">
        <el-row type="flex" justify="space-between">
            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilter 
                    v-if="flightsData.options"
                    @setFilteredList="setFilteredList"
                    :data="flightsData"
                />
                
                <!-- 分页组件 -->
                  <el-pagination
                    v-if="flightsData.flights"
                    background
                    :pager-count="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-size="pageSize"
                    :page-sizes="[2,5,10,20,50]"
                    @size-change="sizeChange"
                    :total="filteredList.length"
                    @current-change="currentChange"
                />

                <!-- 航班头部布局 -->
                <FlightsListHead />

                <div v-if="flightsData.flights && flightsData.flights.length == 0">
                    暂无数据
                </div>

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
            filteredList: [],
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
        })
    },
    methods:{
        setFilteredList(newList){
            this.filteredList = newList
            console.log('父组件收到了子组件的数据传递');
            console.log(this.filteredList);
        },
        // 每页显示的条数发生变化
        currentChange(newPageIndex){
            this.pageIndex = newPageIndex
        },
        // 页数发生变化
        sizeChange(newPageSize){
            this.pageSize = newPageSize
        }
    },
    computed: {
        dataList(){
            // 不可以用原来100条数据做分页
            // 要用过滤后的数组分页
            if(!this.filteredList){
                return []
            }
            let beginIndex = (this.pageIndex - 1) * this.pageSize
            let endIndex = beginIndex + this.pageSize
            return this.filteredList.slice(
                beginIndex,
                endIndex
            )
        }
    },
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