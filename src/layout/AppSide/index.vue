<template>
  <div class="sidebar">
    frgrrg
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const menus = computed(() => {
  return store.getters.menus
})
console.log(menus)
</script>
<style scoped lang="scss">
.el-menu-vertical-demo {
  border-right: none;
}

.icon {
  width: 20px;
  height: 20px;
  color: red;
}
</style>
