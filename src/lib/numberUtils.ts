const suffixes = ["th", "st", "nd", "rd"]

export function toOrdinal(number: number): string {
  const v = Math.abs(number) % 100
  const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]
  return `${number}${suffix}`
}
