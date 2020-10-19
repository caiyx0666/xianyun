<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm v-if="flightData.id" :data="flightData" @setTotalPrice="setTotalPrice"/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <OrderAside v-if="flightData.id" :data="flightData" :totalPrice="totalPrice"/>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                flightData:{},
                totalPrice:0
            }
        },
        created(){
            // 父页面先获取机票数据
            // 分别交给两个组件
            this.$axios({
                url:'/airs/'+this.$route.query.id,
                params:{
                    seat_xid:this.$route.query.seat_xid
                }
            }).then(res=>{
                console.log(res.data);
                this.flightData = res.data
            })
        },
        methods:{
            setTotalPrice(newTotalPrice){
                this.totalPrice = newTotalPrice
            }
        }
    };
</script>

<style lang="less" scoped>
    .container {
        width: 1000px;
        margin: 20px auto;
    }

    /*aside*/
    .aside {
        width: 350px;
        height: fit-content;
        border: 1px #ddd solid;
    }
</style>