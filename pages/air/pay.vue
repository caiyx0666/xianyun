<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{ payData.price }}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row
                    type="flex"
                    justify="space-between"
                    align="middle"
                    class="pay-qrcode"
                >
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas ref="qrcodeDom"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img
                            src="http://157.122.54.189:9093/images/wx-sweep2.jpg"
                            alt=""
                        />
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import QRcode from "qrcode";

    export default {
        data() {
            return {
                timerId: null,
                payData: {
                    price: "***",
                },
            };
        },
        destroyed() {
            // 在组件(页面)跳出时, 记得把当前轮询的定时器清理掉
            // 创建时将id存起来
            // let timerId = setTimeout(() => {}, timeout);
            // 之后清理即可
            // 因为在创建时生成的 id 这里没法直接拿
            // 通过 data 缓存定时器id
            console.log('清理定时器');
            clearTimeout(this.timerId);
        },
        watch: {
            "$store.state.user.userInfo.token": {
                handler() {
                    if (this.$store.state.user.userInfo.token) {
                        this.$axios({
                            url: "/airorders/" + this.$route.query.id,
                            headers: {
                                Authorization:
                                    "Bearer " +
                                    this.$store.state.user.userInfo.token,
                            },
                        }).then((res) => {
                            console.log(res.data);
                            this.payData = res.data;
                            // 当前获取到支付数据
                            // 其中二维码连接在 res.data.payInfo.code_url
                            // 需要两个东西 字符串res.data.payInfo.code_url
                            // 另外一个是存放二维码的 dom this.$refs.qrcodeDom
                            QRcode.toCanvas(
                                this.$refs.qrcodeDom,
                                res.data.payInfo.code_url,
                                {
                                    width: 200,
                                    color: {
                                        dark: "#000088",
                                    },
                                }
                            );

                            // 二维码生成完毕, 开始轮询支付状态
                            // 可以直接写, 也可以封装成一个函数
                            this.checkPayState();
                        });
                    }
                },
                immediate: true,
            },
        },
        methods: {
            checkPayState() {
                this.$axios({
                    method: "post",
                    url: "/airorders/checkpay",
                    headers: {
                        Authorization:
                            "Bearer " + this.$store.state.user.userInfo.token,
                    },
                    data: {
                        id: this.payData.id,
                        nonce_str: this.payData.price,
                        out_trade_no: this.payData.payInfo.order_no,
                    },
                }).then((res) => {
                    console.log(res.data);
                    // 拓展, 如何处理一堆不确定的状态
                    // 不同状态用不同的逻辑实现, 这里用console 模拟
                    // 最简单就是if判断

                    this.showPayState(res.data.trade_state);

                    if (res.data.trade_state == "SUCCESS") {
                        this.$message.success("感谢巨款 0.01 元");
                    } else {
                        this.timerId = setTimeout(() => {
                            this.checkPayState();
                        }, 3000);
                    }
                });
            },
            showPayState(state) {
                const stateOption = {
                    SUCCESS: "支付成功",
                    REFUND: "转入退款",
                    NOTPAY: "未支付",
                    CLOSED: "已关闭",
                    REVOKED: "已撤销",
                    USERPAYING: "用户支付中",
                    PAYERROR: "支付失败",
                };
                console.log("这里是处理各种状态的方法");
                console.log(stateOption[state]);
            },
        },
    };
</script>

<style scoped lang="less">
    .container {
        background: #f5f5f5;
        padding: 30px 0;

        .main {
            width: 1000px;
            margin: 0 auto;

            .pay-title {
                text-align: right;
                span {
                    font-size: 28px;
                    color: orangered;
                }
            }

            .pay-main {
                background: #fff;
                margin-top: 10px;
                border-top: 5px orange solid;
                padding: 30px;

                h4 {
                    font-size: 28px;
                    font-weight: normal;
                    margin-bottom: 10px;
                }

                .pay-qrcode {
                    padding: 0 80px;
                }

                .qrcode {
                    border: 1px #ddd solid;
                    padding: 15px;
                    height: fit-content;

                    #qrcode-stage {
                        width: 200px;
                        height: 200px;
                        margin-bottom: 10px;
                    }

                    p {
                        line-height: 2;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>