import { render, fireEvent, act } from '@testing-library/react'
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

    act(() => {
      fireEvent.change(inputElement, { target: { files: [inputFile] }})
    })

    expect(inputRef.current.inputFile).toBe(inputFile)

    act(() => {
      fireEvent.change(inputElement, { target: { files: [] }})
    })

    expect(inputRef.current.inputFile).toEqual({})
  })

  it('should inform title correctly', () => {    
    const inputRef = createRef(null)

    const fileInputTitle = 'Insert a file'

    const fileInputComponent = render(
      <FileInput
        name="file-input"
        title={fileInputTitle}
        ref={inputRef}
      />
    )

    const inputFile = new File(
      ['RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00'],
      'test.txt',
      {type: 'text/plain' }
    )
    
    const inputElement = fileInputComponent.getByTestId('file-input-component-element')
    fireEvent.change(inputElement, { target: { files: [inputFile] }})
    
    const fileInputTitleElement = fileInputComponent.getByTestId('file-input-component-title')
    expect(fileInputTitleElement).toHaveTextContent(`File loaded (${inputFile.name})`)

    act(() => {
      fireEvent.change(inputElement, { target: { files: [] }})
    })

    expect(fileInputTitleElement).toHaveTextContent(fileInputTitle)
  })

  it('should inform an error if the file is not text', () => {    
    const inputRef = createRef(null)

    const fileInputComponent = render(
      <FileInput
        name="file-input"
        ref={inputRef}
      />
    )

    const inputFile = new File(['mypng'], 'test.png', { type: 'image/png' })
    
    const inputElement = fileInputComponent.getByTestId('file-input-component-element')
    
    act(() => {
      fireEvent.change(inputElement, { target: { files: [inputFile] }})
    })
    
    const fileInputTitle = fileInputComponent.getByTestId('file-input-component-title')
    expect(fileInputTitle).toHaveTextContent('File must be a text!')
  })
})