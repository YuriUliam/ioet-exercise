import { createContext, useContext, useCallback, useState } from 'react'

import { getRandomString } from '../utils/string'
import { ToastContainer } from '../components/ToastContainer'

const ToastContext = createContext({})

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([])

  const addToast = useCallback(({ title, description, type }) => {
    const id = getRandomString(10)

    const toast = {
      id,
      type,
      title,
      description,
    }

    setMessages(state => [...state, toast])
  }, [])

  const removeToast = useCallback(id => {
    setMessages(state => state.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useAuth must be used within an ToastProvider')
  }

  return context
}
