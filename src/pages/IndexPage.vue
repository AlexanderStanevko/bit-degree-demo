<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <template v-if="isLoading">
        <AppSpinner size="5rem" />
      </template>
      <template v-else>
        <div class="d-flex justify-content-center justify-content-lg-start w-100 mb-3">
          <NetworkSwitcher v-model="initialNetwork" :networks="networks" />
        </div>
        <div class="d-flex flex-column flex-lg-row justify-content-between w-100 gap__10">
          <div class="col-12 col-lg-6 mb-4 mb-lg-0">
            <List :list="gasTrackerList" :countdown="countdown" />
          </div>
          <div class="col-12 col-lg-6 ml-lg-4">
            <PriceChart />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  onUnmounted,
  watch,
} from 'vue'
import AppSpinner from 'components/App/AppSpinner.vue'
import { useGasTrackerStore } from 'stores/GasTrackerStore'
import List from 'components/GasTracker/List.vue'
import PriceChart from 'components/GasTracker/PriceChart.vue'
import NetworkSwitcher from 'components/GasTracker/NetworkSwitcher.vue'
import { Nullable } from 'utils/nullable'
import { NetworkItem } from 'custom-types'

const COUNT_DOWN_VALUE = 15
const INTERVAL_TIME = 1000
type TimerType = ReturnType<typeof setInterval>
let timer: Nullable<TimerType> = null

export default defineComponent({
  name: "IndexPage",
  components: {
    AppSpinner,
    List,
    PriceChart,
    NetworkSwitcher,
  },
  setup() {
    const gasTrackerStore = useGasTrackerStore()
    const isLoading = ref<boolean>(false)
    const isFirstLoad = ref<boolean>(true)
    const countdown = ref<number>(15)

    const networks = ref<NetworkItem[]>([
      { value: 'eth', label: 'Ethereum', id: '1' },
      { value: 'bsc', label: 'Binance Smart Chain', id: '2' },
      { value: 'plg', label: 'Polygon', id: '3' },
    ])
    const initialNetwork = ref<NetworkItem>(networks.value[0])

    const gasTrackerList = computed(() => gasTrackerStore.getListOfItems || [])

    const receiveGasTrackerInfo = async () => {
      try {
        if (isFirstLoad.value) {
          isLoading.value = true;
        }

        await gasTrackerStore.receiveGasTrackerInfo();
      } catch (e) {
        console.log(e);
      } finally {
        if (isFirstLoad.value) {
          isLoading.value = false;
          isFirstLoad.value = false;
        }
      }
    };

    const updateCountdown = async () => {
      countdown.value--
      if (countdown.value === 0) {
        await receiveGasTrackerInfo()
        countdown.value = COUNT_DOWN_VALUE
      }
    }

    watch(
      () => initialNetwork.value,
      async () => {
        countdown.value = COUNT_DOWN_VALUE
        await receiveGasTrackerInfo()
      }
    )

    onMounted(async () => {
      timer = setInterval(updateCountdown, INTERVAL_TIME)
      await receiveGasTrackerInfo()
    })

    onUnmounted(() => {
      if (timer !== undefined) {
        clearInterval(timer as TimerType)
      }
    })

    return {
      isLoading,
      gasTrackerList,
      countdown,
      initialNetwork,
      networks,
    }
  },
})
</script>