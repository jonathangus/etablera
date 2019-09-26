import 'intersection-observer'
import 'requestidlecallback'
import ReactDOM from 'react-dom'
import get from 'lodash/get'
import { pageWrapper, transitionPage } from './src/utils/dom-selectors'
import { transitionOptions } from './src/components/PageTransitionHandler'
import { minimumTimeout } from './src/utils'

// React fiber ⚡️⚡️⚡️
export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    const root = ReactDOM.unstable_createRoot(container, { hydrate: true })

    root.render(element, callback)
  }
}

const getPathName = location => {
  return location.pathname.replace('/en', '')
}

export const onClientEntry = () => {
  const entryDate = new Date()

  if (window.location.search.includes('pwa')) {
    localStorage.setItem('isPwa', true)

    window.addEventListener('blur', () => {
      const difference = new Date().getTime() - entryDate.getTime()
      const hours = Math.round(difference / 60000 / 60)

      if (localStorage.getItem('isPwa') && hours > 24) {
        window.location.reload(true)
      }
    })
  }
}

export const onServiceWorkerUpdateReady = () => {
  window.setShowPwaRefresh()
}

export const onPreRouteUpdate = ({
  location,
  prevLocation,
  getResourcesForPathname,
  loadPageSync,
  ...rest
}) => {
  if (!prevLocation) return
  const nextPageContext = get(
    loadPageSync(location.pathname),
    'json.pageContext',
    {}
  )

  const prevPageContext = get(
    loadPageSync(prevLocation.pathname),
    'json.pageContext',
    {}
  )

  const isChangingLanguage = prevPageContext.locale !== nextPageContext.locale
  const { isCasePage } = nextPageContext
  const { isCasePage: isPrevCasePage } = nextPageContext

  if (!isChangingLanguage && isCasePage) {
    return
  }

  const t = new Date()
  t.setMilliseconds(t.getMilliseconds() + transitionOptions.DURATION)
  window[transitionOptions.START_TRANSITION_DATE] = t

  const s = new Date()
  s.setMilliseconds(t.getMilliseconds() + transitionOptions.DURATION * 2)
  window[transitionOptions.END_TRANSITION_DATE] = s
}

export const shouldUpdateScroll = () =>
  Boolean(!window[transitionOptions.START_TRANSITION_DATE])

export const onRouteUpdate = ({ location, prevLocation }) => {
  const clearIt = () => {
    const transitionElem = transitionPage.resolve()
    if (transitionElem)
      transitionElem.classList.remove(transitionPage.activeClass)
    window[transitionOptions.END_TRANSITION_DATE] = null
    window[transitionOptions.START_TRANSITION_DATE] = null
  }

  const endDate = window[transitionOptions.END_TRANSITION_DATE]
  if (!endDate) {
    return clearIt()
  }

  minimumTimeout(endDate, () => {
    window.scrollTo(0, 0)
    clearIt()
  })
}

if (!window.WeakSet) {
  window.WeakSet = b
  var c = Date.now() % 1e9
  function b(a) {
    this.name = '__st' + ((1e9 * Math.random()) >>> 0) + (c++ + '__')
    a && a.forEach && a.forEach(this.add, this)
  }
  var e = b.prototype
  e.add = function(a) {
    var d = this.name
    a[d] || Object.defineProperty(a, d, { value: !0, writable: !0 })
    return this
  }
  e['delete'] = function(a) {
    if (!a[this.name]) return !1
    a[this.name] = void 0
    return !0
  }
  e.has = function(a) {
    return !!a[this.name]
  }
}
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString
    var isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
    }
    var toInteger = function(value) {
      var number = Number(value)
      if (isNaN(number)) {
        return 0
      }
      if (number === 0 || !isFinite(number)) {
        return number
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
    }
    var maxSafeInteger = Math.pow(2, 53) - 1
    var toLength = function(value) {
      var len = toInteger(value)
      return Math.min(Math.max(len, 0), maxSafeInteger)
    }

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike)

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          'Array.from requires an array-like object - not null or undefined'
        )
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined
      var T
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            'Array.from: when provided, the second argument must be a function'
          )
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2]
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length)

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len)

      // 16. Let k be 0.
      var k = 0
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue
      while (k < len) {
        kValue = items[k]
        if (mapFn) {
          A[k] =
            typeof T === 'undefined'
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k)
        } else {
          A[k] = kValue
        }
        k += 1
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len
      // 20. Return A.
      return A
    }
  })()
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length
    }
    return this.substring(this_len - search.length, this_len) === search
  }
}
