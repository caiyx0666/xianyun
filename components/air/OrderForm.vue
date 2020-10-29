<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form
                ref="usersForm"
                class="member-info"
                :model="{
                    users: users,
                }"
            >
                <div
                    class="member-info-item"
                    v-for="(user, index) in users"
                    :key="user.uid"
                >
                    <!-- 遍历生成的 form-item, 可以直接在表单项上声明规则 -->
                    <!-- :prop="users[index].username"
                    prop="users[0].username"
                    prop="users[1].username"
                    prop="users[2].username" -->
                    <el-form-item
                        label="乘机人姓名"
                        :prop="`users[${index}].username`"
                        :rules="[
                            {
                                required: true,
                                message: '请输入数据',
                                trigger: 'blur',
                            },
                        ]"
                    >
                        <el-input
                            v-model="user.username"
                            placeholder="姓名"
                            class="input-with-select"
                        >
                        </el-input>
                    </el-form-item>

                    <el-form-item
                        label="身份证号码"
                        :prop="`users[${index}].id`"
                        :rules="[
                            {
                                required: true,
                                message: '请输入数据',
                                trigger: 'blur',
                            },
                        ]"
                    >
                        <el-input
                            v-model="user.id"
                            placeholder="证件号码"
                            class="input-with-select"
                        >
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)"
                        >-</span
                    >
                </div>
            </el-form>

            <el-button class="add-member" type="primary" @click="handleAddUsers"
                >添加乘机人</el-button
            >
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <el-checkbox-group v-model="insurances">
                    <div
                        class="insurance-item"
                        v-for="item in data.insurances"
                        :key="item.id"
                    >
                        <el-checkbox :label="item.id" border>
                            {{
                                `${item.type}: ￥${item.price}/份 x ${users.length} 最高赔付 ${item.compensation}`
                            }}
                        </el-checkbox>
                    </div>
                </el-checkbox-group>
            </div>
            <h2>发票</h2>
            <div>
                <el-checkbox v-model="invoice">需要发票</el-checkbox>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form
                    label-width="80px"
                    :model="{
                        contactName,
                        contactPhone,
                        captcha,
                    }"
                    :rules="contactRules"
                    ref="contactForm"
                >
                    <el-form-item label="姓名" prop="contactName">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="contactPhone">
                        <el-input
                            placeholder="请输入内容"
                            v-model="contactPhone"
                        >
                            <template slot="append">
                                <el-button @click="handleSendCaptcha"
                                    >发送验证码</el-button
                                >
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码" prop="captcha">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>
                <el-button 
                    type="warning" 
                    class="submit" 
                    @click="handleSubmit"
                    v-if="$store.state.user.userInfo.token"
                >
                    提交订单
                </el-button>
                <div class="container" v-else>
                    <!-- 主要内容 -->
                    <el-row
                        type="flex"
                        justify="center"
                        align="middle"
                        class="main"
                    >
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
                            <LoginForm v-if="currentTab == 0" />

                            <!-- 注册功能组件 -->
                            <RegisterForm v-if="currentTab == 1" />
                        </div>
                    </el-row>
                </div>
            </div>
        </div>
        <div style="display: none">
            {{ totalPrice }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: Object,
        },
        data() {
            return {
                currentTab: 0,
                // memberRules: {
                //     // 遍历生成的字段这样写规则不靠谱
                //     'users[0].username': [],
                //     'users[0].id': [],
                //     'users[1].username': [],
                //     'users[1].id': [],
                //     'users[2].username': [],
                //     'users[2].id': [],
                // },
                contactRules: {
                    contactName: [
                        {
                            required: true,
                            message: "请输入数据",
                            trigger: "blur",
                        },
                    ],
                    contactPhone: [
                        {
                            required: true,
                            message: "请输入数据",
                            trigger: "blur",
                        },
                    ],
                    captcha: [
                        {
                            required: true,
                            message: "请输入数据",
                            trigger: "blur",
                        },
                    ],
                },
                users: [
                    // 这里用来存放所有的乘机人
                    // 每个对象都是一个乘机人数据对象
                    {
                        // 用户名
                        username: "哈哈",
                        // 身份证号
                        id: "450433222222222222",
                        uid: new Date().getTime(),
                    },
                ],
                insurances: [],
                contactName: "呵呵",
                contactPhone: "13847474837",
                captcha: "000000",
                invoice: false,
            };
        },
        computed: {
            totalPrice() {
                const ticketPrice = this.data.base_price * this.users.length;
                let insurancePrice = 0;

                // 现在选中的checkList 应该是 this.insurances 格式类似 [1,2]
                // 遍历里面的每个被选中的id
                this.insurances.forEach((id) => {
                    // 遍历到的每个元素都是 id 如 1 或者 2
                    // 需要在整个保险数据中找出对应id的价格
                    // 保险对象在 this.data.insurances
                    // 结构大概是一个数组包裹保险数据对象
                    // [
                    //     {
                    //         id: 1,
                    //         price: 998
                    //     }
                    // ]
                    // 遍历这个数组, 找出对应 id 的价格
                    // 可以根据选中保险 id 计算出当前保险应该付多少钱的函数
                    insurancePrice += this.getInsurancePrice(id);
                });

                // this.insurances.forEach(element => {
                //     // [1,2]
                //     // 遍历选中的保险, 这里选中时的储存都是保险id
                //     console.log(element);
                //     // 拿到了id以后应该根据这个id获取保险的价格
                //     this.data.insurances.forEach(insurance => {
                //         if (insurance.id == element) {
                //             // 拿到了当前选中 id 保险的价格,
                //             // 应该乘以人数, 添加到总价上
                //             insurancePrice += insurance.price * this.users.length
                //         }
                //     });
                // });

                console.log(insurancePrice);
                const totalPrice = ticketPrice + insurancePrice;
                // 得出了总价
                this.$emit("setTotalPrice", totalPrice);
                console.log("计算总价" + totalPrice);
                return totalPrice;
            },
        },

        methods: {
            handleChangeTab(index) {
                this.currentTab = index;
            },
            getInsurancePrice(id) {
                // 可以根据选中保险 id 计算出当前保险应该付多少钱的函数
                let res = 0;
                this.data.insurances.forEach((element) => {
                    if (id == element.id) {
                        res = element.price * this.users.length;
                    }
                });
                return res;
            },
            // 异步函数写成同步的样子
            async handleSubmit() {
                console.log("点击按钮提交");
                // 像 JSON.parse 一样 Promise 也自带一些方法
                // 有一个 all 的方法, 可以通过传入一个由 promise 组成的数组
                // 一起执行, 等到两个都完成以后, 才会返回一个对应传入数组的结果组成的数组
                // Promise.all([this.$refs.usersForm.validate(),this.$refs.contactForm.validate()]).then(res=>{
                //     if(res[0] && res[1]) {
                //         console.log('发送请求');
                //     }
                // })

                const [validUsers, validContact] = await Promise.all([
                    this.$refs.usersForm.validate(),
                    this.$refs.contactForm.validate(),
                ]);
                if (validUsers && validContact) {
                    this.sendRequest();
                }
            },
            sendRequest() {
                console.log(this.users);
                console.log(this.insurances);
                // 开始拼接数据
                const data = {
                    users: this.users,
                    insurances: this.insurances,
                    contactName: this.contactName,
                    contactPhone: this.contactPhone,
                    invoice: this.invoice,
                    seat_xid: this.$route.query.seat_xid,
                    air: this.$route.query.id,
                    captcha: this.captcha,
                };

                this.$axios({
                    method: "post",
                    url: "/airorders",
                    headers: {
                        Authorization:
                            "Bearer " + this.$store.state.user.userInfo.token,
                    },
                    data,
                }).then((res) => {
                    console.log(res.data);
                    // 下单成功, 跳转到订单页面
                    if (res.data.message = '订单提交成功') {
                        this.$router.push('/air/pay?id='+res.data.data.id)
                    }
                });
            },
            handleSendCaptcha() {
                if (!this.contactPhone) {
                    this.$message.error("请先输入手机号");
                    return;
                }
                // 添加合法校验
                const regexp = /^1[3456789]\d{9}$/;
                if (!regexp.test(this.contactPhone)) {
                    this.$message.error("手机号不合法");
                    return;
                }

                this.$axios({
                    method: "post",
                    url: "/captchas",
                    data: {
                        tel: this.contactPhone,
                    },
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.code) {
                        this.$message.success("发送成功：" + res.data.code);
                    }
                });
            },
            handleAddUsers() {
                this.users.push({
                    // 用户名
                    username: "",
                    // 身份证号
                    id: "",
                    uid: new Date().getTime(),
                });
            },
            handleDeleteUser(index) {
                this.users.splice(index, 1);
            },
        },
    };
</script>


<style scoped lang="less">
    .air-column {
        border-bottom: 1px #ddd dashed;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .air-column h2 {
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select {
        width: 590px;
    }

    .input-with-select /deep/ .el-input-group__prepend {
        background-color: #fff;
    }
    // .member-info /deep/ .el-form-item {
    //     margin-bottom: 0;
    // }

    .member-info-item {
        border-bottom: 1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child {
            .delete-user {
                display: none;
            }
        }
    }

    .add-member {
        margin-top: 20px;
    }

    .delete-user {
        display: block;
        background: #ddd;
        width: 16px;
        height: 16px;
        font-size: 14px;
        text-align: center;
        line-height: 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 50px;
        position: absolute;
        right: -30px;
        top: 50%;
    }

    .insurance {
        > div {
            margin-top: 10px;
        }
    }

    .insurance-item {
        margin-bottom: 20px;
    }

    .contact {
        /deep/ .el-input {
            width: 50%;
        }
    }

    .submit {
        margin: 50px auto;
        display: block;
        width: 250px;
        height: 50px;
    }

    .container {
        .main {
            height: 100%;
            margin: 0 auto;
            position: relative;

            .form-wrapper {
                width: 400px;
                margin: 0 auto;
                background: #fff;
                box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
                overflow: hidden;

                /deep/ .el-input {
                    width: 100% !important;
                }

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
</style>