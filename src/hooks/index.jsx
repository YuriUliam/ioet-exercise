import { ToastProvider } from './toast'
import { WorkHoursUtilsContextProvider } from './workHours'

export function AppProvider({ children }) {
  return (
    <ToastProvider>
      <WorkHoursUtilsContextProvider>
        {children}
      </WorkHoursUtilsContextProvider>
    </ToastProvider>
  )
}