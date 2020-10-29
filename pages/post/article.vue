<template>
    <div class="content">
        <!-- 遮罩层 -->
        <div id="cover1"></div>
        <!-- 头部标题 -->
        <div class="right">
            <h2>发表新攻略</h2>
            <p>分享你的个人游记，让更多人看到哦！</p>
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            <!-- 富文本框 -->
            <div class="wenbenkuang">
                <client-only>
                    <VueEditor
                        v-model="form.content"
                        :useCustomImageHandler="true"
                        @image-added="imgUpload"
                    />
                </client-only>
            </div>
            <!-- 现在城市 -->
            <div class="city">
                <el-form
                    class="search-form-content"
                    ref="form"
                    label-width="80px"
                >
                    <el-form-item label="选择城市">
                        <!-- fetch-suggestions 返回输入建议的方法 -->
                        <!-- select 点击选中建议项时触发 -->
                        <el-autocomplete
                            :trigger-on-focus="false"
                            :highlight-first-item="true"
                            v-model="form.choiceCity"
                            :fetch-suggestions="queryDepartSearch"
                            placeholder="请搜索出发城市"
                            @select="handleDepartSelect"
                            class="el-autocomplete"
                        ></el-autocomplete>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 发布 | 保存 -->
            <div class="issued">
                <el-button type="primary" @click="Issued">发布</el-button>
                或者
                <a href="javascript:;" @click="save">保存到草稿</a>
            </div>
        </div>
        <!-- 草稿箱 -->
        <div class="left">
            <h3>草稿箱（{{ $store.state.draft.draftArticle.length }}）</h3>
            <div
                class="photo_kong"
                v-if="$store.state.draft.draftArticle.length == 0"
            >
                <span class="iconfont icon-kongzhuangtai1"></span>
                <span>空空如也!</span>
            </div>
            <ul
                :class="{
                    isShow:
                        $store.state.draft.draftArticle.length > 9
                            ? true
                            : false,
                }"
            >
                <li
                    v-for="(item, index) in $store.state.draft.draftArticle"
                    :key="index"
                >
                    <h4>{{ item.title }}</h4>
                    <div class="time">
                        <p>{{ saveData }}</p>
                        <div>
                            <span
                                class="el-icon-edit"
                                @click="compile(item)"
                            ></span>
                            <span
                                class="el-icon-delete"
                                @click="deletes(index)"
                            ></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 登录 | 注册 -->
        <div class="container" v-if="login">
            <!-- 主要内容 -->
            <el-row type="flex" justify="center" align="middle" class="main">
                <div class="form-wrapper">
                    <!-- 表单头部tab -->
                    <el-row type="flex" justify="center" class="tabs">
                        <span
                            :class="{ active: currentTab === index }"
                            v-for="(item, index) in [`登录`, `注册`]"
                            :key="index"
                            @click="handleChangeTab(index)"
                        >
                            {{ item }}
                        </span>
                    </el-row>

                    <!-- 登录功能组件 -->
                    <LoginForm v-if="currentTab == 0" @logins="Issued" />

                    <!-- 注册功能组件 -->
                    <RegisterForm v-if="currentTab == 1" />
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 时间
            saveData: "",
            // 城市名字
            choiceCode: "",
            currentTab: 0,
            login: false,
            form: {
                title: "",
                content: "",
                choiceCity: "",
            },
        };
    },
    created() {
        this.nowSaveDate();
    },
    methods: {
        // 封装一个保存草稿时间
        nowSaveDate() {
            var aData = new Date();
            console.log(aData); //Sun Oct 25 2020 09:41:29 GMT+0800 (中国标准时间)
            this.saveData =
                aData.getFullYear() +
                "-" +
                (aData.getMonth() + 1) +
                "-" +
                aData.getDate();
            // console.log(this.saveData); //2020-10-25
        },
        //保存
        save() {
            if (this.form.title.trim() == "") {
                this.$message.closeAll();
                return this.$message.warning("标题不能为空");
            }
            this.$store.commit("draft/addArticle", { ...this.form });
            this.$message.success("保存草稿成功");
            this.form.title = "";
            this.form.content = "";
            this.form.choiceCity = "";
        },
        // 删除
        deletes(index) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    this.$store.commit("draft/removeArticle", index);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        // 编辑
        compile(item) {
            // console.log("数据呢", item);
            this.form = {
                ...item,
            };
            this.$message.closeAll();
            this.$message.success("编辑!");
        },
        handleChangeTab(index) {
            this.currentTab = index;
        },
        // 选择城市
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
                const data = res.data.data.map((city) => {
                    // 之前这里是直接获取数据, value 是以 name 作为基础
                    return {
                        ...city,
                        value: city.name,
                    };
                });
                showList(data);
            });
        },
        // 显示搜索建议
        queryDepartSearch(queryString, showList) {
            this.loadCityList(queryString, showList);
        },
        // 搜索建议选择回调函数
        handleDepartSelect(item) {
            // 选中时可以拿到选中的那个数据对象
            this.choiceCode = item;
            // console.log(item);
        },

        // 富文本(图片处理)
        imgUpload(file, Editor, cursorLocation, resetUploader) {
            // console.log("图片处理");
            // console.log(file);
            let data = new FormData();
            data.append("files", file);
            this.$axios({
                url: "/upload",
                method: "post",
                data,
            }).then((res) => {
                console.log(res.data);
                const url = this.$axios.defaults.baseURL + res.data[0].url;
                Editor.insertEmbed(cursorLocation, "image", url);
                resetUploader();
            });
        },

        // 发布 文章
        Issued() {
            if (this.form.title.trim() == "") {
                this.$message.closeAll();
                return this.$message.warning("标题不能为空");
            }
            if (this.form.content.trim() == "") {
                this.$message.closeAll();
                return this.$message.warning("内容不能为空");
            }
            if (this.form.choiceCity.trim() == "") {
                this.$message.closeAll();
                return this.$message.warning("城市不能为空");
            }
            //判断 是否登录
            if (this.$store.state.user.userInfo.token) {
                this.login = false;
                // console.log(this.form);
                document.getElementById("cover1").classList.remove("cover");
                this.$axios({
                    method: "post",
                    url: "/posts",
                    headers: {
                        Authorization:
                            "Bearer " + this.$store.state.user.userInfo.token,
                    },
                    data: {
                        content: this.form.content,
                        title: this.form.title,
                        city: this.form.choiceCity,
                    },
                }).then((res) => {
                    console.log(res);
                    if (res.data.message == "新增成功") {
                        this.$message.success(res.data.message);
                        this.form.title = "";
                        this.form.content = "";
                        this.form.choiceCity = "";
                        this.$router.push("/post/");
                    }
                });
            } else {
                this.$message.warning("未登录,请登录");
                document.getElementById("cover1").classList.add("cover");
                this.login = true;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.content {
    display: flex;
    justify-content: center;
    .right {
        width: 750px;
        height: 790px;
        margin-top: 20px;
        h2 {
            font-weight: 400;
            padding: 10px 0;
        }
        p {
            font-size: 12px;
            color: #999;
            margin-bottom: 10px;
        }
        .wenbenkuang {
            height: 500px;
            margin: 20px 0;
            .quillWrapper {
                height: 400px;
            }
        }

        .issued {
            font-size: 14px;
        }
        a {
            color: orange;
            :hover {
                text-decoration: underline;
            }
        }
    }
    .left {
        width: 225px;
        height: 600px;
        border: 1px solid #dddddd;
        margin-top: 20px;
        margin-left: 25px;
        padding: 10px;
        .photo_kong {
            width: 100%;
            height: 250px;
            line-height: 250px;
            text-align: center;
            font-size: 40px;
            font-weight: 700;
            span {
                display: block;
                font-size: 25px;
                font-weight: 400;
                color: #ccc;
                margin-top: -60px;
            }
            span:nth-child(1) {
                font-size: 40px;
                font-weight: 400;
                color: #ccc;
            }
            span:nth-child(2) {
                font-weight: 400;
                color: #ccc;
                margin-top: -180px;
            }
        }
        .icon-kongzhuangtai1:before {
            color: #ccc;
        }

        li {
            margin: 10px 0;
            background-color: #faf7f7;
        }
        .time {
            display: flex;
            justify-content: space-between;
        }
        h4:hover,
        span:hover {
            cursor: pointer;
        }
    }
    .container {
        position: fixed;
        top: 50%;
        margin-top: -100px;
        z-index: 201;
        .main {
            width: 1000px;
            height: 100%;
            margin: 0 auto;
            position: relative;

            .form-wrapper {
                width: 400px;
                margin: 0 auto;
                background: #fff;
                box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
                overflow: hidden;

                .tabs {
                    span {
                        display: block;
                        width: 50%;
                        height: 50px;
                        box-sizing: border-box;
                        border-top: 2px #eee solid;
                        background: #eee;
                        line-height: 48px;
                        text-align: center;
                        cursor: pointer;
                        color: #666;

                        &.active {
                            color: orange;
                            border-top-color: orange;
                            background: #fff;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
    .isShow {
        height: 96%;
        width: 225px;
        overflow: auto;
        background: #eeeeee;
    }
    .cover {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 200;
    }
}
</style>