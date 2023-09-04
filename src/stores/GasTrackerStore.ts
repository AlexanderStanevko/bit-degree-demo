import { defineStore } from 'pinia'
import { GasTrackerListItem, PriceIndicators } from 'custom-types'
import { GasTrackerMockData } from 'mock-data'
import { Nullable } from 'utils/nullable'
import { generateDatesForTimeframe } from 'utils/dateGenerator'
import { generatePricesForTimeframe } from 'utils/priceGenerator'

type GasTrackerState = {
  itemList: GasTrackerListItem[],
  prices: Nullable<PriceIndicators>,
  dates: number[],
}

const LOADING_TIME = 500

export const useGasTrackerStore = defineStore({
  id: 'GasTrackerStore',

  state: () => ({
    itemList: [],
    prices: null,
    dates: [],
  } as GasTrackerState),

  getters: {
    getListOfItems: (state) => {
      return state.itemList || []
    },
    getPrices: (state) => {
      return state.prices || null
    },
    getDates: (state) => {
      return state.dates || []
    },
  },
  actions: {
    async receiveGasTrackerInfo() {
      const data = await new Promise<GasTrackerListItem[]>(resolve => {
        setTimeout(() => {
          resolve(GasTrackerMockData());
        }, LOADING_TIME)
      })

      if (data.length) {
        this.itemList = data
      }
    },

    async updateChartInfo(timeframe: number) {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

      await delay(LOADING_TIME)

      const [prices, dates] = await Promise.all([
        new Promise<PriceIndicators>(resolve => {
          resolve(generatePricesForTimeframe(timeframe, true))
        }),
        new Promise<number[]>(resolve => {
          resolve(generateDatesForTimeframe(timeframe))
        })
      ])

      if (prices && dates.length) {
        this.prices = prices
        this.dates = dates
      }
    },

    clear() {
      this.itemList = []
      this.prices = null
      this.dates = []
    },
  },
})
