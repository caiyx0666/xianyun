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
            <div class="select">
                <el-select v-model="value2" multiple collapse-tags size="mini" style="margin-left: 20px;" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-col>
        <el-col :span="4" class="box">住宿类型</el-col>
        <el-col :span="4" class="box">酒店设施</el-col>
        <el-col :span="4" class="box">酒店品牌</el-col>
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
    margin-bottom: 20px;
    .box {
        height: 100%;
        padding: 10px 18px;
        border-right: 1px solid #dddddd;
        &:last-child {
            border-right: none;
        }
    }
}
</style>