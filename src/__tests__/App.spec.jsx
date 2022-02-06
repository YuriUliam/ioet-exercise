import { render, fireEvent, act, screen } from '@testing-library/react'
import { waitFor } from '@testing-library/react'

import { App } from '../App'

import '@testing-library/jest-dom/extend-expect'

const wait = async (ms) => await waitFor(() => new Promise(resolve => setTimeout(resolve, ms)))

describe('WorkHours Component', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('should calculate and output the hours from a given file', async () => {
    const inputFile = new File(
      ['RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00'],
      'test.txt',
      { type: 'text/plain' }
    )

    const inputElement = screen.getByTestId('file-input-component-element')
    const formElement = screen.getByTestId('work-hours-form')

    act(() => {
      fireEvent.change(inputElement, { target: { files: [inputFile] }})
    })

    act(() => {
      fireEvent.submit(formElement)
    })

    await wait(200)

    const workHoursItem = screen.getByTestId('work-hours-item')

    expect(workHoursItem).toHaveTextContent('The amount to pay RENE is: 215 USD')
  })

  it('should pop an info toast with "Please upload a file." if no file is given', () => {
    const formElement = screen.getByTestId('work-hours-form')

    act(() => {
      fireEvent.submit(formElement)
    })

    const tooltipContainer = screen.getByTestId('toast-item-component')
    const tooltipContainerTitle = screen.getByTestId('toast-item-component-title')

    expect(tooltipContainer).toHaveClass('toast-info')
    expect(tooltipContainerTitle).toHaveTextContent('Please upload a file.')
  })

  it('should pop an error toast if a bad formatted file is given', async () => {
    const inputFile = new File(
      ['bad file format!'],
      'test.txt',
      { type: 'text/plain' }
    )

    const inputElement = screen.getByTestId('file-input-component-element')
    const formElement = screen.getByTestId('work-hours-form')

    act(() => {
      fireEvent.change(inputElement, { target: { files: [inputFile] }})
    })

    act(() => {
      fireEvent.submit(formElement)
    })

    await wait(200)

    const tooltipContainer = screen.getByTestId('toast-item-component')
    const tooltipContainerTitle = screen.getByTestId('toast-item-component-title')
    const tooltipContainerDescription = screen.getByTestId('toast-item-component-description')

    expect(tooltipContainer).toHaveClass('toast-error')
    expect(tooltipContainerTitle).toHaveTextContent('File parsing error!')
    expect(tooltipContainerDescription).toHaveTextContent('Bad file format!')
  })

  it('should pop an error toast if there are start times greater than end times', async () => {
    const inputFile = new File(
      ['STEVE=MO19:00-18:00'],
      'test.txt',
      { type: 'text/plain' }
    )

    const inputElement = screen.getByTestId('file-input-component-element')
    const formElement = screen.getByTestId('work-hours-form')

    act(() => {
      fireEvent.change(inputElement, { target: { files: [inputFile] }})
    })

    act(() => {
      fireEvent.submit(formElement)
    })

    await wait(200)

    const tooltipContainer = screen.getByTestId('toast-item-component')
    const tooltipContainerTitle = screen.getByTestId('toast-item-component-title')
    const tooltipContainerDescription = screen.getByTestId('toast-item-component-description')

    expect(tooltipContainer).toHaveClass('toast-error')
    expect(tooltipContainerTitle).toHaveTextContent('File parsing error!')
    expect(tooltipContainerDescription).toHaveTextContent('Start time is greater than end time (MO 19:00-18:00)')
  })
})