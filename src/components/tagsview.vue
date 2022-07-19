<template>
  <div class="tagsview">
    tagsview
    <el-dropdown type="primary" @command="handleCommand" class="icon">
      <el-icon><ArrowDown /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="closeOther">关闭其它</el-dropdown-item>
          <el-dropdown-item command="clear">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
// tagsview下拉事件
const handleCommand = (command) => {
  switch (command) {
    case 'closeOther':
      handleCloseOther()
      break
    case 'clear':
      handleClear()
      break
  }
}
// 关闭其它事件
const handleCloseOther = () => {
  alert('关闭其它')
}
// 全部关闭事件
const handleClear = () => {
  alert('全部关闭')
}
</script>

<style scoped lang="scss">
.tagsview {
  position: relative;
}
.icon {
  padding: 7px;
  background-color: #fff;
  position: absolute;
  right: 20px;
  bottom: 5px;
}
</style>
