<template>
  <div class="filters">
        <el-row
            type="flex"
            class="filters-top"
            justify="space-between"
            align="middle"
        >
            <el-col :span="8"> 单程： 广州 - 上海 / 2019-06-17 </el-col>
            <el-col :span="4">
                <el-select
                    size="mini"
                    v-model="airport"
                    placeholder="起飞机场"
                    @change="runFilters"
                >
                    <el-option 
                        v-for="(item, index) in data.options.airport"
                        :key="index"
                        :label="item"
                        :value="item"
                    > </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select
                    size="mini"
                    v-model="flightTimes"
                    placeholder="起飞时间"
                    @change="runFilters"
                >
                    <!-- 由于我们的筛选不经过后台, 这里的 value 可以随便定
                    只要后面写筛选, 根据这里的 value 值去过滤即可 -->
                    <!-- label="0:00-6:00"
                    value="0,6" -->
                    <el-option 
                        v-for="(item, index) in data.options.flightTimes"
                        :key="index"
                        :label="item.from + ':00 -' + item.to + ':00' " 
                        :value="item.from + ',' + item.to"
                    > </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select
                    size="mini"
                    v-model="company"
                    placeholder="航空公司"
                    @change="runFilters"
                >
                    <el-option 
                        v-for="(item, index) in data.options.company"
                        :key="index"
                        :label="item" 
                        :value="item"> 
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select
                    size="mini"
                    v-model="airSize"
                    placeholder="机型"
                    @change="runFilters"
                >
                    <el-option 
                        v-for="(item, index) in sizeOptions"
                        :key="index"
                        :label="item.label" 
                        :value="item.value"
                    > </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button
                type="primary"
                round
                plain
                size="mini"
                @click="handleFiltersCancel"
            >
                撤销
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
     props: ['data'],
     data() {
            return {
                value: "",
                airport: "", // 机场
                flightTimes: "", // 出发时间
                company: "", // 航空公司
                airSize: "", // 机型大小
                sizeOptions: [
                    {
                        label: '大',
                        value: 'L'
                    },
                    {
                        label: '中',
                        value: 'M'
                    },
                    {
                        label: '小',
                        value: 'S'
                    }
                ]
            };
        },

        methods: {
            runFilters(){
                // 判断哪个过滤器有设置值，再执行过滤操作
                let res= this.data.flights
                if(this.airport){
                    res= this.handleAirport(res)
                }
                if(this.flightTimes){
                    res = this.handleFlightTimes(res)
                }
                if(this.company){
                    res = this.handleCompany(res)
                }
                if(this.airSize){
                    res = this.handleAirSize(res)
                }
                console.log('四个过滤器检查完毕');
                console.log(res);
                // 四个过滤器都执行过以后，真正发送给父页面
                this.$emit('setFilteredList',res)
            },

            // 选择机场时候触发
            handleAirport(originList) {
                const res = originList.filter(flight=>{
                    return flight.org_airport_name == this.airport
                })
                return res
            },

            // 选择出发时间时候触发
            handleFlightTimes(originList) {
                const begin = Number(this.flightTimes.split(',')[0])
                const end = Number(this.flightTimes.split(',')[1])

                const res = originList.filter(flight =>{
                    const depHour = Number(flight.dep_time.split(':')[0])
                    return depHour >begin && depHour<end
                })
                return res
            },

            // 选择航空公司时候触发
            handleCompany(originList) {
                // 默认会得到一个选中的 originList 值
                // 另外这个选择器也会绑定到 this.company
                // 只要用 filter过滤 符合return true 其他 return false 即可
                const res = originList.filter(flight =>{
                    return flight.airline_name == this.company
                })
                return res
            },

            // 选择机型时候触发
            handleAirSize(originList) {
                const res = originList.filter(flight =>{
                    return flight.plane_size == this.airSize
                })

                return res
            },

            // 撤销条件时候触发
            handleFiltersCancel() {},
        },
    }
</script>

<style lang="less" scoped>
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>