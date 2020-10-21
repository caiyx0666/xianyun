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
                        <!-- canvas标签就是一个画布 -->
                        <canvas id="qrcode-stage" ref="qrcodeDom"></canvas>
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
import QRcode from 'qrcode'
    export default {
        // created 不能保证 token 的存在
        // 需要利用监听器
        data() {
            return {
                payData: {
                    price: "***"
                }
            }
        },
        watch:{
            // 其实 watch 是可以单独监听对象里面的特点属性的
            // $store.state.user.userInfo.token
            "$store.state.user.userInfo.token":{
                handler(){
                    // 因为加了 immediate 属性所以一进来就会执行
                    // 处理两个情况
                    // 判断当前有没有 token 有就直接执行，没有就等，等到下次数据恢复完毕再次触发 watch
                    if(this.$store.state.user.userInfo.token){
                        this.$axios({
                            url:'/airorders/'+this.$route.query.id,
                            headers:{
                                Authorization:"Bearer "+this.$store.state.user.userInfo.token
                            }
                        }).then(res =>{
                            console.log(res.data);
                            this.payData = res.data
                            // 当前获取到支付数据
                            // 其中二维码链接在res.data.payInfo.code_url
                            // 需要两个东西 字符串res.data.payinfo.code_url
                            // 另外一个是存放二维码的 dom this.$ref.qrcodeDom
                            QRcode.toCanvas(this.$refs.qrcodeDom,res.data.payInfo.code_url,{
                                width: 200,
                                color: {
                                    dark: '#000088'
                                }
                            })
                        })
                    }
                },
                    // 默认情况下只能监听到有变化的情况
                    // 但是如果是正常跳转，token 本来就存在
                    // 触发不了监听器
                    // immediate 设置默认执行一遍
                    immediate: true
            }
        }
    };
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>