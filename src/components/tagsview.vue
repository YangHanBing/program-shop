<template>
  <div class="tagsview">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      @tab-change="changeTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tagsView"
        :key="item.path"
        :closable="item.path !== '/'"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
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
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()
const activeTab = ref(route.path)
// 监听点击的页面的路由
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    if (route.meta && route.meta.title && route.path) {
      const obj = {
        title: route.meta.title,
        path: route.path
      }
      store.commit('tagsview/setTagsView', obj)
    }
  },
  // immediate: true 进入页面就开始监听
  // deep: true 开启深度监听
  { immediate: true, deep: true }
)
// 获取tagsview的数据
const tagsView = computed(() => {
  return store.getters.tagsview
})
// tagsview的点击事件
const changeTab = (path) => {
  activeTab.value = path
  router.push(path)
}
// 点击路由跳转tagsview并更新
onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path
})
// tagsview的删除事件
const removeTab = (path) => {
  const tagsView = store.getters.tagsview
  let activeName = activeTab.value
  if (activeName === path) {
    tagsView.forEach((tab, index) => {
      if (tab.path === path) {
        const nextTab = tagsView[index + 1] || tagsView[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  activeTab.value = activeName
  const findItemIndex = tagsView.findIndex((tab) => tab.path === path)
  tagsView.splice(findItemIndex, 1)
  store.commit('tagsview/removeTagsView')
}
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
const handleCloseOther = (path) => {
  store.commit('tagsview/delTagaOther')
}
// 全部关闭事件
const handleClear = () => {
  store.commit('tagsview/delTagsAll')
  router.push('/')
}
</script>

<style scoped lang="scss">
.tagsview {
  position: relative;
  background-color: #f3f4f6 !important;
  z-index: 999;
  .demo-tabs {
    position: relative;
    top: -5px;
    left: -10px;
  }
}
.icon {
  padding: 7px;
  background-color: #fff;
  position: absolute;
  right: 20px;
  bottom: 5px;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  background-color: #fff;
  margin: 3px 5px;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
</style>
