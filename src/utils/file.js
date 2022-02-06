/**
 * 
 * @param {File} fileInput 
 * @returns {Promise<Array<string>>}
 */
export function readTextFile(fileInput) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', event => {
      if (!event.target || !event.target.result) {
        reject('no file given')
      }

      resolve(event.target.result.split('\n').map(removeLinebreaks).filter(Boolean))
    })

    reader.readAsText(fileInput)
  })
}

/**
 * Remove `\n` and `\r` from strings.
 * @param {string} value the string value
 * @returns {string} the formatted string
 */
export function removeLinebreaks(value) {
  return value.replace(/(\r\n|\n|\r)/gm, '')
}