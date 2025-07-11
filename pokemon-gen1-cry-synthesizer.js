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

/***/ "./src/data/pokemonList.ts":
/*!*********************************!*\
  !*** ./src/data/pokemonList.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    { name: "Bulbasaur", cry: 0x0F, pitch: 0x80, length: 0x1 },
    { name: "Ivysaur", cry: 0x0F, pitch: 0x20, length: 0x80 },
    { name: "Venusaur", cry: 0x0F, pitch: 0x0, length: 0xC0 },
    { name: "Charmander", cry: 0x4, pitch: 0x60, length: 0x40 },
    { name: "Charmeleon", cry: 0x4, pitch: 0x20, length: 0x40 },
    { name: "Charizard", cry: 0x4, pitch: 0x0, length: 0x80 },
    { name: "Squirtle", cry: 0x1D, pitch: 0x60, length: 0x40 },
    { name: "Wartortle", cry: 0x1D, pitch: 0x20, length: 0x40 },
    { name: "Blastoise", cry: 0x13, pitch: 0x0, length: 0x80 },
    { name: "Caterpie", cry: 0x16, pitch: 0x80, length: 0x20 },
    { name: "Metapod", cry: 0x1C, pitch: 0xCC, length: 0x1 },
    { name: "Butterfree", cry: 0x16, pitch: 0x77, length: 0x40 },
    { name: "Weedle", cry: 0x15, pitch: 0xEE, length: 0x1 },
    { name: "Kakuna", cry: 0x13, pitch: 0xFF, length: 0x1 },
    { name: "Beedrill", cry: 0x13, pitch: 0x60, length: 0x80 },
    { name: "Pidgey", cry: 0x0E, pitch: 0xDF, length: 0x4 },
    { name: "Pidgeotto", cry: 0x14, pitch: 0x28, length: 0xC0 },
    { name: "Pidgeot", cry: 0x14, pitch: 0x11, length: 0xFF },
    { name: "Rattata", cry: 0x22, pitch: 0x0, length: 0x80 },
    { name: "Raticate", cry: 0x22, pitch: 0x20, length: 0xFF },
    { name: "Spearow", cry: 0x10, pitch: 0x0, length: 0x80 },
    { name: "Fearow", cry: 0x18, pitch: 0x40, length: 0xA0 },
    { name: "Ekans", cry: 0x17, pitch: 0x12, length: 0x40 },
    { name: "Arbok", cry: 0x17, pitch: 0xE0, length: 0x10 },
    { name: "Pikachu", cry: 0x0F, pitch: 0xEE, length: 0x1 },
    { name: "Raichu", cry: 0x9, pitch: 0xEE, length: 0x8 },
    { name: "Sandshrew", cry: 0x0, pitch: 0x20, length: 0x40 },
    { name: "Sandslash", cry: 0x0, pitch: 0xFF, length: 0xFF },
    { name: "Nidoran&female;", cry: 0x1, pitch: 0x0, length: 0x80 },
    { name: "Nidorina", cry: 0x1, pitch: 0x2C, length: 0xE0 },
    { name: "Nidoqueen", cry: 0x0A, pitch: 0x0, length: 0x80 },
    { name: "Nidoran&male;", cry: 0x0, pitch: 0x0, length: 0x80 },
    { name: "Nidorino", cry: 0x0, pitch: 0x2C, length: 0xC0 },
    { name: "Nidoking", cry: 0x9, pitch: 0x0, length: 0x80 },
    { name: "Clefairy", cry: 0x19, pitch: 0xCC, length: 0x1 },
    { name: "Clefable", cry: 0x19, pitch: 0xAA, length: 0x20 },
    { name: "Vulpix", cry: 0x24, pitch: 0x4F, length: 0x10 },
    { name: "Ninetales", cry: 0x24, pitch: 0x88, length: 0x60 },
    { name: "Jigglypuff", cry: 0x0E, pitch: 0xFF, length: 0x35 },
    { name: "Wigglytuff", cry: 0x0E, pitch: 0x68, length: 0x60 },
    { name: "Zubat", cry: 0x1D, pitch: 0xE0, length: 0x80 },
    { name: "Golbat", cry: 0x1D, pitch: 0xFA, length: 0x80 },
    { name: "Oddish", cry: 0x8, pitch: 0xDD, length: 0x1 },
    { name: "Gloom", cry: 0x8, pitch: 0xAA, length: 0x40 },
    { name: "Vileplume", cry: 0x23, pitch: 0x22, length: 0xFF },
    { name: "Paras", cry: 0x1E, pitch: 0x20, length: 0xE0 },
    { name: "Parasect", cry: 0x1E, pitch: 0x42, length: 0xFF },
    { name: "Venonat", cry: 0x1A, pitch: 0x44, length: 0x40 },
    { name: "Venomoth", cry: 0x1A, pitch: 0x29, length: 0x80 },
    { name: "Diglett", cry: 0x0B, pitch: 0xAA, length: 0x1 },
    { name: "Dugtrio", cry: 0x0B, pitch: 0x2A, length: 0x10 },
    { name: "Meowth", cry: 0x19, pitch: 0x77, length: 0x10 },
    { name: "Persian", cry: 0x19, pitch: 0x99, length: 0xFF },
    { name: "Psyduck", cry: 0x21, pitch: 0x20, length: 0x60 },
    { name: "Golduck", cry: 0x21, pitch: 0xFF, length: 0x40 },
    { name: "Mankey", cry: 0x0A, pitch: 0xDD, length: 0x60 },
    { name: "Primeape", cry: 0x0A, pitch: 0xAF, length: 0x40 },
    { name: "Growlithe", cry: 0x1F, pitch: 0x20, length: 0x40 },
    { name: "Arcanine", cry: 0x15, pitch: 0x0, length: 0x80 },
    { name: "Poliwag", cry: 0x0E, pitch: 0xFF, length: 0xFF },
    { name: "Poliwhirl", cry: 0x0E, pitch: 0x77, length: 0x60 },
    { name: "Poliwrath", cry: 0x0E, pitch: 0x0, length: 0xFF },
    { name: "Abra", cry: 0x1C, pitch: 0xC0, length: 0x1 },
    { name: "Kadabra", cry: 0x1C, pitch: 0xA8, length: 0xC0 },
    { name: "Alakazam", cry: 0x1C, pitch: 0x98, length: 0xFF },
    { name: "Machop", cry: 0x1F, pitch: 0xEE, length: 0x1 },
    { name: "Machoke", cry: 0x1F, pitch: 0x48, length: 0x60 },
    { name: "Machamp", cry: 0x1F, pitch: 0x8, length: 0xC0 },
    { name: "Bellsprout", cry: 0x21, pitch: 0x55, length: 0x1 },
    { name: "Weepinbell", cry: 0x25, pitch: 0x44, length: 0x20 },
    { name: "Victreebel", cry: 0x25, pitch: 0x66, length: 0xCC },
    { name: "Tentacool", cry: 0x1A, pitch: 0x0, length: 0x80 },
    { name: "Tentacruel", cry: 0x1A, pitch: 0xEE, length: 0xFF },
    { name: "Geodude", cry: 0x24, pitch: 0xF0, length: 0x10 },
    { name: "Graveler", cry: 0x24, pitch: 0x0, length: 0x80 },
    { name: "Golem", cry: 0x12, pitch: 0xE0, length: 0x40 },
    { name: "Ponyta", cry: 0x25, pitch: 0x0, length: 0x80 },
    { name: "Rapidash", cry: 0x25, pitch: 0x20, length: 0xC0 },
    { name: "Slowpoke", cry: 0x2, pitch: 0x0, length: 0x80 },
    { name: "Slowbro", cry: 0x1F, pitch: 0x0, length: 0x80 },
    { name: "Magnemite", cry: 0x1C, pitch: 0x80, length: 0x60 },
    { name: "Magneton", cry: 0x1C, pitch: 0x20, length: 0xC0 },
    { name: "Farfetch'd", cry: 0x10, pitch: 0xDD, length: 0x1 },
    { name: "Doduo", cry: 0x0B, pitch: 0xBB, length: 0x1 },
    { name: "Dodrio", cry: 0x0B, pitch: 0x99, length: 0x20 },
    { name: "Seel", cry: 0x0C, pitch: 0x88, length: 0xC0 },
    { name: "Dewgong", cry: 0x0C, pitch: 0x23, length: 0xFF },
    { name: "Grimer", cry: 0x5, pitch: 0x0, length: 0x80 },
    { name: "Muk", cry: 0x7, pitch: 0xEF, length: 0xFF },
    { name: "Shellder", cry: 0x18, pitch: 0x0, length: 0x80 },
    { name: "Cloyster", cry: 0x18, pitch: 0x6F, length: 0xE0 },
    { name: "Gastly", cry: 0x1C, pitch: 0x0, length: 0x80 },
    { name: "Haunter", cry: 0x1C, pitch: 0x30, length: 0x40 },
    { name: "Gengar", cry: 0x7, pitch: 0x0, length: 0xFF },
    { name: "Onix", cry: 0x17, pitch: 0xFF, length: 0xC0 },
    { name: "Drowzee", cry: 0x0D, pitch: 0x88, length: 0x20 },
    { name: "Hypno", cry: 0x0D, pitch: 0xEE, length: 0x40 },
    { name: "Krabby", cry: 0x20, pitch: 0x20, length: 0xE0 },
    { name: "Kingler", cry: 0x20, pitch: 0xEE, length: 0xE0 },
    { name: "Voltorb", cry: 0x6, pitch: 0xED, length: 0x80 },
    { name: "Electrode", cry: 0x6, pitch: 0xA8, length: 0x90 },
    { name: "Exeggcute", cry: 0x0B, pitch: 0x0, length: 0x80 },
    { name: "Exeggutor", cry: 0x0D, pitch: 0x0, length: 0x80 },
    { name: "Cubone", cry: 0x19, pitch: 0x0, length: 0x80 },
    { name: "Marowak", cry: 0x8, pitch: 0x4F, length: 0x60 },
    { name: "Hitmonlee", cry: 0x12, pitch: 0x80, length: 0xC0 },
    { name: "Hitmonchan", cry: 0x0C, pitch: 0xEE, length: 0xC0 },
    { name: "Lickitung", cry: 0x0C, pitch: 0x0, length: 0x80 },
    { name: "Koffing", cry: 0x12, pitch: 0xE6, length: 0xDD },
    { name: "Weezing", cry: 0x12, pitch: 0xFF, length: 0xFF },
    { name: "Rhyhorn", cry: 0x4, pitch: 0x0, length: 0x80 },
    { name: "Rhydon", cry: 0x11, pitch: 0x0, length: 0x80 },
    { name: "Chansey", cry: 0x14, pitch: 0x0A, length: 0xC0 },
    { name: "Tangela", cry: 0x12, pitch: 0x0, length: 0x80 },
    { name: "Kangaskhan", cry: 0x3, pitch: 0x0, length: 0x80 },
    { name: "Horsea", cry: 0x19, pitch: 0x99, length: 0x10 },
    { name: "Seadra", cry: 0x19, pitch: 0x3C, length: 0x1 },
    { name: "Goldeen", cry: 0x16, pitch: 0x80, length: 0x40 },
    { name: "Seaking", cry: 0x16, pitch: 0x10, length: 0xFF },
    { name: "Staryu", cry: 0x1E, pitch: 0x2, length: 0x20 },
    { name: "Starmie", cry: 0x1E, pitch: 0x0, length: 0x80 },
    { name: "Mr.Mime", cry: 0x20, pitch: 0x8, length: 0x40 },
    { name: "Scyther", cry: 0x16, pitch: 0x0, length: 0x80 },
    { name: "Jynx", cry: 0x0D, pitch: 0xFF, length: 0xFF },
    { name: "Electabuzz", cry: 0x6, pitch: 0x8F, length: 0xFF },
    { name: "Magmar", cry: 0x4, pitch: 0xFF, length: 0x30 },
    { name: "Pinsir", cry: 0x14, pitch: 0x0, length: 0x80 },
    { name: "Tauros", cry: 0x1D, pitch: 0x11, length: 0x40 },
    { name: "Magikarp", cry: 0x17, pitch: 0x80, length: 0x0 },
    { name: "Gyarados", cry: 0x17, pitch: 0x0, length: 0x80 },
    { name: "Lapras", cry: 0x1B, pitch: 0x0, length: 0x80 },
    { name: "Ditto", cry: 0x0E, pitch: 0xFF, length: 0xFF },
    { name: "Eevee", cry: 0x1A, pitch: 0x88, length: 0x60 },
    { name: "Vaporeon", cry: 0x1A, pitch: 0xAA, length: 0xFF },
    { name: "Jolteon", cry: 0x1A, pitch: 0x3D, length: 0x80 },
    { name: "Flareon", cry: 0x1A, pitch: 0x10, length: 0x20 },
    { name: "Porygon", cry: 0x25, pitch: 0xAA, length: 0xFF },
    { name: "Omanyte", cry: 0x1F, pitch: 0xF0, length: 0x1 },
    { name: "Omastar", cry: 0x1F, pitch: 0xFF, length: 0x40 },
    { name: "Kabuto", cry: 0x16, pitch: 0xBB, length: 0x40 },
    { name: "Kabutops", cry: 0x18, pitch: 0xEE, length: 0x1 },
    { name: "Aerodactyl", cry: 0x23, pitch: 0x20, length: 0xF0 },
    { name: "Snorlax", cry: 0x5, pitch: 0x55, length: 0x1 },
    { name: "Articuno", cry: 0x9, pitch: 0x80, length: 0x40 },
    { name: "Zapdos", cry: 0x18, pitch: 0xFF, length: 0x80 },
    { name: "Moltres", cry: 0x9, pitch: 0xF8, length: 0x40 },
    { name: "Dratini", cry: 0x0F, pitch: 0x60, length: 0x40 },
    { name: "Dragonair", cry: 0x0F, pitch: 0x40, length: 0x80 },
    { name: "Dragonite", cry: 0x0F, pitch: 0x3C, length: 0xC0 },
    { name: "Mewtwo", cry: 0x1E, pitch: 0x99, length: 0xFF },
    { name: "Mew", cry: 0x1E, pitch: 0xEE, length: 0xFF }
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
/* harmony import */ var _data_pokemonList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/pokemonList */ "./src/data/pokemonList.ts");
/* harmony import */ var _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../data/BaseCryManager */ "./src/data/BaseCryManager.ts");







var Ui = /** @class */ (function () {
    function Ui() {
        var _this = this;
        this.volume = 50;
        this.customCryType = {
            name: "Custom",
            noise: [],
            pulse1: [],
            pulse2: []
        };
        this.cryTypes = [this.customCryType].concat(_data_cryTypes__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.cryGenerator = new _CryGenerator__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this.onBaseCryNewClick = function () {
            var newIdx = _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_6__.BaseCryManager.addNew();
            _this.currentBaseCryIdx = newIdx;
            _this.refresh();
        };
        this.onBaseCryCopyClick = function () {
            var newIdx = _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_6__.BaseCryManager.copy(_this.baseCrySelectorElement.selectedIndex);
            _this.currentBaseCryIdx = newIdx;
            _this.refresh();
        };
        this.onBaseCryDeleteClick = function () {
            _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_6__.BaseCryManager.delete(_this.baseCrySelectorElement.selectedIndex);
            _this.currentBaseCryIdx = 0;
            _this.refresh();
        };
        this.onSelectedBaseCryChange = function () {
            _this.currentBaseCryIdx = _this.baseCrySelectorElement.selectedIndex;
            _this.refresh();
        };
        this.onBaseCryNameChange = function () {
            _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_6__.BaseCryManager.updateName(_this.currentBaseCryIdx, _this.baseCryNameInput.value);
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
            _this.setPitch(pitch);
        };
        this.onLengthChange = function (e) {
            var element = e.currentTarget;
            var length = parseInt(element.value, 10);
            _this.setLength(length);
        };
        this.onVolumeChange = function (e) {
            var element = e.currentTarget;
            var volume = parseInt(element.value, 10);
            _this.volume = volume;
        };
        this.selectPokemon = function (pokemon) {
            _this.selectedPokemon = pokemon;
            _this.selectCryType(_data_cryTypes__WEBPACK_IMPORTED_MODULE_2__["default"][pokemon.cry]);
            _this.setPitch(pokemon.pitch);
            _this.setLength(pokemon.length - 0x80);
        };
        this.selectCryType = function (cryType) {
            if (cryType === _this.selectedCryType)
                return;
            _this.selectedCryTypeIndex = _this.cryTypes.indexOf(cryType);
            _this.selectedCryType = cryType;
            //this.selectedCryTypeSelectElement.value = this.selectedCryTypeIndex.toString();
        };
        this.onSelectedPokemonChange = function (e) {
            var element = e.currentTarget;
            var pokemon = _data_pokemonList__WEBPACK_IMPORTED_MODULE_5__["default"][element.value];
            _this.selectPokemon(pokemon);
            _this.updateCommands();
        };
        this.onCryTypeChange = function (e) {
            var element = e.currentTarget;
            var cryTypeIndex = parseInt(element.value, 10);
            _this.selectCryType(_this.cryTypes[cryTypeIndex]);
            _this.updateCommands();
        };
        this.onCommandsInput = function () {
            _this.updateCommands();
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
        this.createElements();
    };
    Ui.prototype.refresh = function () {
        this.createElements();
    };
    Ui.prototype.createElements = function () {
        var index = 0;
        this.selectedPokemonSelectElement.innerHTML = "";
        for (var _i = 0, pokemonList_1 = _data_pokemonList__WEBPACK_IMPORTED_MODULE_5__["default"]; _i < pokemonList_1.length; _i++) {
            var pokemon = pokemonList_1[_i];
            var option = _util__WEBPACK_IMPORTED_MODULE_0__.createSelectOption("#".concat(index + 1, ": ").concat(pokemon.name), index.toString());
            this.selectedPokemonSelectElement.appendChild(option);
            index++;
        }
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
        for (var _a = 0, _b = _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_6__.BaseCryManager.data; _a < _b.length; _a++) {
            var baseCry = _b[_a];
            var option = _util__WEBPACK_IMPORTED_MODULE_0__.createSelectOption("#".concat(index + 1, ": ").concat(baseCry.name), index.toString());
            this.baseCrySelectorElement.appendChild(option);
            index++;
        }
        this.baseCryNameInput.value = _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_6__.BaseCryManager.get(this.currentBaseCryIdx).name;
        this.baseCrySelectorElement.selectedIndex = this.currentBaseCryIdx;
        this.waveDiagram = new _WaveDiagram__WEBPACK_IMPORTED_MODULE_3__["default"](this.waveDiagramElement);
        this.selectPokemon(_data_pokemonList__WEBPACK_IMPORTED_MODULE_5__["default"][0]);
        this.updateCommands();
    };
    Ui.prototype.getCryTypeName = function (cryType) {
        return typeof cryType.name === "string" ?
            cryType.name :
            (_data_cryTypes__WEBPACK_IMPORTED_MODULE_2__["default"].indexOf(cryType) + 1).toString();
    };
    Ui.prototype.generateData = function () {
        this.updateCommands();
        this.cryGenerator.init();
        var _a = this.cryGenerator.generate(this.selectedCryType, this.pitch, this.length), pulse1 = _a.pulse1, pulse2 = _a.pulse2, noise = _a.noise;
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
        this.parseCryCommands();
        this.updateCryTypeCommands(_data_BaseCryManager__WEBPACK_IMPORTED_MODULE_6__.BaseCryManager.get(this.currentBaseCryIdx));
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
                pulse1.push({ "note": [parseInt(command[1]) - 1, parseInt(command[2]), parseInt(command[3]), parseInt(command[4])] });
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
                pulse2.push({ "note": [parseInt(command[1]) - 1, parseInt(command[2]), parseInt(command[3]), parseInt(command[4])] });
            }
        }
        newCommands.pulse2 = pulse2;
        var noise = [];
        for (var index = 0; index < noiseCommands.length; index++) {
            var command = noiseCommands[index].split(" ");
            if (command[0] === "note") {
                noise.push({ "note": [parseInt(command[1]) - 1, parseInt(command[2]), parseInt(command[3]), parseInt(command[4])] });
            }
        }
        newCommands.noise = noise;
        _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_6__.BaseCryManager.updateChannels(this.currentBaseCryIdx, newCommands);
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
                    (cry.pulse1[index].note[0] + 1) + " " +
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
                    "duty 0x" + cry.pulse2[index].duty.toString(0x20) + "\n";
            }
            else if (cry.pulse2[index].note) {
                this.pulse2CommandsElement.value = this.pulse2CommandsElement.value +
                    "note " +
                    (cry.pulse2[index].note[0] + 2) + " " +
                    cry.pulse2[index].note[2] + " " +
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
                    (cry.noise[index].note[0] + 1) + " " +
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


window.addEventListener("load", function () {
    _data_BaseCryManager__WEBPACK_IMPORTED_MODULE_1__.BaseCryManager.init();
    _ui__WEBPACK_IMPORTED_MODULE_0__["default"].init();
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZZOztBQUVaLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFWTs7QUFFWixlQUFlLG1CQUFPLENBQUMsb0RBQVc7QUFDbEMsZ0JBQWdCLG1CQUFPLENBQUMsZ0RBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkLGtCQUFrQjtBQUNsQix5QkFBeUI7O0FBRXpCO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7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RSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUUsRUFDUjtLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRSxFQUNSO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsV0FBVztTQUNuRDtRQUNELFFBQVEsRUFBRSxFQUNUO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRyxhQUFhO1lBQ3JELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsYUFBYTtTQUNyRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUcsWUFBWTtTQUNyRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNyQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDckMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFLEVBQ1I7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNyQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLGFBQWE7U0FDckQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLGFBQWE7U0FDckQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRSxFQUNSO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsYUFBYTtTQUNyRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3JDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsYUFBYTtTQUNyRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3JDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFLEVBQUU7S0FDWixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFHLFlBQVk7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFHLFlBQVk7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFHLFlBQVk7U0FDckQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUcsWUFBWTtTQUNyRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGO0NBQ1csRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzU2QmYsaUVBQWU7SUFDYixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzNELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzNELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUM1RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzNELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN2RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3RELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDL0QsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDN0QsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzVELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUM1RCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUN0RCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDdEQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzNELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN2RCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMzRCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMzRCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3JELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQzNELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUM1RCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDNUQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUM1RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN2RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzNELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3RELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDdEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN0RCxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN0RCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDdEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN2RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMzRCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDNUQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN2RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN0RCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN2RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3ZELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN2RCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUM1RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMzRCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtDQUN6QyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FD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QUFXO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUMsSTs7Ozs7V0NQRCx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOc0I7QUFDaUM7QUFFdkQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtJQUM5QixnRUFBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLDJDQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDWixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9ub2RlX21vZHVsZXMvZmlsZS1zYXZlci9kaXN0L0ZpbGVTYXZlci5taW4uanMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9zcmMvQ3J5R2VuZXJhdG9yLnRzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9zcmMvZGF0YS9CYXNlQ3J5TWFuYWdlci50cyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vc3JjL2RhdGEvY3J5VHlwZXMudHMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL3NyYy9kYXRhL3Bva2Vtb25MaXN0LnRzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9zcmMvdWkvV2F2ZURpYWdyYW0udHMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL3NyYy91aS9pbmRleC50cyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJwb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsICgpID0+IHtcbnJldHVybiAiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsoXG4gICAgICB1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpXG4gICAgKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxuY29uc3QgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbmNvbnN0IGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbmNvbnN0IGN1c3RvbUluc3BlY3RTeW1ib2wgPVxuICAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sWydmb3InXSA9PT0gJ2Z1bmN0aW9uJykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBkb3Qtbm90YXRpb25cbiAgICA/IFN5bWJvbFsnZm9yJ10oJ25vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tJykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBkb3Qtbm90YXRpb25cbiAgICA6IG51bGxcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG5jb25zdCBLX01BWF9MRU5HVEggPSAweDdmZmZmZmZmXG5leHBvcnRzLmtNYXhMZW5ndGggPSBLX01BWF9MRU5HVEhcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgUHJpbnQgd2FybmluZyBhbmQgcmVjb21tZW5kIHVzaW5nIGBidWZmZXJgIHY0Lnggd2hpY2ggaGFzIGFuIE9iamVjdFxuICogICAgICAgICAgICAgICBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogV2UgcmVwb3J0IHRoYXQgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0eXBlZCBhcnJheXMgaWYgdGhlIGFyZSBub3Qgc3ViY2xhc3NhYmxlXG4gKiB1c2luZyBfX3Byb3RvX18uIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgXG4gKiAoU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzgpLiBJRSAxMCBsYWNrcyBzdXBwb3J0XG4gKiBmb3IgX19wcm90b19fIGFuZCBoYXMgYSBidWdneSB0eXBlZCBhcnJheSBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbmlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgY29uc29sZS5lcnJvcihcbiAgICAnVGhpcyBicm93c2VyIGxhY2tzIHR5cGVkIGFycmF5IChVaW50OEFycmF5KSBzdXBwb3J0IHdoaWNoIGlzIHJlcXVpcmVkIGJ5ICcgK1xuICAgICdgYnVmZmVyYCB2NS54LiBVc2UgYGJ1ZmZlcmAgdjQueCBpZiB5b3UgcmVxdWlyZSBvbGQgYnJvd3NlciBzdXBwb3J0LidcbiAgKVxufVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIC8vIENhbiB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZD9cbiAgdHJ5IHtcbiAgICBjb25zdCBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGNvbnN0IHByb3RvID0geyBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH0gfVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihwcm90bywgVWludDhBcnJheS5wcm90b3R5cGUpXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGFyciwgcHJvdG8pXG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDJcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIucHJvdG90eXBlLCAncGFyZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0aGlzKSkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzLmJ1ZmZlclxuICB9XG59KVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ29mZnNldCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5ieXRlT2Zmc2V0XG4gIH1cbn0pXG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAobGVuZ3RoKSB7XG4gIGlmIChsZW5ndGggPiBLX01BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIGxlbmd0aCArICdcIiBpcyBpbnZhbGlkIGZvciBvcHRpb24gXCJzaXplXCInKVxuICB9XG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1ZiwgQnVmZmVyLnByb3RvdHlwZSlcbiAgcmV0dXJuIGJ1ZlxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICdUaGUgXCJzdHJpbmdcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nLiBSZWNlaXZlZCB0eXBlIG51bWJlcidcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKGFyZylcbiAgfVxuICByZXR1cm4gZnJvbShhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbmZ1bmN0aW9uIGZyb20gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheVZpZXcodmFsdWUpXG4gIH1cblxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgJyArXG4gICAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gICAgKVxuICB9XG5cbiAgaWYgKGlzSW5zdGFuY2UodmFsdWUsIEFycmF5QnVmZmVyKSB8fFxuICAgICAgKHZhbHVlICYmIGlzSW5zdGFuY2UodmFsdWUuYnVmZmVyLCBBcnJheUJ1ZmZlcikpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIChpc0luc3RhbmNlKHZhbHVlLCBTaGFyZWRBcnJheUJ1ZmZlcikgfHxcbiAgICAgICh2YWx1ZSAmJiBpc0luc3RhbmNlKHZhbHVlLmJ1ZmZlciwgU2hhcmVkQXJyYXlCdWZmZXIpKSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwidmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBvZiB0eXBlIG51bWJlci4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgKVxuICB9XG5cbiAgY29uc3QgdmFsdWVPZiA9IHZhbHVlLnZhbHVlT2YgJiYgdmFsdWUudmFsdWVPZigpXG4gIGlmICh2YWx1ZU9mICE9IG51bGwgJiYgdmFsdWVPZiAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20odmFsdWVPZiwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgY29uc3QgYiA9IGZyb21PYmplY3QodmFsdWUpXG4gIGlmIChiKSByZXR1cm4gYlxuXG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9QcmltaXRpdmUgIT0gbnVsbCAmJlxuICAgICAgdHlwZW9mIHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20odmFsdWVbU3ltYm9sLnRvUHJpbWl0aXZlXSgnc3RyaW5nJyksIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksICcgK1xuICAgICdvciBBcnJheS1saWtlIE9iamVjdC4gUmVjZWl2ZWQgdHlwZSAnICsgKHR5cGVvZiB2YWx1ZSlcbiAgKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbi8vIE5vdGU6IENoYW5nZSBwcm90b3R5cGUgKmFmdGVyKiBCdWZmZXIuZnJvbSBpcyBkZWZpbmVkIHRvIHdvcmthcm91bmQgQ2hyb21lIGJ1Zzpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvMTQ4XG5PYmplY3Quc2V0UHJvdG90eXBlT2YoQnVmZmVyLnByb3RvdHlwZSwgVWludDhBcnJheS5wcm90b3R5cGUpXG5PYmplY3Quc2V0UHJvdG90eXBlT2YoQnVmZmVyLCBVaW50OEFycmF5KVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgXCInICsgc2l6ZSArICdcIiBpcyBpbnZhbGlkIGZvciBvcHRpb24gXCJzaXplXCInKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcihzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAoc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUoc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUoc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gIH1cblxuICBjb25zdCBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICBsZXQgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcblxuICBjb25zdCBhY3R1YWwgPSBidWYud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIGJ1ZiA9IGJ1Zi5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKGFycmF5KSB7XG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICBjb25zdCBidWYgPSBjcmVhdGVCdWZmZXIobGVuZ3RoKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgYnVmW2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheVZpZXcgKGFycmF5Vmlldykge1xuICBpZiAoaXNJbnN0YW5jZShhcnJheVZpZXcsIFVpbnQ4QXJyYXkpKSB7XG4gICAgY29uc3QgY29weSA9IG5ldyBVaW50OEFycmF5KGFycmF5VmlldylcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKGNvcHkuYnVmZmVyLCBjb3B5LmJ5dGVPZmZzZXQsIGNvcHkuYnl0ZUxlbmd0aClcbiAgfVxuICByZXR1cm4gZnJvbUFycmF5TGlrZShhcnJheVZpZXcpXG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJvZmZzZXRcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcImxlbmd0aFwiIGlzIG91dHNpZGUgb2YgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBsZXQgYnVmXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoYnVmLCBCdWZmZXIucHJvdG90eXBlKVxuXG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAob2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIGNvbnN0IGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgY29uc3QgYnVmID0gY3JlYXRlQnVmZmVyKGxlbilcblxuICAgIGlmIChidWYubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gYnVmXG4gICAgfVxuXG4gICAgb2JqLmNvcHkoYnVmLCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIGJ1ZlxuICB9XG5cbiAgaWYgKG9iai5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgbnVtYmVySXNOYU4ob2JqLmxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIoMClcbiAgICB9XG4gICAgcmV0dXJuIGZyb21BcnJheUxpa2Uob2JqKVxuICB9XG5cbiAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBBcnJheS5pc0FycmF5KG9iai5kYXRhKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iai5kYXRhKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBLX01BWF9MRU5HVEhgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIEtfTUFYX0xFTkdUSC50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuIGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlciA9PT0gdHJ1ZSAmJlxuICAgIGIgIT09IEJ1ZmZlci5wcm90b3R5cGUgLy8gc28gQnVmZmVyLmlzQnVmZmVyKEJ1ZmZlci5wcm90b3R5cGUpIHdpbGwgYmUgZmFsc2Vcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmIChpc0luc3RhbmNlKGEsIFVpbnQ4QXJyYXkpKSBhID0gQnVmZmVyLmZyb20oYSwgYS5vZmZzZXQsIGEuYnl0ZUxlbmd0aClcbiAgaWYgKGlzSW5zdGFuY2UoYiwgVWludDhBcnJheSkpIGIgPSBCdWZmZXIuZnJvbShiLCBiLm9mZnNldCwgYi5ieXRlTGVuZ3RoKVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJidWYxXCIsIFwiYnVmMlwiIGFyZ3VtZW50cyBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5J1xuICAgIClcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIGxldCB4ID0gYS5sZW5ndGhcbiAgbGV0IHkgPSBiLmxlbmd0aFxuXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgbGV0IGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICBjb25zdCBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICBsZXQgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIGxldCBidWYgPSBsaXN0W2ldXG4gICAgaWYgKGlzSW5zdGFuY2UoYnVmLCBVaW50OEFycmF5KSkge1xuICAgICAgaWYgKHBvcyArIGJ1Zi5sZW5ndGggPiBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIGJ1ZiA9IEJ1ZmZlci5mcm9tKGJ1ZilcbiAgICAgICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAgYnVmLFxuICAgICAgICAgIHBvc1xuICAgICAgICApXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIH1cbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBpc0luc3RhbmNlKHN0cmluZywgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJzdHJpbmdcIiBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBvciBBcnJheUJ1ZmZlci4gJyArXG4gICAgICAnUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIHN0cmluZ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgY29uc3QgbXVzdE1hdGNoID0gKGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSA9PT0gdHJ1ZSlcbiAgaWYgKCFtdXN0TWF0Y2ggJiYgbGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB7XG4gICAgICAgICAgcmV0dXJuIG11c3RNYXRjaCA/IC0xIDogdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgfVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJjaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoaXMgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCAoYW5kIHRoZSBgaXMtYnVmZmVyYCBucG0gcGFja2FnZSlcbi8vIHRvIGRldGVjdCBhIEJ1ZmZlciBpbnN0YW5jZS4gSXQncyBub3QgcG9zc2libGUgdG8gdXNlIGBpbnN0YW5jZW9mIEJ1ZmZlcmBcbi8vIHJlbGlhYmx5IGluIGEgYnJvd3NlcmlmeSBjb250ZXh0IGJlY2F1c2UgdGhlcmUgY291bGQgYmUgbXVsdGlwbGUgZGlmZmVyZW50XG4vLyBjb3BpZXMgb2YgdGhlICdidWZmZXInIHBhY2thZ2UgaW4gdXNlLiBUaGlzIG1ldGhvZCB3b3JrcyBldmVuIGZvciBCdWZmZXJcbi8vIGluc3RhbmNlcyB0aGF0IHdlcmUgY3JlYXRlZCBmcm9tIGFub3RoZXIgY29weSBvZiB0aGUgYGJ1ZmZlcmAgcGFja2FnZS5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzE1NFxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgY29uc3QgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgY29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9Mb2NhbGVTdHJpbmcgPSBCdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nXG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgbGV0IHN0ciA9ICcnXG4gIGNvbnN0IG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5yZXBsYWNlKC8oLnsyfSkvZywgJyQxICcpLnRyaW0oKVxuICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5pZiAoY3VzdG9tSW5zcGVjdFN5bWJvbCkge1xuICBCdWZmZXIucHJvdG90eXBlW2N1c3RvbUluc3BlY3RTeW1ib2xdID0gQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmIChpc0luc3RhbmNlKHRhcmdldCwgVWludDhBcnJheSkpIHtcbiAgICB0YXJnZXQgPSBCdWZmZXIuZnJvbSh0YXJnZXQsIHRhcmdldC5vZmZzZXQsIHRhcmdldC5ieXRlTGVuZ3RoKVxuICB9XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInRhcmdldFwiIGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgQnVmZmVyIG9yIFVpbnQ4QXJyYXkuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdGFyZ2V0KVxuICAgIClcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIGxldCB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICBsZXQgeSA9IGVuZCAtIHN0YXJ0XG4gIGNvbnN0IGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgY29uc3QgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgY29uc3QgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKG51bWJlcklzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgW3ZhbF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIGxldCBpbmRleFNpemUgPSAxXG4gIGxldCBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIGxldCB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIGxldCBpXG4gIGlmIChkaXIpIHtcbiAgICBsZXQgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsZXQgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIGNvbnN0IHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBsZXQgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKG51bWJlcklzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggPj4+IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICBjb25zdCByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgY29uc3QgcmVzID0gW11cblxuICBsZXQgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgY29uc3QgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgbGV0IGNvZGVQb2ludCA9IG51bGxcbiAgICBsZXQgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKVxuICAgICAgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKVxuICAgICAgICAgID8gM1xuICAgICAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpXG4gICAgICAgICAgICAgID8gMlxuICAgICAgICAgICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIGxldCBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbmNvbnN0IE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICBjb25zdCBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIGxldCByZXMgPSAnJ1xuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgbGV0IHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGxldCByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICBsZXQgb3V0ID0gJydcbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gaGV4U2xpY2VMb29rdXBUYWJsZVtidWZbaV1dXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBjb25zdCBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICBsZXQgcmVzID0gJydcbiAgLy8gSWYgYnl0ZXMubGVuZ3RoIGlzIG9kZCwgdGhlIGxhc3QgOCBiaXRzIG11c3QgYmUgaWdub3JlZCAoc2FtZSBhcyBub2RlLmpzKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aCAtIDE7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgKGJ5dGVzW2kgKyAxXSAqIDI1NikpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICBjb25zdCBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihuZXdCdWYsIEJ1ZmZlci5wcm90b3R5cGUpXG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludExFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0XVxuICBsZXQgbXVsID0gMVxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50QkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIGxldCBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDggPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDE2TEUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MTZCRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQzMkxFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDMyQkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnVUludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ1VJbnQ2NExFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgbG8gPSBmaXJzdCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDI0XG5cbiAgY29uc3QgaGkgPSB0aGlzWysrb2Zmc2V0XSArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgbGFzdCAqIDIgKiogMjRcblxuICByZXR1cm4gQmlnSW50KGxvKSArIChCaWdJbnQoaGkpIDw8IEJpZ0ludCgzMikpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdVSW50NjRCRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiByZWFkQmlnVUludDY0QkUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCBoaSA9IGZpcnN0ICogMiAqKiAyNCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF1cblxuICBjb25zdCBsbyA9IHRoaXNbKytvZmZzZXRdICogMiAqKiAyNCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgbGFzdFxuXG4gIHJldHVybiAoQmlnSW50KGhpKSA8PCBCaWdJbnQoMzIpKSArIEJpZ0ludChsbylcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldF1cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgaSA9IGJ5dGVMZW5ndGhcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIGNvbnN0IHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiByZWFkQmlnSW50NjRMRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgNF0gK1xuICAgIHRoaXNbb2Zmc2V0ICsgNV0gKiAyICoqIDggK1xuICAgIHRoaXNbb2Zmc2V0ICsgNl0gKiAyICoqIDE2ICtcbiAgICAobGFzdCA8PCAyNCkgLy8gT3ZlcmZsb3dcblxuICByZXR1cm4gKEJpZ0ludCh2YWwpIDw8IEJpZ0ludCgzMikpICtcbiAgICBCaWdJbnQoZmlyc3QgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAyNClcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ0ludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ0ludDY0QkUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCB2YWwgPSAoZmlyc3QgPDwgMjQpICsgLy8gT3ZlcmZsb3dcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XVxuXG4gIHJldHVybiAoQmlnSW50KHZhbCkgPDwgQmlnSW50KDMyKSkgK1xuICAgIEJpZ0ludCh0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIGxhc3QpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnRMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICBsZXQgbXVsID0gMVxuICBsZXQgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludEJFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgbGV0IG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50OCA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQxNkxFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MTZCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDMyTEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQzMkJFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIHdydEJpZ1VJbnQ2NExFIChidWYsIHZhbHVlLCBvZmZzZXQsIG1pbiwgbWF4KSB7XG4gIGNoZWNrSW50QkkodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgNylcblxuICBsZXQgbG8gPSBOdW1iZXIodmFsdWUgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsZXQgaGkgPSBOdW1iZXIodmFsdWUgPj4gQmlnSW50KDMyKSAmIEJpZ0ludCgweGZmZmZmZmZmKSlcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIHJldHVybiBvZmZzZXRcbn1cblxuZnVuY3Rpb24gd3J0QmlnVUludDY0QkUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbWluLCBtYXgpIHtcbiAgY2hlY2tJbnRCSSh2YWx1ZSwgbWluLCBtYXgsIGJ1Ziwgb2Zmc2V0LCA3KVxuXG4gIGxldCBsbyA9IE51bWJlcih2YWx1ZSAmIEJpZ0ludCgweGZmZmZmZmZmKSlcbiAgYnVmW29mZnNldCArIDddID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA2XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNV0gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDRdID0gbG9cbiAgbGV0IGhpID0gTnVtYmVyKHZhbHVlID4+IEJpZ0ludCgzMikgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQgKyAzXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0ICsgMl0gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCArIDFdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXRdID0gaGlcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ1VJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnVUludDY0TEUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRMRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBCaWdJbnQoMCksIEJpZ0ludCgnMHhmZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlQmlnVUludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdVSW50NjRCRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NEJFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIEJpZ0ludCgwKSwgQmlnSW50KCcweGZmZmZmZmZmZmZmZmZmZmYnKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbGltaXQgPSBNYXRoLnBvdygyLCAoOCAqIGJ5dGVMZW5ndGgpIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgbGV0IGkgPSAwXG4gIGxldCBtdWwgPSAxXG4gIGxldCBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbGltaXQgPSBNYXRoLnBvdygyLCAoOCAqIGJ5dGVMZW5ndGgpIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoIC0gMVxuICBsZXQgbXVsID0gMVxuICBsZXQgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ0ludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdJbnQ2NExFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0TEUodGhpcywgdmFsdWUsIG9mZnNldCwgLUJpZ0ludCgnMHg4MDAwMDAwMDAwMDAwMDAwJyksIEJpZ0ludCgnMHg3ZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlQmlnSW50NjRCRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ0ludDY0QkUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRCRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAtQmlnSW50KCcweDgwMDAwMDAwMDAwMDAwMDAnKSwgQmlnSW50KCcweDdmZmZmZmZmZmZmZmZmZmYnKSlcbn0pXG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IHNob3VsZCBiZSBhIEJ1ZmZlcicpXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICBjb25zdCBsZW4gPSBlbmQgLSBzdGFydFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBVc2UgYnVpbHQtaW4gd2hlbiBhdmFpbGFibGUsIG1pc3NpbmcgZnJvbSBJRTExXG4gICAgdGhpcy5jb3B5V2l0aGluKHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKChlbmNvZGluZyA9PT0gJ3V0ZjgnICYmIGNvZGUgPCAxMjgpIHx8XG4gICAgICAgICAgZW5jb2RpbmcgPT09ICdsYXRpbjEnKSB7XG4gICAgICAgIC8vIEZhc3QgcGF0aDogSWYgYHZhbGAgZml0cyBpbnRvIGEgc2luZ2xlIGJ5dGUsIHVzZSB0aGF0IG51bWVyaWMgdmFsdWUuXG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnYm9vbGVhbicpIHtcbiAgICB2YWwgPSBOdW1iZXIodmFsKVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIGxldCBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgICBjb25zdCBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgdmFsdWUgXCInICsgdmFsICtcbiAgICAgICAgJ1wiIGlzIGludmFsaWQgZm9yIGFyZ3VtZW50IFwidmFsdWVcIicpXG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIENVU1RPTSBFUlJPUlNcbi8vID09PT09PT09PT09PT1cblxuLy8gU2ltcGxpZmllZCB2ZXJzaW9ucyBmcm9tIE5vZGUsIGNoYW5nZWQgZm9yIEJ1ZmZlci1vbmx5IHVzYWdlXG5jb25zdCBlcnJvcnMgPSB7fVxuZnVuY3Rpb24gRSAoc3ltLCBnZXRNZXNzYWdlLCBCYXNlKSB7XG4gIGVycm9yc1tzeW1dID0gY2xhc3MgTm9kZUVycm9yIGV4dGVuZHMgQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgc3VwZXIoKVxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21lc3NhZ2UnLCB7XG4gICAgICAgIHZhbHVlOiBnZXRNZXNzYWdlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH0pXG5cbiAgICAgIC8vIEFkZCB0aGUgZXJyb3IgY29kZSB0byB0aGUgbmFtZSB0byBpbmNsdWRlIGl0IGluIHRoZSBzdGFjayB0cmFjZS5cbiAgICAgIHRoaXMubmFtZSA9IGAke3RoaXMubmFtZX0gWyR7c3ltfV1gXG4gICAgICAvLyBBY2Nlc3MgdGhlIHN0YWNrIHRvIGdlbmVyYXRlIHRoZSBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZXJyb3IgY29kZVxuICAgICAgLy8gZnJvbSB0aGUgbmFtZS5cbiAgICAgIHRoaXMuc3RhY2sgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgIC8vIFJlc2V0IHRoZSBuYW1lIHRvIHRoZSBhY3R1YWwgbmFtZS5cbiAgICAgIGRlbGV0ZSB0aGlzLm5hbWVcbiAgICB9XG5cbiAgICBnZXQgY29kZSAoKSB7XG4gICAgICByZXR1cm4gc3ltXG4gICAgfVxuXG4gICAgc2V0IGNvZGUgKHZhbHVlKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvZGUnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRvU3RyaW5nICgpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IFske3N5bX1dOiAke3RoaXMubWVzc2FnZX1gXG4gICAgfVxuICB9XG59XG5cbkUoJ0VSUl9CVUZGRVJfT1VUX09GX0JPVU5EUycsXG4gIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiBgJHtuYW1lfSBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHNgXG4gICAgfVxuXG4gICAgcmV0dXJuICdBdHRlbXB0IHRvIGFjY2VzcyBtZW1vcnkgb3V0c2lkZSBidWZmZXIgYm91bmRzJ1xuICB9LCBSYW5nZUVycm9yKVxuRSgnRVJSX0lOVkFMSURfQVJHX1RZUEUnLFxuICBmdW5jdGlvbiAobmFtZSwgYWN0dWFsKSB7XG4gICAgcmV0dXJuIGBUaGUgXCIke25hbWV9XCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlci4gUmVjZWl2ZWQgdHlwZSAke3R5cGVvZiBhY3R1YWx9YFxuICB9LCBUeXBlRXJyb3IpXG5FKCdFUlJfT1VUX09GX1JBTkdFJyxcbiAgZnVuY3Rpb24gKHN0ciwgcmFuZ2UsIGlucHV0KSB7XG4gICAgbGV0IG1zZyA9IGBUaGUgdmFsdWUgb2YgXCIke3N0cn1cIiBpcyBvdXQgb2YgcmFuZ2UuYFxuICAgIGxldCByZWNlaXZlZCA9IGlucHV0XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoaW5wdXQpICYmIE1hdGguYWJzKGlucHV0KSA+IDIgKiogMzIpIHtcbiAgICAgIHJlY2VpdmVkID0gYWRkTnVtZXJpY2FsU2VwYXJhdG9yKFN0cmluZyhpbnB1dCkpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdiaWdpbnQnKSB7XG4gICAgICByZWNlaXZlZCA9IFN0cmluZyhpbnB1dClcbiAgICAgIGlmIChpbnB1dCA+IEJpZ0ludCgyKSAqKiBCaWdJbnQoMzIpIHx8IGlucHV0IDwgLShCaWdJbnQoMikgKiogQmlnSW50KDMyKSkpIHtcbiAgICAgICAgcmVjZWl2ZWQgPSBhZGROdW1lcmljYWxTZXBhcmF0b3IocmVjZWl2ZWQpXG4gICAgICB9XG4gICAgICByZWNlaXZlZCArPSAnbidcbiAgICB9XG4gICAgbXNnICs9IGAgSXQgbXVzdCBiZSAke3JhbmdlfS4gUmVjZWl2ZWQgJHtyZWNlaXZlZH1gXG4gICAgcmV0dXJuIG1zZ1xuICB9LCBSYW5nZUVycm9yKVxuXG5mdW5jdGlvbiBhZGROdW1lcmljYWxTZXBhcmF0b3IgKHZhbCkge1xuICBsZXQgcmVzID0gJydcbiAgbGV0IGkgPSB2YWwubGVuZ3RoXG4gIGNvbnN0IHN0YXJ0ID0gdmFsWzBdID09PSAnLScgPyAxIDogMFxuICBmb3IgKDsgaSA+PSBzdGFydCArIDQ7IGkgLT0gMykge1xuICAgIHJlcyA9IGBfJHt2YWwuc2xpY2UoaSAtIDMsIGkpfSR7cmVzfWBcbiAgfVxuICByZXR1cm4gYCR7dmFsLnNsaWNlKDAsIGkpfSR7cmVzfWBcbn1cblxuLy8gQ0hFQ0sgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gY2hlY2tCb3VuZHMgKGJ1Ziwgb2Zmc2V0LCBieXRlTGVuZ3RoKSB7XG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGlmIChidWZbb2Zmc2V0XSA9PT0gdW5kZWZpbmVkIHx8IGJ1ZltvZmZzZXQgKyBieXRlTGVuZ3RoXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCBidWYubGVuZ3RoIC0gKGJ5dGVMZW5ndGggKyAxKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0ludEJJICh2YWx1ZSwgbWluLCBtYXgsIGJ1Ziwgb2Zmc2V0LCBieXRlTGVuZ3RoKSB7XG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikge1xuICAgIGNvbnN0IG4gPSB0eXBlb2YgbWluID09PSAnYmlnaW50JyA/ICduJyA6ICcnXG4gICAgbGV0IHJhbmdlXG4gICAgaWYgKGJ5dGVMZW5ndGggPiAzKSB7XG4gICAgICBpZiAobWluID09PSAwIHx8IG1pbiA9PT0gQmlnSW50KDApKSB7XG4gICAgICAgIHJhbmdlID0gYD49IDAke259IGFuZCA8IDIke259ICoqICR7KGJ5dGVMZW5ndGggKyAxKSAqIDh9JHtufWBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhbmdlID0gYD49IC0oMiR7bn0gKiogJHsoYnl0ZUxlbmd0aCArIDEpICogOCAtIDF9JHtufSkgYW5kIDwgMiAqKiBgICtcbiAgICAgICAgICAgICAgICBgJHsoYnl0ZUxlbmd0aCArIDEpICogOCAtIDF9JHtufWBcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2UgPSBgPj0gJHttaW59JHtufSBhbmQgPD0gJHttYXh9JHtufWBcbiAgICB9XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKCd2YWx1ZScsIHJhbmdlLCB2YWx1ZSlcbiAgfVxuICBjaGVja0JvdW5kcyhidWYsIG9mZnNldCwgYnl0ZUxlbmd0aClcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVOdW1iZXIgKHZhbHVlLCBuYW1lKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfSU5WQUxJRF9BUkdfVFlQRShuYW1lLCAnbnVtYmVyJywgdmFsdWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gYm91bmRzRXJyb3IgKHZhbHVlLCBsZW5ndGgsIHR5cGUpIHtcbiAgaWYgKE1hdGguZmxvb3IodmFsdWUpICE9PSB2YWx1ZSkge1xuICAgIHZhbGlkYXRlTnVtYmVyKHZhbHVlLCB0eXBlKVxuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSh0eXBlIHx8ICdvZmZzZXQnLCAnYW4gaW50ZWdlcicsIHZhbHVlKVxuICB9XG5cbiAgaWYgKGxlbmd0aCA8IDApIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9CVUZGRVJfT1VUX09GX0JPVU5EUygpXG4gIH1cblxuICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UodHlwZSB8fCAnb2Zmc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA+PSAke3R5cGUgPyAxIDogMH0gYW5kIDw9ICR7bGVuZ3RofWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSlcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG5jb25zdCBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXisvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHRha2VzIGVxdWFsIHNpZ25zIGFzIGVuZCBvZiB0aGUgQmFzZTY0IGVuY29kaW5nXG4gIHN0ciA9IHN0ci5zcGxpdCgnPScpWzBdXG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgbGV0IGNvZGVQb2ludFxuICBjb25zdCBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIGxldCBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICBjb25zdCBieXRlcyA9IFtdXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIGNvbnN0IGJ5dGVBcnJheSA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgbGV0IGMsIGhpLCBsb1xuICBjb25zdCBieXRlQXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGxldCBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG4vLyBBcnJheUJ1ZmZlciBvciBVaW50OEFycmF5IG9iamVjdHMgZnJvbSBvdGhlciBjb250ZXh0cyAoaS5lLiBpZnJhbWVzKSBkbyBub3QgcGFzc1xuLy8gdGhlIGBpbnN0YW5jZW9mYCBjaGVjayBidXQgdGhleSBzaG91bGQgYmUgdHJlYXRlZCBhcyBvZiB0aGF0IHR5cGUuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNjZcbmZ1bmN0aW9uIGlzSW5zdGFuY2UgKG9iaiwgdHlwZSkge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgdHlwZSB8fFxuICAgIChvYmogIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IgIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IubmFtZSAhPSBudWxsICYmXG4gICAgICBvYmouY29uc3RydWN0b3IubmFtZSA9PT0gdHlwZS5uYW1lKVxufVxuZnVuY3Rpb24gbnVtYmVySXNOYU4gKG9iaikge1xuICAvLyBGb3IgSUUxMSBzdXBwb3J0XG4gIHJldHVybiBvYmogIT09IG9iaiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuXG4vLyBDcmVhdGUgbG9va3VwIHRhYmxlIGZvciBgdG9TdHJpbmcoJ2hleCcpYFxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMjE5XG5jb25zdCBoZXhTbGljZUxvb2t1cFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OWFiY2RlZidcbiAgY29uc3QgdGFibGUgPSBuZXcgQXJyYXkoMjU2KVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICBjb25zdCBpMTYgPSBpICogMTZcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDE2OyArK2opIHtcbiAgICAgIHRhYmxlW2kxNiArIGpdID0gYWxwaGFiZXRbaV0gKyBhbHBoYWJldFtqXVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFibGVcbn0pKClcblxuLy8gUmV0dXJuIG5vdCBmdW5jdGlvbiB3aXRoIEVycm9yIGlmIEJpZ0ludCBub3Qgc3VwcG9ydGVkXG5mdW5jdGlvbiBkZWZpbmVCaWdJbnRNZXRob2QgKGZuKSB7XG4gIHJldHVybiB0eXBlb2YgQmlnSW50ID09PSAndW5kZWZpbmVkJyA/IEJ1ZmZlckJpZ0ludE5vdERlZmluZWQgOiBmblxufVxuXG5mdW5jdGlvbiBCdWZmZXJCaWdJbnROb3REZWZpbmVkICgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdCaWdJbnQgbm90IHN1cHBvcnRlZCcpXG59XG4iLCIoZnVuY3Rpb24oYSxiKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGIpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpYigpO2Vsc2V7YigpLGEuRmlsZVNhdmVyPXtleHBvcnRzOnt9fS5leHBvcnRzfX0pKHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGEsYil7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGI/Yj17YXV0b0JvbTohMX06XCJvYmplY3RcIiE9dHlwZW9mIGImJihjb25zb2xlLndhcm4oXCJEZXByZWNhdGVkOiBFeHBlY3RlZCB0aGlyZCBhcmd1bWVudCB0byBiZSBhIG9iamVjdFwiKSxiPXthdXRvQm9tOiFifSksYi5hdXRvQm9tJiYvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChhLnR5cGUpP25ldyBCbG9iKFtcIlxcdUZFRkZcIixhXSx7dHlwZTphLnR5cGV9KTphfWZ1bmN0aW9uIGMoYSxiLGMpe3ZhciBkPW5ldyBYTUxIdHRwUmVxdWVzdDtkLm9wZW4oXCJHRVRcIixhKSxkLnJlc3BvbnNlVHlwZT1cImJsb2JcIixkLm9ubG9hZD1mdW5jdGlvbigpe2coZC5yZXNwb25zZSxiLGMpfSxkLm9uZXJyb3I9ZnVuY3Rpb24oKXtjb25zb2xlLmVycm9yKFwiY291bGQgbm90IGRvd25sb2FkIGZpbGVcIil9LGQuc2VuZCgpfWZ1bmN0aW9uIGQoYSl7dmFyIGI9bmV3IFhNTEh0dHBSZXF1ZXN0O2Iub3BlbihcIkhFQURcIixhLCExKTt0cnl7Yi5zZW5kKCl9Y2F0Y2goYSl7fXJldHVybiAyMDA8PWIuc3RhdHVzJiYyOTk+PWIuc3RhdHVzfWZ1bmN0aW9uIGUoYSl7dHJ5e2EuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChcImNsaWNrXCIpKX1jYXRjaChjKXt2YXIgYj1kb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRzXCIpO2IuaW5pdE1vdXNlRXZlbnQoXCJjbGlja1wiLCEwLCEwLHdpbmRvdywwLDAsMCw4MCwyMCwhMSwhMSwhMSwhMSwwLG51bGwpLGEuZGlzcGF0Y2hFdmVudChiKX19dmFyIGY9XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdyYmd2luZG93LndpbmRvdz09PXdpbmRvdz93aW5kb3c6XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYuc2VsZj09PXNlbGY/c2VsZjpcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsP2dsb2JhbDp2b2lkIDAsYT1mLm5hdmlnYXRvciYmL01hY2ludG9zaC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSYmL0FwcGxlV2ViS2l0Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpJiYhL1NhZmFyaS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxnPWYuc2F2ZUFzfHwoXCJvYmplY3RcIiE9dHlwZW9mIHdpbmRvd3x8d2luZG93IT09Zj9mdW5jdGlvbigpe306XCJkb3dubG9hZFwiaW4gSFRNTEFuY2hvckVsZW1lbnQucHJvdG90eXBlJiYhYT9mdW5jdGlvbihiLGcsaCl7dmFyIGk9Zi5VUkx8fGYud2Via2l0VVJMLGo9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7Zz1nfHxiLm5hbWV8fFwiZG93bmxvYWRcIixqLmRvd25sb2FkPWcsai5yZWw9XCJub29wZW5lclwiLFwic3RyaW5nXCI9PXR5cGVvZiBiPyhqLmhyZWY9YixqLm9yaWdpbj09PWxvY2F0aW9uLm9yaWdpbj9lKGopOmQoai5ocmVmKT9jKGIsZyxoKTplKGosai50YXJnZXQ9XCJfYmxhbmtcIikpOihqLmhyZWY9aS5jcmVhdGVPYmplY3RVUkwoYiksc2V0VGltZW91dChmdW5jdGlvbigpe2kucmV2b2tlT2JqZWN0VVJMKGouaHJlZil9LDRFNCksc2V0VGltZW91dChmdW5jdGlvbigpe2Uoail9LDApKX06XCJtc1NhdmVPck9wZW5CbG9iXCJpbiBuYXZpZ2F0b3I/ZnVuY3Rpb24oZixnLGgpe2lmKGc9Z3x8Zi5uYW1lfHxcImRvd25sb2FkXCIsXCJzdHJpbmdcIiE9dHlwZW9mIGYpbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYihmLGgpLGcpO2Vsc2UgaWYoZChmKSljKGYsZyxoKTtlbHNle3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO2kuaHJlZj1mLGkudGFyZ2V0PVwiX2JsYW5rXCIsc2V0VGltZW91dChmdW5jdGlvbigpe2UoaSl9KX19OmZ1bmN0aW9uKGIsZCxlLGcpe2lmKGc9Z3x8b3BlbihcIlwiLFwiX2JsYW5rXCIpLGcmJihnLmRvY3VtZW50LnRpdGxlPWcuZG9jdW1lbnQuYm9keS5pbm5lclRleHQ9XCJkb3dubG9hZGluZy4uLlwiKSxcInN0cmluZ1wiPT10eXBlb2YgYilyZXR1cm4gYyhiLGQsZSk7dmFyIGg9XCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIj09PWIudHlwZSxpPS9jb25zdHJ1Y3Rvci9pLnRlc3QoZi5IVE1MRWxlbWVudCl8fGYuc2FmYXJpLGo9L0NyaU9TXFwvW1xcZF0rLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO2lmKChqfHxoJiZpfHxhKSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXIpe3ZhciBrPW5ldyBGaWxlUmVhZGVyO2sub25sb2FkZW5kPWZ1bmN0aW9uKCl7dmFyIGE9ay5yZXN1bHQ7YT1qP2E6YS5yZXBsYWNlKC9eZGF0YTpbXjtdKjsvLFwiZGF0YTphdHRhY2htZW50L2ZpbGU7XCIpLGc/Zy5sb2NhdGlvbi5ocmVmPWE6bG9jYXRpb249YSxnPW51bGx9LGsucmVhZEFzRGF0YVVSTChiKX1lbHNle3ZhciBsPWYuVVJMfHxmLndlYmtpdFVSTCxtPWwuY3JlYXRlT2JqZWN0VVJMKGIpO2c/Zy5sb2NhdGlvbj1tOmxvY2F0aW9uLmhyZWY9bSxnPW51bGwsc2V0VGltZW91dChmdW5jdGlvbigpe2wucmV2b2tlT2JqZWN0VVJMKG0pfSw0RTQpfX0pO2Yuc2F2ZUFzPWcuc2F2ZUFzPWcsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmKG1vZHVsZS5leHBvcnRzPWcpfSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZpbGVTYXZlci5taW4uanMubWFwIiwiLyohIGllZWU3NTQuIEJTRC0zLUNsYXVzZSBMaWNlbnNlLiBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmcvb3BlbnNvdXJjZT4gKi9cbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsImltcG9ydCBDcnlUeXBlLCB7IENvbW1hbmQgfSBmcm9tIFwiLi9DcnlUeXBlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcnlHZW5lcmF0b3Ige1xyXG4gIGF1ZGlvQ29udGV4dDogQXVkaW9Db250ZXh0O1xyXG4gIHNvdXJjZVNhbXBsZVJhdGUgPSAxMDQ4NTc2O1xyXG4gIHNhbXBsZXNQZXJGcmFtZSA9IDE3NTU2O1xyXG4gIG5vaXNlQnVmZmVyID0gMHg3RkZGO1xyXG5cclxuICBpbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLmF1ZGlvQ29udGV4dCkgdGhpcy5hdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZShjcnlUeXBlOiBDcnlUeXBlLCBwaXRjaDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcikge1xyXG4gICAgY29uc3QgcHVsc2UxID0gdGhpcy5nZW5lcmF0ZVNxdWFyZVdhdmUoY3J5VHlwZS5wdWxzZTEsIHBpdGNoLCBsZW5ndGgpO1xyXG4gICAgY29uc3QgcHVsc2UyID0gdGhpcy5nZW5lcmF0ZVNxdWFyZVdhdmUoY3J5VHlwZS5wdWxzZTIsIHBpdGNoLCBsZW5ndGgpO1xyXG4gICAgLy8gZHVlIHRvIHF1aXJrIHdpdGggbm9pc2UgY2hhbm5lbDogZmluZCBzaG9ydGVzdCBjaGFubmVsIGxlbmd0aFxyXG4gICAgLy8gYXQgdGhpcyBwb2ludCwgbm9pc2Ugd2lsbCByZXZlcnQgcGl0Y2ggc2hpZnQgZWZmZWN0XHJcblxyXG4gICAgbGV0IHB1bHNlMUxlbmd0aCA9IDA7XHJcbiAgICBsZXQgcHVsc2UyTGVuZ3RoID0gMDtcclxuICAgIGxldCBsZWZ0b3ZlcnMgPSAwO1xyXG4gICAgZm9yIChjb25zdCBjb21tYW5kIG9mIGNyeVR5cGUucHVsc2UxKSB7XHJcbiAgICAgIGlmIChjb21tYW5kICYmIGNvbW1hbmQubm90ZSkge1xyXG4gICAgICAgIGNvbnN0IHN1YmZyYW1lcyA9ICgobGVuZ3RoICsgMHgxMDApICogKGNvbW1hbmQubm90ZVswXSArIDEpKSArIGxlZnRvdmVycztcclxuICAgICAgICBjb25zdCB0aGlzbm90ZSA9IHRoaXMuc2FtcGxlc1BlckZyYW1lICogKHN1YmZyYW1lcyA+PiA4KTtcclxuICAgICAgICBsZWZ0b3ZlcnMgPSBzdWJmcmFtZXMgJiAweEZGO1xyXG4gICAgICAgIHB1bHNlMUxlbmd0aCArPSB0aGlzbm90ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxlZnRvdmVycyA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGNvbW1hbmQgb2YgY3J5VHlwZS5wdWxzZTIpIHtcclxuICAgICAgaWYgKGNvbW1hbmQgJiYgY29tbWFuZC5ub3RlKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViZnJhbWVzID0gKChsZW5ndGggKyAweDEwMCkgKiAoY29tbWFuZC5ub3RlWzBdICsgMSkpICsgbGVmdG92ZXJzO1xyXG4gICAgICAgIGNvbnN0IHRoaXNub3RlID0gdGhpcy5zYW1wbGVzUGVyRnJhbWUgKiAoc3ViZnJhbWVzID4+IDgpO1xyXG4gICAgICAgIGxlZnRvdmVycyA9IHN1YmZyYW1lcyAmIDB4RkY7XHJcbiAgICAgICAgcHVsc2UyTGVuZ3RoICs9IHRoaXNub3RlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3V0b2ZmID0gTWF0aC5tYXgocHVsc2UxTGVuZ3RoLCBwdWxzZTJMZW5ndGgpIC0gdGhpcy5zYW1wbGVzUGVyRnJhbWU7XHJcbiAgICBjb25zdCBub2lzZSA9IHRoaXMuZ2VuZXJhdGVOb2lzZShjcnlUeXBlLm5vaXNlLCBwaXRjaCwgMCwgY3V0b2ZmKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwdWxzZTEsXHJcbiAgICAgIHB1bHNlMixcclxuICAgICAgbm9pc2VcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzYW1wbGUoYmluOiBudW1iZXIsIHZvbHVtZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAoXHJcbiAgICAgICAgKDIgKiBiaW4pIC0gMVxyXG4gICAgICApICogKFxyXG4gICAgICAgICh2b2x1bWUgKiAtMSkgLyAweDEwXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjYWxjRHV0eShkdXR5OiBudW1iZXIsIHBlcmlvZENvdW50OiBudW1iZXIpIHtcclxuICAgIHN3aXRjaCAoZHV0eSkge1xyXG4gICAgICBjYXNlIDA6IHJldHVybiBwZXJpb2RDb3VudCA+PSA0IC8gOCAmJiBwZXJpb2RDb3VudCA8IDUgLyA4O1xyXG4gICAgICBjYXNlIDE6IHJldHVybiBwZXJpb2RDb3VudCA+PSA0IC8gOCAmJiBwZXJpb2RDb3VudCA8IDYgLyA4O1xyXG4gICAgICBjYXNlIDI6IHJldHVybiBwZXJpb2RDb3VudCA+PSAyIC8gOCAmJiBwZXJpb2RDb3VudCA8IDYgLyA4O1xyXG4gICAgICBjYXNlIDM6IHJldHVybiBwZXJpb2RDb3VudCA8IDQgLyA4IHx8IHBlcmlvZENvdW50ID49IDYgLyA4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVTcXVhcmVXYXZlKGNvbW1hbmRzOiBDb21tYW5kW10sIHBpdGNoOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBsZXQgZHV0eSA9IDA7XHJcbiAgICBsZXQgZGF0YTogbnVtYmVyW10gPSBbXTtcclxuICAgIGxldCBjb21tYW5kSW5kZXggPSAwO1xyXG4gICAgbGV0IHNhbXBsZUluZGV4ID0gMDtcclxuICAgIGxldCBwZXJpb2RDb3VudCA9IDA7XHJcbiAgICBsZXQgbGVmdG92ZXJzID0gMDtcclxuICAgIHdoaWxlIChjb21tYW5kSW5kZXggPCBjb21tYW5kcy5sZW5ndGgpIHtcclxuICAgICAgbGV0IGNvbW1hbmQgPSBjb21tYW5kc1tjb21tYW5kSW5kZXhdO1xyXG4gICAgICBjb25zdCBpc0xhc3RDb21tYW5kID0gY29tbWFuZEluZGV4ID09PSBjb21tYW5kcy5sZW5ndGggLSAxO1xyXG4gICAgICBpZiAodHlwZW9mIGNvbW1hbmQuZHV0eSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGR1dHkgPSBjb21tYW5kLmR1dHk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29tbWFuZC5ub3RlKSB7XHJcbiAgICAgICAgbGV0IFtcclxuICAgICAgICAgIG51bWJlck9mU2FtcGxlc1Blck5vdGUsXHJcbiAgICAgICAgICB2b2x1bWUsXHJcbiAgICAgICAgICB2b2x1bWVGYWRlLFxyXG4gICAgICAgICAgbnVtYmVyT2ZTYW1wbGVzUGVyUGVyaW9kXHJcbiAgICAgICAgXSA9IGNvbW1hbmQubm90ZTtcclxuXHJcbiAgICAgICAgLy8gbnVtYmVyIG9mIHNhbXBsZXMgZm9yIHRoaXMgc2luZ2xlIG5vdGVcclxuICAgICAgICBsZXQgc3ViZnJhbWVzID0gKFxyXG4gICAgICAgICAgKGxlbmd0aCArIDB4MTAwKSAqXHJcbiAgICAgICAgICAobnVtYmVyT2ZTYW1wbGVzUGVyTm90ZSArIDEpXHJcbiAgICAgICAgKSArIGxlZnRvdmVycztcclxuICAgICAgICBsZXQgc2FtcGxlQ291bnQgPSB0aGlzLnNhbXBsZXNQZXJGcmFtZSAqIChzdWJmcmFtZXMgPj4gOCk7XHJcbiAgICAgICAgbGVmdG92ZXJzID0gc3ViZnJhbWVzICYgMHhGRjtcclxuICAgICAgICAvLyBudW1iZXIgb2Ygc2FtcGxlcyBmb3IgYSBzaW5nbGUgcGVyaW9kIG9mIHRoZSBub3RlJ3MgcGl0Y2hcclxuICAgICAgICBsZXQgcGVyaW9kID0gdGhpcy5zb3VyY2VTYW1wbGVSYXRlICogKFxyXG4gICAgICAgICAgMjA0OCAtIChcclxuICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgIG51bWJlck9mU2FtcGxlc1BlclBlcmlvZCArXHJcbiAgICAgICAgICAgICAgcGl0Y2hcclxuICAgICAgICAgICAgKSAmIDB4N0ZGXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSAvIDEzMTA3MjtcclxuICAgICAgICAvLyBhcHBseSB0aGlzIG5vdGVcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDI1MDAwMDAgJiYgKGluZGV4IDwgc2FtcGxlQ291bnQgfHwgKGlzTGFzdENvbW1hbmQgJiYgdm9sdW1lID4gMCkpOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBjb25zdCBlbmFibGVkID0gdGhpcy5jYWxjRHV0eShkdXR5ICYgMGIxMSwgcGVyaW9kQ291bnQpID9cclxuICAgICAgICAgICAgMSA6XHJcbiAgICAgICAgICAgIDA7XHJcbiAgICAgICAgICBkYXRhW3NhbXBsZUluZGV4XSA9IHRoaXMuc2FtcGxlKGVuYWJsZWQsIHZvbHVtZSk7XHJcbiAgICAgICAgICBwZXJpb2RDb3VudCArPSAxIC8gcGVyaW9kO1xyXG4gICAgICAgICAgcGVyaW9kQ291bnQgPSBwZXJpb2RDb3VudCA+PSAxID9cclxuICAgICAgICAgICAgcGVyaW9kQ291bnQgLSAxIDpcclxuICAgICAgICAgICAgcGVyaW9kQ291bnQ7XHJcbiAgICAgICAgICBzYW1wbGVJbmRleCsrO1xyXG5cclxuICAgICAgICAgIC8vIG9uY2UgcGVyIGZyYW1lLCBhZGp1c3QgZHV0eVxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBpbmRleCA8IHNhbXBsZUNvdW50ICYmXHJcbiAgICAgICAgICAgIHNhbXBsZUluZGV4ICUgdGhpcy5zYW1wbGVzUGVyRnJhbWUgPT09IDBcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBkdXR5ID0gKFxyXG4gICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgZHV0eSAmIDB4M0ZcclxuICAgICAgICAgICAgICAgICkgPDwgMlxyXG4gICAgICAgICAgICAgICkgfCAoXHJcbiAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgIGR1dHkgJiAweEMwXHJcbiAgICAgICAgICAgICAgICApID4+IDZcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gb25jZSBwZXIgZnJhbWUgKiBmYWRlYW1vdW50LCBhZGp1c3Qgdm9sdW1lXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHZvbHVtZUZhZGUgIT09IDAgJiZcclxuICAgICAgICAgICAgKGluZGV4ICsgMSkgJSAodGhpcy5zYW1wbGVzUGVyRnJhbWUgKiBNYXRoLmFicyh2b2x1bWVGYWRlKSkgPT09IDBcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB2b2x1bWUgKz0gKHZvbHVtZUZhZGUgPCAwID8gMSA6IC0xKTtcclxuICAgICAgICAgICAgdm9sdW1lID0gdm9sdW1lIDwgMCA/IDAgOiAodm9sdW1lID4gMHgwRiA/IDB4MEYgOiB2b2x1bWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29tbWFuZEluZGV4Kys7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZU5vaXNlKGNvbW1hbmRzOiBDb21tYW5kW10sIHBpdGNoOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBjdXRvZmY6IG51bWJlcikge1xyXG4gICAgbGV0IGRhdGE6IG51bWJlcltdID0gW107XHJcbiAgICBsZXQgY29tbWFuZEluZGV4ID0gMDtcclxuICAgIGxldCBzYW1wbGVJbmRleCA9IDA7XHJcbiAgICBsZXQgbGVmdG92ZXJzID0gMDtcclxuICAgIHdoaWxlIChjb21tYW5kSW5kZXggPCBjb21tYW5kcy5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzW2NvbW1hbmRJbmRleF07XHJcbiAgICAgIGNvbnN0IGlzTGFzdENvbW1hbmQgPSBjb21tYW5kSW5kZXggPT09IGNvbW1hbmRzLmxlbmd0aCAtIDE7XHJcbiAgICAgIGxldCBub3RlID0gY29tbWFuZC5ub3RlO1xyXG4gICAgICAvLyBudW1iZXIgb2Ygc2FtcGxlcyBmb3IgdGhpcyBzaW5nbGUgbm90ZVxyXG4gICAgICBsZXQgc3ViRnJhbWVzID0gKChsZW5ndGggKyAweDEwMCkgKiAobm90ZVswXSArIDEpKSArIGxlZnRvdmVycztcclxuICAgICAgbGV0IHNhbXBsZUNvdW50ID0gdGhpcy5zYW1wbGVzUGVyRnJhbWUgKiAoc3ViRnJhbWVzID4+IDgpO1xyXG4gICAgICBsZWZ0b3ZlcnMgPSBzdWJGcmFtZXMgJiAweEZGO1xyXG4gICAgICAvLyB2b2x1bWUgYW5kIGZhZGUgY29udHJvbFxyXG4gICAgICBsZXQgdm9sdW1lID0gbm90ZVsxXSwgdm9sdW1lRmFkZSA9IG5vdGVbMl0sIHBhcmFtcyA9IChub3RlWzNdICsgKHNhbXBsZUluZGV4ID49IGN1dG9mZiA/IDAgOiBwaXRjaCkpICYgMHhGRjtcclxuICAgICAgLy8gYXBwbHkgdGhpcyBub3RlXHJcbiAgICAgIGxldCBzaGlmdCA9IChwYXJhbXMgPj4gNCkgJiAweEY7XHJcbiAgICAgIHNoaWZ0ID0gc2hpZnQgPiAweEQgPyBzaGlmdCAmIDB4RCA6IHNoaWZ0OyAvLyBub3Qgc3VyZSBob3cgdG8gZGVhbCB3aXRoIEUgb3IgRiwgYnV0IGl0cyBzbyBsb3cgeW91IGNhbiBoYXJkbHkgbm90aWNlIGl0IGFueXdheVxyXG5cclxuICAgICAgbGV0IGRpdmlkZXIgPSBwYXJhbXMgJiAweDc7XHJcbiAgICAgIGxldCB3aWR0aCA9IChwYXJhbXMgJiAweDgpID09PSAweDg7XHJcbiAgICAgIHRoaXMubm9pc2VCdWZmZXIgPSAweDdGRkY7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMjUwMDAwMCAmJiAoaW5kZXggPCBzYW1wbGVDb3VudCB8fCAoaXNMYXN0Q29tbWFuZCAmJiB2b2x1bWUgPiAwKSk7IGluZGV4KyspIHtcclxuICAgICAgICBsZXQgYml0MCA9IHRoaXMubm9pc2VCdWZmZXIgJiAxO1xyXG4gICAgICAgIGRhdGFbc2FtcGxlSW5kZXhdID0gdGhpcy5zYW1wbGUoMSBeIGJpdDAsIHZvbHVtZSk7XHJcbiAgICAgICAgc2FtcGxlSW5kZXgrKztcclxuICAgICAgICAvLyBhY2NvcmRpbmcgdG8gcGFyYW1zLCB1cGRhdGUgYnVmZmVyXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgc2FtcGxlSW5kZXggJSAoMiAqIChkaXZpZGVyID09PSAwID8gMC41IDogZGl2aWRlcikgKiAoMSA8PCAoc2hpZnQgKyAxKSkpID09PSAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBsZXQgYml0MSA9ICh0aGlzLm5vaXNlQnVmZmVyID4+IDEpICYgMTtcclxuICAgICAgICAgIHRoaXMubm9pc2VCdWZmZXIgPSAodGhpcy5ub2lzZUJ1ZmZlciA+PiAxKSB8ICgoYml0MCBeIGJpdDEpIDw8IDE0KTtcclxuICAgICAgICAgIGlmICh3aWR0aCkgdGhpcy5ub2lzZUJ1ZmZlciA9ICh0aGlzLm5vaXNlQnVmZmVyID4+IDEpIHwgKChiaXQwIF4gYml0MSkgPDwgNik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG9uY2UgcGVyIGZyYW1lICogZmFkZWFtb3VudCwgYWRqdXN0IHZvbHVtZVxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHZvbHVtZUZhZGUgIT09IDAgJiZcclxuICAgICAgICAgIChpbmRleCArIDEpICUgKHRoaXMuc2FtcGxlc1BlckZyYW1lICogTWF0aC5hYnModm9sdW1lRmFkZSkpID09PSAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB2b2x1bWUgKz0gKHZvbHVtZUZhZGUgPCAwID8gMSA6IC0xKTtcclxuICAgICAgICAgIHZvbHVtZSA9IHZvbHVtZSA8IDAgPyAwIDogKHZvbHVtZSA+IDB4MEYgPyAweDBGIDogdm9sdW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29tbWFuZEluZGV4Kys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIHBsYXkoZGF0YTogbnVtYmVyW10pIHtcclxuICAgIGNvbnN0IGJ1ZmZlciA9IEZsb2F0MzJBcnJheS5mcm9tKGRhdGEpO1xyXG4gICAgY29uc3QgYXVkaW9CdWZmZXIgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoXHJcbiAgICAgIDEsXHJcbiAgICAgIGJ1ZmZlci5sZW5ndGgsXHJcbiAgICAgIHRoaXMuYXVkaW9Db250ZXh0LnNhbXBsZVJhdGVcclxuICAgICk7XHJcbiAgICBhdWRpb0J1ZmZlci5jb3B5VG9DaGFubmVsKGJ1ZmZlciwgMCk7XHJcblxyXG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICBzb3VyY2UuYnVmZmVyID0gYXVkaW9CdWZmZXI7XHJcbiAgICBzb3VyY2UuY29ubmVjdCh0aGlzLmF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICBzb3VyY2Uuc3RhcnQoMCk7XHJcbiAgfVxyXG59IiwiXHJcbmNvbnN0IGZzID0gd2luZG93LnJlcXVpcmUoJ2ZzJyk7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VDcnlNYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBkYXRhO1xyXG4gICAgc3RhdGljIGZpbGVQYXRoID0gJy4vc3JjL2RhdGEvYmFzZUNyaWVzLmpzb24nO1xyXG4gICAgc3RhdGljIHVuZG9TdGFjayA9IFtdO1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmModGhpcy5maWxlUGF0aCwndXRmOCcpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0KGlkeCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVtpZHhdO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwdXNoVW5kbygpe1xyXG4gICAgICAgIHRoaXMudW5kb1N0YWNrLnB1c2goc3RydWN0dXJlZENsb25lKHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGlmKHRoaXMudW5kb1N0YWNrLmxlbmd0aCA+IDIwKXtcclxuICAgICAgICAgICAgdGhpcy51bmRvU3RhY2suc2hpZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHBvcFVuZG8oKXtcclxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLnVuZG9TdGFjay5wb3AoKTtcclxuICAgICAgICB0aGlzLmZsdXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZsdXNoKCl7XHJcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyh0aGlzLmZpbGVQYXRoLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYWRkTmV3KCl7XHJcbiAgICAgICAgdGhpcy5wdXNoVW5kbygpO1xyXG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgY2hhbm5lbHM6IHtcclxuICAgICAgICAgICAgICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJub2lzZVwiOiBbXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYW1lOiBcIk5ldyBCYXNlIENyeVwiLFxyXG4gICAgICAgICAgICBcImlzUmVmZXJlbmNlXCI6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aCAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRlbGV0ZShpZHgpe1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjb3B5KGlkeCl7XHJcbiAgICAgICAgdGhpcy5wdXNoVW5kbygpO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBzdHJ1Y3R1cmVkQ2xvbmUodGhpcy5kYXRhW2lkeF0pO1xyXG4gICAgICAgIGRhdGEuaXNSZWZlcmVuY2UgPSBmYWxzZTtcclxuICAgICAgICBkYXRhLm5hbWUgPSBkYXRhLm5hbWUgKyBcIiAoQ29weSlcIjtcclxuICAgICAgICB0aGlzLmRhdGEucHVzaChkYXRhKTtcclxuICAgICAgICB0aGlzLmZsdXNoKCk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aCAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZU5hbWUoaWR4LCBuYW1lKXtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhW2lkeF0ubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpOyBcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlQ2hhbm5lbHMoaWR4LCBjaGFubmVscyl7XHJcbiAgICAgICAgdGhpcy5wdXNoVW5kbygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVtpZHhdLmNoYW5uZWxzID0gY2hhbm5lbHM7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpOyBcclxuICAgIH1cclxufSIsImltcG9ydCBDcnlUeXBlIGZyb20gXCIuLi9DcnlUeXBlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBbXHJcbiAgeyAvLyAkMDBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMywgMHg3MThdIH0sIC8vIDU2NC45NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRSwgMHgwNSwgMHg3OThdIH0sIC8vIDEyNjAuMzEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDksIDB4MDEsIDB4NzU4XSB9ICAvLyA3ODAuMTkgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QTAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEIsIDB4MDMsIDB4NzA4XSB9LCAvLyA1MjguNTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDUsIDB4Nzg4XSB9LCAvLyAxMDkyLjI3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA3LCAweDAxLCAweDc0OF0gfSAgLy8gNzEyLjM1IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAxLCAweDFDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwOSwgMHgwNCwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDgsIDB4MDEsIDB4MUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwMSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEEwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAzLCAweDYwMF0gfSwgLy8gMjU2LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDA1LCAweDc2MF0gfSwgLy8gODE5LjIwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAyLCAweDcyMF0gfSwgLy8gNTg1LjE0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDcxMF0gfSAgLy8gNTQ2LjEzIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDVBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBCLCAweDAzLCAweDZGMV0gfSwgLy8gNDgzLjY2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBDLCAweDA1LCAweDc1Ml0gfSwgLy8gNzUzLjI5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAyLCAweDcxMV0gfSwgLy8gNTQ4LjQyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDYwMV0gfSAgLy8gMjU2LjUwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAyLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwOSwgMHgwNCwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MDgsIDB4MDIsIDB4MUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA3LCAweDAxLCAweDJDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMDIgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgwMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRiwgMHgwNSwgMHg0ODBdIH0sIC8vIDE0Ni4yOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRSwgMHgwMSwgMHg1RTBdIH0sIC8vIDI0MC45NCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg1RENdIH0gIC8vIDIzOS4xOCBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhBNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwOSwgMHgwNSwgMHg0NDFdIH0sIC8vIDEzNi42OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwOCwgMHgwMSwgMHg1MjFdIH0sIC8vIDE3OC4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwNiwgMHgwMSwgMHg1MUFdIH0gIC8vIDE3Ni42NSBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDAzICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDcsIDB4NjA4XSB9LCAvLyAyNjAuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDYsIDB4NjAwXSB9LCAvLyAyNTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDcsIDB4NUYwXSB9LCAvLyAyNDguMjQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDQsIDB4NUUwXSB9LCAvLyAyNDAuOTQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDMsIDB4NUMwXSB9LCAvLyAyMjcuNTYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDMsIDB4NUEwXSB9LCAvLyAyMTUuNTggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDEsIDB4NTgwXSB9ICAvLyAyMDQuODAgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDcsIDB4NTA0XSB9LCAvLyAxNzEuNTYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEEsIDB4MDYsIDB4NTAyXSB9LCAvLyAxNzEuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MDksIDB4MDcsIDB4NEYxXSB9LCAvLyAxNjcuNDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDQsIDB4NEUxXSB9LCAvLyAxNjQuMDUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEEsIDB4MDMsIDB4NEMyXSB9LCAvLyAxNTcuOTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDMsIDB4NEEzXSB9LCAvLyAxNTIuMjMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NDgyXSB9ICAvLyAxNDYuNjEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEUsIDB4MDQsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBDLCAweDA3LCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwQiwgMHgwNiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwNCAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDA3LCAweDZBMF0gfSwgLy8gMzcyLjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBFLCAweDA2LCAweDZBNF0gfSwgLy8gMzc2LjY0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDA2LCAweDZBMF0gfSwgLy8gMzcyLjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBELCAweDAzLCAweDYyMF0gfSwgLy8gMjczLjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAzLCAweDYyNF0gfSwgLy8gMjc1LjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAyLCAweDYyMF0gfSwgLy8gMjczLjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDYxMF0gfSAgLy8gMjY0LjI2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDVBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDA3LCAweDYwMV0gfSwgLy8gMjU2LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDA2LCAweDYwM10gfSwgLy8gMjU3LjUxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDA2LCAweDYwMV0gfSwgLy8gMjU2LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBDLCAweDAzLCAweDU4MV0gfSwgLy8gMjA1LjEyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAzLCAweDU4M10gfSwgLy8gMjA1Ljc2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBCLCAweDAyLCAweDU4Ml0gfSwgLy8gMjA1LjQ0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDU3MV0gfSAgLy8gMjAwLjExIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBELCAweDA2LCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRSwgMHgwNiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDQsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDA0LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwQywgMHgwMywgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwNSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDBBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDAyLCAweDUwMF0gfSwgLy8gMTcwLjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDAzLCAweDU4MF0gfSwgLy8gMjA0LjgwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAzLCAweDU3MF0gfSwgLy8gMTk5LjgwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDU2MF0gfSAgLy8gMTk1LjA1IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEY1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDAyLCAweDQ4Ml0gfSwgLy8gMTQ2LjYxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAzLCAweDUwMV0gfSwgLy8gMTcwLjg5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDAyLCAweDRFMl0gfSwgLy8gMTY0LjI1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA4LCAweDAxLCAweDRDMV0gfSAgLy8gMTU3LjczIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMDYgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGQSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOCwgMHgwMywgMHgyNDddIH0sIC8vIDg5LjQ3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDA2LCAweDAyLCAweDIyNl0gfSwgLy8gODcuNTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDUsIDB4MDIsIDB4MjQ1XSB9LCAvLyA4OS4zNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwNiwgMHgwMywgMHgyMDZdIH0sIC8vIDg1LjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDA4LCAweDAyLCAweDIyNV0gfSwgLy8gODcuNDQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDQsIDB4MDIsIDB4MjA3XSB9ICAvLyA4NS43MiBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDQsIDB4OENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAyLCAweDlDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwNiwgMHg4Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDQsIDB4QUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA3LCAweDlDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwMiwgMHhBQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDA3ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDMsIDB4NkUwXSB9LCAvLyA0NTUuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDQsIDB4NjQwXSB9LCAvLyAyOTIuNTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NjIwXSB9ICAvLyAyNzMuMDcgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDMsIDB4NjgzXSB9LCAvLyAzNDQuMDIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEIsIDB4MDQsIDB4NjAyXSB9LCAvLyAyNTcuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NjAxXSB9ICAvLyAyNTYuNTAgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDMsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBFLCAweDA2LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwMSwgMHg1Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDA4ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEYsIDB4MDYsIDB4NTY1XSB9LCAvLyAxOTYuNTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEUsIDB4MDQsIDB4NTdDXSB9LCAvLyAyMDMuNTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDIsIDB4NTVDXSB9LCAvLyAxOTMuODkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEIsIDB4MDIsIDB4NTNDXSB9ICAvLyAxODUuMTMgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NUEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEQsIDB4MDYsIDB4NTAzXSB9LCAvLyAxNzEuMzQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEIsIDB4MDQsIDB4NTFCXSB9LCAvLyAxNzYuODkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDksIDB4MDIsIDB4NEZBXSB9LCAvLyAxNjkuMzQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4NERCXSB9ICAvLyAxNjIuODIgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEUsIDB4MDYsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBCLCAweDBELCAweDA3LCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwMiwgMHg0Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDA5ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEYsIDB4MDcsIDB4N0EwXSB9LCAvLyAxMzY1LjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDA2LCAweDdBM10gfSwgLy8gMTQwOS4zOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwRiwgMHgwNCwgMHg3QTBdIH0sICAvLyAxMzY1LjMzIEh6XHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QTUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEYsIDB4MDYsIDB4N0Q4XSB9LCAvLyAzMjc2LjgwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAzLCAweDdEN10gfSwgLy8gMzE5Ni44OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwMiwgMHg3RDhdIH0gIC8vIDMyNzYuODAgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MDUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDAsIC0weDA4LCAweDAwMF0gfSwgLy8gNjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDcsIDB4NkExXSB9LCAvLyAzNzMuNDIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MDgsIDB4MDYsIDB4NkEyXSB9LCAvLyAzNzQuNDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MDcsIDB4MDQsIDB4NkExXSB9LCAvLyAzNzMuNDIgSHpcclxuICAgICAgeyBcImR1dHlcIjogMHg1RiB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwNywgMHgwNiwgMHg2RDZdIH0sIC8vIDQzOS44NCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwOCwgMHgwMywgMHg2RDldIH0sIC8vIDQ0NC4zMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQSwgMHgwMiwgMHg2RDddIH0gIC8vIDQ0MS4zMiBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRiwgMHgwMiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDQsIDB4M0VdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA3LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwNSwgMHgzQl0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDQsIDB4M0RdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDA2LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwNCwgMHgzRF0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4M0JdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwQSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBGLCAweDA3LCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDA2LCAweDZFNV0gfSwgLy8gNDYzLjE1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBGLCAweDA0LCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBGLCAweDA2LCAweDZEMF0gfSwgLy8gNDMxLjE2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAzLCAweDZDMF0gfSwgLy8gNDA5LjYwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAyLCAweDZCMF0gfSwgLy8gMzkwLjEwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBBLCAweDAyLCAweDZDOF0gfSAgLy8gNDIwLjEwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDA1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDAwLCAtMHgwOCwgMHgwMDBdIH0sIC8vIDY0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDA3LCAweDZBMV0gfSwgIC8vIDM3My40MiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOCwgMHgwNiwgMHg2QTNdIH0sICAvLyAzNzUuNTYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MDcsIDB4MDQsIDB4NkExXSB9LCAgLy8gMzczLjQyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDA3LCAweDA2LCAweDY5MV0gfSwgIC8vIDM1Ny4xNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwOCwgMHgwMywgMHg2ODJdIH0sICAvLyAzNDMuMTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEEsIDB4MDIsIDB4NjcxXSB9LCAgLy8gMzI4LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDA3LCAweDAyLCAweDY4OV0gfSAgIC8vIDM0OS41MyBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRiwgMHgwMiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDQsIDB4M0VdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDA3LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQywgMHgwNSwgMHgzQl0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEQsIDB4MDQsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBCLCAweDA2LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQSwgMHgwNCwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDksIDB4MDEsIDB4M0NdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwQiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweENDIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAxLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAxLCAweDc4MF0gfSwgLy8gMTAyNC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMSwgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRSwgMHgwMSwgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMSwgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDEsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDEsIDB4NzAxXSB9LCAvLyA1MTQuMDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDEsIDB4NzgyXSB9LCAvLyAxMDQwLjI1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAxLCAweDc0Ml0gfSwgLy8gNjg5Ljg1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDc0MV0gfSAgLy8gNjg2LjI0IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDQ0IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDAwLCAtMHgwOCwgMHgwMDBdIH0sIC8vIDY0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAxLCAweDcwMV0gfSwgLy8gNTE0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAxLCAweDc4Ml0gfSwgLy8gMTA0MC4yNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMSwgMHg3NDFdIH0sIC8vIDY4Ni4yNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRSwgMHgwMSwgMHg3NDFdIH0sIC8vIDY4Ni4yNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMSwgMHg3ODJdIH0sIC8vIDEwNDAuMjUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NzAxXSB9ICAvLyA1MTQuMDEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDAsIC0weDA4LCAweDAwXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwMCwgLTB4MDgsIDB4MDBdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAxLCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQiwgMHgwMSwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDEsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBCLCAweDAxLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwMSwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NENdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwQyAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweENDIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBGLCAweDA1LCAweDYwMF0gfSwgLy8gMjU2LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBELCAweDAyLCAweDYzOF0gfSwgLy8gMjg3LjQ0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBDLCAweDAyLCAweDYzMF0gfSwgLy8gMjgyLjQ4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBDLCAweDAyLCAweDYyOF0gfSwgLy8gMjc3LjY5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBCLCAweDAyLCAweDYyMF0gfSwgLy8gMjczLjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBCLCAweDAyLCAweDYxMF0gfSwgLy8gMjY0LjI2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBBLCAweDAyLCAweDYxOF0gfSwgLy8gMjY4LjU5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBCLCAweDAyLCAweDYxMF0gfSwgLy8gMjY0LjI2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDYyMF0gfSAgLy8gMjczLjA3IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDQ0IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBDLCAweDAzLCAweDVDMF0gfSwgLy8gMjI3LjU2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBCLCAweDAxLCAweDVGOV0gfSwgLy8gMjUyLjU1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBBLCAweDAxLCAweDVGMV0gfSwgLy8gMjQ4LjcxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBBLCAweDAxLCAweDVFOV0gfSwgLy8gMjQ0Ljk5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA5LCAweDAxLCAweDVFMV0gfSwgLy8gMjQxLjM4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA5LCAweDAxLCAweDVEOV0gfSwgLy8gMjM3Ljg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA4LCAweDAxLCAweDVEMV0gfSwgLy8gMjM0LjQ4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA5LCAweDAxLCAweDVEOV0gfSwgLy8gMjM3Ljg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDVFMV0gfSAgLy8gMjQxLjM4IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMEQgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHg4OCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRiwgMHgwMiwgMHg2NTBdIH0sIC8vIDMwMy40MSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwRCwgMHgwMSwgMHg2NjBdIH0sIC8vIDMxNS4wOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRSwgMHgwMiwgMHg2MTJdIH0sIC8vIDI2NS4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwQywgMHgwMSwgMHg2MjJdIH0sIC8vIDI3NC4yMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRiwgMHgwMiwgMHg2MTBdIH0sIC8vIDI2NC4yNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwMSwgMHg2MjBdIH0sIC8vIDI3My4wNyBIelxyXG4gICAgICB7IFwiZHV0eVwiOiAweDg4IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDY1MF0gfSwgLy8gMzAzLjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBELCAweDAxLCAweDY2MF0gfSwgLy8gMzE1LjA4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBFLCAweDAyLCAweDYxMl0gfSwgLy8gMjY1LjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBDLCAweDAxLCAweDYyMl0gfSwgLy8gMjc0LjIxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDYxMF0gfSwgLy8gMjY0LjI2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAxLCAweDYyMF0gfSAgLy8gMjczLjA3IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDQwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDAwLCAtMHgwOCwgMHgwMDBdIH0sIC8vIDY0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDY1MV0gfSwgLy8gMzA0LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBELCAweDAxLCAweDY2MV0gfSwgLy8gMzE1Ljg0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBFLCAweDAyLCAweDYxNF0gfSwgLy8gMjY2LjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDYyNF0gfSwgLy8gMjc1LjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDYxMV0gfSwgLy8gMjY0Ljc5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBELCAweDAxLCAweDYyMV0gfSwgLy8gMjczLjY0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBFLCAweDAyLCAweDYxNF0gfSwgLy8gMjY2LjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDYyNF0gfSwgLy8gMjc1LjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDYxMV0gfSwgLy8gMjY0Ljc5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAxLCAweDYyMV0gfSAgLy8gMjczLjY0IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAyLCAweDFDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwQiwgMHgwMSwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDIsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBCLCAweDAxLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwMiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEEsIDB4MDIsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBDLCAweDAyLCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQSwgMHgwMSwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEMsIDB4MDIsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBBLCAweDAxLCAweDNDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMEUgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhBNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRSwgMHgwMSwgMHg3MDBdIH0sIC8vIDUxMi4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMiwgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDksIDB4MDIsIDB4NzQwXSB9LCAvLyA2ODIuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDEsIDB4NjAwXSB9ICAvLyAyNTYuMDAgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDEsIDB4NkUxXSB9LCAvLyA0NTYuNzAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDIsIDB4NkUxXSB9LCAvLyA0NTYuNzAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MDYsIDB4MDIsIDB4NjgxXSB9LCAvLyAzNDIuMjIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NUUxXSB9ICAvLyAyNDEuMzggSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDYsIDB4MDEsIDB4MzJdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA2LCAweDAxLCAweDIxXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwNiwgMHgwMSwgMHgxMV0gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDBGICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDcsIDB4N0MwXSB9LCAvLyAyMDQ4LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBFLCAweDA2LCAweDdDMl0gfSwgLy8gMjExNC4wNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwNSwgMHg2ODBdIH0sIC8vIDM0MS4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwNCwgMHg2NzBdIH0sIC8vIDMyNy42OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQiwgMHgwNSwgMHg2NjBdIH0sIC8vIDMxNS4wOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHg2NDBdIH0gIC8vIDI5Mi41NyBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhDQyB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwNywgMHg3ODFdIH0sIC8vIDEwMzIuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEIsIDB4MDYsIDB4NzgwXSB9LCAvLyAxMDI0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBBLCAweDA1LCAweDY0MV0gfSwgLy8gMjkzLjIzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDA0LCAweDYzMl0gfSwgLy8gMjgzLjcxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDA1LCAweDYyMV0gfSwgLy8gMjczLjY0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDYwMl0gfSAgLy8gMjU3LjAwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDA0LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRCwgMHgwNiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDQsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDA3LCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwMiwgMHg1RF0gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDEwICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QzkgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEYsIDB4MDcsIDB4NjgwXSB9LCAvLyAzNDEuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEYsIDB4MDcsIDB4NjYwXSB9LCAvLyAzMTUuMDggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEUsIDB4MDcsIDB4NjQwXSB9LCAvLyAyOTIuNTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEUsIDB4MDcsIDB4NjIwXSB9LCAvLyAyNzMuMDcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDEsIDB4NjAwXSB9LCAvLyAyNTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDcsIDB4NzQwXSB9LCAvLyA2ODIuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEEsIDB4MDcsIDB4NzMwXSB9LCAvLyA2MzAuMTUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDksIDB4MDEsIDB4NzIwXSB9ICAvLyA1ODUuMTQgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NzkgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEUsIDB4MDcsIDB4NjgyXSB9LCAvLyAzNDMuMTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEUsIDB4MDcsIDB4NjYyXSB9LCAvLyAzMTYuNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEQsIDB4MDcsIDB4NjQyXSB9LCAvLyAyOTMuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEQsIDB4MDcsIDB4NjIyXSB9LCAvLyAyNzQuMjEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDEsIDB4NjAyXSB9LCAvLyAyNTcuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDcsIDB4NzQyXSB9LCAvLyA2ODkuODUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDksIDB4MDcsIDB4NzMyXSB9LCAvLyA2MzYuMjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDgsIDB4MDEsIDB4NzIyXSB9ICAvLyA1OTAuNDEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDcsIDB4MDQsIDB4MjFdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDA3LCAweDA0LCAweDEwXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwNywgMHgwMSwgMHgyMF0gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDExICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEYsIDB4MDcsIDB4N0EwXSB9LCAvLyAxMzY1LjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBFLCAweDA2LCAweDdBNF0gfSwgLy8gMTQyNC43MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwNiwgMHg3QTBdIH0sIC8vIDEzNjUuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDMsIDB4NzIwXSB9LCAvLyA1ODUuMTQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDMsIDB4NzIzXSB9LCAvLyA1OTMuMDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEMsIDB4MDIsIDB4NzI4XSB9LCAvLyA2MDYuODEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NzMwXSB9ICAvLyA2MzAuMTUgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDAsIC0weDA4LCAweDAwXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQSwgMHgwNywgMHg3NDFdIH0sIC8vIDY4Ni4yNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOCwgMHgwNiwgMHg3NDNdIH0sIC8vIDY5My41MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwNywgMHgwNiwgMHg3NDFdIH0sIC8vIDY4Ni4yNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwOCwgMHgwMywgMHg2QzJdIH0sIC8vIDQxMi4xOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwNywgMHgwMywgMHg2QzFdIH0sIC8vIDQxMC44OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwOCwgMHgwMiwgMHg2Q0NdIH0sIC8vIDQyNS41NiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwNywgMHgwMSwgMHg2RDhdIH0gIC8vIDQ0Mi44MSBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRiwgMHgwMiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDYsIDB4M0FdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDA3LCAweDNBXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwNiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDUsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBELCAweDAyLCAweDNEXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHgyQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDEyICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QTUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEYsIDB4MDIsIDB4NDQwXSB9LCAvLyAxMzYuNTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDMsIDB4NEEwXSB9LCAvLyAxNTEuNzAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDIsIDB4NDkwXSB9LCAvLyAxNDguOTUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NDgwXSB9ICAvLyAxNDYuMjkgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RUUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEIsIDB4MEQsIDB4MDIsIDB4NDM4XSB9LCAvLyAxMzUuNDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEMsIDB4MDYsIDB4NDk4XSB9LCAvLyAxNTAuMzEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEIsIDB4MDIsIDB4NDg4XSB9LCAvLyAxNDcuNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NDc4XSB9ICAvLyAxNDQuOTkgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEUsIDB4MDYsIDB4NkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDAyLCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwMiwgMHg2Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxMyAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDMzIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBGLCAweDA2LCAweDVDMF0gfSwgLy8gMjI3LjU2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBFLCAweDAzLCAweDVCQ10gfSwgLy8gMjI1Ljk5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAyLCAweDVEMF0gfSwgLy8gMjM0LjA2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDAyLCAweDVFMF0gfSwgLy8gMjQwLjk0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDAyLCAweDVGMF0gfSwgLy8gMjQ4LjI0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDYwMF0gfSAgLy8gMjU2LjAwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDk5IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBDLCAweDA2LCAweDRCMV0gfSwgLy8gMTU0Ljc1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBDLCAweDAzLCAweDRBRF0gfSwgLy8gMTU0LjAyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBCLCAweDAyLCAweDRDMV0gfSwgLy8gMTU3LjczIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAyLCAweDREMV0gfSwgLy8gMTYwLjgyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBBLCAweDAyLCAweDRFMV0gfSwgLy8gMTY0LjA1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDRGMV0gfSAgLy8gMTY3LjQwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBFLCAweDA2LCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwRCwgMHgwNiwgMHg2Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDIsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAzLCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwMywgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxNCAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBFLCAweDA0LCAweDc5MF0gfSwgLy8gMTE3MC4yOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwNSwgMHg3QzBdIH0sIC8vIDIwNDguMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4N0Q4XSB9ICAvLyAzMjc2LjgwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEE1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBDLCAweDA0LCAweDc3MV0gfSwgLy8gOTE2LjU5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBCLCAweDA2LCAweDdBMl0gfSwgLy8gMTM5NC4zOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQSwgMHgwMSwgMHg3QjddIH0gIC8vIDE3OTUuNTEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDQsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBDLCAweDA0LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHgyQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDE1ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDMsIDB4NzgwXSB9LCAvLyAxMDI0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBFLCAweDA3LCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAzLCAweDcxMF0gfSwgLy8gNTQ2LjEzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAyLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAyLCAweDZGMF0gfSwgLy8gNDgxLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDZFMF0gfSAgLy8gNDU1LjExIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDVBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDAzLCAweDcwMV0gfSwgLy8gNTE0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBCLCAweDA3LCAweDY4MV0gfSwgLy8gMzQyLjIyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBCLCAweDAzLCAweDY5Ml0gfSwgLy8gMzU4LjEyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAyLCAweDY4MV0gfSwgLy8gMzQyLjIyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBCLCAweDAyLCAweDY3Ml0gfSwgLy8gMzI5LjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDY2MV0gfSAgLy8gMzE1Ljg0IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDAzLCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwRCwgMHgwNiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDYsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBCLCAweDAzLCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQSwgMHgwMiwgMHg1Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NkNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxNiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA3LCAweDc4MF0gfSwgLy8gMTAyNC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRSwgMHgwNiwgMHg3QTBdIH0sIC8vIDEzNjUuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDIsIDB4NzQwXSB9ICAvLyA2ODIuNjcgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NUEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDcsIDB4NzUzXSB9LCAvLyA3NTcuNjQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEIsIDB4MDYsIDB4NzcyXSB9LCAvLyA5MjMuMDQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDIsIDB4NzExXSB9ICAvLyA1NDguNDIgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEQsIDB4MEYsIDB4MDYsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDA2LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwMiwgMHg0Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDE3ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEYgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEYsIDB4MDcsIDB4NTAwXSB9LCAvLyAxNzAuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDcsIDB4NTA4XSB9LCAvLyAxNzIuNDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDQsIDB4NDgwXSB9LCAvLyAxNDYuMjkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4NDYwXSB9ICAvLyAxNDEuMjQgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NDQgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEQsIDB4MDcsIDB4NDgxXSB9LCAvLyAxNDYuNDUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEMsIDB4MDcsIDB4NDg5XSB9LCAvLyAxNDcuNzcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEIsIDB4MDQsIDB4NDAxXSB9LCAvLyAxMjguMTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDIsIDB4M0UxXSB9ICAvLyAxMjQuMjQgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEYsIDB4MDcsIDB4N0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBGLCAweDA2LCAweDZDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwRSwgMHgwNCwgMHg3Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDIsIDB4NkNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxOCAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDUwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBGLCAweDA1LCAweDY4MF0gfSwgLy8gMzQxLjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAyLCAweDZBMF0gfSwgLy8gMzcyLjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBGLCAweDAyLCAweDZDMF0gfSwgLy8gNDA5LjYwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAyLCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBELCAweDAyLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBDLCAweDAyLCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBELCAweDAyLCAweDZDMF0gfSwgLy8gNDA5LjYwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDZBMF0gfSAgLy8gMzcyLjM2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDBGIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBELCAweDA1LCAweDYzMV0gfSwgLy8gMjgzLjA5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBELCAweDAyLCAweDY1Ml0gfSwgLy8gMzA0LjgyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAyLCAweDY3MV0gfSwgLy8gMzI4LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBCLCAweDAyLCAweDY5MV0gfSwgLy8gMzU3LjE0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBDLCAweDAyLCAweDZCMl0gfSwgLy8gMzkyLjQzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBCLCAweDAyLCAweDY5MV0gfSwgLy8gMzU3LjE0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBDLCAweDAyLCAweDY3MV0gfSwgLy8gMzI4LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDY1MV0gfSAgLy8gMzA0LjExIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDAzLCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwMywgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDQsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDA0LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwNCwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4MkNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxOSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDFCIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBELCAweDAyLCAweDc0MF0gfSwgLy8gNjgyLjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBFLCAweDA1LCAweDc2MF0gfSwgLy8gODE5LjIwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBDLCAweDAxLCAweDczMF0gfSAgLy8gNjMwLjE1IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDgxIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBDLCAweDAyLCAweDcwMV0gfSwgLy8gNTE0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAyLCAweDcwOF0gfSwgLy8gNTI4LjUyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA3LCAweDc0MV0gfSwgLy8gNjg2LjI0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBBLCAweDAyLCAweDcwMV0gfSAgLy8gNTE0LjAxIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMUEgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRiwgMHgwNywgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRSwgMHgwNiwgMHg3NDRdIH0sIC8vIDY5Ny4xOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwNSwgMHg3NTBdIH0sIC8vIDc0NC43MyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwMywgMHg3NjBdIH0sIC8vIDgxOS4yMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwMywgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4N0EwXSB9ICAvLyAxMzY1LjMzIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDBBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDA3LCAweDcwMV0gfSwgLy8gNTE0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBCLCAweDBCLCAweDA2LCAweDcwMl0gfSwgLy8gNTE2LjAzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBBLCAweDA1LCAweDcxMV0gfSwgLy8gNTQ4LjQyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDA5LCAweDAzLCAweDcyMV0gfSwgLy8gNTg3Ljc3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAzLCAweDc0MV0gfSwgLy8gNjg2LjI0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDc2Ml0gfSAgLy8gODI5LjU3IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAyLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwNiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDQsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBDLCAweDA3LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRSwgMHgwMiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4MkNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxQiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBGLCAweDA3LCAweDZDMF0gfSwgLy8gNDA5LjYwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBFLCAweDA3LCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDA0LCAweDZGMF0gfSwgLy8gNDgxLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDA0LCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDZEMF0gfSAgLy8gNDMxLjE2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDBBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBFLCAweDA2LCAweDY4MV0gfSwgLy8gMzQyLjIyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBELCAweDA1LCAweDZDMV0gfSwgLy8gNDEwLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDA0LCAweDZCMV0gfSwgLy8gMzkxLjI2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDA0LCAweDZBMV0gfSwgLy8gMzczLjQyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDY5MV0gfSAgLy8gMzU3LjE0IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBBLCAweDA2LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwOSwgMHgwNCwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEEsIDB4MDMsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDJDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMUMgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwRCwgMHgwNiwgMHg3RTFdIH0sIC8vIDQyMjguMTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDYsIDB4N0UyXSB9LCAvLyA0MzY5LjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBELCAweDA2LCAweDdFMV0gfSwgLy8gNDIyOC4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwQywgMHgwNiwgMHg3RTBdIH0sIC8vIDQwOTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEIsIDB4MDYsIDB4N0UyXSB9LCAvLyA0MzY5LjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBDLCAweDA2LCAweDdFMV0gfSwgLy8gNDIyOC4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwNiwgMHg3RTBdIH0sIC8vIDQwOTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4N0RGXSB9ICAvLyAzOTcxLjg4IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDQ0IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDAzLCAweDdDOV0gfSwgLy8gMjM4My4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwMywgMHg3QzddIH0sIC8vIDIyOTkuNTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEMsIDB4MDQsIDB4N0MzXSB9LCAvLyAyMTQ4LjcyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDA0LCAweDdDN10gfSwgLy8gMjI5OS41MSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwMywgMHg3QzldIH0sIC8vIDIzODMuMTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4N0M1XSB9ICAvLyAyMjIxLjU2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBELCAweDAxLCAtMHgwMSwgMHg3Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEQsIDB4MEYsIDB4MDcsIDB4OENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBELCAweDA2LCAweDdDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwNCwgMHg2Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEIsIDB4MDMsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxRCAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEY0IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBGLCAweDAwLCAweDcwNV0gfSwgLy8gNTIyLjIwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBFLCAweDAwLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDA0LCAweDcxMF0gfSwgLy8gNTQ2LjEzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAzLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDAyLCAweDYyMF0gfSwgLy8gMjczLjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDYyNF0gfSAgLy8gMjc1LjM2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDIyIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBCLCAweDAwLCAweDZDM10gfSwgLy8gNDEzLjQ4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBBLCAweDAwLCAweDZDMV0gfSwgLy8gNDEwLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDA4LCAweDA0LCAweDZEMl0gfSwgLy8gNDM0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDA5LCAweDAzLCAweDZDMV0gfSwgLy8gNDEwLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDA4LCAweDAyLCAweDVFMV0gfSwgLy8gMjQxLjM4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA2LCAweDAxLCAweDVFOF0gfSAgLy8gMjQ0LjU0IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDA2LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRCwgMHgwNiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEMsIDB4MDUsIDB4NEFdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAxLCAweDBCLCAweDAyLCAweDVCXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwMiwgMHg0Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDFFICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEYsIDB4MDIsIDB4NjAwXSB9LCAvLyAyNTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDIsIDB4NjQwXSB9LCAvLyAyOTIuNTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDIsIDB4NjgwXSB9LCAvLyAzNDEuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDIsIDB4NkMwXSB9LCAvLyA0MDkuNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDIsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDIsIDB4NzQwXSB9LCAvLyA2ODIuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEIsIDB4MDIsIDB4NzgwXSB9LCAvLyAxMDI0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDdDMF0gfSAgLy8gMjA0OC4wMCBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgxMSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwMCwgLTB4MDgsIDB4MDAxXSB9LCAvLyA2NC4wMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwMiwgMHg1QzFdIH0sIC8vIDIyNy45NSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwMiwgMHg2MDJdIH0sIC8vIDI1Ny4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQSwgMHgwMiwgMHg2NDFdIH0sIC8vIDI5My4yMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwMiwgMHg2ODJdIH0sIC8vIDM0My4xMiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQSwgMHgwMiwgMHg2QzJdIH0sIC8vIDQxMi4xOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOSwgMHgwMiwgMHg3MDFdIH0sIC8vIDUxNC4wMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQSwgMHgwMiwgMHg3NDJdIH0sIC8vIDY4OS44NSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOCwgMHgwMSwgMHg3ODFdIH0gIC8vIDEwMzIuMDYgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MDAsIC0weDA4LCAweDAxXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRSwgMHgwMiwgMHg1Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEMsIDB4MDIsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBELCAweDAyLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQiwgMHgwMiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEMsIDB4MDIsIDB4MUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBBLCAweDAyLCAweDFCXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwOSwgMHgwMiwgMHgxQV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDgsIDB4MDEsIDB4MThdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxRiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEE1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBGLCAweDA0LCAweDY0MV0gfSwgLy8gMjkzLjIzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBELCAweDBELCAweDA2LCAweDcyMV0gfSwgLy8gNTg3Ljc3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBGLCAweDA0LCAweDcxOV0gfSwgLy8gNTY3LjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDcxQV0gfSAgLy8gNTY5Ljg4IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweENDIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDA0LCAweDU4MF0gfSwgLy8gMjA0LjgwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBFLCAweDA2LCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDA1LCAweDZEOF0gfSwgLy8gNDQyLjgxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDZEQ10gfSAgLy8gNDQ4Ljg4IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBDLCAweDA0LCAweDQ2XSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwQSwgMHgwNSwgMHg0NF0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDQsIDB4NDVdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDQ0XSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMjAgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwRiwgMHgwMSwgMHg1MTFdIH0sIC8vIDE3NC41MyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwRSwgMHgwMSwgMHg1MTVdIH0sIC8vIDE3NS40NiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwRSwgMHgwMSwgMHg1MTFdIH0sIC8vIDE3NC41MyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg1MTFdIH0gIC8vIDE3NC41MyBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgxNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRSwgMHgwMSwgMHg1MENdIH0sIC8vIDE3My4zOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRCwgMHgwMSwgMHg1MTBdIH0sIC8vIDE3NC4zMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwQywgMHgwMSwgMHg1MENdIH0sIC8vIDE3My4zOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHg1MEFdIH0gIC8vIDE3Mi45MiBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwRiwgMHgwMiwgMHg2NV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEQsIDB4MEUsIDB4MDIsIDB4NTVdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBELCAweDAyLCAweDU2XSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg2Nl0gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDIxICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MUIgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEYsIDB4MDMsIDB4NTY0XSB9LCAvLyAxOTYuMjIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEUsIDB4MDIsIDB4NTQ0XSB9LCAvLyAxODcuMjUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDEsIDB4NTIyXSB9LCAvLyAxNzguNTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEIsIDB4MDIsIDB4NDg0XSB9LCAvLyAxNDYuOTQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NEEyXSB9LCAvLyAxNTIuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEYsIDB4MDMsIDB4NTI0XSB9LCAvLyAxNzkuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDQsIDB4NEU0XSB9LCAvLyAxNjQuNjYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NTAyXSB9ICAvLyAxNzEuMTEgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4Q0MgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEQsIDB4MDMsIDB4NTYwXSB9LCAvLyAxOTUuMDUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEMsIDB4MDIsIDB4NTQwXSB9LCAvLyAxODYuMTggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEMsIDB4MDEsIDB4NTIwXSB9LCAvLyAxNzguMDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDksIDB4MDIsIDB4NDgwXSB9LCAvLyAxNDYuMjkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NEEwXSB9LCAvLyAxNTEuNzAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEQsIDB4MDMsIDB4NTIwXSB9LCAvLyAxNzguMDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDQsIDB4NEUwXSB9LCAvLyAxNjMuODQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NTAwXSB9ICAvLyAxNzAuNjcgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtdXHJcbiAgfSwgeyAvLyAkMjIgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgxMSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwMywgLTB4MDUsIDB4MzgxXSB9LCAvLyAxMTMuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEYsIDB4MDUsIDB4NjAxXSB9LCAgLy8gMjU2LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAxLCAweDBDLCAweDAyLCAweDQ4MV0gfSwgIC8vIDE0Ni40NSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOSwgMHgwMSwgMHgzODFdIH0gICAvLyAxMTMuODggSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RUUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDMsIC0weDA2LCAweDVCMF0gfSwgLy8gMjIxLjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBELCAweDA1LCAweDc1RF0gfSwgIC8vIDgwNC4xMiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMSwgMHgwQiwgMHgwMiwgMHg2QjBdIH0sICAvLyAzOTAuMTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDYsIDB4MDEsIDB4NUIwXSB9ICAgLy8gMjIxLjQxIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA5LCAweDAyLCAweDQ5XSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwQiwgMHgwNSwgMHgyOV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEEsIDB4MDIsIDB4MzldIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDQ5XSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMjMgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwNywgMHg3QzBdIH0sIC8vIDIwNDguMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDQsIDB4N0MxXSB9LCAvLyAyMDgwLjUxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBGLCAweDA2LCAweDdDMF0gfSwgLy8gMjA0OC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMywgMHg3QzJdIH0sIC8vIDIxMTQuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4N0MwXSB9ICAvLyAyMDQ4LjAwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDVGIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDA5LCAweDA3LCAweDc4MV0gfSwgLy8gMTAzMi4wNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOCwgMHgwNCwgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MDksIDB4MDYsIDB4NzgxXSB9LCAvLyAxMDMyLjA2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDA4LCAweDAzLCAweDc4MV0gfSAgLy8gMTAzMi4wNiBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwRiwgMHgwMiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEQsIDB4MEUsIDB4MDYsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA3LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHgyQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDI0ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEYsIDB4MDcsIDB4NjgwXSB9LCAvLyAzNDEuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEUsIDB4MDYsIDB4Njg0XSB9LCAvLyAzNDQuOTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDcsIDB4NjkwXSB9LCAvLyAzNTYuMTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDUsIDB4NjkwXSB9LCAvLyAzNTYuMTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDQsIDB4Njg4XSB9LCAvLyAzNDguNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDMsIDB4NjcwXSB9LCAvLyAzMjcuNjggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDMsIDB4NjYwXSB9LCAvLyAzMTUuMDggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NjQwXSB9ICAvLyAyOTIuNTcgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MDUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEIsIDB4MDcsIDB4NjQxXSB9LCAvLyAyOTMuMjMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MDksIDB4MDYsIDB4NjQyXSB9LCAvLyAyOTMuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDcsIDB4NjUxXSB9LCAvLyAzMDQuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDUsIDB4NjUxXSB9LCAvLyAzMDQuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MDksIDB4MDQsIDB4NjQ3XSB9LCAvLyAyOTcuMjIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEEsIDB4MDMsIDB4NjMxXSB9LCAvLyAyODMuMDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDksIDB4MDMsIDB4NjIyXSB9LCAvLyAyNzQuMjEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDcsIDB4MDEsIDB4NjAxXSB9ICAvLyAyNTYuNTAgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDQsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBDLCAweDA3LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwQywgMHgwNywgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEIsIDB4MDcsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBBLCAweDAyLCAweDVDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMjUgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhBNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRiwgMHgwNCwgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRSwgMHgwMywgMHg3MzBdIH0sIC8vIDYzMC4xNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwNCwgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQiwgMHgwMywgMHg3NDhdIH0sIC8vIDcxMi4zNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg3NTBdIH0gIC8vIDc0NC43MyBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHg3NyB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwMywgMHg3MTJdIH0sIC8vIDU1MC43MiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQiwgMHgwMywgMHg3MDRdIH0sIC8vIDUyMC4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwMywgMHg3MTJdIH0sIC8vIDU1MC43MiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwMywgMHg3MjFdIH0sIC8vIDU4Ny43NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwMSwgMHg3MzJdIH0gIC8vIDYzNi4yNyBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwNiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEMsIDB4MDYsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBCLCAweDA2LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOSwgMHgwMSwgMHgxQ10gfVxyXG4gICAgXVxyXG4gIH1cclxuXSBhcyBDcnlUeXBlW107IiwiaW1wb3J0IFBva2Vtb24gZnJvbSBcIi4uL1Bva2Vtb25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuICB7IG5hbWU6IFwiQnVsYmFzYXVyXCIsIGNyeTogMHgwRiwgcGl0Y2g6IDB4ODAsIGxlbmd0aDogMHgxIH0sXHJcbiAgeyBuYW1lOiBcIkl2eXNhdXJcIiwgY3J5OiAweDBGLCBwaXRjaDogMHgyMCwgbGVuZ3RoOiAweDgwIH0sXHJcbiAgeyBuYW1lOiBcIlZlbnVzYXVyXCIsIGNyeTogMHgwRiwgcGl0Y2g6IDB4MCwgbGVuZ3RoOiAweEMwIH0sXHJcbiAgeyBuYW1lOiBcIkNoYXJtYW5kZXJcIiwgY3J5OiAweDQsIHBpdGNoOiAweDYwLCBsZW5ndGg6IDB4NDAgfSxcclxuICB7IG5hbWU6IFwiQ2hhcm1lbGVvblwiLCBjcnk6IDB4NCwgcGl0Y2g6IDB4MjAsIGxlbmd0aDogMHg0MCB9LFxyXG4gIHsgbmFtZTogXCJDaGFyaXphcmRcIiwgY3J5OiAweDQsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJTcXVpcnRsZVwiLCBjcnk6IDB4MUQsIHBpdGNoOiAweDYwLCBsZW5ndGg6IDB4NDAgfSxcclxuICB7IG5hbWU6IFwiV2FydG9ydGxlXCIsIGNyeTogMHgxRCwgcGl0Y2g6IDB4MjAsIGxlbmd0aDogMHg0MCB9LFxyXG4gIHsgbmFtZTogXCJCbGFzdG9pc2VcIiwgY3J5OiAweDEzLCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiQ2F0ZXJwaWVcIiwgY3J5OiAweDE2LCBwaXRjaDogMHg4MCwgbGVuZ3RoOiAweDIwIH0sXHJcbiAgeyBuYW1lOiBcIk1ldGFwb2RcIiwgY3J5OiAweDFDLCBwaXRjaDogMHhDQywgbGVuZ3RoOiAweDEgfSxcclxuICB7IG5hbWU6IFwiQnV0dGVyZnJlZVwiLCBjcnk6IDB4MTYsIHBpdGNoOiAweDc3LCBsZW5ndGg6IDB4NDAgfSxcclxuICB7IG5hbWU6IFwiV2VlZGxlXCIsIGNyeTogMHgxNSwgcGl0Y2g6IDB4RUUsIGxlbmd0aDogMHgxIH0sXHJcbiAgeyBuYW1lOiBcIktha3VuYVwiLCBjcnk6IDB4MTMsIHBpdGNoOiAweEZGLCBsZW5ndGg6IDB4MSB9LFxyXG4gIHsgbmFtZTogXCJCZWVkcmlsbFwiLCBjcnk6IDB4MTMsIHBpdGNoOiAweDYwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiUGlkZ2V5XCIsIGNyeTogMHgwRSwgcGl0Y2g6IDB4REYsIGxlbmd0aDogMHg0IH0sXHJcbiAgeyBuYW1lOiBcIlBpZGdlb3R0b1wiLCBjcnk6IDB4MTQsIHBpdGNoOiAweDI4LCBsZW5ndGg6IDB4QzAgfSxcclxuICB7IG5hbWU6IFwiUGlkZ2VvdFwiLCBjcnk6IDB4MTQsIHBpdGNoOiAweDExLCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiUmF0dGF0YVwiLCBjcnk6IDB4MjIsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJSYXRpY2F0ZVwiLCBjcnk6IDB4MjIsIHBpdGNoOiAweDIwLCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiU3BlYXJvd1wiLCBjcnk6IDB4MTAsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJGZWFyb3dcIiwgY3J5OiAweDE4LCBwaXRjaDogMHg0MCwgbGVuZ3RoOiAweEEwIH0sXHJcbiAgeyBuYW1lOiBcIkVrYW5zXCIsIGNyeTogMHgxNywgcGl0Y2g6IDB4MTIsIGxlbmd0aDogMHg0MCB9LFxyXG4gIHsgbmFtZTogXCJBcmJva1wiLCBjcnk6IDB4MTcsIHBpdGNoOiAweEUwLCBsZW5ndGg6IDB4MTAgfSxcclxuICB7IG5hbWU6IFwiUGlrYWNodVwiLCBjcnk6IDB4MEYsIHBpdGNoOiAweEVFLCBsZW5ndGg6IDB4MSB9LFxyXG4gIHsgbmFtZTogXCJSYWljaHVcIiwgY3J5OiAweDksIHBpdGNoOiAweEVFLCBsZW5ndGg6IDB4OCB9LFxyXG4gIHsgbmFtZTogXCJTYW5kc2hyZXdcIiwgY3J5OiAweDAsIHBpdGNoOiAweDIwLCBsZW5ndGg6IDB4NDAgfSxcclxuICB7IG5hbWU6IFwiU2FuZHNsYXNoXCIsIGNyeTogMHgwLCBwaXRjaDogMHhGRiwgbGVuZ3RoOiAweEZGIH0sXHJcbiAgeyBuYW1lOiBcIk5pZG9yYW4mZmVtYWxlO1wiLCBjcnk6IDB4MSwgcGl0Y2g6IDB4MCwgbGVuZ3RoOiAweDgwIH0sXHJcbiAgeyBuYW1lOiBcIk5pZG9yaW5hXCIsIGNyeTogMHgxLCBwaXRjaDogMHgyQywgbGVuZ3RoOiAweEUwIH0sXHJcbiAgeyBuYW1lOiBcIk5pZG9xdWVlblwiLCBjcnk6IDB4MEEsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJOaWRvcmFuJm1hbGU7XCIsIGNyeTogMHgwLCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiTmlkb3Jpbm9cIiwgY3J5OiAweDAsIHBpdGNoOiAweDJDLCBsZW5ndGg6IDB4QzAgfSxcclxuICB7IG5hbWU6IFwiTmlkb2tpbmdcIiwgY3J5OiAweDksIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJDbGVmYWlyeVwiLCBjcnk6IDB4MTksIHBpdGNoOiAweENDLCBsZW5ndGg6IDB4MSB9LFxyXG4gIHsgbmFtZTogXCJDbGVmYWJsZVwiLCBjcnk6IDB4MTksIHBpdGNoOiAweEFBLCBsZW5ndGg6IDB4MjAgfSxcclxuICB7IG5hbWU6IFwiVnVscGl4XCIsIGNyeTogMHgyNCwgcGl0Y2g6IDB4NEYsIGxlbmd0aDogMHgxMCB9LFxyXG4gIHsgbmFtZTogXCJOaW5ldGFsZXNcIiwgY3J5OiAweDI0LCBwaXRjaDogMHg4OCwgbGVuZ3RoOiAweDYwIH0sXHJcbiAgeyBuYW1lOiBcIkppZ2dseXB1ZmZcIiwgY3J5OiAweDBFLCBwaXRjaDogMHhGRiwgbGVuZ3RoOiAweDM1IH0sXHJcbiAgeyBuYW1lOiBcIldpZ2dseXR1ZmZcIiwgY3J5OiAweDBFLCBwaXRjaDogMHg2OCwgbGVuZ3RoOiAweDYwIH0sXHJcbiAgeyBuYW1lOiBcIlp1YmF0XCIsIGNyeTogMHgxRCwgcGl0Y2g6IDB4RTAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJHb2xiYXRcIiwgY3J5OiAweDFELCBwaXRjaDogMHhGQSwgbGVuZ3RoOiAweDgwIH0sXHJcbiAgeyBuYW1lOiBcIk9kZGlzaFwiLCBjcnk6IDB4OCwgcGl0Y2g6IDB4REQsIGxlbmd0aDogMHgxIH0sXHJcbiAgeyBuYW1lOiBcIkdsb29tXCIsIGNyeTogMHg4LCBwaXRjaDogMHhBQSwgbGVuZ3RoOiAweDQwIH0sXHJcbiAgeyBuYW1lOiBcIlZpbGVwbHVtZVwiLCBjcnk6IDB4MjMsIHBpdGNoOiAweDIyLCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiUGFyYXNcIiwgY3J5OiAweDFFLCBwaXRjaDogMHgyMCwgbGVuZ3RoOiAweEUwIH0sXHJcbiAgeyBuYW1lOiBcIlBhcmFzZWN0XCIsIGNyeTogMHgxRSwgcGl0Y2g6IDB4NDIsIGxlbmd0aDogMHhGRiB9LFxyXG4gIHsgbmFtZTogXCJWZW5vbmF0XCIsIGNyeTogMHgxQSwgcGl0Y2g6IDB4NDQsIGxlbmd0aDogMHg0MCB9LFxyXG4gIHsgbmFtZTogXCJWZW5vbW90aFwiLCBjcnk6IDB4MUEsIHBpdGNoOiAweDI5LCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiRGlnbGV0dFwiLCBjcnk6IDB4MEIsIHBpdGNoOiAweEFBLCBsZW5ndGg6IDB4MSB9LFxyXG4gIHsgbmFtZTogXCJEdWd0cmlvXCIsIGNyeTogMHgwQiwgcGl0Y2g6IDB4MkEsIGxlbmd0aDogMHgxMCB9LFxyXG4gIHsgbmFtZTogXCJNZW93dGhcIiwgY3J5OiAweDE5LCBwaXRjaDogMHg3NywgbGVuZ3RoOiAweDEwIH0sXHJcbiAgeyBuYW1lOiBcIlBlcnNpYW5cIiwgY3J5OiAweDE5LCBwaXRjaDogMHg5OSwgbGVuZ3RoOiAweEZGIH0sXHJcbiAgeyBuYW1lOiBcIlBzeWR1Y2tcIiwgY3J5OiAweDIxLCBwaXRjaDogMHgyMCwgbGVuZ3RoOiAweDYwIH0sXHJcbiAgeyBuYW1lOiBcIkdvbGR1Y2tcIiwgY3J5OiAweDIxLCBwaXRjaDogMHhGRiwgbGVuZ3RoOiAweDQwIH0sXHJcbiAgeyBuYW1lOiBcIk1hbmtleVwiLCBjcnk6IDB4MEEsIHBpdGNoOiAweERELCBsZW5ndGg6IDB4NjAgfSxcclxuICB7IG5hbWU6IFwiUHJpbWVhcGVcIiwgY3J5OiAweDBBLCBwaXRjaDogMHhBRiwgbGVuZ3RoOiAweDQwIH0sXHJcbiAgeyBuYW1lOiBcIkdyb3dsaXRoZVwiLCBjcnk6IDB4MUYsIHBpdGNoOiAweDIwLCBsZW5ndGg6IDB4NDAgfSxcclxuICB7IG5hbWU6IFwiQXJjYW5pbmVcIiwgY3J5OiAweDE1LCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiUG9saXdhZ1wiLCBjcnk6IDB4MEUsIHBpdGNoOiAweEZGLCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiUG9saXdoaXJsXCIsIGNyeTogMHgwRSwgcGl0Y2g6IDB4NzcsIGxlbmd0aDogMHg2MCB9LFxyXG4gIHsgbmFtZTogXCJQb2xpd3JhdGhcIiwgY3J5OiAweDBFLCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiQWJyYVwiLCBjcnk6IDB4MUMsIHBpdGNoOiAweEMwLCBsZW5ndGg6IDB4MSB9LFxyXG4gIHsgbmFtZTogXCJLYWRhYnJhXCIsIGNyeTogMHgxQywgcGl0Y2g6IDB4QTgsIGxlbmd0aDogMHhDMCB9LFxyXG4gIHsgbmFtZTogXCJBbGFrYXphbVwiLCBjcnk6IDB4MUMsIHBpdGNoOiAweDk4LCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiTWFjaG9wXCIsIGNyeTogMHgxRiwgcGl0Y2g6IDB4RUUsIGxlbmd0aDogMHgxIH0sXHJcbiAgeyBuYW1lOiBcIk1hY2hva2VcIiwgY3J5OiAweDFGLCBwaXRjaDogMHg0OCwgbGVuZ3RoOiAweDYwIH0sXHJcbiAgeyBuYW1lOiBcIk1hY2hhbXBcIiwgY3J5OiAweDFGLCBwaXRjaDogMHg4LCBsZW5ndGg6IDB4QzAgfSxcclxuICB7IG5hbWU6IFwiQmVsbHNwcm91dFwiLCBjcnk6IDB4MjEsIHBpdGNoOiAweDU1LCBsZW5ndGg6IDB4MSB9LFxyXG4gIHsgbmFtZTogXCJXZWVwaW5iZWxsXCIsIGNyeTogMHgyNSwgcGl0Y2g6IDB4NDQsIGxlbmd0aDogMHgyMCB9LFxyXG4gIHsgbmFtZTogXCJWaWN0cmVlYmVsXCIsIGNyeTogMHgyNSwgcGl0Y2g6IDB4NjYsIGxlbmd0aDogMHhDQyB9LFxyXG4gIHsgbmFtZTogXCJUZW50YWNvb2xcIiwgY3J5OiAweDFBLCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiVGVudGFjcnVlbFwiLCBjcnk6IDB4MUEsIHBpdGNoOiAweEVFLCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiR2VvZHVkZVwiLCBjcnk6IDB4MjQsIHBpdGNoOiAweEYwLCBsZW5ndGg6IDB4MTAgfSxcclxuICB7IG5hbWU6IFwiR3JhdmVsZXJcIiwgY3J5OiAweDI0LCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiR29sZW1cIiwgY3J5OiAweDEyLCBwaXRjaDogMHhFMCwgbGVuZ3RoOiAweDQwIH0sXHJcbiAgeyBuYW1lOiBcIlBvbnl0YVwiLCBjcnk6IDB4MjUsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJSYXBpZGFzaFwiLCBjcnk6IDB4MjUsIHBpdGNoOiAweDIwLCBsZW5ndGg6IDB4QzAgfSxcclxuICB7IG5hbWU6IFwiU2xvd3Bva2VcIiwgY3J5OiAweDIsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJTbG93YnJvXCIsIGNyeTogMHgxRiwgcGl0Y2g6IDB4MCwgbGVuZ3RoOiAweDgwIH0sXHJcbiAgeyBuYW1lOiBcIk1hZ25lbWl0ZVwiLCBjcnk6IDB4MUMsIHBpdGNoOiAweDgwLCBsZW5ndGg6IDB4NjAgfSxcclxuICB7IG5hbWU6IFwiTWFnbmV0b25cIiwgY3J5OiAweDFDLCBwaXRjaDogMHgyMCwgbGVuZ3RoOiAweEMwIH0sXHJcbiAgeyBuYW1lOiBcIkZhcmZldGNoJ2RcIiwgY3J5OiAweDEwLCBwaXRjaDogMHhERCwgbGVuZ3RoOiAweDEgfSxcclxuICB7IG5hbWU6IFwiRG9kdW9cIiwgY3J5OiAweDBCLCBwaXRjaDogMHhCQiwgbGVuZ3RoOiAweDEgfSxcclxuICB7IG5hbWU6IFwiRG9kcmlvXCIsIGNyeTogMHgwQiwgcGl0Y2g6IDB4OTksIGxlbmd0aDogMHgyMCB9LFxyXG4gIHsgbmFtZTogXCJTZWVsXCIsIGNyeTogMHgwQywgcGl0Y2g6IDB4ODgsIGxlbmd0aDogMHhDMCB9LFxyXG4gIHsgbmFtZTogXCJEZXdnb25nXCIsIGNyeTogMHgwQywgcGl0Y2g6IDB4MjMsIGxlbmd0aDogMHhGRiB9LFxyXG4gIHsgbmFtZTogXCJHcmltZXJcIiwgY3J5OiAweDUsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJNdWtcIiwgY3J5OiAweDcsIHBpdGNoOiAweEVGLCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiU2hlbGxkZXJcIiwgY3J5OiAweDE4LCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiQ2xveXN0ZXJcIiwgY3J5OiAweDE4LCBwaXRjaDogMHg2RiwgbGVuZ3RoOiAweEUwIH0sXHJcbiAgeyBuYW1lOiBcIkdhc3RseVwiLCBjcnk6IDB4MUMsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJIYXVudGVyXCIsIGNyeTogMHgxQywgcGl0Y2g6IDB4MzAsIGxlbmd0aDogMHg0MCB9LFxyXG4gIHsgbmFtZTogXCJHZW5nYXJcIiwgY3J5OiAweDcsIHBpdGNoOiAweDAsIGxlbmd0aDogMHhGRiB9LFxyXG4gIHsgbmFtZTogXCJPbml4XCIsIGNyeTogMHgxNywgcGl0Y2g6IDB4RkYsIGxlbmd0aDogMHhDMCB9LFxyXG4gIHsgbmFtZTogXCJEcm93emVlXCIsIGNyeTogMHgwRCwgcGl0Y2g6IDB4ODgsIGxlbmd0aDogMHgyMCB9LFxyXG4gIHsgbmFtZTogXCJIeXBub1wiLCBjcnk6IDB4MEQsIHBpdGNoOiAweEVFLCBsZW5ndGg6IDB4NDAgfSxcclxuICB7IG5hbWU6IFwiS3JhYmJ5XCIsIGNyeTogMHgyMCwgcGl0Y2g6IDB4MjAsIGxlbmd0aDogMHhFMCB9LFxyXG4gIHsgbmFtZTogXCJLaW5nbGVyXCIsIGNyeTogMHgyMCwgcGl0Y2g6IDB4RUUsIGxlbmd0aDogMHhFMCB9LFxyXG4gIHsgbmFtZTogXCJWb2x0b3JiXCIsIGNyeTogMHg2LCBwaXRjaDogMHhFRCwgbGVuZ3RoOiAweDgwIH0sXHJcbiAgeyBuYW1lOiBcIkVsZWN0cm9kZVwiLCBjcnk6IDB4NiwgcGl0Y2g6IDB4QTgsIGxlbmd0aDogMHg5MCB9LFxyXG4gIHsgbmFtZTogXCJFeGVnZ2N1dGVcIiwgY3J5OiAweDBCLCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiRXhlZ2d1dG9yXCIsIGNyeTogMHgwRCwgcGl0Y2g6IDB4MCwgbGVuZ3RoOiAweDgwIH0sXHJcbiAgeyBuYW1lOiBcIkN1Ym9uZVwiLCBjcnk6IDB4MTksIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJNYXJvd2FrXCIsIGNyeTogMHg4LCBwaXRjaDogMHg0RiwgbGVuZ3RoOiAweDYwIH0sXHJcbiAgeyBuYW1lOiBcIkhpdG1vbmxlZVwiLCBjcnk6IDB4MTIsIHBpdGNoOiAweDgwLCBsZW5ndGg6IDB4QzAgfSxcclxuICB7IG5hbWU6IFwiSGl0bW9uY2hhblwiLCBjcnk6IDB4MEMsIHBpdGNoOiAweEVFLCBsZW5ndGg6IDB4QzAgfSxcclxuICB7IG5hbWU6IFwiTGlja2l0dW5nXCIsIGNyeTogMHgwQywgcGl0Y2g6IDB4MCwgbGVuZ3RoOiAweDgwIH0sXHJcbiAgeyBuYW1lOiBcIktvZmZpbmdcIiwgY3J5OiAweDEyLCBwaXRjaDogMHhFNiwgbGVuZ3RoOiAweEREIH0sXHJcbiAgeyBuYW1lOiBcIldlZXppbmdcIiwgY3J5OiAweDEyLCBwaXRjaDogMHhGRiwgbGVuZ3RoOiAweEZGIH0sXHJcbiAgeyBuYW1lOiBcIlJoeWhvcm5cIiwgY3J5OiAweDQsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJSaHlkb25cIiwgY3J5OiAweDExLCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiQ2hhbnNleVwiLCBjcnk6IDB4MTQsIHBpdGNoOiAweDBBLCBsZW5ndGg6IDB4QzAgfSxcclxuICB7IG5hbWU6IFwiVGFuZ2VsYVwiLCBjcnk6IDB4MTIsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJLYW5nYXNraGFuXCIsIGNyeTogMHgzLCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiSG9yc2VhXCIsIGNyeTogMHgxOSwgcGl0Y2g6IDB4OTksIGxlbmd0aDogMHgxMCB9LFxyXG4gIHsgbmFtZTogXCJTZWFkcmFcIiwgY3J5OiAweDE5LCBwaXRjaDogMHgzQywgbGVuZ3RoOiAweDEgfSxcclxuICB7IG5hbWU6IFwiR29sZGVlblwiLCBjcnk6IDB4MTYsIHBpdGNoOiAweDgwLCBsZW5ndGg6IDB4NDAgfSxcclxuICB7IG5hbWU6IFwiU2Vha2luZ1wiLCBjcnk6IDB4MTYsIHBpdGNoOiAweDEwLCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiU3Rhcnl1XCIsIGNyeTogMHgxRSwgcGl0Y2g6IDB4MiwgbGVuZ3RoOiAweDIwIH0sXHJcbiAgeyBuYW1lOiBcIlN0YXJtaWVcIiwgY3J5OiAweDFFLCBwaXRjaDogMHgwLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiTXIuTWltZVwiLCBjcnk6IDB4MjAsIHBpdGNoOiAweDgsIGxlbmd0aDogMHg0MCB9LFxyXG4gIHsgbmFtZTogXCJTY3l0aGVyXCIsIGNyeTogMHgxNiwgcGl0Y2g6IDB4MCwgbGVuZ3RoOiAweDgwIH0sXHJcbiAgeyBuYW1lOiBcIkp5bnhcIiwgY3J5OiAweDBELCBwaXRjaDogMHhGRiwgbGVuZ3RoOiAweEZGIH0sXHJcbiAgeyBuYW1lOiBcIkVsZWN0YWJ1enpcIiwgY3J5OiAweDYsIHBpdGNoOiAweDhGLCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiTWFnbWFyXCIsIGNyeTogMHg0LCBwaXRjaDogMHhGRiwgbGVuZ3RoOiAweDMwIH0sXHJcbiAgeyBuYW1lOiBcIlBpbnNpclwiLCBjcnk6IDB4MTQsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJUYXVyb3NcIiwgY3J5OiAweDFELCBwaXRjaDogMHgxMSwgbGVuZ3RoOiAweDQwIH0sXHJcbiAgeyBuYW1lOiBcIk1hZ2lrYXJwXCIsIGNyeTogMHgxNywgcGl0Y2g6IDB4ODAsIGxlbmd0aDogMHgwIH0sXHJcbiAgeyBuYW1lOiBcIkd5YXJhZG9zXCIsIGNyeTogMHgxNywgcGl0Y2g6IDB4MCwgbGVuZ3RoOiAweDgwIH0sXHJcbiAgeyBuYW1lOiBcIkxhcHJhc1wiLCBjcnk6IDB4MUIsIHBpdGNoOiAweDAsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJEaXR0b1wiLCBjcnk6IDB4MEUsIHBpdGNoOiAweEZGLCBsZW5ndGg6IDB4RkYgfSxcclxuICB7IG5hbWU6IFwiRWV2ZWVcIiwgY3J5OiAweDFBLCBwaXRjaDogMHg4OCwgbGVuZ3RoOiAweDYwIH0sXHJcbiAgeyBuYW1lOiBcIlZhcG9yZW9uXCIsIGNyeTogMHgxQSwgcGl0Y2g6IDB4QUEsIGxlbmd0aDogMHhGRiB9LFxyXG4gIHsgbmFtZTogXCJKb2x0ZW9uXCIsIGNyeTogMHgxQSwgcGl0Y2g6IDB4M0QsIGxlbmd0aDogMHg4MCB9LFxyXG4gIHsgbmFtZTogXCJGbGFyZW9uXCIsIGNyeTogMHgxQSwgcGl0Y2g6IDB4MTAsIGxlbmd0aDogMHgyMCB9LFxyXG4gIHsgbmFtZTogXCJQb3J5Z29uXCIsIGNyeTogMHgyNSwgcGl0Y2g6IDB4QUEsIGxlbmd0aDogMHhGRiB9LFxyXG4gIHsgbmFtZTogXCJPbWFueXRlXCIsIGNyeTogMHgxRiwgcGl0Y2g6IDB4RjAsIGxlbmd0aDogMHgxIH0sXHJcbiAgeyBuYW1lOiBcIk9tYXN0YXJcIiwgY3J5OiAweDFGLCBwaXRjaDogMHhGRiwgbGVuZ3RoOiAweDQwIH0sXHJcbiAgeyBuYW1lOiBcIkthYnV0b1wiLCBjcnk6IDB4MTYsIHBpdGNoOiAweEJCLCBsZW5ndGg6IDB4NDAgfSxcclxuICB7IG5hbWU6IFwiS2FidXRvcHNcIiwgY3J5OiAweDE4LCBwaXRjaDogMHhFRSwgbGVuZ3RoOiAweDEgfSxcclxuICB7IG5hbWU6IFwiQWVyb2RhY3R5bFwiLCBjcnk6IDB4MjMsIHBpdGNoOiAweDIwLCBsZW5ndGg6IDB4RjAgfSxcclxuICB7IG5hbWU6IFwiU25vcmxheFwiLCBjcnk6IDB4NSwgcGl0Y2g6IDB4NTUsIGxlbmd0aDogMHgxIH0sXHJcbiAgeyBuYW1lOiBcIkFydGljdW5vXCIsIGNyeTogMHg5LCBwaXRjaDogMHg4MCwgbGVuZ3RoOiAweDQwIH0sXHJcbiAgeyBuYW1lOiBcIlphcGRvc1wiLCBjcnk6IDB4MTgsIHBpdGNoOiAweEZGLCBsZW5ndGg6IDB4ODAgfSxcclxuICB7IG5hbWU6IFwiTW9sdHJlc1wiLCBjcnk6IDB4OSwgcGl0Y2g6IDB4RjgsIGxlbmd0aDogMHg0MCB9LFxyXG4gIHsgbmFtZTogXCJEcmF0aW5pXCIsIGNyeTogMHgwRiwgcGl0Y2g6IDB4NjAsIGxlbmd0aDogMHg0MCB9LFxyXG4gIHsgbmFtZTogXCJEcmFnb25haXJcIiwgY3J5OiAweDBGLCBwaXRjaDogMHg0MCwgbGVuZ3RoOiAweDgwIH0sXHJcbiAgeyBuYW1lOiBcIkRyYWdvbml0ZVwiLCBjcnk6IDB4MEYsIHBpdGNoOiAweDNDLCBsZW5ndGg6IDB4QzAgfSxcclxuICB7IG5hbWU6IFwiTWV3dHdvXCIsIGNyeTogMHgxRSwgcGl0Y2g6IDB4OTksIGxlbmd0aDogMHhGRiB9LFxyXG4gIHsgbmFtZTogXCJNZXdcIiwgY3J5OiAweDFFLCBwaXRjaDogMHhFRSwgbGVuZ3RoOiAweEZGIH1cclxuXSBhcyBQb2tlbW9uW107IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F2ZURpYWdyYW0ge1xyXG4gIGNodW5rU2l6ZSA9IDEwMDAwO1xyXG4gIGRpbWludXRpb24gPSAyMDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IFNWR0VsZW1lbnRcclxuICApIHsgfVxyXG5cclxuICByZW5kZXIod2F2ZXM6IG51bWJlcltdW10pIHtcclxuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IHdhdmUgb2Ygd2F2ZXMpIHtcclxuICAgICAgdGhpcy5yZW5kZXJXYXZlKHdhdmUsIGluZGV4LCB3YXZlcy5sZW5ndGgpO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyV2F2ZSh3YXZlOiBudW1iZXJbXSwgd2F2ZUluZGV4OiBudW1iZXIsIHdhdmVDb3VudDogbnVtYmVyKSB7XHJcbiAgICBsZXQgc2luZ2xlV2F2ZU1heEhlaWdodCA9IDQwMCAvIHdhdmVDb3VudDtcclxuICAgIGxldCBiYXNlWSA9IHdhdmVJbmRleCAqIHNpbmdsZVdhdmVNYXhIZWlnaHQ7XHJcbiAgICBjb25zdCB3YXZlQ2h1bmtDb3VudCA9IE1hdGguY2VpbCh3YXZlLmxlbmd0aCAvIHRoaXMuY2h1bmtTaXplIC8gdGhpcy5kaW1pbnV0aW9uKTtcclxuXHJcbiAgICBmb3IgKGxldCBjaHVua0luZGV4ID0gMDsgY2h1bmtJbmRleCA8IHdhdmVDaHVua0NvdW50OyBjaHVua0luZGV4KyspIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicG9seWxpbmVcIik7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuZmlsbCA9IFwibm9uZVwiO1xyXG4gICAgICBlbGVtZW50LnN0eWxlLnN0cm9rZSA9IFwiYmxhY2tcIjtcclxuICAgICAgZWxlbWVudC5zdHlsZS5zdHJva2VXaWR0aCA9IFwiM1wiO1xyXG5cclxuICAgICAgY29uc3QgcG9pbnRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBjaHVua1Bvc2l0aW9uID0gMDsgY2h1bmtQb3NpdGlvbiA8IHRoaXMuY2h1bmtTaXplOyBjaHVua1Bvc2l0aW9uKyspIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2h1bmtTaXplICogY2h1bmtJbmRleCArIGNodW5rUG9zaXRpb247XHJcbiAgICAgICAgY29uc3Qgd2F2ZURhdGFJbmRleCA9IHRoaXMuZGltaW51dGlvbiAqIHBvc2l0aW9uO1xyXG4gICAgICAgIGNvbnN0IHdhdmVEYXRhID0gd2F2ZVt3YXZlRGF0YUluZGV4XTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB3YXZlRGF0YSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB4ID0gcG9zaXRpb24gLyA0O1xyXG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgMTAwICogKFxyXG4gICAgICAgICAgICBiYXNlWSArXHJcbiAgICAgICAgICAgIHNpbmdsZVdhdmVNYXhIZWlnaHQgKiB3YXZlRGF0YSAvIDIgK1xyXG4gICAgICAgICAgICBzaW5nbGVXYXZlTWF4SGVpZ2h0IC8gMlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkgLyAxMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvaW50ID0gW3gsIHldO1xyXG4gICAgICAgIHBvaW50cy5wdXNoKHBvaW50LmpvaW4oXCIsXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJwb2ludHNcIiwgcG9pbnRzLmpvaW4oXCIgXCIpKTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQgKiBhcyB1dGlsIGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCBDcnlUeXBlIGZyb20gXCIuLi9DcnlUeXBlXCI7XHJcbmltcG9ydCBQb2tlbW9uIGZyb20gXCIuLi9Qb2tlbW9uXCI7XHJcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gXCJmaWxlLXNhdmVyXCI7XHJcbmltcG9ydCBjcnlUeXBlcyBmcm9tIFwiLi4vZGF0YS9jcnlUeXBlc1wiO1xyXG5pbXBvcnQgV2F2ZURpYWdyYW0gZnJvbSBcIi4vV2F2ZURpYWdyYW1cIjtcclxuaW1wb3J0IENyeUdlbmVyYXRvciBmcm9tIFwiLi4vQ3J5R2VuZXJhdG9yXCI7XHJcbmltcG9ydCBwb2tlbW9uTGlzdCBmcm9tIFwiLi4vZGF0YS9wb2tlbW9uTGlzdFwiO1xyXG5pbXBvcnQgeyBCYXNlQ3J5TWFuYWdlciB9IGZyb20gXCIuLi9kYXRhL0Jhc2VDcnlNYW5hZ2VyXCI7XHJcblxyXG5jbGFzcyBVaSB7XHJcbiAgc2VsZWN0ZWRQb2tlbW9uOiBQb2tlbW9uO1xyXG4gIHNlbGVjdGVkQ3J5VHlwZTogQ3J5VHlwZTtcclxuICBzZWxlY3RlZENyeVR5cGVJbmRleDogbnVtYmVyO1xyXG5cclxuICBwaXRjaDogbnVtYmVyO1xyXG4gIGxlbmd0aDogbnVtYmVyO1xyXG4gIHZvbHVtZTogbnVtYmVyID0gNTA7XHJcblxyXG4gIGN1c3RvbUNyeVR5cGU6IENyeVR5cGUgPSB7XHJcbiAgICBuYW1lOiBcIkN1c3RvbVwiLFxyXG4gICAgbm9pc2U6IFtdLFxyXG4gICAgcHVsc2UxOiBbXSxcclxuICAgIHB1bHNlMjogW11cclxuICB9O1xyXG5cclxuICBjcnlUeXBlczogQ3J5VHlwZVtdID0gW3RoaXMuY3VzdG9tQ3J5VHlwZV0uY29uY2F0KGNyeVR5cGVzKTtcclxuXHJcbiAgd2F2ZURpYWdyYW06IFdhdmVEaWFncmFtO1xyXG4gIGNyeUdlbmVyYXRvciA9IG5ldyBDcnlHZW5lcmF0b3IoKTtcclxuXHJcbiAgd2F2ZURpYWdyYW1FbGVtZW50OiBTVkdFbGVtZW50O1xyXG4gIHBsYXlCdXR0b25FbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBkb3dubG9hZEJ1dHRvbkVsZW1lbnQ6IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBuZXdCYXNlQ3J5QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBjb3B5QmFzZUNyeUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgZGVsZXRlQmFzZUNyeUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIHNlbGVjdGVkUG9rZW1vblNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gIHNlbGVjdGVkQ3J5VHlwZVNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xyXG5cclxuICBwaXRjaElucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuICBsZW5ndGhJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgdm9sdW1lSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBwdWxzZTFFbmFibGVkRWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuICBwdWxzZTJFbmFibGVkRWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuICBub2lzZUVuYWJsZWRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBwdWxzZTFDb21tYW5kc0VsZW1lbnQ6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbiAgcHVsc2UyQ29tbWFuZHNFbGVtZW50OiBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG4gIG5vaXNlQ29tbWFuZHNFbGVtZW50OiBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG4gIHJhd0NvbW1hbmRzRWxlbWVudDogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuXHJcbiAgYmFzZUNyeVNlbGVjdG9yRWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XHJcblxyXG4gIGJhc2VDcnlOYW1lSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gIGN1cnJlbnRCYXNlQ3J5SWR4OiBudW1iZXI7XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4ID0gMDtcclxuXHJcbiAgICB0aGlzLndhdmVEaWFncmFtRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8U1ZHRWxlbWVudD4oXCIjd2F2ZS1kaWFncmFtXCIpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbGVjdGVkLXBva2Vtb25cIik7XHJcbiAgICB0aGlzLnNlbGVjdGVkUG9rZW1vblNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uU2VsZWN0ZWRQb2tlbW9uQ2hhbmdlKTtcclxuXHJcbiAgIC8vIHRoaXMuc2VsZWN0ZWRDcnlUeXBlU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbGVjdGVkLWNyeS10eXBlXCIpO1xyXG4gICAvLyB0aGlzLnNlbGVjdGVkQ3J5VHlwZVNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uQ3J5VHlwZUNoYW5nZSk7XHJcblxyXG4gICAgdGhpcy5waXRjaElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjcGl0Y2hcIik7XHJcbiAgICB0aGlzLnBpdGNoSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vblBpdGNoQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLmxlbmd0aElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjbGVuZ3RoXCIpO1xyXG4gICAgdGhpcy5sZW5ndGhJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uTGVuZ3RoQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLnZvbHVtZUlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjdm9sdW1lXCIpO1xyXG4gICAgdGhpcy52b2x1bWVJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uVm9sdW1lQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLnBsYXlCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjcGxheVwiKTtcclxuICAgIHRoaXMucGxheUJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25QbGF5Q2xpY2spO1xyXG5cclxuICAgXHJcblxyXG4gICAgdGhpcy5uZXdCYXNlQ3J5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjbmV3XCIpO1xyXG4gICAgdGhpcy5uZXdCYXNlQ3J5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQmFzZUNyeU5ld0NsaWNrKTtcclxuXHJcbiAgICB0aGlzLmNvcHlCYXNlQ3J5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjY29weVwiKTtcclxuICAgIHRoaXMuY29weUJhc2VDcnlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25CYXNlQ3J5Q29weUNsaWNrKTtcclxuXHJcbiAgICB0aGlzLmRlbGV0ZUJhc2VDcnlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNkZWxldGVcIik7XHJcbiAgICB0aGlzLmRlbGV0ZUJhc2VDcnlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25CYXNlQ3J5RGVsZXRlQ2xpY2spO1xyXG5cclxuICAgIHRoaXMuZG93bmxvYWRCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjZG93bmxvYWRcIik7XHJcbiAgICB0aGlzLmRvd25sb2FkQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5kb3dubG9hZCk7XHJcblxyXG4gICAgdGhpcy5wdWxzZTFFbmFibGVkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjcHVsc2UxLWVuYWJsZWRcIik7XHJcbiAgICB0aGlzLnB1bHNlMkVuYWJsZWRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNwdWxzZTItZW5hYmxlZFwiKTtcclxuICAgIHRoaXMubm9pc2VFbmFibGVkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjbm9pc2UtZW5hYmxlZFwiKTtcclxuXHJcbiAgICB0aGlzLnB1bHNlMUNvbW1hbmRzRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFRleHRBcmVhRWxlbWVudD4oXCIjcHVsc2UxY21kc1wiKTtcclxuICAgIHRoaXMucHVsc2UxQ29tbWFuZHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB0aGlzLm9uQ29tbWFuZHNJbnB1dCk7XHJcblxyXG4gICAgdGhpcy5wdWxzZTJDb21tYW5kc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KFwiI3B1bHNlMmNtZHNcIik7XHJcbiAgICB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5vbkNvbW1hbmRzSW5wdXQpO1xyXG5cclxuICAgIHRoaXMubm9pc2VDb21tYW5kc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KFwiI25vaXNlY21kc1wiKTtcclxuICAgIHRoaXMubm9pc2VDb21tYW5kc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHRoaXMub25Db21tYW5kc0lucHV0KTtcclxuXHJcbiAgICAvL3RoaXMucmF3Q29tbWFuZHNFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MVGV4dEFyZWFFbGVtZW50PihcIiNyYXdjbWRzXCIpO1xyXG5cclxuICAgIHRoaXMuYmFzZUNyeVNlbGVjdG9yRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbGVjdGVkLWJhc2VjcnlcIik7XHJcbiAgICB0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uU2VsZWN0ZWRCYXNlQ3J5Q2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLmJhc2VDcnlOYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI25hbWVcIik7XHJcbiAgICB0aGlzLmJhc2VDcnlOYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uQmFzZUNyeU5hbWVDaGFuZ2UpO1xyXG5cclxuICAgICBcclxuXHJcblxyXG4gICAgdGhpcy5jcmVhdGVFbGVtZW50cygpO1xyXG4gICBcclxuICB9XHJcblxyXG4gIHJlZnJlc2goKXtcclxuICAgIHRoaXMuY3JlYXRlRWxlbWVudHMoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVsZW1lbnRzKCl7XHJcbiAgIGxldCBpbmRleCA9IDA7XHJcbiAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uU2VsZWN0RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgZm9yIChjb25zdCBwb2tlbW9uIG9mIHBva2Vtb25MaXN0KSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbiA9IHV0aWwuY3JlYXRlU2VsZWN0T3B0aW9uKGAjJHtpbmRleCArIDF9OiAke3Bva2Vtb24ubmFtZX1gLCBpbmRleC50b1N0cmluZygpKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZFBva2Vtb25TZWxlY3RFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgICB9XHJcblxyXG4gICAgLyp0aGlzLnNlbGVjdGVkQ3J5VHlwZVNlbGVjdEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGluZGV4ID0gMDtcclxuICAgIGZvciAoY29uc3QgY3J5VHlwZSBvZiB0aGlzLmNyeVR5cGVzKSB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldENyeVR5cGVOYW1lKGNyeVR5cGUpO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGluZGV4LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICBjb25zdCBvcHRpb24gPSB1dGlsLmNyZWF0ZVNlbGVjdE9wdGlvbihuYW1lLCB2YWx1ZSk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRDcnlUeXBlU2VsZWN0RWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgfSovXHJcblxyXG4gICAgdGhpcy5iYXNlQ3J5U2VsZWN0b3JFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBpbmRleCA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGJhc2VDcnkgb2YgQmFzZUNyeU1hbmFnZXIuZGF0YSkge1xyXG4gICAgICBjb25zdCBvcHRpb24gPSB1dGlsLmNyZWF0ZVNlbGVjdE9wdGlvbihgIyR7aW5kZXggKyAxfTogJHtiYXNlQ3J5Lm5hbWV9YCwgaW5kZXgudG9TdHJpbmcoKSk7XHJcbiAgICAgIHRoaXMuYmFzZUNyeVNlbGVjdG9yRWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYmFzZUNyeU5hbWVJbnB1dC52YWx1ZSA9IEJhc2VDcnlNYW5hZ2VyLmdldCh0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4KS5uYW1lO1xyXG5cclxuICAgIHRoaXMuYmFzZUNyeVNlbGVjdG9yRWxlbWVudC5zZWxlY3RlZEluZGV4ID0gdGhpcy5jdXJyZW50QmFzZUNyeUlkeDtcclxuXHJcbiAgICB0aGlzLndhdmVEaWFncmFtID0gbmV3IFdhdmVEaWFncmFtKHRoaXMud2F2ZURpYWdyYW1FbGVtZW50KTtcclxuXHJcbiAgICB0aGlzLnNlbGVjdFBva2Vtb24ocG9rZW1vbkxpc3RbMF0pO1xyXG4gICAgdGhpcy51cGRhdGVDb21tYW5kcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q3J5VHlwZU5hbWUoY3J5VHlwZTogQ3J5VHlwZSkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBjcnlUeXBlLm5hbWUgPT09IFwic3RyaW5nXCIgP1xyXG4gICAgICBjcnlUeXBlLm5hbWUgOlxyXG4gICAgICAoY3J5VHlwZXMuaW5kZXhPZihjcnlUeXBlKSArIDEpLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZURhdGEoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUNvbW1hbmRzKCk7XHJcblxyXG4gICAgdGhpcy5jcnlHZW5lcmF0b3IuaW5pdCgpO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwdWxzZTEsXHJcbiAgICAgIHB1bHNlMixcclxuICAgICAgbm9pc2VcclxuICAgIH0gPSB0aGlzLmNyeUdlbmVyYXRvci5nZW5lcmF0ZSh0aGlzLnNlbGVjdGVkQ3J5VHlwZSwgdGhpcy5waXRjaCwgdGhpcy5sZW5ndGgpO1xyXG5cclxuICAgIGNvbnN0IHdhdmVzOiBudW1iZXJbXVtdID0gW107XHJcbiAgICBpZiAodGhpcy5wdWxzZTFFbmFibGVkRWxlbWVudC5jaGVja2VkKSB7XHJcbiAgICAgIHdhdmVzLnB1c2gocHVsc2UxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wdWxzZTJFbmFibGVkRWxlbWVudC5jaGVja2VkKSB7XHJcbiAgICAgIHdhdmVzLnB1c2gocHVsc2UyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ub2lzZUVuYWJsZWRFbGVtZW50LmNoZWNrZWQpIHtcclxuICAgICAgd2F2ZXMucHVzaChub2lzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMubWl4V2F2ZXMod2F2ZXMsIDMpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcHVsc2UxLFxyXG4gICAgICBwdWxzZTIsXHJcbiAgICAgIG5vaXNlLFxyXG4gICAgICBkYXRhXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbWl4V2F2ZXMod2F2ZXM6IG51bWJlcltdW10sIHJlZHVjdGlvbjogbnVtYmVyKSB7XHJcbiAgICBjb25zdCB0b3RhbExlbmd0aCA9IHdhdmVzLnJlZHVjZSgocHJldiwgY3VycmVudCkgPT4gTWF0aC5tYXgocHJldiwgY3VycmVudC5sZW5ndGgpLCAwKTtcclxuICAgIGNvbnN0IGRhdGEgPSBuZXcgQXJyYXkodG90YWxMZW5ndGgpLmZpbGwoMCk7XHJcblxyXG4gICAgZm9yIChjb25zdCB3YXZlIG9mIHdhdmVzKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3YXZlLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGRhdGFbaW5kZXhdICs9IHdhdmVbaW5kZXhdIC8gcmVkdWN0aW9uO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBvbkJhc2VDcnlOZXdDbGljayA9ICgpID0+IHtcclxuICAgIGNvbnN0IG5ld0lkeCA9IEJhc2VDcnlNYW5hZ2VyLmFkZE5ldygpO1xyXG4gICAgdGhpcy5jdXJyZW50QmFzZUNyeUlkeCA9IG5ld0lkeDtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH1cclxuXHJcbiAgb25CYXNlQ3J5Q29weUNsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3SWR4ID0gQmFzZUNyeU1hbmFnZXIuY29weSh0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICB0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4ID0gbmV3SWR4O1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBvbkJhc2VDcnlEZWxldGVDbGljayA9ICgpID0+IHtcclxuICAgIEJhc2VDcnlNYW5hZ2VyLmRlbGV0ZSh0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICB0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4ID0gMDtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RlZEJhc2VDcnlDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4ID0gdGhpcy5iYXNlQ3J5U2VsZWN0b3JFbGVtZW50LnNlbGVjdGVkSW5kZXg7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIG9uQmFzZUNyeU5hbWVDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICBCYXNlQ3J5TWFuYWdlci51cGRhdGVOYW1lKHRoaXMuY3VycmVudEJhc2VDcnlJZHgsIHRoaXMuYmFzZUNyeU5hbWVJbnB1dC52YWx1ZSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIG9uUGxheUNsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwdWxzZTEsXHJcbiAgICAgIHB1bHNlMixcclxuICAgICAgbm9pc2UsXHJcbiAgICAgIGRhdGFcclxuICAgIH0gPSB0aGlzLmdlbmVyYXRlRGF0YSgpO1xyXG5cclxuICAgIHRoaXMud2F2ZURpYWdyYW0ucmVuZGVyKFtcclxuICAgICAgcHVsc2UxLFxyXG4gICAgICBwdWxzZTIsXHJcbiAgICAgIG5vaXNlLFxyXG4gICAgICBkYXRhXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCByZXNhbXBsZWQgPSB1dGlsLnJlc2FtcGxlUGNtKFxyXG4gICAgICB0aGlzLmNyeUdlbmVyYXRvci5zb3VyY2VTYW1wbGVSYXRlLFxyXG4gICAgICB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSxcclxuICAgICAgZGF0YSxcclxuICAgICAgdGhpcy52b2x1bWVcclxuICAgICk7XHJcbiAgICB0aGlzLmNyeUdlbmVyYXRvci5wbGF5KHJlc2FtcGxlZCk7XHJcbiAgfVxyXG5cclxuICBvblBpdGNoQ2hhbmdlID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgY29uc3QgcGl0Y2ggPSBwYXJzZUludChlbGVtZW50LnZhbHVlLCAxMCk7XHJcbiAgICB0aGlzLnNldFBpdGNoKHBpdGNoKTtcclxuICB9XHJcblxyXG4gIG9uTGVuZ3RoQ2hhbmdlID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgY29uc3QgbGVuZ3RoID0gcGFyc2VJbnQoZWxlbWVudC52YWx1ZSwgMTApO1xyXG4gICAgdGhpcy5zZXRMZW5ndGgobGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIG9uVm9sdW1lQ2hhbmdlID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgY29uc3Qgdm9sdW1lID0gcGFyc2VJbnQoZWxlbWVudC52YWx1ZSwgMTApO1xyXG4gICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XHJcbiAgfVxyXG5cclxuICBzZXRQaXRjaCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnBpdGNoSW5wdXRFbGVtZW50LnZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIHRoaXMucGl0Y2ggPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldExlbmd0aCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmxlbmd0aElucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLmxlbmd0aCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0UG9rZW1vbiA9IChwb2tlbW9uOiBQb2tlbW9uKSA9PiB7XHJcbiAgICB0aGlzLnNlbGVjdGVkUG9rZW1vbiA9IHBva2Vtb247XHJcblxyXG4gICAgdGhpcy5zZWxlY3RDcnlUeXBlKGNyeVR5cGVzW3Bva2Vtb24uY3J5XSk7XHJcbiAgICB0aGlzLnNldFBpdGNoKHBva2Vtb24ucGl0Y2gpO1xyXG4gICAgdGhpcy5zZXRMZW5ndGgocG9rZW1vbi5sZW5ndGggLSAweDgwKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdENyeVR5cGUgPSAoY3J5VHlwZTogQ3J5VHlwZSkgPT4ge1xyXG4gICAgaWYgKGNyeVR5cGUgPT09IHRoaXMuc2VsZWN0ZWRDcnlUeXBlKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZENyeVR5cGVJbmRleCA9IHRoaXMuY3J5VHlwZXMuaW5kZXhPZihjcnlUeXBlKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRDcnlUeXBlID0gY3J5VHlwZTtcclxuICAgIC8vdGhpcy5zZWxlY3RlZENyeVR5cGVTZWxlY3RFbGVtZW50LnZhbHVlID0gdGhpcy5zZWxlY3RlZENyeVR5cGVJbmRleC50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ29tbWFuZHMoKSB7XHJcbiAgIC8vIGlmICh0aGlzLnNlbGVjdGVkQ3J5VHlwZSAhPT0gdGhpcy5jdXN0b21DcnlUeXBlKSB7XHJcbiAgLy8gICAgdGhpcy51cGRhdGVDcnlUeXBlQ29tbWFuZHModGhpcy5zZWxlY3RlZENyeVR5cGUpO1xyXG4gIC8vICB9IGVsc2Uge1xyXG4gLy8gICAgIHRoaXMucGFyc2VDdXN0b21DcnlUeXBlQ29tbWFuZHMoKTtcclxuIC8vICAgfVxyXG4gICAvLyB0aGlzLnVwZGF0ZVJhd0NvbW1hbmRzKHRoaXMuc2VsZWN0ZWRDcnlUeXBlKTtcclxuICAgIHRoaXMucGFyc2VDcnlDb21tYW5kcygpO1xyXG4gICAgdGhpcy51cGRhdGVDcnlUeXBlQ29tbWFuZHMoQmFzZUNyeU1hbmFnZXIuZ2V0KHRoaXMuY3VycmVudEJhc2VDcnlJZHgpKTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0ZWRQb2tlbW9uQ2hhbmdlID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBjb25zdCBwb2tlbW9uID0gcG9rZW1vbkxpc3RbZWxlbWVudC52YWx1ZV07XHJcbiAgICB0aGlzLnNlbGVjdFBva2Vtb24ocG9rZW1vbik7XHJcbiAgICB0aGlzLnVwZGF0ZUNvbW1hbmRzKCk7XHJcbiAgfVxyXG5cclxuICBvbkNyeVR5cGVDaGFuZ2UgPSAoZTogRXZlbnQpID0+IHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBjb25zdCBjcnlUeXBlSW5kZXggPSBwYXJzZUludChlbGVtZW50LnZhbHVlLCAxMCk7XHJcbiAgICB0aGlzLnNlbGVjdENyeVR5cGUodGhpcy5jcnlUeXBlc1tjcnlUeXBlSW5kZXhdKTtcclxuICAgIHRoaXMudXBkYXRlQ29tbWFuZHMoKTtcclxuICB9XHJcblxyXG4gIG9uQ29tbWFuZHNJbnB1dCA9ICgpID0+IHtcclxuICAgIHRoaXMudXBkYXRlQ29tbWFuZHMoKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkID0gKCkgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBkYXRhXHJcbiAgICB9ID0gdGhpcy5nZW5lcmF0ZURhdGEoKTtcclxuXHJcbiAgICBjb25zdCByZXNhbXBsZWQgPSB1dGlsLnJlc2FtcGxlUGNtKFxyXG4gICAgICB0aGlzLmNyeUdlbmVyYXRvci5zb3VyY2VTYW1wbGVSYXRlLFxyXG4gICAgICB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSxcclxuICAgICAgZGF0YSxcclxuICAgICAgdGhpcy52b2x1bWVcclxuICAgICk7XHJcblxyXG4gICAgY29uc3Qgc2Vjb25kcyA9IHJlc2FtcGxlZC5sZW5ndGggLyB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZTtcclxuICAgIGNvbnN0IGJsb2IgPSB1dGlsLmNvbnZlcnRQY21Ub1dhdihzZWNvbmRzLCAxLCB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSwgMSwgcmVzYW1wbGVkKTtcclxuXHJcbiAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXMuc2VsZWN0ZWRDcnlUeXBlID09PSB0aGlzLmN1c3RvbUNyeVR5cGUgP1xyXG4gICAgICBcImN1c3RvbS1jcnlcIiA6XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uLm5hbWUudG9Mb3dlckNhc2UoKSArIFwiLWNyeVwiO1xyXG4gICAgc2F2ZUFzKGJsb2IsIGAke2ZpbGVuYW1lfS53YXZgKTtcclxuICB9XHJcblxyXG4gIHBhcnNlQ3J5Q29tbWFuZHMoKSB7XHJcbiAgICBjb25zdCBwdWxzZTFDb21tYW5kcyA9IHRoaXMucHVsc2UxQ29tbWFuZHNFbGVtZW50LnZhbHVlLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgY29uc3QgcHVsc2UyQ29tbWFuZHMgPSB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC52YWx1ZS5zcGxpdChcIlxcblwiKTtcclxuICAgIGNvbnN0IG5vaXNlQ29tbWFuZHMgPSB0aGlzLm5vaXNlQ29tbWFuZHNFbGVtZW50LnZhbHVlLnNwbGl0KFwiXFxuXCIpO1xyXG5cclxuICAgIGNvbnN0IG5ld0NvbW1hbmRzID0ge1xyXG4gICAgICBwdWxzZTE6IFtdLFxyXG4gICAgICBwdWxzZTI6IFtdLFxyXG4gICAgICBub2lzZTogW11cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcHVsc2UxID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHVsc2UxQ29tbWFuZHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwdWxzZTFDb21tYW5kc1tpbmRleF0uc3BsaXQoXCIgXCIpO1xyXG4gICAgICBpZiAoY29tbWFuZFswXSA9PT0gXCJkdXR5XCIpIHtcclxuICAgICAgICBwdWxzZTEucHVzaCh7IFwiZHV0eVwiOiBwYXJzZUludChjb21tYW5kWzFdKSB9KTtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kWzBdID09PSBcIm5vdGVcIikge1xyXG4gICAgICAgIHB1bHNlMS5wdXNoKHsgXCJub3RlXCI6IFtwYXJzZUludChjb21tYW5kWzFdKSAtIDEsIHBhcnNlSW50KGNvbW1hbmRbMl0pLCBwYXJzZUludChjb21tYW5kWzNdKSwgcGFyc2VJbnQoY29tbWFuZFs0XSldIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXdDb21tYW5kcy5wdWxzZTEgPSBwdWxzZTE7XHJcblxyXG4gICAgY29uc3QgcHVsc2UyID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHVsc2UyQ29tbWFuZHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwdWxzZTJDb21tYW5kc1tpbmRleF0uc3BsaXQoXCIgXCIpO1xyXG4gICAgICBpZiAoY29tbWFuZFswXSA9PT0gXCJkdXR5XCIpIHtcclxuICAgICAgICBwdWxzZTIucHVzaCh7IFwiZHV0eVwiOiBwYXJzZUludChjb21tYW5kWzFdKSB9KTtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kWzBdID09PSBcIm5vdGVcIikge1xyXG4gICAgICAgIHB1bHNlMi5wdXNoKHsgXCJub3RlXCI6IFtwYXJzZUludChjb21tYW5kWzFdKSAtIDEsIHBhcnNlSW50KGNvbW1hbmRbMl0pLCBwYXJzZUludChjb21tYW5kWzNdKSwgcGFyc2VJbnQoY29tbWFuZFs0XSldIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXdDb21tYW5kcy5wdWxzZTIgPSBwdWxzZTI7XHJcblxyXG4gICAgY29uc3Qgbm9pc2UgPSBbXTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBub2lzZUNvbW1hbmRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBjb25zdCBjb21tYW5kID0gbm9pc2VDb21tYW5kc1tpbmRleF0uc3BsaXQoXCIgXCIpO1xyXG4gICAgICBpZiAoY29tbWFuZFswXSA9PT0gXCJub3RlXCIpIHtcclxuICAgICAgICBub2lzZS5wdXNoKHsgXCJub3RlXCI6IFtwYXJzZUludChjb21tYW5kWzFdKSAtIDEsIHBhcnNlSW50KGNvbW1hbmRbMl0pLCBwYXJzZUludChjb21tYW5kWzNdKSwgcGFyc2VJbnQoY29tbWFuZFs0XSldIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXdDb21tYW5kcy5ub2lzZSA9IG5vaXNlO1xyXG5cclxuICAgIEJhc2VDcnlNYW5hZ2VyLnVwZGF0ZUNoYW5uZWxzKHRoaXMuY3VycmVudEJhc2VDcnlJZHgsIG5ld0NvbW1hbmRzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUNyeVR5cGVDb21tYW5kcyhjcnlJbmZvKSB7XHJcbiAgICBjb25zdCBjcnkgPSBjcnlJbmZvLmNoYW5uZWxzO1xyXG4gICAgdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQuZGlzYWJsZWQgPSBjcnlJbmZvLmlzUmVmZXJlbmNlO1xyXG4gICAgdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNyeS5wdWxzZTEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChjcnkucHVsc2UxW2luZGV4XS5kdXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnB1bHNlMUNvbW1hbmRzRWxlbWVudC52YWx1ZSA9IHRoaXMucHVsc2UxQ29tbWFuZHNFbGVtZW50LnZhbHVlICtcclxuICAgICAgICAgIFwiZHV0eSAweFwiICsgY3J5LnB1bHNlMVtpbmRleF0uZHV0eS50b1N0cmluZygweDEwKSArIFwiXFxuXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoY3J5LnB1bHNlMVtpbmRleF0ubm90ZSkge1xyXG4gICAgICAgIHRoaXMucHVsc2UxQ29tbWFuZHNFbGVtZW50LnZhbHVlID0gdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQudmFsdWUgK1xyXG4gICAgICAgICAgXCJub3RlIFwiICtcclxuICAgICAgICAgIChjcnkucHVsc2UxW2luZGV4XS5ub3RlWzBdICsgMSkgKyBcIiBcIiArXHJcbiAgICAgICAgICBjcnkucHVsc2UxW2luZGV4XS5ub3RlWzFdICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5LnB1bHNlMVtpbmRleF0ubm90ZVsyXSArIFwiIFwiICtcclxuICAgICAgICAgIGNyeS5wdWxzZTFbaW5kZXhdLm5vdGVbM10gKyBcIlxcblwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wdWxzZTJDb21tYW5kc0VsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgdGhpcy5wdWxzZTJDb21tYW5kc0VsZW1lbnQuZGlzYWJsZWQgPSBjcnlJbmZvLmlzUmVmZXJlbmNlO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNyeS5wdWxzZTIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChjcnkucHVsc2UyW2luZGV4XS5kdXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC52YWx1ZSA9IHRoaXMucHVsc2UyQ29tbWFuZHNFbGVtZW50LnZhbHVlICtcclxuICAgICAgICAgIFwiZHV0eSAweFwiICsgY3J5LnB1bHNlMltpbmRleF0uZHV0eS50b1N0cmluZygweDIwKSArIFwiXFxuXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoY3J5LnB1bHNlMltpbmRleF0ubm90ZSkge1xyXG4gICAgICAgIHRoaXMucHVsc2UyQ29tbWFuZHNFbGVtZW50LnZhbHVlID0gdGhpcy5wdWxzZTJDb21tYW5kc0VsZW1lbnQudmFsdWUgK1xyXG4gICAgICAgICAgXCJub3RlIFwiICtcclxuICAgICAgICAgIChjcnkucHVsc2UyW2luZGV4XS5ub3RlWzBdICsgMikgKyBcIiBcIiArXHJcbiAgICAgICAgICBjcnkucHVsc2UyW2luZGV4XS5ub3RlWzJdICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5LnB1bHNlMltpbmRleF0ubm90ZVsyXSArIFwiIFwiICtcclxuICAgICAgICAgIGNyeS5wdWxzZTJbaW5kZXhdLm5vdGVbM10gKyBcIlxcblwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ub2lzZUNvbW1hbmRzRWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICB0aGlzLm5vaXNlQ29tbWFuZHNFbGVtZW50LmRpc2FibGVkID0gY3J5SW5mby5pc1JlZmVyZW5jZTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjcnkubm9pc2UubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChjcnkubm9pc2VbaW5kZXhdLm5vdGUpIHtcclxuICAgICAgICB0aGlzLm5vaXNlQ29tbWFuZHNFbGVtZW50LnZhbHVlID0gdGhpcy5ub2lzZUNvbW1hbmRzRWxlbWVudC52YWx1ZSArXHJcbiAgICAgICAgICBcIm5vdGUgXCIgK1xyXG4gICAgICAgICAgKGNyeS5ub2lzZVtpbmRleF0ubm90ZVswXSArIDEpICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5Lm5vaXNlW2luZGV4XS5ub3RlWzFdICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5Lm5vaXNlW2luZGV4XS5ub3RlWzJdICsgXCIgMHhcIiArXHJcbiAgICAgICAgICBjcnkubm9pc2VbaW5kZXhdLm5vdGVbM10udG9TdHJpbmcoMHgxMCkgKyBcIlxcblwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuIC8qIHVwZGF0ZVJhd0NvbW1hbmRzKGNyeVR5cGU6IENyeVR5cGUpIHtcclxuICAgIGxldCBjb250ZW50ID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBwdWxzZTEgPSBjcnlUeXBlLnB1bHNlMTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwdWxzZTEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwdWxzZTFbaW5kZXhdO1xyXG4gICAgICBpZiAoY29tbWFuZC5kdXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBkdXR5ID0gY29tbWFuZC5kdXR5O1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCJGQyBcIiArIChkdXR5IDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBkdXR5LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiMlwiICsgKGNvbW1hbmQubm90ZVswXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gKGNvbW1hbmQubm90ZVsxXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIChjb21tYW5kLm5vdGVbMl0gJiAweEYpLnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY29tbWFuZC5ub3RlWzNdICYgMHhGRiwgaGVpZ2h0ID0gKGNvbW1hbmQubm90ZVszXSA+PiA4KSAmIDB4RkY7XHJcbiAgICAgICAgY29udGVudCArPSAobGVuZ3RoIDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBsZW5ndGgudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiICsgKGhlaWdodCA8IDB4MTAgPyBcIjBcIiA6IFwiXCIpICsgaGVpZ2h0LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnQgKz0gXCJGRiBcIjtcclxuXHJcbiAgICBjb25zdCBwdWxzZTIgPSBjcnlUeXBlLnB1bHNlMjtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwdWxzZTIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwdWxzZTJbaW5kZXhdO1xyXG4gICAgICBpZiAoY29tbWFuZC5kdXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBkdXR5ID0gY29tbWFuZC5kdXR5O1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCJGQyBcIiArIChkdXR5IDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBkdXR5LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiMlwiICsgKGNvbW1hbmQubm90ZVswXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gKGNvbW1hbmQubm90ZVsxXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIChjb21tYW5kLm5vdGVbMl0gJiAweEYpLnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY29tbWFuZC5ub3RlWzNdICYgMHhGRiwgaGVpZ2h0ID0gKGNvbW1hbmQubm90ZVszXSA+PiA4KSAmIDB4RkY7XHJcbiAgICAgICAgY29udGVudCArPSAobGVuZ3RoIDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBsZW5ndGgudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiICsgKGhlaWdodCA8IDB4MTAgPyBcIjBcIiA6IFwiXCIpICsgaGVpZ2h0LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnQgKz0gXCJGRiBcIjtcclxuXHJcbiAgICBjb25zdCBub2lzZSA9IGNyeVR5cGUubm9pc2U7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbm9pc2UubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBub2lzZVtpbmRleF07XHJcbiAgICAgIGlmIChjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiMlwiICsgKGNvbW1hbmQubm90ZVswXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gKGNvbW1hbmQubm90ZVsxXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIChjb21tYW5kLm5vdGVbMl0gJiAweEYpLnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY29tbWFuZC5ub3RlWzNdICYgMHhGRjtcclxuICAgICAgICBjb250ZW50ICs9IChsZW5ndGggPCAweDEwID8gXCIwXCIgOiBcIlwiKSArIGxlbmd0aC50b1N0cmluZygweDEwKS50b1VwcGVyQ2FzZSgpICsgXCIgXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50ICs9IFwiRkYgXCI7XHJcblxyXG4gICAgdGhpcy5yYXdDb21tYW5kc0VsZW1lbnQudmFsdWUgPSBjb250ZW50O1xyXG4gIH0qL1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgVWkoKTsiLCJpbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlU2VsZWN0T3B0aW9uID0gKHRleHQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgb3B0aW9uLnZhbHVlID0gdmFsdWU7XHJcbiAgb3B0aW9uLnRleHRDb250ZW50ID0gdGV4dDtcclxuXHJcbiAgcmV0dXJuIG9wdGlvbjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb252ZXJ0UGNtVG9XYXYgPSAoXHJcbiAgZHVyYXRpb25JblNlY29uZHM6IG51bWJlcixcclxuICBudW1iZXJPZkNoYW5uZWxzOiBudW1iZXIsXHJcbiAgc2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gIGJ5dGVzUGVyU2FtcGxlOiBudW1iZXIsXHJcbiAgc2FtcGxlczogbnVtYmVyW11cclxuKSA9PiB7XHJcbiAgY29uc3QgYml0c1BlclNhbXBsZSA9IGJ5dGVzUGVyU2FtcGxlICogODtcclxuICBjb25zdCBzYW1wbGVTaXplID0gbnVtYmVyT2ZDaGFubmVscyAqIGJ5dGVzUGVyU2FtcGxlO1xyXG4gIGNvbnN0IGJ5dGVzUGVyU2Vjb25kID0gc2FtcGxlU2l6ZSAqIHNhbXBsZVJhdGU7XHJcbiAgY29uc3QgZGF0YVNpemUgPSBkdXJhdGlvbkluU2Vjb25kcyAqIGJ5dGVzUGVyU2Vjb25kO1xyXG4gIGNvbnN0IGZ1bGxTaXplID0gNDQgKyBkYXRhU2l6ZTtcclxuXHJcbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKGZ1bGxTaXplKTtcclxuICBsZXQgb2Zmc2V0ID0gMDtcclxuXHJcbiAgYnVmZmVyLndyaXRlKFwiUklGRlwiLCBvZmZzZXQsIFwidXRmOFwiKTtcclxuICBvZmZzZXQgKz0gNDtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDMyTEUoZnVsbFNpemUsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZShcIldBVkVcIiwgb2Zmc2V0LCBcInV0ZjhcIik7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZShcImZtdCBcIiwgb2Zmc2V0LCBcInV0ZjhcIik7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQzMkxFKDE2LCBvZmZzZXQpOyAvLyByZW1haW5pbmcgaGVhZGVyIHNpemVcclxuICBvZmZzZXQgKz0gNDtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDE2TEUoMSwgb2Zmc2V0KTsgLy8gUENNIHR5cGVcclxuICBvZmZzZXQgKz0gMjtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDE2TEUobnVtYmVyT2ZDaGFubmVscywgb2Zmc2V0KTtcclxuICBvZmZzZXQgKz0gMjtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDMyTEUoc2FtcGxlUmF0ZSwgb2Zmc2V0KTtcclxuICBvZmZzZXQgKz0gNDtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDMyTEUoYnl0ZXNQZXJTZWNvbmQsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQxNkxFKHNhbXBsZVNpemUsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDI7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQxNkxFKGJpdHNQZXJTYW1wbGUsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDI7XHJcblxyXG4gIGJ1ZmZlci53cml0ZShcImRhdGFcIiwgb2Zmc2V0LCBcInV0ZjhcIik7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQzMkxFKGRhdGFTaXplLCBvZmZzZXQpO1xyXG4gIG9mZnNldCArPSA0O1xyXG5cclxuICBmb3IgKGxldCBzZWNvbmRJbmRleCA9IDA7IHNlY29uZEluZGV4IDwgZHVyYXRpb25JblNlY29uZHM7IHNlY29uZEluZGV4KyspIHtcclxuICAgIGZvciAobGV0IGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleCA9IDA7IGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleCA8IHNhbXBsZVJhdGU7IGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleCArPSBieXRlc1BlclNhbXBsZSkge1xyXG4gICAgICBjb25zdCBzYW1wbGVJbmRleCA9IHNlY29uZEluZGV4ICogc2FtcGxlUmF0ZSArIGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleDtcclxuXHJcbiAgICAgIGxldCB2YWx1ZSA9IHNhbXBsZXNbc2FtcGxlSW5kZXhdO1xyXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSBicmVhaztcclxuXHJcbiAgICAgIGNvbnN0IHNjYWxlZFZhbHVlID0gKHZhbHVlICogMHhGRikgKyAoMHhGRiAvIDIpO1xyXG4gICAgICB2YWx1ZSA9IHNjYWxlZFZhbHVlICYgMHhGRjtcclxuXHJcbiAgICAgIGJ1ZmZlci53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQpO1xyXG4gICAgICBvZmZzZXQgKz0gYnl0ZXNQZXJTYW1wbGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogXCJhdWRpby93YXZcIiB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNhbXBsZVBjbSA9IChcclxuICBmcm9tU2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gIHRvU2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gIGRhdGE6IG51bWJlcltdLFxyXG4gIHZvbHVtZTogbnVtYmVyID0gMTAwXHJcbikgPT4ge1xyXG4gIGNvbnN0IHJlc2FtcGxlZDogbnVtYmVyW10gPSBbXTtcclxuICBjb25zdCByZXNhbXBsZVJhdGVSYXRpbyA9IGZyb21TYW1wbGVSYXRlIC8gdG9TYW1wbGVSYXRlO1xyXG4gIGNvbnN0IHJlc2FtcGxlZExlbmd0aCA9IE1hdGguY2VpbChkYXRhLmxlbmd0aCAvIHJlc2FtcGxlUmF0ZVJhdGlvKTtcclxuICBjb25zdCB2b2x1bWVGYWN0b3IgPSB2b2x1bWUgLyAweDEwMDtcclxuXHJcbiAgZm9yIChsZXQgcmVzYW1wbGVkSW5kZXggPSAwOyByZXNhbXBsZWRJbmRleCA8IHJlc2FtcGxlZExlbmd0aDsgcmVzYW1wbGVkSW5kZXgrKykge1xyXG4gICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKHJlc2FtcGxlZEluZGV4ICogcmVzYW1wbGVSYXRlUmF0aW8pO1xyXG4gICAgY29uc3QgZnJhY3Rpb24gPSByZXNhbXBsZWRJbmRleCAqIHJlc2FtcGxlUmF0ZVJhdGlvIC0gaW5kZXg7XHJcbiAgICByZXNhbXBsZWRbcmVzYW1wbGVkSW5kZXhdID0gKFxyXG4gICAgICAoMSAtIGZyYWN0aW9uKSAqIGRhdGFbaW5kZXhdICtcclxuICAgICAgZnJhY3Rpb24gKiBkYXRhW2luZGV4ICsgMV1cclxuICAgICkgKiB2b2x1bWVGYWN0b3I7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzYW1wbGVkO1xyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB1aSBmcm9tIFwiLi91aVwiO1xyXG5pbXBvcnQgeyBCYXNlQ3J5TWFuYWdlciB9IGZyb20gXCIuL2RhdGEvQmFzZUNyeU1hbmFnZXJcIjtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgQmFzZUNyeU1hbmFnZXIuaW5pdCgpO1xyXG4gIHVpLmluaXQoKTtcclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9