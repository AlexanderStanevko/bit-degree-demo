<template>
  <div class="d-flex flex-column bg-white min-vh-100">
    <MainHeader />
    <main class="flex-grow-1 d-flex justify-content-center align-items-center main-content">
      <div class="container">
        <router-view />
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainFooter from 'components/main/MainFooter.vue'
import MainHeader from 'components/main/MainHeader.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    MainHeader,
    MainFooter,
  },
})
</script>

<style lang="scss" scoped>
  .min-vh-100 {
    min-height: 100vh;
  }
  
  .main-content {
    padding-top: 60px;
    padding-bottom: 60px;
  }
</style>
