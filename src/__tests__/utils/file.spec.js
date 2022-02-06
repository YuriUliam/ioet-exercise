import {
  readTextFile,
  removeLinebreaks
} from '../../utils/file'

describe('readTextFile()', () => {
  it('should resolve file as data text', async () => {

    const buffer = ['Hello world!']
    const fileParameter = new File(buffer, 'textFile.txt', { type: 'text/plain' })

    const output = await readTextFile(fileParameter)

    expect(output).toEqual(buffer)
  })

  it('should break lines of text files', async () => {
    const buffer = ['Hello\nworld!']
    const fileParameter = new File(buffer, 'textFile.txt', { type: 'text/plain' })

    const [outputLine1, outputLine2] = await readTextFile(fileParameter)

    expect(outputLine1).toEqual('Hello')
    expect(outputLine2).toEqual('world!')
  })
})

describe('removeLinebreaks()', () => {
  it('should remove breakline symbols', async () => {
    const output = removeLinebreaks('Hello\r\nworld!')

    expect(output).toEqual('Helloworld!')
  })
})