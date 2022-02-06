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