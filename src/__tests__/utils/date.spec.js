import {
  calculateHourDifference,
  getHourRangeIndex
} from '../../utils/date'


describe('calculateHourDifference()', () => {
  it('should calculate how many hours have between two times', () => {
    const output = calculateHourDifference('06:00', '10:00')

    expect(output).toEqual('04:00')
  })

  it('should calculate how many hours and minutes have between two times', () => {
    const output = calculateHourDifference('06:30', '12:50')

    expect(output).toEqual('06:20')
  })

  it('should understand 24H style', () => {
    const output = calculateHourDifference('24:00', '13:00')

    expect(output).toEqual('13:00')
  })
})

describe('getHourRangeIndex()', () => {
  it('should get the matchable hour range', () => {
    const ranges = ['12:00', '14:00', '16:00']

    const hourRangeIndex = getHourRangeIndex(ranges, '11:00')

    expect(hourRangeIndex).toEqual(0)
  })

  it('should understand 24H style ranges', () => {
    const ranges = ['12:00', '14:00', '24:00']

    const hourRangeIndex = getHourRangeIndex(ranges, '22:00')

    expect(hourRangeIndex).toEqual(2)
  })

  it('should return an invalid index if the hour doesn\'t exist', () => {
    const ranges = ['12:00', '14:00', '24:00']

    const hourRangeIndex = getHourRangeIndex(ranges, '25:00')

    expect(hourRangeIndex).toEqual(-1)
  })
})