<template>
    <el-form :model="form" ref="form" :rules="rules" class="form">
        <el-form-item class="form-item" prop="username">
            <el-input @focus="hideErrMsg('username')" placeholder="用户名/手机" v-model="form.username"> </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input @focus="hideErrMsg('password')" placeholder="密码" type="password" v-model="form.password"> </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button class="submit" type="primary" @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                // 表单数据
                form: {
                    username: '13800138000',
                    password: '123456'
                },
                // 表单规则
                rules: {
                    // 这里是一个对象
                    // 以 key: value 的形式指定每个字段应该符合的规则
                    username: [
                        // 这里是规则数组, 里面每个元素都是一条需要校验的 rule 
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            pattern: /^1[3456789]\d{9}$/,
                            message: '请输入11位合法手机号',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            message: '密码必须6位以上',
                            trigger: 'blur'
                        }
                    ]
                },
            };
        },
        methods: {
            // 提交登录
            handleLoginSubmit() {
                // 发送登录之前, 校验整个表单
                // 可以使用 form.validate() 函数
                // 这个函数有两种使用方式
                // 1. 回调形式
                // this.$refs.form.validate((isValid, invalidObj)=>{
                //     // 校验完毕会得到两个参数, 是否成功的布尔值, 不合法的字段集合
                //     console.log(isValid);
                //     console.log(invalidObj);
                //     // 只要在这里查判断校验成功, 然后发送请求即可
                //     if (isValid) {
                //         // 发送登录请求
                //     }
                // })

                // 2. promise 的形式
                this.$refs.form.validate().then(res=>{
                    console.log(res);
                    console.log('校验成功');
                    if (res) {
                        // 发送请求
                        // this.$axios({
                        //     method: 'post',
                        //     url: '/accounts/login',
                        //     data: this.form
                        // }).then(res=>{
                        //     console.log(res.data);
                        //     this.$message.success('登录成功')
                        //     // 将获取的数据存放到 vuex 当中
                        //     // 利用 commit 调用 mutation
                        //     this.$store.commit('user/setUserInfo', res.data)
                        // })
                        // 弹窗删掉, 留给拦截器处理
                        // this.$store.commit('user/setUserInfo', this.form)
                        // 登录表单这里想要登录, 但是我自己不做登录请求
                        // 将这个请求封装到 vuex 里面, 让所有其他组件都能共用
                        // this.$store.dispatch() 两个参数, action 的地址, 第二是数据
                        this.$store.dispatch('user/login', this.form).then(res=>{
                            this.$message.success('登录成功')
                            console.log(res);
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                    console.log('校验失败');
                })


                // 暂时不管登录的事情,只是打印出数据作为参考
                console.log(this.form);
            },
            hideErrMsg(propName) {
                // 拿到当前表单
                // 调用清理错误信息的函数
                // 传入需要清理的 prop
                this.$refs.form.clearValidate(propName)
            }
        },
    };
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>