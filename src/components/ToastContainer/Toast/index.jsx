import { useEffect, useState } from 'react'

import { useToast } from '../../../hooks/toast'

import InfoIcon from '../../../assets/icons/info.svg'
import AlertCircleIcon from '../../../assets/icons/alert-circle.svg'
import CheckCircleInfo from '../../../assets/icons/check-circle.svg'
import XCircleInfo from '../../../assets/icons/x-circle.svg'

import './styles.css'

const icons = {
  info: <InfoIcon width={24} height={24} />,
  error: <AlertCircleIcon width={24} height={24} />,
  success: <CheckCircleInfo width={24} height={24} />,
}

export function Toast({ message }) {
  const { removeToast } = useToast()

  const [classNames, setClassNames] = useState([])

  useEffect(() => {
    const typeClassName = message.type !== 'info'
      ? message.type === 'success'
        ? 'toast-success'
        : 'toast-error'
      : 'toast-info'

    const descriptionClassName = message.description 
      ? 'toast-with-description'
      : ''

    setClassNames([typeClassName, descriptionClassName])
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, message.id])

  return (
    <div
      className={
        ['toast-container', ...classNames]
        .filter(Boolean).join(' ')
      }
      data-testid="toast-item-component"
    >
      {icons[message.type || 'info']}

      <div data-testid="toast-item-title-description-container">
        <strong data-testid="toast-item-component-title">{message.title}</strong>
        {message.description && (
          <p data-testid="toast-item-component-description">
            {message.description}
          </p>
        )}
      </div>

      <button
        data-testid="toast-item-component-button"
        onClick={() => removeToast(message.id)} type="button"
      >
        <XCircleInfo width={20} height={20} />
      </button>
    </div>
  )
}

export default Toast
