<template>
<div>
    <el-autocomplete
        v-model="content"
        :fetch-suggestions="querySearch"
        @select="handleSelect"
    ></el-autocomplete> </div> 
</template>

<script>
export default {
    data(){
        return{
            content:''
        }
    },
    methods:{
        // 输入建议的时候触发
        querySearch(queryString,callback){
            // 如何显示搜索建议
            // queryString 每当输入变更时
            // 都会获取到最新字符串
            console.log('当前搜索字段='+ queryString);
            const data = [
                {
                    value:'吉山幼儿园',
                    address:'珠吉路57号'
                },
                {
                    value:'黑马程序员',
                    address:'珠吉路58号'
                }
            ]
            callback(data)
        },
        // 点击搜索建议触发事件
        handleSelect(item){
            // 选中了搜索建议后续如何操作
            // 选中一个选项，可以得到配置这个选项的整个对象
            console.log('我选中了');
            console.log(item);
        }
    }
}
</script>

<style lang="less" scoped>

</style>