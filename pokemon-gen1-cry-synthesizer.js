(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pokemon-gen1-cry-synthesizer"] = factory();
	else
		root["pokemon-gen1-cry-synthesizer"] = factory();
})(typeof self !== 'undefined' ? self : this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else // removed by dead control flow
{}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof __webpack_require__.g&&__webpack_require__.g.global===__webpack_require__.g?__webpack_require__.g:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./src/CryGenerator.ts":
/*!*****************************!*\
  !*** ./src/CryGenerator.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var CryGenerator = /** @class */ (function () {
    function CryGenerator() {
        this.sourceSampleRate = 1048576;
        this.samplesPerFrame = 17556;
        this.noiseBuffer = 0x7FFF;
    }
    CryGenerator.prototype.init = function () {
        if (!this.audioContext)
            this.audioContext = new AudioContext();
    };
    CryGenerator.prototype.generate = function (cryType, pitch, length) {
        var pulse1 = this.generateSquareWave(cryType.pulse1, pitch, length);
        var pulse2 = this.generateSquareWave(cryType.pulse2, pitch, length);
        // due to quirk with noise channel: find shortest channel length
        // at this point, noise will revert pitch shift effect
        var pulse1Length = 0;
        var pulse2Length = 0;
        var leftovers = 0;
        for (var _i = 0, _a = cryType.pulse1; _i < _a.length; _i++) {
            var command = _a[_i];
            if (command && command.note) {
                var subframes = ((length + 0x100) * (command.note[0] + 1)) + leftovers;
                var thisnote = this.samplesPerFrame * (subframes >> 8);
                leftovers = subframes & 0xFF;
                pulse1Length += thisnote;
            }
        }
        leftovers = 0;
        for (var _b = 0, _c = cryType.pulse2; _b < _c.length; _b++) {
            var command = _c[_b];
            if (command && command.note) {
                var subframes = ((length + 0x100) * (command.note[0] + 1)) + leftovers;
                var thisnote = this.samplesPerFrame * (subframes >> 8);
                leftovers = subframes & 0xFF;
                pulse2Length += thisnote;
            }
        }
        var cutoff = Math.max(pulse1Length, pulse2Length) - this.samplesPerFrame;
        var noise = this.generateNoise(cryType.noise, pitch, 0, cutoff);
        return {
            pulse1: pulse1,
            pulse2: pulse2,
            noise: noise
        };
    };
    CryGenerator.prototype.sample = function (bin, volume) {
        return (((2 * bin) - 1) * ((volume * -1) / 0x10));
    };
    CryGenerator.prototype.calcDuty = function (duty, periodCount) {
        switch (duty) {
            case 0: return periodCount >= 4 / 8 && periodCount < 5 / 8;
            case 1: return periodCount >= 4 / 8 && periodCount < 6 / 8;
            case 2: return periodCount >= 2 / 8 && periodCount < 6 / 8;
            case 3: return periodCount < 4 / 8 || periodCount >= 6 / 8;
        }
        return false;
    };
    CryGenerator.prototype.generateSquareWave = function (commands, pitch, length) {
        var duty = 0;
        var data = [];
        var commandIndex = 0;
        var sampleIndex = 0;
        var periodCount = 0;
        var leftovers = 0;
        while (commandIndex < commands.length) {
            var command = commands[commandIndex];
            var isLastCommand = commandIndex === commands.length - 1;
            if (typeof command.duty !== "undefined") {
                duty = command.duty;
            }
            else if (command.note) {
                var _a = command.note, numberOfSamplesPerNote = _a[0], volume = _a[1], volumeFade = _a[2], numberOfSamplesPerPeriod = _a[3];
                // number of samples for this single note
                var subframes = ((length + 0x100) *
                    (numberOfSamplesPerNote + 1)) + leftovers;
                var sampleCount = this.samplesPerFrame * (subframes >> 8);
                leftovers = subframes & 0xFF;
                // number of samples for a single period of the note's pitch
                var period = this.sourceSampleRate * (2048 - ((numberOfSamplesPerPeriod +
                    pitch) & 0x7FF)) / 131072;
                // apply this note
                for (var index = 0; index < 2500000 && (index < sampleCount || (isLastCommand && volume > 0)); index++) {
                    var enabled = this.calcDuty(duty & 3, periodCount) ?
                        1 :
                        0;
                    data[sampleIndex] = this.sample(enabled, volume);
                    periodCount += 1 / period;
                    periodCount = periodCount >= 1 ?
                        periodCount - 1 :
                        periodCount;
                    sampleIndex++;
                    // once per frame, adjust duty
                    if (index < sampleCount &&
                        sampleIndex % this.samplesPerFrame === 0) {
                        duty = (((duty & 0x3F) << 2) | ((duty & 0xC0) >> 6));
                    }
                    // once per frame * fadeamount, adjust volume
                    if (volumeFade !== 0 &&
                        (index + 1) % (this.samplesPerFrame * Math.abs(volumeFade)) === 0) {
                        volume += (volumeFade < 0 ? 1 : -1);
                        volume = volume < 0 ? 0 : (volume > 0x0F ? 0x0F : volume);
                    }
                }
            }
            commandIndex++;
        }
        return data;
    };
    CryGenerator.prototype.generateNoise = function (commands, pitch, length, cutoff) {
        var data = [];
        var commandIndex = 0;
        var sampleIndex = 0;
        var leftovers = 0;
        while (commandIndex < commands.length) {
            var command = commands[commandIndex];
            var isLastCommand = commandIndex === commands.length - 1;
            var note = command.note;
            // number of samples for this single note
            var subFrames = ((length + 0x100) * (note[0] + 1)) + leftovers;
            var sampleCount = this.samplesPerFrame * (subFrames >> 8);
            leftovers = subFrames & 0xFF;
            // volume and fade control
            var volume = note[1], volumeFade = note[2], params = (note[3] + (sampleIndex >= cutoff ? 0 : pitch)) & 0xFF;
            // apply this note
            var shift = (params >> 4) & 0xF;
            shift = shift > 0xD ? shift & 0xD : shift; // not sure how to deal with E or F, but its so low you can hardly notice it anyway
            var divider = params & 0x7;
            var width = (params & 0x8) === 0x8;
            this.noiseBuffer = 0x7FFF;
            for (var index = 0; index < 2500000 && (index < sampleCount || (isLastCommand && volume > 0)); index++) {
                var bit0 = this.noiseBuffer & 1;
                data[sampleIndex] = this.sample(1 ^ bit0, volume);
                sampleIndex++;
                // according to params, update buffer
                if (sampleIndex % (2 * (divider === 0 ? 0.5 : divider) * (1 << (shift + 1))) === 0) {
                    var bit1 = (this.noiseBuffer >> 1) & 1;
                    this.noiseBuffer = (this.noiseBuffer >> 1) | ((bit0 ^ bit1) << 14);
                    if (width)
                        this.noiseBuffer = (this.noiseBuffer >> 1) | ((bit0 ^ bit1) << 6);
                }
                // once per frame * fadeamount, adjust volume
                if (volumeFade !== 0 &&
                    (index + 1) % (this.samplesPerFrame * Math.abs(volumeFade)) === 0) {
                    volume += (volumeFade < 0 ? 1 : -1);
                    volume = volume < 0 ? 0 : (volume > 0x0F ? 0x0F : volume);
                }
            }
            commandIndex++;
        }
        return data;
    };
    CryGenerator.prototype.play = function (data) {
        var buffer = Float32Array.from(data);
        var audioBuffer = this.audioContext.createBuffer(1, buffer.length, this.audioContext.sampleRate);
        audioBuffer.copyToChannel(buffer, 0);
        var source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.start(0);
    };
    return CryGenerator;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CryGenerator);


/***/ }),

/***/ "./src/data/BaseCryManager.ts":
/*!************************************!*\
  !*** ./src/data/BaseCryManager.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseCryManager: () => (/* binding */ BaseCryManager)
/* harmony export */ });
var fs = window.require('fs');
var BaseCryManager = /** @class */ (function () {
    function BaseCryManager() {
    }
    BaseCryManager.init = function () {
        this.data = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    };
    BaseCryManager.get = function (idx) {
        return this.data[idx];
    };
    BaseCryManager.pushUndo = function () {
        this.undoStack.push(structuredClone(this.data));
        if (this.undoStack.length > 20) {
            this.undoStack.shift();
        }
    };
    BaseCryManager.popUndo = function () {
        this.data = this.undoStack.pop();
        this.flush();
    };
    BaseCryManager.flush = function () {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data));
    };
    BaseCryManager.addNew = function () {
        this.pushUndo();
        this.data.push({
            channels: {
                "pulse1": [],
                "pulse2": [],
                "noise": []
            },
            name: "New Base Cry",
            "isReference": false
        });
        this.flush();
        return this.data.length - 1;
    };
    BaseCryManager.delete = function (idx) {
        this.pushUndo();
        this.data.splice(idx, 1);
        this.flush();
    };
    BaseCryManager.copy = function (idx) {
        this.pushUndo();
        var data = structuredClone(this.data[idx]);
        data.isReference = false;
        data.name = data.name + " (Copy)";
        this.data.push(data);
        this.flush();
        return this.data.length - 1;
    };
    BaseCryManager.updateName = function (idx, name) {
        this.pushUndo();
        this.data[idx].name = name;
        this.flush();
    };
    BaseCryManager.updateChannels = function (idx, channels) {
        this.pushUndo();
        this.data[idx].channels = channels;
        this.flush();
    };
    BaseCryManager.filePath = './src/data/baseCries.json';
    BaseCryManager.undoStack = [];
    return BaseCryManager;
}());



/***/ }),

/***/ "./src/data/MonsterManager.ts":
/*!************************************!*\
  !*** ./src/data/MonsterManager.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MonsterManager: () => (/* binding */ MonsterManager)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var fs = window.require('fs');
var MonsterManager = /** @class */ (function () {
    function MonsterManager() {
    }
    MonsterManager.init = function () {
        this.data = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    };
    MonsterManager.get = function (idx) {
        return this.data[idx];
    };
    MonsterManager.getByName = function (name) {
        return this.data.find(function (pokemon) { return pokemon.name === name; });
    };
    MonsterManager.pushUndo = function () {
        this.undoStack.push(structuredClone(this.data));
        if (this.undoStack.length > 20) {
            this.undoStack.shift();
        }
    };
    MonsterManager.popUndo = function () {
        this.data = this.undoStack.pop();
        this.flush();
    };
    MonsterManager.flush = function () {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    };
    MonsterManager.addNew = function () {
        this.pushUndo();
        this.data.push({
            name: "New Monster",
            cry: 0,
            pitch: 128,
            length: 64
        });
        this.flush();
        return this.data.length - 1;
    };
    MonsterManager.delete = function (idx) {
        this.pushUndo();
        this.data.splice(idx, 1);
        this.flush();
    };
    MonsterManager.copy = function (idx) {
        this.pushUndo();
        var pokemon = structuredClone(this.data[idx]);
        pokemon.name = pokemon.name + " (Copy)";
        this.data.push(pokemon);
        this.flush();
        return this.data.length - 1;
    };
    MonsterManager.updateName = function (idx, name) {
        this.pushUndo();
        this.data[idx].name = name;
        this.flush();
    };
    MonsterManager.updateCry = function (idx, cry) {
        this.pushUndo();
        this.data[idx].cry = cry;
        this.flush();
    };
    MonsterManager.updatePitch = function (idx, pitch) {
        this.pushUndo();
        this.data[idx].pitch = pitch;
        this.flush();
    };
    MonsterManager.updateLength = function (idx, length) {
        this.pushUndo();
        this.data[idx].length = length;
        this.flush();
    };
    MonsterManager.updatePokemon = function (idx, pokemon) {
        this.pushUndo();
        this.data[idx] = __assign(__assign({}, this.data[idx]), pokemon);
        this.flush();
    };
    MonsterManager.filePath = './src/data/pokemon.json';
    MonsterManager.undoStack = [];
    return MonsterManager;
}());



/***/ }),

/***/ "./src/data/cryTypes.ts":
/*!******************************!*\
  !*** ./src/data/cryTypes.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    {
        "pulse1": [
            { "duty": 0xF5 },
            { "note": [0x04, 0x0F, 0x03, 0x718] }, // 564.97 Hz
            { "note": [0x0F, 0x0E, 0x05, 0x798] }, // 1260.31 Hz
            { "note": [0x08, 0x09, 0x01, 0x758] } // 780.19 Hz
        ],
        "pulse2": [
            { "duty": 0xA0 },
            { "note": [0x05, 0x0B, 0x03, 0x708] }, // 528.52 Hz
            { "note": [0x0F, 0x0C, 0x05, 0x788] }, // 1092.27 Hz
            { "note": [0x08, 0x07, 0x01, 0x748] } // 712.35 Hz
        ],
        "noise": [
            { "note": [0x03, 0x0A, 0x01, 0x1C] },
            { "note": [0x0E, 0x09, 0x04, 0x2C] },
            { "note": [0x08, 0x08, 0x01, 0x1C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xA0 },
            { "note": [0x04, 0x0F, 0x03, 0x600] }, // 256.00 Hz
            { "note": [0x08, 0x0D, 0x05, 0x760] }, // 819.20 Hz
            { "note": [0x03, 0x0E, 0x02, 0x720] }, // 585.14 Hz
            { "note": [0x08, 0x0D, 0x01, 0x710] } // 546.13 Hz
        ],
        "pulse2": [
            { "duty": 0x5A },
            { "note": [0x05, 0x0B, 0x03, 0x6F1] }, // 483.66 Hz
            { "note": [0x07, 0x0C, 0x05, 0x752] }, // 753.29 Hz
            { "note": [0x03, 0x0A, 0x02, 0x711] }, // 548.42 Hz
            { "note": [0x08, 0x0B, 0x01, 0x601] } // 256.50 Hz
        ],
        "noise": [
            { "note": [0x03, 0x0A, 0x02, 0x3C] },
            { "note": [0x0C, 0x09, 0x04, 0x2C] },
            { "note": [0x03, 0x08, 0x02, 0x1C] },
            { "note": [0x08, 0x07, 0x01, 0x2C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0x00 },
            { "note": [0x08, 0x0F, 0x05, 0x480] }, // 146.29 Hz
            { "note": [0x02, 0x0E, 0x01, 0x5E0] }, // 240.94 Hz
            { "note": [0x08, 0x0D, 0x01, 0x5DC] } // 239.18 Hz
        ],
        "pulse2": [
            { "duty": 0xA5 },
            { "note": [0x07, 0x09, 0x05, 0x441] }, // 136.68 Hz
            { "note": [0x02, 0x08, 0x01, 0x521] }, // 178.33 Hz
            { "note": [0x08, 0x06, 0x01, 0x51A] } // 176.65 Hz
        ],
        "noise": []
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x04, 0x0F, 0x07, 0x608] }, // 260.06 Hz
            { "note": [0x06, 0x0E, 0x06, 0x600] }, // 256.00 Hz
            { "note": [0x06, 0x0D, 0x07, 0x5F0] }, // 248.24 Hz
            { "note": [0x06, 0x0C, 0x04, 0x5E0] }, // 240.94 Hz
            { "note": [0x05, 0x0D, 0x03, 0x5C0] }, // 227.56 Hz
            { "note": [0x04, 0x0D, 0x03, 0x5A0] }, // 215.58 Hz
            { "note": [0x08, 0x0E, 0x01, 0x580] } // 204.80 Hz
        ],
        "pulse2": [
            { "duty": 0x0A },
            { "note": [0x04, 0x0C, 0x07, 0x504] }, // 171.56 Hz
            { "note": [0x06, 0x0A, 0x06, 0x502] }, // 171.11 Hz
            { "note": [0x06, 0x09, 0x07, 0x4F1] }, // 167.40 Hz
            { "note": [0x04, 0x0B, 0x04, 0x4E1] }, // 164.05 Hz
            { "note": [0x05, 0x0A, 0x03, 0x4C2] }, // 157.92 Hz
            { "note": [0x04, 0x0B, 0x03, 0x4A3] }, // 152.23 Hz
            { "note": [0x08, 0x0C, 0x01, 0x482] } // 146.61 Hz
        ],
        "noise": [
            { "note": [0x0C, 0x0E, 0x04, 0x4C] },
            { "note": [0x0A, 0x0C, 0x07, 0x5C] },
            { "note": [0x0C, 0x0B, 0x06, 0x4C] },
            { "note": [0x0F, 0x0A, 0x02, 0x5C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x04, 0x0F, 0x07, 0x6A0] }, // 372.36 Hz
            { "note": [0x08, 0x0E, 0x06, 0x6A4] }, // 376.64 Hz
            { "note": [0x04, 0x0D, 0x06, 0x6A0] }, // 372.36 Hz
            { "note": [0x0C, 0x0D, 0x03, 0x620] }, // 273.07 Hz
            { "note": [0x08, 0x0C, 0x03, 0x624] }, // 275.36 Hz
            { "note": [0x04, 0x0C, 0x02, 0x620] }, // 273.07 Hz
            { "note": [0x08, 0x0B, 0x01, 0x610] } // 264.26 Hz
        ],
        "pulse2": [
            { "duty": 0x5A },
            { "note": [0x04, 0x0E, 0x07, 0x601] }, // 256.50 Hz
            { "note": [0x08, 0x0D, 0x06, 0x603] }, // 257.51 Hz
            { "note": [0x04, 0x0C, 0x06, 0x601] }, // 256.50 Hz
            { "note": [0x0C, 0x0C, 0x03, 0x581] }, // 205.12 Hz
            { "note": [0x08, 0x0B, 0x03, 0x583] }, // 205.76 Hz
            { "note": [0x04, 0x0B, 0x02, 0x582] }, // 205.44 Hz
            { "note": [0x08, 0x0A, 0x01, 0x571] } // 200.11 Hz
        ],
        "noise": [
            { "note": [0x07, 0x0D, 0x06, 0x5C] },
            { "note": [0x08, 0x0E, 0x06, 0x4C] },
            { "note": [0x04, 0x0D, 0x04, 0x5C] },
            { "note": [0x04, 0x0D, 0x04, 0x4C] },
            { "note": [0x07, 0x0C, 0x03, 0x4C] },
            { "note": [0x08, 0x0A, 0x01, 0x5C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0x0A },
            { "note": [0x06, 0x0E, 0x02, 0x500] }, // 170.67 Hz
            { "note": [0x06, 0x0E, 0x03, 0x580] }, // 204.80 Hz
            { "note": [0x06, 0x0D, 0x03, 0x570] }, // 199.80 Hz
            { "note": [0x08, 0x0A, 0x01, 0x560] } // 195.05 Hz
        ],
        "pulse2": [
            { "duty": 0xF5 },
            { "note": [0x06, 0x0E, 0x02, 0x482] }, // 146.61 Hz
            { "note": [0x06, 0x0D, 0x03, 0x501] }, // 170.89 Hz
            { "note": [0x06, 0x0B, 0x02, 0x4E2] }, // 164.25 Hz
            { "note": [0x08, 0x08, 0x01, 0x4C1] } // 157.73 Hz
        ],
        "noise": []
    }, {
        "pulse1": [
            { "duty": 0xFA },
            { "note": [0x06, 0x08, 0x03, 0x247] }, // 89.47 Hz
            { "note": [0x0F, 0x06, 0x02, 0x226] }, // 87.50 Hz
            { "note": [0x04, 0x05, 0x02, 0x245] }, // 89.35 Hz
            { "note": [0x09, 0x06, 0x03, 0x206] }, // 85.67 Hz
            { "note": [0x0F, 0x08, 0x02, 0x225] }, // 87.44 Hz
            { "note": [0x0F, 0x04, 0x02, 0x207] } // 85.72 Hz
        ],
        "pulse2": [],
        "noise": [
            { "note": [0x08, 0x0D, 0x04, 0x8C] },
            { "note": [0x04, 0x0E, 0x02, 0x9C] },
            { "note": [0x0F, 0x0C, 0x06, 0x8C] },
            { "note": [0x08, 0x0E, 0x04, 0xAC] },
            { "note": [0x0F, 0x0D, 0x07, 0x9C] },
            { "note": [0x0F, 0x0F, 0x02, 0xAC] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x04, 0x0F, 0x03, 0x6E0] }, // 455.11 Hz
            { "note": [0x0F, 0x0E, 0x04, 0x640] }, // 292.57 Hz
            { "note": [0x08, 0x0C, 0x01, 0x620] } // 273.07 Hz
        ],
        "pulse2": [
            { "duty": 0x0A },
            { "note": [0x03, 0x0C, 0x03, 0x683] }, // 344.02 Hz
            { "note": [0x0E, 0x0B, 0x04, 0x602] }, // 257.00 Hz
            { "note": [0x08, 0x0A, 0x01, 0x601] } // 256.50 Hz
        ],
        "noise": [
            { "note": [0x04, 0x0D, 0x03, 0x5C] },
            { "note": [0x0F, 0x0E, 0x06, 0x4C] },
            { "note": [0x08, 0x0B, 0x01, 0x5C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x0F, 0x0F, 0x06, 0x565] }, // 196.51 Hz
            { "note": [0x0A, 0x0E, 0x04, 0x57C] }, // 203.53 Hz
            { "note": [0x03, 0x0C, 0x02, 0x55C] }, // 193.89 Hz
            { "note": [0x0F, 0x0B, 0x02, 0x53C] } // 185.13 Hz
        ],
        "pulse2": [
            { "duty": 0x5A },
            { "note": [0x0E, 0x0D, 0x06, 0x503] }, // 171.34 Hz
            { "note": [0x09, 0x0B, 0x04, 0x51B] }, // 176.89 Hz
            { "note": [0x04, 0x09, 0x02, 0x4FA] }, // 169.34 Hz
            { "note": [0x0F, 0x0A, 0x02, 0x4DB] } // 162.82 Hz
        ],
        "noise": [
            { "note": [0x0C, 0x0E, 0x06, 0x4C] },
            { "note": [0x0B, 0x0D, 0x07, 0x5C] },
            { "note": [0x0F, 0x0C, 0x02, 0x4C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x0F, 0x0F, 0x07, 0x7A0] }, // 1365.33 Hz
            { "note": [0x06, 0x0E, 0x06, 0x7A3] }, // 1409.38 Hz
            { "note": [0x0A, 0x0F, 0x04, 0x7A0] }, // 1365.33 Hz
            { "duty": 0xA5 },
            { "note": [0x0A, 0x0F, 0x06, 0x7D8] }, // 3276.80 Hz
            { "note": [0x04, 0x0E, 0x03, 0x7D7] }, // 3196.88 Hz
            { "note": [0x0F, 0x0F, 0x02, 0x7D8] } // 3276.80 Hz
        ],
        "pulse2": [
            { "duty": 0x05 },
            { "note": [0x02, 0x00, -0x08, 0x000] }, // 64.00 Hz
            { "note": [0x0F, 0x0A, 0x07, 0x6A1] }, // 373.42 Hz
            { "note": [0x06, 0x08, 0x06, 0x6A2] }, // 374.49 Hz
            { "note": [0x0A, 0x07, 0x04, 0x6A1] }, // 373.42 Hz
            { "duty": 0x5F },
            { "note": [0x0A, 0x07, 0x06, 0x6D6] }, // 439.84 Hz
            { "note": [0x04, 0x08, 0x03, 0x6D9] }, // 444.31 Hz
            { "note": [0x0F, 0x0A, 0x02, 0x6D7] } // 441.32 Hz
        ],
        "noise": [
            { "note": [0x02, 0x0F, 0x02, 0x3C] },
            { "note": [0x08, 0x0E, 0x04, 0x3E] },
            { "note": [0x0F, 0x0D, 0x07, 0x3C] },
            { "note": [0x06, 0x0C, 0x05, 0x3B] },
            { "note": [0x06, 0x0E, 0x04, 0x3D] },
            { "note": [0x08, 0x0B, 0x06, 0x3C] },
            { "note": [0x06, 0x0D, 0x04, 0x3D] },
            { "note": [0x08, 0x0C, 0x01, 0x3B] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x08, 0x0F, 0x07, 0x6E0] }, // 455.11 Hz
            { "note": [0x06, 0x0E, 0x06, 0x6E5] }, // 463.15 Hz
            { "note": [0x03, 0x0F, 0x04, 0x6E0] }, // 455.11 Hz
            { "note": [0x03, 0x0F, 0x06, 0x6D0] }, // 431.16 Hz
            { "note": [0x03, 0x0E, 0x03, 0x6C0] }, // 409.60 Hz
            { "note": [0x04, 0x0F, 0x02, 0x6B0] }, // 390.10 Hz
            { "note": [0x0F, 0x0A, 0x02, 0x6C8] } // 420.10 Hz
        ],
        "pulse2": [
            { "duty": 0x05 },
            { "note": [0x03, 0x00, -0x08, 0x000] }, // 64.00 Hz
            { "note": [0x08, 0x0A, 0x07, 0x6A1] }, // 373.42 Hz
            { "note": [0x06, 0x08, 0x06, 0x6A3] }, // 375.56 Hz
            { "note": [0x03, 0x07, 0x04, 0x6A1] }, // 373.42 Hz
            { "note": [0x03, 0x07, 0x06, 0x691] }, // 357.14 Hz
            { "note": [0x03, 0x08, 0x03, 0x682] }, // 343.12 Hz
            { "note": [0x04, 0x0A, 0x02, 0x671] }, // 328.50 Hz
            { "note": [0x0F, 0x07, 0x02, 0x689] } // 349.53 Hz
        ],
        "noise": [
            { "note": [0x02, 0x0F, 0x02, 0x3C] },
            { "note": [0x08, 0x0E, 0x04, 0x3E] },
            { "note": [0x08, 0x0D, 0x07, 0x3C] },
            { "note": [0x05, 0x0C, 0x05, 0x3B] },
            { "note": [0x03, 0x0D, 0x04, 0x2C] },
            { "note": [0x02, 0x0B, 0x06, 0x3C] },
            { "note": [0x03, 0x0A, 0x04, 0x2C] },
            { "note": [0x08, 0x09, 0x01, 0x3C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xCC },
            { "note": [0x04, 0x0F, 0x01, 0x700] }, // 512.00 Hz
            { "note": [0x04, 0x0E, 0x01, 0x780] }, // 1024.00 Hz
            { "note": [0x04, 0x0D, 0x01, 0x740] }, // 682.67 Hz
            { "note": [0x04, 0x0E, 0x01, 0x740] }, // 682.67 Hz
            { "note": [0x04, 0x0F, 0x01, 0x780] }, // 1024.00 Hz
            { "note": [0x04, 0x0D, 0x01, 0x700] }, // 512.00 Hz
            { "note": [0x04, 0x0F, 0x01, 0x701] }, // 514.01 Hz
            { "note": [0x04, 0x0D, 0x01, 0x782] }, // 1040.25 Hz
            { "note": [0x04, 0x0C, 0x01, 0x742] }, // 689.85 Hz
            { "note": [0x08, 0x0B, 0x01, 0x741] } // 686.24 Hz
        ],
        "pulse2": [
            { "duty": 0x44 },
            { "note": [0x0C, 0x00, -0x08, 0x000] }, // 64.00 Hz
            { "note": [0x04, 0x0F, 0x01, 0x701] }, // 514.01 Hz
            { "note": [0x04, 0x0E, 0x01, 0x782] }, // 1040.25 Hz
            { "note": [0x04, 0x0D, 0x01, 0x741] }, // 686.24 Hz
            { "note": [0x04, 0x0E, 0x01, 0x741] }, // 686.24 Hz
            { "note": [0x04, 0x0F, 0x01, 0x782] }, // 1040.25 Hz
            { "note": [0x08, 0x0D, 0x01, 0x701] } // 514.01 Hz
        ],
        "noise": [
            { "note": [0x0F, 0x00, -0x08, 0x00] },
            { "note": [0x04, 0x00, -0x08, 0x00] },
            { "note": [0x04, 0x0D, 0x01, 0x4C] },
            { "note": [0x04, 0x0B, 0x01, 0x2C] },
            { "note": [0x04, 0x0D, 0x01, 0x3C] },
            { "note": [0x04, 0x0B, 0x01, 0x3C] },
            { "note": [0x04, 0x0C, 0x01, 0x2C] },
            { "note": [0x08, 0x0A, 0x01, 0x4C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xCC },
            { "note": [0x08, 0x0F, 0x05, 0x600] }, // 256.00 Hz
            { "note": [0x02, 0x0D, 0x02, 0x638] }, // 287.44 Hz
            { "note": [0x02, 0x0C, 0x02, 0x630] }, // 282.48 Hz
            { "note": [0x02, 0x0C, 0x02, 0x628] }, // 277.69 Hz
            { "note": [0x02, 0x0B, 0x02, 0x620] }, // 273.07 Hz
            { "note": [0x02, 0x0B, 0x02, 0x610] }, // 264.26 Hz
            { "note": [0x02, 0x0A, 0x02, 0x618] }, // 268.59 Hz
            { "note": [0x02, 0x0B, 0x02, 0x610] }, // 264.26 Hz
            { "note": [0x08, 0x0C, 0x01, 0x620] } // 273.07 Hz
        ],
        "pulse2": [
            { "duty": 0x44 },
            { "note": [0x0C, 0x0C, 0x03, 0x5C0] }, // 227.56 Hz
            { "note": [0x03, 0x0B, 0x01, 0x5F9] }, // 252.55 Hz
            { "note": [0x02, 0x0A, 0x01, 0x5F1] }, // 248.71 Hz
            { "note": [0x02, 0x0A, 0x01, 0x5E9] }, // 244.99 Hz
            { "note": [0x02, 0x09, 0x01, 0x5E1] }, // 241.38 Hz
            { "note": [0x02, 0x09, 0x01, 0x5D9] }, // 237.88 Hz
            { "note": [0x02, 0x08, 0x01, 0x5D1] }, // 234.48 Hz
            { "note": [0x02, 0x09, 0x01, 0x5D9] }, // 237.88 Hz
            { "note": [0x08, 0x09, 0x01, 0x5E1] } // 241.38 Hz
        ],
        "noise": []
    }, {
        "pulse1": [
            { "duty": 0x88 },
            { "note": [0x05, 0x0F, 0x02, 0x650] }, // 303.41 Hz
            { "note": [0x09, 0x0D, 0x01, 0x660] }, // 315.08 Hz
            { "note": [0x05, 0x0E, 0x02, 0x612] }, // 265.33 Hz
            { "note": [0x09, 0x0C, 0x01, 0x622] }, // 274.21 Hz
            { "note": [0x05, 0x0F, 0x02, 0x610] }, // 264.26 Hz
            { "note": [0x06, 0x0D, 0x01, 0x620] }, // 273.07 Hz
            { "duty": 0x88 },
            { "note": [0x05, 0x0F, 0x02, 0x650] }, // 303.41 Hz
            { "note": [0x09, 0x0D, 0x01, 0x660] }, // 315.08 Hz
            { "note": [0x05, 0x0E, 0x02, 0x612] }, // 265.33 Hz
            { "note": [0x09, 0x0C, 0x01, 0x622] }, // 274.21 Hz
            { "note": [0x05, 0x0F, 0x02, 0x610] }, // 264.26 Hz
            { "note": [0x06, 0x0D, 0x01, 0x620] } // 273.07 Hz
        ],
        "pulse2": [
            { "duty": 0x40 },
            { "note": [0x04, 0x00, -0x08, 0x000] }, // 64.00 Hz
            { "note": [0x05, 0x0F, 0x02, 0x651] }, // 304.11 Hz
            { "note": [0x09, 0x0D, 0x01, 0x661] }, // 315.84 Hz
            { "note": [0x05, 0x0E, 0x02, 0x614] }, // 266.41 Hz
            { "note": [0x08, 0x0C, 0x01, 0x624] }, // 275.36 Hz
            { "note": [0x05, 0x0F, 0x02, 0x611] }, // 264.79 Hz
            { "note": [0x0C, 0x0D, 0x01, 0x621] }, // 273.64 Hz
            { "note": [0x05, 0x0E, 0x02, 0x614] }, // 266.41 Hz
            { "note": [0x08, 0x0C, 0x01, 0x624] }, // 275.36 Hz
            { "note": [0x05, 0x0F, 0x02, 0x611] }, // 264.79 Hz
            { "note": [0x04, 0x0D, 0x01, 0x621] } // 273.64 Hz
        ],
        "noise": [
            { "note": [0x06, 0x0D, 0x02, 0x1C] },
            { "note": [0x09, 0x0B, 0x01, 0x2C] },
            { "note": [0x08, 0x0C, 0x02, 0x2C] },
            { "note": [0x09, 0x0B, 0x01, 0x3C] },
            { "note": [0x06, 0x0C, 0x02, 0x2C] },
            { "note": [0x09, 0x0A, 0x02, 0x3C] },
            { "note": [0x07, 0x0C, 0x02, 0x2C] },
            { "note": [0x05, 0x0A, 0x01, 0x3C] },
            { "note": [0x09, 0x0C, 0x02, 0x2C] },
            { "note": [0x04, 0x0A, 0x01, 0x3C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xA5 },
            { "note": [0x04, 0x0E, 0x01, 0x700] }, // 512.00 Hz
            { "note": [0x04, 0x0F, 0x02, 0x780] }, // 1024.00 Hz
            { "note": [0x02, 0x09, 0x02, 0x740] }, // 682.67 Hz
            { "note": [0x08, 0x0E, 0x01, 0x600] } // 256.00 Hz
        ],
        "pulse2": [
            { "duty": 0x0A },
            { "note": [0x04, 0x0B, 0x01, 0x6E1] }, // 456.70 Hz
            { "note": [0x03, 0x0C, 0x02, 0x6E1] }, // 456.70 Hz
            { "note": [0x03, 0x06, 0x02, 0x681] }, // 342.22 Hz
            { "note": [0x08, 0x0B, 0x01, 0x5E1] } // 241.38 Hz
        ],
        "noise": [
            { "note": [0x02, 0x06, 0x01, 0x32] },
            { "note": [0x02, 0x06, 0x01, 0x21] },
            { "note": [0x08, 0x06, 0x01, 0x11] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF1 },
            { "note": [0x04, 0x0F, 0x07, 0x7C0] }, // 2048.00 Hz
            { "note": [0x0C, 0x0E, 0x06, 0x7C2] }, // 2114.06 Hz
            { "note": [0x06, 0x0B, 0x05, 0x680] }, // 341.33 Hz
            { "note": [0x04, 0x0C, 0x04, 0x670] }, // 327.68 Hz
            { "note": [0x04, 0x0B, 0x05, 0x660] }, // 315.08 Hz
            { "note": [0x08, 0x0C, 0x01, 0x640] } // 292.57 Hz
        ],
        "pulse2": [
            { "duty": 0xCC },
            { "note": [0x03, 0x0C, 0x07, 0x781] }, // 1032.06 Hz
            { "note": [0x0C, 0x0B, 0x06, 0x780] }, // 1024.00 Hz
            { "note": [0x06, 0x0A, 0x05, 0x641] }, // 293.23 Hz
            { "note": [0x04, 0x0C, 0x04, 0x632] }, // 283.71 Hz
            { "note": [0x06, 0x0B, 0x05, 0x621] }, // 273.64 Hz
            { "note": [0x08, 0x0A, 0x01, 0x602] } // 257.00 Hz
        ],
        "noise": [
            { "note": [0x03, 0x0E, 0x04, 0x3C] },
            { "note": [0x0C, 0x0D, 0x06, 0x2C] },
            { "note": [0x04, 0x0E, 0x04, 0x3C] },
            { "note": [0x08, 0x0B, 0x07, 0x5C] },
            { "note": [0x0F, 0x0C, 0x02, 0x5D] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xC9 },
            { "note": [0x08, 0x0F, 0x07, 0x680] }, // 341.33 Hz
            { "note": [0x02, 0x0F, 0x07, 0x660] }, // 315.08 Hz
            { "note": [0x01, 0x0E, 0x07, 0x640] }, // 292.57 Hz
            { "note": [0x01, 0x0E, 0x07, 0x620] }, // 273.07 Hz
            { "note": [0x0F, 0x0D, 0x01, 0x600] }, // 256.00 Hz
            { "note": [0x04, 0x0C, 0x07, 0x740] }, // 682.67 Hz
            { "note": [0x04, 0x0A, 0x07, 0x730] }, // 630.15 Hz
            { "note": [0x0F, 0x09, 0x01, 0x720] } // 585.14 Hz
        ],
        "pulse2": [
            { "duty": 0x79 },
            { "note": [0x0A, 0x0E, 0x07, 0x682] }, // 343.12 Hz
            { "note": [0x02, 0x0E, 0x07, 0x662] }, // 316.60 Hz
            { "note": [0x01, 0x0D, 0x07, 0x642] }, // 293.88 Hz
            { "note": [0x01, 0x0D, 0x07, 0x622] }, // 274.21 Hz
            { "note": [0x0F, 0x0C, 0x01, 0x602] }, // 257.00 Hz
            { "note": [0x04, 0x0B, 0x07, 0x742] }, // 689.85 Hz
            { "note": [0x02, 0x09, 0x07, 0x732] }, // 636.27 Hz
            { "note": [0x0F, 0x08, 0x01, 0x722] } // 590.41 Hz
        ],
        "noise": [
            { "note": [0x04, 0x07, 0x04, 0x21] },
            { "note": [0x04, 0x07, 0x04, 0x10] },
            { "note": [0x04, 0x07, 0x01, 0x20] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x06, 0x0F, 0x07, 0x7A0] }, // 1365.33 Hz
            { "note": [0x08, 0x0E, 0x06, 0x7A4] }, // 1424.70 Hz
            { "note": [0x04, 0x0D, 0x06, 0x7A0] }, // 1365.33 Hz
            { "note": [0x0F, 0x0D, 0x03, 0x720] }, // 585.14 Hz
            { "note": [0x08, 0x0C, 0x03, 0x723] }, // 593.09 Hz
            { "note": [0x02, 0x0C, 0x02, 0x728] }, // 606.81 Hz
            { "note": [0x08, 0x0B, 0x01, 0x730] } // 630.15 Hz
        ],
        "pulse2": [
            { "duty": 0x0A },
            { "note": [0x04, 0x00, -0x08, 0x00] },
            { "note": [0x06, 0x0A, 0x07, 0x741] }, // 686.24 Hz
            { "note": [0x08, 0x08, 0x06, 0x743] }, // 693.50 Hz
            { "note": [0x04, 0x07, 0x06, 0x741] }, // 686.24 Hz
            { "note": [0x0D, 0x08, 0x03, 0x6C2] }, // 412.18 Hz
            { "note": [0x07, 0x07, 0x03, 0x6C1] }, // 410.88 Hz
            { "note": [0x03, 0x08, 0x02, 0x6CC] }, // 425.56 Hz
            { "note": [0x08, 0x07, 0x01, 0x6D8] } // 442.81 Hz
        ],
        "noise": [
            { "note": [0x02, 0x0F, 0x02, 0x4C] },
            { "note": [0x06, 0x0E, 0x06, 0x3A] },
            { "note": [0x04, 0x0D, 0x07, 0x3A] },
            { "note": [0x06, 0x0D, 0x06, 0x2C] },
            { "note": [0x08, 0x0E, 0x05, 0x3C] },
            { "note": [0x0C, 0x0D, 0x02, 0x3D] },
            { "note": [0x08, 0x0D, 0x01, 0x2C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xA5 },
            { "note": [0x0C, 0x0F, 0x02, 0x440] }, // 136.53 Hz
            { "note": [0x0F, 0x0E, 0x03, 0x4A0] }, // 151.70 Hz
            { "note": [0x04, 0x0D, 0x02, 0x490] }, // 148.95 Hz
            { "note": [0x08, 0x0D, 0x01, 0x480] } // 146.29 Hz
        ],
        "pulse2": [
            { "duty": 0xEE },
            { "note": [0x0B, 0x0D, 0x02, 0x438] }, // 135.40 Hz
            { "note": [0x0E, 0x0C, 0x06, 0x498] }, // 150.31 Hz
            { "note": [0x03, 0x0B, 0x02, 0x488] }, // 147.60 Hz
            { "note": [0x08, 0x0B, 0x01, 0x478] } // 144.99 Hz
        ],
        "noise": [
            { "note": [0x0A, 0x0E, 0x06, 0x6C] },
            { "note": [0x0F, 0x0D, 0x02, 0x5C] },
            { "note": [0x03, 0x0C, 0x02, 0x6C] },
            { "note": [0x08, 0x0D, 0x01, 0x5C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0x33 },
            { "note": [0x0F, 0x0F, 0x06, 0x5C0] }, // 227.56 Hz
            { "note": [0x08, 0x0E, 0x03, 0x5BC] }, // 225.99 Hz
            { "note": [0x06, 0x0D, 0x02, 0x5D0] }, // 234.06 Hz
            { "note": [0x06, 0x0B, 0x02, 0x5E0] }, // 240.94 Hz
            { "note": [0x06, 0x0C, 0x02, 0x5F0] }, // 248.24 Hz
            { "note": [0x08, 0x0B, 0x01, 0x600] } // 256.00 Hz
        ],
        "pulse2": [
            { "duty": 0x99 },
            { "note": [0x0E, 0x0C, 0x06, 0x4B1] }, // 154.75 Hz
            { "note": [0x07, 0x0C, 0x03, 0x4AD] }, // 154.02 Hz
            { "note": [0x05, 0x0B, 0x02, 0x4C1] }, // 157.73 Hz
            { "note": [0x08, 0x09, 0x02, 0x4D1] }, // 160.82 Hz
            { "note": [0x06, 0x0A, 0x02, 0x4E1] }, // 164.05 Hz
            { "note": [0x08, 0x09, 0x01, 0x4F1] } // 167.40 Hz
        ],
        "noise": [
            { "note": [0x0A, 0x0E, 0x06, 0x5C] },
            { "note": [0x0A, 0x0D, 0x06, 0x6C] },
            { "note": [0x04, 0x0C, 0x02, 0x4C] },
            { "note": [0x06, 0x0D, 0x03, 0x5C] },
            { "note": [0x08, 0x0B, 0x03, 0x4C] },
            { "note": [0x08, 0x0A, 0x01, 0x5C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x08, 0x0E, 0x04, 0x790] }, // 1170.29 Hz
            { "note": [0x0F, 0x0F, 0x05, 0x7C0] }, // 2048.00 Hz
            { "note": [0x08, 0x0D, 0x01, 0x7D8] } // 3276.80 Hz
        ],
        "pulse2": [
            { "duty": 0xA5 },
            { "note": [0x0A, 0x0C, 0x04, 0x771] }, // 916.59 Hz
            { "note": [0x0F, 0x0B, 0x06, 0x7A2] }, // 1394.38 Hz
            { "note": [0x08, 0x0A, 0x01, 0x7B7] } // 1795.51 Hz
        ],
        "noise": [
            { "note": [0x08, 0x0E, 0x04, 0x4C] },
            { "note": [0x0E, 0x0C, 0x04, 0x3C] },
            { "note": [0x08, 0x0D, 0x01, 0x2C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x04, 0x0F, 0x03, 0x780] }, // 1024.00 Hz
            { "note": [0x0F, 0x0E, 0x07, 0x700] }, // 512.00 Hz
            { "note": [0x08, 0x0D, 0x03, 0x710] }, // 546.13 Hz
            { "note": [0x04, 0x0C, 0x02, 0x700] }, // 512.00 Hz
            { "note": [0x04, 0x0D, 0x02, 0x6F0] }, // 481.88 Hz
            { "note": [0x08, 0x0C, 0x01, 0x6E0] } // 455.11 Hz
        ],
        "pulse2": [
            { "duty": 0x5A },
            { "note": [0x06, 0x0C, 0x03, 0x701] }, // 514.01 Hz
            { "note": [0x0E, 0x0B, 0x07, 0x681] }, // 342.22 Hz
            { "note": [0x07, 0x0B, 0x03, 0x692] }, // 358.12 Hz
            { "note": [0x03, 0x0A, 0x02, 0x681] }, // 342.22 Hz
            { "note": [0x04, 0x0B, 0x02, 0x672] }, // 329.33 Hz
            { "note": [0x08, 0x0A, 0x01, 0x661] } // 315.84 Hz
        ],
        "noise": [
            { "note": [0x06, 0x0E, 0x03, 0x5C] },
            { "note": [0x0E, 0x0D, 0x06, 0x4C] },
            { "note": [0x06, 0x0C, 0x06, 0x3C] },
            { "note": [0x03, 0x0B, 0x03, 0x4C] },
            { "note": [0x03, 0x0A, 0x02, 0x5C] },
            { "note": [0x08, 0x0B, 0x01, 0x6C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x0F, 0x0D, 0x07, 0x780] }, // 1024.00 Hz
            { "note": [0x04, 0x0E, 0x06, 0x7A0] }, // 1365.33 Hz
            { "note": [0x0F, 0x0D, 0x02, 0x740] } // 682.67 Hz
        ],
        "pulse2": [
            { "duty": 0x5A },
            { "note": [0x0F, 0x0C, 0x07, 0x753] }, // 757.64 Hz
            { "note": [0x05, 0x0B, 0x06, 0x772] }, // 923.04 Hz
            { "note": [0x0F, 0x0C, 0x02, 0x711] } // 548.42 Hz
        ],
        "noise": [
            { "note": [0x0D, 0x0F, 0x06, 0x4C] },
            { "note": [0x04, 0x0E, 0x06, 0x3C] },
            { "note": [0x0F, 0x0F, 0x02, 0x4C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0x0F },
            { "note": [0x0F, 0x0F, 0x07, 0x500] }, // 170.67 Hz
            { "note": [0x0F, 0x0E, 0x07, 0x508] }, // 172.46 Hz
            { "note": [0x08, 0x0B, 0x04, 0x480] }, // 146.29 Hz
            { "note": [0x0F, 0x0A, 0x02, 0x460] } // 141.24 Hz
        ],
        "pulse2": [
            { "duty": 0x44 },
            { "note": [0x0E, 0x0D, 0x07, 0x481] }, // 146.45 Hz
            { "note": [0x0E, 0x0C, 0x07, 0x489] }, // 147.77 Hz
            { "note": [0x0A, 0x0B, 0x04, 0x401] }, // 128.13 Hz
            { "note": [0x0F, 0x0C, 0x02, 0x3E1] } // 124.24 Hz
        ],
        "noise": [
            { "note": [0x0E, 0x0F, 0x07, 0x7C] },
            { "note": [0x0C, 0x0F, 0x06, 0x6C] },
            { "note": [0x09, 0x0E, 0x04, 0x7C] },
            { "note": [0x0F, 0x0E, 0x02, 0x6C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0x50 },
            { "note": [0x0A, 0x0F, 0x05, 0x680] }, // 341.33 Hz
            { "note": [0x03, 0x0E, 0x02, 0x6A0] }, // 372.36 Hz
            { "note": [0x03, 0x0F, 0x02, 0x6C0] }, // 409.60 Hz
            { "note": [0x03, 0x0E, 0x02, 0x6E0] }, // 455.11 Hz
            { "note": [0x03, 0x0D, 0x02, 0x700] }, // 512.00 Hz
            { "note": [0x03, 0x0C, 0x02, 0x6E0] }, // 455.11 Hz
            { "note": [0x03, 0x0D, 0x02, 0x6C0] }, // 409.60 Hz
            { "note": [0x08, 0x0C, 0x01, 0x6A0] } // 372.36 Hz
        ],
        "pulse2": [
            { "duty": 0x0F },
            { "note": [0x09, 0x0D, 0x05, 0x631] }, // 283.09 Hz
            { "note": [0x03, 0x0D, 0x02, 0x652] }, // 304.82 Hz
            { "note": [0x03, 0x0E, 0x02, 0x671] }, // 328.50 Hz
            { "note": [0x03, 0x0B, 0x02, 0x691] }, // 357.14 Hz
            { "note": [0x03, 0x0C, 0x02, 0x6B2] }, // 392.43 Hz
            { "note": [0x03, 0x0B, 0x02, 0x691] }, // 357.14 Hz
            { "note": [0x03, 0x0C, 0x02, 0x671] }, // 328.50 Hz
            { "note": [0x08, 0x0B, 0x01, 0x651] } // 304.11 Hz
        ],
        "noise": [
            { "note": [0x06, 0x0E, 0x03, 0x4C] },
            { "note": [0x04, 0x0C, 0x03, 0x3C] },
            { "note": [0x05, 0x0D, 0x04, 0x3C] },
            { "note": [0x04, 0x0C, 0x04, 0x2C] },
            { "note": [0x06, 0x0B, 0x04, 0x3C] },
            { "note": [0x08, 0x0C, 0x01, 0x2C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0x1B },
            { "note": [0x07, 0x0D, 0x02, 0x740] }, // 682.67 Hz
            { "note": [0x0F, 0x0E, 0x05, 0x760] }, // 819.20 Hz
            { "note": [0x0F, 0x0C, 0x01, 0x730] } // 630.15 Hz
        ],
        "pulse2": [
            { "duty": 0x81 },
            { "note": [0x02, 0x0C, 0x02, 0x701] }, // 514.01 Hz
            { "note": [0x04, 0x0C, 0x02, 0x708] }, // 528.52 Hz
            { "note": [0x0F, 0x0D, 0x07, 0x741] }, // 686.24 Hz
            { "note": [0x0F, 0x0A, 0x02, 0x701] } // 514.01 Hz
        ],
        "noise": []
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x06, 0x0F, 0x07, 0x740] }, // 682.67 Hz
            { "note": [0x0C, 0x0E, 0x06, 0x744] }, // 697.19 Hz
            { "note": [0x06, 0x0D, 0x05, 0x750] }, // 744.73 Hz
            { "note": [0x04, 0x0C, 0x03, 0x760] }, // 819.20 Hz
            { "note": [0x03, 0x0C, 0x03, 0x780] }, // 1024.00 Hz
            { "note": [0x08, 0x0D, 0x01, 0x7A0] } // 1365.33 Hz
        ],
        "pulse2": [
            { "duty": 0x0A },
            { "note": [0x06, 0x0C, 0x07, 0x701] }, // 514.01 Hz
            { "note": [0x0B, 0x0B, 0x06, 0x702] }, // 516.03 Hz
            { "note": [0x06, 0x0A, 0x05, 0x711] }, // 548.42 Hz
            { "note": [0x04, 0x09, 0x03, 0x721] }, // 587.77 Hz
            { "note": [0x03, 0x0A, 0x03, 0x741] }, // 686.24 Hz
            { "note": [0x08, 0x09, 0x01, 0x762] } // 829.57 Hz
        ],
        "noise": [
            { "note": [0x03, 0x0E, 0x02, 0x3C] },
            { "note": [0x08, 0x0D, 0x06, 0x4C] },
            { "note": [0x05, 0x0D, 0x04, 0x3C] },
            { "note": [0x0C, 0x0C, 0x07, 0x4C] },
            { "note": [0x02, 0x0E, 0x02, 0x3C] },
            { "note": [0x08, 0x0D, 0x01, 0x2C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x06, 0x0F, 0x07, 0x6C0] }, // 409.60 Hz
            { "note": [0x0F, 0x0E, 0x07, 0x700] }, // 512.00 Hz
            { "note": [0x04, 0x0F, 0x04, 0x6F0] }, // 481.88 Hz
            { "note": [0x04, 0x0E, 0x04, 0x6E0] }, // 455.11 Hz
            { "note": [0x08, 0x0D, 0x01, 0x6D0] } // 431.16 Hz
        ],
        "pulse2": [
            { "duty": 0x0A },
            { "note": [0x07, 0x0E, 0x06, 0x681] }, // 342.22 Hz
            { "note": [0x0E, 0x0D, 0x05, 0x6C1] }, // 410.88 Hz
            { "note": [0x04, 0x0C, 0x04, 0x6B1] }, // 391.26 Hz
            { "note": [0x04, 0x0D, 0x04, 0x6A1] }, // 373.42 Hz
            { "note": [0x08, 0x0C, 0x01, 0x691] } // 357.14 Hz
        ],
        "noise": [
            { "note": [0x0A, 0x0A, 0x06, 0x3C] },
            { "note": [0x0E, 0x09, 0x04, 0x2C] },
            { "note": [0x05, 0x0A, 0x03, 0x3C] },
            { "note": [0x08, 0x09, 0x01, 0x2C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF5 },
            { "note": [0x07, 0x0D, 0x06, 0x7E1] }, // 4228.13 Hz
            { "note": [0x06, 0x0C, 0x06, 0x7E2] }, // 4369.07 Hz
            { "note": [0x09, 0x0D, 0x06, 0x7E1] }, // 4228.13 Hz
            { "note": [0x07, 0x0C, 0x06, 0x7E0] }, // 4096.00 Hz
            { "note": [0x05, 0x0B, 0x06, 0x7E2] }, // 4369.07 Hz
            { "note": [0x07, 0x0C, 0x06, 0x7E1] }, // 4228.13 Hz
            { "note": [0x06, 0x0B, 0x06, 0x7E0] }, // 4096.00 Hz
            { "note": [0x08, 0x0A, 0x01, 0x7DF] } // 3971.88 Hz
        ],
        "pulse2": [
            { "duty": 0x44 },
            { "note": [0x06, 0x0C, 0x03, 0x7C9] }, // 2383.13 Hz
            { "note": [0x06, 0x0B, 0x03, 0x7C7] }, // 2299.51 Hz
            { "note": [0x0A, 0x0C, 0x04, 0x7C3] }, // 2148.72 Hz
            { "note": [0x08, 0x0B, 0x04, 0x7C7] }, // 2299.51 Hz
            { "note": [0x06, 0x0C, 0x03, 0x7C9] }, // 2383.13 Hz
            { "note": [0x0F, 0x0A, 0x02, 0x7C5] } // 2221.56 Hz
        ],
        "noise": [
            { "note": [0x0D, 0x01, -0x01, 0x7C] },
            { "note": [0x0D, 0x0F, 0x07, 0x8C] },
            { "note": [0x0C, 0x0D, 0x06, 0x7C] },
            { "note": [0x08, 0x0C, 0x04, 0x6C] },
            { "note": [0x0F, 0x0B, 0x03, 0x5C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF4 },
            { "note": [0x0F, 0x0F, 0x00, 0x705] }, // 522.20 Hz
            { "note": [0x0A, 0x0E, 0x00, 0x700] }, // 512.00 Hz
            { "note": [0x06, 0x0B, 0x04, 0x710] }, // 546.13 Hz
            { "note": [0x04, 0x0D, 0x03, 0x700] }, // 512.00 Hz
            { "note": [0x06, 0x0B, 0x02, 0x620] }, // 273.07 Hz
            { "note": [0x08, 0x0A, 0x01, 0x624] } // 275.36 Hz
        ],
        "pulse2": [
            { "duty": 0x22 },
            { "note": [0x0F, 0x0B, 0x00, 0x6C3] }, // 413.48 Hz
            { "note": [0x0A, 0x0A, 0x00, 0x6C1] }, // 410.88 Hz
            { "note": [0x06, 0x08, 0x04, 0x6D2] }, // 434.01 Hz
            { "note": [0x04, 0x09, 0x03, 0x6C1] }, // 410.88 Hz
            { "note": [0x06, 0x08, 0x02, 0x5E1] }, // 241.38 Hz
            { "note": [0x08, 0x06, 0x01, 0x5E8] } // 244.54 Hz
        ],
        "noise": [
            { "note": [0x06, 0x0E, 0x06, 0x4C] },
            { "note": [0x0F, 0x0D, 0x06, 0x3C] },
            { "note": [0x0A, 0x0C, 0x05, 0x4A] },
            { "note": [0x01, 0x0B, 0x02, 0x5B] },
            { "note": [0x0F, 0x0C, 0x02, 0x4C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x06, 0x0F, 0x02, 0x600] }, // 256.00 Hz
            { "note": [0x06, 0x0E, 0x02, 0x640] }, // 292.57 Hz
            { "note": [0x06, 0x0D, 0x02, 0x680] }, // 341.33 Hz
            { "note": [0x06, 0x0E, 0x02, 0x6C0] }, // 409.60 Hz
            { "note": [0x06, 0x0D, 0x02, 0x700] }, // 512.00 Hz
            { "note": [0x06, 0x0C, 0x02, 0x740] }, // 682.67 Hz
            { "note": [0x06, 0x0B, 0x02, 0x780] }, // 1024.00 Hz
            { "note": [0x08, 0x0A, 0x01, 0x7C0] } // 2048.00 Hz
        ],
        "pulse2": [
            { "duty": 0x11 },
            { "note": [0x03, 0x00, -0x08, 0x001] }, // 64.03 Hz
            { "note": [0x06, 0x0C, 0x02, 0x5C1] }, // 227.95 Hz
            { "note": [0x06, 0x0B, 0x02, 0x602] }, // 257.00 Hz
            { "note": [0x06, 0x0A, 0x02, 0x641] }, // 293.23 Hz
            { "note": [0x06, 0x0B, 0x02, 0x682] }, // 343.12 Hz
            { "note": [0x06, 0x0A, 0x02, 0x6C2] }, // 412.18 Hz
            { "note": [0x06, 0x09, 0x02, 0x701] }, // 514.01 Hz
            { "note": [0x06, 0x0A, 0x02, 0x742] }, // 689.85 Hz
            { "note": [0x08, 0x08, 0x01, 0x781] } // 1032.06 Hz
        ],
        "noise": [
            { "note": [0x06, 0x00, -0x08, 0x01] },
            { "note": [0x05, 0x0E, 0x02, 0x5C] },
            { "note": [0x05, 0x0C, 0x02, 0x4C] },
            { "note": [0x05, 0x0D, 0x02, 0x3C] },
            { "note": [0x05, 0x0B, 0x02, 0x2C] },
            { "note": [0x05, 0x0C, 0x02, 0x1C] },
            { "note": [0x05, 0x0A, 0x02, 0x1B] },
            { "note": [0x05, 0x09, 0x02, 0x1A] },
            { "note": [0x08, 0x08, 0x01, 0x18] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xA5 },
            { "note": [0x03, 0x0F, 0x04, 0x641] }, // 293.23 Hz
            { "note": [0x0D, 0x0D, 0x06, 0x721] }, // 587.77 Hz
            { "note": [0x08, 0x0F, 0x04, 0x719] }, // 567.41 Hz
            { "note": [0x08, 0x0C, 0x01, 0x71A] } // 569.88 Hz
        ],
        "pulse2": [
            { "duty": 0xCC },
            { "note": [0x04, 0x0F, 0x04, 0x580] }, // 204.80 Hz
            { "note": [0x0E, 0x0E, 0x06, 0x6E0] }, // 455.11 Hz
            { "note": [0x08, 0x0D, 0x05, 0x6D8] }, // 442.81 Hz
            { "note": [0x08, 0x0D, 0x01, 0x6DC] } // 448.88 Hz
        ],
        "noise": [
            { "note": [0x05, 0x0C, 0x04, 0x46] },
            { "note": [0x0D, 0x0A, 0x05, 0x44] },
            { "note": [0x08, 0x0C, 0x04, 0x45] },
            { "note": [0x08, 0x0B, 0x01, 0x44] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x0D, 0x0F, 0x01, 0x511] }, // 174.53 Hz
            { "note": [0x0D, 0x0E, 0x01, 0x515] }, // 175.46 Hz
            { "note": [0x0D, 0x0E, 0x01, 0x511] }, // 174.53 Hz
            { "note": [0x08, 0x0D, 0x01, 0x511] } // 174.53 Hz
        ],
        "pulse2": [
            { "duty": 0x15 },
            { "note": [0x0C, 0x0E, 0x01, 0x50C] }, // 173.38 Hz
            { "note": [0x0C, 0x0D, 0x01, 0x510] }, // 174.30 Hz
            { "note": [0x0E, 0x0C, 0x01, 0x50C] }, // 173.38 Hz
            { "note": [0x08, 0x0C, 0x01, 0x50A] } // 172.92 Hz
        ],
        "noise": [
            { "note": [0x0E, 0x0F, 0x02, 0x65] },
            { "note": [0x0D, 0x0E, 0x02, 0x55] },
            { "note": [0x0E, 0x0D, 0x02, 0x56] },
            { "note": [0x08, 0x0D, 0x01, 0x66] }
        ]
    }, {
        "pulse1": [
            { "duty": 0x1B },
            { "note": [0x03, 0x0F, 0x03, 0x564] }, // 196.22 Hz
            { "note": [0x02, 0x0E, 0x02, 0x544] }, // 187.25 Hz
            { "note": [0x05, 0x0D, 0x01, 0x522] }, // 178.57 Hz
            { "note": [0x02, 0x0B, 0x02, 0x484] }, // 146.94 Hz
            { "note": [0x08, 0x0D, 0x01, 0x4A2] }, // 152.06 Hz
            { "note": [0x03, 0x0F, 0x03, 0x524] }, // 179.06 Hz
            { "note": [0x04, 0x0E, 0x04, 0x4E4] }, // 164.66 Hz
            { "note": [0x08, 0x0D, 0x01, 0x502] } // 171.11 Hz
        ],
        "pulse2": [
            { "duty": 0xCC },
            { "note": [0x03, 0x0D, 0x03, 0x560] }, // 195.05 Hz
            { "note": [0x02, 0x0C, 0x02, 0x540] }, // 186.18 Hz
            { "note": [0x05, 0x0C, 0x01, 0x520] }, // 178.09 Hz
            { "note": [0x02, 0x09, 0x02, 0x480] }, // 146.29 Hz
            { "note": [0x08, 0x0C, 0x01, 0x4A0] }, // 151.70 Hz
            { "note": [0x03, 0x0D, 0x03, 0x520] }, // 178.09 Hz
            { "note": [0x03, 0x0C, 0x04, 0x4E0] }, // 163.84 Hz
            { "note": [0x08, 0x0C, 0x01, 0x500] } // 170.67 Hz
        ],
        "noise": []
    }, {
        "pulse1": [
            { "duty": 0x11 },
            { "note": [0x02, 0x03, -0x05, 0x381] }, // 113.88 Hz
            { "note": [0x07, 0x0F, 0x05, 0x601] }, // 256.50 Hz
            { "note": [0x01, 0x0C, 0x02, 0x481] }, // 146.45 Hz
            { "note": [0x08, 0x09, 0x01, 0x381] } // 113.88 Hz
        ],
        "pulse2": [
            { "duty": 0xEE },
            { "note": [0x02, 0x03, -0x06, 0x5B0] }, // 221.41 Hz
            { "note": [0x07, 0x0D, 0x05, 0x75D] }, // 804.12 Hz
            { "note": [0x01, 0x0B, 0x02, 0x6B0] }, // 390.10 Hz
            { "note": [0x08, 0x06, 0x01, 0x5B0] } // 221.41 Hz
        ],
        "noise": [
            { "note": [0x02, 0x09, 0x02, 0x49] },
            { "note": [0x07, 0x0B, 0x05, 0x29] },
            { "note": [0x01, 0x0A, 0x02, 0x39] },
            { "note": [0x08, 0x09, 0x01, 0x49] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x0F, 0x0F, 0x07, 0x7C0] }, // 2048.00 Hz
            { "note": [0x06, 0x0E, 0x04, 0x7C1] }, // 2080.51 Hz
            { "note": [0x0A, 0x0F, 0x06, 0x7C0] }, // 2048.00 Hz
            { "note": [0x04, 0x0D, 0x03, 0x7C2] }, // 2114.06 Hz
            { "note": [0x08, 0x0C, 0x01, 0x7C0] } // 2048.00 Hz
        ],
        "pulse2": [
            { "duty": 0x5F },
            { "note": [0x0F, 0x09, 0x07, 0x781] }, // 1032.06 Hz
            { "note": [0x06, 0x08, 0x04, 0x780] }, // 1024.00 Hz
            { "note": [0x0A, 0x09, 0x06, 0x781] }, // 1032.06 Hz
            { "note": [0x0F, 0x08, 0x03, 0x781] } // 1032.06 Hz
        ],
        "noise": [
            { "note": [0x03, 0x0F, 0x02, 0x3C] },
            { "note": [0x0D, 0x0E, 0x06, 0x2C] },
            { "note": [0x0F, 0x0D, 0x07, 0x3C] },
            { "note": [0x08, 0x0C, 0x01, 0x2C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xF0 },
            { "note": [0x0F, 0x0F, 0x07, 0x680] }, // 341.33 Hz
            { "note": [0x0A, 0x0E, 0x06, 0x684] }, // 344.93 Hz
            { "note": [0x0F, 0x0D, 0x07, 0x690] }, // 356.17 Hz
            { "note": [0x08, 0x0D, 0x05, 0x690] }, // 356.17 Hz
            { "note": [0x06, 0x0C, 0x04, 0x688] }, // 348.60 Hz
            { "note": [0x05, 0x0D, 0x03, 0x670] }, // 327.68 Hz
            { "note": [0x04, 0x0D, 0x03, 0x660] }, // 315.08 Hz
            { "note": [0x08, 0x0C, 0x01, 0x640] } // 292.57 Hz
        ],
        "pulse2": [
            { "duty": 0x05 },
            { "note": [0x0F, 0x0B, 0x07, 0x641] }, // 293.23 Hz
            { "note": [0x0A, 0x09, 0x06, 0x642] }, // 293.88 Hz
            { "note": [0x0F, 0x0A, 0x07, 0x651] }, // 304.11 Hz
            { "note": [0x08, 0x0A, 0x05, 0x651] }, // 304.11 Hz
            { "note": [0x06, 0x09, 0x04, 0x647] }, // 297.22 Hz
            { "note": [0x05, 0x0A, 0x03, 0x631] }, // 283.09 Hz
            { "note": [0x04, 0x09, 0x03, 0x622] }, // 274.21 Hz
            { "note": [0x08, 0x07, 0x01, 0x601] } // 256.50 Hz
        ],
        "noise": [
            { "note": [0x0F, 0x0E, 0x04, 0x3C] },
            { "note": [0x0A, 0x0C, 0x07, 0x4C] },
            { "note": [0x0A, 0x0C, 0x07, 0x3C] },
            { "note": [0x0C, 0x0B, 0x07, 0x4C] },
            { "note": [0x0F, 0x0A, 0x02, 0x5C] }
        ]
    }, {
        "pulse1": [
            { "duty": 0xA5 },
            { "note": [0x06, 0x0F, 0x04, 0x740] }, // 682.67 Hz
            { "note": [0x0F, 0x0E, 0x03, 0x730] }, // 630.15 Hz
            { "note": [0x04, 0x0F, 0x04, 0x740] }, // 682.67 Hz
            { "note": [0x05, 0x0B, 0x03, 0x748] }, // 712.35 Hz
            { "note": [0x08, 0x0D, 0x01, 0x750] } // 744.73 Hz
        ],
        "pulse2": [
            { "duty": 0x77 },
            { "note": [0x06, 0x0C, 0x03, 0x712] }, // 550.72 Hz
            { "note": [0x0F, 0x0B, 0x03, 0x704] }, // 520.13 Hz
            { "note": [0x03, 0x0C, 0x03, 0x712] }, // 550.72 Hz
            { "note": [0x04, 0x0C, 0x03, 0x721] }, // 587.77 Hz
            { "note": [0x08, 0x0B, 0x01, 0x732] } // 636.27 Hz
        ],
        "noise": [
            { "note": [0x08, 0x0D, 0x06, 0x2C] },
            { "note": [0x0C, 0x0C, 0x06, 0x3C] },
            { "note": [0x0A, 0x0B, 0x06, 0x2C] },
            { "note": [0x08, 0x09, 0x01, 0x1C] }
        ]
    }
]);


/***/ }),

/***/ "./src/ui/WaveDiagram.ts":
/*!*******************************!*\
  !*** ./src/ui/WaveDiagram.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var WaveDiagram = /** @class */ (function () {
    function WaveDiagram(element) {
        this.element = element;
        this.chunkSize = 10000;
        this.diminution = 20;
    }
    WaveDiagram.prototype.render = function (waves) {
        this.element.innerHTML = "";
        var index = 0;
        for (var _i = 0, waves_1 = waves; _i < waves_1.length; _i++) {
            var wave = waves_1[_i];
            this.renderWave(wave, index, waves.length);
            index++;
        }
    };
    WaveDiagram.prototype.renderWave = function (wave, waveIndex, waveCount) {
        var singleWaveMaxHeight = 400 / waveCount;
        var baseY = waveIndex * singleWaveMaxHeight;
        var waveChunkCount = Math.ceil(wave.length / this.chunkSize / this.diminution);
        for (var chunkIndex = 0; chunkIndex < waveChunkCount; chunkIndex++) {
            var element = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            element.style.fill = "none";
            element.style.stroke = "black";
            element.style.strokeWidth = "3";
            var points = [];
            for (var chunkPosition = 0; chunkPosition < this.chunkSize; chunkPosition++) {
                var position = this.chunkSize * chunkIndex + chunkPosition;
                var waveDataIndex = this.diminution * position;
                var waveData = wave[waveDataIndex];
                if (typeof waveData === "undefined") {
                    break;
                }
                var x = position / 4;
                var y = Math.round(100 * (baseY +
                    singleWaveMaxHeight * waveData / 2 +
                    singleWaveMaxHeight / 2)) / 100;
                var point = [x, y];
                points.push(point.join(","));
            }
            element.setAttribute("points", points.join(" "));
            this.element.appendChild(element);
        }
    };
    return WaveDiagram;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WaveDiagram);


/***/ }),

/***/ "./src/ui/index.ts":
/*!*************************!*\
  !*** ./src/ui/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_cryTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/cryTypes */ "./src/data/cryTypes.ts");
/* harmony import */ var _WaveDiagram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WaveDiagram */ "./src/ui/WaveDiagram.ts");
/* harmony import */ var _CryGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CryGenerator */ "./src/CryGenerator.ts");
/* harmony import */ var _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/BaseCryManager */ "./src/data/BaseCryManager.ts");
/* harmony import */ var _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../data/MonsterManager */ "./src/data/MonsterManager.ts");



window["cryType"] = _data_cryTypes__WEBPACK_IMPORTED_MODULE_2__["default"];




var Ui = /** @class */ (function () {
    function Ui() {
        var _this = this;
        this.volume = 100;
        this.customCryType = {
            name: "Custom",
            noise: [],
            pulse1: [],
            pulse2: []
        };
        this.cryTypes = [this.customCryType].concat(_data_cryTypes__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.cryGenerator = new _CryGenerator__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this.monReferenceRange = 151;
        this.onBaseCryNewClick = function () {
            var newIdx = _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_5__.BaseCryManager.addNew();
            _this.currentBaseCryIdx = newIdx;
            _this.refresh();
        };
        this.onBaseCryCopyClick = function () {
            var newIdx = _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_5__.BaseCryManager.copy(_this.baseCrySelectorElement.selectedIndex);
            _this.currentBaseCryIdx = newIdx;
            _this.refresh();
        };
        this.onBaseCryDeleteClick = function () {
            _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_5__.BaseCryManager.delete(_this.baseCrySelectorElement.selectedIndex);
            _this.currentBaseCryIdx = 0;
            _this.refresh();
        };
        this.onSelectedBaseCryChange = function () {
            _this.currentBaseCryIdx = _this.baseCrySelectorElement.selectedIndex;
            if (_this.currentMonIdx >= _this.monReferenceRange) {
                _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.updateCry(_this.currentMonIdx, _this.currentBaseCryIdx);
            }
            _this.refresh();
        };
        this.onBaseCryNameChange = function () {
            _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_5__.BaseCryManager.updateName(_this.currentBaseCryIdx, _this.baseCryNameInput.value);
            _this.refresh();
        };
        this.onMonNameChange = function () {
            _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.updateName(_this.currentMonIdx, _this.monCryNameInput.value);
            _this.refresh();
        };
        this.onMonNewClick = function () {
            var newIdx = _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.addNew();
            _this.currentMonIdx = newIdx;
            _this.refresh();
        };
        this.onMonCopyClick = function () {
            var newIdx = _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.copy(_this.currentMonIdx);
            _this.currentMonIdx = newIdx;
            _this.refresh();
        };
        this.onMonDeleteClick = function () {
            _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.delete(_this.currentMonIdx);
            _this.currentMonIdx = 0;
            _this.refresh();
        };
        this.onPlayClick = function () {
            var _a = _this.generateData(), pulse1 = _a.pulse1, pulse2 = _a.pulse2, noise = _a.noise, data = _a.data;
            _this.waveDiagram.render([
                pulse1,
                pulse2,
                noise,
                data
            ]);
            var resampled = _util__WEBPACK_IMPORTED_MODULE_0__.resamplePcm(_this.cryGenerator.sourceSampleRate, _this.cryGenerator.audioContext.sampleRate, data, _this.volume);
            _this.cryGenerator.play(resampled);
        };
        this.onPitchChange = function (e) {
            var element = e.currentTarget;
            var pitch = parseInt(element.value, 10);
            if (_this.currentMonIdx >= _this.monReferenceRange) {
                _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.updatePitch(_this.currentMonIdx, pitch);
            }
            _this.setPitch(pitch);
        };
        this.onLengthChange = function (e) {
            var element = e.currentTarget;
            var length = parseInt(element.value, 10);
            if (_this.currentMonIdx >= _this.monReferenceRange) {
                _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.updateLength(_this.currentMonIdx, length);
            }
            _this.setLength(length);
        };
        this.onVolumeChange = function (e) {
            var element = e.currentTarget;
            var volume = parseInt(element.value, 10);
            _this.volume = volume;
        };
        this.selectPokemon = function () {
            var pokemon = _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.get(_this.currentMonIdx);
            _this.selectedPokemon = pokemon;
            _this.currentBaseCryIdx = pokemon.cry;
            _this.refresh();
            //this.selectCryType(cryTypes[pokemon.cry]);
            _this.setPitch(pokemon.pitch);
            _this.setLength(pokemon.length - 0x80);
            //this.refresh();
        };
        this.selectCryType = function (cryType) {
            if (cryType === _this.selectedCryType)
                return;
            _this.selectedCryTypeIndex = _this.cryTypes.indexOf(cryType);
            _this.selectedCryType = cryType;
            //this.selectedCryTypeSelectElement.value = this.selectedCryTypeIndex.toString();
        };
        this.onSelectedPokemonChange = function (e) {
            _this.currentMonIdx = _this.selectedPokemonSelectElement.selectedIndex;
            _this.selectPokemon();
            _this.updateCommands();
        };
        this.onCryTypeChange = function (e) {
            var element = e.currentTarget;
            var cryTypeIndex = parseInt(element.value, 10);
            _this.selectCryType(_this.cryTypes[cryTypeIndex]);
            _this.updateCommands();
        };
        this.onCommandsInput = function () {
            _this.parseCryCommands();
            //this.updateCommands();
        };
        this.download = function () {
            var data = _this.generateData().data;
            var resampled = _util__WEBPACK_IMPORTED_MODULE_0__.resamplePcm(_this.cryGenerator.sourceSampleRate, _this.cryGenerator.audioContext.sampleRate, data, _this.volume);
            var seconds = resampled.length / _this.cryGenerator.audioContext.sampleRate;
            var blob = _util__WEBPACK_IMPORTED_MODULE_0__.convertPcmToWav(seconds, 1, _this.cryGenerator.audioContext.sampleRate, 1, resampled);
            var filename = _this.selectedCryType === _this.customCryType ?
                "custom-cry" :
                _this.selectedPokemon.name.toLowerCase() + "-cry";
            (0,file_saver__WEBPACK_IMPORTED_MODULE_1__.saveAs)(blob, "".concat(filename, ".wav"));
        };
        /* updateRawCommands(cryType: CryType) {
           let content = "";
       
           const pulse1 = cryType.pulse1;
           for (let index = 0; index < pulse1.length; index++) {
             const command = pulse1[index];
             if (command.duty !== undefined) {
               const duty = command.duty;
               content += "FC " + (duty < 0x10 ? "0" : "") + duty.toString(0x10).toUpperCase() + " ";
             } else if (command.note) {
               content += "2" + (command.note[0] & 0xF).toString(0x10).toUpperCase() + " ";
               content += (command.note[1] & 0xF).toString(0x10).toUpperCase() + (command.note[2] & 0xF).toString(0x10).toUpperCase() + " ";
       
               const length = command.note[3] & 0xFF, height = (command.note[3] >> 8) & 0xFF;
               content += (length < 0x10 ? "0" : "") + length.toString(0x10).toUpperCase() + " " + (height < 0x10 ? "0" : "") + height.toString(0x10).toUpperCase() + " ";
             }
           }
       
           content += "FF ";
       
           const pulse2 = cryType.pulse2;
           for (let index = 0; index < pulse2.length; index++) {
             const command = pulse2[index];
             if (command.duty !== undefined) {
               const duty = command.duty;
               content += "FC " + (duty < 0x10 ? "0" : "") + duty.toString(0x10).toUpperCase() + " ";
             } else if (command.note) {
               content += "2" + (command.note[0] & 0xF).toString(0x10).toUpperCase() + " ";
               content += (command.note[1] & 0xF).toString(0x10).toUpperCase() + (command.note[2] & 0xF).toString(0x10).toUpperCase() + " ";
       
               const length = command.note[3] & 0xFF, height = (command.note[3] >> 8) & 0xFF;
               content += (length < 0x10 ? "0" : "") + length.toString(0x10).toUpperCase() + " " + (height < 0x10 ? "0" : "") + height.toString(0x10).toUpperCase() + " ";
             }
           }
       
           content += "FF ";
       
           const noise = cryType.noise;
           for (let index = 0; index < noise.length; index++) {
             const command = noise[index];
             if (command.note) {
               content += "2" + (command.note[0] & 0xF).toString(0x10).toUpperCase() + " ";
               content += (command.note[1] & 0xF).toString(0x10).toUpperCase() + (command.note[2] & 0xF).toString(0x10).toUpperCase() + " ";
       
               const length = command.note[3] & 0xFF;
               content += (length < 0x10 ? "0" : "") + length.toString(0x10).toUpperCase() + " ";
             }
           }
       
           content += "FF ";
       
           this.rawCommandsElement.value = content;
         }*/
    }
    Ui.prototype.init = function () {
        this.currentBaseCryIdx = 0;
        this.currentMonIdx = 0;
        this.waveDiagramElement = document.querySelector("#wave-diagram");
        this.selectedPokemonSelectElement = document.querySelector("#selected-pokemon");
        this.selectedPokemonSelectElement.addEventListener("change", this.onSelectedPokemonChange);
        // this.selectedCryTypeSelectElement = document.querySelector<HTMLSelectElement>("#selected-cry-type");
        // this.selectedCryTypeSelectElement.addEventListener("change", this.onCryTypeChange);
        this.pitchInputElement = document.querySelector("#pitch");
        this.pitchInputElement.addEventListener("change", this.onPitchChange);
        this.lengthInputElement = document.querySelector("#length");
        this.lengthInputElement.addEventListener("change", this.onLengthChange);
        this.volumeInputElement = document.querySelector("#volume");
        this.volumeInputElement.addEventListener("change", this.onVolumeChange);
        this.playButtonElement = document.querySelector("#play");
        this.playButtonElement.addEventListener("click", this.onPlayClick);
        this.newBaseCryButton = document.querySelector("#new");
        this.newBaseCryButton.addEventListener("click", this.onBaseCryNewClick);
        this.copyBaseCryButton = document.querySelector("#copy");
        this.copyBaseCryButton.addEventListener("click", this.onBaseCryCopyClick);
        this.deleteBaseCryButton = document.querySelector("#delete");
        this.deleteBaseCryButton.addEventListener("click", this.onBaseCryDeleteClick);
        this.downloadButtonElement = document.querySelector("#download");
        this.downloadButtonElement.addEventListener("click", this.download);
        this.pulse1EnabledElement = document.querySelector("#pulse1-enabled");
        this.pulse2EnabledElement = document.querySelector("#pulse2-enabled");
        this.noiseEnabledElement = document.querySelector("#noise-enabled");
        this.pulse1CommandsElement = document.querySelector("#pulse1cmds");
        this.pulse1CommandsElement.addEventListener("input", this.onCommandsInput);
        this.pulse2CommandsElement = document.querySelector("#pulse2cmds");
        this.pulse2CommandsElement.addEventListener("input", this.onCommandsInput);
        this.noiseCommandsElement = document.querySelector("#noisecmds");
        this.noiseCommandsElement.addEventListener("input", this.onCommandsInput);
        //this.rawCommandsElement = document.querySelector<HTMLTextAreaElement>("#rawcmds");
        this.baseCrySelectorElement = document.querySelector("#selected-basecry");
        this.baseCrySelectorElement.addEventListener("change", this.onSelectedBaseCryChange);
        this.baseCryNameInput = document.querySelector("#name");
        this.baseCryNameInput.addEventListener("change", this.onBaseCryNameChange);
        this.monCryNameInput = document.querySelector("#mon_name");
        this.monCryNameInput.addEventListener("change", this.onMonNameChange);
        this.newMonButton = document.querySelector("#mon_new");
        this.newMonButton.addEventListener("click", this.onMonNewClick);
        this.copyMonButton = document.querySelector("#mon_copy");
        this.copyMonButton.addEventListener("click", this.onMonCopyClick);
        this.deleteMonButton = document.querySelector("#mon_delete");
        this.deleteMonButton.addEventListener("click", this.onMonDeleteClick);
        this.createElements();
        this.selectPokemon();
        this.updateCommands();
    };
    Ui.prototype.refresh = function () {
        this.createElements();
    };
    Ui.prototype.createElements = function () {
        var index = 0;
        this.selectedPokemonSelectElement.innerHTML = "";
        for (var _i = 0, _a = _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.data; _i < _a.length; _i++) {
            var pokemon = _a[_i];
            var option = _util__WEBPACK_IMPORTED_MODULE_0__.createSelectOption("#".concat(index + 1, ": ").concat(pokemon.name), index.toString());
            this.selectedPokemonSelectElement.appendChild(option);
            index++;
        }
        this.selectedPokemonSelectElement.selectedIndex = this.currentMonIdx;
        this.monCryNameInput.value = _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.get(this.currentMonIdx).name;
        /*this.selectedCryTypeSelectElement.innerHTML = "";
        index = 0;
        for (const cryType of this.cryTypes) {
          const name = this.getCryTypeName(cryType);
          const value = index.toString();
    
          const option = util.createSelectOption(name, value);
          this.selectedCryTypeSelectElement.appendChild(option);
          index++;
        }*/
        this.baseCrySelectorElement.innerHTML = "";
        index = 0;
        for (var _b = 0, _c = _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_5__.BaseCryManager.data; _b < _c.length; _b++) {
            var baseCry = _c[_b];
            var option = _util__WEBPACK_IMPORTED_MODULE_0__.createSelectOption("#".concat(index + 1, ": ").concat(baseCry.name), index.toString());
            this.baseCrySelectorElement.appendChild(option);
            index++;
        }
        this.baseCryNameInput.value = _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_5__.BaseCryManager.get(this.currentBaseCryIdx).name;
        this.baseCrySelectorElement.selectedIndex = this.currentBaseCryIdx;
        this.waveDiagram = new _WaveDiagram__WEBPACK_IMPORTED_MODULE_3__["default"](this.waveDiagramElement);
        // 
        this.updateCommands();
    };
    Ui.prototype.getCryTypeName = function (cryType) {
        return typeof cryType.name === "string" ?
            cryType.name :
            (_data_cryTypes__WEBPACK_IMPORTED_MODULE_2__["default"].indexOf(cryType) + 1).toString();
    };
    Ui.prototype.generateData = function () {
        this.updateCommands();
        var currentChannels = _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_5__.BaseCryManager.get(this.currentBaseCryIdx).channels;
        this.cryGenerator.init();
        var _a = this.cryGenerator.generate(currentChannels, this.pitch, this.length), pulse1 = _a.pulse1, pulse2 = _a.pulse2, noise = _a.noise;
        var waves = [];
        if (this.pulse1EnabledElement.checked) {
            waves.push(pulse1);
        }
        if (this.pulse2EnabledElement.checked) {
            waves.push(pulse2);
        }
        if (this.noiseEnabledElement.checked) {
            waves.push(noise);
        }
        var data = this.mixWaves(waves, 3);
        return {
            pulse1: pulse1,
            pulse2: pulse2,
            noise: noise,
            data: data
        };
    };
    Ui.prototype.updateCurrentMonsterSettings = function () {
    };
    Ui.prototype.mixWaves = function (waves, reduction) {
        var totalLength = waves.reduce(function (prev, current) { return Math.max(prev, current.length); }, 0);
        var data = new Array(totalLength).fill(0);
        for (var _i = 0, waves_1 = waves; _i < waves_1.length; _i++) {
            var wave = waves_1[_i];
            for (var index = 0; index < wave.length; index++) {
                data[index] += wave[index] / reduction;
            }
        }
        return data;
    };
    Ui.prototype.setPitch = function (value) {
        this.pitchInputElement.value = value.toString();
        this.pitch = value;
    };
    Ui.prototype.setLength = function (value) {
        this.lengthInputElement.value = value.toString();
        this.length = value;
    };
    Ui.prototype.updateCommands = function () {
        // if (this.selectedCryType !== this.customCryType) {
        //    this.updateCryTypeCommands(this.selectedCryType);
        //  } else {
        //     this.parseCustomCryTypeCommands();
        //   }
        // this.updateRawCommands(this.selectedCryType);
        //this.parseCryCommands();
        this.updateCryTypeCommands(_data_BaseCryManager__WEBPACK_IMPORTED_MODULE_5__.BaseCryManager.get(this.currentBaseCryIdx));
    };
    Ui.prototype.parseCryCommands = function () {
        var pulse1Commands = this.pulse1CommandsElement.value.split("\n");
        var pulse2Commands = this.pulse2CommandsElement.value.split("\n");
        var noiseCommands = this.noiseCommandsElement.value.split("\n");
        var newCommands = {
            pulse1: [],
            pulse2: [],
            noise: []
        };
        var pulse1 = [];
        for (var index = 0; index < pulse1Commands.length; index++) {
            var command = pulse1Commands[index].split(" ");
            if (command[0] === "duty") {
                pulse1.push({ "duty": parseInt(command[1]) });
            }
            else if (command[0] === "note") {
                pulse1.push({ "note": [parseInt(command[1]), parseInt(command[2]), parseInt(command[3]), parseInt(command[4])] });
            }
        }
        newCommands.pulse1 = pulse1;
        var pulse2 = [];
        for (var index = 0; index < pulse2Commands.length; index++) {
            var command = pulse2Commands[index].split(" ");
            if (command[0] === "duty") {
                pulse2.push({ "duty": parseInt(command[1]) });
            }
            else if (command[0] === "note") {
                pulse2.push({ "note": [parseInt(command[1]), parseInt(command[2]), parseInt(command[3]), parseInt(command[4])] });
            }
        }
        newCommands.pulse2 = pulse2;
        var noise = [];
        for (var index = 0; index < noiseCommands.length; index++) {
            var command = noiseCommands[index].split(" ");
            if (command[0] === "note") {
                noise.push({ "note": [parseInt(command[1]), parseInt(command[2]), parseInt(command[3]), parseInt(command[4])] });
            }
        }
        newCommands.noise = noise;
        _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_5__.BaseCryManager.updateChannels(this.currentBaseCryIdx, newCommands);
    };
    Ui.prototype.updateCryTypeCommands = function (cryInfo) {
        var cry = cryInfo.channels;
        this.pulse1CommandsElement.disabled = cryInfo.isReference;
        this.pulse1CommandsElement.value = "";
        for (var index = 0; index < cry.pulse1.length; index++) {
            if (cry.pulse1[index].duty !== undefined) {
                this.pulse1CommandsElement.value = this.pulse1CommandsElement.value +
                    "duty 0x" + cry.pulse1[index].duty.toString(0x10) + "\n";
            }
            else if (cry.pulse1[index].note) {
                this.pulse1CommandsElement.value = this.pulse1CommandsElement.value +
                    "note " +
                    (cry.pulse1[index].note[0]) + " " +
                    cry.pulse1[index].note[1] + " " +
                    cry.pulse1[index].note[2] + " " +
                    cry.pulse1[index].note[3] + "\n";
            }
        }
        this.pulse2CommandsElement.value = "";
        this.pulse2CommandsElement.disabled = cryInfo.isReference;
        for (var index = 0; index < cry.pulse2.length; index++) {
            if (cry.pulse2[index].duty !== undefined) {
                this.pulse2CommandsElement.value = this.pulse2CommandsElement.value +
                    "duty 0x" + cry.pulse2[index].duty.toString(0x10) + "\n";
            }
            else if (cry.pulse2[index].note) {
                this.pulse2CommandsElement.value = this.pulse2CommandsElement.value +
                    "note " +
                    (cry.pulse2[index].note[0]) + " " +
                    cry.pulse2[index].note[1] + " " +
                    cry.pulse2[index].note[2] + " " +
                    cry.pulse2[index].note[3] + "\n";
            }
        }
        this.noiseCommandsElement.value = "";
        this.noiseCommandsElement.disabled = cryInfo.isReference;
        for (var index = 0; index < cry.noise.length; index++) {
            if (cry.noise[index].note) {
                this.noiseCommandsElement.value = this.noiseCommandsElement.value +
                    "note " +
                    (cry.noise[index].note[0]) + " " +
                    cry.noise[index].note[1] + " " +
                    cry.noise[index].note[2] + " 0x" +
                    cry.noise[index].note[3].toString(0x10) + "\n";
            }
        }
    };
    return Ui;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Ui());


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertPcmToWav: () => (/* binding */ convertPcmToWav),
/* harmony export */   createSelectOption: () => (/* binding */ createSelectOption),
/* harmony export */   resamplePcm: () => (/* binding */ resamplePcm)
/* harmony export */ });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");

var createSelectOption = function (text, value) {
    var option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    return option;
};
var convertPcmToWav = function (durationInSeconds, numberOfChannels, sampleRate, bytesPerSample, samples) {
    var bitsPerSample = bytesPerSample * 8;
    var sampleSize = numberOfChannels * bytesPerSample;
    var bytesPerSecond = sampleSize * sampleRate;
    var dataSize = durationInSeconds * bytesPerSecond;
    var fullSize = 44 + dataSize;
    var buffer = buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer.alloc(fullSize);
    var offset = 0;
    buffer.write("RIFF", offset, "utf8");
    offset += 4;
    buffer.writeUInt32LE(fullSize, offset);
    offset += 4;
    buffer.write("WAVE", offset, "utf8");
    offset += 4;
    buffer.write("fmt ", offset, "utf8");
    offset += 4;
    buffer.writeUInt32LE(16, offset); // remaining header size
    offset += 4;
    buffer.writeUInt16LE(1, offset); // PCM type
    offset += 2;
    buffer.writeUInt16LE(numberOfChannels, offset);
    offset += 2;
    buffer.writeUInt32LE(sampleRate, offset);
    offset += 4;
    buffer.writeUInt32LE(bytesPerSecond, offset);
    offset += 4;
    buffer.writeUInt16LE(sampleSize, offset);
    offset += 2;
    buffer.writeUInt16LE(bitsPerSample, offset);
    offset += 2;
    buffer.write("data", offset, "utf8");
    offset += 4;
    buffer.writeUInt32LE(dataSize, offset);
    offset += 4;
    for (var secondIndex = 0; secondIndex < durationInSeconds; secondIndex++) {
        for (var currentSecondSampleIndex = 0; currentSecondSampleIndex < sampleRate; currentSecondSampleIndex += bytesPerSample) {
            var sampleIndex = secondIndex * sampleRate + currentSecondSampleIndex;
            var value = samples[sampleIndex];
            if (typeof value === "undefined")
                break;
            var scaledValue = (value * 0xFF) + (0xFF / 2);
            value = scaledValue & 0xFF;
            buffer.writeUInt8(value, offset);
            offset += bytesPerSample;
        }
    }
    return new Blob([buffer], { type: "audio/wav" });
};
var resamplePcm = function (fromSampleRate, toSampleRate, data, volume) {
    if (volume === void 0) { volume = 100; }
    var resampled = [];
    var resampleRateRatio = fromSampleRate / toSampleRate;
    var resampledLength = Math.ceil(data.length / resampleRateRatio);
    var volumeFactor = volume / 0x100;
    for (var resampledIndex = 0; resampledIndex < resampledLength; resampledIndex++) {
        var index = Math.floor(resampledIndex * resampleRateRatio);
        var fraction = resampledIndex * resampleRateRatio - index;
        resampled[resampledIndex] = ((1 - fraction) * data[index] +
            fraction * data[index + 1]) * volumeFactor;
    }
    return resampled;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/ui/index.ts");
/* harmony import */ var _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/BaseCryManager */ "./src/data/BaseCryManager.ts");
/* harmony import */ var _data_MonsterManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/MonsterManager */ "./src/data/MonsterManager.ts");



window.addEventListener("load", function () {
    _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_1__.BaseCryManager.init();
    _data_MonsterManager__WEBPACK_IMPORTED_MODULE_2__.MonsterManager.init();
    _ui__WEBPACK_IMPORTED_MODULE_0__["default"].init();
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZZOztBQUVaLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFWTs7QUFFWixlQUFlLG1CQUFPLENBQUMsb0RBQVc7QUFDbEMsZ0JBQWdCLG1CQUFPLENBQUMsZ0RBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkLGtCQUFrQjtBQUNsQix5QkFBeUI7O0FBRXpCO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7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RUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUUsRUFDUjtLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRSxFQUNSO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsV0FBVztTQUNuRDtRQUNELFFBQVEsRUFBRSxFQUNUO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRyxhQUFhO1lBQ3JELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsYUFBYTtTQUNyRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUcsWUFBWTtTQUNyRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNyQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDckMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFLEVBQ1I7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNyQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLGFBQWE7U0FDckQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLGFBQWE7U0FDckQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRSxFQUNSO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsYUFBYTtTQUNyRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3JDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsYUFBYTtTQUNyRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3JDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFLEVBQUU7S0FDWixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFHLFlBQVk7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFHLFlBQVk7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFHLFlBQVk7U0FDckQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUcsWUFBWTtTQUNyRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFB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c0I7QUFDaUM7QUFDQTtBQUV2RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0lBQzlCLGdFQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsZ0VBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QiwyQ0FBRSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vbm9kZV9tb2R1bGVzL2ZpbGUtc2F2ZXIvZGlzdC9GaWxlU2F2ZXIubWluLmpzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vc3JjL0NyeUdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vc3JjL2RhdGEvQmFzZUNyeU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL3NyYy9kYXRhL01vbnN0ZXJNYW5hZ2VyLnRzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9zcmMvZGF0YS9jcnlUeXBlcy50cyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vc3JjL3VpL1dhdmVEaWFncmFtLnRzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9zcmMvdWkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL3NyYy91dGlsLnRzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInBva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wicG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplclwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxuLy8gU3VwcG9ydCBkZWNvZGluZyBVUkwtc2FmZSBiYXNlNjQgc3RyaW5ncywgYXMgTm9kZS5qcyBkb2VzLlxuLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQjVVJMX2FwcGxpY2F0aW9uc1xucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gZ2V0TGVucyAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIFRyaW0gb2ZmIGV4dHJhIGJ5dGVzIGFmdGVyIHBsYWNlaG9sZGVyIGJ5dGVzIGFyZSBmb3VuZFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZWF0Z2FtbWl0L2Jhc2U2NC1qcy9pc3N1ZXMvNDJcbiAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoJz0nKVxuICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlblxuXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuXG4gICAgPyAwXG4gICAgOiA0IC0gKHZhbGlkTGVuICUgNClcblxuICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dXG59XG5cbi8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIF9ieXRlTGVuZ3RoIChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG5cbiAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSlcblxuICB2YXIgY3VyQnl0ZSA9IDBcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIHZhciBsZW4gPSBwbGFjZUhvbGRlcnNMZW4gPiAwXG4gICAgPyB2YWxpZExlbiAtIDRcbiAgICA6IHZhbGlkTGVuXG5cbiAgdmFyIGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKFxuICAgICAgdWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKVxuICAgICkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG5jb25zdCBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5jb25zdCBjdXN0b21JbnNwZWN0U3ltYm9sID1cbiAgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbFsnZm9yJ10gPT09ICdmdW5jdGlvbicpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgPyBTeW1ib2xbJ2ZvciddKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgOiBudWxsXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuY29uc3QgS19NQVhfTEVOR1RIID0gMHg3ZmZmZmZmZlxuZXhwb3J0cy5rTWF4TGVuZ3RoID0gS19NQVhfTEVOR1RIXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFByaW50IHdhcm5pbmcgYW5kIHJlY29tbWVuZCB1c2luZyBgYnVmZmVyYCB2NC54IHdoaWNoIGhhcyBhbiBPYmplY3RcbiAqICAgICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIFdlIHJlcG9ydCB0aGF0IHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGlmIHRoZSBhcmUgbm90IHN1YmNsYXNzYWJsZVxuICogdXNpbmcgX19wcm90b19fLiBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YFxuICogKFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4KS4gSUUgMTAgbGFja3Mgc3VwcG9ydFxuICogZm9yIF9fcHJvdG9fXyBhbmQgaGFzIGEgYnVnZ3kgdHlwZWQgYXJyYXkgaW1wbGVtZW50YXRpb24uXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5pZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSAnICtcbiAgICAnYGJ1ZmZlcmAgdjUueC4gVXNlIGBidWZmZXJgIHY0LnggaWYgeW91IHJlcXVpcmUgb2xkIGJyb3dzZXIgc3VwcG9ydC4nXG4gIClcbn1cblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICAvLyBDYW4gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWQ/XG4gIHRyeSB7XG4gICAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBjb25zdCBwcm90byA9IHsgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9IH1cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvdG8sIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihhcnIsIHByb3RvKVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ3BhcmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5idWZmZXJcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdvZmZzZXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnl0ZU9mZnNldFxuICB9XG59KVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBsZW5ndGggKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlWaWV3KHZhbHVlKVxuICB9XG5cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksICcgK1xuICAgICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICAgIClcbiAgfVxuXG4gIGlmIChpc0luc3RhbmNlKHZhbHVlLCBBcnJheUJ1ZmZlcikgfHxcbiAgICAgICh2YWx1ZSAmJiBpc0luc3RhbmNlKHZhbHVlLmJ1ZmZlciwgQXJyYXlCdWZmZXIpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAoaXNJbnN0YW5jZSh2YWx1ZSwgU2hhcmVkQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIFNoYXJlZEFycmF5QnVmZmVyKSkpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mICYmIHZhbHVlLnZhbHVlT2YoKVxuICBpZiAodmFsdWVPZiAhPSBudWxsICYmIHZhbHVlT2YgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlT2YsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IGIgPSBmcm9tT2JqZWN0KHZhbHVlKVxuICBpZiAoYikgcmV0dXJuIGJcblxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvUHJpbWl0aXZlICE9IG51bGwgJiZcbiAgICAgIHR5cGVvZiB2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ3N0cmluZycpLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gIClcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbSh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBOb3RlOiBDaGFuZ2UgcHJvdG90eXBlICphZnRlciogQnVmZmVyLmZyb20gaXMgZGVmaW5lZCB0byB3b3JrYXJvdW5kIENocm9tZSBidWc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzE0OFxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlci5wcm90b3R5cGUsIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlciwgVWludDhBcnJheSlcblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIHNpemUgKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgbGV0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG5cbiAgY29uc3QgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgY29uc3QgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGJ1ZltpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlWaWV3IChhcnJheVZpZXcpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYXJyYXlWaWV3LCBVaW50OEFycmF5KSkge1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShhcnJheVZpZXcpXG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcihjb3B5LmJ1ZmZlciwgY29weS5ieXRlT2Zmc2V0LCBjb3B5LmJ5dGVMZW5ndGgpXG4gIH1cbiAgcmV0dXJuIGZyb21BcnJheUxpa2UoYXJyYXlWaWV3KVxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wib2Zmc2V0XCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJsZW5ndGhcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgbGV0IGJ1ZlxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICBjb25zdCBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW4pXG5cbiAgICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJ1ZlxuICAgIH1cblxuICAgIG9iai5jb3B5KGJ1ZiwgMCwgMCwgbGVuKVxuICAgIHJldHVybiBidWZcbiAgfVxuXG4gIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IG51bWJlcklzTmFOKG9iai5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKDApXG4gICAgfVxuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iailcbiAgfVxuXG4gIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgQXJyYXkuaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmouZGF0YSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwgS19NQVhfTEVOR1RIYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBLX01BWF9MRU5HVEgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiBiICE9IG51bGwgJiYgYi5faXNCdWZmZXIgPT09IHRydWUgJiZcbiAgICBiICE9PSBCdWZmZXIucHJvdG90eXBlIC8vIHNvIEJ1ZmZlci5pc0J1ZmZlcihCdWZmZXIucHJvdG90eXBlKSB3aWxsIGJlIGZhbHNlXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoaXNJbnN0YW5jZShhLCBVaW50OEFycmF5KSkgYSA9IEJ1ZmZlci5mcm9tKGEsIGEub2Zmc2V0LCBhLmJ5dGVMZW5ndGgpXG4gIGlmIChpc0luc3RhbmNlKGIsIFVpbnQ4QXJyYXkpKSBiID0gQnVmZmVyLmZyb20oYiwgYi5vZmZzZXQsIGIuYnl0ZUxlbmd0aClcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwiYnVmMVwiLCBcImJ1ZjJcIiBhcmd1bWVudHMgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheSdcbiAgICApXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICBsZXQgeCA9IGEubGVuZ3RoXG4gIGxldCB5ID0gYi5sZW5ndGhcblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIGxldCBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgbGV0IHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgYnVmID0gbGlzdFtpXVxuICAgIGlmIChpc0luc3RhbmNlKGJ1ZiwgVWludDhBcnJheSkpIHtcbiAgICAgIGlmIChwb3MgKyBidWYubGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBCdWZmZXIuZnJvbShidWYpXG4gICAgICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIGJ1ZixcbiAgICAgICAgICBwb3NcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICB9XG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgaXNJbnN0YW5jZShzdHJpbmcsIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgb3IgQXJyYXlCdWZmZXIuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBzdHJpbmdcbiAgICApXG4gIH1cblxuICBjb25zdCBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGNvbnN0IG11c3RNYXRjaCA9IChhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gPT09IHRydWUpXG4gIGlmICghbXVzdE1hdGNoICYmIGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkge1xuICAgICAgICAgIHJldHVybiBtdXN0TWF0Y2ggPyAtMSA6IHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2VyY2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgKGFuZCB0aGUgYGlzLWJ1ZmZlcmAgbnBtIHBhY2thZ2UpXG4vLyB0byBkZXRlY3QgYSBCdWZmZXIgaW5zdGFuY2UuIEl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBgaW5zdGFuY2VvZiBCdWZmZXJgXG4vLyByZWxpYWJseSBpbiBhIGJyb3dzZXJpZnkgY29udGV4dCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIGRpZmZlcmVudFxuLy8gY29waWVzIG9mIHRoZSAnYnVmZmVyJyBwYWNrYWdlIGluIHVzZS4gVGhpcyBtZXRob2Qgd29ya3MgZXZlbiBmb3IgQnVmZmVyXG4vLyBpbnN0YW5jZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSBhbm90aGVyIGNvcHkgb2YgdGhlIGBidWZmZXJgIHBhY2thZ2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNTRcbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIGNvbnN0IGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nID0gQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZ1xuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIGxldCBzdHIgPSAnJ1xuICBjb25zdCBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkucmVwbGFjZSgvKC57Mn0pL2csICckMSAnKS50cmltKClcbiAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuaWYgKGN1c3RvbUluc3BlY3RTeW1ib2wpIHtcbiAgQnVmZmVyLnByb3RvdHlwZVtjdXN0b21JbnNwZWN0U3ltYm9sXSA9IEJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoaXNJbnN0YW5jZSh0YXJnZXQsIFVpbnQ4QXJyYXkpKSB7XG4gICAgdGFyZ2V0ID0gQnVmZmVyLmZyb20odGFyZ2V0LCB0YXJnZXQub2Zmc2V0LCB0YXJnZXQuYnl0ZUxlbmd0aClcbiAgfVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5LiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHRhcmdldClcbiAgICApXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICBsZXQgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgbGV0IHkgPSBlbmQgLSBzdGFydFxuICBjb25zdCBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIGNvbnN0IHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIGNvbnN0IHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0IC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFt2YWxdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICBsZXQgaW5kZXhTaXplID0gMVxuICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICBsZXQgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICBsZXQgaVxuICBpZiAoZGlyKSB7XG4gICAgbGV0IGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICBjb25zdCByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChudW1iZXJJc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIGNvbnN0IHJlcyA9IFtdXG5cbiAgbGV0IGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIGNvbnN0IGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIGxldCBjb2RlUG9pbnQgPSBudWxsXG4gICAgbGV0IGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRilcbiAgICAgID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERilcbiAgICAgICAgICA/IDNcbiAgICAgICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKVxuICAgICAgICAgICAgICA/IDJcbiAgICAgICAgICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICBsZXQgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG5jb25zdCBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgY29uc3QgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICBsZXQgcmVzID0gJydcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGxldCByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgbGV0IG91dCA9ICcnXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IGhleFNsaWNlTG9va3VwVGFibGVbYnVmW2ldXVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgbGV0IHJlcyA9ICcnXG4gIC8vIElmIGJ5dGVzLmxlbmd0aCBpcyBvZGQsIHRoZSBsYXN0IDggYml0cyBtdXN0IGJlIGlnbm9yZWQgKHNhbWUgYXMgbm9kZS5qcylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIChieXRlc1tpICsgMV0gKiAyNTYpKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgY29uc3QgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobmV3QnVmLCBCdWZmZXIucHJvdG90eXBlKVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldF1cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludEJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICBsZXQgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkxFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQzMkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRMRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGxvID0gZmlyc3QgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAyNFxuXG4gIGNvbnN0IGhpID0gdGhpc1srK29mZnNldF0gK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIGxhc3QgKiAyICoqIDI0XG5cbiAgcmV0dXJuIEJpZ0ludChsbykgKyAoQmlnSW50KGhpKSA8PCBCaWdJbnQoMzIpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnVUludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ1VJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgaGkgPSBmaXJzdCAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgY29uc3QgbG8gPSB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIGxhc3RcblxuICByZXR1cm4gKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSkgKyBCaWdJbnQobG8pXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoXG4gIGxldCBtdWwgPSAxXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ0ludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ0ludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldCArIDRdICtcbiAgICB0aGlzW29mZnNldCArIDVdICogMiAqKiA4ICtcbiAgICB0aGlzW29mZnNldCArIDZdICogMiAqKiAxNiArXG4gICAgKGxhc3QgPDwgMjQpIC8vIE92ZXJmbG93XG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gKGZpcnN0IDw8IDI0KSArIC8vIE92ZXJmbG93XG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF1cblxuICByZXR1cm4gKEJpZ0ludCh2YWwpIDw8IEJpZ0ludCgzMikpICtcbiAgICBCaWdJbnQodGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDggPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQzMkxFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRMRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbGV0IGhpID0gTnVtYmVyKHZhbHVlID4+IEJpZ0ludCgzMikgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHdydEJpZ1VJbnQ2NEJFIChidWYsIHZhbHVlLCBvZmZzZXQsIG1pbiwgbWF4KSB7XG4gIGNoZWNrSW50QkkodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgNylcblxuICBsZXQgbG8gPSBOdW1iZXIodmFsdWUgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQgKyA3XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNl0gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDVdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA0XSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgM10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCArIDJdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAxXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0XSA9IGhpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NExFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0TEUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnVUludDY0QkUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRCRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBCaWdJbnQoMCksIEJpZ0ludCgnMHhmZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gMFxuICBsZXQgbXVsID0gMVxuICBsZXQgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ0ludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgLUJpZ0ludCgnMHg4MDAwMDAwMDAwMDAwMDAwJyksIEJpZ0ludCgnMHg3ZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzaG91bGQgYmUgYSBCdWZmZXInKVxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgY29uc3QgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXNlIGJ1aWx0LWluIHdoZW4gYXZhaWxhYmxlLCBtaXNzaW5nIGZyb20gSUUxMVxuICAgIHRoaXMuY29weVdpdGhpbih0YXJnZXRTdGFydCwgc3RhcnQsIGVuZClcbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmICgoZW5jb2RpbmcgPT09ICd1dGY4JyAmJiBjb2RlIDwgMTI4KSB8fFxuICAgICAgICAgIGVuY29kaW5nID09PSAnbGF0aW4xJykge1xuICAgICAgICAvLyBGYXN0IHBhdGg6IElmIGB2YWxgIGZpdHMgaW50byBhIHNpbmdsZSBieXRlLCB1c2UgdGhhdCBudW1lcmljIHZhbHVlLlxuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgdmFsID0gTnVtYmVyKHZhbClcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICBsZXQgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gICAgY29uc3QgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHZhbHVlIFwiJyArIHZhbCArXG4gICAgICAgICdcIiBpcyBpbnZhbGlkIGZvciBhcmd1bWVudCBcInZhbHVlXCInKVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBDVVNUT00gRVJST1JTXG4vLyA9PT09PT09PT09PT09XG5cbi8vIFNpbXBsaWZpZWQgdmVyc2lvbnMgZnJvbSBOb2RlLCBjaGFuZ2VkIGZvciBCdWZmZXItb25seSB1c2FnZVxuY29uc3QgZXJyb3JzID0ge31cbmZ1bmN0aW9uIEUgKHN5bSwgZ2V0TWVzc2FnZSwgQmFzZSkge1xuICBlcnJvcnNbc3ltXSA9IGNsYXNzIE5vZGVFcnJvciBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIHN1cGVyKClcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICB2YWx1ZTogZ2V0TWVzc2FnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgdGhlIGVycm9yIGNvZGUgdG8gdGhlIG5hbWUgdG8gaW5jbHVkZSBpdCBpbiB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLm5hbWV9IFske3N5bX1dYFxuICAgICAgLy8gQWNjZXNzIHRoZSBzdGFjayB0byBnZW5lcmF0ZSB0aGUgZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGVycm9yIGNvZGVcbiAgICAgIC8vIGZyb20gdGhlIG5hbWUuXG4gICAgICB0aGlzLnN0YWNrIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAvLyBSZXNldCB0aGUgbmFtZSB0byB0aGUgYWN0dWFsIG5hbWUuXG4gICAgICBkZWxldGUgdGhpcy5uYW1lXG4gICAgfVxuXG4gICAgZ2V0IGNvZGUgKCkge1xuICAgICAgcmV0dXJuIHN5bVxuICAgIH1cblxuICAgIHNldCBjb2RlICh2YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2RlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHtzeW19XTogJHt0aGlzLm1lc3NhZ2V9YFxuICAgIH1cbiAgfVxufVxuXG5FKCdFUlJfQlVGRkVSX09VVF9PRl9CT1VORFMnLFxuICBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gYCR7bmFtZX0gaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzYFxuICAgIH1cblxuICAgIHJldHVybiAnQXR0ZW1wdCB0byBhY2Nlc3MgbWVtb3J5IG91dHNpZGUgYnVmZmVyIGJvdW5kcydcbiAgfSwgUmFuZ2VFcnJvcilcbkUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJyxcbiAgZnVuY3Rpb24gKG5hbWUsIGFjdHVhbCkge1xuICAgIHJldHVybiBgVGhlIFwiJHtuYW1lfVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgJHt0eXBlb2YgYWN0dWFsfWBcbiAgfSwgVHlwZUVycm9yKVxuRSgnRVJSX09VVF9PRl9SQU5HRScsXG4gIGZ1bmN0aW9uIChzdHIsIHJhbmdlLCBpbnB1dCkge1xuICAgIGxldCBtc2cgPSBgVGhlIHZhbHVlIG9mIFwiJHtzdHJ9XCIgaXMgb3V0IG9mIHJhbmdlLmBcbiAgICBsZXQgcmVjZWl2ZWQgPSBpbnB1dFxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGlucHV0KSAmJiBNYXRoLmFicyhpbnB1dCkgPiAyICoqIDMyKSB7XG4gICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihTdHJpbmcoaW5wdXQpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnYmlnaW50Jykge1xuICAgICAgcmVjZWl2ZWQgPSBTdHJpbmcoaW5wdXQpXG4gICAgICBpZiAoaW5wdXQgPiBCaWdJbnQoMikgKiogQmlnSW50KDMyKSB8fCBpbnB1dCA8IC0oQmlnSW50KDIpICoqIEJpZ0ludCgzMikpKSB7XG4gICAgICAgIHJlY2VpdmVkID0gYWRkTnVtZXJpY2FsU2VwYXJhdG9yKHJlY2VpdmVkKVxuICAgICAgfVxuICAgICAgcmVjZWl2ZWQgKz0gJ24nXG4gICAgfVxuICAgIG1zZyArPSBgIEl0IG11c3QgYmUgJHtyYW5nZX0uIFJlY2VpdmVkICR7cmVjZWl2ZWR9YFxuICAgIHJldHVybiBtc2dcbiAgfSwgUmFuZ2VFcnJvcilcblxuZnVuY3Rpb24gYWRkTnVtZXJpY2FsU2VwYXJhdG9yICh2YWwpIHtcbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gdmFsLmxlbmd0aFxuICBjb25zdCBzdGFydCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDBcbiAgZm9yICg7IGkgPj0gc3RhcnQgKyA0OyBpIC09IDMpIHtcbiAgICByZXMgPSBgXyR7dmFsLnNsaWNlKGkgLSAzLCBpKX0ke3Jlc31gXG4gIH1cbiAgcmV0dXJuIGAke3ZhbC5zbGljZSgwLCBpKX0ke3Jlc31gXG59XG5cbi8vIENIRUNLIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRzIChidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBpZiAoYnVmW29mZnNldF0gPT09IHVuZGVmaW5lZCB8fCBidWZbb2Zmc2V0ICsgYnl0ZUxlbmd0aF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgYnVmLmxlbmd0aCAtIChieXRlTGVuZ3RoICsgMSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tJbnRCSSAodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHtcbiAgICBjb25zdCBuID0gdHlwZW9mIG1pbiA9PT0gJ2JpZ2ludCcgPyAnbicgOiAnJ1xuICAgIGxldCByYW5nZVxuICAgIGlmIChieXRlTGVuZ3RoID4gMykge1xuICAgICAgaWYgKG1pbiA9PT0gMCB8fCBtaW4gPT09IEJpZ0ludCgwKSkge1xuICAgICAgICByYW5nZSA9IGA+PSAwJHtufSBhbmQgPCAyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4fSR7bn1gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYW5nZSA9IGA+PSAtKDIke259ICoqICR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn0pIGFuZCA8IDIgKiogYCArXG4gICAgICAgICAgICAgICAgYCR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn1gXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlID0gYD49ICR7bWlufSR7bn0gYW5kIDw9ICR7bWF4fSR7bn1gXG4gICAgfVxuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSgndmFsdWUnLCByYW5nZSwgdmFsdWUpXG4gIH1cbiAgY2hlY2tCb3VuZHMoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVyICh2YWx1ZSwgbmFtZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0lOVkFMSURfQVJHX1RZUEUobmFtZSwgJ251bWJlcicsIHZhbHVlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJvdW5kc0Vycm9yICh2YWx1ZSwgbGVuZ3RoLCB0eXBlKSB7XG4gIGlmIChNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHtcbiAgICB2YWxpZGF0ZU51bWJlcih2YWx1ZSwgdHlwZSlcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UodHlwZSB8fCAnb2Zmc2V0JywgJ2FuIGludGVnZXInLCB2YWx1ZSlcbiAgfVxuXG4gIGlmIChsZW5ndGggPCAwKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfQlVGRkVSX09VVF9PRl9CT1VORFMoKVxuICB9XG5cbiAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPj0gJHt0eXBlID8gMSA6IDB9IGFuZCA8PSAke2xlbmd0aH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUpXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuY29uc3QgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSB0YWtlcyBlcXVhbCBzaWducyBhcyBlbmQgb2YgdGhlIEJhc2U2NCBlbmNvZGluZ1xuICBzdHIgPSBzdHIuc3BsaXQoJz0nKVswXVxuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyLnRyaW0oKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIGxldCBjb2RlUG9pbnRcbiAgY29uc3QgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICBsZXQgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgY29uc3QgYnl0ZXMgPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICBjb25zdCBieXRlQXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIGxldCBjLCBoaSwgbG9cbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBsZXQgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuLy8gQXJyYXlCdWZmZXIgb3IgVWludDhBcnJheSBvYmplY3RzIGZyb20gb3RoZXIgY29udGV4dHMgKGkuZS4gaWZyYW1lcykgZG8gbm90IHBhc3Ncbi8vIHRoZSBgaW5zdGFuY2VvZmAgY2hlY2sgYnV0IHRoZXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgb2YgdGhhdCB0eXBlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTY2XG5mdW5jdGlvbiBpc0luc3RhbmNlIChvYmosIHR5cGUpIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIHR5cGUgfHxcbiAgICAob2JqICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgIT0gbnVsbCAmJlxuICAgICAgb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09IHR5cGUubmFtZSlcbn1cbmZ1bmN0aW9uIG51bWJlcklzTmFOIChvYmopIHtcbiAgLy8gRm9yIElFMTEgc3VwcG9ydFxuICByZXR1cm4gb2JqICE9PSBvYmogLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuLy8gQ3JlYXRlIGxvb2t1cCB0YWJsZSBmb3IgYHRvU3RyaW5nKCdoZXgnKWBcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzIxOVxuY29uc3QgaGV4U2xpY2VMb29rdXBUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFscGhhYmV0ID0gJzAxMjM0NTY3ODlhYmNkZWYnXG4gIGNvbnN0IHRhYmxlID0gbmV3IEFycmF5KDI1NilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgY29uc3QgaTE2ID0gaSAqIDE2XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICB0YWJsZVtpMTYgKyBqXSA9IGFscGhhYmV0W2ldICsgYWxwaGFiZXRbal1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhYmxlXG59KSgpXG5cbi8vIFJldHVybiBub3QgZnVuY3Rpb24gd2l0aCBFcnJvciBpZiBCaWdJbnQgbm90IHN1cHBvcnRlZFxuZnVuY3Rpb24gZGVmaW5lQmlnSW50TWV0aG9kIChmbikge1xuICByZXR1cm4gdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyBCdWZmZXJCaWdJbnROb3REZWZpbmVkIDogZm5cbn1cblxuZnVuY3Rpb24gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignQmlnSW50IG5vdCBzdXBwb3J0ZWQnKVxufVxuIiwiKGZ1bmN0aW9uKGEsYil7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxiKTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzKWIoKTtlbHNle2IoKSxhLkZpbGVTYXZlcj17ZXhwb3J0czp7fX0uZXhwb3J0c319KSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihhLGIpe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBiP2I9e2F1dG9Cb206ITF9Olwib2JqZWN0XCIhPXR5cGVvZiBiJiYoY29uc29sZS53YXJuKFwiRGVwcmVjYXRlZDogRXhwZWN0ZWQgdGhpcmQgYXJndW1lbnQgdG8gYmUgYSBvYmplY3RcIiksYj17YXV0b0JvbTohYn0pLGIuYXV0b0JvbSYmL15cXHMqKD86dGV4dFxcL1xcUyp8YXBwbGljYXRpb25cXC94bWx8XFxTKlxcL1xcUypcXCt4bWwpXFxzKjsuKmNoYXJzZXRcXHMqPVxccyp1dGYtOC9pLnRlc3QoYS50eXBlKT9uZXcgQmxvYihbXCJcXHVGRUZGXCIsYV0se3R5cGU6YS50eXBlfSk6YX1mdW5jdGlvbiBjKGEsYixjKXt2YXIgZD1uZXcgWE1MSHR0cFJlcXVlc3Q7ZC5vcGVuKFwiR0VUXCIsYSksZC5yZXNwb25zZVR5cGU9XCJibG9iXCIsZC5vbmxvYWQ9ZnVuY3Rpb24oKXtnKGQucmVzcG9uc2UsYixjKX0sZC5vbmVycm9yPWZ1bmN0aW9uKCl7Y29uc29sZS5lcnJvcihcImNvdWxkIG5vdCBkb3dubG9hZCBmaWxlXCIpfSxkLnNlbmQoKX1mdW5jdGlvbiBkKGEpe3ZhciBiPW5ldyBYTUxIdHRwUmVxdWVzdDtiLm9wZW4oXCJIRUFEXCIsYSwhMSk7dHJ5e2Iuc2VuZCgpfWNhdGNoKGEpe31yZXR1cm4gMjAwPD1iLnN0YXR1cyYmMjk5Pj1iLnN0YXR1c31mdW5jdGlvbiBlKGEpe3RyeXthLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiKSl9Y2F0Y2goYyl7dmFyIGI9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50c1wiKTtiLmluaXRNb3VzZUV2ZW50KFwiY2xpY2tcIiwhMCwhMCx3aW5kb3csMCwwLDAsODAsMjAsITEsITEsITEsITEsMCxudWxsKSxhLmRpc3BhdGNoRXZlbnQoYil9fXZhciBmPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3cmJndpbmRvdy53aW5kb3c9PT13aW5kb3c/d2luZG93Olwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmP3NlbGY6XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbD9nbG9iYWw6dm9pZCAwLGE9Zi5uYXZpZ2F0b3ImJi9NYWNpbnRvc2gvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkmJi9BcHBsZVdlYktpdC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSYmIS9TYWZhcmkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksZz1mLnNhdmVBc3x8KFwib2JqZWN0XCIhPXR5cGVvZiB3aW5kb3d8fHdpbmRvdyE9PWY/ZnVuY3Rpb24oKXt9OlwiZG93bmxvYWRcImluIEhUTUxBbmNob3JFbGVtZW50LnByb3RvdHlwZSYmIWE/ZnVuY3Rpb24oYixnLGgpe3ZhciBpPWYuVVJMfHxmLndlYmtpdFVSTCxqPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO2c9Z3x8Yi5uYW1lfHxcImRvd25sb2FkXCIsai5kb3dubG9hZD1nLGoucmVsPVwibm9vcGVuZXJcIixcInN0cmluZ1wiPT10eXBlb2YgYj8oai5ocmVmPWIsai5vcmlnaW49PT1sb2NhdGlvbi5vcmlnaW4/ZShqKTpkKGouaHJlZik/YyhiLGcsaCk6ZShqLGoudGFyZ2V0PVwiX2JsYW5rXCIpKTooai5ocmVmPWkuY3JlYXRlT2JqZWN0VVJMKGIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpLnJldm9rZU9iamVjdFVSTChqLmhyZWYpfSw0RTQpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGopfSwwKSl9OlwibXNTYXZlT3JPcGVuQmxvYlwiaW4gbmF2aWdhdG9yP2Z1bmN0aW9uKGYsZyxoKXtpZihnPWd8fGYubmFtZXx8XCJkb3dubG9hZFwiLFwic3RyaW5nXCIhPXR5cGVvZiBmKW5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGIoZixoKSxnKTtlbHNlIGlmKGQoZikpYyhmLGcsaCk7ZWxzZXt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtpLmhyZWY9ZixpLnRhcmdldD1cIl9ibGFua1wiLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGkpfSl9fTpmdW5jdGlvbihiLGQsZSxnKXtpZihnPWd8fG9wZW4oXCJcIixcIl9ibGFua1wiKSxnJiYoZy5kb2N1bWVudC50aXRsZT1nLmRvY3VtZW50LmJvZHkuaW5uZXJUZXh0PVwiZG93bmxvYWRpbmcuLi5cIiksXCJzdHJpbmdcIj09dHlwZW9mIGIpcmV0dXJuIGMoYixkLGUpO3ZhciBoPVwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCI9PT1iLnR5cGUsaT0vY29uc3RydWN0b3IvaS50ZXN0KGYuSFRNTEVsZW1lbnQpfHxmLnNhZmFyaSxqPS9DcmlPU1xcL1tcXGRdKy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtpZigoanx8aCYmaXx8YSkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBGaWxlUmVhZGVyKXt2YXIgaz1uZXcgRmlsZVJlYWRlcjtrLm9ubG9hZGVuZD1mdW5jdGlvbigpe3ZhciBhPWsucmVzdWx0O2E9aj9hOmEucmVwbGFjZSgvXmRhdGE6W147XSo7LyxcImRhdGE6YXR0YWNobWVudC9maWxlO1wiKSxnP2cubG9jYXRpb24uaHJlZj1hOmxvY2F0aW9uPWEsZz1udWxsfSxrLnJlYWRBc0RhdGFVUkwoYil9ZWxzZXt2YXIgbD1mLlVSTHx8Zi53ZWJraXRVUkwsbT1sLmNyZWF0ZU9iamVjdFVSTChiKTtnP2cubG9jYXRpb249bTpsb2NhdGlvbi5ocmVmPW0sZz1udWxsLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtsLnJldm9rZU9iamVjdFVSTChtKX0sNEU0KX19KTtmLnNhdmVBcz1nLnNhdmVBcz1nLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJihtb2R1bGUuZXhwb3J0cz1nKX0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1GaWxlU2F2ZXIubWluLmpzLm1hcCIsIi8qISBpZWVlNzU0LiBCU0QtMy1DbGF1c2UgTGljZW5zZS4gRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnL29wZW5zb3VyY2U+ICovXG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IChlICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IChtICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKCh2YWx1ZSAqIGMpIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCJpbXBvcnQgQ3J5VHlwZSwgeyBDb21tYW5kIH0gZnJvbSBcIi4vQ3J5VHlwZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3J5R2VuZXJhdG9yIHtcclxuICBhdWRpb0NvbnRleHQ6IEF1ZGlvQ29udGV4dDtcclxuICBzb3VyY2VTYW1wbGVSYXRlID0gMTA0ODU3NjtcclxuICBzYW1wbGVzUGVyRnJhbWUgPSAxNzU1NjtcclxuICBub2lzZUJ1ZmZlciA9IDB4N0ZGRjtcclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5hdWRpb0NvbnRleHQpIHRoaXMuYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGUoY3J5VHlwZTogQ3J5VHlwZSwgcGl0Y2g6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHB1bHNlMSA9IHRoaXMuZ2VuZXJhdGVTcXVhcmVXYXZlKGNyeVR5cGUucHVsc2UxLCBwaXRjaCwgbGVuZ3RoKTtcclxuICAgIGNvbnN0IHB1bHNlMiA9IHRoaXMuZ2VuZXJhdGVTcXVhcmVXYXZlKGNyeVR5cGUucHVsc2UyLCBwaXRjaCwgbGVuZ3RoKTtcclxuICAgIC8vIGR1ZSB0byBxdWlyayB3aXRoIG5vaXNlIGNoYW5uZWw6IGZpbmQgc2hvcnRlc3QgY2hhbm5lbCBsZW5ndGhcclxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIG5vaXNlIHdpbGwgcmV2ZXJ0IHBpdGNoIHNoaWZ0IGVmZmVjdFxyXG5cclxuICAgIGxldCBwdWxzZTFMZW5ndGggPSAwO1xyXG4gICAgbGV0IHB1bHNlMkxlbmd0aCA9IDA7XHJcbiAgICBsZXQgbGVmdG92ZXJzID0gMDtcclxuICAgIGZvciAoY29uc3QgY29tbWFuZCBvZiBjcnlUeXBlLnB1bHNlMSkge1xyXG4gICAgICBpZiAoY29tbWFuZCAmJiBjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb25zdCBzdWJmcmFtZXMgPSAoKGxlbmd0aCArIDB4MTAwKSAqIChjb21tYW5kLm5vdGVbMF0gKyAxKSkgKyBsZWZ0b3ZlcnM7XHJcbiAgICAgICAgY29uc3QgdGhpc25vdGUgPSB0aGlzLnNhbXBsZXNQZXJGcmFtZSAqIChzdWJmcmFtZXMgPj4gOCk7XHJcbiAgICAgICAgbGVmdG92ZXJzID0gc3ViZnJhbWVzICYgMHhGRjtcclxuICAgICAgICBwdWxzZTFMZW5ndGggKz0gdGhpc25vdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZWZ0b3ZlcnMgPSAwO1xyXG4gICAgZm9yIChjb25zdCBjb21tYW5kIG9mIGNyeVR5cGUucHVsc2UyKSB7XHJcbiAgICAgIGlmIChjb21tYW5kICYmIGNvbW1hbmQubm90ZSkge1xyXG4gICAgICAgIGNvbnN0IHN1YmZyYW1lcyA9ICgobGVuZ3RoICsgMHgxMDApICogKGNvbW1hbmQubm90ZVswXSArIDEpKSArIGxlZnRvdmVycztcclxuICAgICAgICBjb25zdCB0aGlzbm90ZSA9IHRoaXMuc2FtcGxlc1BlckZyYW1lICogKHN1YmZyYW1lcyA+PiA4KTtcclxuICAgICAgICBsZWZ0b3ZlcnMgPSBzdWJmcmFtZXMgJiAweEZGO1xyXG4gICAgICAgIHB1bHNlMkxlbmd0aCArPSB0aGlzbm90ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGN1dG9mZiA9IE1hdGgubWF4KHB1bHNlMUxlbmd0aCwgcHVsc2UyTGVuZ3RoKSAtIHRoaXMuc2FtcGxlc1BlckZyYW1lO1xyXG4gICAgY29uc3Qgbm9pc2UgPSB0aGlzLmdlbmVyYXRlTm9pc2UoY3J5VHlwZS5ub2lzZSwgcGl0Y2gsIDAsIGN1dG9mZik7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcHVsc2UxLFxyXG4gICAgICBwdWxzZTIsXHJcbiAgICAgIG5vaXNlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2FtcGxlKGJpbjogbnVtYmVyLCB2b2x1bWU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgKFxyXG4gICAgICAgICgyICogYmluKSAtIDFcclxuICAgICAgKSAqIChcclxuICAgICAgICAodm9sdW1lICogLTEpIC8gMHgxMFxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY2FsY0R1dHkoZHV0eTogbnVtYmVyLCBwZXJpb2RDb3VudDogbnVtYmVyKSB7XHJcbiAgICBzd2l0Y2ggKGR1dHkpIHtcclxuICAgICAgY2FzZSAwOiByZXR1cm4gcGVyaW9kQ291bnQgPj0gNCAvIDggJiYgcGVyaW9kQ291bnQgPCA1IC8gODtcclxuICAgICAgY2FzZSAxOiByZXR1cm4gcGVyaW9kQ291bnQgPj0gNCAvIDggJiYgcGVyaW9kQ291bnQgPCA2IC8gODtcclxuICAgICAgY2FzZSAyOiByZXR1cm4gcGVyaW9kQ291bnQgPj0gMiAvIDggJiYgcGVyaW9kQ291bnQgPCA2IC8gODtcclxuICAgICAgY2FzZSAzOiByZXR1cm4gcGVyaW9kQ291bnQgPCA0IC8gOCB8fCBwZXJpb2RDb3VudCA+PSA2IC8gODtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlU3F1YXJlV2F2ZShjb21tYW5kczogQ29tbWFuZFtdLCBwaXRjaDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcikge1xyXG4gICAgbGV0IGR1dHkgPSAwO1xyXG4gICAgbGV0IGRhdGE6IG51bWJlcltdID0gW107XHJcbiAgICBsZXQgY29tbWFuZEluZGV4ID0gMDtcclxuICAgIGxldCBzYW1wbGVJbmRleCA9IDA7XHJcbiAgICBsZXQgcGVyaW9kQ291bnQgPSAwO1xyXG4gICAgbGV0IGxlZnRvdmVycyA9IDA7XHJcbiAgICB3aGlsZSAoY29tbWFuZEluZGV4IDwgY29tbWFuZHMubGVuZ3RoKSB7XHJcbiAgICAgIGxldCBjb21tYW5kID0gY29tbWFuZHNbY29tbWFuZEluZGV4XTtcclxuICAgICAgY29uc3QgaXNMYXN0Q29tbWFuZCA9IGNvbW1hbmRJbmRleCA9PT0gY29tbWFuZHMubGVuZ3RoIC0gMTtcclxuICAgICAgaWYgKHR5cGVvZiBjb21tYW5kLmR1dHkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBkdXR5ID0gY29tbWFuZC5kdXR5O1xyXG4gICAgICB9IGVsc2UgaWYgKGNvbW1hbmQubm90ZSkge1xyXG4gICAgICAgIGxldCBbXHJcbiAgICAgICAgICBudW1iZXJPZlNhbXBsZXNQZXJOb3RlLFxyXG4gICAgICAgICAgdm9sdW1lLFxyXG4gICAgICAgICAgdm9sdW1lRmFkZSxcclxuICAgICAgICAgIG51bWJlck9mU2FtcGxlc1BlclBlcmlvZFxyXG4gICAgICAgIF0gPSBjb21tYW5kLm5vdGU7XHJcblxyXG4gICAgICAgIC8vIG51bWJlciBvZiBzYW1wbGVzIGZvciB0aGlzIHNpbmdsZSBub3RlXHJcbiAgICAgICAgbGV0IHN1YmZyYW1lcyA9IChcclxuICAgICAgICAgIChsZW5ndGggKyAweDEwMCkgKlxyXG4gICAgICAgICAgKG51bWJlck9mU2FtcGxlc1Blck5vdGUgKyAxKVxyXG4gICAgICAgICkgKyBsZWZ0b3ZlcnM7XHJcbiAgICAgICAgbGV0IHNhbXBsZUNvdW50ID0gdGhpcy5zYW1wbGVzUGVyRnJhbWUgKiAoc3ViZnJhbWVzID4+IDgpO1xyXG4gICAgICAgIGxlZnRvdmVycyA9IHN1YmZyYW1lcyAmIDB4RkY7XHJcbiAgICAgICAgLy8gbnVtYmVyIG9mIHNhbXBsZXMgZm9yIGEgc2luZ2xlIHBlcmlvZCBvZiB0aGUgbm90ZSdzIHBpdGNoXHJcbiAgICAgICAgbGV0IHBlcmlvZCA9IHRoaXMuc291cmNlU2FtcGxlUmF0ZSAqIChcclxuICAgICAgICAgIDIwNDggLSAoXHJcbiAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICBudW1iZXJPZlNhbXBsZXNQZXJQZXJpb2QgK1xyXG4gICAgICAgICAgICAgIHBpdGNoXHJcbiAgICAgICAgICAgICkgJiAweDdGRlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkgLyAxMzEwNzI7XHJcbiAgICAgICAgLy8gYXBwbHkgdGhpcyBub3RlXHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAyNTAwMDAwICYmIChpbmRleCA8IHNhbXBsZUNvdW50IHx8IChpc0xhc3RDb21tYW5kICYmIHZvbHVtZSA+IDApKTsgaW5kZXgrKykge1xyXG4gICAgICAgICAgY29uc3QgZW5hYmxlZCA9IHRoaXMuY2FsY0R1dHkoZHV0eSAmIDBiMTEsIHBlcmlvZENvdW50KSA/XHJcbiAgICAgICAgICAgIDEgOlxyXG4gICAgICAgICAgICAwO1xyXG4gICAgICAgICAgZGF0YVtzYW1wbGVJbmRleF0gPSB0aGlzLnNhbXBsZShlbmFibGVkLCB2b2x1bWUpO1xyXG4gICAgICAgICAgcGVyaW9kQ291bnQgKz0gMSAvIHBlcmlvZDtcclxuICAgICAgICAgIHBlcmlvZENvdW50ID0gcGVyaW9kQ291bnQgPj0gMSA/XHJcbiAgICAgICAgICAgIHBlcmlvZENvdW50IC0gMSA6XHJcbiAgICAgICAgICAgIHBlcmlvZENvdW50O1xyXG4gICAgICAgICAgc2FtcGxlSW5kZXgrKztcclxuXHJcbiAgICAgICAgICAvLyBvbmNlIHBlciBmcmFtZSwgYWRqdXN0IGR1dHlcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgaW5kZXggPCBzYW1wbGVDb3VudCAmJlxyXG4gICAgICAgICAgICBzYW1wbGVJbmRleCAlIHRoaXMuc2FtcGxlc1BlckZyYW1lID09PSAwXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgZHV0eSA9IChcclxuICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgIGR1dHkgJiAweDNGXHJcbiAgICAgICAgICAgICAgICApIDw8IDJcclxuICAgICAgICAgICAgICApIHwgKFxyXG4gICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICBkdXR5ICYgMHhDMFxyXG4gICAgICAgICAgICAgICAgKSA+PiA2XHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIG9uY2UgcGVyIGZyYW1lICogZmFkZWFtb3VudCwgYWRqdXN0IHZvbHVtZVxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB2b2x1bWVGYWRlICE9PSAwICYmXHJcbiAgICAgICAgICAgIChpbmRleCArIDEpICUgKHRoaXMuc2FtcGxlc1BlckZyYW1lICogTWF0aC5hYnModm9sdW1lRmFkZSkpID09PSAwXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdm9sdW1lICs9ICh2b2x1bWVGYWRlIDwgMCA/IDEgOiAtMSk7XHJcbiAgICAgICAgICAgIHZvbHVtZSA9IHZvbHVtZSA8IDAgPyAwIDogKHZvbHVtZSA+IDB4MEYgPyAweDBGIDogdm9sdW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbW1hbmRJbmRleCsrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVOb2lzZShjb21tYW5kczogQ29tbWFuZFtdLCBwaXRjaDogbnVtYmVyLCBsZW5ndGg6IG51bWJlciwgY3V0b2ZmOiBudW1iZXIpIHtcclxuICAgIGxldCBkYXRhOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgbGV0IGNvbW1hbmRJbmRleCA9IDA7XHJcbiAgICBsZXQgc2FtcGxlSW5kZXggPSAwO1xyXG4gICAgbGV0IGxlZnRvdmVycyA9IDA7XHJcbiAgICB3aGlsZSAoY29tbWFuZEluZGV4IDwgY29tbWFuZHMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kc1tjb21tYW5kSW5kZXhdO1xyXG4gICAgICBjb25zdCBpc0xhc3RDb21tYW5kID0gY29tbWFuZEluZGV4ID09PSBjb21tYW5kcy5sZW5ndGggLSAxO1xyXG4gICAgICBsZXQgbm90ZSA9IGNvbW1hbmQubm90ZTtcclxuICAgICAgLy8gbnVtYmVyIG9mIHNhbXBsZXMgZm9yIHRoaXMgc2luZ2xlIG5vdGVcclxuICAgICAgbGV0IHN1YkZyYW1lcyA9ICgobGVuZ3RoICsgMHgxMDApICogKG5vdGVbMF0gKyAxKSkgKyBsZWZ0b3ZlcnM7XHJcbiAgICAgIGxldCBzYW1wbGVDb3VudCA9IHRoaXMuc2FtcGxlc1BlckZyYW1lICogKHN1YkZyYW1lcyA+PiA4KTtcclxuICAgICAgbGVmdG92ZXJzID0gc3ViRnJhbWVzICYgMHhGRjtcclxuICAgICAgLy8gdm9sdW1lIGFuZCBmYWRlIGNvbnRyb2xcclxuICAgICAgbGV0IHZvbHVtZSA9IG5vdGVbMV0sIHZvbHVtZUZhZGUgPSBub3RlWzJdLCBwYXJhbXMgPSAobm90ZVszXSArIChzYW1wbGVJbmRleCA+PSBjdXRvZmYgPyAwIDogcGl0Y2gpKSAmIDB4RkY7XHJcbiAgICAgIC8vIGFwcGx5IHRoaXMgbm90ZVxyXG4gICAgICBsZXQgc2hpZnQgPSAocGFyYW1zID4+IDQpICYgMHhGO1xyXG4gICAgICBzaGlmdCA9IHNoaWZ0ID4gMHhEID8gc2hpZnQgJiAweEQgOiBzaGlmdDsgLy8gbm90IHN1cmUgaG93IHRvIGRlYWwgd2l0aCBFIG9yIEYsIGJ1dCBpdHMgc28gbG93IHlvdSBjYW4gaGFyZGx5IG5vdGljZSBpdCBhbnl3YXlcclxuXHJcbiAgICAgIGxldCBkaXZpZGVyID0gcGFyYW1zICYgMHg3O1xyXG4gICAgICBsZXQgd2lkdGggPSAocGFyYW1zICYgMHg4KSA9PT0gMHg4O1xyXG4gICAgICB0aGlzLm5vaXNlQnVmZmVyID0gMHg3RkZGO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDI1MDAwMDAgJiYgKGluZGV4IDwgc2FtcGxlQ291bnQgfHwgKGlzTGFzdENvbW1hbmQgJiYgdm9sdW1lID4gMCkpOyBpbmRleCsrKSB7XHJcbiAgICAgICAgbGV0IGJpdDAgPSB0aGlzLm5vaXNlQnVmZmVyICYgMTtcclxuICAgICAgICBkYXRhW3NhbXBsZUluZGV4XSA9IHRoaXMuc2FtcGxlKDEgXiBiaXQwLCB2b2x1bWUpO1xyXG4gICAgICAgIHNhbXBsZUluZGV4Kys7XHJcbiAgICAgICAgLy8gYWNjb3JkaW5nIHRvIHBhcmFtcywgdXBkYXRlIGJ1ZmZlclxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHNhbXBsZUluZGV4ICUgKDIgKiAoZGl2aWRlciA9PT0gMCA/IDAuNSA6IGRpdmlkZXIpICogKDEgPDwgKHNoaWZ0ICsgMSkpKSA9PT0gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgbGV0IGJpdDEgPSAodGhpcy5ub2lzZUJ1ZmZlciA+PiAxKSAmIDE7XHJcbiAgICAgICAgICB0aGlzLm5vaXNlQnVmZmVyID0gKHRoaXMubm9pc2VCdWZmZXIgPj4gMSkgfCAoKGJpdDAgXiBiaXQxKSA8PCAxNCk7XHJcbiAgICAgICAgICBpZiAod2lkdGgpIHRoaXMubm9pc2VCdWZmZXIgPSAodGhpcy5ub2lzZUJ1ZmZlciA+PiAxKSB8ICgoYml0MCBeIGJpdDEpIDw8IDYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBvbmNlIHBlciBmcmFtZSAqIGZhZGVhbW91bnQsIGFkanVzdCB2b2x1bWVcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB2b2x1bWVGYWRlICE9PSAwICYmXHJcbiAgICAgICAgICAoaW5kZXggKyAxKSAlICh0aGlzLnNhbXBsZXNQZXJGcmFtZSAqIE1hdGguYWJzKHZvbHVtZUZhZGUpKSA9PT0gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdm9sdW1lICs9ICh2b2x1bWVGYWRlIDwgMCA/IDEgOiAtMSk7XHJcbiAgICAgICAgICB2b2x1bWUgPSB2b2x1bWUgPCAwID8gMCA6ICh2b2x1bWUgPiAweDBGID8gMHgwRiA6IHZvbHVtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbW1hbmRJbmRleCsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBwbGF5KGRhdGE6IG51bWJlcltdKSB7XHJcbiAgICBjb25zdCBidWZmZXIgPSBGbG9hdDMyQXJyYXkuZnJvbShkYXRhKTtcclxuICAgIGNvbnN0IGF1ZGlvQnVmZmVyID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKFxyXG4gICAgICAxLFxyXG4gICAgICBidWZmZXIubGVuZ3RoLFxyXG4gICAgICB0aGlzLmF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlXHJcbiAgICApO1xyXG4gICAgYXVkaW9CdWZmZXIuY29weVRvQ2hhbm5lbChidWZmZXIsIDApO1xyXG5cclxuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG4gICAgc291cmNlLmJ1ZmZlciA9IGF1ZGlvQnVmZmVyO1xyXG4gICAgc291cmNlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgc291cmNlLnN0YXJ0KDApO1xyXG4gIH1cclxufSIsIlxyXG5jb25zdCBmcyA9IHdpbmRvdy5yZXF1aXJlKCdmcycpO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlQ3J5TWFuYWdlciB7XHJcbiAgICBzdGF0aWMgZGF0YTtcclxuICAgIHN0YXRpYyBmaWxlUGF0aCA9ICcuL3NyYy9kYXRhL2Jhc2VDcmllcy5qc29uJztcclxuICAgIHN0YXRpYyB1bmRvU3RhY2sgPSBbXTtcclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHRoaXMuZmlsZVBhdGgsJ3V0ZjgnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldChpZHgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFbaWR4XTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcHVzaFVuZG8oKXtcclxuICAgICAgICB0aGlzLnVuZG9TdGFjay5wdXNoKHN0cnVjdHVyZWRDbG9uZSh0aGlzLmRhdGEpKTtcclxuICAgICAgICBpZih0aGlzLnVuZG9TdGFjay5sZW5ndGggPiAyMCl7XHJcbiAgICAgICAgICAgIHRoaXMudW5kb1N0YWNrLnNoaWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwb3BVbmRvKCl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy51bmRvU3RhY2sucG9wKCk7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmbHVzaCgpe1xyXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmModGhpcy5maWxlUGF0aCwgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFkZE5ldygpe1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICB0aGlzLmRhdGEucHVzaCh7XHJcbiAgICAgICAgICAgIGNoYW5uZWxzOiB7XHJcbiAgICAgICAgICAgICAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFwibm9pc2VcIjogW1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmFtZTogXCJOZXcgQmFzZSBDcnlcIixcclxuICAgICAgICAgICAgXCJpc1JlZmVyZW5jZVwiOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkZWxldGUoaWR4KXtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29weShpZHgpe1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICBjb25zdCBkYXRhID0gc3RydWN0dXJlZENsb25lKHRoaXMuZGF0YVtpZHhdKTtcclxuICAgICAgICBkYXRhLmlzUmVmZXJlbmNlID0gZmFsc2U7XHJcbiAgICAgICAgZGF0YS5uYW1lID0gZGF0YS5uYW1lICsgXCIgKENvcHkpXCI7XHJcbiAgICAgICAgdGhpcy5kYXRhLnB1c2goZGF0YSk7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1cGRhdGVOYW1lKGlkeCwgbmFtZSl7XHJcbiAgICAgICAgdGhpcy5wdXNoVW5kbygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVtpZHhdLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTsgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZUNoYW5uZWxzKGlkeCwgY2hhbm5lbHMpe1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICB0aGlzLmRhdGFbaWR4XS5jaGFubmVscyA9IGNoYW5uZWxzO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTsgXHJcbiAgICB9XHJcbn0iLCJjb25zdCBmcyA9IHdpbmRvdy5yZXF1aXJlKCdmcycpO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vbnN0ZXJNYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBkYXRhO1xyXG4gICAgc3RhdGljIGZpbGVQYXRoID0gJy4vc3JjL2RhdGEvcG9rZW1vbi5qc29uJztcclxuICAgIHN0YXRpYyB1bmRvU3RhY2sgPSBbXTtcclxuICAgIFxyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmModGhpcy5maWxlUGF0aCwgJ3V0ZjgnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldChpZHgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW2lkeF07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldEJ5TmFtZShuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5maW5kKHBva2Vtb24gPT4gcG9rZW1vbi5uYW1lID09PSBuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcHVzaFVuZG8oKSB7XHJcbiAgICAgICAgdGhpcy51bmRvU3RhY2sucHVzaChzdHJ1Y3R1cmVkQ2xvbmUodGhpcy5kYXRhKSk7XHJcbiAgICAgICAgaWYgKHRoaXMudW5kb1N0YWNrLmxlbmd0aCA+IDIwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5kb1N0YWNrLnNoaWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwb3BVbmRvKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMudW5kb1N0YWNrLnBvcCgpO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZmx1c2goKSB7XHJcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyh0aGlzLmZpbGVQYXRoLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEsIG51bGwsIDIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYWRkTmV3KCkge1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICB0aGlzLmRhdGEucHVzaCh7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTmV3IE1vbnN0ZXJcIixcclxuICAgICAgICAgICAgY3J5OiAwLFxyXG4gICAgICAgICAgICBwaXRjaDogMTI4LFxyXG4gICAgICAgICAgICBsZW5ndGg6IDY0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGVsZXRlKGlkeCkge1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjb3B5KGlkeCkge1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICBjb25zdCBwb2tlbW9uID0gc3RydWN0dXJlZENsb25lKHRoaXMuZGF0YVtpZHhdKTtcclxuICAgICAgICBwb2tlbW9uLm5hbWUgPSBwb2tlbW9uLm5hbWUgKyBcIiAoQ29weSlcIjtcclxuICAgICAgICB0aGlzLmRhdGEucHVzaChwb2tlbW9uKTtcclxuICAgICAgICB0aGlzLmZsdXNoKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1cGRhdGVOYW1lKGlkeCwgbmFtZSkge1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICB0aGlzLmRhdGFbaWR4XS5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmZsdXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZUNyeShpZHgsIGNyeSkge1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICB0aGlzLmRhdGFbaWR4XS5jcnkgPSBjcnk7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1cGRhdGVQaXRjaChpZHgsIHBpdGNoKSB7XHJcbiAgICAgICAgdGhpcy5wdXNoVW5kbygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVtpZHhdLnBpdGNoID0gcGl0Y2g7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1cGRhdGVMZW5ndGgoaWR4LCBsZW5ndGgpIHtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhW2lkeF0ubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlUG9rZW1vbihpZHgsIHBva2Vtb24pIHtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhW2lkeF0gPSB7IC4uLnRoaXMuZGF0YVtpZHhdLCAuLi5wb2tlbW9uIH07XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgfSAgXHJcblxyXG59IiwiaW1wb3J0IENyeVR5cGUgZnJvbSBcIi4uL0NyeVR5cGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuICB7IC8vICQwMFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEY1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAzLCAweDcxOF0gfSwgLy8gNTY0Ljk3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBFLCAweDA1LCAweDc5OF0gfSwgLy8gMTI2MC4zMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOSwgMHgwMSwgMHg3NThdIH0gIC8vIDc4MC4xOSBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhBMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQiwgMHgwMywgMHg3MDhdIH0sIC8vIDUyOC41MiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwNSwgMHg3ODhdIH0sIC8vIDEwOTIuMjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDcsIDB4MDEsIDB4NzQ4XSB9ICAvLyA3MTIuMzUgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEEsIDB4MDEsIDB4MUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDA5LCAweDA0LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOCwgMHgwMSwgMHgxQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDAxICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QTAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDMsIDB4NjAwXSB9LCAvLyAyNTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDUsIDB4NzYwXSB9LCAvLyA4MTkuMjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEUsIDB4MDIsIDB4NzIwXSB9LCAvLyA1ODUuMTQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NzEwXSB9ICAvLyA1NDYuMTMgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NUEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEIsIDB4MDMsIDB4NkYxXSB9LCAvLyA0ODMuNjYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEMsIDB4MDUsIDB4NzUyXSB9LCAvLyA3NTMuMjkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEEsIDB4MDIsIDB4NzExXSB9LCAvLyA1NDguNDIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NjAxXSB9ICAvLyAyNTYuNTAgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEEsIDB4MDIsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDA5LCAweDA0LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwOCwgMHgwMiwgMHgxQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDcsIDB4MDEsIDB4MkNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwMiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDAwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBGLCAweDA1LCAweDQ4MF0gfSwgLy8gMTQ2LjI5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBFLCAweDAxLCAweDVFMF0gfSwgLy8gMjQwLjk0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDVEQ10gfSAgLy8gMjM5LjE4IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEE1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDA5LCAweDA1LCAweDQ0MV0gfSwgLy8gMTM2LjY4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA4LCAweDAxLCAweDUyMV0gfSwgLy8gMTc4LjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA2LCAweDAxLCAweDUxQV0gfSAgLy8gMTc2LjY1IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMDMgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwNywgMHg2MDhdIH0sIC8vIDI2MC4wNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRSwgMHgwNiwgMHg2MDBdIH0sIC8vIDI1Ni4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwNywgMHg1RjBdIH0sIC8vIDI0OC4yNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwNCwgMHg1RTBdIH0sIC8vIDI0MC45NCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRCwgMHgwMywgMHg1QzBdIH0sIC8vIDIyNy41NiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMywgMHg1QTBdIH0sIC8vIDIxNS41OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRSwgMHgwMSwgMHg1ODBdIH0gIC8vIDIwNC44MCBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgwQSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwNywgMHg1MDRdIH0sIC8vIDE3MS41NiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQSwgMHgwNiwgMHg1MDJdIH0sIC8vIDE3MS4xMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOSwgMHgwNywgMHg0RjFdIH0sIC8vIDE2Ny40MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQiwgMHgwNCwgMHg0RTFdIH0sIC8vIDE2NC4wNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQSwgMHgwMywgMHg0QzJdIH0sIC8vIDE1Ny45MiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQiwgMHgwMywgMHg0QTNdIH0sIC8vIDE1Mi4yMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHg0ODJdIH0gIC8vIDE0Ni42MSBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRSwgMHgwNCwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEMsIDB4MDcsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBCLCAweDA2LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQSwgMHgwMiwgMHg1Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDA0ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDcsIDB4NkEwXSB9LCAvLyAzNzIuMzYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDYsIDB4NkE0XSB9LCAvLyAzNzYuNjQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDYsIDB4NkEwXSB9LCAvLyAzNzIuMzYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEQsIDB4MDMsIDB4NjIwXSB9LCAvLyAyNzMuMDcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDMsIDB4NjI0XSB9LCAvLyAyNzUuMzYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDIsIDB4NjIwXSB9LCAvLyAyNzMuMDcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NjEwXSB9ICAvLyAyNjQuMjYgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NUEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDcsIDB4NjAxXSB9LCAvLyAyNTYuNTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDYsIDB4NjAzXSB9LCAvLyAyNTcuNTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDYsIDB4NjAxXSB9LCAvLyAyNTYuNTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEMsIDB4MDMsIDB4NTgxXSB9LCAvLyAyMDUuMTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDMsIDB4NTgzXSB9LCAvLyAyMDUuNzYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDIsIDB4NTgyXSB9LCAvLyAyMDUuNDQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NTcxXSB9ICAvLyAyMDAuMTEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEQsIDB4MDYsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBFLCAweDA2LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwNCwgMHg1Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDQsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBDLCAweDAzLCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQSwgMHgwMSwgMHg1Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDA1ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDIsIDB4NTAwXSB9LCAvLyAxNzAuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDMsIDB4NTgwXSB9LCAvLyAyMDQuODAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDMsIDB4NTcwXSB9LCAvLyAxOTkuODAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NTYwXSB9ICAvLyAxOTUuMDUgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDIsIDB4NDgyXSB9LCAvLyAxNDYuNjEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDMsIDB4NTAxXSB9LCAvLyAxNzAuODkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEIsIDB4MDIsIDB4NEUyXSB9LCAvLyAxNjQuMjUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDgsIDB4MDEsIDB4NEMxXSB9ICAvLyAxNTcuNzMgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgIF1cclxuICB9LCB7IC8vICQwNiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEZBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDA4LCAweDAzLCAweDI0N10gfSwgLy8gODkuNDcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDYsIDB4MDIsIDB4MjI2XSB9LCAvLyA4Ny41MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwNSwgMHgwMiwgMHgyNDVdIH0sIC8vIDg5LjM1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDA2LCAweDAzLCAweDIwNl0gfSwgLy8gODUuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDgsIDB4MDIsIDB4MjI1XSB9LCAvLyA4Ny40NCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwNCwgMHgwMiwgMHgyMDddIH0gIC8vIDg1LjcyIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwNCwgMHg4Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDIsIDB4OUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBDLCAweDA2LCAweDhDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRSwgMHgwNCwgMHhBQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDcsIDB4OUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBGLCAweDAyLCAweEFDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMDcgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMywgMHg2RTBdIH0sIC8vIDQ1NS4xMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRSwgMHgwNCwgMHg2NDBdIH0sIC8vIDI5Mi41NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHg2MjBdIH0gIC8vIDI3My4wNyBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgwQSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwMywgMHg2ODNdIH0sIC8vIDM0NC4wMiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwQiwgMHgwNCwgMHg2MDJdIH0sIC8vIDI1Ny4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQSwgMHgwMSwgMHg2MDFdIH0gIC8vIDI1Ni41MCBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMywgMHg1Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDYsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDVDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMDggICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwNiwgMHg1NjVdIH0sIC8vIDE5Ni41MSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwRSwgMHgwNCwgMHg1N0NdIH0sIC8vIDIwMy41MyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwMiwgMHg1NUNdIH0sIC8vIDE5My44OSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQiwgMHgwMiwgMHg1M0NdIH0gIC8vIDE4NS4xMyBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHg1QSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwRCwgMHgwNiwgMHg1MDNdIH0sIC8vIDE3MS4zNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwQiwgMHgwNCwgMHg1MUJdIH0sIC8vIDE3Ni44OSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwOSwgMHgwMiwgMHg0RkFdIH0sIC8vIDE2OS4zNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQSwgMHgwMiwgMHg0REJdIH0gIC8vIDE2Mi44MiBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRSwgMHgwNiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEIsIDB4MEQsIDB4MDcsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBDLCAweDAyLCAweDRDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMDkgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwNywgMHg3QTBdIH0sIC8vIDEzNjUuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDYsIDB4N0EzXSB9LCAvLyAxNDA5LjM4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBGLCAweDA0LCAweDdBMF0gfSwgIC8vIDEzNjUuMzMgSHpcclxuICAgICAgeyBcImR1dHlcIjogMHhBNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwRiwgMHgwNiwgMHg3RDhdIH0sIC8vIDMyNzYuODAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDMsIDB4N0Q3XSB9LCAvLyAzMTk2Ljg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBGLCAweDAyLCAweDdEOF0gfSAgLy8gMzI3Ni44MCBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgwNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwMCwgLTB4MDgsIDB4MDAwXSB9LCAvLyA2NC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQSwgMHgwNywgMHg2QTFdIH0sIC8vIDM3My40MiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOCwgMHgwNiwgMHg2QTJdIH0sIC8vIDM3NC40OSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwNywgMHgwNCwgMHg2QTFdIH0sIC8vIDM3My40MiBIelxyXG4gICAgICB7IFwiZHV0eVwiOiAweDVGIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDA3LCAweDA2LCAweDZENl0gfSwgLy8gNDM5Ljg0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDA4LCAweDAzLCAweDZEOV0gfSwgLy8gNDQ0LjMxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBBLCAweDAyLCAweDZEN10gfSAgLy8gNDQxLjMyIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBGLCAweDAyLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRSwgMHgwNCwgMHgzRV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDcsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDA1LCAweDNCXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRSwgMHgwNCwgMHgzRF0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDYsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDA0LCAweDNEXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHgzQl0gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDBBICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEYsIDB4MDcsIDB4NkUwXSB9LCAvLyA0NTUuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDYsIDB4NkU1XSB9LCAvLyA0NjMuMTUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEYsIDB4MDQsIDB4NkUwXSB9LCAvLyA0NTUuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEYsIDB4MDYsIDB4NkQwXSB9LCAvLyA0MzEuMTYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEUsIDB4MDMsIDB4NkMwXSB9LCAvLyA0MDkuNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDIsIDB4NkIwXSB9LCAvLyAzOTAuMTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4NkM4XSB9ICAvLyA0MjAuMTAgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MDUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MDAsIC0weDA4LCAweDAwMF0gfSwgLy8gNjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDcsIDB4NkExXSB9LCAgLy8gMzczLjQyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDA4LCAweDA2LCAweDZBM10gfSwgIC8vIDM3NS41NiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwNywgMHgwNCwgMHg2QTFdIH0sICAvLyAzNzMuNDIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MDcsIDB4MDYsIDB4NjkxXSB9LCAgLy8gMzU3LjE0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDA4LCAweDAzLCAweDY4Ml0gfSwgIC8vIDM0My4xMiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQSwgMHgwMiwgMHg2NzFdIH0sICAvLyAzMjguNTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDcsIDB4MDIsIDB4Njg5XSB9ICAgLy8gMzQ5LjUzIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBGLCAweDAyLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRSwgMHgwNCwgMHgzRV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDcsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBDLCAweDA1LCAweDNCXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwRCwgMHgwNCwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEIsIDB4MDYsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDA0LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOSwgMHgwMSwgMHgzQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDBCICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4Q0MgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDEsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDEsIDB4NzgwXSB9LCAvLyAxMDI0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAxLCAweDc0MF0gfSwgLy8gNjgyLjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAxLCAweDc0MF0gfSwgLy8gNjgyLjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAxLCAweDc4MF0gfSwgLy8gMTAyNC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMSwgMHg3MDBdIH0sIC8vIDUxMi4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMSwgMHg3MDFdIH0sIC8vIDUxNC4wMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMSwgMHg3ODJdIH0sIC8vIDEwNDAuMjUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDEsIDB4NzQyXSB9LCAvLyA2ODkuODUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NzQxXSB9ICAvLyA2ODYuMjQgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NDQgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MDAsIC0weDA4LCAweDAwMF0gfSwgLy8gNjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDEsIDB4NzAxXSB9LCAvLyA1MTQuMDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDEsIDB4NzgyXSB9LCAvLyAxMDQwLjI1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAxLCAweDc0MV0gfSwgLy8gNjg2LjI0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAxLCAweDc0MV0gfSwgLy8gNjg2LjI0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAxLCAweDc4Ml0gfSwgLy8gMTA0MC4yNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg3MDFdIH0gIC8vIDUxNC4wMSBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwMCwgLTB4MDgsIDB4MDBdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDAwLCAtMHgwOCwgMHgwMF0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDEsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBCLCAweDAxLCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMSwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDEsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAxLCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQSwgMHgwMSwgMHg0Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDBDICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4Q0MgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEYsIDB4MDUsIDB4NjAwXSB9LCAvLyAyNTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEQsIDB4MDIsIDB4NjM4XSB9LCAvLyAyODcuNDQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEMsIDB4MDIsIDB4NjMwXSB9LCAvLyAyODIuNDggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEMsIDB4MDIsIDB4NjI4XSB9LCAvLyAyNzcuNjkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEIsIDB4MDIsIDB4NjIwXSB9LCAvLyAyNzMuMDcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEIsIDB4MDIsIDB4NjEwXSB9LCAvLyAyNjQuMjYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEEsIDB4MDIsIDB4NjE4XSB9LCAvLyAyNjguNTkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEIsIDB4MDIsIDB4NjEwXSB9LCAvLyAyNjQuMjYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NjIwXSB9ICAvLyAyNzMuMDcgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NDQgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEMsIDB4MDMsIDB4NUMwXSB9LCAvLyAyMjcuNTYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEIsIDB4MDEsIDB4NUY5XSB9LCAvLyAyNTIuNTUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEEsIDB4MDEsIDB4NUYxXSB9LCAvLyAyNDguNzEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEEsIDB4MDEsIDB4NUU5XSB9LCAvLyAyNDQuOTkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDksIDB4MDEsIDB4NUUxXSB9LCAvLyAyNDEuMzggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDksIDB4MDEsIDB4NUQ5XSB9LCAvLyAyMzcuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDgsIDB4MDEsIDB4NUQxXSB9LCAvLyAyMzQuNDggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDksIDB4MDEsIDB4NUQ5XSB9LCAvLyAyMzcuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDksIDB4MDEsIDB4NUUxXSB9ICAvLyAyNDEuMzggSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgIF1cclxuICB9LCB7IC8vICQwRCAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDg4IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDY1MF0gfSwgLy8gMzAzLjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBELCAweDAxLCAweDY2MF0gfSwgLy8gMzE1LjA4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBFLCAweDAyLCAweDYxMl0gfSwgLy8gMjY1LjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBDLCAweDAxLCAweDYyMl0gfSwgLy8gMjc0LjIxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDYxMF0gfSwgLy8gMjY0LjI2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAxLCAweDYyMF0gfSwgLy8gMjczLjA3IEh6XHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4ODggfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEYsIDB4MDIsIDB4NjUwXSB9LCAvLyAzMDMuNDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEQsIDB4MDEsIDB4NjYwXSB9LCAvLyAzMTUuMDggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEUsIDB4MDIsIDB4NjEyXSB9LCAvLyAyNjUuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEMsIDB4MDEsIDB4NjIyXSB9LCAvLyAyNzQuMjEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEYsIDB4MDIsIDB4NjEwXSB9LCAvLyAyNjQuMjYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDEsIDB4NjIwXSB9ICAvLyAyNzMuMDcgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NDAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDAsIC0weDA4LCAweDAwMF0gfSwgLy8gNjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEYsIDB4MDIsIDB4NjUxXSB9LCAvLyAzMDQuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEQsIDB4MDEsIDB4NjYxXSB9LCAvLyAzMTUuODQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEUsIDB4MDIsIDB4NjE0XSB9LCAvLyAyNjYuNDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NjI0XSB9LCAvLyAyNzUuMzYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEYsIDB4MDIsIDB4NjExXSB9LCAvLyAyNjQuNzkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEQsIDB4MDEsIDB4NjIxXSB9LCAvLyAyNzMuNjQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEUsIDB4MDIsIDB4NjE0XSB9LCAvLyAyNjYuNDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NjI0XSB9LCAvLyAyNzUuMzYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEYsIDB4MDIsIDB4NjExXSB9LCAvLyAyNjQuNzkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDEsIDB4NjIxXSB9ICAvLyAyNzMuNjQgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDIsIDB4MUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBCLCAweDAxLCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEIsIDB4MDEsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDAyLCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwQSwgMHgwMiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEMsIDB4MDIsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBBLCAweDAxLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwQywgMHgwMiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEEsIDB4MDEsIDB4M0NdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwRSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEE1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAxLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAyLCAweDc4MF0gfSwgLy8gMTAyNC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwOSwgMHgwMiwgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRSwgMHgwMSwgMHg2MDBdIH0gIC8vIDI1Ni4wMCBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgwQSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQiwgMHgwMSwgMHg2RTFdIH0sIC8vIDQ1Ni43MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwMiwgMHg2RTFdIH0sIC8vIDQ1Ni43MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwNiwgMHgwMiwgMHg2ODFdIH0sIC8vIDM0Mi4yMiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwMSwgMHg1RTFdIH0gIC8vIDI0MS4zOCBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwNiwgMHgwMSwgMHgzMl0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDYsIDB4MDEsIDB4MjFdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA2LCAweDAxLCAweDExXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMEYgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwNywgMHg3QzBdIH0sIC8vIDIwNDguMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEUsIDB4MDYsIDB4N0MyXSB9LCAvLyAyMTE0LjA2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDA1LCAweDY4MF0gfSwgLy8gMzQxLjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDA0LCAweDY3MF0gfSwgLy8gMzI3LjY4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBCLCAweDA1LCAweDY2MF0gfSwgLy8gMzE1LjA4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDY0MF0gfSAgLy8gMjkyLjU3IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweENDIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBDLCAweDA3LCAweDc4MV0gfSwgLy8gMTAzMi4wNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwQiwgMHgwNiwgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEEsIDB4MDUsIDB4NjQxXSB9LCAvLyAyOTMuMjMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDQsIDB4NjMyXSB9LCAvLyAyODMuNzEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEIsIDB4MDUsIDB4NjIxXSB9LCAvLyAyNzMuNjQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NjAyXSB9ICAvLyAyNTcuMDAgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEUsIDB4MDQsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBELCAweDA2LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRSwgMHgwNCwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDcsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBDLCAweDAyLCAweDVEXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMTAgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhDOSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRiwgMHgwNywgMHg2ODBdIH0sIC8vIDM0MS4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRiwgMHgwNywgMHg2NjBdIH0sIC8vIDMxNS4wOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMSwgMHgwRSwgMHgwNywgMHg2NDBdIH0sIC8vIDI5Mi41NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMSwgMHgwRSwgMHgwNywgMHg2MjBdIH0sIC8vIDI3My4wNyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRCwgMHgwMSwgMHg2MDBdIH0sIC8vIDI1Ni4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwNywgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQSwgMHgwNywgMHg3MzBdIH0sIC8vIDYzMC4xNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwOSwgMHgwMSwgMHg3MjBdIH0gIC8vIDU4NS4xNCBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHg3OSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwRSwgMHgwNywgMHg2ODJdIH0sIC8vIDM0My4xMiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRSwgMHgwNywgMHg2NjJdIH0sIC8vIDMxNi42MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMSwgMHgwRCwgMHgwNywgMHg2NDJdIH0sIC8vIDI5My44OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMSwgMHgwRCwgMHgwNywgMHg2MjJdIH0sIC8vIDI3NC4yMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwMSwgMHg2MDJdIH0sIC8vIDI1Ny4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQiwgMHgwNywgMHg3NDJdIH0sIC8vIDY4OS44NSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwOSwgMHgwNywgMHg3MzJdIH0sIC8vIDYzNi4yNyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwOCwgMHgwMSwgMHg3MjJdIH0gIC8vIDU5MC40MSBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwNywgMHgwNCwgMHgyMV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDcsIDB4MDQsIDB4MTBdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDA3LCAweDAxLCAweDIwXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMTEgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRiwgMHgwNywgMHg3QTBdIH0sIC8vIDEzNjUuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDYsIDB4N0E0XSB9LCAvLyAxNDI0LjcwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDA2LCAweDdBMF0gfSwgLy8gMTM2NS4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRCwgMHgwMywgMHg3MjBdIH0sIC8vIDU4NS4xNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMywgMHg3MjNdIH0sIC8vIDU5My4wOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwQywgMHgwMiwgMHg3MjhdIH0sIC8vIDYwNi44MSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwMSwgMHg3MzBdIH0gIC8vIDYzMC4xNSBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgwQSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwMCwgLTB4MDgsIDB4MDBdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBBLCAweDA3LCAweDc0MV0gfSwgLy8gNjg2LjI0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA4LCAweDA2LCAweDc0M10gfSwgLy8gNjkzLjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDA3LCAweDA2LCAweDc0MV0gfSwgLy8gNjg2LjI0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBELCAweDA4LCAweDAzLCAweDZDMl0gfSwgLy8gNDEyLjE4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDA3LCAweDAzLCAweDZDMV0gfSwgLy8gNDEwLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDA4LCAweDAyLCAweDZDQ10gfSwgLy8gNDI1LjU2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA3LCAweDAxLCAweDZEOF0gfSAgLy8gNDQyLjgxIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBGLCAweDAyLCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRSwgMHgwNiwgMHgzQV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDcsIDB4M0FdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDA2LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRSwgMHgwNSwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEQsIDB4MDIsIDB4M0RdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDJDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMTIgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhBNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRiwgMHgwMiwgMHg0NDBdIH0sIC8vIDEzNi41MyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRSwgMHgwMywgMHg0QTBdIH0sIC8vIDE1MS43MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMiwgMHg0OTBdIH0sIC8vIDE0OC45NSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg0ODBdIH0gIC8vIDE0Ni4yOSBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhFRSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQiwgMHgwRCwgMHgwMiwgMHg0MzhdIH0sIC8vIDEzNS40MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwQywgMHgwNiwgMHg0OThdIH0sIC8vIDE1MC4zMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQiwgMHgwMiwgMHg0ODhdIH0sIC8vIDE0Ny42MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwMSwgMHg0NzhdIH0gIC8vIDE0NC45OSBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwRSwgMHgwNiwgMHg2Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDIsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBDLCAweDAyLCAweDZDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg1Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDEzICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MzMgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEYsIDB4MDYsIDB4NUMwXSB9LCAvLyAyMjcuNTYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDMsIDB4NUJDXSB9LCAvLyAyMjUuOTkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDIsIDB4NUQwXSB9LCAvLyAyMzQuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEIsIDB4MDIsIDB4NUUwXSB9LCAvLyAyNDAuOTQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDIsIDB4NUYwXSB9LCAvLyAyNDguMjQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NjAwXSB9ICAvLyAyNTYuMDAgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4OTkgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEMsIDB4MDYsIDB4NEIxXSB9LCAvLyAxNTQuNzUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEMsIDB4MDMsIDB4NEFEXSB9LCAvLyAxNTQuMDIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEIsIDB4MDIsIDB4NEMxXSB9LCAvLyAxNTcuNzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDksIDB4MDIsIDB4NEQxXSB9LCAvLyAxNjAuODIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEEsIDB4MDIsIDB4NEUxXSB9LCAvLyAxNjQuMDUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDksIDB4MDEsIDB4NEYxXSB9ICAvLyAxNjcuNDAgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEUsIDB4MDYsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBELCAweDA2LCAweDZDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwMiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDMsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAzLCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQSwgMHgwMSwgMHg1Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDE0ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDQsIDB4NzkwXSB9LCAvLyAxMTcwLjI5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBGLCAweDA1LCAweDdDMF0gfSwgLy8gMjA0OC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg3RDhdIH0gIC8vIDMyNzYuODAgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QTUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEMsIDB4MDQsIDB4NzcxXSB9LCAvLyA5MTYuNTkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEIsIDB4MDYsIDB4N0EyXSB9LCAvLyAxMzk0LjM4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDdCN10gfSAgLy8gMTc5NS41MSBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRSwgMHgwNCwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEMsIDB4MDQsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDJDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMTUgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMywgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDcsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDMsIDB4NzEwXSB9LCAvLyA1NDYuMTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDIsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDIsIDB4NkYwXSB9LCAvLyA0ODEuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NkUwXSB9ICAvLyA0NTUuMTEgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NUEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDMsIDB4NzAxXSB9LCAvLyA1MTQuMDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEIsIDB4MDcsIDB4NjgxXSB9LCAvLyAzNDIuMjIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEIsIDB4MDMsIDB4NjkyXSB9LCAvLyAzNTguMTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEEsIDB4MDIsIDB4NjgxXSB9LCAvLyAzNDIuMjIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDIsIDB4NjcyXSB9LCAvLyAzMjkuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NjYxXSB9ICAvLyAzMTUuODQgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDMsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBELCAweDA2LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwNiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEIsIDB4MDMsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAyLCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwMSwgMHg2Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDE2ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDcsIDB4NzgwXSB9LCAvLyAxMDI0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDA2LCAweDdBMF0gfSwgLy8gMTM2NS4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRCwgMHgwMiwgMHg3NDBdIH0gIC8vIDY4Mi42NyBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHg1QSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwNywgMHg3NTNdIH0sIC8vIDc1Ny42NCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQiwgMHgwNiwgMHg3NzJdIH0sIC8vIDkyMy4wNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwMiwgMHg3MTFdIH0gIC8vIDU0OC40MiBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwRiwgMHgwNiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDYsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBGLCAweDAyLCAweDRDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMTcgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgwRiB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwNywgMHg1MDBdIH0sIC8vIDE3MC42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRSwgMHgwNywgMHg1MDhdIH0sIC8vIDE3Mi40NiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwNCwgMHg0ODBdIH0sIC8vIDE0Ni4yOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQSwgMHgwMiwgMHg0NjBdIH0gIC8vIDE0MS4yNCBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHg0NCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwRCwgMHgwNywgMHg0ODFdIH0sIC8vIDE0Ni40NSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwQywgMHgwNywgMHg0ODldIH0sIC8vIDE0Ny43NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwQiwgMHgwNCwgMHg0MDFdIH0sIC8vIDEyOC4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwMiwgMHgzRTFdIH0gIC8vIDEyNC4yNCBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwRiwgMHgwNywgMHg3Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEYsIDB4MDYsIDB4NkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBFLCAweDA0LCAweDdDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRSwgMHgwMiwgMHg2Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDE4ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NTAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEYsIDB4MDUsIDB4NjgwXSB9LCAvLyAzNDEuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEUsIDB4MDIsIDB4NkEwXSB9LCAvLyAzNzIuMzYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEYsIDB4MDIsIDB4NkMwXSB9LCAvLyA0MDkuNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEUsIDB4MDIsIDB4NkUwXSB9LCAvLyA0NTUuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEQsIDB4MDIsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDIsIDB4NkUwXSB9LCAvLyA0NTUuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEQsIDB4MDIsIDB4NkMwXSB9LCAvLyA0MDkuNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NkEwXSB9ICAvLyAzNzIuMzYgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEYgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEQsIDB4MDUsIDB4NjMxXSB9LCAvLyAyODMuMDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEQsIDB4MDIsIDB4NjUyXSB9LCAvLyAzMDQuODIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEUsIDB4MDIsIDB4NjcxXSB9LCAvLyAzMjguNTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEIsIDB4MDIsIDB4NjkxXSB9LCAvLyAzNTcuMTQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDIsIDB4NkIyXSB9LCAvLyAzOTIuNDMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEIsIDB4MDIsIDB4NjkxXSB9LCAvLyAzNTcuMTQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDIsIDB4NjcxXSB9LCAvLyAzMjguNTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NjUxXSB9ICAvLyAzMDQuMTEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDMsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAzLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRCwgMHgwNCwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDQsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDA0LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHgyQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDE5ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MUIgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEQsIDB4MDIsIDB4NzQwXSB9LCAvLyA2ODIuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDUsIDB4NzYwXSB9LCAvLyA4MTkuMjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDEsIDB4NzMwXSB9ICAvLyA2MzAuMTUgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4ODEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEMsIDB4MDIsIDB4NzAxXSB9LCAvLyA1MTQuMDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDIsIDB4NzA4XSB9LCAvLyA1MjguNTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDcsIDB4NzQxXSB9LCAvLyA2ODYuMjQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4NzAxXSB9ICAvLyA1MTQuMDEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgIF1cclxuICB9LCB7IC8vICQxQSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBGLCAweDA3LCAweDc0MF0gfSwgLy8gNjgyLjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBFLCAweDA2LCAweDc0NF0gfSwgLy8gNjk3LjE5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDA1LCAweDc1MF0gfSwgLy8gNzQ0LjczIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAzLCAweDc2MF0gfSwgLy8gODE5LjIwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBDLCAweDAzLCAweDc4MF0gfSwgLy8gMTAyNC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg3QTBdIH0gIC8vIDEzNjUuMzMgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDcsIDB4NzAxXSB9LCAvLyA1MTQuMDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEIsIDB4MEIsIDB4MDYsIDB4NzAyXSB9LCAvLyA1MTYuMDMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEEsIDB4MDUsIDB4NzExXSB9LCAvLyA1NDguNDIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDksIDB4MDMsIDB4NzIxXSB9LCAvLyA1ODcuNzcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEEsIDB4MDMsIDB4NzQxXSB9LCAvLyA2ODYuMjQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDksIDB4MDEsIDB4NzYyXSB9ICAvLyA4MjkuNTcgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEUsIDB4MDIsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDA2LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRCwgMHgwNCwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEMsIDB4MDcsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBFLCAweDAyLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHgyQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDFCICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEYsIDB4MDcsIDB4NkMwXSB9LCAvLyA0MDkuNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDcsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDQsIDB4NkYwXSB9LCAvLyA0ODEuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDQsIDB4NkUwXSB9LCAvLyA0NTUuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NkQwXSB9ICAvLyA0MzEuMTYgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEUsIDB4MDYsIDB4NjgxXSB9LCAvLyAzNDIuMjIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEQsIDB4MDUsIDB4NkMxXSB9LCAvLyA0MTAuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDQsIDB4NkIxXSB9LCAvLyAzOTEuMjYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDQsIDB4NkExXSB9LCAvLyAzNzMuNDIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NjkxXSB9ICAvLyAzNTcuMTQgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEEsIDB4MDYsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDA5LCAweDA0LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQSwgMHgwMywgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDksIDB4MDEsIDB4MkNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxQyAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEY1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBELCAweDA2LCAweDdFMV0gfSwgLy8gNDIyOC4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwNiwgMHg3RTJdIH0sIC8vIDQzNjkuMDcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEQsIDB4MDYsIDB4N0UxXSB9LCAvLyA0MjI4LjEzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBDLCAweDA2LCAweDdFMF0gfSwgLy8gNDA5Ni4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQiwgMHgwNiwgMHg3RTJdIH0sIC8vIDQzNjkuMDcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEMsIDB4MDYsIDB4N0UxXSB9LCAvLyA0MjI4LjEzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDA2LCAweDdFMF0gfSwgLy8gNDA5Ni4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQSwgMHgwMSwgMHg3REZdIH0gIC8vIDM5NzEuODggSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NDQgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDMsIDB4N0M5XSB9LCAvLyAyMzgzLjEzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDAzLCAweDdDN10gfSwgLy8gMjI5OS41MSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwQywgMHgwNCwgMHg3QzNdIH0sIC8vIDIxNDguNzIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDQsIDB4N0M3XSB9LCAvLyAyMjk5LjUxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDAzLCAweDdDOV0gfSwgLy8gMjM4My4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQSwgMHgwMiwgMHg3QzVdIH0gIC8vIDIyMjEuNTYgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEQsIDB4MDEsIC0weDAxLCAweDdDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwRiwgMHgwNywgMHg4Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEQsIDB4MDYsIDB4N0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDA0LCAweDZDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQiwgMHgwMywgMHg1Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDFEICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjQgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEYsIDB4MDAsIDB4NzA1XSB9LCAvLyA1MjIuMjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEUsIDB4MDAsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEIsIDB4MDQsIDB4NzEwXSB9LCAvLyA1NDYuMTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDMsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEIsIDB4MDIsIDB4NjIwXSB9LCAvLyAyNzMuMDcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NjI0XSB9ICAvLyAyNzUuMzYgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MjIgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEIsIDB4MDAsIDB4NkMzXSB9LCAvLyA0MTMuNDggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEEsIDB4MDAsIDB4NkMxXSB9LCAvLyA0MTAuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MDgsIDB4MDQsIDB4NkQyXSB9LCAvLyA0MzQuMDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDksIDB4MDMsIDB4NkMxXSB9LCAvLyA0MTAuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MDgsIDB4MDIsIDB4NUUxXSB9LCAvLyAyNDEuMzggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDYsIDB4MDEsIDB4NUU4XSB9ICAvLyAyNDQuNTQgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDYsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA2LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwQywgMHgwNSwgMHg0QV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEIsIDB4MDIsIDB4NUJdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBDLCAweDAyLCAweDRDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMUUgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRiwgMHgwMiwgMHg2MDBdIH0sIC8vIDI1Ni4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRSwgMHgwMiwgMHg2NDBdIH0sIC8vIDI5Mi41NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwMiwgMHg2ODBdIH0sIC8vIDM0MS4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRSwgMHgwMiwgMHg2QzBdIH0sIC8vIDQwOS42MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwMiwgMHg3MDBdIH0sIC8vIDUxMi4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwMiwgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwMiwgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4N0MwXSB9ICAvLyAyMDQ4LjAwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDExIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDAwLCAtMHgwOCwgMHgwMDFdIH0sIC8vIDY0LjAzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDAyLCAweDVDMV0gfSwgLy8gMjI3Ljk1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDAyLCAweDYwMl0gfSwgLy8gMjU3LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBBLCAweDAyLCAweDY0MV0gfSwgLy8gMjkzLjIzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDAyLCAweDY4Ml0gfSwgLy8gMzQzLjEyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBBLCAweDAyLCAweDZDMl0gfSwgLy8gNDEyLjE4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDA5LCAweDAyLCAweDcwMV0gfSwgLy8gNTE0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBBLCAweDAyLCAweDc0Ml0gfSwgLy8gNjg5Ljg1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA4LCAweDAxLCAweDc4MV0gfSAgLy8gMTAzMi4wNiBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwMCwgLTB4MDgsIDB4MDFdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBFLCAweDAyLCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQywgMHgwMiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDIsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBCLCAweDAyLCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQywgMHgwMiwgMHgxQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEEsIDB4MDIsIDB4MUJdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDA5LCAweDAyLCAweDFBXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOCwgMHgwMSwgMHgxOF0gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDFGICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QTUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEYsIDB4MDQsIDB4NjQxXSB9LCAvLyAyOTMuMjMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEQsIDB4MEQsIDB4MDYsIDB4NzIxXSB9LCAvLyA1ODcuNzcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEYsIDB4MDQsIDB4NzE5XSB9LCAvLyA1NjcuNDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NzFBXSB9ICAvLyA1NjkuODggSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4Q0MgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDQsIDB4NTgwXSB9LCAvLyAyMDQuODAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEUsIDB4MDYsIDB4NkUwXSB9LCAvLyA0NTUuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDUsIDB4NkQ4XSB9LCAvLyA0NDIuODEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NkRDXSB9ICAvLyA0NDguODggSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEMsIDB4MDQsIDB4NDZdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBELCAweDBBLCAweDA1LCAweDQ0XSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwNCwgMHg0NV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NDRdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQyMCAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBELCAweDBGLCAweDAxLCAweDUxMV0gfSwgLy8gMTc0LjUzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBELCAweDBFLCAweDAxLCAweDUxNV0gfSwgLy8gMTc1LjQ2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBELCAweDBFLCAweDAxLCAweDUxMV0gfSwgLy8gMTc0LjUzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDUxMV0gfSAgLy8gMTc0LjUzIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDE1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBFLCAweDAxLCAweDUwQ10gfSwgLy8gMTczLjM4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBELCAweDAxLCAweDUxMF0gfSwgLy8gMTc0LjMwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBDLCAweDAxLCAweDUwQ10gfSwgLy8gMTczLjM4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDUwQV0gfSAgLy8gMTcyLjkyIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBGLCAweDAyLCAweDY1XSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwRSwgMHgwMiwgMHg1NV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEQsIDB4MDIsIDB4NTZdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDY2XSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMjEgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgxQiB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwRiwgMHgwMywgMHg1NjRdIH0sIC8vIDE5Ni4yMiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRSwgMHgwMiwgMHg1NDRdIH0sIC8vIDE4Ny4yNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRCwgMHgwMSwgMHg1MjJdIH0sIC8vIDE3OC41NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwQiwgMHgwMiwgMHg0ODRdIH0sIC8vIDE0Ni45NCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg0QTJdIH0sIC8vIDE1Mi4wNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwRiwgMHgwMywgMHg1MjRdIH0sIC8vIDE3OS4wNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRSwgMHgwNCwgMHg0RTRdIH0sIC8vIDE2NC42NiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg1MDJdIH0gIC8vIDE3MS4xMSBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhDQyB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwRCwgMHgwMywgMHg1NjBdIH0sIC8vIDE5NS4wNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwQywgMHgwMiwgMHg1NDBdIH0sIC8vIDE4Ni4xOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQywgMHgwMSwgMHg1MjBdIH0sIC8vIDE3OC4wOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwOSwgMHgwMiwgMHg0ODBdIH0sIC8vIDE0Ni4yOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHg0QTBdIH0sIC8vIDE1MS43MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwRCwgMHgwMywgMHg1MjBdIH0sIC8vIDE3OC4wOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwNCwgMHg0RTBdIH0sIC8vIDE2My44NCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHg1MDBdIH0gIC8vIDE3MC42NyBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW11cclxuICB9LCB7IC8vICQyMiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDExIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDAzLCAtMHgwNSwgMHgzODFdIH0sIC8vIDExMy44OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwRiwgMHgwNSwgMHg2MDFdIH0sICAvLyAyNTYuNTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEMsIDB4MDIsIDB4NDgxXSB9LCAgLy8gMTQ2LjQ1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDM4MV0gfSAgIC8vIDExMy44OCBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhFRSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwMywgLTB4MDYsIDB4NUIwXSB9LCAvLyAyMjEuNDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEQsIDB4MDUsIDB4NzVEXSB9LCAgLy8gODA0LjEyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAxLCAweDBCLCAweDAyLCAweDZCMF0gfSwgIC8vIDM5MC4xMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwNiwgMHgwMSwgMHg1QjBdIH0gICAvLyAyMjEuNDEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDksIDB4MDIsIDB4NDldIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBCLCAweDA1LCAweDI5XSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMSwgMHgwQSwgMHgwMiwgMHgzOV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDksIDB4MDEsIDB4NDldIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQyMyAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBGLCAweDA3LCAweDdDMF0gfSwgLy8gMjA0OC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRSwgMHgwNCwgMHg3QzFdIH0sIC8vIDIwODAuNTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEYsIDB4MDYsIDB4N0MwXSB9LCAvLyAyMDQ4LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAzLCAweDdDMl0gfSwgLy8gMjExNC4wNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHg3QzBdIH0gIC8vIDIwNDguMDAgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NUYgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDksIDB4MDcsIDB4NzgxXSB9LCAvLyAxMDMyLjA2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDA4LCAweDA0LCAweDc4MF0gfSwgLy8gMTAyNC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwOSwgMHgwNiwgMHg3ODFdIH0sIC8vIDEwMzIuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDgsIDB4MDMsIDB4NzgxXSB9ICAvLyAxMDMyLjA2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBGLCAweDAyLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwRSwgMHgwNiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDcsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDJDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMjQgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwNywgMHg2ODBdIH0sIC8vIDM0MS4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwRSwgMHgwNiwgMHg2ODRdIH0sIC8vIDM0NC45MyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRCwgMHgwNywgMHg2OTBdIH0sIC8vIDM1Ni4xNyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwNSwgMHg2OTBdIH0sIC8vIDM1Ni4xNyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwNCwgMHg2ODhdIH0sIC8vIDM0OC42MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRCwgMHgwMywgMHg2NzBdIH0sIC8vIDMyNy42OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMywgMHg2NjBdIH0sIC8vIDMxNS4wOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHg2NDBdIH0gIC8vIDI5Mi41NyBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgwNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQiwgMHgwNywgMHg2NDFdIH0sIC8vIDI5My4yMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwOSwgMHgwNiwgMHg2NDJdIH0sIC8vIDI5My44OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQSwgMHgwNywgMHg2NTFdIH0sIC8vIDMwNC4xMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQSwgMHgwNSwgMHg2NTFdIH0sIC8vIDMwNC4xMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOSwgMHgwNCwgMHg2NDddIH0sIC8vIDI5Ny4yMiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQSwgMHgwMywgMHg2MzFdIH0sIC8vIDI4My4wOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwOSwgMHgwMywgMHg2MjJdIH0sIC8vIDI3NC4yMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwNywgMHgwMSwgMHg2MDFdIH0gIC8vIDI1Ni41MCBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRSwgMHgwNCwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEMsIDB4MDcsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBDLCAweDA3LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwQiwgMHgwNywgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQyNSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEE1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBGLCAweDA0LCAweDc0MF0gfSwgLy8gNjgyLjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBFLCAweDAzLCAweDczMF0gfSwgLy8gNjMwLjE1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDA0LCAweDc0MF0gfSwgLy8gNjgyLjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBCLCAweDAzLCAweDc0OF0gfSwgLy8gNzEyLjM1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDc1MF0gfSAgLy8gNzQ0LjczIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDc3IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDAzLCAweDcxMl0gfSwgLy8gNTUwLjcyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBCLCAweDAzLCAweDcwNF0gfSwgLy8gNTIwLjEzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBDLCAweDAzLCAweDcxMl0gfSwgLy8gNTUwLjcyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAzLCAweDcyMV0gfSwgLy8gNTg3Ljc3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDczMl0gfSAgLy8gNjM2LjI3IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDA2LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwQywgMHgwNiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEIsIDB4MDYsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDFDXSB9XHJcbiAgICBdXHJcbiAgfVxyXG5dIGFzIENyeVR5cGVbXTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBXYXZlRGlhZ3JhbSB7XHJcbiAgY2h1bmtTaXplID0gMTAwMDA7XHJcbiAgZGltaW51dGlvbiA9IDIwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudDogU1ZHRWxlbWVudFxyXG4gICkgeyB9XHJcblxyXG4gIHJlbmRlcih3YXZlczogbnVtYmVyW11bXSkge1xyXG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgbGV0IGluZGV4ID0gMDtcclxuICAgIGZvciAoY29uc3Qgd2F2ZSBvZiB3YXZlcykge1xyXG4gICAgICB0aGlzLnJlbmRlcldhdmUod2F2ZSwgaW5kZXgsIHdhdmVzLmxlbmd0aCk7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXJXYXZlKHdhdmU6IG51bWJlcltdLCB3YXZlSW5kZXg6IG51bWJlciwgd2F2ZUNvdW50OiBudW1iZXIpIHtcclxuICAgIGxldCBzaW5nbGVXYXZlTWF4SGVpZ2h0ID0gNDAwIC8gd2F2ZUNvdW50O1xyXG4gICAgbGV0IGJhc2VZID0gd2F2ZUluZGV4ICogc2luZ2xlV2F2ZU1heEhlaWdodDtcclxuICAgIGNvbnN0IHdhdmVDaHVua0NvdW50ID0gTWF0aC5jZWlsKHdhdmUubGVuZ3RoIC8gdGhpcy5jaHVua1NpemUgLyB0aGlzLmRpbWludXRpb24pO1xyXG5cclxuICAgIGZvciAobGV0IGNodW5rSW5kZXggPSAwOyBjaHVua0luZGV4IDwgd2F2ZUNodW5rQ291bnQ7IGNodW5rSW5kZXgrKykge1xyXG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwb2x5bGluZVwiKTtcclxuICAgICAgZWxlbWVudC5zdHlsZS5maWxsID0gXCJub25lXCI7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuc3Ryb2tlID0gXCJibGFja1wiO1xyXG4gICAgICBlbGVtZW50LnN0eWxlLnN0cm9rZVdpZHRoID0gXCIzXCI7XHJcblxyXG4gICAgICBjb25zdCBwb2ludHM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgIGZvciAobGV0IGNodW5rUG9zaXRpb24gPSAwOyBjaHVua1Bvc2l0aW9uIDwgdGhpcy5jaHVua1NpemU7IGNodW5rUG9zaXRpb24rKykge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jaHVua1NpemUgKiBjaHVua0luZGV4ICsgY2h1bmtQb3NpdGlvbjtcclxuICAgICAgICBjb25zdCB3YXZlRGF0YUluZGV4ID0gdGhpcy5kaW1pbnV0aW9uICogcG9zaXRpb247XHJcbiAgICAgICAgY29uc3Qgd2F2ZURhdGEgPSB3YXZlW3dhdmVEYXRhSW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHdhdmVEYXRhID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHggPSBwb3NpdGlvbiAvIDQ7XHJcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQoXHJcbiAgICAgICAgICAxMDAgKiAoXHJcbiAgICAgICAgICAgIGJhc2VZICtcclxuICAgICAgICAgICAgc2luZ2xlV2F2ZU1heEhlaWdodCAqIHdhdmVEYXRhIC8gMiArXHJcbiAgICAgICAgICAgIHNpbmdsZVdhdmVNYXhIZWlnaHQgLyAyXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSAvIDEwMDtcclxuXHJcbiAgICAgICAgY29uc3QgcG9pbnQgPSBbeCwgeV07XHJcbiAgICAgICAgcG9pbnRzLnB1c2gocG9pbnQuam9pbihcIixcIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcInBvaW50c1wiLCBwb2ludHMuam9pbihcIiBcIikpO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCAqIGFzIHV0aWwgZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IENyeVR5cGUgZnJvbSBcIi4uL0NyeVR5cGVcIjtcclxuaW1wb3J0IFBva2Vtb24gZnJvbSBcIi4uL1Bva2Vtb25cIjtcclxuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSBcImZpbGUtc2F2ZXJcIjtcclxuaW1wb3J0IGNyeVR5cGVzIGZyb20gXCIuLi9kYXRhL2NyeVR5cGVzXCI7XHJcbndpbmRvd1tcImNyeVR5cGVcIl0gPSBjcnlUeXBlcztcclxuaW1wb3J0IFdhdmVEaWFncmFtIGZyb20gXCIuL1dhdmVEaWFncmFtXCI7XHJcbmltcG9ydCBDcnlHZW5lcmF0b3IgZnJvbSBcIi4uL0NyeUdlbmVyYXRvclwiO1xyXG5pbXBvcnQgcG9rZW1vbkxpc3QgZnJvbSBcIi4uL2RhdGEvcG9rZW1vbkxpc3RcIjtcclxuaW1wb3J0IHsgQmFzZUNyeU1hbmFnZXIgfSBmcm9tIFwiLi4vZGF0YS9CYXNlQ3J5TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyTWFuYWdlciB9IGZyb20gXCIuLi9kYXRhL01vbnN0ZXJNYW5hZ2VyXCI7XHJcblxyXG5jbGFzcyBVaSB7XHJcbiAgc2VsZWN0ZWRQb2tlbW9uOiBQb2tlbW9uO1xyXG4gIHNlbGVjdGVkQ3J5VHlwZTogQ3J5VHlwZTtcclxuICBzZWxlY3RlZENyeVR5cGVJbmRleDogbnVtYmVyO1xyXG5cclxuICBwaXRjaDogbnVtYmVyO1xyXG4gIGxlbmd0aDogbnVtYmVyO1xyXG4gIHZvbHVtZTogbnVtYmVyID0gMTAwO1xyXG5cclxuICBjdXN0b21DcnlUeXBlOiBDcnlUeXBlID0ge1xyXG4gICAgbmFtZTogXCJDdXN0b21cIixcclxuICAgIG5vaXNlOiBbXSxcclxuICAgIHB1bHNlMTogW10sXHJcbiAgICBwdWxzZTI6IFtdXHJcbiAgfTtcclxuXHJcbiAgY3J5VHlwZXM6IENyeVR5cGVbXSA9IFt0aGlzLmN1c3RvbUNyeVR5cGVdLmNvbmNhdChjcnlUeXBlcyk7XHJcblxyXG4gIHdhdmVEaWFncmFtOiBXYXZlRGlhZ3JhbTtcclxuICBjcnlHZW5lcmF0b3IgPSBuZXcgQ3J5R2VuZXJhdG9yKCk7XHJcblxyXG4gIHdhdmVEaWFncmFtRWxlbWVudDogU1ZHRWxlbWVudDtcclxuICBwbGF5QnV0dG9uRWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgZG93bmxvYWRCdXR0b25FbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgbmV3QmFzZUNyeUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29weUJhc2VDcnlCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGRlbGV0ZUJhc2VDcnlCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBzZWxlY3RlZFBva2Vtb25TZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcclxuICBzZWxlY3RlZENyeVR5cGVTZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcclxuXHJcbiAgcGl0Y2hJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgbGVuZ3RoSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHZvbHVtZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgcHVsc2UxRW5hYmxlZEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHVsc2UyRW5hYmxlZEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgbm9pc2VFbmFibGVkRWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgcHVsc2UxQ29tbWFuZHNFbGVtZW50OiBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG4gIHB1bHNlMkNvbW1hbmRzRWxlbWVudDogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICBub2lzZUNvbW1hbmRzRWxlbWVudDogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICByYXdDb21tYW5kc0VsZW1lbnQ6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblxyXG4gIGJhc2VDcnlTZWxlY3RvckVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xyXG5cclxuICBiYXNlQ3J5TmFtZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBjdXJyZW50QmFzZUNyeUlkeDogbnVtYmVyO1xyXG4gIGN1cnJlbnRNb25JZHg6IG51bWJlcjtcclxuXHJcbiAgbW9uQ3J5TmFtZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIG5ld01vbkJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29weU1vbkJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgZGVsZXRlTW9uQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgbW9uUmVmZXJlbmNlUmFuZ2U6IG51bWJlciA9IDE1MTtcclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMuY3VycmVudEJhc2VDcnlJZHggPSAwO1xyXG4gICAgdGhpcy5jdXJyZW50TW9uSWR4ID0gMDtcclxuXHJcbiAgICB0aGlzLndhdmVEaWFncmFtRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8U1ZHRWxlbWVudD4oXCIjd2F2ZS1kaWFncmFtXCIpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbGVjdGVkLXBva2Vtb25cIik7XHJcbiAgICB0aGlzLnNlbGVjdGVkUG9rZW1vblNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uU2VsZWN0ZWRQb2tlbW9uQ2hhbmdlKTtcclxuXHJcbiAgIC8vIHRoaXMuc2VsZWN0ZWRDcnlUeXBlU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbGVjdGVkLWNyeS10eXBlXCIpO1xyXG4gICAvLyB0aGlzLnNlbGVjdGVkQ3J5VHlwZVNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uQ3J5VHlwZUNoYW5nZSk7XHJcblxyXG4gICAgdGhpcy5waXRjaElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjcGl0Y2hcIik7XHJcbiAgICB0aGlzLnBpdGNoSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vblBpdGNoQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLmxlbmd0aElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjbGVuZ3RoXCIpO1xyXG4gICAgdGhpcy5sZW5ndGhJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uTGVuZ3RoQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLnZvbHVtZUlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjdm9sdW1lXCIpO1xyXG4gICAgdGhpcy52b2x1bWVJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uVm9sdW1lQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLnBsYXlCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjcGxheVwiKTtcclxuICAgIHRoaXMucGxheUJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25QbGF5Q2xpY2spO1xyXG5cclxuICAgIHRoaXMubmV3QmFzZUNyeUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI25ld1wiKTtcclxuICAgIHRoaXMubmV3QmFzZUNyeUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkJhc2VDcnlOZXdDbGljayk7XHJcblxyXG4gICAgdGhpcy5jb3B5QmFzZUNyeUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2NvcHlcIik7XHJcbiAgICB0aGlzLmNvcHlCYXNlQ3J5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQmFzZUNyeUNvcHlDbGljayk7XHJcblxyXG4gICAgdGhpcy5kZWxldGVCYXNlQ3J5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjZGVsZXRlXCIpO1xyXG4gICAgdGhpcy5kZWxldGVCYXNlQ3J5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQmFzZUNyeURlbGV0ZUNsaWNrKTtcclxuXHJcbiAgICB0aGlzLmRvd25sb2FkQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2Rvd25sb2FkXCIpO1xyXG4gICAgdGhpcy5kb3dubG9hZEJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZG93bmxvYWQpO1xyXG5cclxuICAgIHRoaXMucHVsc2UxRW5hYmxlZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI3B1bHNlMS1lbmFibGVkXCIpO1xyXG4gICAgdGhpcy5wdWxzZTJFbmFibGVkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjcHVsc2UyLWVuYWJsZWRcIik7XHJcbiAgICB0aGlzLm5vaXNlRW5hYmxlZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI25vaXNlLWVuYWJsZWRcIik7XHJcblxyXG4gICAgdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KFwiI3B1bHNlMWNtZHNcIik7XHJcbiAgICB0aGlzLnB1bHNlMUNvbW1hbmRzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5vbkNvbW1hbmRzSW5wdXQpO1xyXG5cclxuICAgIHRoaXMucHVsc2UyQ29tbWFuZHNFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MVGV4dEFyZWFFbGVtZW50PihcIiNwdWxzZTJjbWRzXCIpO1xyXG4gICAgdGhpcy5wdWxzZTJDb21tYW5kc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHRoaXMub25Db21tYW5kc0lucHV0KTtcclxuXHJcbiAgICB0aGlzLm5vaXNlQ29tbWFuZHNFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MVGV4dEFyZWFFbGVtZW50PihcIiNub2lzZWNtZHNcIik7XHJcbiAgICB0aGlzLm5vaXNlQ29tbWFuZHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB0aGlzLm9uQ29tbWFuZHNJbnB1dCk7XHJcblxyXG4gICAgLy90aGlzLnJhd0NvbW1hbmRzRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFRleHRBcmVhRWxlbWVudD4oXCIjcmF3Y21kc1wiKTtcclxuXHJcbiAgICB0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNzZWxlY3RlZC1iYXNlY3J5XCIpO1xyXG4gICAgdGhpcy5iYXNlQ3J5U2VsZWN0b3JFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vblNlbGVjdGVkQmFzZUNyeUNoYW5nZSk7XHJcblxyXG4gICAgdGhpcy5iYXNlQ3J5TmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNuYW1lXCIpO1xyXG4gICAgdGhpcy5iYXNlQ3J5TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vbkJhc2VDcnlOYW1lQ2hhbmdlKTtcclxuXHJcblxyXG4gICAgdGhpcy5tb25DcnlOYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI21vbl9uYW1lXCIpO1xyXG4gICAgdGhpcy5tb25DcnlOYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uTW9uTmFtZUNoYW5nZSk7XHJcblxyXG4gICAgdGhpcy5uZXdNb25CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNtb25fbmV3XCIpO1xyXG4gICAgdGhpcy5uZXdNb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25Nb25OZXdDbGljayk7XHJcblxyXG4gICAgdGhpcy5jb3B5TW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjbW9uX2NvcHlcIik7XHJcbiAgICB0aGlzLmNvcHlNb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25Nb25Db3B5Q2xpY2spO1xyXG5cclxuICAgIHRoaXMuZGVsZXRlTW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjbW9uX2RlbGV0ZVwiKTtcclxuICAgIHRoaXMuZGVsZXRlTW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uTW9uRGVsZXRlQ2xpY2spOyAgICBcclxuXHJcblxyXG4gICAgdGhpcy5jcmVhdGVFbGVtZW50cygpO1xyXG4gICAgdGhpcy5zZWxlY3RQb2tlbW9uKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUNvbW1hbmRzKCk7XHJcbiAgIFxyXG4gIH1cclxuXHJcbiAgcmVmcmVzaCgpe1xyXG4gICAgdGhpcy5jcmVhdGVFbGVtZW50cygpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRWxlbWVudHMoKXtcclxuICAgbGV0IGluZGV4ID0gMDtcclxuICAgdGhpcy5zZWxlY3RlZFBva2Vtb25TZWxlY3RFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBmb3IgKGNvbnN0IHBva2Vtb24gb2YgTW9uc3Rlck1hbmFnZXIuZGF0YSkge1xyXG4gICAgICBjb25zdCBvcHRpb24gPSB1dGlsLmNyZWF0ZVNlbGVjdE9wdGlvbihgIyR7aW5kZXggKyAxfTogJHtwb2tlbW9uLm5hbWV9YCwgaW5kZXgudG9TdHJpbmcoKSk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uU2VsZWN0RWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZFBva2Vtb25TZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXggPSB0aGlzLmN1cnJlbnRNb25JZHg7XHJcblxyXG4gICAgdGhpcy5tb25DcnlOYW1lSW5wdXQudmFsdWUgPSBNb25zdGVyTWFuYWdlci5nZXQodGhpcy5jdXJyZW50TW9uSWR4KS5uYW1lO1xyXG5cclxuICAgIC8qdGhpcy5zZWxlY3RlZENyeVR5cGVTZWxlY3RFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBpbmRleCA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGNyeVR5cGUgb2YgdGhpcy5jcnlUeXBlcykge1xyXG4gICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXRDcnlUeXBlTmFtZShjcnlUeXBlKTtcclxuICAgICAgY29uc3QgdmFsdWUgPSBpbmRleC50b1N0cmluZygpO1xyXG5cclxuICAgICAgY29uc3Qgb3B0aW9uID0gdXRpbC5jcmVhdGVTZWxlY3RPcHRpb24obmFtZSwgdmFsdWUpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQ3J5VHlwZVNlbGVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgaW5kZXgrKztcclxuICAgIH0qL1xyXG5cclxuICAgIHRoaXMuYmFzZUNyeVNlbGVjdG9yRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgaW5kZXggPSAwO1xyXG4gICAgZm9yIChjb25zdCBiYXNlQ3J5IG9mIEJhc2VDcnlNYW5hZ2VyLmRhdGEpIHtcclxuICAgICAgY29uc3Qgb3B0aW9uID0gdXRpbC5jcmVhdGVTZWxlY3RPcHRpb24oYCMke2luZGV4ICsgMX06ICR7YmFzZUNyeS5uYW1lfWAsIGluZGV4LnRvU3RyaW5nKCkpO1xyXG4gICAgICB0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgaW5kZXgrKztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJhc2VDcnlOYW1lSW5wdXQudmFsdWUgPSBCYXNlQ3J5TWFuYWdlci5nZXQodGhpcy5jdXJyZW50QmFzZUNyeUlkeCkubmFtZTtcclxuXHJcbiAgICB0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IHRoaXMuY3VycmVudEJhc2VDcnlJZHg7XHJcblxyXG4gICAgdGhpcy53YXZlRGlhZ3JhbSA9IG5ldyBXYXZlRGlhZ3JhbSh0aGlzLndhdmVEaWFncmFtRWxlbWVudCk7XHJcblxyXG4gICAvLyBcclxuICAgIHRoaXMudXBkYXRlQ29tbWFuZHMoKTtcclxuICB9XHJcblxyXG4gIGdldENyeVR5cGVOYW1lKGNyeVR5cGU6IENyeVR5cGUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgY3J5VHlwZS5uYW1lID09PSBcInN0cmluZ1wiID9cclxuICAgICAgY3J5VHlwZS5uYW1lIDpcclxuICAgICAgKGNyeVR5cGVzLmluZGV4T2YoY3J5VHlwZSkgKyAxKS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVEYXRhKCkge1xyXG4gICAgdGhpcy51cGRhdGVDb21tYW5kcygpO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRDaGFubmVscyA9IEJhc2VDcnlNYW5hZ2VyLmdldCh0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4KS5jaGFubmVscztcclxuXHJcbiAgICB0aGlzLmNyeUdlbmVyYXRvci5pbml0KCk7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHB1bHNlMSxcclxuICAgICAgcHVsc2UyLFxyXG4gICAgICBub2lzZVxyXG4gICAgfSA9IHRoaXMuY3J5R2VuZXJhdG9yLmdlbmVyYXRlKGN1cnJlbnRDaGFubmVscywgdGhpcy5waXRjaCwgdGhpcy5sZW5ndGgpO1xyXG5cclxuICAgIGNvbnN0IHdhdmVzOiBudW1iZXJbXVtdID0gW107XHJcbiAgICBpZiAodGhpcy5wdWxzZTFFbmFibGVkRWxlbWVudC5jaGVja2VkKSB7XHJcbiAgICAgIHdhdmVzLnB1c2gocHVsc2UxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wdWxzZTJFbmFibGVkRWxlbWVudC5jaGVja2VkKSB7XHJcbiAgICAgIHdhdmVzLnB1c2gocHVsc2UyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ub2lzZUVuYWJsZWRFbGVtZW50LmNoZWNrZWQpIHtcclxuICAgICAgd2F2ZXMucHVzaChub2lzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMubWl4V2F2ZXMod2F2ZXMsIDMpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcHVsc2UxLFxyXG4gICAgICBwdWxzZTIsXHJcbiAgICAgIG5vaXNlLFxyXG4gICAgICBkYXRhXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ3VycmVudE1vbnN0ZXJTZXR0aW5ncygpe1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBtaXhXYXZlcyh3YXZlczogbnVtYmVyW11bXSwgcmVkdWN0aW9uOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gd2F2ZXMucmVkdWNlKChwcmV2LCBjdXJyZW50KSA9PiBNYXRoLm1heChwcmV2LCBjdXJyZW50Lmxlbmd0aCksIDApO1xyXG4gICAgY29uc3QgZGF0YSA9IG5ldyBBcnJheSh0b3RhbExlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHdhdmUgb2Ygd2F2ZXMpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHdhdmUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgZGF0YVtpbmRleF0gKz0gd2F2ZVtpbmRleF0gLyByZWR1Y3Rpb247XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIG9uQmFzZUNyeU5ld0NsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3SWR4ID0gQmFzZUNyeU1hbmFnZXIuYWRkTmV3KCk7XHJcbiAgICB0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4ID0gbmV3SWR4O1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBvbkJhc2VDcnlDb3B5Q2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdJZHggPSBCYXNlQ3J5TWFuYWdlci5jb3B5KHRoaXMuYmFzZUNyeVNlbGVjdG9yRWxlbWVudC5zZWxlY3RlZEluZGV4KTtcclxuICAgIHRoaXMuY3VycmVudEJhc2VDcnlJZHggPSBuZXdJZHg7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIG9uQmFzZUNyeURlbGV0ZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgQmFzZUNyeU1hbmFnZXIuZGVsZXRlKHRoaXMuYmFzZUNyeVNlbGVjdG9yRWxlbWVudC5zZWxlY3RlZEluZGV4KTtcclxuICAgIHRoaXMuY3VycmVudEJhc2VDcnlJZHggPSAwO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdGVkQmFzZUNyeUNoYW5nZSA9ICgpID0+IHtcclxuICAgIHRoaXMuY3VycmVudEJhc2VDcnlJZHggPSB0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQuc2VsZWN0ZWRJbmRleDtcclxuICAgIGlmKHRoaXMuY3VycmVudE1vbklkeCA+PSB0aGlzLm1vblJlZmVyZW5jZVJhbmdlKXtcclxuICAgICAgTW9uc3Rlck1hbmFnZXIudXBkYXRlQ3J5KHRoaXMuY3VycmVudE1vbklkeCwgdGhpcy5jdXJyZW50QmFzZUNyeUlkeCk7ICAgICAgXHJcbiAgICB9XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIG9uQmFzZUNyeU5hbWVDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICBCYXNlQ3J5TWFuYWdlci51cGRhdGVOYW1lKHRoaXMuY3VycmVudEJhc2VDcnlJZHgsIHRoaXMuYmFzZUNyeU5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIG9uTW9uTmFtZUNoYW5nZSA9ICgpID0+IHtcclxuICAgIE1vbnN0ZXJNYW5hZ2VyLnVwZGF0ZU5hbWUodGhpcy5jdXJyZW50TW9uSWR4LCB0aGlzLm1vbkNyeU5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIG9uTW9uTmV3Q2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdJZHggPSBNb25zdGVyTWFuYWdlci5hZGROZXcoKTtcclxuICAgIHRoaXMuY3VycmVudE1vbklkeCA9IG5ld0lkeDtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH1cclxuXHJcbiAgb25Nb25Db3B5Q2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdJZHggPSBNb25zdGVyTWFuYWdlci5jb3B5KHRoaXMuY3VycmVudE1vbklkeCk7XHJcbiAgICB0aGlzLmN1cnJlbnRNb25JZHggPSBuZXdJZHg7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIG9uTW9uRGVsZXRlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBNb25zdGVyTWFuYWdlci5kZWxldGUodGhpcy5jdXJyZW50TW9uSWR4KTtcclxuICAgIHRoaXMuY3VycmVudE1vbklkeCA9IDA7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9ICBcclxuXHJcbiAgb25QbGF5Q2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHB1bHNlMSxcclxuICAgICAgcHVsc2UyLFxyXG4gICAgICBub2lzZSxcclxuICAgICAgZGF0YVxyXG4gICAgfSA9IHRoaXMuZ2VuZXJhdGVEYXRhKCk7XHJcblxyXG4gICAgdGhpcy53YXZlRGlhZ3JhbS5yZW5kZXIoW1xyXG4gICAgICBwdWxzZTEsXHJcbiAgICAgIHB1bHNlMixcclxuICAgICAgbm9pc2UsXHJcbiAgICAgIGRhdGFcclxuICAgIF0pO1xyXG5cclxuICAgIGNvbnN0IHJlc2FtcGxlZCA9IHV0aWwucmVzYW1wbGVQY20oXHJcbiAgICAgIHRoaXMuY3J5R2VuZXJhdG9yLnNvdXJjZVNhbXBsZVJhdGUsXHJcbiAgICAgIHRoaXMuY3J5R2VuZXJhdG9yLmF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICB0aGlzLnZvbHVtZVxyXG4gICAgKTtcclxuICAgIHRoaXMuY3J5R2VuZXJhdG9yLnBsYXkocmVzYW1wbGVkKTtcclxuICB9XHJcblxyXG4gIG9uUGl0Y2hDaGFuZ2UgPSAoZTogRXZlbnQpID0+IHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBjb25zdCBwaXRjaCA9IHBhcnNlSW50KGVsZW1lbnQudmFsdWUsIDEwKTtcclxuICAgIGlmKHRoaXMuY3VycmVudE1vbklkeCA+PSB0aGlzLm1vblJlZmVyZW5jZVJhbmdlKXtcclxuICAgICAgTW9uc3Rlck1hbmFnZXIudXBkYXRlUGl0Y2godGhpcy5jdXJyZW50TW9uSWR4LCBwaXRjaCk7ICAgICAgXHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFBpdGNoKHBpdGNoKTtcclxuICB9XHJcblxyXG4gIG9uTGVuZ3RoQ2hhbmdlID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgY29uc3QgbGVuZ3RoID0gcGFyc2VJbnQoZWxlbWVudC52YWx1ZSwgMTApO1xyXG4gICAgaWYodGhpcy5jdXJyZW50TW9uSWR4ID49IHRoaXMubW9uUmVmZXJlbmNlUmFuZ2Upe1xyXG4gICAgICBNb25zdGVyTWFuYWdlci51cGRhdGVMZW5ndGgodGhpcy5jdXJyZW50TW9uSWR4LCBsZW5ndGgpOyAgICAgIFxyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRMZW5ndGgobGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIG9uVm9sdW1lQ2hhbmdlID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgY29uc3Qgdm9sdW1lID0gcGFyc2VJbnQoZWxlbWVudC52YWx1ZSwgMTApO1xyXG4gICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XHJcbiAgfVxyXG5cclxuICBzZXRQaXRjaCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnBpdGNoSW5wdXRFbGVtZW50LnZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIHRoaXMucGl0Y2ggPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldExlbmd0aCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmxlbmd0aElucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLmxlbmd0aCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0UG9rZW1vbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHBva2Vtb24gPSBNb25zdGVyTWFuYWdlci5nZXQodGhpcy5jdXJyZW50TW9uSWR4KTtcclxuICAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uID0gcG9rZW1vbjtcclxuICAgIHRoaXMuY3VycmVudEJhc2VDcnlJZHggPSBwb2tlbW9uLmNyeTtcclxuICAgIHRoaXMucmVmcmVzaCgpOyAgXHJcbiAgICAvL3RoaXMuc2VsZWN0Q3J5VHlwZShjcnlUeXBlc1twb2tlbW9uLmNyeV0pO1xyXG4gICAgdGhpcy5zZXRQaXRjaChwb2tlbW9uLnBpdGNoKTtcclxuICAgIHRoaXMuc2V0TGVuZ3RoKHBva2Vtb24ubGVuZ3RoIC0gMHg4MCk7XHJcbiAgICAvL3RoaXMucmVmcmVzaCgpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0Q3J5VHlwZSA9IChjcnlUeXBlOiBDcnlUeXBlKSA9PiB7XHJcbiAgICBpZiAoY3J5VHlwZSA9PT0gdGhpcy5zZWxlY3RlZENyeVR5cGUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkQ3J5VHlwZUluZGV4ID0gdGhpcy5jcnlUeXBlcy5pbmRleE9mKGNyeVR5cGUpO1xyXG4gICAgdGhpcy5zZWxlY3RlZENyeVR5cGUgPSBjcnlUeXBlO1xyXG4gICAgLy90aGlzLnNlbGVjdGVkQ3J5VHlwZVNlbGVjdEVsZW1lbnQudmFsdWUgPSB0aGlzLnNlbGVjdGVkQ3J5VHlwZUluZGV4LnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVDb21tYW5kcygpIHtcclxuICAgLy8gaWYgKHRoaXMuc2VsZWN0ZWRDcnlUeXBlICE9PSB0aGlzLmN1c3RvbUNyeVR5cGUpIHtcclxuICAvLyAgICB0aGlzLnVwZGF0ZUNyeVR5cGVDb21tYW5kcyh0aGlzLnNlbGVjdGVkQ3J5VHlwZSk7XHJcbiAgLy8gIH0gZWxzZSB7XHJcbiAvLyAgICAgdGhpcy5wYXJzZUN1c3RvbUNyeVR5cGVDb21tYW5kcygpO1xyXG4gLy8gICB9XHJcbiAgIC8vIHRoaXMudXBkYXRlUmF3Q29tbWFuZHModGhpcy5zZWxlY3RlZENyeVR5cGUpO1xyXG4gICAgLy90aGlzLnBhcnNlQ3J5Q29tbWFuZHMoKTtcclxuICAgIHRoaXMudXBkYXRlQ3J5VHlwZUNvbW1hbmRzKEJhc2VDcnlNYW5hZ2VyLmdldCh0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4KSk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdGVkUG9rZW1vbkNoYW5nZSA9IChlOiBFdmVudCkgPT4ge1xyXG4gICAgdGhpcy5jdXJyZW50TW9uSWR4ID0gdGhpcy5zZWxlY3RlZFBva2Vtb25TZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXg7XHJcbiAgICB0aGlzLnNlbGVjdFBva2Vtb24oKTsgICBcclxuICAgIHRoaXMudXBkYXRlQ29tbWFuZHMoKTtcclxuICB9XHJcblxyXG4gIG9uQ3J5VHlwZUNoYW5nZSA9IChlOiBFdmVudCkgPT4ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIGNvbnN0IGNyeVR5cGVJbmRleCA9IHBhcnNlSW50KGVsZW1lbnQudmFsdWUsIDEwKTtcclxuICAgIHRoaXMuc2VsZWN0Q3J5VHlwZSh0aGlzLmNyeVR5cGVzW2NyeVR5cGVJbmRleF0pO1xyXG4gICAgdGhpcy51cGRhdGVDb21tYW5kcygpO1xyXG4gIH1cclxuXHJcbiAgb25Db21tYW5kc0lucHV0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wYXJzZUNyeUNvbW1hbmRzKCk7XHJcbiAgICAvL3RoaXMudXBkYXRlQ29tbWFuZHMoKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkID0gKCkgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBkYXRhXHJcbiAgICB9ID0gdGhpcy5nZW5lcmF0ZURhdGEoKTtcclxuXHJcbiAgICBjb25zdCByZXNhbXBsZWQgPSB1dGlsLnJlc2FtcGxlUGNtKFxyXG4gICAgICB0aGlzLmNyeUdlbmVyYXRvci5zb3VyY2VTYW1wbGVSYXRlLFxyXG4gICAgICB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSxcclxuICAgICAgZGF0YSxcclxuICAgICAgdGhpcy52b2x1bWVcclxuICAgICk7XHJcblxyXG4gICAgY29uc3Qgc2Vjb25kcyA9IHJlc2FtcGxlZC5sZW5ndGggLyB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZTtcclxuICAgIGNvbnN0IGJsb2IgPSB1dGlsLmNvbnZlcnRQY21Ub1dhdihzZWNvbmRzLCAxLCB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSwgMSwgcmVzYW1wbGVkKTtcclxuXHJcbiAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXMuc2VsZWN0ZWRDcnlUeXBlID09PSB0aGlzLmN1c3RvbUNyeVR5cGUgP1xyXG4gICAgICBcImN1c3RvbS1jcnlcIiA6XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uLm5hbWUudG9Mb3dlckNhc2UoKSArIFwiLWNyeVwiO1xyXG4gICAgc2F2ZUFzKGJsb2IsIGAke2ZpbGVuYW1lfS53YXZgKTtcclxuICB9XHJcblxyXG4gIHBhcnNlQ3J5Q29tbWFuZHMoKSB7XHJcbiAgICBjb25zdCBwdWxzZTFDb21tYW5kcyA9IHRoaXMucHVsc2UxQ29tbWFuZHNFbGVtZW50LnZhbHVlLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgY29uc3QgcHVsc2UyQ29tbWFuZHMgPSB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC52YWx1ZS5zcGxpdChcIlxcblwiKTtcclxuICAgIGNvbnN0IG5vaXNlQ29tbWFuZHMgPSB0aGlzLm5vaXNlQ29tbWFuZHNFbGVtZW50LnZhbHVlLnNwbGl0KFwiXFxuXCIpO1xyXG5cclxuICAgIGNvbnN0IG5ld0NvbW1hbmRzID0ge1xyXG4gICAgICBwdWxzZTE6IFtdLFxyXG4gICAgICBwdWxzZTI6IFtdLFxyXG4gICAgICBub2lzZTogW11cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcHVsc2UxID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHVsc2UxQ29tbWFuZHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwdWxzZTFDb21tYW5kc1tpbmRleF0uc3BsaXQoXCIgXCIpO1xyXG4gICAgICBpZiAoY29tbWFuZFswXSA9PT0gXCJkdXR5XCIpIHtcclxuICAgICAgICBwdWxzZTEucHVzaCh7IFwiZHV0eVwiOiBwYXJzZUludChjb21tYW5kWzFdKSB9KTtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kWzBdID09PSBcIm5vdGVcIikge1xyXG4gICAgICAgIHB1bHNlMS5wdXNoKHsgXCJub3RlXCI6IFtwYXJzZUludChjb21tYW5kWzFdKSwgcGFyc2VJbnQoY29tbWFuZFsyXSksIHBhcnNlSW50KGNvbW1hbmRbM10pLCBwYXJzZUludChjb21tYW5kWzRdKV0gfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5ld0NvbW1hbmRzLnB1bHNlMSA9IHB1bHNlMTtcclxuXHJcbiAgICBjb25zdCBwdWxzZTIgPSBbXTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwdWxzZTJDb21tYW5kcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgY29tbWFuZCA9IHB1bHNlMkNvbW1hbmRzW2luZGV4XS5zcGxpdChcIiBcIik7XHJcbiAgICAgIGlmIChjb21tYW5kWzBdID09PSBcImR1dHlcIikge1xyXG4gICAgICAgIHB1bHNlMi5wdXNoKHsgXCJkdXR5XCI6IHBhcnNlSW50KGNvbW1hbmRbMV0pIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGNvbW1hbmRbMF0gPT09IFwibm90ZVwiKSB7XHJcbiAgICAgICAgcHVsc2UyLnB1c2goeyBcIm5vdGVcIjogW3BhcnNlSW50KGNvbW1hbmRbMV0pLCBwYXJzZUludChjb21tYW5kWzJdKSwgcGFyc2VJbnQoY29tbWFuZFszXSksIHBhcnNlSW50KGNvbW1hbmRbNF0pXSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbmV3Q29tbWFuZHMucHVsc2UyID0gcHVsc2UyO1xyXG5cclxuICAgIGNvbnN0IG5vaXNlID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbm9pc2VDb21tYW5kcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgY29tbWFuZCA9IG5vaXNlQ29tbWFuZHNbaW5kZXhdLnNwbGl0KFwiIFwiKTtcclxuICAgICAgaWYgKGNvbW1hbmRbMF0gPT09IFwibm90ZVwiKSB7XHJcbiAgICAgICAgbm9pc2UucHVzaCh7IFwibm90ZVwiOiBbcGFyc2VJbnQoY29tbWFuZFsxXSksIHBhcnNlSW50KGNvbW1hbmRbMl0pLCBwYXJzZUludChjb21tYW5kWzNdKSwgcGFyc2VJbnQoY29tbWFuZFs0XSldIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXdDb21tYW5kcy5ub2lzZSA9IG5vaXNlO1xyXG5cclxuICAgIEJhc2VDcnlNYW5hZ2VyLnVwZGF0ZUNoYW5uZWxzKHRoaXMuY3VycmVudEJhc2VDcnlJZHgsIG5ld0NvbW1hbmRzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUNyeVR5cGVDb21tYW5kcyhjcnlJbmZvKSB7XHJcbiAgICBjb25zdCBjcnkgPSBjcnlJbmZvLmNoYW5uZWxzO1xyXG4gICAgdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQuZGlzYWJsZWQgPSBjcnlJbmZvLmlzUmVmZXJlbmNlO1xyXG4gICAgdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNyeS5wdWxzZTEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChjcnkucHVsc2UxW2luZGV4XS5kdXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnB1bHNlMUNvbW1hbmRzRWxlbWVudC52YWx1ZSA9IHRoaXMucHVsc2UxQ29tbWFuZHNFbGVtZW50LnZhbHVlICtcclxuICAgICAgICAgIFwiZHV0eSAweFwiICsgY3J5LnB1bHNlMVtpbmRleF0uZHV0eS50b1N0cmluZygweDEwKSArIFwiXFxuXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoY3J5LnB1bHNlMVtpbmRleF0ubm90ZSkge1xyXG4gICAgICAgIHRoaXMucHVsc2UxQ29tbWFuZHNFbGVtZW50LnZhbHVlID0gdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQudmFsdWUgK1xyXG4gICAgICAgICAgXCJub3RlIFwiICtcclxuICAgICAgICAgIChjcnkucHVsc2UxW2luZGV4XS5ub3RlWzBdKSArIFwiIFwiICtcclxuICAgICAgICAgIGNyeS5wdWxzZTFbaW5kZXhdLm5vdGVbMV0gKyBcIiBcIiArXHJcbiAgICAgICAgICBjcnkucHVsc2UxW2luZGV4XS5ub3RlWzJdICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5LnB1bHNlMVtpbmRleF0ubm90ZVszXSArIFwiXFxuXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC5kaXNhYmxlZCA9IGNyeUluZm8uaXNSZWZlcmVuY2U7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY3J5LnB1bHNlMi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKGNyeS5wdWxzZTJbaW5kZXhdLmR1dHkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMucHVsc2UyQ29tbWFuZHNFbGVtZW50LnZhbHVlID0gdGhpcy5wdWxzZTJDb21tYW5kc0VsZW1lbnQudmFsdWUgK1xyXG4gICAgICAgICAgXCJkdXR5IDB4XCIgKyBjcnkucHVsc2UyW2luZGV4XS5kdXR5LnRvU3RyaW5nKDB4MTApICsgXCJcXG5cIjtcclxuICAgICAgfSBlbHNlIGlmIChjcnkucHVsc2UyW2luZGV4XS5ub3RlKSB7XHJcbiAgICAgICAgdGhpcy5wdWxzZTJDb21tYW5kc0VsZW1lbnQudmFsdWUgPSB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC52YWx1ZSArXHJcbiAgICAgICAgICBcIm5vdGUgXCIgK1xyXG4gICAgICAgICAgKGNyeS5wdWxzZTJbaW5kZXhdLm5vdGVbMF0pICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5LnB1bHNlMltpbmRleF0ubm90ZVsxXSArIFwiIFwiICtcclxuICAgICAgICAgIGNyeS5wdWxzZTJbaW5kZXhdLm5vdGVbMl0gKyBcIiBcIiArXHJcbiAgICAgICAgICBjcnkucHVsc2UyW2luZGV4XS5ub3RlWzNdICsgXCJcXG5cIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubm9pc2VDb21tYW5kc0VsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgdGhpcy5ub2lzZUNvbW1hbmRzRWxlbWVudC5kaXNhYmxlZCA9IGNyeUluZm8uaXNSZWZlcmVuY2U7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY3J5Lm5vaXNlLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoY3J5Lm5vaXNlW2luZGV4XS5ub3RlKSB7XHJcbiAgICAgICAgdGhpcy5ub2lzZUNvbW1hbmRzRWxlbWVudC52YWx1ZSA9IHRoaXMubm9pc2VDb21tYW5kc0VsZW1lbnQudmFsdWUgK1xyXG4gICAgICAgICAgXCJub3RlIFwiICtcclxuICAgICAgICAgIChjcnkubm9pc2VbaW5kZXhdLm5vdGVbMF0pICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5Lm5vaXNlW2luZGV4XS5ub3RlWzFdICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5Lm5vaXNlW2luZGV4XS5ub3RlWzJdICsgXCIgMHhcIiArXHJcbiAgICAgICAgICBjcnkubm9pc2VbaW5kZXhdLm5vdGVbM10udG9TdHJpbmcoMHgxMCkgKyBcIlxcblwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuIC8qIHVwZGF0ZVJhd0NvbW1hbmRzKGNyeVR5cGU6IENyeVR5cGUpIHtcclxuICAgIGxldCBjb250ZW50ID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBwdWxzZTEgPSBjcnlUeXBlLnB1bHNlMTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwdWxzZTEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwdWxzZTFbaW5kZXhdO1xyXG4gICAgICBpZiAoY29tbWFuZC5kdXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBkdXR5ID0gY29tbWFuZC5kdXR5O1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCJGQyBcIiArIChkdXR5IDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBkdXR5LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiMlwiICsgKGNvbW1hbmQubm90ZVswXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gKGNvbW1hbmQubm90ZVsxXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIChjb21tYW5kLm5vdGVbMl0gJiAweEYpLnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY29tbWFuZC5ub3RlWzNdICYgMHhGRiwgaGVpZ2h0ID0gKGNvbW1hbmQubm90ZVszXSA+PiA4KSAmIDB4RkY7XHJcbiAgICAgICAgY29udGVudCArPSAobGVuZ3RoIDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBsZW5ndGgudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiICsgKGhlaWdodCA8IDB4MTAgPyBcIjBcIiA6IFwiXCIpICsgaGVpZ2h0LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnQgKz0gXCJGRiBcIjtcclxuXHJcbiAgICBjb25zdCBwdWxzZTIgPSBjcnlUeXBlLnB1bHNlMjtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwdWxzZTIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwdWxzZTJbaW5kZXhdO1xyXG4gICAgICBpZiAoY29tbWFuZC5kdXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBkdXR5ID0gY29tbWFuZC5kdXR5O1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCJGQyBcIiArIChkdXR5IDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBkdXR5LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiMlwiICsgKGNvbW1hbmQubm90ZVswXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gKGNvbW1hbmQubm90ZVsxXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIChjb21tYW5kLm5vdGVbMl0gJiAweEYpLnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY29tbWFuZC5ub3RlWzNdICYgMHhGRiwgaGVpZ2h0ID0gKGNvbW1hbmQubm90ZVszXSA+PiA4KSAmIDB4RkY7XHJcbiAgICAgICAgY29udGVudCArPSAobGVuZ3RoIDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBsZW5ndGgudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiICsgKGhlaWdodCA8IDB4MTAgPyBcIjBcIiA6IFwiXCIpICsgaGVpZ2h0LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnQgKz0gXCJGRiBcIjtcclxuXHJcbiAgICBjb25zdCBub2lzZSA9IGNyeVR5cGUubm9pc2U7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbm9pc2UubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBub2lzZVtpbmRleF07XHJcbiAgICAgIGlmIChjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiMlwiICsgKGNvbW1hbmQubm90ZVswXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gKGNvbW1hbmQubm90ZVsxXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIChjb21tYW5kLm5vdGVbMl0gJiAweEYpLnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY29tbWFuZC5ub3RlWzNdICYgMHhGRjtcclxuICAgICAgICBjb250ZW50ICs9IChsZW5ndGggPCAweDEwID8gXCIwXCIgOiBcIlwiKSArIGxlbmd0aC50b1N0cmluZygweDEwKS50b1VwcGVyQ2FzZSgpICsgXCIgXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50ICs9IFwiRkYgXCI7XHJcblxyXG4gICAgdGhpcy5yYXdDb21tYW5kc0VsZW1lbnQudmFsdWUgPSBjb250ZW50O1xyXG4gIH0qL1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgVWkoKTsiLCJpbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlU2VsZWN0T3B0aW9uID0gKHRleHQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgb3B0aW9uLnZhbHVlID0gdmFsdWU7XHJcbiAgb3B0aW9uLnRleHRDb250ZW50ID0gdGV4dDtcclxuXHJcbiAgcmV0dXJuIG9wdGlvbjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb252ZXJ0UGNtVG9XYXYgPSAoXHJcbiAgZHVyYXRpb25JblNlY29uZHM6IG51bWJlcixcclxuICBudW1iZXJPZkNoYW5uZWxzOiBudW1iZXIsXHJcbiAgc2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gIGJ5dGVzUGVyU2FtcGxlOiBudW1iZXIsXHJcbiAgc2FtcGxlczogbnVtYmVyW11cclxuKSA9PiB7XHJcbiAgY29uc3QgYml0c1BlclNhbXBsZSA9IGJ5dGVzUGVyU2FtcGxlICogODtcclxuICBjb25zdCBzYW1wbGVTaXplID0gbnVtYmVyT2ZDaGFubmVscyAqIGJ5dGVzUGVyU2FtcGxlO1xyXG4gIGNvbnN0IGJ5dGVzUGVyU2Vjb25kID0gc2FtcGxlU2l6ZSAqIHNhbXBsZVJhdGU7XHJcbiAgY29uc3QgZGF0YVNpemUgPSBkdXJhdGlvbkluU2Vjb25kcyAqIGJ5dGVzUGVyU2Vjb25kO1xyXG4gIGNvbnN0IGZ1bGxTaXplID0gNDQgKyBkYXRhU2l6ZTtcclxuXHJcbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKGZ1bGxTaXplKTtcclxuICBsZXQgb2Zmc2V0ID0gMDtcclxuXHJcbiAgYnVmZmVyLndyaXRlKFwiUklGRlwiLCBvZmZzZXQsIFwidXRmOFwiKTtcclxuICBvZmZzZXQgKz0gNDtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDMyTEUoZnVsbFNpemUsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZShcIldBVkVcIiwgb2Zmc2V0LCBcInV0ZjhcIik7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZShcImZtdCBcIiwgb2Zmc2V0LCBcInV0ZjhcIik7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQzMkxFKDE2LCBvZmZzZXQpOyAvLyByZW1haW5pbmcgaGVhZGVyIHNpemVcclxuICBvZmZzZXQgKz0gNDtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDE2TEUoMSwgb2Zmc2V0KTsgLy8gUENNIHR5cGVcclxuICBvZmZzZXQgKz0gMjtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDE2TEUobnVtYmVyT2ZDaGFubmVscywgb2Zmc2V0KTtcclxuICBvZmZzZXQgKz0gMjtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDMyTEUoc2FtcGxlUmF0ZSwgb2Zmc2V0KTtcclxuICBvZmZzZXQgKz0gNDtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDMyTEUoYnl0ZXNQZXJTZWNvbmQsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQxNkxFKHNhbXBsZVNpemUsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDI7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQxNkxFKGJpdHNQZXJTYW1wbGUsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDI7XHJcblxyXG4gIGJ1ZmZlci53cml0ZShcImRhdGFcIiwgb2Zmc2V0LCBcInV0ZjhcIik7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQzMkxFKGRhdGFTaXplLCBvZmZzZXQpO1xyXG4gIG9mZnNldCArPSA0O1xyXG5cclxuICBmb3IgKGxldCBzZWNvbmRJbmRleCA9IDA7IHNlY29uZEluZGV4IDwgZHVyYXRpb25JblNlY29uZHM7IHNlY29uZEluZGV4KyspIHtcclxuICAgIGZvciAobGV0IGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleCA9IDA7IGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleCA8IHNhbXBsZVJhdGU7IGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleCArPSBieXRlc1BlclNhbXBsZSkge1xyXG4gICAgICBjb25zdCBzYW1wbGVJbmRleCA9IHNlY29uZEluZGV4ICogc2FtcGxlUmF0ZSArIGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleDtcclxuXHJcbiAgICAgIGxldCB2YWx1ZSA9IHNhbXBsZXNbc2FtcGxlSW5kZXhdO1xyXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSBicmVhaztcclxuXHJcbiAgICAgIGNvbnN0IHNjYWxlZFZhbHVlID0gKHZhbHVlICogMHhGRikgKyAoMHhGRiAvIDIpO1xyXG4gICAgICB2YWx1ZSA9IHNjYWxlZFZhbHVlICYgMHhGRjtcclxuXHJcbiAgICAgIGJ1ZmZlci53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQpO1xyXG4gICAgICBvZmZzZXQgKz0gYnl0ZXNQZXJTYW1wbGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogXCJhdWRpby93YXZcIiB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNhbXBsZVBjbSA9IChcclxuICBmcm9tU2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gIHRvU2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gIGRhdGE6IG51bWJlcltdLFxyXG4gIHZvbHVtZTogbnVtYmVyID0gMTAwXHJcbikgPT4ge1xyXG4gIGNvbnN0IHJlc2FtcGxlZDogbnVtYmVyW10gPSBbXTtcclxuICBjb25zdCByZXNhbXBsZVJhdGVSYXRpbyA9IGZyb21TYW1wbGVSYXRlIC8gdG9TYW1wbGVSYXRlO1xyXG4gIGNvbnN0IHJlc2FtcGxlZExlbmd0aCA9IE1hdGguY2VpbChkYXRhLmxlbmd0aCAvIHJlc2FtcGxlUmF0ZVJhdGlvKTtcclxuICBjb25zdCB2b2x1bWVGYWN0b3IgPSB2b2x1bWUgLyAweDEwMDtcclxuXHJcbiAgZm9yIChsZXQgcmVzYW1wbGVkSW5kZXggPSAwOyByZXNhbXBsZWRJbmRleCA8IHJlc2FtcGxlZExlbmd0aDsgcmVzYW1wbGVkSW5kZXgrKykge1xyXG4gICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKHJlc2FtcGxlZEluZGV4ICogcmVzYW1wbGVSYXRlUmF0aW8pO1xyXG4gICAgY29uc3QgZnJhY3Rpb24gPSByZXNhbXBsZWRJbmRleCAqIHJlc2FtcGxlUmF0ZVJhdGlvIC0gaW5kZXg7XHJcbiAgICByZXNhbXBsZWRbcmVzYW1wbGVkSW5kZXhdID0gKFxyXG4gICAgICAoMSAtIGZyYWN0aW9uKSAqIGRhdGFbaW5kZXhdICtcclxuICAgICAgZnJhY3Rpb24gKiBkYXRhW2luZGV4ICsgMV1cclxuICAgICkgKiB2b2x1bWVGYWN0b3I7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzYW1wbGVkO1xyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB1aSBmcm9tIFwiLi91aVwiO1xyXG5pbXBvcnQgeyBCYXNlQ3J5TWFuYWdlciB9IGZyb20gXCIuL2RhdGEvQmFzZUNyeU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3Rlck1hbmFnZXIgfSBmcm9tIFwiLi9kYXRhL01vbnN0ZXJNYW5hZ2VyXCI7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gIEJhc2VDcnlNYW5hZ2VyLmluaXQoKTtcclxuICBNb25zdGVyTWFuYWdlci5pbml0KCk7XHJcbiAgdWkuaW5pdCgpO1xyXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=