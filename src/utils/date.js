/**
 * Calculates hour differences.
 * @param {string} start the start period in `HH:mm` format
 * @param {string} end  the end period in `HH:mm` format
 * @returns {string} the total hours in `HH:mm` format
 */
export function calculateHourDifference(start, end) {
  start = start.split(":")
  end = end.split(":")

  const startDate = new Date(0, 0, 0, start[0], start[1], 0)
  const endDate = new Date(0, 0, 0, end[0], end[1], 0)

  let diff = endDate.getTime() - startDate.getTime()

  let hours = Math.floor(diff / 1000 / 60 / 60)
  diff -= hours * 1000 * 60 * 60
  let minutes = Math.floor(diff / 1000 / 60)

  if (hours < 0) {
    hours = hours + 24
  }

  return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes
}

/**
 * 
 * @param {Array<string>} hourRanges 
 * @param {string} period 
 * @returns {number} the index of the hourRanges
 */
export function getHourRangeIndex(hourRanges, period) {
  const periodHour = period.split(':')[0]

  if (periodHour > '24') {
    return -1
  }

  if (periodHour === '00') {
    period = `24:${period.split(':')[1]}`
  }

  for (let i = 0; i < hourRanges.length; i++) {
    const [hours, minutes] = hourRanges[i].split(':')
    const [periodHours, periodMinutes] = period.split(':')

    const date1 = new Date(0, 0, 0, hours, minutes, 0).getTime()
    const date2 = new Date(0, 0, 0, periodHours, periodMinutes, 0).getTime()

    if (date1 >= date2) {
      return i
    }
  }

  return 0
}