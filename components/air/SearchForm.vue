<template>
<div class="search-form">
        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span
                v-for="(item, index) in tabs"
                :key="index"
                @click="handleSearchTab(item, index)"
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
        </el-form>
    </div>
</template>

<script>
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
        handleSearchTab() {},
        // 显示搜索建议
        queryDepartSearch(queryString,showList) {
            // 第一个参数：当前输入的值
            // 第二个参数：输出列表的回调
            if(!queryString){
                showList([{
                    value:'请输入关键字'
                }])
                return
            }
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
                const data = res.data.data.map(city =>{
                    return{
                        ...city,
                        value:city.name
                    }
                })
                // console.log(data);
                showList(data)
            })
        },
        queryDestSearch(queryString,showList) {
            // 第一个参数：当前输入的值
            // 第二个参数：输出列表的回调
            if(!queryString){
                showList([{
                    value:'请输入关键字'
                }])
                return
            }
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
                const data = res.data.data.map(city =>{
                    return{
                        ...city,
                        value:city.name
                    }
                })
                // console.log(data);
                showList(data)
            })
        },
        // 搜索建议选择回调函数
        handleDepartSelect(item) {
            console.log(item);
            this.form.departCode = item.sort
        },
        handleDestSelect(item) {
            this.form.departCode = item.sort
        },
        // 提交搜索
        handleSubmit() {
            console.log(this.form);
        },
        // 选择日期
        handleDate(date) {
            console.log(date);
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