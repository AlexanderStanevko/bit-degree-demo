<template>
  <div class="item-list bg-white rounded-4 p-4">
    <div class="h-100 d-flex flex-column justify-content-between">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted border border-1 rounded px-2 mb-4 h-25">
        <div class="text-center text-md-left my-2 my-md-0">
          Next update in {{ countdown }} seconds
        </div>
        <div class="text-center text-md-left my-2 my-md-0">
          {{ currentDate }}
        </div>
      </div>
      <div class="d-flex flex-column flex-md-row justify-content-between h-75 gap__10">
        <template v-for="(item, index) in list" :key="`${item.title}__${index}`">
          <div class="my-2 my-md-0">
            <ItemList :item="item" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue'
import ItemList from 'components/GasTracker/ItemList.vue'
import { GasTrackerListItem } from 'custom-types'

export default defineComponent({
  name: 'List',
  components: {
    ItemList,
  },
  props: {
    list: {
      type: Array as PropType<GasTrackerListItem[]>,
      default: () => [],
    },
    countdown: {
      type: Number,
      default: 0,
    }
  },
  setup() {
    const currentDate = ref<string>(new Date().toUTCString())

    setInterval(() => {
      currentDate.value = new Date().toUTCString()
    }, 1000)

    return {
      currentDate,
    }
  }
})
</script>

<style lang="scss" scoped>
.item-list {
  border: 1px solid $grey-400;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
