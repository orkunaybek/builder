import vcCake from 'vc-cake'
const API = {
  createKey: () => {
    let uuid = ''

    for (let i = 0; i < 8; i++) {
      let random = Math.random() * 16 | 0
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-'
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16)
    }

    return uuid
  },
  setCookie (cName, value, exDays = 256) {
    let exDate = new Date()
    exDate.setDate(exDate.getDate() + exDays)
    let cValue = encodeURIComponent(value) + (exDays === null ? '' : '; expires=' + exDate.toUTCString())
    document.cookie = cName + '=' + cValue
  },
  getCookie (cName) {
    let i, x, y
    let ARRcookies = document.cookie.split(';')
    for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[ i ].substr(0, ARRcookies[ i ].indexOf('='))
      y = ARRcookies[ i ].substr(ARRcookies[ i ].indexOf('=') + 1)
      x = x.replace(/^\s+|\s+$/g, '')
      if (x === cName) {
        return decodeURIComponent(y)
      }
    }
  },
  hasCookie (cName) {
    return !!this.getCookie(cName)
  },
  getRealWidth: ($el, $container) => {
    let $tempEl
    let realWidth = 0

    $tempEl = $el.cloneNode(true)
    $tempEl.style.position = 'fixed'

    $container.appendChild($tempEl)

    realWidth = $tempEl.offsetWidth
    if (realWidth === 0) {
      $tempEl.remove()
      return 0
    }
    let style = window.getComputedStyle($tempEl, null)
    realWidth += parseInt(style.marginLeft) + parseInt(style.marginRight)
    $tempEl.remove()
    return realWidth
  },
  addResizeListener: (element, options, fn) => {
    let isIE = !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/))
    if (window.getComputedStyle(element).position === 'static') {
      element.style.position = 'relative'
    }
    let obj = element.__resizeTrigger__ = document.createElement('object')
    obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; opacity: 0; pointer-events: none; z-index: -1;')
    obj.__resizeElement__ = element
    obj.onload = (e) => {
      obj.contentDocument.defaultView.addEventListener('resize', fn.bind(this, element, options))
    }
    obj.type = 'text/html'
    if (isIE) {
      element.appendChild(obj)
    }
    obj.data = 'about:blank'
    if (!isIE) {
      element.appendChild(obj)
    }
  },
  removeResizeListener: (element, options, fn) => {
    element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', fn.bind(this, element, options))
    element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__)
  }
}
vcCake.addService('utils', API)
