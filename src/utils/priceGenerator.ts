import { PriceIndicators } from 'custom-types'

const priceDataCache: Record<number, PriceIndicators> = {}

export const generatePricesForTimeframe = (timeframe: number, forceUpdate: boolean = false): PriceIndicators => {
  if (!forceUpdate && priceDataCache[timeframe]) {
    return priceDataCache[timeframe]
  }

  const prices: PriceIndicators = {
    low: [],
    average: [],
    high: [],
  };

  for (let i = 0; i < timeframe; i++) {
    prices.low.push(parseFloat((Math.random() * 50).toFixed(2)))
    prices.average.push(parseFloat((Math.random() * 50 + 50).toFixed(2)))
    prices.high.push(parseFloat((Math.random() * 50 + 100).toFixed(2)))
  }
  priceDataCache[timeframe] = prices

  return prices
}
