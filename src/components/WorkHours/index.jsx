import {
  useRef,
  useCallback,
  useState
} from 'react'

import { useWorkHoursUtils } from '../../hooks/workHours'
import { useToast } from '../../hooks/toast'

import {
  readTextFile
} from '../../utils/file'

import { Button } from '../Button'
import { FileInput } from '../FileInput'

import './styles.css'

export function WorkHours() {
  const { handleWorkHoursFromText, workHours } = useWorkHoursUtils()
  const { addToast } = useToast()

  const fileInputRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = useCallback(async (event) => {
    event.preventDefault()
    
    const {
      inputFile,
    } = fileInputRef.current
    
    setIsLoading(true)

    try {
      if (!inputFile?.name) {
        addToast({
          title: 'Please upload a file.',
          type: 'info'
        })

        setIsLoading(false)
        return
      }

      const readableText = await readTextFile(inputFile)

      handleWorkHoursFromText(readableText)
    } catch (handleWorkHoursError) {
      const { message } = handleWorkHoursError

      addToast({
        title: 'File parsing error!',
        description: message,
        type: 'error'
      })
    }

    setIsLoading(false)
  }, [fileInputRef])

  return (
    <section className="app-container">
      <div className="app-form-container">
        <h1>ACME Company</h1>
        <h3>Calculate total hours worked</h3>
        <form data-testid="form-component" onSubmit={handleFormSubmit}>
          <FileInput
            title="Send your worked hours"
            name="work-payout-file"
            accept=".txt"
            ref={fileInputRef}
          />

          <Button loading={isLoading} type="submit">Calculate it!</Button>
        </form>
      </div>
      {workHours.length ? (
        <div className="app-result-container">
          <h3>Output:</h3>

          {workHours.map((workHoursData, index) => (
            <div key={`${index}-${workHoursData.name}`}>
              <p>The amount to pay {workHoursData.name} is: {workHoursData.totalPayment} USD</p>
            </div>
          ))}
        </div>
      ) : ''}
    </section>
  )
}