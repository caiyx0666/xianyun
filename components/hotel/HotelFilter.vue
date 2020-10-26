<template>
    <el-row class="filter-list" align="middle">

        <!-- 价格滑块 -->
        <el-col :span="5" class="box">
            <span>价格</span>
            <span style="float:right">￥0-{{priceScope}}</span>
            <div class="block">
                <el-slider v-model="priceScope" :show-tooltip="false" :max="4000" @change="priceChange">
                </el-slider>
            </div>
        </el-col>

        <!-- 住宿等级 -->
        <el-col :span="4" class="box">
            <span>住宿等级</span>
            <el-popover
              placement="bottom-start"
              trigger="click"
              transition="el-zoom-in-top"
              :offset="-20">
                 <el-checkbox-group v-model="levelsIndex" @change="levelsChange">
                    <div v-for="item in hotelOption.levels" :key="item.id">
                         <el-checkbox v-model="item.id" :label="item.id" :checked="isChecked">{{ item.name }}</el-checkbox>
                    </div>
                </el-checkbox-group>

              <el-button type="text" slot="reference">{{ isLevels }}<i class="el-icon-arrow-down down"></i></el-button>
            </el-popover>
        </el-col>

        <!-- 住宿类型 -->
        <el-col :span="4" class="box">
            <span>住宿类型</span>
            <el-popover
              placement="bottom-start"
              trigger="click"
              transition="el-zoom-in-top"
              :offset="-20">

                 <el-checkbox-group v-model="typesIndex" @change="typesChange">
                    <div v-for="item in hotelOption.types" :key="item.id">
                         <el-checkbox v-model="item.id" :label="item.id" :checked="isChecked">{{ item.name }}</el-checkbox>
                    </div>
                </el-checkbox-group>
              <el-button type="text" slot="reference">{{ isTypes }}<i class="el-icon-arrow-down down"></i></el-button>
            </el-popover>
        </el-col>

        <!-- 酒店设施 -->
        <el-col :span="4" class="box">
            <span>酒店设施</span>
            <el-popover
              placement="bottom-start"
              trigger="click"
              transition="el-zoom-in-top"
              :offset="-20">

                 <el-checkbox-group v-model="assetsIndex" @change="assetsChange">
                    <div v-for="item in hotelOption.assets" :key="item.id">
                       <el-checkbox v-model="item.id" :label="item.id" :checked="isChecked">{{ item.name }}</el-checkbox>
                    </div>
                </el-checkbox-group>

              <el-button type="text" slot="reference">{{ isAssets }}<i class="el-icon-arrow-down down"></i></el-button>
            </el-popover>
        </el-col>

        <!-- 酒店品牌 -->
        <el-col :span="4" class="box">
            <span>酒店品牌</span>
            <el-popover
              placement="bottom-start"
              trigger="click"
              transition="el-zoom-in-top"
              :offset="-20">

                <div class="popover">
                    <el-checkbox-group v-model="brandsIndex" @change="brandsChange">
                      <div v-for="item in hotelOption.brands" :key="item.id">
                         <el-checkbox v-model="item.id" :label="item.id" :checked="isChecked">{{ item.name }}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                </div>

              <el-button type="text" slot="reference">{{ isBrands }}<i class="el-icon-arrow-down down"></i></el-button>
            </el-popover>
        </el-col>

        <!-- 撤销按钮 -->
        <el-col :span="3" class="box">
            <el-button type="primary" @click="repeal">撤销条件</el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            hotelOption: [],
            priceScope: 4000,
            // 酒店等级
            levels:'',
            // 酒店类型
            types:'',
            // 酒店设施
            assets:'',
            // 酒店品牌
            brands:'',
            isLevels:'不限',
            isTypes:'不限',
            isAssets:'不限',
            isBrands:'不限',
            levelsIndex:[],
            typesIndex:[],
            assetsIndex:[],
            brandsIndex:[],
            // 控制所有的多选框的选中状态
            isChecked: false
        }
    },
    created(){
         // 获取酒店选项
        this.$axios({
            url:'/hotels/options'
        }).then(res =>{
            console.log(res.data.data);
            this.hotelOption = res.data.data
        })
    },
    methods:{
        // 价格区间发生变化
        priceChange(newPrice){
            console.log(newPrice);
        },
        // 住宿等级数组发生变化
        levelsChange(newLevels){
            if(!newLevels.length){
                this.isLevels = '不限'
            }else if(newLevels.length == 1){
                this.hotelOption.levels.forEach(item =>{
                    if(item.id == newLevels[0]){
                        this.isLevels = item.name
                        return
                    }
                })
            }else{
                this.isLevels = `已选${newLevels.length}项`
            }
            console.log(newLevels);
        },
        // 住宿类型数组发生变化
        typesChange(newTypes){
            if(!newTypes.length){
                this.isTypes = '不限'
            }else if(newTypes.length == 1){
                this.hotelOption.types.forEach(item =>{
                    if(item.id == newTypes[0]){
                        this.isTypes = item.name
                        return
                    }
                })
            }else{
                this.isTypes = `已选${newTypes.length}项`
            }
            console.log(newTypes);
        },
        // 酒店设施数组发生变化
        assetsChange(newAssets){
            if(!newAssets.length){
                this.isAssets = '不限'
            }else if(newAssets.length == 1){
                this.hotelOption.assets.forEach(item =>{
                    if(item.id == newAssets[0]){
                        this.isAssets = item.name
                        return
                    }
                })
            }else{
                this.isAssets = `已选${newAssets.length}项`
            }
            console.log(newAssets);
        },
        // 酒店品牌数组发生变化
        brandsChange(newBrands){
            if(!newBrands.length){
                this.isBrands = '不限'
            }else if(newBrands.length == 1){
                this.hotelOption.brands.forEach(item =>{
                    if(item.id == newBrands[0]){
                        this.isBrands = item.name
                        return
                    }
                })
            }else{
                this.isBrands = `已选${newBrands.length}项`
            }
            console.log(newBrands);
        },
        // 撤销按钮点击事件
        repeal(){
            // 将价格区间变回最开始的4000
            this.priceScope = 4000
            // 将所有的多选框都变成未选中状态
            this.isChecked = false
            // 此时的数据还未渲染到筛选器上
            // 需要手动触发一次
            this.levelsChange([])
            this.typesChange([])
            this.assetsChange([])
            this.brandsChange([])
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
.el-button--text {
    position: relative;
    display: block;
    width: 100%;
    font-size: 13px;
    color: #606266;
    display: flex;
    
    
    i {
        position: absolute;
        right: 0px;
    }
}
.el-checkbox-group {

    .el-checkbox {
        display: flex;
        padding: 10px 0;

        /deep/.el-checkbox__input {
            padding-left: 12px;
        }

        /deep/.el-checkbox__label {
            padding-left: 16px;
        }
    }
}
.popover {
    max-height: 294px !important;
    overflow-y: auto;
    position: relative;

    &::-webkit-scrollbar {
        position: absolute;
        width: 10px;
        padding-right: -20px;  
        right: -20px;
        /*height: 4px;*/
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0,0,0,0.2);
    }

    &::-webkit-scrollbar-track {
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
}
</style>