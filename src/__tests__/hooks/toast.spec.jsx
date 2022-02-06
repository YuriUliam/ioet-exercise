import { useEffect } from 'react'
import { render } from '@testing-library/react'

import {
  useToast,
  ToastProvider
} from '../../hooks/toast'

import '@testing-library/jest-dom/extend-expect'

function CreateToastComponent({ children, ...rest }) {
  const { addToast } = useToast()

  useEffect(() => {
    addToast(rest)
  }, [])

  return <div>Hello!</div>
}

const renderWithToastProvider = (componentChildren) => render(
  <ToastProvider>{componentChildren}</ToastProvider>
)

describe('useToast hook', () => {
  it('should be rendered as requested', () => {
    const toastData = {
      title: 'My toast',
      description: 'Hello world!',
      type: 'info'
    }

    const app = renderWithToastProvider(<CreateToastComponent {...toastData} />)

    const tooltipContainer = app.getByTestId('toast-item-component')
    const tooltipContainerTitle = app.getByTestId('toast-item-component-title')
    const tooltipContainerDescription = app.getByTestId('toast-item-component-description')

    expect(tooltipContainer).toHaveClass('toast-info')
    expect(tooltipContainerTitle).toHaveTextContent(toastData.title)
    expect(tooltipContainerDescription).toHaveTextContent(toastData.description)
  })

  it('should be able to render a toast without description', () => {
    const toastData = {
      title: 'My toast',
      type: 'info'
    }

    const app = renderWithToastProvider(<CreateToastComponent {...toastData} />)

    const tooltipContainer = app.getByTestId('toast-item-component')
    const tooltipContainerTitle = app.getByTestId('toast-item-component-title')
    const tooltipContainerTitleDescriptionContainer = app.getByTestId('toast-item-title-description-container')

    expect(tooltipContainer).toHaveClass('toast-info')
    expect(tooltipContainerTitle).toHaveTextContent(toastData.title)
    expect(tooltipContainerTitleDescriptionContainer.childElementCount).toBe(1)
  })

  it('should be able to render multiple toasts', () => {
    const toastData = [
      {
        title: 'My toast 1',
        description: 'Hello world!',
        type: 'info'
      },
      {
        title: 'My toast 2',
        description: 'Hello world!',
        type: 'error'
      },
      {
        title: 'My toast 3',
        description: 'Hello world!',
        type: 'success'
      }
    ]

    const app = renderWithToastProvider(
      <>
        <CreateToastComponent {...toastData[0]} />
        <CreateToastComponent {...toastData[1]} />
        <CreateToastComponent {...toastData[2]} />
      </>
    )

    const tooltipContainers = app.getAllByTestId('toast-item-component')
    const tooltipContainerTitles = app.getAllByTestId('toast-item-component-title')
    const tooltipContainerDescriptions = app.getAllByTestId('toast-item-component-description')

    for (let i = 0; i < toastData.length; i++) {
      expect(tooltipContainers[i]).toHaveClass(`toast-${toastData[i].type}`)
      expect(tooltipContainerTitles[i]).toHaveTextContent(toastData[i].title)
      expect(tooltipContainerDescriptions[i]).toHaveTextContent(toastData[i].description)
    }
  })
})