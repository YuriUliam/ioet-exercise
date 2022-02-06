import {
  getRandomString
} from '../../utils/string'


describe('getRandomString()', () => {
  it('should create a string with a given length', async () => {
    const output = getRandomString(10)

    expect(output.length).toEqual(10)
  })
})