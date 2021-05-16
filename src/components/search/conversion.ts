export const conversion = (value: number) => {
  if (value >= 1000 && value < 1000000) {
    return `${(value / 1000).toFixed(1)} тыс. просмотров`
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)} млн. просмотров`
  }
  return `${value} просмотров`
}

export const sliceText = (text: string, value: number) => {
  if (text.length <= value) {
    return text
  }
  return `${text.slice(0, value)}...`
}
