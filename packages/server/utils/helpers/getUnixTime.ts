export function getUnixTime(date: Date | number): number{
  return Math.floor(Number(date) / 1000)
}
