import { render, fireEvent, screen } from '@testing-library/react'

import { App } from '../App'

import '@testing-library/jest-dom/extend-expect'

describe('WorkHours Component', () => {
  it('should pop an info toast with "Please upload a file." if no file is given', () => {
    const app = render(<App />)
    const formElement = app.getByTestId('form-component')
    fireEvent.submit(formElement)

    const tooltipContainer = app.getAllByTestId('toast-item-component')
    const tooltipContainerTitle = app.getByTestId('toast-item-component-title')

    expect(tooltipContainer.length).toEqual(1)
    expect(tooltipContainerTitle).toHaveTextContent('Please upload a file.')

    app.unmount()
  })
})