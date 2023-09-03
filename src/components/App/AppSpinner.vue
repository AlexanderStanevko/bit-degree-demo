<template>
  <div 
    class="spinner-border" 
    :class="spinnerColor" 
    :style="dimensions" 
    role="status"
  >
    <span class="visually-hidden" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"

export default defineComponent({
  name: "AppSpinner",
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: '3rem',
    },
  },
  setup(props) {
    const spinnerColor = computed<string>(() => `text-${props.color}`)
    const dimensions = computed<string>(() => `width: ${props.size}; height: ${props.size};`)
    return {
      spinnerColor,
      dimensions,
    }
  },
})
</script>