import { render, fireEvent, act } from '@testing-library/react'

import { createRef } from 'react'
import { Modal } from '../../components/Modal'
import '@testing-library/jest-dom/extend-expect'

describe('Modal Component', () => {
  it('should be able to render when openModal is called', () => {
    const modalRef = createRef()
    const modalTitle = 'My Modal'
    const modalContent = 'My Content'

    const { getByTestId, container } = render(
      <Modal
        title={modalTitle}
        ref={modalRef}
      >
        {modalContent}
      </Modal>
    )

    expect(modalRef.current).toHaveProperty('openModal')

    act(() => {
      modalRef.current.openModal()
    })

    const titleElement = getByTestId('modal-title')
    const contentElement = getByTestId('modal-content')

    expect(titleElement).toHaveTextContent(modalTitle)
    expect(contentElement).toHaveTextContent(modalContent)

    const closeButtonElement = getByTestId('modal-close-button')

    act(() => {
      fireEvent.click(closeButtonElement)
    })

    expect(container).toBeEmptyDOMElement()
  })
})