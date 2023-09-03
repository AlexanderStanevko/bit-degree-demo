import { PriceIndicators } from 'custom-types'

export const generatePricesForTimeframe = (timeframe: number): PriceIndicators => {
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

  return prices;
}
