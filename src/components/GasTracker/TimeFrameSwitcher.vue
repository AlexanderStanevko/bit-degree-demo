<template>
  <div class="btn-group" role="group" aria-label="Time frame toggle button group">
    <template v-for="(value, index) in values" :key="`${value}-${index}`">
      <input v-model="internalValue"  type="radio" class="btn-check" :value="value"
        :id="`timeframe${index}`" autocomplete="off">
      <label class="btn btn-outline-primary" :for="`timeframe${index}`">{{ value }}</label>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'TimeFrameSwitcher',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const values = [7, 30, 90]
    const internalValue = computed({
      get: () => props.modelValue,
      set: (newVal) => emit('update:modelValue', Number(newVal)),
    })

    return {
      internalValue,
      values,
    }
  },
})
</script>
