<template>
  <div class="chart-item rounded-4 p-4">
    <TimeFrameSwitcher v-model="selectedTimeframe" />
    <apexchart ref="chart" height="350" type="line" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { generateDatesForTimeframe } from 'utils/dateGenerator'
import { generatePricesForTimeframe } from 'utils/priceGenerator'
import { Nullable } from 'utils/nullable'
import ApexCharts from 'apexcharts'
import TimeFrameSwitcher from 'components/GasTracker/TimeFrameSwitcher.vue'

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
    TimeFrameSwitcher,
  },
  setup() {
    const selectedTimeframe = ref(7)
    const chart = ref<Nullable<ApexCharts>>(null)
    const prices = generatePricesForTimeframe(selectedTimeframe.value)
    const dates = generateDatesForTimeframe(selectedTimeframe.value)

    const series = ref([
      {
        name: 'Low',
        data: prices.low.map((price, index) => [dates[index], price]),
      },
      {
        name: 'Average',
        data: prices.average.map((price, index) => [dates[index], price]),
      },
      {
        name: 'High',
        data: prices.high.map((price, index) => [dates[index], price]),
      },
    ]);

    const chartOptions = ref({
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
          formatter: function (value: number, timestamp: number) {
            return new Date(timestamp).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
            })
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
      chartOptions.value.xaxis.categories = newDates
    }

    watch(
      () => selectedTimeframe.value,
      (val) => {
        updateTimeframe(val)
      }
    )

    return {
      selectedTimeframe,
      series,
      chartOptions,
      chart,
      updateTimeframe,
    };
  },
});
</script>

<style lang="scss" scoped>
.chart-item {
  border: 1px solid $grey-400;
}
</style>