<template>
    <div class="container">
        <!-- 幻灯片 -->
        <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="(item, index) in banners" :key="index">
                <div class="banner-image" :style="`
                background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
                background-size:contain contain;
                `"></div>
            </el-carousel-item>
        </el-carousel>

        <!-- 搜索框 -->
        <div class="banner-content">
            <div class="search-bar">
                <!-- tab栏 -->
                <el-row type="flex" class="search-tab">
                    <span v-for="(item, index) in options" :key="index" :class="{ active: index === currentOption }" @click="handleOption(index)">
                        <i>{{ item.name }}</i>
                    </span>
                </el-row>

                <!-- 输入框 -->
                <el-row type="flex" align="middle" class="search-input">
                    <input v-model="searchValue" @keyup.enter="handleSearch" :placeholder="options[currentOption].placeholder" />
                    <i class="el-icon-search" @click="handleSearch"></i>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import { Message } from "element-ui";
export default {
    created() {
        this.$axios({
            url: "/scenics/banners",
        }).then((res) => {
            const { data } = res.data;
            this.banners = data;
        });
    },
    data() {
        return {
            banners: [],
            currentOption: 0,
            // 搜索内容
            searchValue: '',
            options: [
                {
                    name: "攻略",
                    placeholder: '搜索攻略',
                    pageUrl: '/post?city='
                },
                {
                    name: "酒店",
                    placeholder: '输入城市筛选酒店',
                    pageUrl: '/hotel?cityName='
                },
                {
                    name: "机票",
                    placeholder: '搜索机票',
                    pageUrl: '/air'
                },
            ],
        };
    },
    methods: {
        handleOption(index) {
            // 如果点击的机票, 不需要显示输入框而是直接跳转即可
            if (index == 2) {
                this.$router.push(this.options[2].pageUrl)
            } else {
                this.currentOption = index
            }
        },
        handleSearch() {
            // tab栏切换，定位到具体对象的
            const optionItem = this.options[this.currentOption]

            // 判断搜索为空或有空格时
            if (this.searchValue.replace(/[ ]/g, "").length == 0) return

            // 发送请求检验输入的城市是否合法
            setTimeout(() => {
                this.$axios({
                    url: '/cities?name=' + this.searchValue
                }).then(res => {
                    if (res.data.data.length == 0) {
                        Message.error('您输入的城市不存在')
                    }
                    return
                })
            }, 5000)

            // 判断输入的字段是否带有'市'字
            if (this.searchValue.indexOf('市') > -1) {
                // 跳转 带上搜索内容
                // 存在'市'，要去掉之后再跳转
                this.$router.push(optionItem.pageUrl + this.searchValue.replace('市',''))
            } else {
                // 不存在市就不用去掉，直接跳转
                this.$router.push(optionItem.pageUrl + this.searchValue)
            }
        },
        sendRequest() {

        }
    },
};
</script>

<style lang="less" scoped>
.container {
    min-width: 1000px;
    margin: 0 auto;
    position: relative;

    /deep/ .el-carousel__container {
        height: 700px;
    }

    .banner-image {
        width: 100%;
        height: 100%;
    }

    .banner-content {
        z-index: 9;
        width: 1000px;
        position: absolute;
        left: 50%;
        top: 45%;
        margin-left: -500px;
        border-top: 1px transparent solid;

        .search-bar {
            width: 552px;
            margin: 0 auto;
        }

        .search-tab {
            .active {
                i {
                    color: #333;
                }
                &::after {
                    background: #eee;
                }
            }

            span {
                width: 82px;
                height: 36px;
                display: block;
                position: relative;
                margin-right: 8px;
                cursor: pointer;

                i {
                    position: absolute;
                    z-index: 2;
                    display: block;
                    width: 100%;
                    height: 100%;
                    line-height: 30px;
                    text-align: center;
                    color: #fff;
                }

                &:after {
                    position: absolute;
                    left: 0;
                    top: 0;
                    display: block;
                    content: "";
                    width: 100%;
                    height: 100%;
                    border: 1px rgba(255, 255, 255, 0.2) solid;
                    border-bottom: none;

                    transform: scale(1.1, 1.3) perspective(0.7em)
                        rotateX(2.2deg);
                    transform-origin: bottom left;

                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 1px 2px 0 0;
                    box-sizing: border-box;
                }
            }
        }

        .search-input {
            width: 550px;
            height: 46px;
            background: #fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255, 255, 255, 0.2) solid;
            border-top: none;
            box-sizing: unset;

            input {
                flex: 1;
                height: 20px;
                padding: 13px 15px;
                outline: none;
                border: 0;
                font-size: 16px;
            }

            .el-icon-search {
                cursor: pointer;
                font-size: 22px;
                padding: 0 10px;
                font-weight: bold;
            }
        }
    }
}
</style>