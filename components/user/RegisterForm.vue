<template>
    <el-form :model="form" ref="form" :rules="rules" class="form">
        <el-form-item class="form-item" prop="username">
            <el-input placeholder="用户名手机" v-model="form.username">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="captcha">
            <el-input placeholder="验证码" v-model="form.captcha">
                <template slot="append">
                    <el-button @click="handleSendCaptcha">
                        发送验证码
                    </el-button>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="nickname">
            <el-input placeholder="你的名字" v-model="form.nickname">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input
                placeholder="密码"
                type="password"
                v-model="form.password"
            ></el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="checkPassword">
            <el-input
                placeholder="确认密码"
                type="password"
                v-model="form.checkPassword"
            >
            </el-input>
        </el-form-item>

        <el-button class="submit" type="primary" @click="handleRegSubmit">
            注册
        </el-button>
    </el-form>
</template>

<script>
    export default {
        data() {
            // 因为校验函数只有在 data 这里面需要用到, 
            // 无需放入 methods 在这里直接声明即可
            const validatePass = (rule, value, callback) => {
                // rule 是当前规则对象
                // value 是当前输入框的值
                // callback 是一个放行的函数
                // 如果需要报错, 则创建一个错误对象
                // new Error(错误信息字符串)
                // 将这个错误对象传入 callback 放行函数当中
                // 饿了么就会自动报错

                if (value == '') {
                    // 输出错误提示
                    callback(new Error('请再次输入密码'))
                }else if(value != this.form.password) {
                    // 输出错误提示
                    callback(new Error('两次密码必须一致'))
                }else {
                    // 输出成功回调
                    callback();
                }
            }

            return {
                form: {
                    username: "",
                    nickname: "",
                    captcha: "",
                    password: "",
                    checkPassword: "",
                },
                rules: {
                    username: [
                        {
                            required: true,
                            message: "该项不能为空",
                            trigger: "blur",
                        },
                        {
                            min: 5,
                            max: 11,
                            message: "请输入合法手机号",
                            trigger: "blur",
                        },
                    ],
                    nickname: [
                        {
                            required: true,
                            message: "该项不能为空",
                            trigger: "blur",
                        },
                    ],
                    captcha: [
                        {
                            required: true,
                            message: "该项不能为空",
                            trigger: "blur",
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: "该项不能为空",
                            trigger: "blur",
                        },
                    ],
                    checkPassword: [
                        {
                            //   验证规则里面, 有三个需要处理的变量
                            //   1. 要求
                            //   2. 提示语
                            //   3. 触发
                            // 最灵活的是一个函数校验形式, 只剩下触发条件需要声明
                            // 其余全部放到函数 validator 里面
                            //   required: true,
                            //   message: '该项不能为空',
                            validator: validatePass,
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        methods: {
            handleRegSubmit() {
                // 注册暂时啥都不干
                // 只是先将 form 数据打印出来
                console.log(this.form);

                // 输入完全部数据, 需要做一次校验
                // 发送请求即可(跟登录没什么差别)
                this.$refs.form.validate().then(res=>{
                    console.log('校验成功');
                    // 所有数据都符合要求后, 发送请求

                    // 先用剩余参数语法将 checkPassword 排除掉
                    const {checkPassword, ...data} = this.form

                    this.$axios({
                        method: 'post',
                        url: '/accounts/register',
                        data
                    }).then(res=>{
                        console.log(res.data);
                        // 注册成功
                        this.$message.success('注册成功')

                        // 自动登录, 将数据存放到 vuex 里面
                        this.$store.commit('user/setUserInfo', res.data)
                    }).catch(err=>{
                        console.dir(err)
                    })
                }).catch(err=>{
                    console.log('校验失败');
                })
            },
            handleSendCaptcha() {
                this.$axios({
                    method: 'post',
                    url: '/captchas',
                    data: {
                        tel: this.form.username
                    }
                }).then(res=>{
                    console.log(res.data);
                    if (res.data.code) {
                        this.$message.success('验证码发送成功: '+ res.data.code)
                    }
                })
            },
        },
    };
</script>

<style scoped lang="less">
    .form {
        padding: 25px;
    }

    .form-item {
        margin-bottom: 20px;
    }

    .form-text {
        font-size: 12px;
        color: #409eff;
        text-align: right;
        line-height: 1;
    }

    .submit {
        width: 100%;
        margin-top: 10px;
    }
</style>