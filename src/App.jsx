import { AppProvider } from './hooks'

import { WorkHours } from './components/WorkHours'

import './styles/global.css'

export function App() {

  return (
    <AppProvider>
      <WorkHours />
    </AppProvider>
  )
}