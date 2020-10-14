<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                placeholder="用户名手机" v-model="form.username"
                @focus="hideErrMsg('username')">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input 
                placeholder="验证码" v-model="form.captcha"
                @focus="hideErrMsg('captcha')">
                    <template slot="append">
                        <el-button @click="handleSendCaptcha" >
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                placeholder="你的名字" v-model="form.nickname"
                @focus="hideErrMsg('nickname')">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                placeholder="密码" 
                type="password"
                v-model="form.password"
                @focus="hideErrMsg('password')"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input 
                placeholder="确认密码" 
                type="password"
                v-model="form.checkPassword"
                @focus="hideErrMsg('checkPassword')">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
      const validatePass = (rule,value,callback)=>{
        if(value == ''){
          callback(new Error('请再次输入密码'))
        }else if(value !== this.form.password){
          callback(new Error('两次输入密码不一致'))
        }else{
          callback()
        }
      }
        return {
            // 表单数据
            form: {
              username:'',
              nickname:'',
              captcha:'',
              password:'',
              checkPassword:''
            },
            // 表单规则
            rules: {
              username:[
                {
                  required:true,
                  message:'用户名不得为空',
                  trigger:'blur'
                }
              ],
              nickname:[
                {
                  required:true,
                  message:'昵称不得为空',
                  trigger:'blur'
                }
              ],
              captcha:[
                {
                  required: true,
                  message:'验证码不得为空',
                  trigger:'blur'
                },{
                  pattern: /^\d{6}$/,
                  message: '请输入6位的数字验证码',
                  trigger: 'blur'
                }
              ],
              password:[
                {
                  required:true,
                  message:'密码不得为空',
                  trigger:'blur'
                }
              ],
              checkPassword:[
                {
                  validator: validatePass,
                  trigger:'blur'
                }
              ],
            },
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){
          this.$axios({
            method:'post',
            url:'/captchas',
            data:{
              tel:this.form.username
            }
          }).then(res =>{
            console.log(res.data);
             if (res.data.code) {
                 this.$message.success('验证码发送成功: '+ res.data.code)
             }
          })
        },

        // 注册
        handleRegSubmit(){
           console.log(this.form)
            this.$refs.form.validate().then(res=>{
              if(res){
                const { checkPassword,...data } = this.form
                this.$axios({
                  method:'post',
                  url:'/accounts/register',
                  data
                }).then(res =>{
                  console.log(res.data);
                })
              }
            }).catch(err =>{
              console.log(err);
              this.$message.warning('请输入正确的信息')
            })
        },

        // 表单获取焦点时，取消验证信息
        hideErrMsg(propName){
          this.$refs.form.clearValidate(propName)
        }
    }
}
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