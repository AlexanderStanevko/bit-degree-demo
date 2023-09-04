<template>
  <header class="main-header fixed-top shadow-sm rounded px-2 py-3 text-center text-lg-left">
    BitDegree Gas Tracker Application
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainHeader',
})
</script>

<style lang="scss" scoped>
.main-header {
  height: 60px;
  background-color: $light;
}
</style>