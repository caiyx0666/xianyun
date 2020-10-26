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
                <el-col :span="14" style="background:#ccc">
                    <el-row type="flex" class="regional">
                        <el-col :span="3">区域:</el-col>
                        <el-col :span="19">
                            <ul>
                                <li>全部</li>
                                <li>人民广场</li>
                                <li>城桥镇</li>
                                <li>奉贤区</li>
                                <li>人民广场</li>
                                <li>城桥镇</li>
                                <li>奉贤区</li>
                                <li>人民广场</li>
                                <li>城桥镇</li>
                                <li>奉贤区</li>
                                <li>人民广场</li>
                                <li>城桥镇</li>
                                <li>奉贤区</li>
                                <li>人民广场</li>
                                <li>城桥镇</li>
                                <li>奉贤区</li>
                                <li>人民广场</li>
                                <li>城桥镇</li>
                                <li>奉贤区</li>
                                <li>人民广场</li>
                                <li>城桥镇</li>
                                <li>奉贤区</li>
                                <li>人民广场</li>
                                <li>城桥镇</li>
                                <li>奉贤区</li>
                            </ul>
                        </el-col>
                    </el-row>
                    <el-row class="price">
                        <el-col :span="3">均价:</el-col>
                        <el-col :span="21">¥332 ¥521 ¥768</el-col>
                    </el-row>
                </el-col>
                <!-- 高德地图 -->
                <el-col :span="10" style="background:#eee">
                    <div id="container" style="height:260px;width:420px"></div>
                </el-col>
            </el-row>

            <!-- 条件筛选 -->
            <HotelFilter />
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            urlCityName: '',
        }
    },
    mounted() {
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
        color: #666;
        margin-bottom: 20px;
        .regional {
            ul li {
                &:first-child {
                    font-size: 14px;
                    padding: 2px 5px;
                    border-radius: 5px;
                    color: #eee;
                    background-color: #ffb200;
                }
                float: left;
                padding: 2px 5px;
                margin: 0px 2px 3px 0px;
            }
        }
        .price {
            margin-top: 20px;
        }
    }
}
</style>