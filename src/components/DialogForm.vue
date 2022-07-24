<template>
  <div>
    <el-drawer
      v-model="dialogVisible"
      :title="title"
      size="45%"
      wrapperClosable="false"
    >
      <el-form
        :model="props.addInfo"
        :rules="rules"
        ref="addInfo"
        label-width="100px"
      >
        <template v-for="item in dialogFormColumn">
          <!-- 普通输入框 -->
          <el-form-item v-if="item.type == 'input'" v-bind="item">
            <el-input
              v-model.trim="addInfo[item.prop]"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 切换按钮 -->
          <el-form-item v-if="item.type == 'radio'" v-bind="item">
            <el-radio-group v-model="addInfo.status">
              <el-radio v-for="item in item.radios" :label="item.label" />
            </el-radio-group>
          </el-form-item>
          <!-- 日期选择器 -->
          <el-form-item v-if="item.type == 'date-picker'" v-bind="item">
            <el-date-picker
              v-model.trim="addInfo[item.prop]"
              :value-format="item.value_format"
              v-bind="item"
              type="date"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 下拉菜单 -->
          <!-- <el-form-item v-if="item.type == 'select'" v-bind="item">
            <el-select
              v-model.trim="addInfo[item.prop]"
              v-bind="item"
              :style="item.style"
            >
              <el-option
                v-for="(item, index) in item.payType"
                :key="index"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <!-- 文本域 -->
          <el-form-item v-if="item.type == 'textarea'" v-bind="item">
            <el-input
              v-model.trim="addInfo[item.prop]"
              v-bind="item"
            ></el-input>
          </el-form-item>
          <!-- 操作 -->
          <!-- <el-form-item v-if="item.type == 'action'" v-bind="item"> -->
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleAddOk">确 定</el-button>
      </span>
    </el-drawer>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  addInfo: {
    type: Object,
    default: () => {}
  },
  rules: {
    type: Object,
    default: () => {}
  },
  dialogFormColumn: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['handleClose', 'handleAddOk'])
// 模态框取消事件
const handleClose = () => {
  emits('handleClose')
  // this.$refs['addInfo'].resetFields()
}
// 模态框确定事件
const handleAddOk = () => {
  emits('handleAddOk')
}
</script>
<style scoped lang="scss"></style>
