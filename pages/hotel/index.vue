<template>
    <div>
        <section class="container">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                <el-breadcrumb-item>酒店</el-breadcrumb-item>
                <el-breadcrumb-item>{{urlCityName}}酒店预订</el-breadcrumb-item>
            </el-breadcrumb>

            <!-- 表单查询 -->
            <HotelQuery @getHotelList="getHotelList" />

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

                        <el-popover placement="top" width="200" trigger="click">
                            <div class="popbox">等级评定是针对房价，设施和服务等各方面水平的综合评估</div>
                            <el-col slot="reference" :span="30" class="dishini"> <i class="iconfont icon-dishini-" v-for="(item,index) in 3" :key="index"></i>¥332 </el-col>
                        </el-popover>

                        <el-popover placement="top" width="200" trigger="click">
                            <div class="popbox">等级评定是针对房价，设施和服务等各方面水平的综合评估</div>
                            <el-col slot="reference" :span="30" class="dishini"> <i class="iconfont icon-dishini-" v-for="(item,index) in 4" :key="index"></i>¥521 </el-col>
                        </el-popover>

                        <el-popover placement="top" width="200" trigger="click">
                            <div class="popbox">等级评定是针对房价，设施和服务等各方面水平的综合评估</div>
                            <el-col slot="reference" :span="30" class="dishini"> <i class="iconfont icon-dishini-" v-for="(item,index) in 5" :key="index"></i>¥768 </el-col>
                        </el-popover>

                    </el-row>
                </el-col>

                <!-- 高德地图 -->
                <el-col :span="10" style="background:#eee">
                    <div v-loading="isMap" id="container" style="height:260px;width:420px"></div>
                </el-col>
            </el-row>

            <!-- 条件筛选 -->
            <HotelFilter @getHotelList="getHotelList" />

            <!-- 酒店列表 -->
            <div v-if="hotelList.data.length" class="HotelList">
                <HotelList v-loading="loading" :hotel="hotel" v-for="hotel in hotelList.data" :key="hotel.id" />
            </div>

            <!-- 酒店列表分页组件 -->
            <el-pagination background layout="prev, pager, next" :total="hotelList.total" @current-change="currentChange" :current-page="currentPage" />

            <div class="hotelBox" v-loading="loading" v-if="isBox">
                <p v-if="!hotelList.data.length && isGo">找不到符合要求的酒店了😥</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isBox: true,
            isGo: false,
            isMap: true,
            cityId: '',
            loading: false,
            hotelList: {
                data: []
            },
            currentPage: 1,
            // 获取的条数
            limit: 10,
            hotelOption: {},
            urlCityName: '',
            cities: [],
            // 当前搜索页城市经纬度
            location: [],
            map: {},
            markers: []
        }
    },
    created() {
        
        this.loading = true
        this.isMap = true
    },

    async mounted() {
        window.onLoad = async () => {
            var map = new AMap.Map("container", {
                zoom: 7, // 级别
                center: [113.428072, 23.129259], // 中心点坐标
                viewMode: "3D", // 使用3D视图
                autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });
            this.map = map;
            if (!this.$route.query.cityName) {
                await this.getInfoCity()
            } else {
                // 获取城市名
                this.urlCityName = this.$route.query.cityName

                // 获取城市id
                await this.$axios({
                    url: '/cities?name=' + this.$route.query.cityName
                }).then(res => {
                    if (!res.data.data.length) {
                        this.$message({
                            showClose: true,
                            message: `搜索不到当前城市`,
                            type: 'error'
                        });
                        return
                    }
                    // console.log(res.data.data[0].id);
                    this.cityId = res.data.data[0].id
                })

                this.getHotelList()
                this.getScenice()
            }

        };

        var key = "d5192dea5a16faf3b3afdd0fb562d794"; // 你的key
        var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    },
    methods: {
        // 获取景点
        getScenice() {
            // 获取城市区域景点
            this.$axios({
                url: `/cities?name=${this.urlCityName}`
            }).then(res => {
                // console.log(res.data.data[0].scenics);
                this.cities = res.data.data[0].scenics
            })
        },

        // 获取酒店列表
        async getHotelList(hotelOption) {
            if(this.HotelList){
                this.isBox = false
            }
            this.loading = true
            // 用于地址栏显示
            let str = "";
            if (hotelOption) {
                console.log(hotelOption);
                // 将获取过来的数据进行拼接
                var keys = Object.keys(hotelOption); // ["city", "price_lt", "hotellevel", "hoteltype"]

                keys.forEach(Option => {
                    // 数据的格式是否为数组
                    if (Array.isArray(hotelOption[Option])) {
                        hotelOption[Option].forEach(item => {
                            str += `${Option}=${item}&`
                        })
                    } else {
                        // 判断传递过来的数值中有没有城市名字和城市id
                        if (Option == 'cityName') {
                            this.urlCityName = hotelOption[Option]

                            // 修改原有参数,而不跳转页面
                            this.$router.push({
                                path: this.$route.path,
                                query: Object.assign({}, this.$route.query, { cityName: this.urlCityName })
                            })

                            // 重新获取景点信息
                            this.getScenice()
                        } else if (Option == 'city') {
                            this.cityId = hotelOption[Option]
                        } else {
                            str += `${Option}=${hotelOption[Option]}&`;
                        }

                    }
                })
                // 定位到第一页显示
                this.currentPage = 1
            }
            // str += `_limit=${this.limit}`
            str += `city=${this.cityId}&_limit=${this.limit}`

            console.log(str);
            // 发送请求获取数据
            const HotelList = await this.$axios({
                url: `/hotels?${str}`,
            })

            HotelList.data.data = HotelList.data.data.slice((this.currentPage - 1) * 10, (this.currentPage) * 10)
            this.hotelList = HotelList.data
            this.loading = false
            if (!this.hotelList.data.length) {
                this.isGo = true
            } else {
                this.isBox = false
            }

            // 获取地图经纬度
            this.location = [];
            HotelList.data.data.forEach(item => {
                this.location.push({
                    x: item.location.latitude,
                    y: item.location.longitude,
                })
            })

            // 加载地图
            this.mapLoad()
        },

        // 当前页发生变化
        currentChange(newCurrent) {
            this.isBox = false
            // 移动到酒店列表的上方
            let HotelHeight = document.querySelector('.HotelList').offsetTop
            window.scrollTo({ 
                top: HotelHeight, 
                behavior: "smooth" 
            });
            // 先根据页数获取酒店的条数
            this.currentPage = newCurrent
            this.limit = newCurrent * 10
            this.getHotelList()
        },

        // 高德地图
        mapLoad() {
            this.map.remove(this.markers);
            this.markers = [];

            // 遍历-创建点实例
            this.location.forEach((item, index) => {
                var markerContent =
                    ""
                    +
                    '<div class="custom-content-marker">'
                    +
                    '<img src="https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png">'
                    +
                    `<div class="close-btn" onclick="clearMarker()">${index + 1}</div>`
                    +
                    '</div>';
                // console.log('markerContent', markerContent);
                var maker = new AMap.Marker({
                    content: markerContent,
                    position: [item.y, item.x],
                })
                this.markers.push(maker)
            })
            this.map.panTo([this.location[0].y, this.location[0].x])
            // 添加点
            this.map.add(this.markers)
            this.isMap = false
        },

        // 获取地图当前行政区
        async getInfoCity() {
            // 获取用户当前定位城市
            await this.map.getCity(async (info) => {
                // console.log(info);
                // 修改原有参数,而不跳转页面
                this.urlCityName = info.city

                // 获取城市id
                await this.$axios({
                    url: '/cities?name=' + this.urlCityName
                }).then(res => {
                    console.log(res);
                    if (!res.data.data.length) {
                        this.$message({
                            showClose: true,
                            message: `搜索不到当前城市`,
                            type: 'error'
                        });
                        return
                    }
                    // console.log(res.data.data[0].id);
                    this.cityId = res.data.data[0].id
                })

                this.$router.push({
                    path: this.$route.path,
                    query: Object.assign({}, this.$route.query, { cityName: this.urlCityName })
                })
                this.getHotelList()
                this.getScenice()
                this.$message({
                    showClose: true,
                    message: `当前定位城市 ${info.city}`,
                    type: 'success'
                });
            });
        }
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
                background: rgba(0, 0, 0, 0.2);
            }

            &::-webkit-scrollbar-track {
                border-radius: 0;
                background: rgba(0, 0, 0, 0.1);
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
.popbox {
    font-size: 12px;
}
/deep/.custom-content-marker {
    position: relative;
    width: 25px;
    height: 34px;
    // opacity: 0;
}
/deep/.custom-content-marker img {
    width: 100%;
    height: 100%;
}
/deep/.custom-content-marker .close-btn {
    position: absolute;
    top: 4px;
    right: 6px;
    width: 15px;
    height: 15px;
    font-size: 12px;
    background: #318ff4;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 15px;
    // box-shadow: -1px 1px 1px rgba(10, 10, 10, 0.2);
}
.hotelBox {
    text-align: center;
    height: 200px;
}
.el-pagination {
    margin: 20px 0;
    text-align: center;
}
.el-tag--plain.is-hit {
    border-color: #f8efd4;
}
.el-tag--plain {
    color: #f5a25d;
}
</style>