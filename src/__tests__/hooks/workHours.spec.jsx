import { renderHook, act } from '@testing-library/react-hooks'

import {
  WorkHoursUtilsContextProvider,
  useWorkHoursUtils
} from '../../hooks/workHours'

describe('useWorkHoursUtils hook', () => {
  it('the data should be formatted from a given input', () => {
    const { result, } = renderHook(useWorkHoursUtils, {
      wrapper: WorkHoursUtilsContextProvider
    })

    act(() => {
      result.current.handleWorkHoursFromText([
        'RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00'
      ])
    })

    expect(result.current.workHours).toEqual(
      expect.arrayContaining([
        {
          name: 'RENE',
          totalPayment: 215,
          workHoursPerWeek: [
            {
              weekDay: 'MO',
              weekPaymentValue: 30
            },
            {
              weekDay: 'TU',
              weekPaymentValue: 30
            },
            {
              weekDay: 'TH',
              weekPaymentValue: 50
            },
            {
              weekDay: 'SA',
              weekPaymentValue: 80
            },
            {
              weekDay: 'SU',
              weekPaymentValue: 25
            }
          ]
        }
      ])
    )
  })

  it('should give an error if the given workHours are not as expected', () => {
    const { result } = renderHook(useWorkHoursUtils, {
      wrapper: WorkHoursUtilsContextProvider
    })

    let error = {}

    act(() => {
      try {
        result.current.handleWorkHoursFromText(['bad format!'])
      } catch (e) {
        error = e
      }
    })

    expect(error).toHaveProperty('message', 'Bad file format!')
  })

  it('should give an error if the start time is higher than end time', () => {
    const { result } = renderHook(useWorkHoursUtils, {
      wrapper: WorkHoursUtilsContextProvider
    })

    let error = {}

    act(() => {
      try {
        result.current.handleWorkHoursFromText(['YURI=MO12:00-11:00'])
      } catch (e) {
        error = e
      }
    })

    expect(error).toHaveProperty('message', 'Start time is greater than end time (MO 12:00-11:00)')
  })
})