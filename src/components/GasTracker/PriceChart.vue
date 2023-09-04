<template>
  <div class="chart-item rounded-4 p-4">
    <TimeFrameSwitcher v-model="selectedTimeframe" />
    <apexchart ref="chart" height="350" type="line" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts">
import {
  PropType,
  defineComponent,
  ref,
  watch,
  computed,
} from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { generateDatesForTimeframe } from 'utils/dateGenerator'
import { generatePricesForTimeframe } from 'utils/priceGenerator'
import { Nullable } from 'utils/nullable'
import ApexCharts from 'apexcharts'
import { ApexOptions } from 'apexcharts'
import TimeFrameSwitcher from 'components/GasTracker/TimeFrameSwitcher.vue'
import { PriceIndicators } from 'custom-types'

type SeriesItem = {
  name: 'Low' | 'Average' | 'High';
  data: [Number, Number][];
}

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
    TimeFrameSwitcher,
  },
  props: {
    modelValue: {
      type: Number,
      default: 7,
    },
    chartPrices: {
      type: Object as PropType<Nullable<PriceIndicators>>,
      default: () => { },
    },
    chartDates: {
      type: Array as PropType<Number[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedTimeframe = computed({
      get: () => props.modelValue,
      set: (newVal) => {
        updateTimeframe(newVal)
        emit('update:modelValue', Number(newVal))
      },
    })
    const series = ref<SeriesItem[]>([])
    const chart = ref<Nullable<ApexCharts>>(null)

    const chartOptions = ref<Nullable<ApexOptions>>({
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        width: [1, 1, 1],
      },
      colors: ['#21BA45', '#0784c3', '#B00020'],
      xaxis: {
        type: 'datetime',
        labels: {
          formatter: function (value: string, timestamp?: number) {
            if (timestamp) {
              return new Date(timestamp).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
              })
            }
            return value
          },
        },
      },
    })

    const updateTimeframe = (val: number) => {
      const newPrices = generatePricesForTimeframe(Number(val))
      const newDates = generateDatesForTimeframe(Number(val))
      series.value[0].data = newPrices.low.map((price, index) => [newDates[index], price])
      series.value[1].data = newPrices.average.map((price, index) => [newDates[index], price])
      series.value[2].data = newPrices.high.map((price, index) => [newDates[index], price])
      if (chartOptions.value && chartOptions.value.xaxis) {
        chartOptions.value.xaxis.categories = newDates
      }
    }

    watch(
      [
        () => props.chartPrices,
        () => props.chartDates,
      ],
      ([newPrices, newDates]) => {
        if (newPrices && newDates) {
          series.value = [
            {
              name: 'Low',
              data: newPrices.low.map((price, index) => [newDates[index], price]),
            },
            {
              name: 'Average',
              data: newPrices.average.map((price, index) => [newDates[index], price]),
            },
            {
              name: 'High',
              data: newPrices.high.map((price, index) => [newDates[index], price]),
            },
          ]
        }
      },
      { immediate: true },
    )

    return {
      selectedTimeframe,
      series,
      chartOptions,
      chart,
      updateTimeframe,
    }
  },
})
</script>

<style lang="scss" scoped>
.chart-item {
  border: 1px solid $grey-400;
}
</style>