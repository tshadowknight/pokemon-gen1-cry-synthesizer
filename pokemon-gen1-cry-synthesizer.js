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
            if (_this.currentMonIdx > 151) {
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
            if (_this.currentMonIdx > 151) {
                _data_MonsterManager__WEBPACK_IMPORTED_MODULE_6__.MonsterManager.updatePitch(_this.currentMonIdx, pitch);
            }
            _this.setPitch(pitch);
        };
        this.onLengthChange = function (e) {
            var element = e.currentTarget;
            var length = parseInt(element.value, 10);
            if (_this.currentMonIdx > 151) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZZOztBQUVaLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLFVBQVU7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFWTs7QUFFWixlQUFlLG1CQUFPLENBQUMsb0RBQVc7QUFDbEMsZ0JBQWdCLG1CQUFPLENBQUMsZ0RBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkLGtCQUFrQjtBQUNsQix5QkFBeUI7O0FBRXpCO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLHFCQUFxQixXQUFXLEdBQUcsSUFBSTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLGdCQUFnQixXQUFXLEdBQUcsSUFBSSxLQUFLLGFBQWE7QUFDcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSyxtREFBbUQsY0FBYztBQUN6RixHQUFHO0FBQ0g7QUFDQTtBQUNBLCtCQUErQixJQUFJO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsTUFBTSxhQUFhLFNBQVM7QUFDdEQ7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxnQkFBZ0I7QUFDekIsY0FBYyxvQkFBb0IsRUFBRSxJQUFJO0FBQ3hDO0FBQ0EsWUFBWSxnQkFBZ0IsRUFBRSxJQUFJO0FBQ2xDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixHQUFHLFNBQVMsR0FBRyxLQUFLLHFCQUFxQixFQUFFLEVBQUU7QUFDcEUsUUFBUTtBQUNSLHlCQUF5QixHQUFHLEtBQUsseUJBQXlCLEVBQUUsRUFBRTtBQUM5RCxtQkFBbUIseUJBQXlCLEVBQUUsRUFBRTtBQUNoRDtBQUNBLE1BQU07QUFDTixvQkFBb0IsSUFBSSxFQUFFLEdBQUcsU0FBUyxJQUFJLEVBQUUsRUFBRTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsY0FBYyxTQUFTLE9BQU87QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsWUFBWTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6akVBLCtHQUFlLEdBQUcsSUFBcUMsQ0FBQyxpQ0FBTyxFQUFFLG9DQUFDLENBQUM7QUFBQTtBQUFBO0FBQUEsa0dBQUMsQ0FBQyxLQUFLO0FBQUEsRUFBNkUsQ0FBQyxrQkFBa0IsYUFBYSxnQkFBZ0IsK0JBQStCLFdBQVcsNEZBQTRGLFdBQVcsa0VBQWtFLDREQUE0RCxZQUFZLElBQUksa0JBQWtCLHlCQUF5QiwwREFBMEQsa0JBQWtCLHNCQUFzQix5Q0FBeUMsVUFBVSxjQUFjLHlCQUF5QixvQkFBb0IsSUFBSSxTQUFTLFVBQVUsb0NBQW9DLGNBQWMsSUFBSSx5Q0FBeUMsU0FBUywwQ0FBMEMsMEZBQTBGLDJIQUEySCxxQkFBTSxFQUFFLHFCQUFNLFVBQVUscUJBQU0sQ0FBQyxxQkFBTSx3TUFBd00sOERBQThELHVEQUF1RCxpTkFBaU4sMEJBQTBCLDRCQUE0QixLQUFLLEtBQUssZ0RBQWdELG1GQUFtRixzQkFBc0IsS0FBSyxrQ0FBa0MsaURBQWlELEtBQUssR0FBRyxtQkFBbUIsOEhBQThILG9JQUFvSSxpREFBaUQscUJBQXFCLHVCQUF1QixlQUFlLDBCQUEwQixHQUFHLHdCQUF3Qix5Q0FBeUMsb0JBQW9CLEtBQUssZ0RBQWdELDREQUE0RCxxQkFBcUIsT0FBTyxFQUFFLG9CQUFvQixLQUEwQixxQkFBcUI7O0FBRWhwRix5Qzs7Ozs7Ozs7OztBQ0ZBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUyxXQUFXOztBQUVwQjtBQUNBO0FBQ0E7QUFDQSxTQUFTLFdBQVc7O0FBRXBCO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVMsV0FBVzs7QUFFcEI7QUFDQTtBQUNBLFNBQVMsVUFBVTs7QUFFbkI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtJQUFBO1FBRUUscUJBQWdCLEdBQUcsT0FBTyxDQUFDO1FBQzNCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGdCQUFXLEdBQUcsTUFBTSxDQUFDO0lBbU52QixDQUFDO0lBak5DLDJCQUFJLEdBQUo7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDakUsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBUyxPQUFnQixFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ3RELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEUsZ0VBQWdFO1FBQ2hFLHNEQUFzRDtRQUV0RCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixLQUFzQixVQUFjLEVBQWQsWUFBTyxDQUFDLE1BQU0sRUFBZCxjQUFjLEVBQWQsSUFBYyxFQUFFLENBQUM7WUFBbEMsSUFBTSxPQUFPO1lBQ2hCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDNUIsSUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQ3pFLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELFNBQVMsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixZQUFZLElBQUksUUFBUSxDQUFDO1lBQzNCLENBQUM7UUFDSCxDQUFDO1FBRUQsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLEtBQXNCLFVBQWMsRUFBZCxZQUFPLENBQUMsTUFBTSxFQUFkLGNBQWMsRUFBZCxJQUFjLEVBQUUsQ0FBQztZQUFsQyxJQUFNLE9BQU87WUFDaEIsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM1QixJQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDekUsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekQsU0FBUyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQzdCLFlBQVksSUFBSSxRQUFRLENBQUM7WUFDM0IsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzNFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWxFLE9BQU87WUFDTCxNQUFNO1lBQ04sTUFBTTtZQUNOLEtBQUs7U0FDTixDQUFDO0lBQ0osQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBTyxHQUFXLEVBQUUsTUFBYztRQUNoQyxPQUFPLENBQ0wsQ0FDRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQ2QsR0FBRyxDQUNGLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUNyQixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsK0JBQVEsR0FBUixVQUFTLElBQVksRUFBRSxXQUFtQjtRQUN4QyxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ2IsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLFdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFdBQVcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNELEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxXQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzRCxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sV0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLFdBQVcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCx5Q0FBa0IsR0FBbEIsVUFBbUIsUUFBbUIsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUNuRSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7UUFDeEIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0QyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDckMsSUFBTSxhQUFhLEdBQUcsWUFBWSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzNELElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN0QixDQUFDO2lCQUFNLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNwQixTQUtBLE9BQU8sQ0FBQyxJQUFJLEVBSmQsc0JBQXNCLFVBQ3RCLE1BQU0sVUFDTixVQUFVLFVBQ1Ysd0JBQXdCLFFBQ1YsQ0FBQztnQkFFakIseUNBQXlDO2dCQUN6QyxJQUFJLFNBQVMsR0FBRyxDQUNkLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDaEIsQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FDN0IsR0FBRyxTQUFTLENBQUM7Z0JBQ2QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUQsU0FBUyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQzdCLDREQUE0RDtnQkFDNUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQ25DLElBQUksR0FBRyxDQUNMLENBQ0Usd0JBQXdCO29CQUN4QixLQUFLLENBQ04sR0FBRyxLQUFLLENBQ1YsQ0FDRixHQUFHLE1BQU0sQ0FBQztnQkFDWCxrQkFBa0I7Z0JBRWxCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxJQUFJLENBQUMsYUFBYSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7b0JBQ3ZHLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUN2RCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNqRCxXQUFXLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDMUIsV0FBVyxHQUFHLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixXQUFXLENBQUM7b0JBQ2QsV0FBVyxFQUFFLENBQUM7b0JBRWQsOEJBQThCO29CQUM5QixJQUNFLEtBQUssR0FBRyxXQUFXO3dCQUNuQixXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDLEVBQ3hDLENBQUM7d0JBQ0QsSUFBSSxHQUFHLENBQ0wsQ0FDRSxDQUNFLElBQUksR0FBRyxJQUFJLENBQ1osSUFBSSxDQUFDLENBQ1AsR0FBRyxDQUNGLENBQ0UsSUFBSSxHQUFHLElBQUksQ0FDWixJQUFJLENBQUMsQ0FDUCxDQUNGLENBQUM7b0JBQ0osQ0FBQztvQkFFRCw2Q0FBNkM7b0JBQzdDLElBQ0UsVUFBVSxLQUFLLENBQUM7d0JBQ2hCLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUNqRSxDQUFDO3dCQUNELE1BQU0sSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM1RCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsWUFBWSxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELG9DQUFhLEdBQWIsVUFBYyxRQUFtQixFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsTUFBYztRQUM5RSxJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7UUFDeEIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsT0FBTyxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RDLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxJQUFNLGFBQWEsR0FBRyxZQUFZLEtBQUssUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDM0QsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN4Qix5Q0FBeUM7WUFDekMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUMvRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFELFNBQVMsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzdCLDBCQUEwQjtZQUMxQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzVHLGtCQUFrQjtZQUNsQixJQUFJLEtBQUssR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDaEMsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLG1GQUFtRjtZQUU5SCxJQUFJLE9BQU8sR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQzNCLElBQUksS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztZQUUxQixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsSUFBSSxDQUFDLGFBQWEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUN2RyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbEQsV0FBVyxFQUFFLENBQUM7Z0JBQ2QscUNBQXFDO2dCQUNyQyxJQUNFLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFDOUUsQ0FBQztvQkFDRCxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNuRSxJQUFJLEtBQUs7d0JBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDL0UsQ0FBQztnQkFDRCw2Q0FBNkM7Z0JBQzdDLElBQ0UsVUFBVSxLQUFLLENBQUM7b0JBQ2hCLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUNqRSxDQUFDO29CQUNELE1BQU0sSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1RCxDQUFDO1lBQ0gsQ0FBQztZQUNELFlBQVksRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCwyQkFBSSxHQUFKLFVBQUssSUFBYztRQUNqQixJQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUNoRCxDQUFDLEVBQ0QsTUFBTSxDQUFDLE1BQU0sRUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FDN0IsQ0FBQztRQUNGLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXJDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN0RCxNQUFNLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hORCxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBR2hDO0lBQUE7SUE0RUEsQ0FBQztJQXhFVSxtQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSxrQkFBRyxHQUFWLFVBQVcsR0FBRztRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sdUJBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFTSxzQkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0sb0JBQUssR0FBWjtRQUNJLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSxxQkFBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ1gsUUFBUSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxFQUVUO2dCQUNELFFBQVEsRUFBRSxFQUVUO2dCQUNELE9BQU8sRUFBRSxFQUVSO2FBQ0o7WUFDRCxJQUFJLEVBQUUsY0FBYztZQUNwQixhQUFhLEVBQUUsS0FBSztTQUN2QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDWixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0scUJBQU0sR0FBYixVQUFjLEdBQUc7UUFDYixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0sbUJBQUksR0FBWCxVQUFZLEdBQUc7UUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSx5QkFBVSxHQUFqQixVQUFrQixHQUFHLEVBQUUsSUFBSTtRQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0sNkJBQWMsR0FBckIsVUFBc0IsR0FBRyxFQUFFLFFBQVE7UUFDL0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQXpFTSx1QkFBUSxHQUFHLDJCQUEyQixDQUFDO0lBQ3ZDLHdCQUFTLEdBQUcsRUFBRSxDQUFDO0lBeUUxQixxQkFBQztDQUFBO0FBNUUwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSjNCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFaEM7SUFBQTtJQTBGQSxDQUFDO0lBckZVLG1CQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVNLGtCQUFHLEdBQVYsVUFBVyxHQUFHO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSx3QkFBUyxHQUFoQixVQUFpQixJQUFJO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQU8sSUFBSSxjQUFPLENBQUMsSUFBSSxLQUFLLElBQUksRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSx1QkFBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVNLHNCQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSxvQkFBSyxHQUFaO1FBQ0ksRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0scUJBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNYLElBQUksRUFBRSxhQUFhO1lBQ25CLEdBQUcsRUFBRSxDQUFDO1lBQ04sS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxxQkFBTSxHQUFiLFVBQWMsR0FBRztRQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSxtQkFBSSxHQUFYLFVBQVksR0FBRztRQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLHlCQUFVLEdBQWpCLFVBQWtCLEdBQUcsRUFBRSxJQUFJO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSx3QkFBUyxHQUFoQixVQUFpQixHQUFHLEVBQUUsR0FBRztRQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0sMEJBQVcsR0FBbEIsVUFBbUIsR0FBRyxFQUFFLEtBQUs7UUFDekIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLDJCQUFZLEdBQW5CLFVBQW9CLEdBQUcsRUFBRSxNQUFNO1FBQzNCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSw0QkFBYSxHQUFwQixVQUFxQixHQUFHLEVBQUUsT0FBTztRQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMseUJBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBSyxPQUFPLENBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQXRGTSx1QkFBUSxHQUFHLHlCQUF5QixDQUFDO0lBQ3JDLHdCQUFTLEdBQUcsRUFBRSxDQUFDO0lBdUYxQixxQkFBQztDQUFBO0FBMUYwQjs7Ozs7Ozs7Ozs7Ozs7OztBQ0EzQixpRUFBZTtJQUNiO1FBQ0UsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUUsRUFDUjtLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRSxFQUNSO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNsRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsV0FBVztTQUNuRDtRQUNELFFBQVEsRUFBRSxFQUNUO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRyxhQUFhO1lBQ3JELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsYUFBYTtTQUNyRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUcsWUFBWTtTQUNyRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVztZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNyQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDckMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFLEVBQ1I7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNyQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLGFBQWE7U0FDckQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLGFBQWE7U0FDckQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLGFBQWE7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRSxFQUNSO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsYUFBYTtTQUNyRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3JDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsYUFBYTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsYUFBYTtTQUNyRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3JDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ3JDO0tBQ0YsRUFBRTtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELFFBQVEsRUFBRTtZQUNSLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUNoQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNuRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsWUFBWTtTQUNwRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsT0FBTyxFQUFFLEVBQUU7S0FDWixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFHLFlBQVk7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFHLFlBQVk7WUFDcEQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFHLFlBQVk7U0FDckQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUcsWUFBWTtZQUNwRCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUcsWUFBWTtTQUNyRDtRQUNELE9BQU8sRUFBRTtZQUNQLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhO1lBQ3BELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxhQUFhO1NBQ3JEO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNyQztLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxRQUFRLEVBQUU7WUFDUixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDaEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVk7WUFDbkQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFFLFlBQVk7U0FDcEQ7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDckM7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxZQUFZO1NBQ3BEO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZO1lBQ25ELEVBQUUsTUFB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QUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLGdFQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsMkNBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL25vZGVfbW9kdWxlcy9maWxlLXNhdmVyL2Rpc3QvRmlsZVNhdmVyLm1pbi5qcyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL3NyYy9DcnlHZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL3NyYy9kYXRhL0Jhc2VDcnlNYW5hZ2VyLnRzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9zcmMvZGF0YS9Nb25zdGVyTWFuYWdlci50cyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vc3JjL2RhdGEvY3J5VHlwZXMudHMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL3NyYy91aS9XYXZlRGlhZ3JhbS50cyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyLy4vc3JjL3VpL2luZGV4LnRzIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3Bva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcG9rZW1vbi1nZW4xLWNyeS1zeW50aGVzaXplci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJwb2tlbW9uLWdlbjEtY3J5LXN5bnRoZXNpemVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInBva2Vtb24tZ2VuMS1jcnktc3ludGhlc2l6ZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgKCkgPT4ge1xucmV0dXJuICIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayhcbiAgICAgIHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aClcbiAgICApKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxuY29uc3QgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxuY29uc3QgY3VzdG9tSW5zcGVjdFN5bWJvbCA9XG4gICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2xbJ2ZvciddID09PSAnZnVuY3Rpb24nKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuICAgID8gU3ltYm9sWydmb3InXSgnbm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b20nKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuICAgIDogbnVsbFxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbmNvbnN0IEtfTUFYX0xFTkdUSCA9IDB4N2ZmZmZmZmZcbmV4cG9ydHMua01heExlbmd0aCA9IEtfTUFYX0xFTkdUSFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBQcmludCB3YXJuaW5nIGFuZCByZWNvbW1lbmQgdXNpbmcgYGJ1ZmZlcmAgdjQueCB3aGljaCBoYXMgYW4gT2JqZWN0XG4gKiAgICAgICAgICAgICAgIGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBXZSByZXBvcnQgdGhhdCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBpZiB0aGUgYXJlIG5vdCBzdWJjbGFzc2FibGVcbiAqIHVzaW5nIF9fcHJvdG9fXy4gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWBcbiAqIChTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOCkuIElFIDEwIGxhY2tzIHN1cHBvcnRcbiAqIGZvciBfX3Byb3RvX18gYW5kIGhhcyBhIGJ1Z2d5IHR5cGVkIGFycmF5IGltcGxlbWVudGF0aW9uLlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICBjb25zb2xlLmVycm9yKFxuICAgICdUaGlzIGJyb3dzZXIgbGFja3MgdHlwZWQgYXJyYXkgKFVpbnQ4QXJyYXkpIHN1cHBvcnQgd2hpY2ggaXMgcmVxdWlyZWQgYnkgJyArXG4gICAgJ2BidWZmZXJgIHY1LnguIFVzZSBgYnVmZmVyYCB2NC54IGlmIHlvdSByZXF1aXJlIG9sZCBicm93c2VyIHN1cHBvcnQuJ1xuICApXG59XG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgLy8gQ2FuIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkP1xuICB0cnkge1xuICAgIGNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgY29uc3QgcHJvdG8gPSB7IGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfSB9XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHByb3RvLCBVaW50OEFycmF5LnByb3RvdHlwZSlcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoYXJyLCBwcm90bylcbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MlxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdwYXJlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyXG4gIH1cbn0pXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIucHJvdG90eXBlLCAnb2Zmc2V0Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0aGlzKSkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzLmJ5dGVPZmZzZXRcbiAgfVxufSlcblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKGxlbmd0aCA+IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgXCInICsgbGVuZ3RoICsgJ1wiIGlzIGludmFsaWQgZm9yIG9wdGlvbiBcInNpemVcIicpXG4gIH1cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoYnVmLCBCdWZmZXIucHJvdG90eXBlKVxuICByZXR1cm4gYnVmXG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ1RoZSBcInN0cmluZ1wiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBzdHJpbmcuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUoYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuZnVuY3Rpb24gZnJvbSAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5Vmlldyh2YWx1ZSlcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAgICdvciBBcnJheS1saWtlIE9iamVjdC4gUmVjZWl2ZWQgdHlwZSAnICsgKHR5cGVvZiB2YWx1ZSlcbiAgICApXG4gIH1cblxuICBpZiAoaXNJbnN0YW5jZSh2YWx1ZSwgQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIEFycmF5QnVmZmVyKSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgKGlzSW5zdGFuY2UodmFsdWUsIFNoYXJlZEFycmF5QnVmZmVyKSB8fFxuICAgICAgKHZhbHVlICYmIGlzSW5zdGFuY2UodmFsdWUuYnVmZmVyLCBTaGFyZWRBcnJheUJ1ZmZlcikpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG9mIHR5cGUgbnVtYmVyLiBSZWNlaXZlZCB0eXBlIG51bWJlcidcbiAgICApXG4gIH1cblxuICBjb25zdCB2YWx1ZU9mID0gdmFsdWUudmFsdWVPZiAmJiB2YWx1ZS52YWx1ZU9mKClcbiAgaWYgKHZhbHVlT2YgIT0gbnVsbCAmJiB2YWx1ZU9mICE9PSB2YWx1ZSkge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZU9mLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBjb25zdCBiID0gZnJvbU9iamVjdCh2YWx1ZSlcbiAgaWYgKGIpIHJldHVybiBiXG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1ByaW1pdGl2ZSAhPSBudWxsICYmXG4gICAgICB0eXBlb2YgdmFsdWVbU3ltYm9sLnRvUHJpbWl0aXZlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdKCdzdHJpbmcnKSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAnVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgJyArXG4gICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICApXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20odmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuLy8gTm90ZTogQ2hhbmdlIHByb3RvdHlwZSAqYWZ0ZXIqIEJ1ZmZlci5mcm9tIGlzIGRlZmluZWQgdG8gd29ya2Fyb3VuZCBDaHJvbWUgYnVnOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC8xNDhcbk9iamVjdC5zZXRQcm90b3R5cGVPZihCdWZmZXIucHJvdG90eXBlLCBVaW50OEFycmF5LnByb3RvdHlwZSlcbk9iamVjdC5zZXRQcm90b3R5cGVPZihCdWZmZXIsIFVpbnQ4QXJyYXkpXG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBzaXplICsgJ1wiIGlzIGludmFsaWQgZm9yIG9wdGlvbiBcInNpemVcIicpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcihzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2Moc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlIChzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgfVxuXG4gIGNvbnN0IGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIGxldCBidWYgPSBjcmVhdGVCdWZmZXIobGVuZ3RoKVxuXG4gIGNvbnN0IGFjdHVhbCA9IGJ1Zi53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgYnVmID0gYnVmLnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAoYXJyYXkpIHtcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBidWZbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5VmlldyAoYXJyYXlWaWV3KSB7XG4gIGlmIChpc0luc3RhbmNlKGFycmF5VmlldywgVWludDhBcnJheSkpIHtcbiAgICBjb25zdCBjb3B5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlWaWV3KVxuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIoY29weS5idWZmZXIsIGNvcHkuYnl0ZU9mZnNldCwgY29weS5ieXRlTGVuZ3RoKVxuICB9XG4gIHJldHVybiBmcm9tQXJyYXlMaWtlKGFycmF5Vmlldylcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyIChhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcIm9mZnNldFwiIGlzIG91dHNpZGUgb2YgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wibGVuZ3RoXCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGxldCBidWZcbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0IChvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgY29uc3QgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICBjb25zdCBidWYgPSBjcmVhdGVCdWZmZXIobGVuKVxuXG4gICAgaWYgKGJ1Zi5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBidWZcbiAgICB9XG5cbiAgICBvYmouY29weShidWYsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gYnVmXG4gIH1cblxuICBpZiAob2JqLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBudW1iZXJJc05hTihvYmoubGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcigwKVxuICAgIH1cbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmopXG4gIH1cblxuICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIEFycmF5LmlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUxpa2Uob2JqLmRhdGEpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IEtfTUFYX0xFTkdUSGAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBLX01BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsgS19NQVhfTEVOR1RILnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyID09PSB0cnVlICYmXG4gICAgYiAhPT0gQnVmZmVyLnByb3RvdHlwZSAvLyBzbyBCdWZmZXIuaXNCdWZmZXIoQnVmZmVyLnByb3RvdHlwZSkgd2lsbCBiZSBmYWxzZVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYSwgVWludDhBcnJheSkpIGEgPSBCdWZmZXIuZnJvbShhLCBhLm9mZnNldCwgYS5ieXRlTGVuZ3RoKVxuICBpZiAoaXNJbnN0YW5jZShiLCBVaW50OEFycmF5KSkgYiA9IEJ1ZmZlci5mcm9tKGIsIGIub2Zmc2V0LCBiLmJ5dGVMZW5ndGgpXG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcImJ1ZjFcIiwgXCJidWYyXCIgYXJndW1lbnRzIG11c3QgYmUgb25lIG9mIHR5cGUgQnVmZmVyIG9yIFVpbnQ4QXJyYXknXG4gICAgKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgbGV0IHggPSBhLmxlbmd0aFxuICBsZXQgeSA9IGIubGVuZ3RoXG5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICBsZXQgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIGxldCBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgbGV0IGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoaXNJbnN0YW5jZShidWYsIFVpbnQ4QXJyYXkpKSB7XG4gICAgICBpZiAocG9zICsgYnVmLmxlbmd0aCA+IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgYnVmID0gQnVmZmVyLmZyb20oYnVmKVxuICAgICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICBidWYsXG4gICAgICAgICAgcG9zXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgfVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IGlzSW5zdGFuY2Uoc3RyaW5nLCBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInN0cmluZ1wiIGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgc3RyaW5nLCBCdWZmZXIsIG9yIEFycmF5QnVmZmVyLiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2Ygc3RyaW5nXG4gICAgKVxuICB9XG5cbiAgY29uc3QgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBjb25zdCBtdXN0TWF0Y2ggPSAoYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdID09PSB0cnVlKVxuICBpZiAoIW11c3RNYXRjaCAmJiBsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHtcbiAgICAgICAgICByZXR1cm4gbXVzdE1hdGNoID8gLTEgOiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICB9XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcmNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIChhbmQgdGhlIGBpcy1idWZmZXJgIG5wbSBwYWNrYWdlKVxuLy8gdG8gZGV0ZWN0IGEgQnVmZmVyIGluc3RhbmNlLiBJdCdzIG5vdCBwb3NzaWJsZSB0byB1c2UgYGluc3RhbmNlb2YgQnVmZmVyYFxuLy8gcmVsaWFibHkgaW4gYSBicm93c2VyaWZ5IGNvbnRleHQgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBtdWx0aXBsZSBkaWZmZXJlbnRcbi8vIGNvcGllcyBvZiB0aGUgJ2J1ZmZlcicgcGFja2FnZSBpbiB1c2UuIFRoaXMgbWV0aG9kIHdvcmtzIGV2ZW4gZm9yIEJ1ZmZlclxuLy8gaW5zdGFuY2VzIHRoYXQgd2VyZSBjcmVhdGVkIGZyb20gYW5vdGhlciBjb3B5IG9mIHRoZSBgYnVmZmVyYCBwYWNrYWdlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTU0XG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICBjb25zdCBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0xvY2FsZVN0cmluZyA9IEJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmdcblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICBsZXQgc3RyID0gJydcbiAgY29uc3QgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLnJlcGxhY2UoLyguezJ9KS9nLCAnJDEgJykudHJpbSgpXG4gIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cbmlmIChjdXN0b21JbnNwZWN0U3ltYm9sKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGVbY3VzdG9tSW5zcGVjdFN5bWJvbF0gPSBCdWZmZXIucHJvdG90eXBlLmluc3BlY3Rcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKGlzSW5zdGFuY2UodGFyZ2V0LCBVaW50OEFycmF5KSkge1xuICAgIHRhcmdldCA9IEJ1ZmZlci5mcm9tKHRhcmdldCwgdGFyZ2V0Lm9mZnNldCwgdGFyZ2V0LmJ5dGVMZW5ndGgpXG4gIH1cbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwidGFyZ2V0XCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheS4gJyArXG4gICAgICAnUmVjZWl2ZWQgdHlwZSAnICsgKHR5cGVvZiB0YXJnZXQpXG4gICAgKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgbGV0IHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIGxldCB5ID0gZW5kIC0gc3RhcnRcbiAgY29uc3QgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICBjb25zdCB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICBjb25zdCB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAobnVtYmVySXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmICh0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbdmFsXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgbGV0IGluZGV4U2l6ZSA9IDFcbiAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgbGV0IHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgbGV0IGlcbiAgaWYgKGRpcikge1xuICAgIGxldCBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgY29uc3QgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGxldCBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAobnVtYmVySXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCA+Pj4gMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICBjb25zdCByZXMgPSBbXVxuXG4gIGxldCBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICBjb25zdCBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICBsZXQgY29kZVBvaW50ID0gbnVsbFxuICAgIGxldCBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpXG4gICAgICA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpXG4gICAgICAgICAgPyAzXG4gICAgICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRilcbiAgICAgICAgICAgICAgPyAyXG4gICAgICAgICAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgbGV0IHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxuY29uc3QgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIGNvbnN0IGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgbGV0IHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIGxldCBvdXQgPSAnJ1xuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSBoZXhTbGljZUxvb2t1cFRhYmxlW2J1ZltpXV1cbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIGxldCByZXMgPSAnJ1xuICAvLyBJZiBieXRlcy5sZW5ndGggaXMgb2RkLCB0aGUgbGFzdCA4IGJpdHMgbXVzdCBiZSBpZ25vcmVkIChzYW1lIGFzIG5vZGUuanMpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoIC0gMTsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyAoYnl0ZXNbaSArIDFdICogMjU2KSlcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIGNvbnN0IG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5ld0J1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgbGV0IG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50OCA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDMyTEUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiByZWFkQmlnVUludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCBsbyA9IGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjRcblxuICBjb25zdCBoaSA9IHRoaXNbKytvZmZzZXRdICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICBsYXN0ICogMiAqKiAyNFxuXG4gIHJldHVybiBCaWdJbnQobG8pICsgKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRCRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGhpID0gZmlyc3QgKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XVxuXG4gIGNvbnN0IGxvID0gdGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0XG5cbiAgcmV0dXJuIChCaWdJbnQoaGkpIDw8IEJpZ0ludCgzMikpICsgQmlnSW50KGxvKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0XVxuICBsZXQgbXVsID0gMVxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aFxuICBsZXQgbXVsID0gMVxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIGNvbnN0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NExFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyA0XSArXG4gICAgdGhpc1tvZmZzZXQgKyA1XSAqIDIgKiogOCArXG4gICAgdGhpc1tvZmZzZXQgKyA2XSAqIDIgKiogMTYgK1xuICAgIChsYXN0IDw8IDI0KSAvLyBPdmVyZmxvd1xuXG4gIHJldHVybiAoQmlnSW50KHZhbCkgPDwgQmlnSW50KDMyKSkgK1xuICAgIEJpZ0ludChmaXJzdCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDI0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnSW50NjRCRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiByZWFkQmlnSW50NjRCRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IHZhbCA9IChmaXJzdCA8PCAyNCkgKyAvLyBPdmVyZmxvd1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KHRoaXNbKytvZmZzZXRdICogMiAqKiAyNCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgbGFzdClcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludExFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoIC0gMVxuICBsZXQgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQxNkJFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDMyQkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gd3J0QmlnVUludDY0TEUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbWluLCBtYXgpIHtcbiAgY2hlY2tJbnRCSSh2YWx1ZSwgbWluLCBtYXgsIGJ1Ziwgb2Zmc2V0LCA3KVxuXG4gIGxldCBsbyA9IE51bWJlcih2YWx1ZSAmIEJpZ0ludCgweGZmZmZmZmZmKSlcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgcmV0dXJuIG9mZnNldFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRCRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgN10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDZdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA1XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNF0gPSBsb1xuICBsZXQgaGkgPSBOdW1iZXIodmFsdWUgPj4gQmlnSW50KDMyKSAmIEJpZ0ludCgweGZmZmZmZmZmKSlcbiAgYnVmW29mZnNldCArIDNdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAyXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0ICsgMV0gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldF0gPSBoaVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlQmlnVUludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdVSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIEJpZ0ludCgwKSwgQmlnSW50KCcweGZmZmZmZmZmZmZmZmZmZmYnKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRCRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBsaW1pdCA9IE1hdGgucG93KDIsICg4ICogYnl0ZUxlbmd0aCkgLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICBsZXQgaSA9IDBcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBsaW1pdCA9IE1hdGgucG93KDIsICg4ICogYnl0ZUxlbmd0aCkgLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIGxldCBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlQmlnSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ0ludDY0TEUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRMRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAtQmlnSW50KCcweDgwMDAwMDAwMDAwMDAwMDAnKSwgQmlnSW50KCcweDdmZmZmZmZmZmZmZmZmZmYnKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRCRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NEJFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc2hvdWxkIGJlIGEgQnVmZmVyJylcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIGNvbnN0IGxlbiA9IGVuZCAtIHN0YXJ0XG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIFVzZSBidWlsdC1pbiB3aGVuIGF2YWlsYWJsZSwgbWlzc2luZyBmcm9tIElFMTFcbiAgICB0aGlzLmNvcHlXaXRoaW4odGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpXG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoKGVuY29kaW5nID09PSAndXRmOCcgJiYgY29kZSA8IDEyOCkgfHxcbiAgICAgICAgICBlbmNvZGluZyA9PT0gJ2xhdGluMScpIHtcbiAgICAgICAgLy8gRmFzdCBwYXRoOiBJZiBgdmFsYCBmaXRzIGludG8gYSBzaW5nbGUgYnl0ZSwgdXNlIHRoYXQgbnVtZXJpYyB2YWx1ZS5cbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdib29sZWFuJykge1xuICAgIHZhbCA9IE51bWJlcih2YWwpXG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgbGV0IGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICAgIGNvbnN0IGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGlmIChsZW4gPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyB2YWwgK1xuICAgICAgICAnXCIgaXMgaW52YWxpZCBmb3IgYXJndW1lbnQgXCJ2YWx1ZVwiJylcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gQ1VTVE9NIEVSUk9SU1xuLy8gPT09PT09PT09PT09PVxuXG4vLyBTaW1wbGlmaWVkIHZlcnNpb25zIGZyb20gTm9kZSwgY2hhbmdlZCBmb3IgQnVmZmVyLW9ubHkgdXNhZ2VcbmNvbnN0IGVycm9ycyA9IHt9XG5mdW5jdGlvbiBFIChzeW0sIGdldE1lc3NhZ2UsIEJhc2UpIHtcbiAgZXJyb3JzW3N5bV0gPSBjbGFzcyBOb2RlRXJyb3IgZXh0ZW5kcyBCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICBzdXBlcigpXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVzc2FnZScsIHtcbiAgICAgICAgdmFsdWU6IGdldE1lc3NhZ2UuYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSlcblxuICAgICAgLy8gQWRkIHRoZSBlcnJvciBjb2RlIHRvIHRoZSBuYW1lIHRvIGluY2x1ZGUgaXQgaW4gdGhlIHN0YWNrIHRyYWNlLlxuICAgICAgdGhpcy5uYW1lID0gYCR7dGhpcy5uYW1lfSBbJHtzeW19XWBcbiAgICAgIC8vIEFjY2VzcyB0aGUgc3RhY2sgdG8gZ2VuZXJhdGUgdGhlIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBlcnJvciBjb2RlXG4gICAgICAvLyBmcm9tIHRoZSBuYW1lLlxuICAgICAgdGhpcy5zdGFjayAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgLy8gUmVzZXQgdGhlIG5hbWUgdG8gdGhlIGFjdHVhbCBuYW1lLlxuICAgICAgZGVsZXRlIHRoaXMubmFtZVxuICAgIH1cblxuICAgIGdldCBjb2RlICgpIHtcbiAgICAgIHJldHVybiBzeW1cbiAgICB9XG5cbiAgICBzZXQgY29kZSAodmFsdWUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29kZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdG9TdHJpbmcgKCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gWyR7c3ltfV06ICR7dGhpcy5tZXNzYWdlfWBcbiAgICB9XG4gIH1cbn1cblxuRSgnRVJSX0JVRkZFUl9PVVRfT0ZfQk9VTkRTJyxcbiAgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuIGAke25hbWV9IGlzIG91dHNpZGUgb2YgYnVmZmVyIGJvdW5kc2BcbiAgICB9XG5cbiAgICByZXR1cm4gJ0F0dGVtcHQgdG8gYWNjZXNzIG1lbW9yeSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnXG4gIH0sIFJhbmdlRXJyb3IpXG5FKCdFUlJfSU5WQUxJRF9BUkdfVFlQRScsXG4gIGZ1bmN0aW9uIChuYW1lLCBhY3R1YWwpIHtcbiAgICByZXR1cm4gYFRoZSBcIiR7bmFtZX1cIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyLiBSZWNlaXZlZCB0eXBlICR7dHlwZW9mIGFjdHVhbH1gXG4gIH0sIFR5cGVFcnJvcilcbkUoJ0VSUl9PVVRfT0ZfUkFOR0UnLFxuICBmdW5jdGlvbiAoc3RyLCByYW5nZSwgaW5wdXQpIHtcbiAgICBsZXQgbXNnID0gYFRoZSB2YWx1ZSBvZiBcIiR7c3RyfVwiIGlzIG91dCBvZiByYW5nZS5gXG4gICAgbGV0IHJlY2VpdmVkID0gaW5wdXRcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihpbnB1dCkgJiYgTWF0aC5hYnMoaW5wdXQpID4gMiAqKiAzMikge1xuICAgICAgcmVjZWl2ZWQgPSBhZGROdW1lcmljYWxTZXBhcmF0b3IoU3RyaW5nKGlucHV0KSlcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ2JpZ2ludCcpIHtcbiAgICAgIHJlY2VpdmVkID0gU3RyaW5nKGlucHV0KVxuICAgICAgaWYgKGlucHV0ID4gQmlnSW50KDIpICoqIEJpZ0ludCgzMikgfHwgaW5wdXQgPCAtKEJpZ0ludCgyKSAqKiBCaWdJbnQoMzIpKSkge1xuICAgICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihyZWNlaXZlZClcbiAgICAgIH1cbiAgICAgIHJlY2VpdmVkICs9ICduJ1xuICAgIH1cbiAgICBtc2cgKz0gYCBJdCBtdXN0IGJlICR7cmFuZ2V9LiBSZWNlaXZlZCAke3JlY2VpdmVkfWBcbiAgICByZXR1cm4gbXNnXG4gIH0sIFJhbmdlRXJyb3IpXG5cbmZ1bmN0aW9uIGFkZE51bWVyaWNhbFNlcGFyYXRvciAodmFsKSB7XG4gIGxldCByZXMgPSAnJ1xuICBsZXQgaSA9IHZhbC5sZW5ndGhcbiAgY29uc3Qgc3RhcnQgPSB2YWxbMF0gPT09ICctJyA/IDEgOiAwXG4gIGZvciAoOyBpID49IHN0YXJ0ICsgNDsgaSAtPSAzKSB7XG4gICAgcmVzID0gYF8ke3ZhbC5zbGljZShpIC0gMywgaSl9JHtyZXN9YFxuICB9XG4gIHJldHVybiBgJHt2YWwuc2xpY2UoMCwgaSl9JHtyZXN9YFxufVxuXG4vLyBDSEVDSyBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBjaGVja0JvdW5kcyAoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpIHtcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgaWYgKGJ1ZltvZmZzZXRdID09PSB1bmRlZmluZWQgfHwgYnVmW29mZnNldCArIGJ5dGVMZW5ndGhdID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIGJ1Zi5sZW5ndGggLSAoYnl0ZUxlbmd0aCArIDEpKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50QkkgKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpIHtcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB7XG4gICAgY29uc3QgbiA9IHR5cGVvZiBtaW4gPT09ICdiaWdpbnQnID8gJ24nIDogJydcbiAgICBsZXQgcmFuZ2VcbiAgICBpZiAoYnl0ZUxlbmd0aCA+IDMpIHtcbiAgICAgIGlmIChtaW4gPT09IDAgfHwgbWluID09PSBCaWdJbnQoMCkpIHtcbiAgICAgICAgcmFuZ2UgPSBgPj0gMCR7bn0gYW5kIDwgMiR7bn0gKiogJHsoYnl0ZUxlbmd0aCArIDEpICogOH0ke259YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmFuZ2UgPSBgPj0gLSgyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4IC0gMX0ke259KSBhbmQgPCAyICoqIGAgK1xuICAgICAgICAgICAgICAgIGAkeyhieXRlTGVuZ3RoICsgMSkgKiA4IC0gMX0ke259YFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZSA9IGA+PSAke21pbn0ke259IGFuZCA8PSAke21heH0ke259YFxuICAgIH1cbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UoJ3ZhbHVlJywgcmFuZ2UsIHZhbHVlKVxuICB9XG4gIGNoZWNrQm91bmRzKGJ1Ziwgb2Zmc2V0LCBieXRlTGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU51bWJlciAodmFsdWUsIG5hbWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9JTlZBTElEX0FSR19UWVBFKG5hbWUsICdudW1iZXInLCB2YWx1ZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBib3VuZHNFcnJvciAodmFsdWUsIGxlbmd0aCwgdHlwZSkge1xuICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgIT09IHZhbHVlKSB7XG4gICAgdmFsaWRhdGVOdW1iZXIodmFsdWUsIHR5cGUpXG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsICdhbiBpbnRlZ2VyJywgdmFsdWUpXG4gIH1cblxuICBpZiAobGVuZ3RoIDwgMCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0JVRkZFUl9PVVRfT0ZfQk9VTkRTKClcbiAgfVxuXG4gIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSh0eXBlIHx8ICdvZmZzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYD49ICR7dHlwZSA/IDEgOiAwfSBhbmQgPD0gJHtsZW5ndGh9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlKVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmNvbnN0IElOVkFMSURfQkFTRTY0X1JFID0gL1teKy8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgdGFrZXMgZXF1YWwgc2lnbnMgYXMgZW5kIG9mIHRoZSBCYXNlNjQgZW5jb2RpbmdcbiAgc3RyID0gc3RyLnNwbGl0KCc9JylbMF1cbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0ci50cmltKCkucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICBsZXQgY29kZVBvaW50XG4gIGNvbnN0IGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgbGV0IGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIGNvbnN0IGJ5dGVzID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICBsZXQgYywgaGksIGxvXG4gIGNvbnN0IGJ5dGVBcnJheSA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbi8vIEFycmF5QnVmZmVyIG9yIFVpbnQ4QXJyYXkgb2JqZWN0cyBmcm9tIG90aGVyIGNvbnRleHRzIChpLmUuIGlmcmFtZXMpIGRvIG5vdCBwYXNzXG4vLyB0aGUgYGluc3RhbmNlb2ZgIGNoZWNrIGJ1dCB0aGV5IHNob3VsZCBiZSB0cmVhdGVkIGFzIG9mIHRoYXQgdHlwZS5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzE2NlxuZnVuY3Rpb24gaXNJbnN0YW5jZSAob2JqLCB0eXBlKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiB0eXBlIHx8XG4gICAgKG9iaiAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3RvciAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3Rvci5uYW1lICE9IG51bGwgJiZcbiAgICAgIG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSB0eXBlLm5hbWUpXG59XG5mdW5jdGlvbiBudW1iZXJJc05hTiAob2JqKSB7XG4gIC8vIEZvciBJRTExIHN1cHBvcnRcbiAgcmV0dXJuIG9iaiAhPT0gb2JqIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG5cbi8vIENyZWF0ZSBsb29rdXAgdGFibGUgZm9yIGB0b1N0cmluZygnaGV4JylgXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8yMTlcbmNvbnN0IGhleFNsaWNlTG9va3VwVGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBhbHBoYWJldCA9ICcwMTIzNDU2Nzg5YWJjZGVmJ1xuICBjb25zdCB0YWJsZSA9IG5ldyBBcnJheSgyNTYpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgIGNvbnN0IGkxNiA9IGkgKiAxNlxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTY7ICsraikge1xuICAgICAgdGFibGVbaTE2ICsgal0gPSBhbHBoYWJldFtpXSArIGFscGhhYmV0W2pdXG4gICAgfVxuICB9XG4gIHJldHVybiB0YWJsZVxufSkoKVxuXG4vLyBSZXR1cm4gbm90IGZ1bmN0aW9uIHdpdGggRXJyb3IgaWYgQmlnSW50IG5vdCBzdXBwb3J0ZWRcbmZ1bmN0aW9uIGRlZmluZUJpZ0ludE1ldGhvZCAoZm4pIHtcbiAgcmV0dXJuIHR5cGVvZiBCaWdJbnQgPT09ICd1bmRlZmluZWQnID8gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCA6IGZuXG59XG5cbmZ1bmN0aW9uIEJ1ZmZlckJpZ0ludE5vdERlZmluZWQgKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0JpZ0ludCBub3Qgc3VwcG9ydGVkJylcbn1cbiIsIihmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyliKCk7ZWxzZXtiKCksYS5GaWxlU2F2ZXI9e2V4cG9ydHM6e319LmV4cG9ydHN9fSkodGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSxiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYj9iPXthdXRvQm9tOiExfTpcIm9iamVjdFwiIT10eXBlb2YgYiYmKGNvbnNvbGUud2FybihcIkRlcHJlY2F0ZWQ6IEV4cGVjdGVkIHRoaXJkIGFyZ3VtZW50IHRvIGJlIGEgb2JqZWN0XCIpLGI9e2F1dG9Cb206IWJ9KSxiLmF1dG9Cb20mJi9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGEudHlwZSk/bmV3IEJsb2IoW1wiXFx1RkVGRlwiLGFdLHt0eXBlOmEudHlwZX0pOmF9ZnVuY3Rpb24gYyhhLGIsYyl7dmFyIGQ9bmV3IFhNTEh0dHBSZXF1ZXN0O2Qub3BlbihcIkdFVFwiLGEpLGQucmVzcG9uc2VUeXBlPVwiYmxvYlwiLGQub25sb2FkPWZ1bmN0aW9uKCl7ZyhkLnJlc3BvbnNlLGIsYyl9LGQub25lcnJvcj1mdW5jdGlvbigpe2NvbnNvbGUuZXJyb3IoXCJjb3VsZCBub3QgZG93bmxvYWQgZmlsZVwiKX0sZC5zZW5kKCl9ZnVuY3Rpb24gZChhKXt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiSEVBRFwiLGEsITEpO3RyeXtiLnNlbmQoKX1jYXRjaChhKXt9cmV0dXJuIDIwMDw9Yi5zdGF0dXMmJjI5OT49Yi5zdGF0dXN9ZnVuY3Rpb24gZShhKXt0cnl7YS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpfWNhdGNoKGMpe3ZhciBiPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7Yi5pbml0TW91c2VFdmVudChcImNsaWNrXCIsITAsITAsd2luZG93LDAsMCwwLDgwLDIwLCExLCExLCExLCExLDAsbnVsbCksYS5kaXNwYXRjaEV2ZW50KGIpfX12YXIgZj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cud2luZG93PT09d2luZG93P3dpbmRvdzpcIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZj9zZWxmOlwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWw/Z2xvYmFsOnZvaWQgMCxhPWYubmF2aWdhdG9yJiYvTWFjaW50b3NoLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpJiYvQXBwbGVXZWJLaXQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkmJiEvU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLGc9Zi5zYXZlQXN8fChcIm9iamVjdFwiIT10eXBlb2Ygd2luZG93fHx3aW5kb3chPT1mP2Z1bmN0aW9uKCl7fTpcImRvd25sb2FkXCJpbiBIVE1MQW5jaG9yRWxlbWVudC5wcm90b3R5cGUmJiFhP2Z1bmN0aW9uKGIsZyxoKXt2YXIgaT1mLlVSTHx8Zi53ZWJraXRVUkwsaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtnPWd8fGIubmFtZXx8XCJkb3dubG9hZFwiLGouZG93bmxvYWQ9ZyxqLnJlbD1cIm5vb3BlbmVyXCIsXCJzdHJpbmdcIj09dHlwZW9mIGI/KGouaHJlZj1iLGoub3JpZ2luPT09bG9jYXRpb24ub3JpZ2luP2Uoaik6ZChqLmhyZWYpP2MoYixnLGgpOmUoaixqLnRhcmdldD1cIl9ibGFua1wiKSk6KGouaHJlZj1pLmNyZWF0ZU9iamVjdFVSTChiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aS5yZXZva2VPYmplY3RVUkwoai5ocmVmKX0sNEU0KSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShqKX0sMCkpfTpcIm1zU2F2ZU9yT3BlbkJsb2JcImluIG5hdmlnYXRvcj9mdW5jdGlvbihmLGcsaCl7aWYoZz1nfHxmLm5hbWV8fFwiZG93bmxvYWRcIixcInN0cmluZ1wiIT10eXBlb2YgZiluYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihiKGYsaCksZyk7ZWxzZSBpZihkKGYpKWMoZixnLGgpO2Vsc2V7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7aS5ocmVmPWYsaS50YXJnZXQ9XCJfYmxhbmtcIixzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShpKX0pfX06ZnVuY3Rpb24oYixkLGUsZyl7aWYoZz1nfHxvcGVuKFwiXCIsXCJfYmxhbmtcIiksZyYmKGcuZG9jdW1lbnQudGl0bGU9Zy5kb2N1bWVudC5ib2R5LmlubmVyVGV4dD1cImRvd25sb2FkaW5nLi4uXCIpLFwic3RyaW5nXCI9PXR5cGVvZiBiKXJldHVybiBjKGIsZCxlKTt2YXIgaD1cImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiPT09Yi50eXBlLGk9L2NvbnN0cnVjdG9yL2kudGVzdChmLkhUTUxFbGVtZW50KXx8Zi5zYWZhcmksaj0vQ3JpT1NcXC9bXFxkXSsvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aWYoKGp8fGgmJml8fGEpJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcil7dmFyIGs9bmV3IEZpbGVSZWFkZXI7ay5vbmxvYWRlbmQ9ZnVuY3Rpb24oKXt2YXIgYT1rLnJlc3VsdDthPWo/YTphLnJlcGxhY2UoL15kYXRhOlteO10qOy8sXCJkYXRhOmF0dGFjaG1lbnQvZmlsZTtcIiksZz9nLmxvY2F0aW9uLmhyZWY9YTpsb2NhdGlvbj1hLGc9bnVsbH0say5yZWFkQXNEYXRhVVJMKGIpfWVsc2V7dmFyIGw9Zi5VUkx8fGYud2Via2l0VVJMLG09bC5jcmVhdGVPYmplY3RVUkwoYik7Zz9nLmxvY2F0aW9uPW06bG9jYXRpb24uaHJlZj1tLGc9bnVsbCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bC5yZXZva2VPYmplY3RVUkwobSl9LDRFNCl9fSk7Zi5zYXZlQXM9Zy5zYXZlQXM9ZyxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9Zyl9KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmlsZVNhdmVyLm1pbi5qcy5tYXAiLCIvKiEgaWVlZTc1NC4gQlNELTMtQ2xhdXNlIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwiaW1wb3J0IENyeVR5cGUsIHsgQ29tbWFuZCB9IGZyb20gXCIuL0NyeVR5cGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyeUdlbmVyYXRvciB7XHJcbiAgYXVkaW9Db250ZXh0OiBBdWRpb0NvbnRleHQ7XHJcbiAgc291cmNlU2FtcGxlUmF0ZSA9IDEwNDg1NzY7XHJcbiAgc2FtcGxlc1BlckZyYW1lID0gMTc1NTY7XHJcbiAgbm9pc2VCdWZmZXIgPSAweDdGRkY7XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMuYXVkaW9Db250ZXh0KSB0aGlzLmF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlKGNyeVR5cGU6IENyeVR5cGUsIHBpdGNoOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBwdWxzZTEgPSB0aGlzLmdlbmVyYXRlU3F1YXJlV2F2ZShjcnlUeXBlLnB1bHNlMSwgcGl0Y2gsIGxlbmd0aCk7XHJcbiAgICBjb25zdCBwdWxzZTIgPSB0aGlzLmdlbmVyYXRlU3F1YXJlV2F2ZShjcnlUeXBlLnB1bHNlMiwgcGl0Y2gsIGxlbmd0aCk7XHJcbiAgICAvLyBkdWUgdG8gcXVpcmsgd2l0aCBub2lzZSBjaGFubmVsOiBmaW5kIHNob3J0ZXN0IGNoYW5uZWwgbGVuZ3RoXHJcbiAgICAvLyBhdCB0aGlzIHBvaW50LCBub2lzZSB3aWxsIHJldmVydCBwaXRjaCBzaGlmdCBlZmZlY3RcclxuXHJcbiAgICBsZXQgcHVsc2UxTGVuZ3RoID0gMDtcclxuICAgIGxldCBwdWxzZTJMZW5ndGggPSAwO1xyXG4gICAgbGV0IGxlZnRvdmVycyA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGNvbW1hbmQgb2YgY3J5VHlwZS5wdWxzZTEpIHtcclxuICAgICAgaWYgKGNvbW1hbmQgJiYgY29tbWFuZC5ub3RlKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViZnJhbWVzID0gKChsZW5ndGggKyAweDEwMCkgKiAoY29tbWFuZC5ub3RlWzBdICsgMSkpICsgbGVmdG92ZXJzO1xyXG4gICAgICAgIGNvbnN0IHRoaXNub3RlID0gdGhpcy5zYW1wbGVzUGVyRnJhbWUgKiAoc3ViZnJhbWVzID4+IDgpO1xyXG4gICAgICAgIGxlZnRvdmVycyA9IHN1YmZyYW1lcyAmIDB4RkY7XHJcbiAgICAgICAgcHVsc2UxTGVuZ3RoICs9IHRoaXNub3RlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGVmdG92ZXJzID0gMDtcclxuICAgIGZvciAoY29uc3QgY29tbWFuZCBvZiBjcnlUeXBlLnB1bHNlMikge1xyXG4gICAgICBpZiAoY29tbWFuZCAmJiBjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb25zdCBzdWJmcmFtZXMgPSAoKGxlbmd0aCArIDB4MTAwKSAqIChjb21tYW5kLm5vdGVbMF0gKyAxKSkgKyBsZWZ0b3ZlcnM7XHJcbiAgICAgICAgY29uc3QgdGhpc25vdGUgPSB0aGlzLnNhbXBsZXNQZXJGcmFtZSAqIChzdWJmcmFtZXMgPj4gOCk7XHJcbiAgICAgICAgbGVmdG92ZXJzID0gc3ViZnJhbWVzICYgMHhGRjtcclxuICAgICAgICBwdWxzZTJMZW5ndGggKz0gdGhpc25vdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjdXRvZmYgPSBNYXRoLm1heChwdWxzZTFMZW5ndGgsIHB1bHNlMkxlbmd0aCkgLSB0aGlzLnNhbXBsZXNQZXJGcmFtZTtcclxuICAgIGNvbnN0IG5vaXNlID0gdGhpcy5nZW5lcmF0ZU5vaXNlKGNyeVR5cGUubm9pc2UsIHBpdGNoLCAwLCBjdXRvZmYpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHB1bHNlMSxcclxuICAgICAgcHVsc2UyLFxyXG4gICAgICBub2lzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNhbXBsZShiaW46IG51bWJlciwgdm9sdW1lOiBudW1iZXIpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIChcclxuICAgICAgICAoMiAqIGJpbikgLSAxXHJcbiAgICAgICkgKiAoXHJcbiAgICAgICAgKHZvbHVtZSAqIC0xKSAvIDB4MTBcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNhbGNEdXR5KGR1dHk6IG51bWJlciwgcGVyaW9kQ291bnQ6IG51bWJlcikge1xyXG4gICAgc3dpdGNoIChkdXR5KSB7XHJcbiAgICAgIGNhc2UgMDogcmV0dXJuIHBlcmlvZENvdW50ID49IDQgLyA4ICYmIHBlcmlvZENvdW50IDwgNSAvIDg7XHJcbiAgICAgIGNhc2UgMTogcmV0dXJuIHBlcmlvZENvdW50ID49IDQgLyA4ICYmIHBlcmlvZENvdW50IDwgNiAvIDg7XHJcbiAgICAgIGNhc2UgMjogcmV0dXJuIHBlcmlvZENvdW50ID49IDIgLyA4ICYmIHBlcmlvZENvdW50IDwgNiAvIDg7XHJcbiAgICAgIGNhc2UgMzogcmV0dXJuIHBlcmlvZENvdW50IDwgNCAvIDggfHwgcGVyaW9kQ291bnQgPj0gNiAvIDg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZVNxdWFyZVdhdmUoY29tbWFuZHM6IENvbW1hbmRbXSwgcGl0Y2g6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpIHtcclxuICAgIGxldCBkdXR5ID0gMDtcclxuICAgIGxldCBkYXRhOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgbGV0IGNvbW1hbmRJbmRleCA9IDA7XHJcbiAgICBsZXQgc2FtcGxlSW5kZXggPSAwO1xyXG4gICAgbGV0IHBlcmlvZENvdW50ID0gMDtcclxuICAgIGxldCBsZWZ0b3ZlcnMgPSAwO1xyXG4gICAgd2hpbGUgKGNvbW1hbmRJbmRleCA8IGNvbW1hbmRzLmxlbmd0aCkge1xyXG4gICAgICBsZXQgY29tbWFuZCA9IGNvbW1hbmRzW2NvbW1hbmRJbmRleF07XHJcbiAgICAgIGNvbnN0IGlzTGFzdENvbW1hbmQgPSBjb21tYW5kSW5kZXggPT09IGNvbW1hbmRzLmxlbmd0aCAtIDE7XHJcbiAgICAgIGlmICh0eXBlb2YgY29tbWFuZC5kdXR5ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgZHV0eSA9IGNvbW1hbmQuZHV0eTtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBsZXQgW1xyXG4gICAgICAgICAgbnVtYmVyT2ZTYW1wbGVzUGVyTm90ZSxcclxuICAgICAgICAgIHZvbHVtZSxcclxuICAgICAgICAgIHZvbHVtZUZhZGUsXHJcbiAgICAgICAgICBudW1iZXJPZlNhbXBsZXNQZXJQZXJpb2RcclxuICAgICAgICBdID0gY29tbWFuZC5ub3RlO1xyXG5cclxuICAgICAgICAvLyBudW1iZXIgb2Ygc2FtcGxlcyBmb3IgdGhpcyBzaW5nbGUgbm90ZVxyXG4gICAgICAgIGxldCBzdWJmcmFtZXMgPSAoXHJcbiAgICAgICAgICAobGVuZ3RoICsgMHgxMDApICpcclxuICAgICAgICAgIChudW1iZXJPZlNhbXBsZXNQZXJOb3RlICsgMSlcclxuICAgICAgICApICsgbGVmdG92ZXJzO1xyXG4gICAgICAgIGxldCBzYW1wbGVDb3VudCA9IHRoaXMuc2FtcGxlc1BlckZyYW1lICogKHN1YmZyYW1lcyA+PiA4KTtcclxuICAgICAgICBsZWZ0b3ZlcnMgPSBzdWJmcmFtZXMgJiAweEZGO1xyXG4gICAgICAgIC8vIG51bWJlciBvZiBzYW1wbGVzIGZvciBhIHNpbmdsZSBwZXJpb2Qgb2YgdGhlIG5vdGUncyBwaXRjaFxyXG4gICAgICAgIGxldCBwZXJpb2QgPSB0aGlzLnNvdXJjZVNhbXBsZVJhdGUgKiAoXHJcbiAgICAgICAgICAyMDQ4IC0gKFxyXG4gICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgbnVtYmVyT2ZTYW1wbGVzUGVyUGVyaW9kICtcclxuICAgICAgICAgICAgICBwaXRjaFxyXG4gICAgICAgICAgICApICYgMHg3RkZcclxuICAgICAgICAgIClcclxuICAgICAgICApIC8gMTMxMDcyO1xyXG4gICAgICAgIC8vIGFwcGx5IHRoaXMgbm90ZVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMjUwMDAwMCAmJiAoaW5kZXggPCBzYW1wbGVDb3VudCB8fCAoaXNMYXN0Q29tbWFuZCAmJiB2b2x1bWUgPiAwKSk7IGluZGV4KyspIHtcclxuICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSB0aGlzLmNhbGNEdXR5KGR1dHkgJiAwYjExLCBwZXJpb2RDb3VudCkgP1xyXG4gICAgICAgICAgICAxIDpcclxuICAgICAgICAgICAgMDtcclxuICAgICAgICAgIGRhdGFbc2FtcGxlSW5kZXhdID0gdGhpcy5zYW1wbGUoZW5hYmxlZCwgdm9sdW1lKTtcclxuICAgICAgICAgIHBlcmlvZENvdW50ICs9IDEgLyBwZXJpb2Q7XHJcbiAgICAgICAgICBwZXJpb2RDb3VudCA9IHBlcmlvZENvdW50ID49IDEgP1xyXG4gICAgICAgICAgICBwZXJpb2RDb3VudCAtIDEgOlxyXG4gICAgICAgICAgICBwZXJpb2RDb3VudDtcclxuICAgICAgICAgIHNhbXBsZUluZGV4Kys7XHJcblxyXG4gICAgICAgICAgLy8gb25jZSBwZXIgZnJhbWUsIGFkanVzdCBkdXR5XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGluZGV4IDwgc2FtcGxlQ291bnQgJiZcclxuICAgICAgICAgICAgc2FtcGxlSW5kZXggJSB0aGlzLnNhbXBsZXNQZXJGcmFtZSA9PT0gMFxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGR1dHkgPSAoXHJcbiAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICBkdXR5ICYgMHgzRlxyXG4gICAgICAgICAgICAgICAgKSA8PCAyXHJcbiAgICAgICAgICAgICAgKSB8IChcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgZHV0eSAmIDB4QzBcclxuICAgICAgICAgICAgICAgICkgPj4gNlxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBvbmNlIHBlciBmcmFtZSAqIGZhZGVhbW91bnQsIGFkanVzdCB2b2x1bWVcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgdm9sdW1lRmFkZSAhPT0gMCAmJlxyXG4gICAgICAgICAgICAoaW5kZXggKyAxKSAlICh0aGlzLnNhbXBsZXNQZXJGcmFtZSAqIE1hdGguYWJzKHZvbHVtZUZhZGUpKSA9PT0gMFxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHZvbHVtZSArPSAodm9sdW1lRmFkZSA8IDAgPyAxIDogLTEpO1xyXG4gICAgICAgICAgICB2b2x1bWUgPSB2b2x1bWUgPCAwID8gMCA6ICh2b2x1bWUgPiAweDBGID8gMHgwRiA6IHZvbHVtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb21tYW5kSW5kZXgrKztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlTm9pc2UoY29tbWFuZHM6IENvbW1hbmRbXSwgcGl0Y2g6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIsIGN1dG9mZjogbnVtYmVyKSB7XHJcbiAgICBsZXQgZGF0YTogbnVtYmVyW10gPSBbXTtcclxuICAgIGxldCBjb21tYW5kSW5kZXggPSAwO1xyXG4gICAgbGV0IHNhbXBsZUluZGV4ID0gMDtcclxuICAgIGxldCBsZWZ0b3ZlcnMgPSAwO1xyXG4gICAgd2hpbGUgKGNvbW1hbmRJbmRleCA8IGNvbW1hbmRzLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZHNbY29tbWFuZEluZGV4XTtcclxuICAgICAgY29uc3QgaXNMYXN0Q29tbWFuZCA9IGNvbW1hbmRJbmRleCA9PT0gY29tbWFuZHMubGVuZ3RoIC0gMTtcclxuICAgICAgbGV0IG5vdGUgPSBjb21tYW5kLm5vdGU7XHJcbiAgICAgIC8vIG51bWJlciBvZiBzYW1wbGVzIGZvciB0aGlzIHNpbmdsZSBub3RlXHJcbiAgICAgIGxldCBzdWJGcmFtZXMgPSAoKGxlbmd0aCArIDB4MTAwKSAqIChub3RlWzBdICsgMSkpICsgbGVmdG92ZXJzO1xyXG4gICAgICBsZXQgc2FtcGxlQ291bnQgPSB0aGlzLnNhbXBsZXNQZXJGcmFtZSAqIChzdWJGcmFtZXMgPj4gOCk7XHJcbiAgICAgIGxlZnRvdmVycyA9IHN1YkZyYW1lcyAmIDB4RkY7XHJcbiAgICAgIC8vIHZvbHVtZSBhbmQgZmFkZSBjb250cm9sXHJcbiAgICAgIGxldCB2b2x1bWUgPSBub3RlWzFdLCB2b2x1bWVGYWRlID0gbm90ZVsyXSwgcGFyYW1zID0gKG5vdGVbM10gKyAoc2FtcGxlSW5kZXggPj0gY3V0b2ZmID8gMCA6IHBpdGNoKSkgJiAweEZGO1xyXG4gICAgICAvLyBhcHBseSB0aGlzIG5vdGVcclxuICAgICAgbGV0IHNoaWZ0ID0gKHBhcmFtcyA+PiA0KSAmIDB4RjtcclxuICAgICAgc2hpZnQgPSBzaGlmdCA+IDB4RCA/IHNoaWZ0ICYgMHhEIDogc2hpZnQ7IC8vIG5vdCBzdXJlIGhvdyB0byBkZWFsIHdpdGggRSBvciBGLCBidXQgaXRzIHNvIGxvdyB5b3UgY2FuIGhhcmRseSBub3RpY2UgaXQgYW55d2F5XHJcblxyXG4gICAgICBsZXQgZGl2aWRlciA9IHBhcmFtcyAmIDB4NztcclxuICAgICAgbGV0IHdpZHRoID0gKHBhcmFtcyAmIDB4OCkgPT09IDB4ODtcclxuICAgICAgdGhpcy5ub2lzZUJ1ZmZlciA9IDB4N0ZGRjtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAyNTAwMDAwICYmIChpbmRleCA8IHNhbXBsZUNvdW50IHx8IChpc0xhc3RDb21tYW5kICYmIHZvbHVtZSA+IDApKTsgaW5kZXgrKykge1xyXG4gICAgICAgIGxldCBiaXQwID0gdGhpcy5ub2lzZUJ1ZmZlciAmIDE7XHJcbiAgICAgICAgZGF0YVtzYW1wbGVJbmRleF0gPSB0aGlzLnNhbXBsZSgxIF4gYml0MCwgdm9sdW1lKTtcclxuICAgICAgICBzYW1wbGVJbmRleCsrO1xyXG4gICAgICAgIC8vIGFjY29yZGluZyB0byBwYXJhbXMsIHVwZGF0ZSBidWZmZXJcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBzYW1wbGVJbmRleCAlICgyICogKGRpdmlkZXIgPT09IDAgPyAwLjUgOiBkaXZpZGVyKSAqICgxIDw8IChzaGlmdCArIDEpKSkgPT09IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGxldCBiaXQxID0gKHRoaXMubm9pc2VCdWZmZXIgPj4gMSkgJiAxO1xyXG4gICAgICAgICAgdGhpcy5ub2lzZUJ1ZmZlciA9ICh0aGlzLm5vaXNlQnVmZmVyID4+IDEpIHwgKChiaXQwIF4gYml0MSkgPDwgMTQpO1xyXG4gICAgICAgICAgaWYgKHdpZHRoKSB0aGlzLm5vaXNlQnVmZmVyID0gKHRoaXMubm9pc2VCdWZmZXIgPj4gMSkgfCAoKGJpdDAgXiBiaXQxKSA8PCA2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gb25jZSBwZXIgZnJhbWUgKiBmYWRlYW1vdW50LCBhZGp1c3Qgdm9sdW1lXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdm9sdW1lRmFkZSAhPT0gMCAmJlxyXG4gICAgICAgICAgKGluZGV4ICsgMSkgJSAodGhpcy5zYW1wbGVzUGVyRnJhbWUgKiBNYXRoLmFicyh2b2x1bWVGYWRlKSkgPT09IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHZvbHVtZSArPSAodm9sdW1lRmFkZSA8IDAgPyAxIDogLTEpO1xyXG4gICAgICAgICAgdm9sdW1lID0gdm9sdW1lIDwgMCA/IDAgOiAodm9sdW1lID4gMHgwRiA/IDB4MEYgOiB2b2x1bWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb21tYW5kSW5kZXgrKztcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbiAgcGxheShkYXRhOiBudW1iZXJbXSkge1xyXG4gICAgY29uc3QgYnVmZmVyID0gRmxvYXQzMkFycmF5LmZyb20oZGF0YSk7XHJcbiAgICBjb25zdCBhdWRpb0J1ZmZlciA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcihcclxuICAgICAgMSxcclxuICAgICAgYnVmZmVyLmxlbmd0aCxcclxuICAgICAgdGhpcy5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZVxyXG4gICAgKTtcclxuICAgIGF1ZGlvQnVmZmVyLmNvcHlUb0NoYW5uZWwoYnVmZmVyLCAwKTtcclxuXHJcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgIHNvdXJjZS5idWZmZXIgPSBhdWRpb0J1ZmZlcjtcclxuICAgIHNvdXJjZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgIHNvdXJjZS5zdGFydCgwKTtcclxuICB9XHJcbn0iLCJcclxuY29uc3QgZnMgPSB3aW5kb3cucmVxdWlyZSgnZnMnKTtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZUNyeU1hbmFnZXIge1xyXG4gICAgc3RhdGljIGRhdGE7XHJcbiAgICBzdGF0aWMgZmlsZVBhdGggPSAnLi9zcmMvZGF0YS9iYXNlQ3JpZXMuanNvbic7XHJcbiAgICBzdGF0aWMgdW5kb1N0YWNrID0gW107XHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh0aGlzLmZpbGVQYXRoLCd1dGY4JykpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQoaWR4KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW2lkeF07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHB1c2hVbmRvKCl7XHJcbiAgICAgICAgdGhpcy51bmRvU3RhY2sucHVzaChzdHJ1Y3R1cmVkQ2xvbmUodGhpcy5kYXRhKSk7XHJcbiAgICAgICAgaWYodGhpcy51bmRvU3RhY2subGVuZ3RoID4gMjApe1xyXG4gICAgICAgICAgICB0aGlzLnVuZG9TdGFjay5zaGlmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcG9wVW5kbygpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMudW5kb1N0YWNrLnBvcCgpO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZmx1c2goKXtcclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHRoaXMuZmlsZVBhdGgsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhZGROZXcoKXtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLnB1c2goe1xyXG4gICAgICAgICAgICBjaGFubmVsczoge1xyXG4gICAgICAgICAgICAgICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hbWU6IFwiTmV3IEJhc2UgQ3J5XCIsXHJcbiAgICAgICAgICAgIFwiaXNSZWZlcmVuY2VcIjogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZsdXNoKCk7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGVsZXRlKGlkeCl7XHJcbiAgICAgICAgdGhpcy5wdXNoVW5kbygpO1xyXG4gICAgICAgIHRoaXMuZGF0YS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICB0aGlzLmZsdXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNvcHkoaWR4KXtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHN0cnVjdHVyZWRDbG9uZSh0aGlzLmRhdGFbaWR4XSk7XHJcbiAgICAgICAgZGF0YS5pc1JlZmVyZW5jZSA9IGZhbHNlO1xyXG4gICAgICAgIGRhdGEubmFtZSA9IGRhdGEubmFtZSArIFwiIChDb3B5KVwiO1xyXG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlTmFtZShpZHgsIG5hbWUpe1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICB0aGlzLmRhdGFbaWR4XS5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmZsdXNoKCk7IFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1cGRhdGVDaGFubmVscyhpZHgsIGNoYW5uZWxzKXtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhW2lkeF0uY2hhbm5lbHMgPSBjaGFubmVscztcclxuICAgICAgICB0aGlzLmZsdXNoKCk7IFxyXG4gICAgfVxyXG59IiwiY29uc3QgZnMgPSB3aW5kb3cucmVxdWlyZSgnZnMnKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBNb25zdGVyTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgZGF0YTtcclxuICAgIHN0YXRpYyBmaWxlUGF0aCA9ICcuL3NyYy9kYXRhL3Bva2Vtb24uanNvbic7XHJcbiAgICBzdGF0aWMgdW5kb1N0YWNrID0gW107XHJcbiAgICBcclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHRoaXMuZmlsZVBhdGgsICd1dGY4JykpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQoaWR4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVtpZHhdO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRCeU5hbWUobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZmluZChwb2tlbW9uID0+IHBva2Vtb24ubmFtZSA9PT0gbmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHB1c2hVbmRvKCkge1xyXG4gICAgICAgIHRoaXMudW5kb1N0YWNrLnB1c2goc3RydWN0dXJlZENsb25lKHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIGlmICh0aGlzLnVuZG9TdGFjay5sZW5ndGggPiAyMCkge1xyXG4gICAgICAgICAgICB0aGlzLnVuZG9TdGFjay5zaGlmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcG9wVW5kbygpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLnVuZG9TdGFjay5wb3AoKTtcclxuICAgICAgICB0aGlzLmZsdXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZsdXNoKCkge1xyXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmModGhpcy5maWxlUGF0aCwgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhLCBudWxsLCAyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFkZE5ldygpIHtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiBcIk5ldyBNb25zdGVyXCIsXHJcbiAgICAgICAgICAgIGNyeTogMCxcclxuICAgICAgICAgICAgcGl0Y2g6IDEyOCxcclxuICAgICAgICAgICAgbGVuZ3RoOiA2NFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aCAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRlbGV0ZShpZHgpIHtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29weShpZHgpIHtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgY29uc3QgcG9rZW1vbiA9IHN0cnVjdHVyZWRDbG9uZSh0aGlzLmRhdGFbaWR4XSk7XHJcbiAgICAgICAgcG9rZW1vbi5uYW1lID0gcG9rZW1vbi5uYW1lICsgXCIgKENvcHkpXCI7XHJcbiAgICAgICAgdGhpcy5kYXRhLnB1c2gocG9rZW1vbik7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlTmFtZShpZHgsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhW2lkeF0ubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1cGRhdGVDcnkoaWR4LCBjcnkpIHtcclxuICAgICAgICB0aGlzLnB1c2hVbmRvKCk7XHJcbiAgICAgICAgdGhpcy5kYXRhW2lkeF0uY3J5ID0gY3J5O1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlUGl0Y2goaWR4LCBwaXRjaCkge1xyXG4gICAgICAgIHRoaXMucHVzaFVuZG8oKTtcclxuICAgICAgICB0aGlzLmRhdGFbaWR4XS5waXRjaCA9IHBpdGNoO1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdXBkYXRlTGVuZ3RoKGlkeCwgbGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5wdXNoVW5kbygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVtpZHhdLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLmZsdXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZVBva2Vtb24oaWR4LCBwb2tlbW9uKSB7XHJcbiAgICAgICAgdGhpcy5wdXNoVW5kbygpO1xyXG4gICAgICAgIHRoaXMuZGF0YVtpZHhdID0geyAuLi50aGlzLmRhdGFbaWR4XSwgLi4ucG9rZW1vbiB9O1xyXG4gICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgIH0gIFxyXG5cclxufSIsImltcG9ydCBDcnlUeXBlIGZyb20gXCIuLi9DcnlUeXBlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBbXHJcbiAgeyAvLyAkMDBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMywgMHg3MThdIH0sIC8vIDU2NC45NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRSwgMHgwNSwgMHg3OThdIH0sIC8vIDEyNjAuMzEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDksIDB4MDEsIDB4NzU4XSB9ICAvLyA3ODAuMTkgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QTAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEIsIDB4MDMsIDB4NzA4XSB9LCAvLyA1MjguNTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDUsIDB4Nzg4XSB9LCAvLyAxMDkyLjI3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA3LCAweDAxLCAweDc0OF0gfSAgLy8gNzEyLjM1IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAxLCAweDFDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwOSwgMHgwNCwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDgsIDB4MDEsIDB4MUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwMSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEEwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAzLCAweDYwMF0gfSwgLy8gMjU2LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDA1LCAweDc2MF0gfSwgLy8gODE5LjIwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAyLCAweDcyMF0gfSwgLy8gNTg1LjE0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDcxMF0gfSAgLy8gNTQ2LjEzIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDVBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBCLCAweDAzLCAweDZGMV0gfSwgLy8gNDgzLjY2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBDLCAweDA1LCAweDc1Ml0gfSwgLy8gNzUzLjI5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAyLCAweDcxMV0gfSwgLy8gNTQ4LjQyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDYwMV0gfSAgLy8gMjU2LjUwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAyLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwOSwgMHgwNCwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MDgsIDB4MDIsIDB4MUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA3LCAweDAxLCAweDJDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMDIgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgwMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRiwgMHgwNSwgMHg0ODBdIH0sIC8vIDE0Ni4yOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRSwgMHgwMSwgMHg1RTBdIH0sIC8vIDI0MC45NCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg1RENdIH0gIC8vIDIzOS4xOCBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhBNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwOSwgMHgwNSwgMHg0NDFdIH0sIC8vIDEzNi42OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwOCwgMHgwMSwgMHg1MjFdIH0sIC8vIDE3OC4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwNiwgMHgwMSwgMHg1MUFdIH0gIC8vIDE3Ni42NSBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDAzICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDcsIDB4NjA4XSB9LCAvLyAyNjAuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDYsIDB4NjAwXSB9LCAvLyAyNTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDcsIDB4NUYwXSB9LCAvLyAyNDguMjQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDQsIDB4NUUwXSB9LCAvLyAyNDAuOTQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDMsIDB4NUMwXSB9LCAvLyAyMjcuNTYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDMsIDB4NUEwXSB9LCAvLyAyMTUuNTggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDEsIDB4NTgwXSB9ICAvLyAyMDQuODAgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDcsIDB4NTA0XSB9LCAvLyAxNzEuNTYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEEsIDB4MDYsIDB4NTAyXSB9LCAvLyAxNzEuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MDksIDB4MDcsIDB4NEYxXSB9LCAvLyAxNjcuNDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDQsIDB4NEUxXSB9LCAvLyAxNjQuMDUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEEsIDB4MDMsIDB4NEMyXSB9LCAvLyAxNTcuOTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDMsIDB4NEEzXSB9LCAvLyAxNTIuMjMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NDgyXSB9ICAvLyAxNDYuNjEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEUsIDB4MDQsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBDLCAweDA3LCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwQiwgMHgwNiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwNCAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDA3LCAweDZBMF0gfSwgLy8gMzcyLjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBFLCAweDA2LCAweDZBNF0gfSwgLy8gMzc2LjY0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDA2LCAweDZBMF0gfSwgLy8gMzcyLjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBELCAweDAzLCAweDYyMF0gfSwgLy8gMjczLjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAzLCAweDYyNF0gfSwgLy8gMjc1LjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAyLCAweDYyMF0gfSwgLy8gMjczLjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDYxMF0gfSAgLy8gMjY0LjI2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDVBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDA3LCAweDYwMV0gfSwgLy8gMjU2LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDA2LCAweDYwM10gfSwgLy8gMjU3LjUxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDA2LCAweDYwMV0gfSwgLy8gMjU2LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBDLCAweDAzLCAweDU4MV0gfSwgLy8gMjA1LjEyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAzLCAweDU4M10gfSwgLy8gMjA1Ljc2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBCLCAweDAyLCAweDU4Ml0gfSwgLy8gMjA1LjQ0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDU3MV0gfSAgLy8gMjAwLjExIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBELCAweDA2LCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRSwgMHgwNiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDQsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDA0LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwQywgMHgwMywgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwNSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDBBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDAyLCAweDUwMF0gfSwgLy8gMTcwLjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDAzLCAweDU4MF0gfSwgLy8gMjA0LjgwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAzLCAweDU3MF0gfSwgLy8gMTk5LjgwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDU2MF0gfSAgLy8gMTk1LjA1IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEY1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDAyLCAweDQ4Ml0gfSwgLy8gMTQ2LjYxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAzLCAweDUwMV0gfSwgLy8gMTcwLjg5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDAyLCAweDRFMl0gfSwgLy8gMTY0LjI1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA4LCAweDAxLCAweDRDMV0gfSAgLy8gMTU3LjczIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMDYgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGQSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOCwgMHgwMywgMHgyNDddIH0sIC8vIDg5LjQ3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDA2LCAweDAyLCAweDIyNl0gfSwgLy8gODcuNTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDUsIDB4MDIsIDB4MjQ1XSB9LCAvLyA4OS4zNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwNiwgMHgwMywgMHgyMDZdIH0sIC8vIDg1LjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDA4LCAweDAyLCAweDIyNV0gfSwgLy8gODcuNDQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDQsIDB4MDIsIDB4MjA3XSB9ICAvLyA4NS43MiBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDQsIDB4OENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAyLCAweDlDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwNiwgMHg4Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDQsIDB4QUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA3LCAweDlDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwMiwgMHhBQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDA3ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDMsIDB4NkUwXSB9LCAvLyA0NTUuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDQsIDB4NjQwXSB9LCAvLyAyOTIuNTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NjIwXSB9ICAvLyAyNzMuMDcgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDMsIDB4NjgzXSB9LCAvLyAzNDQuMDIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEIsIDB4MDQsIDB4NjAyXSB9LCAvLyAyNTcuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NjAxXSB9ICAvLyAyNTYuNTAgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDMsIDB4NUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBFLCAweDA2LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwMSwgMHg1Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDA4ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEYsIDB4MDYsIDB4NTY1XSB9LCAvLyAxOTYuNTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEUsIDB4MDQsIDB4NTdDXSB9LCAvLyAyMDMuNTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDIsIDB4NTVDXSB9LCAvLyAxOTMuODkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEIsIDB4MDIsIDB4NTNDXSB9ICAvLyAxODUuMTMgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NUEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEQsIDB4MDYsIDB4NTAzXSB9LCAvLyAxNzEuMzQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEIsIDB4MDQsIDB4NTFCXSB9LCAvLyAxNzYuODkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDksIDB4MDIsIDB4NEZBXSB9LCAvLyAxNjkuMzQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4NERCXSB9ICAvLyAxNjIuODIgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEUsIDB4MDYsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBCLCAweDBELCAweDA3LCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwMiwgMHg0Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDA5ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEYsIDB4MDcsIDB4N0EwXSB9LCAvLyAxMzY1LjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDA2LCAweDdBM10gfSwgLy8gMTQwOS4zOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwRiwgMHgwNCwgMHg3QTBdIH0sICAvLyAxMzY1LjMzIEh6XHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QTUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEYsIDB4MDYsIDB4N0Q4XSB9LCAvLyAzMjc2LjgwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAzLCAweDdEN10gfSwgLy8gMzE5Ni44OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwMiwgMHg3RDhdIH0gIC8vIDMyNzYuODAgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MDUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDAsIC0weDA4LCAweDAwMF0gfSwgLy8gNjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDcsIDB4NkExXSB9LCAvLyAzNzMuNDIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MDgsIDB4MDYsIDB4NkEyXSB9LCAvLyAzNzQuNDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MDcsIDB4MDQsIDB4NkExXSB9LCAvLyAzNzMuNDIgSHpcclxuICAgICAgeyBcImR1dHlcIjogMHg1RiB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwNywgMHgwNiwgMHg2RDZdIH0sIC8vIDQzOS44NCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwOCwgMHgwMywgMHg2RDldIH0sIC8vIDQ0NC4zMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQSwgMHgwMiwgMHg2RDddIH0gIC8vIDQ0MS4zMiBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRiwgMHgwMiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDQsIDB4M0VdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA3LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwNSwgMHgzQl0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDQsIDB4M0RdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDA2LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwNCwgMHgzRF0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4M0JdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwQSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBGLCAweDA3LCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDA2LCAweDZFNV0gfSwgLy8gNDYzLjE1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBGLCAweDA0LCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBGLCAweDA2LCAweDZEMF0gfSwgLy8gNDMxLjE2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAzLCAweDZDMF0gfSwgLy8gNDA5LjYwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAyLCAweDZCMF0gfSwgLy8gMzkwLjEwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBBLCAweDAyLCAweDZDOF0gfSAgLy8gNDIwLjEwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDA1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDAwLCAtMHgwOCwgMHgwMDBdIH0sIC8vIDY0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDA3LCAweDZBMV0gfSwgIC8vIDM3My40MiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOCwgMHgwNiwgMHg2QTNdIH0sICAvLyAzNzUuNTYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MDcsIDB4MDQsIDB4NkExXSB9LCAgLy8gMzczLjQyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDA3LCAweDA2LCAweDY5MV0gfSwgIC8vIDM1Ny4xNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwOCwgMHgwMywgMHg2ODJdIH0sICAvLyAzNDMuMTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEEsIDB4MDIsIDB4NjcxXSB9LCAgLy8gMzI4LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDA3LCAweDAyLCAweDY4OV0gfSAgIC8vIDM0OS41MyBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRiwgMHgwMiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDQsIDB4M0VdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDA3LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQywgMHgwNSwgMHgzQl0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEQsIDB4MDQsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBCLCAweDA2LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQSwgMHgwNCwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDksIDB4MDEsIDB4M0NdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwQiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweENDIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAxLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAxLCAweDc4MF0gfSwgLy8gMTAyNC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMSwgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRSwgMHgwMSwgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMSwgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDEsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDEsIDB4NzAxXSB9LCAvLyA1MTQuMDEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDEsIDB4NzgyXSB9LCAvLyAxMDQwLjI1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAxLCAweDc0Ml0gfSwgLy8gNjg5Ljg1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDc0MV0gfSAgLy8gNjg2LjI0IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDQ0IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDAwLCAtMHgwOCwgMHgwMDBdIH0sIC8vIDY0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDAxLCAweDcwMV0gfSwgLy8gNTE0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDAxLCAweDc4Ml0gfSwgLy8gMTA0MC4yNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMSwgMHg3NDFdIH0sIC8vIDY4Ni4yNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRSwgMHgwMSwgMHg3NDFdIH0sIC8vIDY4Ni4yNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMSwgMHg3ODJdIH0sIC8vIDEwNDAuMjUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NzAxXSB9ICAvLyA1MTQuMDEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDAsIC0weDA4LCAweDAwXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwMCwgLTB4MDgsIDB4MDBdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAxLCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQiwgMHgwMSwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDEsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBCLCAweDAxLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwMSwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NENdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQwQyAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweENDIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBGLCAweDA1LCAweDYwMF0gfSwgLy8gMjU2LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBELCAweDAyLCAweDYzOF0gfSwgLy8gMjg3LjQ0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBDLCAweDAyLCAweDYzMF0gfSwgLy8gMjgyLjQ4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBDLCAweDAyLCAweDYyOF0gfSwgLy8gMjc3LjY5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBCLCAweDAyLCAweDYyMF0gfSwgLy8gMjczLjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBCLCAweDAyLCAweDYxMF0gfSwgLy8gMjY0LjI2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBBLCAweDAyLCAweDYxOF0gfSwgLy8gMjY4LjU5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBCLCAweDAyLCAweDYxMF0gfSwgLy8gMjY0LjI2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDYyMF0gfSAgLy8gMjczLjA3IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDQ0IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBDLCAweDAzLCAweDVDMF0gfSwgLy8gMjI3LjU2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBCLCAweDAxLCAweDVGOV0gfSwgLy8gMjUyLjU1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBBLCAweDAxLCAweDVGMV0gfSwgLy8gMjQ4LjcxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBBLCAweDAxLCAweDVFOV0gfSwgLy8gMjQ0Ljk5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA5LCAweDAxLCAweDVFMV0gfSwgLy8gMjQxLjM4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA5LCAweDAxLCAweDVEOV0gfSwgLy8gMjM3Ljg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA4LCAweDAxLCAweDVEMV0gfSwgLy8gMjM0LjQ4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA5LCAweDAxLCAweDVEOV0gfSwgLy8gMjM3Ljg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDVFMV0gfSAgLy8gMjQxLjM4IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMEQgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHg4OCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRiwgMHgwMiwgMHg2NTBdIH0sIC8vIDMwMy40MSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwRCwgMHgwMSwgMHg2NjBdIH0sIC8vIDMxNS4wOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRSwgMHgwMiwgMHg2MTJdIH0sIC8vIDI2NS4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwQywgMHgwMSwgMHg2MjJdIH0sIC8vIDI3NC4yMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRiwgMHgwMiwgMHg2MTBdIH0sIC8vIDI2NC4yNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwMSwgMHg2MjBdIH0sIC8vIDI3My4wNyBIelxyXG4gICAgICB7IFwiZHV0eVwiOiAweDg4IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDY1MF0gfSwgLy8gMzAzLjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBELCAweDAxLCAweDY2MF0gfSwgLy8gMzE1LjA4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBFLCAweDAyLCAweDYxMl0gfSwgLy8gMjY1LjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBDLCAweDAxLCAweDYyMl0gfSwgLy8gMjc0LjIxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDYxMF0gfSwgLy8gMjY0LjI2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAxLCAweDYyMF0gfSAgLy8gMjczLjA3IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDQwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDAwLCAtMHgwOCwgMHgwMDBdIH0sIC8vIDY0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDY1MV0gfSwgLy8gMzA0LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBELCAweDAxLCAweDY2MV0gfSwgLy8gMzE1Ljg0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBFLCAweDAyLCAweDYxNF0gfSwgLy8gMjY2LjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDYyNF0gfSwgLy8gMjc1LjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDYxMV0gfSwgLy8gMjY0Ljc5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBELCAweDAxLCAweDYyMV0gfSwgLy8gMjczLjY0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBFLCAweDAyLCAweDYxNF0gfSwgLy8gMjY2LjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDYyNF0gfSwgLy8gMjc1LjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBGLCAweDAyLCAweDYxMV0gfSwgLy8gMjY0Ljc5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAxLCAweDYyMV0gfSAgLy8gMjczLjY0IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAyLCAweDFDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwQiwgMHgwMSwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDIsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBCLCAweDAxLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwMiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEEsIDB4MDIsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBDLCAweDAyLCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQSwgMHgwMSwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDksIDB4MEMsIDB4MDIsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBBLCAweDAxLCAweDNDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMEUgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhBNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRSwgMHgwMSwgMHg3MDBdIH0sIC8vIDUxMi4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwMiwgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDksIDB4MDIsIDB4NzQwXSB9LCAvLyA2ODIuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDEsIDB4NjAwXSB9ICAvLyAyNTYuMDAgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDEsIDB4NkUxXSB9LCAvLyA0NTYuNzAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDIsIDB4NkUxXSB9LCAvLyA0NTYuNzAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MDYsIDB4MDIsIDB4NjgxXSB9LCAvLyAzNDIuMjIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NUUxXSB9ICAvLyAyNDEuMzggSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDYsIDB4MDEsIDB4MzJdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA2LCAweDAxLCAweDIxXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwNiwgMHgwMSwgMHgxMV0gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDBGICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDcsIDB4N0MwXSB9LCAvLyAyMDQ4LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBFLCAweDA2LCAweDdDMl0gfSwgLy8gMjExNC4wNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwNSwgMHg2ODBdIH0sIC8vIDM0MS4zMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwNCwgMHg2NzBdIH0sIC8vIDMyNy42OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQiwgMHgwNSwgMHg2NjBdIH0sIC8vIDMxNS4wOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHg2NDBdIH0gIC8vIDI5Mi41NyBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhDQyB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwNywgMHg3ODFdIH0sIC8vIDEwMzIuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEIsIDB4MDYsIDB4NzgwXSB9LCAvLyAxMDI0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBBLCAweDA1LCAweDY0MV0gfSwgLy8gMjkzLjIzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDA0LCAweDYzMl0gfSwgLy8gMjgzLjcxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDA1LCAweDYyMV0gfSwgLy8gMjczLjY0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDYwMl0gfSAgLy8gMjU3LjAwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDA0LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRCwgMHgwNiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDQsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDA3LCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwMiwgMHg1RF0gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDEwICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QzkgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEYsIDB4MDcsIDB4NjgwXSB9LCAvLyAzNDEuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEYsIDB4MDcsIDB4NjYwXSB9LCAvLyAzMTUuMDggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEUsIDB4MDcsIDB4NjQwXSB9LCAvLyAyOTIuNTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEUsIDB4MDcsIDB4NjIwXSB9LCAvLyAyNzMuMDcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDEsIDB4NjAwXSB9LCAvLyAyNTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDcsIDB4NzQwXSB9LCAvLyA2ODIuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEEsIDB4MDcsIDB4NzMwXSB9LCAvLyA2MzAuMTUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDksIDB4MDEsIDB4NzIwXSB9ICAvLyA1ODUuMTQgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NzkgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEUsIDB4MDcsIDB4NjgyXSB9LCAvLyAzNDMuMTIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEUsIDB4MDcsIDB4NjYyXSB9LCAvLyAzMTYuNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEQsIDB4MDcsIDB4NjQyXSB9LCAvLyAyOTMuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEQsIDB4MDcsIDB4NjIyXSB9LCAvLyAyNzQuMjEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDEsIDB4NjAyXSB9LCAvLyAyNTcuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEIsIDB4MDcsIDB4NzQyXSB9LCAvLyA2ODkuODUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDksIDB4MDcsIDB4NzMyXSB9LCAvLyA2MzYuMjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MDgsIDB4MDEsIDB4NzIyXSB9ICAvLyA1OTAuNDEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDcsIDB4MDQsIDB4MjFdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDA3LCAweDA0LCAweDEwXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwNywgMHgwMSwgMHgyMF0gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDExICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEYsIDB4MDcsIDB4N0EwXSB9LCAvLyAxMzY1LjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBFLCAweDA2LCAweDdBNF0gfSwgLy8gMTQyNC43MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwNiwgMHg3QTBdIH0sIC8vIDEzNjUuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDMsIDB4NzIwXSB9LCAvLyA1ODUuMTQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDMsIDB4NzIzXSB9LCAvLyA1OTMuMDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEMsIDB4MDIsIDB4NzI4XSB9LCAvLyA2MDYuODEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NzMwXSB9ICAvLyA2MzAuMTUgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDAsIC0weDA4LCAweDAwXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQSwgMHgwNywgMHg3NDFdIH0sIC8vIDY4Ni4yNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOCwgMHgwNiwgMHg3NDNdIH0sIC8vIDY5My41MCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwNywgMHgwNiwgMHg3NDFdIH0sIC8vIDY4Ni4yNCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwOCwgMHgwMywgMHg2QzJdIH0sIC8vIDQxMi4xOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwNywgMHgwMywgMHg2QzFdIH0sIC8vIDQxMC44OCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwOCwgMHgwMiwgMHg2Q0NdIH0sIC8vIDQyNS41NiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwNywgMHgwMSwgMHg2RDhdIH0gIC8vIDQ0Mi44MSBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRiwgMHgwMiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDYsIDB4M0FdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDA3LCAweDNBXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwNiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDUsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBELCAweDAyLCAweDNEXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHgyQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDEyICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4QTUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEYsIDB4MDIsIDB4NDQwXSB9LCAvLyAxMzYuNTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDMsIDB4NEEwXSB9LCAvLyAxNTEuNzAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDIsIDB4NDkwXSB9LCAvLyAxNDguOTUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NDgwXSB9ICAvLyAxNDYuMjkgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RUUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEIsIDB4MEQsIDB4MDIsIDB4NDM4XSB9LCAvLyAxMzUuNDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEMsIDB4MDYsIDB4NDk4XSB9LCAvLyAxNTAuMzEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEIsIDB4MDIsIDB4NDg4XSB9LCAvLyAxNDcuNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NDc4XSB9ICAvLyAxNDQuOTkgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEUsIDB4MDYsIDB4NkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDAyLCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwMiwgMHg2Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxMyAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDMzIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBGLCAweDA2LCAweDVDMF0gfSwgLy8gMjI3LjU2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBFLCAweDAzLCAweDVCQ10gfSwgLy8gMjI1Ljk5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAyLCAweDVEMF0gfSwgLy8gMjM0LjA2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDAyLCAweDVFMF0gfSwgLy8gMjQwLjk0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDAyLCAweDVGMF0gfSwgLy8gMjQ4LjI0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDYwMF0gfSAgLy8gMjU2LjAwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDk5IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBDLCAweDA2LCAweDRCMV0gfSwgLy8gMTU0Ljc1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBDLCAweDAzLCAweDRBRF0gfSwgLy8gMTU0LjAyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBCLCAweDAyLCAweDRDMV0gfSwgLy8gMTU3LjczIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAyLCAweDREMV0gfSwgLy8gMTYwLjgyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBBLCAweDAyLCAweDRFMV0gfSwgLy8gMTY0LjA1IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDRGMV0gfSAgLy8gMTY3LjQwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBFLCAweDA2LCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwRCwgMHgwNiwgMHg2Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEMsIDB4MDIsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBELCAweDAzLCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwMywgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxNCAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBFLCAweDA0LCAweDc5MF0gfSwgLy8gMTE3MC4yOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwNSwgMHg3QzBdIH0sIC8vIDIwNDguMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4N0Q4XSB9ICAvLyAzMjc2LjgwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEE1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBDLCAweDA0LCAweDc3MV0gfSwgLy8gOTE2LjU5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBCLCAweDA2LCAweDdBMl0gfSwgLy8gMTM5NC4zOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQSwgMHgwMSwgMHg3QjddIH0gIC8vIDE3OTUuNTEgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEUsIDB4MDQsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBDLCAweDA0LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHgyQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDE1ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEYsIDB4MDMsIDB4NzgwXSB9LCAvLyAxMDI0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBFLCAweDA3LCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAzLCAweDcxMF0gfSwgLy8gNTQ2LjEzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAyLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAyLCAweDZGMF0gfSwgLy8gNDgxLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDZFMF0gfSAgLy8gNDU1LjExIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDVBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDAzLCAweDcwMV0gfSwgLy8gNTE0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBCLCAweDA3LCAweDY4MV0gfSwgLy8gMzQyLjIyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBCLCAweDAzLCAweDY5Ml0gfSwgLy8gMzU4LjEyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAyLCAweDY4MV0gfSwgLy8gMzQyLjIyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBCLCAweDAyLCAweDY3Ml0gfSwgLy8gMzI5LjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDY2MV0gfSAgLy8gMzE1Ljg0IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDAzLCAweDVDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwRCwgMHgwNiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDYsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBCLCAweDAzLCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQSwgMHgwMiwgMHg1Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDEsIDB4NkNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxNiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA3LCAweDc4MF0gfSwgLy8gMTAyNC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRSwgMHgwNiwgMHg3QTBdIH0sIC8vIDEzNjUuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDIsIDB4NzQwXSB9ICAvLyA2ODIuNjcgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NUEgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDcsIDB4NzUzXSB9LCAvLyA3NTcuNjQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEIsIDB4MDYsIDB4NzcyXSB9LCAvLyA5MjMuMDQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDIsIDB4NzExXSB9ICAvLyA1NDguNDIgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEQsIDB4MEYsIDB4MDYsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDA2LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwMiwgMHg0Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDE3ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MEYgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEYsIDB4MDcsIDB4NTAwXSB9LCAvLyAxNzAuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDcsIDB4NTA4XSB9LCAvLyAxNzIuNDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEIsIDB4MDQsIDB4NDgwXSB9LCAvLyAxNDYuMjkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4NDYwXSB9ICAvLyAxNDEuMjQgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4NDQgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEQsIDB4MDcsIDB4NDgxXSB9LCAvLyAxNDYuNDUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEMsIDB4MDcsIDB4NDg5XSB9LCAvLyAxNDcuNzcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEIsIDB4MDQsIDB4NDAxXSB9LCAvLyAxMjguMTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEMsIDB4MDIsIDB4M0UxXSB9ICAvLyAxMjQuMjQgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEUsIDB4MEYsIDB4MDcsIDB4N0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBGLCAweDA2LCAweDZDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOSwgMHgwRSwgMHgwNCwgMHg3Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDIsIDB4NkNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxOCAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDUwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBGLCAweDA1LCAweDY4MF0gfSwgLy8gMzQxLjMzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAyLCAweDZBMF0gfSwgLy8gMzcyLjM2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBGLCAweDAyLCAweDZDMF0gfSwgLy8gNDA5LjYwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAyLCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBELCAweDAyLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBDLCAweDAyLCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBELCAweDAyLCAweDZDMF0gfSwgLy8gNDA5LjYwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDZBMF0gfSAgLy8gMzcyLjM2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDBGIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBELCAweDA1LCAweDYzMV0gfSwgLy8gMjgzLjA5IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBELCAweDAyLCAweDY1Ml0gfSwgLy8gMzA0LjgyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAyLCAweDY3MV0gfSwgLy8gMzI4LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBCLCAweDAyLCAweDY5MV0gfSwgLy8gMzU3LjE0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBDLCAweDAyLCAweDZCMl0gfSwgLy8gMzkyLjQzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBCLCAweDAyLCAweDY5MV0gfSwgLy8gMzU3LjE0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBDLCAweDAyLCAweDY3MV0gfSwgLy8gMzI4LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDY1MV0gfSAgLy8gMzA0LjExIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDAzLCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwMywgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDQsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDA0LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwNCwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4MkNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxOSAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDFCIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBELCAweDAyLCAweDc0MF0gfSwgLy8gNjgyLjY3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBFLCAweDA1LCAweDc2MF0gfSwgLy8gODE5LjIwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBDLCAweDAxLCAweDczMF0gfSAgLy8gNjMwLjE1IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDgxIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDBDLCAweDAyLCAweDcwMV0gfSwgLy8gNTE0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDAyLCAweDcwOF0gfSwgLy8gNTI4LjUyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA3LCAweDc0MV0gfSwgLy8gNjg2LjI0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBBLCAweDAyLCAweDcwMV0gfSAgLy8gNTE0LjAxIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMUEgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRiwgMHgwNywgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRSwgMHgwNiwgMHg3NDRdIH0sIC8vIDY5Ny4xOSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRCwgMHgwNSwgMHg3NTBdIH0sIC8vIDc0NC43MyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwMywgMHg3NjBdIH0sIC8vIDgxOS4yMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwMywgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4N0EwXSB9ICAvLyAxMzY1LjMzIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDBBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDA3LCAweDcwMV0gfSwgLy8gNTE0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBCLCAweDBCLCAweDA2LCAweDcwMl0gfSwgLy8gNTE2LjAzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBBLCAweDA1LCAweDcxMV0gfSwgLy8gNTQ4LjQyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDA5LCAweDAzLCAweDcyMV0gfSwgLy8gNTg3Ljc3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBBLCAweDAzLCAweDc0MV0gfSwgLy8gNjg2LjI0IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDc2Ml0gfSAgLy8gODI5LjU3IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBFLCAweDAyLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwNiwgMHg0Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDQsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBDLCAweDA3LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwRSwgMHgwMiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4MkNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxQiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEYwIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBGLCAweDA3LCAweDZDMF0gfSwgLy8gNDA5LjYwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBFLCAweDA3LCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDA0LCAweDZGMF0gfSwgLy8gNDgxLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBFLCAweDA0LCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDZEMF0gfSAgLy8gNDMxLjE2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDBBIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBFLCAweDA2LCAweDY4MV0gfSwgLy8gMzQyLjIyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBELCAweDA1LCAweDZDMV0gfSwgLy8gNDEwLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBDLCAweDA0LCAweDZCMV0gfSwgLy8gMzkxLjI2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDA0LCAweDZBMV0gfSwgLy8gMzczLjQyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDY5MV0gfSAgLy8gMzU3LjE0IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBBLCAweDA2LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwOSwgMHgwNCwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEEsIDB4MDMsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDJDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMUMgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwRCwgMHgwNiwgMHg3RTFdIH0sIC8vIDQyMjguMTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDYsIDB4N0UyXSB9LCAvLyA0MzY5LjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA5LCAweDBELCAweDA2LCAweDdFMV0gfSwgLy8gNDIyOC4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwQywgMHgwNiwgMHg3RTBdIH0sIC8vIDQwOTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEIsIDB4MDYsIDB4N0UyXSB9LCAvLyA0MzY5LjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBDLCAweDA2LCAweDdFMV0gfSwgLy8gNDIyOC4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwNiwgMHg3RTBdIH0sIC8vIDQwOTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDEsIDB4N0RGXSB9ICAvLyAzOTcxLjg4IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDQ0IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBDLCAweDAzLCAweDdDOV0gfSwgLy8gMjM4My4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwMywgMHg3QzddIH0sIC8vIDIyOTkuNTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEMsIDB4MDQsIDB4N0MzXSB9LCAvLyAyMTQ4LjcyIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDA0LCAweDdDN10gfSwgLy8gMjI5OS41MSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwMywgMHg3QzldIH0sIC8vIDIzODMuMTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDIsIDB4N0M1XSB9ICAvLyAyMjIxLjU2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBELCAweDAxLCAtMHgwMSwgMHg3Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEQsIDB4MEYsIDB4MDcsIDB4OENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBDLCAweDBELCAweDA2LCAweDdDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwNCwgMHg2Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEIsIDB4MDMsIDB4NUNdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxRCAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEY0IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBGLCAweDAwLCAweDcwNV0gfSwgLy8gNTIyLjIwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBFLCAweDAwLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDA0LCAweDcxMF0gfSwgLy8gNTQ2LjEzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBELCAweDAzLCAweDcwMF0gfSwgLy8gNTEyLjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBCLCAweDAyLCAweDYyMF0gfSwgLy8gMjczLjA3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDYyNF0gfSAgLy8gMjc1LjM2IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDIyIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBCLCAweDAwLCAweDZDM10gfSwgLy8gNDEzLjQ4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBBLCAweDAwLCAweDZDMV0gfSwgLy8gNDEwLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDA4LCAweDA0LCAweDZEMl0gfSwgLy8gNDM0LjAxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDA5LCAweDAzLCAweDZDMV0gfSwgLy8gNDEwLjg4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDA4LCAweDAyLCAweDVFMV0gfSwgLy8gMjQxLjM4IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA2LCAweDAxLCAweDVFOF0gfSAgLy8gMjQ0LjU0IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA2LCAweDBFLCAweDA2LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRCwgMHgwNiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEMsIDB4MDUsIDB4NEFdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAxLCAweDBCLCAweDAyLCAweDVCXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQywgMHgwMiwgMHg0Q10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDFFICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEYsIDB4MDIsIDB4NjAwXSB9LCAvLyAyNTYuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDIsIDB4NjQwXSB9LCAvLyAyOTIuNTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDIsIDB4NjgwXSB9LCAvLyAzNDEuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDIsIDB4NkMwXSB9LCAvLyA0MDkuNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEQsIDB4MDIsIDB4NzAwXSB9LCAvLyA1MTIuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDIsIDB4NzQwXSB9LCAvLyA2ODIuNjcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEIsIDB4MDIsIDB4NzgwXSB9LCAvLyAxMDI0LjAwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBBLCAweDAxLCAweDdDMF0gfSAgLy8gMjA0OC4wMCBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgxMSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwMCwgLTB4MDgsIDB4MDAxXSB9LCAvLyA2NC4wMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwMiwgMHg1QzFdIH0sIC8vIDIyNy45NSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwMiwgMHg2MDJdIH0sIC8vIDI1Ny4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQSwgMHgwMiwgMHg2NDFdIH0sIC8vIDI5My4yMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQiwgMHgwMiwgMHg2ODJdIH0sIC8vIDM0My4xMiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQSwgMHgwMiwgMHg2QzJdIH0sIC8vIDQxMi4xOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOSwgMHgwMiwgMHg3MDFdIH0sIC8vIDUxNC4wMSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQSwgMHgwMiwgMHg3NDJdIH0sIC8vIDY4OS44NSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOCwgMHgwMSwgMHg3ODFdIH0gIC8vIDEwMzIuMDYgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MDAsIC0weDA4LCAweDAxXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwRSwgMHgwMiwgMHg1Q10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEMsIDB4MDIsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBELCAweDAyLCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQiwgMHgwMiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEMsIDB4MDIsIDB4MUNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBBLCAweDAyLCAweDFCXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwOSwgMHgwMiwgMHgxQV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDgsIDB4MDEsIDB4MThdIH1cclxuICAgIF1cclxuICB9LCB7IC8vICQxRiAgIFxyXG4gICAgXCJwdWxzZTFcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweEE1IH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAzLCAweDBGLCAweDA0LCAweDY0MV0gfSwgLy8gMjkzLjIzIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBELCAweDBELCAweDA2LCAweDcyMV0gfSwgLy8gNTg3Ljc3IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBGLCAweDA0LCAweDcxOV0gfSwgLy8gNTY3LjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBDLCAweDAxLCAweDcxQV0gfSAgLy8gNTY5Ljg4IEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweENDIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA0LCAweDBGLCAweDA0LCAweDU4MF0gfSwgLy8gMjA0LjgwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBFLCAweDA2LCAweDZFMF0gfSwgLy8gNDU1LjExIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDA1LCAweDZEOF0gfSwgLy8gNDQyLjgxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBELCAweDAxLCAweDZEQ10gfSAgLy8gNDQ4Ljg4IEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA1LCAweDBDLCAweDA0LCAweDQ2XSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwQSwgMHgwNSwgMHg0NF0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDQsIDB4NDVdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDBCLCAweDAxLCAweDQ0XSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMjAgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwRiwgMHgwMSwgMHg1MTFdIH0sIC8vIDE3NC41MyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwRSwgMHgwMSwgMHg1MTVdIH0sIC8vIDE3NS40NiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRCwgMHgwRSwgMHgwMSwgMHg1MTFdIH0sIC8vIDE3NC41MyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg1MTFdIH0gIC8vIDE3NC41MyBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgxNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRSwgMHgwMSwgMHg1MENdIH0sIC8vIDE3My4zOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQywgMHgwRCwgMHgwMSwgMHg1MTBdIH0sIC8vIDE3NC4zMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwQywgMHgwMSwgMHg1MENdIH0sIC8vIDE3My4zOCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHg1MEFdIH0gIC8vIDE3Mi45MiBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRSwgMHgwRiwgMHgwMiwgMHg2NV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEQsIDB4MEUsIDB4MDIsIDB4NTVdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBFLCAweDBELCAweDAyLCAweDU2XSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg2Nl0gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDIxICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MUIgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEYsIDB4MDMsIDB4NTY0XSB9LCAvLyAxOTYuMjIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEUsIDB4MDIsIDB4NTQ0XSB9LCAvLyAxODcuMjUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDEsIDB4NTIyXSB9LCAvLyAxNzguNTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEIsIDB4MDIsIDB4NDg0XSB9LCAvLyAxNDYuOTQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NEEyXSB9LCAvLyAxNTIuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEYsIDB4MDMsIDB4NTI0XSB9LCAvLyAxNzkuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEUsIDB4MDQsIDB4NEU0XSB9LCAvLyAxNjQuNjYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDEsIDB4NTAyXSB9ICAvLyAxNzEuMTEgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4Q0MgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEQsIDB4MDMsIDB4NTYwXSB9LCAvLyAxOTUuMDUgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MEMsIDB4MDIsIDB4NTQwXSB9LCAvLyAxODYuMTggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEMsIDB4MDEsIDB4NTIwXSB9LCAvLyAxNzguMDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDksIDB4MDIsIDB4NDgwXSB9LCAvLyAxNDYuMjkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NEEwXSB9LCAvLyAxNTEuNzAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEQsIDB4MDMsIDB4NTIwXSB9LCAvLyAxNzguMDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDMsIDB4MEMsIDB4MDQsIDB4NEUwXSB9LCAvLyAxNjMuODQgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NTAwXSB9ICAvLyAxNzAuNjcgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtdXHJcbiAgfSwgeyAvLyAkMjIgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHgxMSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMiwgMHgwMywgLTB4MDUsIDB4MzgxXSB9LCAvLyAxMTMuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDcsIDB4MEYsIDB4MDUsIDB4NjAxXSB9LCAgLy8gMjU2LjUwIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAxLCAweDBDLCAweDAyLCAweDQ4MV0gfSwgIC8vIDE0Ni40NSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOSwgMHgwMSwgMHgzODFdIH0gICAvLyAxMTMuODggSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RUUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDIsIDB4MDMsIC0weDA2LCAweDVCMF0gfSwgLy8gMjIxLjQxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA3LCAweDBELCAweDA1LCAweDc1RF0gfSwgIC8vIDgwNC4xMiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMSwgMHgwQiwgMHgwMiwgMHg2QjBdIH0sICAvLyAzOTAuMTAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDYsIDB4MDEsIDB4NUIwXSB9ICAgLy8gMjIxLjQxIEh6XHJcbiAgICBdLFxyXG4gICAgXCJub2lzZVwiOiBbXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDAyLCAweDA5LCAweDAyLCAweDQ5XSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNywgMHgwQiwgMHgwNSwgMHgyOV0gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDEsIDB4MEEsIDB4MDIsIDB4MzldIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDA4LCAweDA5LCAweDAxLCAweDQ5XSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMjMgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhGMCB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRiwgMHgwNywgMHg3QzBdIH0sIC8vIDIwNDguMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEUsIDB4MDQsIDB4N0MxXSB9LCAvLyAyMDgwLjUxIEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBGLCAweDA2LCAweDdDMF0gfSwgLy8gMjA0OC4wMCBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRCwgMHgwMywgMHg3QzJdIH0sIC8vIDIxMTQuMDYgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4N0MwXSB9ICAvLyAyMDQ4LjAwIEh6XHJcbiAgICBdLFxyXG4gICAgXCJwdWxzZTJcIjogW1xyXG4gICAgICB7IFwiZHV0eVwiOiAweDVGIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDA5LCAweDA3LCAweDc4MV0gfSwgLy8gMTAzMi4wNiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwOCwgMHgwNCwgMHg3ODBdIH0sIC8vIDEwMjQuMDAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MDksIDB4MDYsIDB4NzgxXSB9LCAvLyAxMDMyLjA2IEh6XHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDA4LCAweDAzLCAweDc4MV0gfSAgLy8gMTAzMi4wNiBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwRiwgMHgwMiwgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEQsIDB4MEUsIDB4MDYsIDB4MkNdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBELCAweDA3LCAweDNDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQywgMHgwMSwgMHgyQ10gfVxyXG4gICAgXVxyXG4gIH0sIHsgLy8gJDI0ICAgXHJcbiAgICBcInB1bHNlMVwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4RjAgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEYsIDB4MDcsIDB4NjgwXSB9LCAvLyAzNDEuMzMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MEUsIDB4MDYsIDB4Njg0XSB9LCAvLyAzNDQuOTMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEQsIDB4MDcsIDB4NjkwXSB9LCAvLyAzNTYuMTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEQsIDB4MDUsIDB4NjkwXSB9LCAvLyAzNTYuMTcgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MEMsIDB4MDQsIDB4Njg4XSB9LCAvLyAzNDguNjAgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEQsIDB4MDMsIDB4NjcwXSB9LCAvLyAzMjcuNjggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MEQsIDB4MDMsIDB4NjYwXSB9LCAvLyAzMTUuMDggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEMsIDB4MDEsIDB4NjQwXSB9ICAvLyAyOTIuNTcgSHpcclxuICAgIF0sXHJcbiAgICBcInB1bHNlMlwiOiBbXHJcbiAgICAgIHsgXCJkdXR5XCI6IDB4MDUgfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEIsIDB4MDcsIDB4NjQxXSB9LCAvLyAyOTMuMjMgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEEsIDB4MDksIDB4MDYsIDB4NjQyXSB9LCAvLyAyOTMuODggSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEEsIDB4MDcsIDB4NjUxXSB9LCAvLyAzMDQuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MEEsIDB4MDUsIDB4NjUxXSB9LCAvLyAzMDQuMTEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDYsIDB4MDksIDB4MDQsIDB4NjQ3XSB9LCAvLyAyOTcuMjIgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDUsIDB4MEEsIDB4MDMsIDB4NjMxXSB9LCAvLyAyODMuMDkgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDQsIDB4MDksIDB4MDMsIDB4NjIyXSB9LCAvLyAyNzQuMjEgSHpcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MDgsIDB4MDcsIDB4MDEsIDB4NjAxXSB9ICAvLyAyNTYuNTAgSHpcclxuICAgIF0sXHJcbiAgICBcIm5vaXNlXCI6IFtcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEYsIDB4MEUsIDB4MDQsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBDLCAweDA3LCAweDRDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwQSwgMHgwQywgMHgwNywgMHgzQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEIsIDB4MDcsIDB4NENdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBGLCAweDBBLCAweDAyLCAweDVDXSB9XHJcbiAgICBdXHJcbiAgfSwgeyAvLyAkMjUgICBcclxuICAgIFwicHVsc2UxXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHhBNSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwRiwgMHgwNCwgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwRSwgMHgwMywgMHg3MzBdIH0sIC8vIDYzMC4xNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwRiwgMHgwNCwgMHg3NDBdIH0sIC8vIDY4Mi42NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNSwgMHgwQiwgMHgwMywgMHg3NDhdIH0sIC8vIDcxMi4zNSBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwMSwgMHg3NTBdIH0gIC8vIDc0NC43MyBIelxyXG4gICAgXSxcclxuICAgIFwicHVsc2UyXCI6IFtcclxuICAgICAgeyBcImR1dHlcIjogMHg3NyB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNiwgMHgwQywgMHgwMywgMHg3MTJdIH0sIC8vIDU1MC43MiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwRiwgMHgwQiwgMHgwMywgMHg3MDRdIH0sIC8vIDUyMC4xMyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwMywgMHgwQywgMHgwMywgMHg3MTJdIH0sIC8vIDU1MC43MiBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwNCwgMHgwQywgMHgwMywgMHg3MjFdIH0sIC8vIDU4Ny43NyBIelxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwQiwgMHgwMSwgMHg3MzJdIH0gIC8vIDYzNi4yNyBIelxyXG4gICAgXSxcclxuICAgIFwibm9pc2VcIjogW1xyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwRCwgMHgwNiwgMHgyQ10gfSxcclxuICAgICAgeyBcIm5vdGVcIjogWzB4MEMsIDB4MEMsIDB4MDYsIDB4M0NdIH0sXHJcbiAgICAgIHsgXCJub3RlXCI6IFsweDBBLCAweDBCLCAweDA2LCAweDJDXSB9LFxyXG4gICAgICB7IFwibm90ZVwiOiBbMHgwOCwgMHgwOSwgMHgwMSwgMHgxQ10gfVxyXG4gICAgXVxyXG4gIH1cclxuXSBhcyBDcnlUeXBlW107IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F2ZURpYWdyYW0ge1xyXG4gIGNodW5rU2l6ZSA9IDEwMDAwO1xyXG4gIGRpbWludXRpb24gPSAyMDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IFNWR0VsZW1lbnRcclxuICApIHsgfVxyXG5cclxuICByZW5kZXIod2F2ZXM6IG51bWJlcltdW10pIHtcclxuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IHdhdmUgb2Ygd2F2ZXMpIHtcclxuICAgICAgdGhpcy5yZW5kZXJXYXZlKHdhdmUsIGluZGV4LCB3YXZlcy5sZW5ndGgpO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyV2F2ZSh3YXZlOiBudW1iZXJbXSwgd2F2ZUluZGV4OiBudW1iZXIsIHdhdmVDb3VudDogbnVtYmVyKSB7XHJcbiAgICBsZXQgc2luZ2xlV2F2ZU1heEhlaWdodCA9IDQwMCAvIHdhdmVDb3VudDtcclxuICAgIGxldCBiYXNlWSA9IHdhdmVJbmRleCAqIHNpbmdsZVdhdmVNYXhIZWlnaHQ7XHJcbiAgICBjb25zdCB3YXZlQ2h1bmtDb3VudCA9IE1hdGguY2VpbCh3YXZlLmxlbmd0aCAvIHRoaXMuY2h1bmtTaXplIC8gdGhpcy5kaW1pbnV0aW9uKTtcclxuXHJcbiAgICBmb3IgKGxldCBjaHVua0luZGV4ID0gMDsgY2h1bmtJbmRleCA8IHdhdmVDaHVua0NvdW50OyBjaHVua0luZGV4KyspIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicG9seWxpbmVcIik7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuZmlsbCA9IFwibm9uZVwiO1xyXG4gICAgICBlbGVtZW50LnN0eWxlLnN0cm9rZSA9IFwiYmxhY2tcIjtcclxuICAgICAgZWxlbWVudC5zdHlsZS5zdHJva2VXaWR0aCA9IFwiM1wiO1xyXG5cclxuICAgICAgY29uc3QgcG9pbnRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBjaHVua1Bvc2l0aW9uID0gMDsgY2h1bmtQb3NpdGlvbiA8IHRoaXMuY2h1bmtTaXplOyBjaHVua1Bvc2l0aW9uKyspIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2h1bmtTaXplICogY2h1bmtJbmRleCArIGNodW5rUG9zaXRpb247XHJcbiAgICAgICAgY29uc3Qgd2F2ZURhdGFJbmRleCA9IHRoaXMuZGltaW51dGlvbiAqIHBvc2l0aW9uO1xyXG4gICAgICAgIGNvbnN0IHdhdmVEYXRhID0gd2F2ZVt3YXZlRGF0YUluZGV4XTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB3YXZlRGF0YSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB4ID0gcG9zaXRpb24gLyA0O1xyXG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgMTAwICogKFxyXG4gICAgICAgICAgICBiYXNlWSArXHJcbiAgICAgICAgICAgIHNpbmdsZVdhdmVNYXhIZWlnaHQgKiB3YXZlRGF0YSAvIDIgK1xyXG4gICAgICAgICAgICBzaW5nbGVXYXZlTWF4SGVpZ2h0IC8gMlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkgLyAxMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvaW50ID0gW3gsIHldO1xyXG4gICAgICAgIHBvaW50cy5wdXNoKHBvaW50LmpvaW4oXCIsXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJwb2ludHNcIiwgcG9pbnRzLmpvaW4oXCIgXCIpKTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQgKiBhcyB1dGlsIGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCBDcnlUeXBlIGZyb20gXCIuLi9DcnlUeXBlXCI7XHJcbmltcG9ydCBQb2tlbW9uIGZyb20gXCIuLi9Qb2tlbW9uXCI7XHJcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gXCJmaWxlLXNhdmVyXCI7XHJcbmltcG9ydCBjcnlUeXBlcyBmcm9tIFwiLi4vZGF0YS9jcnlUeXBlc1wiO1xyXG53aW5kb3dbXCJjcnlUeXBlXCJdID0gY3J5VHlwZXM7XHJcbmltcG9ydCBXYXZlRGlhZ3JhbSBmcm9tIFwiLi9XYXZlRGlhZ3JhbVwiO1xyXG5pbXBvcnQgQ3J5R2VuZXJhdG9yIGZyb20gXCIuLi9DcnlHZW5lcmF0b3JcIjtcclxuaW1wb3J0IHBva2Vtb25MaXN0IGZyb20gXCIuLi9kYXRhL3Bva2Vtb25MaXN0XCI7XHJcbmltcG9ydCB7IEJhc2VDcnlNYW5hZ2VyIH0gZnJvbSBcIi4uL2RhdGEvQmFzZUNyeU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3Rlck1hbmFnZXIgfSBmcm9tIFwiLi4vZGF0YS9Nb25zdGVyTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgVWkge1xyXG4gIHNlbGVjdGVkUG9rZW1vbjogUG9rZW1vbjtcclxuICBzZWxlY3RlZENyeVR5cGU6IENyeVR5cGU7XHJcbiAgc2VsZWN0ZWRDcnlUeXBlSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgcGl0Y2g6IG51bWJlcjtcclxuICBsZW5ndGg6IG51bWJlcjtcclxuICB2b2x1bWU6IG51bWJlciA9IDUwO1xyXG5cclxuICBjdXN0b21DcnlUeXBlOiBDcnlUeXBlID0ge1xyXG4gICAgbmFtZTogXCJDdXN0b21cIixcclxuICAgIG5vaXNlOiBbXSxcclxuICAgIHB1bHNlMTogW10sXHJcbiAgICBwdWxzZTI6IFtdXHJcbiAgfTtcclxuXHJcbiAgY3J5VHlwZXM6IENyeVR5cGVbXSA9IFt0aGlzLmN1c3RvbUNyeVR5cGVdLmNvbmNhdChjcnlUeXBlcyk7XHJcblxyXG4gIHdhdmVEaWFncmFtOiBXYXZlRGlhZ3JhbTtcclxuICBjcnlHZW5lcmF0b3IgPSBuZXcgQ3J5R2VuZXJhdG9yKCk7XHJcblxyXG4gIHdhdmVEaWFncmFtRWxlbWVudDogU1ZHRWxlbWVudDtcclxuICBwbGF5QnV0dG9uRWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgZG93bmxvYWRCdXR0b25FbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgbmV3QmFzZUNyeUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29weUJhc2VDcnlCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIGRlbGV0ZUJhc2VDcnlCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBzZWxlY3RlZFBva2Vtb25TZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcclxuICBzZWxlY3RlZENyeVR5cGVTZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcclxuXHJcbiAgcGl0Y2hJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgbGVuZ3RoSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHZvbHVtZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgcHVsc2UxRW5hYmxlZEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHVsc2UyRW5hYmxlZEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgbm9pc2VFbmFibGVkRWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgcHVsc2UxQ29tbWFuZHNFbGVtZW50OiBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG4gIHB1bHNlMkNvbW1hbmRzRWxlbWVudDogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICBub2lzZUNvbW1hbmRzRWxlbWVudDogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICByYXdDb21tYW5kc0VsZW1lbnQ6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblxyXG4gIGJhc2VDcnlTZWxlY3RvckVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xyXG5cclxuICBiYXNlQ3J5TmFtZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBjdXJyZW50QmFzZUNyeUlkeDogbnVtYmVyO1xyXG4gIGN1cnJlbnRNb25JZHg6IG51bWJlcjtcclxuXHJcbiAgbW9uQ3J5TmFtZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIG5ld01vbkJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgY29weU1vbkJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgZGVsZXRlTW9uQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMuY3VycmVudEJhc2VDcnlJZHggPSAwO1xyXG4gICAgdGhpcy5jdXJyZW50TW9uSWR4ID0gMDtcclxuXHJcbiAgICB0aGlzLndhdmVEaWFncmFtRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8U1ZHRWxlbWVudD4oXCIjd2F2ZS1kaWFncmFtXCIpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbGVjdGVkLXBva2Vtb25cIik7XHJcbiAgICB0aGlzLnNlbGVjdGVkUG9rZW1vblNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uU2VsZWN0ZWRQb2tlbW9uQ2hhbmdlKTtcclxuXHJcbiAgIC8vIHRoaXMuc2VsZWN0ZWRDcnlUeXBlU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbGVjdGVkLWNyeS10eXBlXCIpO1xyXG4gICAvLyB0aGlzLnNlbGVjdGVkQ3J5VHlwZVNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uQ3J5VHlwZUNoYW5nZSk7XHJcblxyXG4gICAgdGhpcy5waXRjaElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjcGl0Y2hcIik7XHJcbiAgICB0aGlzLnBpdGNoSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vblBpdGNoQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLmxlbmd0aElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjbGVuZ3RoXCIpO1xyXG4gICAgdGhpcy5sZW5ndGhJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uTGVuZ3RoQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLnZvbHVtZUlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjdm9sdW1lXCIpO1xyXG4gICAgdGhpcy52b2x1bWVJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uVm9sdW1lQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLnBsYXlCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjcGxheVwiKTtcclxuICAgIHRoaXMucGxheUJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25QbGF5Q2xpY2spO1xyXG5cclxuICAgIHRoaXMubmV3QmFzZUNyeUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI25ld1wiKTtcclxuICAgIHRoaXMubmV3QmFzZUNyeUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkJhc2VDcnlOZXdDbGljayk7XHJcblxyXG4gICAgdGhpcy5jb3B5QmFzZUNyeUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2NvcHlcIik7XHJcbiAgICB0aGlzLmNvcHlCYXNlQ3J5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQmFzZUNyeUNvcHlDbGljayk7XHJcblxyXG4gICAgdGhpcy5kZWxldGVCYXNlQ3J5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjZGVsZXRlXCIpO1xyXG4gICAgdGhpcy5kZWxldGVCYXNlQ3J5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQmFzZUNyeURlbGV0ZUNsaWNrKTtcclxuXHJcbiAgICB0aGlzLmRvd25sb2FkQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2Rvd25sb2FkXCIpO1xyXG4gICAgdGhpcy5kb3dubG9hZEJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZG93bmxvYWQpO1xyXG5cclxuICAgIHRoaXMucHVsc2UxRW5hYmxlZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI3B1bHNlMS1lbmFibGVkXCIpO1xyXG4gICAgdGhpcy5wdWxzZTJFbmFibGVkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjcHVsc2UyLWVuYWJsZWRcIik7XHJcbiAgICB0aGlzLm5vaXNlRW5hYmxlZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI25vaXNlLWVuYWJsZWRcIik7XHJcblxyXG4gICAgdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KFwiI3B1bHNlMWNtZHNcIik7XHJcbiAgICB0aGlzLnB1bHNlMUNvbW1hbmRzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5vbkNvbW1hbmRzSW5wdXQpO1xyXG5cclxuICAgIHRoaXMucHVsc2UyQ29tbWFuZHNFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MVGV4dEFyZWFFbGVtZW50PihcIiNwdWxzZTJjbWRzXCIpO1xyXG4gICAgdGhpcy5wdWxzZTJDb21tYW5kc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHRoaXMub25Db21tYW5kc0lucHV0KTtcclxuXHJcbiAgICB0aGlzLm5vaXNlQ29tbWFuZHNFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MVGV4dEFyZWFFbGVtZW50PihcIiNub2lzZWNtZHNcIik7XHJcbiAgICB0aGlzLm5vaXNlQ29tbWFuZHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB0aGlzLm9uQ29tbWFuZHNJbnB1dCk7XHJcblxyXG4gICAgLy90aGlzLnJhd0NvbW1hbmRzRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFRleHRBcmVhRWxlbWVudD4oXCIjcmF3Y21kc1wiKTtcclxuXHJcbiAgICB0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNzZWxlY3RlZC1iYXNlY3J5XCIpO1xyXG4gICAgdGhpcy5iYXNlQ3J5U2VsZWN0b3JFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vblNlbGVjdGVkQmFzZUNyeUNoYW5nZSk7XHJcblxyXG4gICAgdGhpcy5iYXNlQ3J5TmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNuYW1lXCIpO1xyXG4gICAgdGhpcy5iYXNlQ3J5TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vbkJhc2VDcnlOYW1lQ2hhbmdlKTtcclxuXHJcblxyXG4gICAgdGhpcy5tb25DcnlOYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI21vbl9uYW1lXCIpO1xyXG4gICAgdGhpcy5tb25DcnlOYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uTW9uTmFtZUNoYW5nZSk7XHJcblxyXG4gICAgdGhpcy5uZXdNb25CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNtb25fbmV3XCIpO1xyXG4gICAgdGhpcy5uZXdNb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25Nb25OZXdDbGljayk7XHJcblxyXG4gICAgdGhpcy5jb3B5TW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjbW9uX2NvcHlcIik7XHJcbiAgICB0aGlzLmNvcHlNb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25Nb25Db3B5Q2xpY2spO1xyXG5cclxuICAgIHRoaXMuZGVsZXRlTW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjbW9uX2RlbGV0ZVwiKTtcclxuICAgIHRoaXMuZGVsZXRlTW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uTW9uRGVsZXRlQ2xpY2spOyAgICBcclxuXHJcblxyXG4gICAgdGhpcy5jcmVhdGVFbGVtZW50cygpO1xyXG4gICAgdGhpcy5zZWxlY3RQb2tlbW9uKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUNvbW1hbmRzKCk7XHJcbiAgIFxyXG4gIH1cclxuXHJcbiAgcmVmcmVzaCgpe1xyXG4gICAgdGhpcy5jcmVhdGVFbGVtZW50cygpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRWxlbWVudHMoKXtcclxuICAgbGV0IGluZGV4ID0gMDtcclxuICAgdGhpcy5zZWxlY3RlZFBva2Vtb25TZWxlY3RFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBmb3IgKGNvbnN0IHBva2Vtb24gb2YgTW9uc3Rlck1hbmFnZXIuZGF0YSkge1xyXG4gICAgICBjb25zdCBvcHRpb24gPSB1dGlsLmNyZWF0ZVNlbGVjdE9wdGlvbihgIyR7aW5kZXggKyAxfTogJHtwb2tlbW9uLm5hbWV9YCwgaW5kZXgudG9TdHJpbmcoKSk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uU2VsZWN0RWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZFBva2Vtb25TZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXggPSB0aGlzLmN1cnJlbnRNb25JZHg7XHJcblxyXG4gICAgdGhpcy5tb25DcnlOYW1lSW5wdXQudmFsdWUgPSBNb25zdGVyTWFuYWdlci5nZXQodGhpcy5jdXJyZW50TW9uSWR4KS5uYW1lO1xyXG5cclxuICAgIC8qdGhpcy5zZWxlY3RlZENyeVR5cGVTZWxlY3RFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBpbmRleCA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGNyeVR5cGUgb2YgdGhpcy5jcnlUeXBlcykge1xyXG4gICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXRDcnlUeXBlTmFtZShjcnlUeXBlKTtcclxuICAgICAgY29uc3QgdmFsdWUgPSBpbmRleC50b1N0cmluZygpO1xyXG5cclxuICAgICAgY29uc3Qgb3B0aW9uID0gdXRpbC5jcmVhdGVTZWxlY3RPcHRpb24obmFtZSwgdmFsdWUpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQ3J5VHlwZVNlbGVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgaW5kZXgrKztcclxuICAgIH0qL1xyXG5cclxuICAgIHRoaXMuYmFzZUNyeVNlbGVjdG9yRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgaW5kZXggPSAwO1xyXG4gICAgZm9yIChjb25zdCBiYXNlQ3J5IG9mIEJhc2VDcnlNYW5hZ2VyLmRhdGEpIHtcclxuICAgICAgY29uc3Qgb3B0aW9uID0gdXRpbC5jcmVhdGVTZWxlY3RPcHRpb24oYCMke2luZGV4ICsgMX06ICR7YmFzZUNyeS5uYW1lfWAsIGluZGV4LnRvU3RyaW5nKCkpO1xyXG4gICAgICB0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgaW5kZXgrKztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJhc2VDcnlOYW1lSW5wdXQudmFsdWUgPSBCYXNlQ3J5TWFuYWdlci5nZXQodGhpcy5jdXJyZW50QmFzZUNyeUlkeCkubmFtZTtcclxuXHJcbiAgICB0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IHRoaXMuY3VycmVudEJhc2VDcnlJZHg7XHJcblxyXG4gICAgdGhpcy53YXZlRGlhZ3JhbSA9IG5ldyBXYXZlRGlhZ3JhbSh0aGlzLndhdmVEaWFncmFtRWxlbWVudCk7XHJcblxyXG4gICAvLyBcclxuICAgIHRoaXMudXBkYXRlQ29tbWFuZHMoKTtcclxuICB9XHJcblxyXG4gIGdldENyeVR5cGVOYW1lKGNyeVR5cGU6IENyeVR5cGUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgY3J5VHlwZS5uYW1lID09PSBcInN0cmluZ1wiID9cclxuICAgICAgY3J5VHlwZS5uYW1lIDpcclxuICAgICAgKGNyeVR5cGVzLmluZGV4T2YoY3J5VHlwZSkgKyAxKS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVEYXRhKCkge1xyXG4gICAgdGhpcy51cGRhdGVDb21tYW5kcygpO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRDaGFubmVscyA9IEJhc2VDcnlNYW5hZ2VyLmdldCh0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4KS5jaGFubmVscztcclxuXHJcbiAgICB0aGlzLmNyeUdlbmVyYXRvci5pbml0KCk7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHB1bHNlMSxcclxuICAgICAgcHVsc2UyLFxyXG4gICAgICBub2lzZVxyXG4gICAgfSA9IHRoaXMuY3J5R2VuZXJhdG9yLmdlbmVyYXRlKGN1cnJlbnRDaGFubmVscywgdGhpcy5waXRjaCwgdGhpcy5sZW5ndGgpO1xyXG5cclxuICAgIGNvbnN0IHdhdmVzOiBudW1iZXJbXVtdID0gW107XHJcbiAgICBpZiAodGhpcy5wdWxzZTFFbmFibGVkRWxlbWVudC5jaGVja2VkKSB7XHJcbiAgICAgIHdhdmVzLnB1c2gocHVsc2UxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wdWxzZTJFbmFibGVkRWxlbWVudC5jaGVja2VkKSB7XHJcbiAgICAgIHdhdmVzLnB1c2gocHVsc2UyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ub2lzZUVuYWJsZWRFbGVtZW50LmNoZWNrZWQpIHtcclxuICAgICAgd2F2ZXMucHVzaChub2lzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMubWl4V2F2ZXMod2F2ZXMsIDMpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcHVsc2UxLFxyXG4gICAgICBwdWxzZTIsXHJcbiAgICAgIG5vaXNlLFxyXG4gICAgICBkYXRhXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ3VycmVudE1vbnN0ZXJTZXR0aW5ncygpe1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBtaXhXYXZlcyh3YXZlczogbnVtYmVyW11bXSwgcmVkdWN0aW9uOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gd2F2ZXMucmVkdWNlKChwcmV2LCBjdXJyZW50KSA9PiBNYXRoLm1heChwcmV2LCBjdXJyZW50Lmxlbmd0aCksIDApO1xyXG4gICAgY29uc3QgZGF0YSA9IG5ldyBBcnJheSh0b3RhbExlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHdhdmUgb2Ygd2F2ZXMpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHdhdmUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgZGF0YVtpbmRleF0gKz0gd2F2ZVtpbmRleF0gLyByZWR1Y3Rpb247XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIG9uQmFzZUNyeU5ld0NsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3SWR4ID0gQmFzZUNyeU1hbmFnZXIuYWRkTmV3KCk7XHJcbiAgICB0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4ID0gbmV3SWR4O1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBvbkJhc2VDcnlDb3B5Q2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdJZHggPSBCYXNlQ3J5TWFuYWdlci5jb3B5KHRoaXMuYmFzZUNyeVNlbGVjdG9yRWxlbWVudC5zZWxlY3RlZEluZGV4KTtcclxuICAgIHRoaXMuY3VycmVudEJhc2VDcnlJZHggPSBuZXdJZHg7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIG9uQmFzZUNyeURlbGV0ZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgQmFzZUNyeU1hbmFnZXIuZGVsZXRlKHRoaXMuYmFzZUNyeVNlbGVjdG9yRWxlbWVudC5zZWxlY3RlZEluZGV4KTtcclxuICAgIHRoaXMuY3VycmVudEJhc2VDcnlJZHggPSAwO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdGVkQmFzZUNyeUNoYW5nZSA9ICgpID0+IHtcclxuICAgIHRoaXMuY3VycmVudEJhc2VDcnlJZHggPSB0aGlzLmJhc2VDcnlTZWxlY3RvckVsZW1lbnQuc2VsZWN0ZWRJbmRleDtcclxuICAgIGlmKHRoaXMuY3VycmVudE1vbklkeCA+IDE1MSl7XHJcbiAgICAgIE1vbnN0ZXJNYW5hZ2VyLnVwZGF0ZUNyeSh0aGlzLmN1cnJlbnRNb25JZHgsIHRoaXMuY3VycmVudEJhc2VDcnlJZHgpOyAgICAgIFxyXG4gICAgfVxyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBvbkJhc2VDcnlOYW1lQ2hhbmdlID0gKCkgPT4ge1xyXG4gICAgQmFzZUNyeU1hbmFnZXIudXBkYXRlTmFtZSh0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4LCB0aGlzLmJhc2VDcnlOYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBvbk1vbk5hbWVDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICBNb25zdGVyTWFuYWdlci51cGRhdGVOYW1lKHRoaXMuY3VycmVudE1vbklkeCwgdGhpcy5tb25DcnlOYW1lSW5wdXQudmFsdWUpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBvbk1vbk5ld0NsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3SWR4ID0gTW9uc3Rlck1hbmFnZXIuYWRkTmV3KCk7XHJcbiAgICB0aGlzLmN1cnJlbnRNb25JZHggPSBuZXdJZHg7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIG9uTW9uQ29weUNsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3SWR4ID0gTW9uc3Rlck1hbmFnZXIuY29weSh0aGlzLmN1cnJlbnRNb25JZHgpO1xyXG4gICAgdGhpcy5jdXJyZW50TW9uSWR4ID0gbmV3SWR4O1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBvbk1vbkRlbGV0ZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgTW9uc3Rlck1hbmFnZXIuZGVsZXRlKHRoaXMuY3VycmVudE1vbklkeCk7XHJcbiAgICB0aGlzLmN1cnJlbnRNb25JZHggPSAwO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfSAgXHJcblxyXG4gIG9uUGxheUNsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwdWxzZTEsXHJcbiAgICAgIHB1bHNlMixcclxuICAgICAgbm9pc2UsXHJcbiAgICAgIGRhdGFcclxuICAgIH0gPSB0aGlzLmdlbmVyYXRlRGF0YSgpO1xyXG5cclxuICAgIHRoaXMud2F2ZURpYWdyYW0ucmVuZGVyKFtcclxuICAgICAgcHVsc2UxLFxyXG4gICAgICBwdWxzZTIsXHJcbiAgICAgIG5vaXNlLFxyXG4gICAgICBkYXRhXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCByZXNhbXBsZWQgPSB1dGlsLnJlc2FtcGxlUGNtKFxyXG4gICAgICB0aGlzLmNyeUdlbmVyYXRvci5zb3VyY2VTYW1wbGVSYXRlLFxyXG4gICAgICB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSxcclxuICAgICAgZGF0YSxcclxuICAgICAgdGhpcy52b2x1bWVcclxuICAgICk7XHJcbiAgICB0aGlzLmNyeUdlbmVyYXRvci5wbGF5KHJlc2FtcGxlZCk7XHJcbiAgfVxyXG5cclxuICBvblBpdGNoQ2hhbmdlID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgY29uc3QgcGl0Y2ggPSBwYXJzZUludChlbGVtZW50LnZhbHVlLCAxMCk7XHJcbiAgICBpZih0aGlzLmN1cnJlbnRNb25JZHggPiAxNTEpe1xyXG4gICAgICBNb25zdGVyTWFuYWdlci51cGRhdGVQaXRjaCh0aGlzLmN1cnJlbnRNb25JZHgsIHBpdGNoKTsgICAgICBcclxuICAgIH1cclxuICAgIHRoaXMuc2V0UGl0Y2gocGl0Y2gpO1xyXG4gIH1cclxuXHJcbiAgb25MZW5ndGhDaGFuZ2UgPSAoZTogRXZlbnQpID0+IHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBjb25zdCBsZW5ndGggPSBwYXJzZUludChlbGVtZW50LnZhbHVlLCAxMCk7XHJcbiAgICBpZih0aGlzLmN1cnJlbnRNb25JZHggPiAxNTEpe1xyXG4gICAgICBNb25zdGVyTWFuYWdlci51cGRhdGVMZW5ndGgodGhpcy5jdXJyZW50TW9uSWR4LCBsZW5ndGgpOyAgICAgIFxyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRMZW5ndGgobGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIG9uVm9sdW1lQ2hhbmdlID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgY29uc3Qgdm9sdW1lID0gcGFyc2VJbnQoZWxlbWVudC52YWx1ZSwgMTApO1xyXG4gICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XHJcbiAgfVxyXG5cclxuICBzZXRQaXRjaCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnBpdGNoSW5wdXRFbGVtZW50LnZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIHRoaXMucGl0Y2ggPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldExlbmd0aCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmxlbmd0aElucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLmxlbmd0aCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0UG9rZW1vbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHBva2Vtb24gPSBNb25zdGVyTWFuYWdlci5nZXQodGhpcy5jdXJyZW50TW9uSWR4KTtcclxuICAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uID0gcG9rZW1vbjtcclxuICAgIHRoaXMuY3VycmVudEJhc2VDcnlJZHggPSBwb2tlbW9uLmNyeTtcclxuICAgIHRoaXMucmVmcmVzaCgpOyAgXHJcbiAgICAvL3RoaXMuc2VsZWN0Q3J5VHlwZShjcnlUeXBlc1twb2tlbW9uLmNyeV0pO1xyXG4gICAgdGhpcy5zZXRQaXRjaChwb2tlbW9uLnBpdGNoKTtcclxuICAgIHRoaXMuc2V0TGVuZ3RoKHBva2Vtb24ubGVuZ3RoIC0gMHg4MCk7XHJcbiAgICAvL3RoaXMucmVmcmVzaCgpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0Q3J5VHlwZSA9IChjcnlUeXBlOiBDcnlUeXBlKSA9PiB7XHJcbiAgICBpZiAoY3J5VHlwZSA9PT0gdGhpcy5zZWxlY3RlZENyeVR5cGUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkQ3J5VHlwZUluZGV4ID0gdGhpcy5jcnlUeXBlcy5pbmRleE9mKGNyeVR5cGUpO1xyXG4gICAgdGhpcy5zZWxlY3RlZENyeVR5cGUgPSBjcnlUeXBlO1xyXG4gICAgLy90aGlzLnNlbGVjdGVkQ3J5VHlwZVNlbGVjdEVsZW1lbnQudmFsdWUgPSB0aGlzLnNlbGVjdGVkQ3J5VHlwZUluZGV4LnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVDb21tYW5kcygpIHtcclxuICAgLy8gaWYgKHRoaXMuc2VsZWN0ZWRDcnlUeXBlICE9PSB0aGlzLmN1c3RvbUNyeVR5cGUpIHtcclxuICAvLyAgICB0aGlzLnVwZGF0ZUNyeVR5cGVDb21tYW5kcyh0aGlzLnNlbGVjdGVkQ3J5VHlwZSk7XHJcbiAgLy8gIH0gZWxzZSB7XHJcbiAvLyAgICAgdGhpcy5wYXJzZUN1c3RvbUNyeVR5cGVDb21tYW5kcygpO1xyXG4gLy8gICB9XHJcbiAgIC8vIHRoaXMudXBkYXRlUmF3Q29tbWFuZHModGhpcy5zZWxlY3RlZENyeVR5cGUpO1xyXG4gICAgLy90aGlzLnBhcnNlQ3J5Q29tbWFuZHMoKTtcclxuICAgIHRoaXMudXBkYXRlQ3J5VHlwZUNvbW1hbmRzKEJhc2VDcnlNYW5hZ2VyLmdldCh0aGlzLmN1cnJlbnRCYXNlQ3J5SWR4KSk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdGVkUG9rZW1vbkNoYW5nZSA9IChlOiBFdmVudCkgPT4ge1xyXG4gICAgdGhpcy5jdXJyZW50TW9uSWR4ID0gdGhpcy5zZWxlY3RlZFBva2Vtb25TZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXg7XHJcbiAgICB0aGlzLnNlbGVjdFBva2Vtb24oKTsgICBcclxuICAgIHRoaXMudXBkYXRlQ29tbWFuZHMoKTtcclxuICB9XHJcblxyXG4gIG9uQ3J5VHlwZUNoYW5nZSA9IChlOiBFdmVudCkgPT4ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIGNvbnN0IGNyeVR5cGVJbmRleCA9IHBhcnNlSW50KGVsZW1lbnQudmFsdWUsIDEwKTtcclxuICAgIHRoaXMuc2VsZWN0Q3J5VHlwZSh0aGlzLmNyeVR5cGVzW2NyeVR5cGVJbmRleF0pO1xyXG4gICAgdGhpcy51cGRhdGVDb21tYW5kcygpO1xyXG4gIH1cclxuXHJcbiAgb25Db21tYW5kc0lucHV0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wYXJzZUNyeUNvbW1hbmRzKCk7XHJcbiAgICAvL3RoaXMudXBkYXRlQ29tbWFuZHMoKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkID0gKCkgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBkYXRhXHJcbiAgICB9ID0gdGhpcy5nZW5lcmF0ZURhdGEoKTtcclxuXHJcbiAgICBjb25zdCByZXNhbXBsZWQgPSB1dGlsLnJlc2FtcGxlUGNtKFxyXG4gICAgICB0aGlzLmNyeUdlbmVyYXRvci5zb3VyY2VTYW1wbGVSYXRlLFxyXG4gICAgICB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSxcclxuICAgICAgZGF0YSxcclxuICAgICAgdGhpcy52b2x1bWVcclxuICAgICk7XHJcblxyXG4gICAgY29uc3Qgc2Vjb25kcyA9IHJlc2FtcGxlZC5sZW5ndGggLyB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZTtcclxuICAgIGNvbnN0IGJsb2IgPSB1dGlsLmNvbnZlcnRQY21Ub1dhdihzZWNvbmRzLCAxLCB0aGlzLmNyeUdlbmVyYXRvci5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSwgMSwgcmVzYW1wbGVkKTtcclxuXHJcbiAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXMuc2VsZWN0ZWRDcnlUeXBlID09PSB0aGlzLmN1c3RvbUNyeVR5cGUgP1xyXG4gICAgICBcImN1c3RvbS1jcnlcIiA6XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRQb2tlbW9uLm5hbWUudG9Mb3dlckNhc2UoKSArIFwiLWNyeVwiO1xyXG4gICAgc2F2ZUFzKGJsb2IsIGAke2ZpbGVuYW1lfS53YXZgKTtcclxuICB9XHJcblxyXG4gIHBhcnNlQ3J5Q29tbWFuZHMoKSB7XHJcbiAgICBjb25zdCBwdWxzZTFDb21tYW5kcyA9IHRoaXMucHVsc2UxQ29tbWFuZHNFbGVtZW50LnZhbHVlLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgY29uc3QgcHVsc2UyQ29tbWFuZHMgPSB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC52YWx1ZS5zcGxpdChcIlxcblwiKTtcclxuICAgIGNvbnN0IG5vaXNlQ29tbWFuZHMgPSB0aGlzLm5vaXNlQ29tbWFuZHNFbGVtZW50LnZhbHVlLnNwbGl0KFwiXFxuXCIpO1xyXG5cclxuICAgIGNvbnN0IG5ld0NvbW1hbmRzID0ge1xyXG4gICAgICBwdWxzZTE6IFtdLFxyXG4gICAgICBwdWxzZTI6IFtdLFxyXG4gICAgICBub2lzZTogW11cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcHVsc2UxID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHVsc2UxQ29tbWFuZHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwdWxzZTFDb21tYW5kc1tpbmRleF0uc3BsaXQoXCIgXCIpO1xyXG4gICAgICBpZiAoY29tbWFuZFswXSA9PT0gXCJkdXR5XCIpIHtcclxuICAgICAgICBwdWxzZTEucHVzaCh7IFwiZHV0eVwiOiBwYXJzZUludChjb21tYW5kWzFdKSB9KTtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kWzBdID09PSBcIm5vdGVcIikge1xyXG4gICAgICAgIHB1bHNlMS5wdXNoKHsgXCJub3RlXCI6IFtwYXJzZUludChjb21tYW5kWzFdKSwgcGFyc2VJbnQoY29tbWFuZFsyXSksIHBhcnNlSW50KGNvbW1hbmRbM10pLCBwYXJzZUludChjb21tYW5kWzRdKV0gfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5ld0NvbW1hbmRzLnB1bHNlMSA9IHB1bHNlMTtcclxuXHJcbiAgICBjb25zdCBwdWxzZTIgPSBbXTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwdWxzZTJDb21tYW5kcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgY29tbWFuZCA9IHB1bHNlMkNvbW1hbmRzW2luZGV4XS5zcGxpdChcIiBcIik7XHJcbiAgICAgIGlmIChjb21tYW5kWzBdID09PSBcImR1dHlcIikge1xyXG4gICAgICAgIHB1bHNlMi5wdXNoKHsgXCJkdXR5XCI6IHBhcnNlSW50KGNvbW1hbmRbMV0pIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGNvbW1hbmRbMF0gPT09IFwibm90ZVwiKSB7XHJcbiAgICAgICAgcHVsc2UyLnB1c2goeyBcIm5vdGVcIjogW3BhcnNlSW50KGNvbW1hbmRbMV0pLCBwYXJzZUludChjb21tYW5kWzJdKSwgcGFyc2VJbnQoY29tbWFuZFszXSksIHBhcnNlSW50KGNvbW1hbmRbNF0pXSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbmV3Q29tbWFuZHMucHVsc2UyID0gcHVsc2UyO1xyXG5cclxuICAgIGNvbnN0IG5vaXNlID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbm9pc2VDb21tYW5kcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgY29tbWFuZCA9IG5vaXNlQ29tbWFuZHNbaW5kZXhdLnNwbGl0KFwiIFwiKTtcclxuICAgICAgaWYgKGNvbW1hbmRbMF0gPT09IFwibm90ZVwiKSB7XHJcbiAgICAgICAgbm9pc2UucHVzaCh7IFwibm90ZVwiOiBbcGFyc2VJbnQoY29tbWFuZFsxXSksIHBhcnNlSW50KGNvbW1hbmRbMl0pLCBwYXJzZUludChjb21tYW5kWzNdKSwgcGFyc2VJbnQoY29tbWFuZFs0XSldIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXdDb21tYW5kcy5ub2lzZSA9IG5vaXNlO1xyXG5cclxuICAgIEJhc2VDcnlNYW5hZ2VyLnVwZGF0ZUNoYW5uZWxzKHRoaXMuY3VycmVudEJhc2VDcnlJZHgsIG5ld0NvbW1hbmRzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUNyeVR5cGVDb21tYW5kcyhjcnlJbmZvKSB7XHJcbiAgICBjb25zdCBjcnkgPSBjcnlJbmZvLmNoYW5uZWxzO1xyXG4gICAgdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQuZGlzYWJsZWQgPSBjcnlJbmZvLmlzUmVmZXJlbmNlO1xyXG4gICAgdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNyeS5wdWxzZTEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChjcnkucHVsc2UxW2luZGV4XS5kdXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnB1bHNlMUNvbW1hbmRzRWxlbWVudC52YWx1ZSA9IHRoaXMucHVsc2UxQ29tbWFuZHNFbGVtZW50LnZhbHVlICtcclxuICAgICAgICAgIFwiZHV0eSAweFwiICsgY3J5LnB1bHNlMVtpbmRleF0uZHV0eS50b1N0cmluZygweDEwKSArIFwiXFxuXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoY3J5LnB1bHNlMVtpbmRleF0ubm90ZSkge1xyXG4gICAgICAgIHRoaXMucHVsc2UxQ29tbWFuZHNFbGVtZW50LnZhbHVlID0gdGhpcy5wdWxzZTFDb21tYW5kc0VsZW1lbnQudmFsdWUgK1xyXG4gICAgICAgICAgXCJub3RlIFwiICtcclxuICAgICAgICAgIChjcnkucHVsc2UxW2luZGV4XS5ub3RlWzBdKSArIFwiIFwiICtcclxuICAgICAgICAgIGNyeS5wdWxzZTFbaW5kZXhdLm5vdGVbMV0gKyBcIiBcIiArXHJcbiAgICAgICAgICBjcnkucHVsc2UxW2luZGV4XS5ub3RlWzJdICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5LnB1bHNlMVtpbmRleF0ubm90ZVszXSArIFwiXFxuXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC5kaXNhYmxlZCA9IGNyeUluZm8uaXNSZWZlcmVuY2U7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY3J5LnB1bHNlMi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKGNyeS5wdWxzZTJbaW5kZXhdLmR1dHkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMucHVsc2UyQ29tbWFuZHNFbGVtZW50LnZhbHVlID0gdGhpcy5wdWxzZTJDb21tYW5kc0VsZW1lbnQudmFsdWUgK1xyXG4gICAgICAgICAgXCJkdXR5IDB4XCIgKyBjcnkucHVsc2UyW2luZGV4XS5kdXR5LnRvU3RyaW5nKDB4MTApICsgXCJcXG5cIjtcclxuICAgICAgfSBlbHNlIGlmIChjcnkucHVsc2UyW2luZGV4XS5ub3RlKSB7XHJcbiAgICAgICAgdGhpcy5wdWxzZTJDb21tYW5kc0VsZW1lbnQudmFsdWUgPSB0aGlzLnB1bHNlMkNvbW1hbmRzRWxlbWVudC52YWx1ZSArXHJcbiAgICAgICAgICBcIm5vdGUgXCIgK1xyXG4gICAgICAgICAgKGNyeS5wdWxzZTJbaW5kZXhdLm5vdGVbMF0pICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5LnB1bHNlMltpbmRleF0ubm90ZVsxXSArIFwiIFwiICtcclxuICAgICAgICAgIGNyeS5wdWxzZTJbaW5kZXhdLm5vdGVbMl0gKyBcIiBcIiArXHJcbiAgICAgICAgICBjcnkucHVsc2UyW2luZGV4XS5ub3RlWzNdICsgXCJcXG5cIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubm9pc2VDb21tYW5kc0VsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgdGhpcy5ub2lzZUNvbW1hbmRzRWxlbWVudC5kaXNhYmxlZCA9IGNyeUluZm8uaXNSZWZlcmVuY2U7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY3J5Lm5vaXNlLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoY3J5Lm5vaXNlW2luZGV4XS5ub3RlKSB7XHJcbiAgICAgICAgdGhpcy5ub2lzZUNvbW1hbmRzRWxlbWVudC52YWx1ZSA9IHRoaXMubm9pc2VDb21tYW5kc0VsZW1lbnQudmFsdWUgK1xyXG4gICAgICAgICAgXCJub3RlIFwiICtcclxuICAgICAgICAgIChjcnkubm9pc2VbaW5kZXhdLm5vdGVbMF0pICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5Lm5vaXNlW2luZGV4XS5ub3RlWzFdICsgXCIgXCIgK1xyXG4gICAgICAgICAgY3J5Lm5vaXNlW2luZGV4XS5ub3RlWzJdICsgXCIgMHhcIiArXHJcbiAgICAgICAgICBjcnkubm9pc2VbaW5kZXhdLm5vdGVbM10udG9TdHJpbmcoMHgxMCkgKyBcIlxcblwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuIC8qIHVwZGF0ZVJhd0NvbW1hbmRzKGNyeVR5cGU6IENyeVR5cGUpIHtcclxuICAgIGxldCBjb250ZW50ID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBwdWxzZTEgPSBjcnlUeXBlLnB1bHNlMTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwdWxzZTEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwdWxzZTFbaW5kZXhdO1xyXG4gICAgICBpZiAoY29tbWFuZC5kdXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBkdXR5ID0gY29tbWFuZC5kdXR5O1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCJGQyBcIiArIChkdXR5IDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBkdXR5LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiMlwiICsgKGNvbW1hbmQubm90ZVswXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gKGNvbW1hbmQubm90ZVsxXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIChjb21tYW5kLm5vdGVbMl0gJiAweEYpLnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY29tbWFuZC5ub3RlWzNdICYgMHhGRiwgaGVpZ2h0ID0gKGNvbW1hbmQubm90ZVszXSA+PiA4KSAmIDB4RkY7XHJcbiAgICAgICAgY29udGVudCArPSAobGVuZ3RoIDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBsZW5ndGgudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiICsgKGhlaWdodCA8IDB4MTAgPyBcIjBcIiA6IFwiXCIpICsgaGVpZ2h0LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnQgKz0gXCJGRiBcIjtcclxuXHJcbiAgICBjb25zdCBwdWxzZTIgPSBjcnlUeXBlLnB1bHNlMjtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwdWxzZTIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBwdWxzZTJbaW5kZXhdO1xyXG4gICAgICBpZiAoY29tbWFuZC5kdXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBkdXR5ID0gY29tbWFuZC5kdXR5O1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCJGQyBcIiArIChkdXR5IDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBkdXR5LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiMlwiICsgKGNvbW1hbmQubm90ZVswXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gKGNvbW1hbmQubm90ZVsxXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIChjb21tYW5kLm5vdGVbMl0gJiAweEYpLnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY29tbWFuZC5ub3RlWzNdICYgMHhGRiwgaGVpZ2h0ID0gKGNvbW1hbmQubm90ZVszXSA+PiA4KSAmIDB4RkY7XHJcbiAgICAgICAgY29udGVudCArPSAobGVuZ3RoIDwgMHgxMCA/IFwiMFwiIDogXCJcIikgKyBsZW5ndGgudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiICsgKGhlaWdodCA8IDB4MTAgPyBcIjBcIiA6IFwiXCIpICsgaGVpZ2h0LnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnQgKz0gXCJGRiBcIjtcclxuXHJcbiAgICBjb25zdCBub2lzZSA9IGNyeVR5cGUubm9pc2U7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbm9pc2UubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBub2lzZVtpbmRleF07XHJcbiAgICAgIGlmIChjb21tYW5kLm5vdGUpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiMlwiICsgKGNvbW1hbmQubm90ZVswXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIFwiIFwiO1xyXG4gICAgICAgIGNvbnRlbnQgKz0gKGNvbW1hbmQubm90ZVsxXSAmIDB4RikudG9TdHJpbmcoMHgxMCkudG9VcHBlckNhc2UoKSArIChjb21tYW5kLm5vdGVbMl0gJiAweEYpLnRvU3RyaW5nKDB4MTApLnRvVXBwZXJDYXNlKCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gY29tbWFuZC5ub3RlWzNdICYgMHhGRjtcclxuICAgICAgICBjb250ZW50ICs9IChsZW5ndGggPCAweDEwID8gXCIwXCIgOiBcIlwiKSArIGxlbmd0aC50b1N0cmluZygweDEwKS50b1VwcGVyQ2FzZSgpICsgXCIgXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50ICs9IFwiRkYgXCI7XHJcblxyXG4gICAgdGhpcy5yYXdDb21tYW5kc0VsZW1lbnQudmFsdWUgPSBjb250ZW50O1xyXG4gIH0qL1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgVWkoKTsiLCJpbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlU2VsZWN0T3B0aW9uID0gKHRleHQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgb3B0aW9uLnZhbHVlID0gdmFsdWU7XHJcbiAgb3B0aW9uLnRleHRDb250ZW50ID0gdGV4dDtcclxuXHJcbiAgcmV0dXJuIG9wdGlvbjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb252ZXJ0UGNtVG9XYXYgPSAoXHJcbiAgZHVyYXRpb25JblNlY29uZHM6IG51bWJlcixcclxuICBudW1iZXJPZkNoYW5uZWxzOiBudW1iZXIsXHJcbiAgc2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gIGJ5dGVzUGVyU2FtcGxlOiBudW1iZXIsXHJcbiAgc2FtcGxlczogbnVtYmVyW11cclxuKSA9PiB7XHJcbiAgY29uc3QgYml0c1BlclNhbXBsZSA9IGJ5dGVzUGVyU2FtcGxlICogODtcclxuICBjb25zdCBzYW1wbGVTaXplID0gbnVtYmVyT2ZDaGFubmVscyAqIGJ5dGVzUGVyU2FtcGxlO1xyXG4gIGNvbnN0IGJ5dGVzUGVyU2Vjb25kID0gc2FtcGxlU2l6ZSAqIHNhbXBsZVJhdGU7XHJcbiAgY29uc3QgZGF0YVNpemUgPSBkdXJhdGlvbkluU2Vjb25kcyAqIGJ5dGVzUGVyU2Vjb25kO1xyXG4gIGNvbnN0IGZ1bGxTaXplID0gNDQgKyBkYXRhU2l6ZTtcclxuXHJcbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKGZ1bGxTaXplKTtcclxuICBsZXQgb2Zmc2V0ID0gMDtcclxuXHJcbiAgYnVmZmVyLndyaXRlKFwiUklGRlwiLCBvZmZzZXQsIFwidXRmOFwiKTtcclxuICBvZmZzZXQgKz0gNDtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDMyTEUoZnVsbFNpemUsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZShcIldBVkVcIiwgb2Zmc2V0LCBcInV0ZjhcIik7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZShcImZtdCBcIiwgb2Zmc2V0LCBcInV0ZjhcIik7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQzMkxFKDE2LCBvZmZzZXQpOyAvLyByZW1haW5pbmcgaGVhZGVyIHNpemVcclxuICBvZmZzZXQgKz0gNDtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDE2TEUoMSwgb2Zmc2V0KTsgLy8gUENNIHR5cGVcclxuICBvZmZzZXQgKz0gMjtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDE2TEUobnVtYmVyT2ZDaGFubmVscywgb2Zmc2V0KTtcclxuICBvZmZzZXQgKz0gMjtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDMyTEUoc2FtcGxlUmF0ZSwgb2Zmc2V0KTtcclxuICBvZmZzZXQgKz0gNDtcclxuXHJcbiAgYnVmZmVyLndyaXRlVUludDMyTEUoYnl0ZXNQZXJTZWNvbmQsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQxNkxFKHNhbXBsZVNpemUsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDI7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQxNkxFKGJpdHNQZXJTYW1wbGUsIG9mZnNldCk7XHJcbiAgb2Zmc2V0ICs9IDI7XHJcblxyXG4gIGJ1ZmZlci53cml0ZShcImRhdGFcIiwgb2Zmc2V0LCBcInV0ZjhcIik7XHJcbiAgb2Zmc2V0ICs9IDQ7XHJcblxyXG4gIGJ1ZmZlci53cml0ZVVJbnQzMkxFKGRhdGFTaXplLCBvZmZzZXQpO1xyXG4gIG9mZnNldCArPSA0O1xyXG5cclxuICBmb3IgKGxldCBzZWNvbmRJbmRleCA9IDA7IHNlY29uZEluZGV4IDwgZHVyYXRpb25JblNlY29uZHM7IHNlY29uZEluZGV4KyspIHtcclxuICAgIGZvciAobGV0IGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleCA9IDA7IGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleCA8IHNhbXBsZVJhdGU7IGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleCArPSBieXRlc1BlclNhbXBsZSkge1xyXG4gICAgICBjb25zdCBzYW1wbGVJbmRleCA9IHNlY29uZEluZGV4ICogc2FtcGxlUmF0ZSArIGN1cnJlbnRTZWNvbmRTYW1wbGVJbmRleDtcclxuXHJcbiAgICAgIGxldCB2YWx1ZSA9IHNhbXBsZXNbc2FtcGxlSW5kZXhdO1xyXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSBicmVhaztcclxuXHJcbiAgICAgIGNvbnN0IHNjYWxlZFZhbHVlID0gKHZhbHVlICogMHhGRikgKyAoMHhGRiAvIDIpO1xyXG4gICAgICB2YWx1ZSA9IHNjYWxlZFZhbHVlICYgMHhGRjtcclxuXHJcbiAgICAgIGJ1ZmZlci53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQpO1xyXG4gICAgICBvZmZzZXQgKz0gYnl0ZXNQZXJTYW1wbGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogXCJhdWRpby93YXZcIiB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNhbXBsZVBjbSA9IChcclxuICBmcm9tU2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gIHRvU2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gIGRhdGE6IG51bWJlcltdLFxyXG4gIHZvbHVtZTogbnVtYmVyID0gMTAwXHJcbikgPT4ge1xyXG4gIGNvbnN0IHJlc2FtcGxlZDogbnVtYmVyW10gPSBbXTtcclxuICBjb25zdCByZXNhbXBsZVJhdGVSYXRpbyA9IGZyb21TYW1wbGVSYXRlIC8gdG9TYW1wbGVSYXRlO1xyXG4gIGNvbnN0IHJlc2FtcGxlZExlbmd0aCA9IE1hdGguY2VpbChkYXRhLmxlbmd0aCAvIHJlc2FtcGxlUmF0ZVJhdGlvKTtcclxuICBjb25zdCB2b2x1bWVGYWN0b3IgPSB2b2x1bWUgLyAweDEwMDtcclxuXHJcbiAgZm9yIChsZXQgcmVzYW1wbGVkSW5kZXggPSAwOyByZXNhbXBsZWRJbmRleCA8IHJlc2FtcGxlZExlbmd0aDsgcmVzYW1wbGVkSW5kZXgrKykge1xyXG4gICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKHJlc2FtcGxlZEluZGV4ICogcmVzYW1wbGVSYXRlUmF0aW8pO1xyXG4gICAgY29uc3QgZnJhY3Rpb24gPSByZXNhbXBsZWRJbmRleCAqIHJlc2FtcGxlUmF0ZVJhdGlvIC0gaW5kZXg7XHJcbiAgICByZXNhbXBsZWRbcmVzYW1wbGVkSW5kZXhdID0gKFxyXG4gICAgICAoMSAtIGZyYWN0aW9uKSAqIGRhdGFbaW5kZXhdICtcclxuICAgICAgZnJhY3Rpb24gKiBkYXRhW2luZGV4ICsgMV1cclxuICAgICkgKiB2b2x1bWVGYWN0b3I7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzYW1wbGVkO1xyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB1aSBmcm9tIFwiLi91aVwiO1xyXG5pbXBvcnQgeyBCYXNlQ3J5TWFuYWdlciB9IGZyb20gXCIuL2RhdGEvQmFzZUNyeU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3Rlck1hbmFnZXIgfSBmcm9tIFwiLi9kYXRhL01vbnN0ZXJNYW5hZ2VyXCI7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gIEJhc2VDcnlNYW5hZ2VyLmluaXQoKTtcclxuICBNb25zdGVyTWFuYWdlci5pbml0KCk7XHJcbiAgdWkuaW5pdCgpO1xyXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=