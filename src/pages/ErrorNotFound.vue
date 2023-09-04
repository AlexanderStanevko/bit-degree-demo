<template>
  <div class="d-flex flex-column vh-100 justify-content-center align-items-center bg-primary text-white text-center">
    <div>
      <div class="display-1">
        404
      </div>
      <div class="display-4">
        Page not found
      </div>
      <button type="button" class="btn btn-light btn-lg mt-5" @click="backToMainPage">Back to main page</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ErrorNotFound',
  setup() {
    const router = useRouter()
    const backToMainPage = () => {
      router.push({
        name: 'IndexPage',
      })
    }

    return {
      backToMainPage,
    }
  },
})
</script>
