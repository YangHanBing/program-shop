<template>
  <div class="container">
    <el-form :inline="true" :model="props.searchForm" class="demo-form-inline">
      <template v-for="item in navFormColumn">
        <el-form-item v-if="item.type == 'input'" v-bind="item">
          <el-input
            v-model.trim="searchForm[item.prop]"
            v-bind="item"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="item.type == 'select' && switchStatus"
          v-bind="item"
        >
          <el-select
            v-model.trim="searchForm[item.prop]"
            v-bind="item"
            :style="item.style"
          >
            <el-option
              v-for="item in props.typeList.value"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn_box">
          <el-button type="primary" size="small" @click="handleSearch"
            >搜索</el-button
          >
          <el-button size="small" @click="handleReset">重置</el-button>
          <el-button
            v-if="switch"
            size="small"
            class="searchSwitch"
            @click="handleSwitch"
            >{{ switchTitle
            }}<el-icon class="el-icon--right" v-if="switchStatus"
              ><ArrowUp
            /></el-icon>
            <el-icon class="el-icon--right" v-else><ArrowDown /></el-icon
          ></el-button>
        </el-form-item>
      </template>
    </el-form>
    <div class="navAction_box">
      <div class="navAction">
        <el-button
          v-bind="item"
          v-for="(item, index) in NavFormActions"
          :key="index"
          >{{ item.title }}</el-button
        >
      </div>
      <!-- 刷新游览器 -->
      <el-icon @click="refresh" class="reloadIcon hover-effect">
        <svg-icon icon="reload"></svg-icon>
      </el-icon>
    </div>
  </div>
</template>
<script setup>
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { ref, defineEmits, defineProps } from 'vue'
const switchStatus = ref(true)
const switchTitle = ref('收起')
const props = defineProps({
  searchForm: {
    type: Object
  },
  typeList: {
    type: Object
  },
  navFormColumn: {
    type: Array
  },
  NavFormActions: {
    type: Array
  },
  switch: Boolean
})
// 刷新游览器事件
const refresh = () => {
  // 要实现局部刷新
  // location.reload()
}
// 控制商品分类的显示隐藏
const handleSwitch = () => {
  switchStatus.value = !switchStatus.value
  if (switchStatus.value) {
    switchTitle.value = '收起'
  } else {
    switchTitle.value = '展开'
  }
}
const emits = defineEmits(['handleSearch', 'handleReset'])
const handleSearch = () => {
  emits('handleSearch')
}
const handleReset = () => {
  emits('handleReset')
}
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  .demo-form-inline {
    margin: 0 0 10px 30px;
    position: relative;
    .searchname {
      width: 300px;
    }
    .btn_box {
      position: absolute;
      top: 0;
      right: -40px;
      .searchSwitch {
        border: none;
        color: #79bbff;
      }
    }
  }
  .navAction_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
<!-- <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label=" 关键词 ">
        <el-input
          class="searchname"
          size="small"
          v-model="searchForm.name"
          placeholder="商品名称"
        />
      </el-form-item>
      <el-form-item label="商品分类 " v-if="switchStatus">
        <el-select
          v-model="searchForm.type"
          placeholder="请选择商品分类"
          size="small"
        >
          <el-option
            v-for="item in props.typeList.value"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="btn_box">
        <el-button type="primary" size="small" @click="handleSearch"
          >搜索</el-button
        >
        <el-button size="small" @click="handleReset">重置</el-button>
        <el-button
          v-if="switch"
          size="small"
          class="searchSwitch"
          @click="handleSwitch"
          >{{ switchTitle
          }}<el-icon class="el-icon--right" v-if="switchStatus"
            ><ArrowUp
          /></el-icon>
          <el-icon class="el-icon--right" v-else><ArrowDown /></el-icon
        ></el-button>
      </el-form-item>
    </el-form>
    <div class="navAction_box">
      <div class="navAction">
        <el-button size="small" type="primary">新增</el-button>
        <el-button size="small" type="danger">批量删除</el-button>
        <el-button size="small">上架</el-button>
        <el-button size="small">下架</el-button>
      </div>
      <el-icon @click="refresh" class="reloadIcon hover-effect">
        <svg-icon icon="reload"></svg-icon>
      </el-icon>
    </div> -->
