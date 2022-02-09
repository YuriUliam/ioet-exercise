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
import { Modal } from '../Modal'
import { Tooltip } from '../Tooltip'

import HelpCircleIcon from '../../assets/icons/help-circle.svg'

import './styles.css'

export function WorkHours() {
  const { handleWorkHoursFromText, workHours } = useWorkHoursUtils()
  const { addToast } = useToast()

  const fileInputRef = useRef(null)
  const modalRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)

  const handleOpenModal = useCallback(() => {
    modalRef.current.openModal()
  }, [modalRef])

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
      <Modal
        title="My modal"
        ref={modalRef}
        modalClassName="work-hours-modal"
        contentClassName="work-hours-modal-content"
      >
        <p>• You must submit a text (.txt) file;</p>
        <p>• Your file must follow this pattern:</p>
        <p class="modal-emphasis">[name]=[weekday-acronym][HH:mm]-[HH:mm],[weekday-acronym][HH:mm]-[HH:mm]</p>
      </Modal>

      <div className="app-form-container">
        <h1>ACME Company</h1>
        <h3>Calculate total hours worked</h3>
        <form data-testid="work-hours-form" onSubmit={handleFormSubmit}>
          <div className="form-input-with-tooltip-container">
            <FileInput
              title="Send your worked hours"
              name="work-payout-file"
              accept=".txt"
              ref={fileInputRef}
            />

            <Tooltip onClick={handleOpenModal} title="Click me to help!">
              <HelpCircleIcon
                width={24}
                height={24}
              />
            </Tooltip>
          </div>

          <Button loading={isLoading} type="submit">Calculate it!</Button>
        </form>
      </div>
      {workHours.length ? (
        <div data-testid="work-hours-output" className="app-result-container">
          <h3>Output:</h3>

          {workHours.map((workHoursData, index) => (
            <div data-testid="work-hours-item" key={`${index}-${workHoursData.name}`}>
              <p>The amount to pay {workHoursData.name} is: {workHoursData.totalPayment} USD</p>
            </div>
          ))}
        </div>
      ) : ''}
    </section>
  )
}