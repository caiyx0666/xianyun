<template>
    <div class="hotel-filter">
        <!-- 筛选表单 -->
        <el-row type="flex" class="filters-top" justify="space-between" align="middle" :gutter="10">
            <!-- 切换城市 -->
            <el-col :span="7">
                <el-input v-model="form.cityName" placeholder="出发目的地"></el-input>
            </el-col>
            <el-col :span="5">
                <el-date-picker type="date" placeholder="入住日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="5">
                <el-date-picker type="date" placeholder="离店日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="7">
                <!-- 弹出框 -->
                <el-popover :width="310" placement="bottom" v-model="visible" :offset="35">
                    <el-row type="flex" align="middle" class="tool" :gutter="10">
                        <el-col :span="10">
                            <span>每间</span>
                        </el-col>
                        <!-- 成人 -->
                        <el-col :span="7" class="adult">
                            <el-select v-model="adultValue" size="mini" placeholder="">
                                <el-option v-for="item in 7" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                        <!-- 儿童 -->
                        <el-col :span="7">
                            <el-select v-model="kidValue" size="mini" placeholder="" class="kid">
                                <el-option v-for="item in 4 " :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <div style="text-align: right; padding-top: 10px;border-top:1px solid #eee;margin-top:10px">
                        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                    </div>
                    <el-input v-model="form.cityName" slot="reference" placeholder="人数未定" suffix-icon="el-icon-user"></el-input>
                </el-popover>
            </el-col>
            <!-- 搜索按钮 -->
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-search"></el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            form: {
                cityName: '',
            },
            options: [{
                // 实际传值
                value: '选项1',
                // 选项标签：给用户看的
                label: 1 + '成人'
            }, {
                value: '选项2',
                label: 2
            }, {
                value: '选项3',
                label: 3
            }, {
                value: '选项4',
                label: 4
            }, {
                value: '选项5',
                label: 5
            }],
            adultValue: '',
            kidValue: ''
        }
    }
}
</script>

<style lang="less" scoped>
.adult {
    position: relative;
    &::after {
        content: "成人";
        position: absolute;
        top: 5px;
        font-size: 12px;
        color: #666;
        right: 35px;
    }
}
.kid {
    position: relative;
    &::after {
        content: "儿童";
        position: absolute;
        top: 5px;
        font-size: 12px;
        color: #666;
        right: 35px;
    }
}
.hotel-filter {
    margin-bottom: 20px;
}
</style>