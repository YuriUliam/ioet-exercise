import {
  createContext, 
  useContext,
  useCallback,
  useState
} from 'react'

import {
  calculateHourDifference,
  getHourRangeIndex
} from '../utils/date'

const WorkHoursUtilsContext = createContext({})

export function WorkHoursUtilsContextProvider({ children }) {
  // I found easier to create objects for payment rules and the acronyms
  // to easily edit the business logic if needed.
  const weekDayAcronyms = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
  const paymentRules = [{
    includedWeekDays: weekDayAcronyms.slice(0, 5),
    paymentRangeValues: [25, 15, 20],
    paymentRanges: ['09:00', '18:00', '24:00']
  }, {
    includedWeekDays: weekDayAcronyms.slice(5, 7),
    paymentRangeValues: [30, 20, 25],
    paymentRanges: ['09:00', '18:00', '24:00']
  }]

  const workHourRegex = /(\w{2})(\d{2}):(\d{2})-(\d{2}):(\d{2})/

  const [workHours, setWorkHours] = useState([])

  /** Handle the parsed file as a working hours register file. */
  const handleWorkHoursFromText = useCallback(parsedFile => {
    const result = parsedFile.map(handleTotalWorkedHours)

    setWorkHours(result)
  }, [])

  /** Handle the total hours worked in the week. */
  const handleTotalWorkedHours = useCallback(resultLine => {
    const workHoursData = resultLine
      .slice(resultLine.indexOf('=') + 1)
      .split(',') // I will have an array of WWHH:mm-HH:mm
      .filter(workHourLine => workHourRegex.test(workHourLine)) // testing if the register is not badly formatted.
      .map(handleWorkHoursPerDay)

    if (!workHoursData.length || resultLine.indexOf('=') < 0) {
      throw new Error('Bad file format!')
    }

    const name = resultLine.slice(0, resultLine.indexOf('='))

    return {
      name: name,
      workHoursPerWeek: workHoursData,
      totalPayment: workHoursData.reduce((acc, value) => acc + value.weekPaymentValue, 0)
    }
  }, [])

  /** Handle the hours worked from a single day of the week. */
  const handleWorkHoursPerDay = useCallback(workHoursLineData => {
    // Easily extracting the data required by using the RegEx.
    const [weekDay, startHour, startMin, endHour, endMin] = workHoursLineData
      .replace(workHourRegex, (_regex, ...args) => args.join(' '))
      .split(/\s/)
      .slice(0, 5)

    const {
      paymentRangeValues,
      paymentRanges
    } = paymentRules.find(rule => rule.includedWeekDays.includes(weekDay))

    const date1 = new Date(0, 0, 0, startHour, startMin, 0).getTime()
    const date2 = new Date(0, 0, 0, endHour, endMin, 0).getTime()

    const startTime = `${startHour}:${startMin}`
    const startTimeRangeIndex = getHourRangeIndex(paymentRanges, startTime)
    const endTime = `${endHour}:${endMin}`
    const endTimeRangeIndex = getHourRangeIndex(paymentRanges, endTime)

    let weekPaymentValue = 0

    if (date1 - date2 > 0) {
      throw new Error(`Start time is greater than end time (${weekDay} ${startTime}-${endTime})`)
    }

    // If the reported periods are different
    // it will intersect both to pay the amount due.
    if (startTimeRangeIndex !== endTimeRangeIndex) {
      for (let i = startTimeRangeIndex - 1; i < endTimeRangeIndex; i++) {
        const time1 = i < startTimeRangeIndex ? startTime : paymentRanges[i]
        const time2 = i + 1 === endTimeRangeIndex ? endTime : paymentRanges[i < 0 ? 0 : i+1]

        const paymentValue = paymentRangeValues[i + 1 < endTimeRangeIndex ? i + 1 : endTimeRangeIndex]

        const [firstPeriodHours, firstPeriodMinutes] = calculateHourDifference(
          time1,
          time2
        ).split(':')

        weekPaymentValue += paymentValue * firstPeriodHours
        weekPaymentValue += paymentValue * (firstPeriodMinutes / 60)
      }
    } else {
      const paymentValue = paymentRangeValues[startTimeRangeIndex]

      const [hours, minutes] = calculateHourDifference(
        startTime,
        endTime
      ).split(':')

      weekPaymentValue += paymentValue * hours
      weekPaymentValue += paymentValue * (minutes / 60)
    }

    return {
      weekDay,
      weekPaymentValue
    }
  }, [])

  return (
    <WorkHoursUtilsContext.Provider value={{
      workHours,
      handleWorkHoursFromText
    }}>
      {children}
    </WorkHoursUtilsContext.Provider>
  )
}

export function useWorkHoursUtils() {
  const workHoursUtilsContext = useContext(WorkHoursUtilsContext)

  if (workHoursUtilsContext == null) {
    throw new Error('Component must be wrapped by WorkHoursUtilsContext')
  }

  return workHoursUtilsContext
}