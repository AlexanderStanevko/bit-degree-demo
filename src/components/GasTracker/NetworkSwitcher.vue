<template>
  <div class="btn-group" role="group" aria-label="Network toggle button group">
    <template v-for="(network, index) in networks" :key="`${network.id}-${index}`">
      <input type="radio" class="btn-check" :checked="internalValue.value === network.value" :id="`network${network.id}`"
        autocomplete="off" @change="updateModelValue(network)">
      <label class="btn btn-outline-primary" :for="`network${network.id}`">{{ network.label }}</label>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { NetworkItem } from 'custom-types'

export default defineComponent({
  name: 'NetworkSwitcher',
  props: {
    modelValue: {
      type: Object as PropType<NetworkItem>,
      default: () => {},
    },
    networks: {
      type: Array as PropType<NetworkItem[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const internalValue = computed({
      get: () => props.modelValue,
      set: (newVal) => emit('update:modelValue', newVal),
    })

    const updateModelValue = (network: NetworkItem) => {
      internalValue.value = network
    }

    return {
      internalValue,
      updateModelValue,
    }
  },
})
</script>
