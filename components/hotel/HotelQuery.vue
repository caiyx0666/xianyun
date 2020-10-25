<template>
    <div class="hotelFilter">
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
                <el-popover width="300px" placement="top" v-model="visible">
                    <el-row type="flex" justify="space-between" align="middle" class="tool">
                        <el-col :span="2">
                            <span>每间</span>
                        </el-col>
                        <!-- 成人 -->
                        <el-col :span="5">
                            <el-select v-model="value" size="mini" placeholder="" class="adult">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="value" size="mini" placeholder="" class="kid">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <div style="text-align: right; padding-top: 10px;border-top:1px solid #eee;">
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
                value: '选项1',
                label: 1
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
            value: ''
        }
    }
}
</script>

<style lang="less" scoped>
.hotelFilter {
    margin-bottom: 20px;
    .tool {
        .button {
            margin-top: 10px;
            border-top: 1px solid #666;
        }
    }
}
</style>