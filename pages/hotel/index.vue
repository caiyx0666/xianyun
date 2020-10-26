<template>
    <div>
        <section class="container">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                <el-breadcrumb-item>酒店</el-breadcrumb-item>
                <el-breadcrumb-item>{{urlCityName}}酒店预订</el-breadcrumb-item>
            </el-breadcrumb>

            <!-- 表单查询 -->
            <HotelQuery />

            <!-- 区域均价 -->
            <el-row type="flex" class="sights" style="height:260px">
                <!-- 左边内容 -->
                <el-col :span="14" style="background:#fff">
                    <el-row type="flex" class="regional">
                        <el-col :span="3">区域:</el-col>
                        <el-col :span="19" class="cities">
                            <el-tag class="citie" v-for="citie in cities" :hit="true" :key="citie.id" effect="plain">{{ citie.name }}</el-tag>
                            
                        </el-col>
                    </el-row>
                    <el-row class="price">
                        <el-col :span="3">均价:</el-col>
 
                        <el-popover
                          placement="top"
                          width="200"
                          trigger="click"
                          >
                              <div class="popbox">等级评定是针对房价，设施和服务等各方面水平的综合评估</div>
                            <el-col slot="reference" :span="30" class="dishini"> <i class="iconfont icon-dishini-" v-for="(item,index) in 3" :key="index"></i>¥332 </el-col>
                        </el-popover>

                        <el-popover
                          placement="top"
                          width="200"
                          trigger="click"
                          >
                              <div class="popbox">等级评定是针对房价，设施和服务等各方面水平的综合评估</div>
                            <el-col slot="reference" :span="30" class="dishini"> <i class="iconfont icon-dishini-" v-for="(item,index) in 4" :key="index"></i>¥521 </el-col>
                        </el-popover>

                        <el-popover
                          placement="top"
                          width="200"
                          trigger="click"
                          >
                              <div class="popbox">等级评定是针对房价，设施和服务等各方面水平的综合评估</div>
                            <el-col slot="reference" :span="30" class="dishini"> <i class="iconfont icon-dishini-" v-for="(item,index) in 5" :key="index"></i>¥768 </el-col>
                        </el-popover>

                        
                        
                    </el-row>
                </el-col>

                <!-- 高德地图 -->
                <el-col :span="10" style="background:#eee">
                    <div id="container" style="height:260px;width:420px"></div>
                </el-col>
            </el-row>

            <!-- 条件筛选 -->
            <HotelFilter @getHotelList="getHotelList"/>

            <!-- 酒店列表 -->
            <el-pagination
              background
              layout="prev, pager, next"
              :total="hotelList.total"
              @current-change="currentChange"
              :current-page="currentPage">
              
            </el-pagination>
            <div v-if="hotelList.data.length != 0" >
                <HotelList v-loading="loading" :hotel="hotel" v-for="hotel in hotelList.data" :key="hotel.id"/>
            </div>

            <div v-else>
                找不到符合要求的酒店了😥
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{
            cityId:'',
            loading:false,
            hotelList:{
                data:[]
            },
            currentPage:1,
            // 获取的条数
            limit:10,
            hotelOption:{},
            urlCityName: '',
            cities:[]
        }
    },
    async mounted() {
        // 获取url传过来的参数
        this.urlCityName = this.$route.query.cityName

        // 高德地图
        window.onLoad = () => {
            var map = new AMap.Map('container', {
                zoom: 11, // 放大级别
                center: [116.397428, 39.90923], // 中心点坐标
                viewMode: '3D', // 使用3D视图
            });
        }
        var key = "d5192dea5a16faf3b3afdd0fb562d794"; // 你的key
        var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);

        if(this.$route.query.cityName){
            // 获取传递过来的城市的id
            await this.$axios({
                url:'/cities?name='+this.$route.query.cityName
            }).then(res =>{
                // console.log(res.data.data[0].id);
                this.cityId = res.data.data[0].id
            })
        }else{
            this.$router.push('/')
        }
        this.getHotelList()

        // 获取城市区域景点
        this.$axios({
            url:`/cities?name=${this.$route.query.cityName}`
        }).then(res =>{
            console.log(res.data.data[0].scenics);
            this.cities = res.data.data[0].scenics
        })
    },
    methods:{
        // 获取酒店列表
        async getHotelList(hotelOption){
            this.loading = true
            let str = "";
            if(hotelOption){
                // 将获取过来的数据进行拼接
                var keys = Object.keys(hotelOption); // ["city", "price_lt", "hotellevel", "hoteltype"]
                keys.forEach(Option => {
                    if(Array.isArray(hotelOption[Option])){
                        // hotelOption[Option] => [1,2]
                        hotelOption[Option].forEach(item => {
                            str += `${Option}=${item}&`;
                        })
                    }else{
                        str += `${Option}=${hotelOption[Option]}&`;
                    }
                })

                // 定位到第一页显示
                this.currentPage = 1
            }
            str += `_limit=${this.limit}&city=${this.cityId}`
            console.log(str)
            
            const HotelList = await this.$axios({
                url: `/hotels?${str}`,
            })
            console.log(HotelList);
            HotelList.data.data = HotelList.data.data.slice((this.currentPage-1)*10,(this.currentPage)*10)
            this.hotelList = HotelList.data
            this.loading = false
        },

        // 当前页发生变化
        currentChange(newCurrent){
            // console.log(newCurrent);
            // 先根据页数获取酒店的条数
            this.currentPage = newCurrent
            this.limit = newCurrent * 10
            this.getHotelList()
        },
    }
};
</script>

<style lang="less" scoped>
.container {
    width: 1000px;
    margin: 0 auto;
    .breadcrumb {
        padding: 20px 0px;
    }
    .sights {
        font-size: 14px;
        // color: #666;
        margin-bottom: 20px;
        .cities {
            max-height: 200px;
            overflow-y: auto;
            position: relative;

            &::-webkit-scrollbar {
                position: absolute;
                width: 10px;
                padding-right: -20px;  
                right: -20px;
                /*height: 4px;*/
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: rgba(0,0,0,0.2);
            }

            &::-webkit-scrollbar-track {
                border-radius: 0;
                background: rgba(0,0,0,0.1);
            }

            .citie {
                margin: 4px;
            }
        }
        .price {
            margin-top: 20px;

            .dishini {
                margin-right: 14px;

                .icon-dishini- {
                    color: #ff9900;
                }
            }
        }
    }
}
.filter-list {
    margin-bottom: 10px !important;
}
.popbox{
    font-size: 12px;
}
</style>