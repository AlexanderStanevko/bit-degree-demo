import { defineStore } from 'pinia'
import { GasTrackerListItem } from 'custom-types'
import { GasTrackerMockData } from 'mock-data'

type GasTrackerState = {
  itemList: GasTrackerListItem[]
}

export const useGasTrackerStore = defineStore({
  id: 'GasTrackerStore',

  state: () => ({
    itemList: [],
  } as GasTrackerState),

  getters: {
    getListOfItems: (state) => {
      return state.itemList || []
    },
  },
  actions: {
    async receiveGasTrackerInfo() {
      const data = await new Promise<GasTrackerListItem[]>(resolve => {
        setTimeout(() => {
          resolve(GasTrackerMockData());
        }, 1000);
      });

      if (data.length) {
        this.itemList = data
      }
      
    },

    clear() {
      this.itemList = []
    },
  },
})
