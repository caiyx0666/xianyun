<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <div class="member-info-item"
                  v-for="(user,index) in users"
                  :key="user.uid">

                    <el-form-item label="乘机人姓名">
                        <el-input placeholder="姓名" class="input-with-select" v-model="user.username">
                            <el-select 
                                slot="prepend" 
                                value="1" 
                                placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="身份证号码">
                        <el-input 
                            placeholder="证件号码"  
                            class="input-with-select"
                            v-model="user.id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <el-checkbox-group v-model="insurances">
                    <div
                        class="insurance-item"
                        v-for="item in data.insurances"
                        :key="item.id">
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
               <el-form label-width="80px" :model="{
                    contactName,
                    contactPhone,
                    captcha
                }"
                :rules="contactRules"
                >
                    <el-form-item label="姓名" prop="contactName">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="contactPhone">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha" >发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码" prop="captcha">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
        <div style="display: none">
            {{TotalPrice}}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:Object
    },
    data(){
        return {
            contactRules: {
                contactName: [
                    {
                        required: true,
                        message: '请输入数据',
                        trigger: 'blur'
                    }
                ],
                contactPhone: [
                    {
                        required: true,
                        message: '请输入数据',
                        trigger: 'blur'
                    }
                ],
                captcha: [
                    {
                        required: true,
                        message: '请输入数据',
                        trigger: 'blur'
                    }
                ]
            }, 
            users:[
                // 这里来存放所有乘机人
                // 每个对象都是一个乘机人数据对象
                {
                    username:'',
                    id:'',   // 身份证
                    uid:new Date().getTime()
                }
            ],
            insurances: [],
             contactName: '嘿嘿',
                contactPhone: '13847474837',
                captcha: '000000',
                invoice: false,
        }
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.users.push({
                username:'',
                id:'',
                uid:new Date().getTime()
            })
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            this.users.splice(index,1)
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            if(!this.contactPhone){
                this.$message.warning('请先输入手机号')
                return
            }

            // 订单发送验证码前先进行校验手机号码是否合法
            const regexp = /^1[3456789]\d{9}$/
            if(!regexp.test(this.contactPhone)){
                this.$message.error('手机号不合法')
                return
            }

            this.$axios({
                method:'post',
                url:'/captchas',
                data:{
                    tel:this.contactPhone
                }
            }).then(res =>{
                // console.log(res.data);
                if(res.data.code){
                    this.$message.success('发送成功'+res.data.code)
                }
            })
        },

        // 提交订单
        handleSubmit(){
            // console.log(this.users);
             const data = {
                    users: this.users,
                    insurances: this.insurances,
                    contactName: this.contactName,
                    contactPhone: this.contactPhone,
                    invoice: this.invoice,
                    seat_xid: this.$route.query.seat_xid,
                    air: this.$route.query.id,
                    captcha: this.captcha
            }
             this.$axios({
                    method: 'post',
                    url: '/airorders',
                    headers: {
                        Authorization: "Bearer " + this.$store.state.user.userInfo.token
                    },
                    data
                }).then(res=>{
                    console.log(res.data);
                })
        },
        
    },
    computed:{
        TotalPrice(){
            // 计算总价格
            // 机票价格 = 人数 * 机票单价
            // 保险价格 = 人数 * 所有选中的保险单价
            const ticketPrice = this.data.base_price * this.users.length
            let insurancePrice = 0

            this.insurances.forEach(element=>{
                // 遍历选中的保险，这里选中的储存都是保险的id
                this.data.insurances.forEach(insurance => {
                    if(insurance.id == element){
                        // 拿到了当前选中 id 保险的价格
                        // 应该乘以人数，添加到总价上
                        insurancePrice += insurance.price * this.users.length
                    }
                })
            })

            console.log(insurancePrice);
            const totalPrice = ticketPrice + insurancePrice
            // 得出了总价
            this.$emit('setTotalPrice', totalPrice)
            return totalPrice
        }
    },
    // watch: {
        // users:{
        //     handler(){
        //         this.getTotalPrice()
        //     },
        //     // 这个属性可以强制 watch 在页面加载完毕马上触发一次
        //     immediate:true
        // },
        // insurances:{
        //     handler(){
        //         this.getTotalPrice()
        //     },
        //     immediate:true
        // }
    // },
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>