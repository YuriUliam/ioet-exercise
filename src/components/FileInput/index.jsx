import {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react'

import AlertCircleIcon from '../../assets/icons/alert-circle.svg'
import FileTextIcon from '../../assets/icons/file-text.svg'

import { Tooltip } from '../ToolTip'

import './styles.css'

export const FileInput = forwardRef(({
  name,
  title,
  containerStyle = {},
  ...rest 
}, ref) => {
  const inputRef = useRef(null)

  const [isFilled, setIsFilled] = useState(false)
  const [error, setError] = useState('')
  const [inputFile, setInputFile] = useState({})

  useImperativeHandle(ref, () => ({
    inputFile
  }), [inputFile])

  const handleInputFocus = useCallback(() => {
    setIsFilled(false)
    setError('')
  }, [])

  const handleChangeFileInput = useCallback((event) => {
    if (!event.target || !event.target.files.length) {
      setError('')
      setInputFile({})
      setIsFilled(false)
      return
    }

    const file = event.target.files[0]

    if (file.type != 'text/plain') {
      setInputFile({})
      setError('File must be a text!')
      return
    }

    setError('')
    setInputFile(file)
    setIsFilled(true)
  }, [])

  return (
    <label
      htmlFor={name}
      className={[
        isFilled ? 'app-input-filled' : '',
        error && 'app-input-errored',
        'app-input-container',
      ].filter(Boolean).join(' ')}
      style={containerStyle}
      data-testid="file-input-component"
    >
      <p data-testid="file-input-component-title">
        {error ? error : inputFile?.name ? `File loaded (${inputFile.name})` : title}
        {error ? (
          <Tooltip title={error}>
            <AlertCircleIcon
              color="#ff5050"
              title={error}
              width={20}
              height={20}
            />
          </Tooltip>
        ) : (
          <FileTextIcon
            color="#000000"
            width={20}
            height={20}
          />
        )}
      </p>
      <input
        id={name}
        name={name}
        type="file"
        onChange={handleChangeFileInput}
        ref={inputRef}
        data-testid="file-input-component-element"
        {...rest}
      />
    </label>
  )
})