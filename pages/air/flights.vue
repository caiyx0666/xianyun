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

                <el-pagination
                    v-if="flightsData.flights"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-size="pageSize"
                    :current-page="pageIndex"
                    :page-sizes="[2, 5, 10, 20, 50]"
                    :total="filteredList.length"
                    @size-change="sizeChange"
                    @current-change="currentChange"
                />

                <!-- 航班头部布局 -->
                <FlightsListHead />

                <div
                    v-if="
                        flightsData.flights && flightsData.flights.length == 0
                    "
                >
                    暂无数据
                </div>
                <!-- 航班信息 -->
                <FlightsItem
                    v-for="(flight, index) in dataList"
                    :key="flight.id"
                    :data="flight"
                    :isShow="index == currentIndex"
                    @click.native="setCurrentIndex(index)"
                />
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside />
            </div>
        </el-row>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                flightsData: {},
                // 添加一个数组, 准备存放分页数据
                // dataList: [],
                filteredList: [],
                pageIndex: 1,
                pageSize: 10,

                // 父页面储存当前激活的航班索引
                currentIndex: -1,
            };
        },
        created() {
            this.loadPage()
        },
        // 监听路径变化, 如果点击了搜索记录应该发起搜索请求
        watch: {
            $route() {
                this.loadPage()
            },
        },
        computed: {
            dataList() {
                // 不可以再用原100条数据做分页
                // 要用过滤后的数组分页
                if (!this.filteredList) {
                    return [];
                }

                let beginIndex = (this.pageIndex - 1) * this.pageSize;
                let endIndex = beginIndex + this.pageSize;
                return this.filteredList.slice(beginIndex, endIndex);
            },
        },
        methods: {
            loadPage() {
                this.$axios({
                    url: "/airs",
                    params: this.$route.query,
                }).then((res) => {
                    // console.log(res.data);
                    this.flightsData = res.data;
                    // 页面刚创建, 过滤器还没有任何选项
                    // 先将100条作为过滤后的数据用来显示
                    this.filteredList = this.flightsData.flights;
                    // this.getList();
                });
            },
            // getList() {
            //     // 根据当前页码,和每页长度计算出,开始和结束的 index
            //     // 从 this.flightsData.flights 数组当中截取需要显示的数据
            //     // 放入 dataList 当中
            //     let beginIndex = (this.pageIndex - 1) * this.pageSize;
            //     let endIndex = beginIndex + this.pageSize;
            //     this.dataList = this.flightsData.flights.slice(
            //         beginIndex,
            //         endIndex
            //     );
            // },
            setCurrentIndex(index) {
                // 判断 如果当前索引已经是激活
                // 那么点击就是想将所有都关起来
                // 将 当前索引设为 -1
                if (index == this.currentIndex) {
                    this.currentIndex = -1;
                } else {
                    // 否则才将当前点击项为激活
                    this.currentIndex = index;
                }
            },
            currentChange(newPageIndex) {
                this.pageIndex = newPageIndex;
                // this.getList()
            },
            sizeChange(newPageSize) {
                this.pageSize = newPageSize;
                // this.getList()
            },
            setFilteredList(newList) {
                this.pageIndex = 1;
                this.filteredList = newList;
                console.log("父组件收到了子组件的数据传递");
                console.log(this.filteredList);
            },
        },
    };
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