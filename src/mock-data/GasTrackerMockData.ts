import { GasTrackerListItem } from 'custom-types'
import { getRandomInt, getRandomFloat } from 'utils/generateRandomDigits'

const generateGasTrackerItem = (title: string): GasTrackerListItem => {
  return {
    title: title,
    status: getRandomInt(1, 15),
    base: getRandomInt(1, 15),
    priority: getRandomInt(1, 10),
    estimatedDuration: getRandomInt(30, 180),
    price: getRandomFloat(0.1, 0.99, 2),
    statusDescription: 'gwei',
  };
}

export const GasTrackerMockData = (): GasTrackerListItem[] => [
  generateGasTrackerItem('Low'),
  generateGasTrackerItem('Average'),
  generateGasTrackerItem('High'),
];
