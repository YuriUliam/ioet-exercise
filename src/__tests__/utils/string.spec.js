import {
  getRandomString,
  parseStringWithRegEx
} from '../../utils/string'


describe('getRandomString()', () => {
  it('should create a string with a given length', () => {
    const output = getRandomString(10)

    expect(output.length).toEqual(10)
  })

  it('should generate different strings', () => {
    const output1 = getRandomString(10)
    const output2 = getRandomString(10)
    const output3 = getRandomString(10)

    expect(output1).not.toEqual(output2)
    expect(output1).not.toEqual(output3)
    expect(output2).not.toEqual(output3)
  })
})

describe('parseStringWithRegEx()', () => {
  it('should parse a string from a regular expression correctly', () => {
    const testString = '123.456.789-12'
    const testRegEx = /(\d{3}).(\d{3}).(\d{3})-(\d{2})/

    const parsedString = parseStringWithRegEx(testString, testRegEx)

    expect(parsedString.length).toEqual(4)

    const [part1, part2, part3, part4] = parsedString

    expect(part1).toEqual('123')
    expect(part2).toEqual('456')
    expect(part3).toEqual('789')
    expect(part4).toEqual('12')
  })
})