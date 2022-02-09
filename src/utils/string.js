/**
 * Generate a random string which can be used as an id.
 * @param {number} length 
 * @returns {string}
 */
export function getRandomString(length) {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ''
  for ( var i = 0; i < length; i++ ) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  return result
}

/**
 * Parse a string to get individual values from a Regular Expression.
 * @param {string} stringValue the string value to be parsed
 * @param {RegExp} regexValue the RegEx which will be applied.
 * @returns {Array<string>} An array with values selected from the RegEx.
 */
export function parseStringWithRegEx(stringValue, regexValue) {
  if (!regexValue.test(stringValue)) return []

  const parsedString = stringValue
    .replace(regexValue, (_regex, ...args) => args.join(' '))
    .split(/\s/)

  return parsedString.slice(0, parsedString.length - 2)
}