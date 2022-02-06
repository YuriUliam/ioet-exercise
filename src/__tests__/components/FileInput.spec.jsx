import { render, fireEvent } from '@testing-library/react'
import { createRef } from 'react'

import { FileInput } from '../../components/FileInput'
import '@testing-library/jest-dom/extend-expect'

describe('FileInput Component', () => {
  it('should be able to store the input file and share in the component ref', () => {    
    const inputRef = createRef(null)

    const fileInputComponent = render(
      <FileInput
        name="file-input"
        ref={inputRef}
      />
    )

    const inputFile = new File(['hello\nworld'], 'test.txt', { type: 'text/plain' })
    
    const inputElement = fileInputComponent.getByTestId('file-input-component-element')
    fireEvent.change(inputElement, { target: { files: [inputFile] }})

    expect(inputRef.current.inputFile).toBe(inputFile)

    fileInputComponent.unmount()
  })

  it('should inform the file has been loaded with the filename', () => {    
    const inputRef = createRef(null)

    const fileInputComponent = render(
      <FileInput
        name="file-input"
        ref={inputRef}
      />
    )

    const inputFile = new File(['hello\nworld'], 'test.txt', { type: 'text/plain' })
    
    const inputElement = fileInputComponent.getByTestId('file-input-component-element')
    fireEvent.change(inputElement, { target: { files: [inputFile] }})
    
    const fileInputTitle = fileInputComponent.getByTestId('file-input-component-title')
    expect(fileInputTitle).toHaveTextContent(`File loaded (${inputFile.name})`)

    fileInputComponent.unmount()
  })
})