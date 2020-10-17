<template>
    <div class="flight-item" v-if="data">
        <div @click="isShow = !isShow">
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6"> <span>{{data.airline_name}} </span> {{ data.flight_no }} </el-col>
                <el-col :span="12">
                    <el-row
                        type="flex"
                        justify="space-between"
                        class="flight-info-center"
                    >
                        <el-col :span="8" class="flight-airport">
                            <strong>{{ data.dep_time }}</strong>
                            <span>{{ data.org_airport_name + data.org_airport_quay }}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{ setDate(data.dep_datetime,data.arr_datetime) }}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{ data.arr_time }}</strong>
                            <span>{{ data.dst_airport_name + data.dst_airport_quay }}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{ bestPrice }}</span>起
                </el-col>
            </el-row>
        </div>
        
        <el-collapse-transition>

        <div class="flight-recommend" v-show="isShow">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20" >
                    <el-row
                        type="flex"
                        justify="space-between"
                        align="middle"
                        class="flight-sell"
                        v-for="info in data.seat_infos" :key="info.ata_id"
                    >
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{ info.group_name }}</span> | {{ info.supplierName }}
                        </el-col>
                        <el-col :span="5" class="price"> ￥{{ info.org_settle_price }} </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button type="warning" size="mini">
                                选定
                            </el-button>
                            <p v-if="info.nums != 'A'">剩余：{{info.nums}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        </el-collapse-transition>

    </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return{
            isShow:false
        }
    },
    props: {
        data: {
            type: Object,
            // default: {}
            default() {
                return {}
            }
        }
    },
    methods:{
        // 计算时间差
        setDate(starttime,endtime){
             var totalMinute = moment(endtime).diff(starttime) / (1000 * 60),
              hours = Math.floor(totalMinute / 60),
              minute = totalMinute % 60,
              result = '';
              if(hours > 0){
                result = result + hours + '小时';
              }else{
                  minute>0?result = 24 + hours + '小时' + minute + '分钟':result = 24 + hours + '小时' + (60 + minute) + '分钟'
              }
              if(minute > 0){
                result = result + minute + '分钟';
              }
              return result
        }
    },
    computed: {
        // 计算最低机票价格
        bestPrice(){
            // 遍历当前航班座位信息
            // 找出最低价 return 出来
            let bestPrice = this.data.seat_infos[0].settle_price_child
            this.data.seat_infos.forEach(seat =>{
                if(seat.settle_price_child < bestPrice){
                    bestPrice = seat.settle_price_child
                }
            })
            return bestPrice
        }
    },
};
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>