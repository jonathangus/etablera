import get from 'lodash/get'

let supportedWebp

type Ref = {
  current?: HTMLElement
}
export const styleRef = (ref: Ref) => {
  const style = (key: string, value: string) => {
    if (ref && ref.current) {
      ref.current.style[key] = value
    }
  }

  const handler = {
    get: (obj, prop) => {
      if (obj[prop]) return obj[prop]

      return (value: string) => style(prop, value)
    },
  }

  const target = {
    transform: (value: string) => style('transform', value),
    animation: (value: string) => style('animation', value),
    maxWidth: (value: string) => style('maxWidth', value),
  }

  return new Proxy(target, handler)
}

export const supportsWebp = async () => {
  if (typeof window === 'undefined') return

  if (typeof supportedWebp !== 'undefined') {
    return supportedWebp
  }

  if (!window.createImageBitmap) return false

  const webpData =
    'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA='
  const blob = await fetch(webpData).then(r => r.blob())

  return createImageBitmap(blob).then(
    () => {
      supportedWebp = true
      return true
    },
    () => {
      supportedWebp = false
      return false
    }
  )
}

export const getImgSrcSetFull = image => {
  return supportsWebp() ? image.srcSetWebp : image.srcSet
}

export const getImgSrcSet = obj => {
  const image =
    get(obj, 'childImageSharp.fluid') || get(obj, 'fluid') || obj || {}

  if (!image.srcSet) {
    console.warn('ERRORRR in getImgSrcSet')
    return null
  }

  const windowSize = typeof window !== 'undefined' ? window.innerWidth : 1800
  const srces = getImgSrcSetFull(image)
  const items = srces.split(',').map(item => {
    const [url, size] = item.split(' ')

    return {
      url: url.replace(/(\r\n|\n|\r)/gm, ''),
      size: parseInt(size.replace('w', ''), 10),
    }
  })

  const selected =
    items.find(item => item.size > windowSize) || items[items.length - 1]

  if (!selected) {
    console.warn('Cant find', selected, items, windowSize)

    return null
  }

  return selected.url
}

supportsWebp()

export const getNodesFromLang = (items, lang) => {
  return items.edges.map(n => n.node).filter(n => n.node_locale === lang)
}

export const isSmallVideo = () => {
  const windowSize = typeof window !== 'undefined' ? window.innerWidth : 1800

  return windowSize < 640
}

export const getVideoSrcFromCase = item => {
  return isSmallVideo() ? item.videoUrlMobile : item.videoUrlDesktop
}

export const requestIdleCb = cb => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      cb()
    })
  } else {
    cb()
  }
}

export const minimumTimeout = (minimumTime: Date, cb: Function): void => {
  const d = new Date()
  const diffTime = Math.abs(minimumTime.getTime() - d.getTime())

  if (diffTime > 0) {
    setTimeout(cb, diffTime)
  } else {
    cb()
  }
}
