/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){3,15}$/
  return reg.test(str.trim())
}
