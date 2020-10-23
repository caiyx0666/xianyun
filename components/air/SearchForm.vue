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
                    :trigger-on-focus="false"
                    :highlight-first-item="true"
                    v-model="form.departCity"
                    :fetch-suggestions="queryDepartSearch"
                    placeholder="请搜索出发城市"
                    @select="handleDepartSelect"
                    class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                    :highlight-first-item="true"
                    :trigger-on-focus="false"
                    v-model="form.destCity"
                    :fetch-suggestions="queryDestSearch"
                    placeholder="请搜索到达城市"
                    @select="handleDestSelect"
                    class="el-autocomplete"
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
        data() {
            return {
                tabs: [
                    {
                        name: "单程",
                    },
                    {
                        name: "往返",
                    },
                ],
                currentTab: 0,
                // 管理全部数据
                form: {
                    departCity: "",
                    departCode: "",
                    destCity: "",
                    destCode: "",
                    departDate: "",
                },
            };
        },
        methods: {
            // 切换 tab
            handleSearchTab(index) {
                // 只要判断 点击的 index == 1 
                // 就是点击了往返, 弹出一个提示框即可
                if (index == 1) {
                    this.$confirm('目前不支持往返, 敬请期待', '提示', {
                        confirmButtonText: '知道了',
                        showCancelButton: false,
                        type: 'warning'
                    })
                }
            },

            loadCityList(queryString, showList) {
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
                    console.log(res);
                    // 数据结果缺少了 value 需要自己补上
                    // let data = res.data.data.filter(city=>{
                    //     return city.sort
                    // })

                    // data = data.map((city) => {
                    //     return {
                    //         ...city,
                    //         value: city.name,
                    //     };
                    // });

                    const data = res.data.data.filter(city=>{
                        return city.sort
                    }).map((city) => {
                        // 之前这里是直接获取数据, value 是以 name 作为基础
                        // 用来显示建议列表, 只需要在赋值 value 的时候,将 市字去掉即可
                        return {
                            ...city,
                            value: city.name.replace('市', ''),
                        };
                    });
                    showList(data);
                });
            },
            // 显示搜索建议
            queryDepartSearch(queryString, showList) {
                this.loadCityList(queryString, showList)
            },
            queryDestSearch(queryString, showList) {
                this.loadCityList(queryString, showList)
            },
            // 搜索建议选择回调函数
            handleDepartSelect(item) {
                // 选中时可以拿到选中的那个数据对象
                console.log(item);
                this.form.departCode = item.sort;
            },
            handleDestSelect(item) {
                this.form.destCode = item.sort;
            },
            // 提交搜索
            handleSubmit() {
                console.log(this.form);
                // 带上当前的数据跳转到结果页面
                // this.$router('/air/flights?departCity=xxx')
                // 拼接会非常麻烦

                // 如果要从 url 上面获取问号参数
                // this.$route.query 问号参数获取
                // this.$route.params 动态路由参数
                // 其实在跳转的时候, 也能用query作为数据进行跳转
                // 将本来字符串变成对象即可

                // 在跳转搜索之前, 应该将当前的搜索数据
                // 存放到 vuex 里面作为 历史记录
                // 调用 mutation
                this.$store.commit('history/addHistory', this.form)

                this.$router.push({
                    path: '/air/flights',
                    query: this.form
                })
            },

            // 选择日期
            handleDate(date) {
                // 默认可以得到用户选中的日期对象
                // 可以修改完值之后赋值给 this.form.departDate
                // 可以日期对象传入 moment 函数里面改造成 moment.js 的对象
                const dateStr = moment(date).format('YYYY-MM-DD')
                console.log(dateStr);
                this.form.departDate = dateStr
            },
            handleReverse() {
                // 在这里应该调换触发和到达城市
                const oldDestCity = this.form.destCity
                const oldDestCode = this.form.destCode

                this.form.destCity = this.form.departCity
                this.form.destCode = this.form.departCode

                this.form.departCity = oldDestCity
                this.form.departCode = oldDestCode
            }
        },
    };
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