<template>
<div class="search-form">
        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span
                v-for="(item, index) in tabs"
                :key="index"
                @click="handleSearchTab(index)"
                :class="{ active: index === currentTab }"
            >
                <i :class="item.icon"></i>{{ item.name }}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                    :fetch-suggestions="queryDepartSearch"
                    placeholder="请搜索出发城市"
                    @select="handleDepartSelect"
                    class="el-autocomplete"
                    v-model="form.departCity"
                    :trigger-on-focus="false"
                    :highlight-first-item="true"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                    :fetch-suggestions="queryDestSearch"
                    placeholder="请搜索到达城市"
                    @select="handleDestSelect"
                    class="el-autocomplete"
                    v-model="form.destCity"
                    :trigger-on-focus="false"
                    :highlight-first-item="true"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker
                    type="date"
                    placeholder="请选择日期"
                    style="width: 100%"
                    @change="handleDate"
                    v-model="form.departDate"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item label="">
                <el-button
                    style="width: 100%"
                    type="primary"
                    icon="el-icon-search"
                    @click="handleSubmit"
                >
                    搜索
                </el-button>
            </el-form-item>

            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>

        </el-form>
    </div>
</template>

<script>
import moment from "moment";
export default {
   data(){
       return{
           tabs:[
               {
                   name:'单程',
               },{
                   name:'往返'
               }
           ],
           currentTab:0,
           // 管理全部数据
           form: {
               departCity: '',
               departCode: '',
               destCity: '',
               destCode: '',
               departDate: ''
           }
       }
   },
   methods:{
        // 切换 tab
        handleSearchTab(index) {
                // 如果点击的 index == 1
                // 就是点击了往返，弹出一个提示框即可
                if(index == 1){
                    this.$confirm('目前不支持往返，敬请期待','提示',{
                        confirmButtonText:'知道了',
                        showCancelButton:false,
                        type:"warning"
                    })
                }
        },

        loadCityList(queryString, showList) {
            // 第一个参数：当前输入的值
            // 第二个参数：输出列表的回调
            // 通过服务器获取数据
            this.$axios({
                url:'/airs/city',
                params:{
                    name:queryString
                }
            }).then(res =>{
                // console.log(res.data);
                // 获取到的数据缺少 value
                // 对获取到的数据进行改造
                const data = res.data.data.filter(city =>{
                    return city.sort
                }).map(city =>{
                    return{
                        ...city,
                        // 处理参数，将 '市' 字去掉
                        value:city.name.replace(/市$/,'')
                        
                    }
                })
                // console.log(data);
                showList(data)
            })
        },

        // 显示搜索建议
        queryDepartSearch(queryString,showList) {
            this.loadCityList(queryString, showList)
        },
        queryDestSearch(queryString,showList) {
           this.loadCityList(queryString, showList)
        },
        // 搜索建议选择回调函数
        handleDepartSelect(item) {
            console.log(item);
            this.form.departCode = item.sort
        },
        handleDestSelect(item) {
            this.form.destCode = item.sort
        },
        // 提交搜索
        handleSubmit() {
            // 跳转到机票列表页
            for(let city in this.form){
                if(!this.form[city]){
                    this.$message({
                      message: '请将信息填写完整',
                      type: 'warning'
                    });
                    return
                }
            }
            this.$router.push({
                path: '/air/flights',
                query:this.form
            })
        },
        // 选择日期
        handleDate(date) {
            // console.log(date)
            // 默认可以得到用户选中的日期对象
            // 可以修改完值之后再赋值给 this.form.departDate
            // 可以将日期对象传入 moment 函数改造成 moment.js 的对象
            const dateStr = moment(date).format('YYYY-MM-DD')
            console.log(dateStr);
            this.form.departDate = dateStr
        },
        // 交换城市
        handleReverse(){
            const oldDepartCity = this.form.departCity
            const oldDepartCode = this.form.departCode

            this.form.departCity = this.form.destCity
            this.form.departCode = this.form.destCode

            this.form.destCity = oldDepartCity
            this.form.destCode = oldDepartCode
        }
   }
}
</script>

<style lang="less" scoped>
    .search-form {
        border: 1px #ddd solid;
        border-top: none;
        width: 360px;
        height: 350px;
        box-sizing: border-box;
    }

    .search-tab {
        span {
            display: block;
            flex: 1;
            text-align: center;
            height: 48px;
            line-height: 42px;
            box-sizing: border-box;
            border-top: 3px #eee solid;
            background: #eee;
        }

        .active {
            border-top-color: orange;
            background: #fff;
        }

        i {
            margin-right: 5px;
            font-size: 18px;

            &:first-child {
                font-size: 16px;
            }
        }
    }

    .search-form-content {
        padding: 15px 50px 15px 15px;
        position: relative;

        .el-autocomplete {
            width: 100%;
        }
    }

    .reverse {
        position: absolute;
        top: 35px;
        right: 15px;

        &:after,
        &:before {
            display: block;
            content: "";
            position: absolute;
            left: -35px;
            width: 25px;
            height: 1px;
            background: #ccc;
        }

        &:after {
            top: 0;
        }

        &:before {
            top: 60px;
        }

        span {
            display: block;
            position: absolute;
            top: 20px;
            right: 0;
            font-size: 12px;
            background: #999;
            color: #fff;
            width: 20px;
            height: 20px;
            line-height: 18px;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;

            &:after,
            &:before {
                display: block;
                content: "";
                position: absolute;
                left: 10px;
                width: 1px;
                height: 20px;
                background: #ccc;
            }

            &:after {
                top: -20px;
            }

            &:before {
                top: 20px;
            }
        }
    }
</style>