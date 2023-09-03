<template>
  <footer class="main-footer fixed-bottom bg-primary text-white mt-auto py-3 px-2">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-center justify-lg-end">
          <div class="copyright">
            <p>© 2023 by Alexander Stanevko</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainFooter',
})
</script>

<style lang="scss" scoped>
.main-footer {
  .copyright {
    margin: 0 10px;
  }
}
</style>