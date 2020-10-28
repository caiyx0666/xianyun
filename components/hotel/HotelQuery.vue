<template>
    <div class="hotel-filter">
        <!-- 筛选表单 -->
        <el-row type="flex" class="filters-top" justify="space-between" align="middle" :gutter="10">

            <!-- 出发城市 -->
            <el-col :span="6">
                <el-autocomplete
                  v-model="formCityName"
                  :Lhighlight-first-item="true"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="切换城市"
                  @select="SelectCity"
                  :trigger-on-focus="false"
                  :select-when-unmatched="true"
                ></el-autocomplete>
            </el-col>

            <!-- 日期选择器 -->
            <el-col :span="10">
                <div class="block">
                  <el-date-picker
                    v-model="arrDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
            </el-col>

            <!--  -->
            <el-col :span="8">
                <!-- 弹出框 -->
                <el-popover :width="310" placement="bottom" v-model="visible" :offset="35">
                    <el-row type="flex" align="middle" class="tool" :gutter="10">
                        <el-col :span="10">
                            <span>每间</span>
                        </el-col>
                        <!-- 成人 -->
                        <el-col :span="7" class="adult">
                            <el-select v-model="adultValue" size="mini" placeholder="">
                                <el-option v-for="item in 7" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                        <!-- 儿童 -->
                        <el-col :span="7">
                            <el-select v-model="kidValue" size="mini" placeholder="" class="kid">
                                <el-option v-for="item in 4 " :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <div style="text-align: right; padding-top: 10px;border-top:1px solid #eee;margin-top:10px">
                        <el-button type="primary" size="mini" @click="headleClick">确定</el-button>
                    </div>
                    <el-input v-model="peopleNumber" slot="reference" placeholder="人数未定" suffix-icon="el-icon-user"></el-input>
                </el-popover>
            </el-col>
            <!-- 搜索按钮 -->
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-search">查看价格</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            // 出发地
            formCityName:'',
            // 出发时间
            arrDate:[],
            // 人数
            peopleNumber:'',
            // 成人数
            adultValue: '',
            // 儿童数
            kidValue: '',
            pickerOptions:{
                // 禁用日期
                disabledDate(disDate){
                    return disDate.getTime() <= (Date.now()-86400000)
                },
            }

        }
    },
    methods:{
        // 选中搜索建议回调函数
        SelectCity(item){
            // 选中时可以拿到选中的那个数据对象
            if(!item){
                let item = new Object()
                item.name = this.formCityName
                // const item = {'name': this.formCityName}
            }
            this.$axios({
                url:'/cities?name=' + this.formCityName
            }).then(res => {
                if(!res.data.data.length){
                    this.$message({
                        showClose: true,
                        message: `搜索不到当前城市`,
                        type: 'error'
                    });
                    return
                }
                const city = res.data.data[0].id
                let item = {}
                item.name = this.formCityName
                this.$emit('getHotelList',{city,'cityName': item.name})
            }).catch(err => {
                console.log(err);
            })
            
            
        },

        // 显示建议列表函数，在输入框中输入时触发 
        querySearchAsync(queryString , showList){
            // 判断是否存在数据
            if (!queryString) {
                showList([
                    {
                        value: "请输入关键字",
                    },
                ]);
                return;
            }
            // 远程服务器获取城市列表
            this.$axios({
                url: "/airs/city",
                params: {
                    name: queryString,
                },
            }).then((res) => {
                // console.log(res.data);
                const data = res.data.data.map((city) => {
                    // 之前这里是直接获取数据, value 是以 name 作为基础
                    // 用来显示建议列表, 只需要在赋值 value 的时候,将 市字去掉即可
                    return {
                        ...city,
                        value: city.name,
                    };
                });
                showList(data);
            });
        },
        // 确认按钮点击事件
        headleClick(){
            this.peopleNumber = `${this.adultValue}成人 ${this.kidValue}儿童`
            this.visible = false
        }
    },
    watch:{
        arrDate(){
            // 将入住和离店时间的数组进行解构赋值
            const [enterTime,leftTime] = this.arrDate
            this.$emit('getHotelList',{enterTime,leftTime})
        }
    }
}
</script>

<style lang="less" scoped>
.adult {
    position: relative;
    &::after {
        content: "成人";
        position: absolute;
        top: 5px;
        font-size: 12px;
        color: #666;
        right: 35px;
    }
}
.kid {
    position: relative;
    &::after {
        content: "儿童";
        position: absolute;
        top: 5px;
        font-size: 12px;
        color: #666;
        right: 35px;
    }
}
.hotel-filter {
    margin-bottom: 20px;
}
</style>