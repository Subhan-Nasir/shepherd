/**
 * Checks if `value` is classified as an `Element`.
 * @param {*} value The param to check if it is an Element
 * @returns {value is Element}
 */
export function isElement(value) {
  return value instanceof Element;
}

/**
 * Checks if `value` is classified as an `HTMLElement`.
 * @param {*} value The param to check if it is an HTMLElement
 * @returns {value is HTMLElement}
 */
export function isHTMLElement(value) {
  return value instanceof HTMLElement;
}

/**
 * Checks if `value` is classified as a `Function` object.
 * @param {*} value The param to check if it is a function
 * @returns {value is Function}
 */
export function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Checks if `value` is classified as a `String` object.
 * @param {*} value The param to check if it is a string
 * @returns {value is string}
 */
export function isString(value) {
  return typeof value === 'string';
}

/**
 * Checks if `value` is undefined.
 * @param {*} value The param to check if it is undefined
 * @returns {value is undefined}
 */
export function isUndefined(value) {
  return value === undefined;
}
