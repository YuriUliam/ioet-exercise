import React from 'react'
import Toast from './Toast'

import './styles.css'

export function ToastContainer({ messages }) {
  return (
    <div data-testid="toast-container-component" className="app-toast-container">
      {messages.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </div>
  )
}

export default ToastContainer
