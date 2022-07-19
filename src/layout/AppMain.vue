<template>
  <div class="appmain">
    <TagsView
      class="tagsview"
      :style="{
        width: isCollapse ? 'calc(100vw - 65px)' : 'calc(100vw - 250px)'
      }"
    >
    </TagsView>
    <router-view class="box"></router-view>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import TagsView from '@/components/tagsview'
const store = useStore()
// 获取折叠状态
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
</script>

<style scoped lang="scss">
.tagsview {
  height: 40px;
  box-shadow: 0 0 3px 0 #ccc;
  position: fixed;
  top: 64px;
  padding: 5px 10px;
  box-sizing: border-box;
}
.box {
  padding: 60px 20px 20px 20px;
}
</style>
