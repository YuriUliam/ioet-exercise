import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

import XCircleInfo from '../../assets/icons/x-circle.svg'

import './styles.css'

export const Modal = forwardRef(({
  title,
  onModalClose = () => {},
  children,
  contentClassName = '',
  modalClassName = '',
  ...rest
}, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    onModalClose()
  }, [])

  useImperativeHandle(ref, () => ({
    openModal
  }))

  return (
    <>
      {isModalOpen && ( 
        <div className="app-modal-container" {...rest}>
          <div className={
              ['app-modal', modalClassName]
                .filter(Boolean)
                .join(' ')
            }>
            <button data-testid="modal-close-button" onClick={() => closeModal()}>
              <XCircleInfo width={24} height={24} />
            </button>
            <h2 data-testid="modal-title">{title}</h2>
            <div
              data-testid="modal-content"
              className={
                ['app-modal-content', contentClassName]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
})