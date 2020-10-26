<template>
    <el-row class="filter-list" align="middle">
        <!-- 价格滑块 -->
        <el-col :span="5" class="box">
            <span>价格</span>
            <span style="float:right">￥0-{{value}}</span>
            <div class="block">
                <el-slider v-model="value" :show-tooltip="false" :max="4000">
                </el-slider>
            </div>
        </el-col>
        <!-- 住宿等级 -->
        <el-col :span="4" class="box">
            <span>住宿等级</span>
            <el-popover placement="bottom" width="150" v-model="visible">
                <p>这是一段内容这是一段内容确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                    <el-button type="primary" size="mini" @click="visible = false">清空</el-button>
                </div>
                <div class="select" slot="reference">
                    <span class="info">不限</span>
                    <i class="el-icon-caret-bottom icon"></i>
                </div>
            </el-popover>

        </el-col>
        <!-- 住宿类型 -->
        <el-col :span="4" class="box">
            <span>住宿类型</span>
            <div class="select">
                <span class="info">不限</span>
                <i class="el-icon-caret-bottom icon"></i>
            </div>
        </el-col>
        <el-col :span="4" class="box">
            <span>酒店设施</span>
            <div class="select">
                <span class="info">不限</span>
                <i class="el-icon-caret-bottom icon"></i>
            </div>
        </el-col>
        <el-col :span="4" class="box">
            <span>酒店品牌</span>
            <div class="select">
                <span class="info">不限</span>
                <i class="el-icon-caret-bottom icon"></i>
            </div>
        </el-col>
        <el-col :span="3" class="box">
            <el-button type="warning">撤销条件</el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: 1400,
            value2: [],
        }
    }
}
</script>

<style lang="less" scoped>
.filter-list {
    font-size: 14px;
    color: #666;
    padding: 5px 0px;
    height: 80px;
    border: 1px solid #cccccc;
    margin-bottom: 200px;
    .box {
        height: 100%;
        padding: 10px 12px;
        border-right: 1px solid #dddddd;
        &:last-child {
            border-right: none;
        }

        .select {
            margin-top: 10px;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
        }
    }
}
</style>