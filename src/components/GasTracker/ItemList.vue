<template>
  <div class="status-card h-100 shadow-none rounded-4 p-3 d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex align-items-center mb-2">
      <img :src="smilePath" alt="Smile" class="me-2" />
      <h4 class="h6">{{ item.title }}</h4>
    </div>

    <div class="status-card__information text-center">
      <div class="h4 fw-normal mb-2" :class="dynamicStatusClass">
        <span>{{ item.status }}</span> {{ item.statusDescription }}
      </div>
      <div class="text-muted">
        <span>Base: {{ item.base }} | Priority: {{ item.priority }}</span>
      </div>
      <div class="text-muted">
        ${{ item.price }} | <span>~ {{ formattedTime }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from 'vue'
import { GasTrackerListItem } from 'custom-types'

export default defineComponent({
  name: 'ItemList',
  props: {
    item: {
      type: Object as PropType<GasTrackerListItem>,
      default: () => { },
    }
  },
  setup(props) {
    const formattedTime = computed(() => {
      const mins = Math.floor(props.item.estimatedDuration / 60)
      const secs = props.item.estimatedDuration % 60
      return `${mins} mins: ${secs} secs`
    })

    const dynamicStatusClass = computed(() => {
      const titleClassMap: Record<string, string> = {
        'Low': 'text-success',
        'Average': 'text-secondary',
        'High': 'text-danger',
      }
      return titleClassMap[props.item.title] || ''
    })


    const smilePath = computed(() => {
      const smilePaths: Record<string, string> = {
        'Low': 'src/assets/smile3.webp',
        'Average': 'src/assets/smile2.webp',
        'High': 'src/assets/smile1.webp',
      }
      return smilePaths[props.item.title]
    })

    return {
      formattedTime,
      dynamicStatusClass,
      smilePath,
    }
  }
})
</script>

<style lang="scss" scoped>
.status-card {
  border: 1px solid $grey-400;
  // border-radius: 25px;
}
</style>