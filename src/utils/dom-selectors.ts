type DomSelector = {
  attr: {
    [key: string]: true
  }
  resolve: (parent?: HTMLElement) => HTMLElement
  resolveAll: () => HTMLElement[]
  [any: string]: any
}

const isClient = typeof window !== 'undefined'

const getSelector = (selector: string, rest: Object = {}): DomSelector => ({
  attr: {
    [`data-${selector}`]: true,
  },
  resolve: (parent?: HTMLElement) => {
    if (!isClient) return

    return parent
      ? parent.querySelector(`[data-${selector}]`)
      : document.querySelector(`[data-${selector}]`)
  },
  resolveAll: () => {
    if (!isClient) return []

    return Array.from(document.querySelectorAll(`[data-${selector}]`))
  },
  ...rest,
})

export const $mainHero = getSelector('main-hero')
export const etableraDescription = getSelector('etablera-description')
export const pageWrapper = getSelector('page-wrapper', {
  transitionClass: 'page-transition',
})

export const transitionPage = getSelector('transition-page', {
  activeClass: 'active',
})

export const $pageTitle = getSelector('page-title')
export const $headerTextDiff = getSelector('light-header-text')
export const $caseHeader = getSelector('case-header')
export const $header = getSelector('header', {
  lightTextClass: 'light-text',
})
export const $mediaImage = getSelector('media-image', {
  mediaImageClass: 'media-image',
})

export const $pwaRefresh = getSelector('pwa-refresh', {
  activeClass: 'activeClass',
})
export const $scrollTarget = getSelector('scroll-target')
