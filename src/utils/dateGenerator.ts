export const generateDatesForTimeframe = (timeframe: number): number[] => {
  const dates: number[] = []
  const today = new Date()

  for (let i = 0; i < timeframe; i++) {
    const newDate = new Date(today);
    newDate.setDate(today.getDate() - i)
    dates.unshift(newDate.getTime())
  }

  return dates
}
