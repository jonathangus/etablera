import { math } from './scroll-utils'
import { ISmoothItem } from './SmoothItem'

export interface ISmoothScroll {
  DOM: {
    main: HTMLElement
    scrollable: HTMLElement
    body: HTMLElement
  }
  items: Set<ISmoothItem>

  docScroll: number
  winSize: {
    width: number
    height: number
  }
  lastScroll: number
  scrollingSpeed: number
  count: number

  add: (item: ISmoothItem) => void
  remove: (item: ISmoothItem) => void
}

const isClient = typeof window !== 'undefined'

class SmoothScroll implements ISmoothScroll {
  DOM = null

  count = 0
  docScroll = 0
  lastScroll = 0
  scrollingSpeed = 0
  winSize = {
    width: 0,
    height: 0,
  }

  items = new Set([])

  // here we define which property will change as we scroll the page
  // in this case we will be translating on the y-axis
  // we interpolate between the previous and current value to achieve the smooth scrolling effect
  renderedStyles = {
    translationY: {
      // interpolated value
      previous: 0,
      // current value
      current: 0,
      // amount to interpolate
      ease: 0.2,
      // current value setter
      // in this case the value of the translation will be the same like the document scroll
      setValue: () => this.docScroll,
    },
  }

  constructor() {
    this.DOM = {
      main: isClient && document.querySelector('main'),
      body: isClient && document.body,
    }
  }

  public init() {
    this.calcWinsize()
    this.getPageYScroll()
    this.lastScroll = this.docScroll
    window.addEventListener('resize', this.calcWinsize)
    window.addEventListener('scroll', this.getPageYScroll)

    // start the render loop

    for (const item of this.items) {
      item.getSize()
    }
    requestAnimationFrame(() => this.render())
  }

  calcWinsize = () => {
    this.winSize = { width: window.innerWidth, height: window.innerHeight }
  }

  getPageYScroll = () => {
    this.docScroll = window.pageYOffset || document.documentElement.scrollTop
  }

  render() {
    this.scrollingSpeed = Math.abs(this.docScroll - this.lastScroll)
    this.lastScroll = this.docScroll

    for (const item of this.items) {
      // if the item is inside the viewport call it's render function
      // this will update item's styles, based on the document scroll value and the item's position on the viewport
      if (item.isVisible) {
        if (item.insideViewport) {
          item.render()
        } else {
          item.insideViewport = true
          item.update()
        }
      } else {
        item.insideViewport = false
      }
    }

    requestAnimationFrame(() => this.render())
  }

  pageChange = () => {
    this.calcWinsize()
    this.getPageYScroll()
  }

  add = (item: ISmoothItem) => {
    this.items.add(item)
  }

  remove = (item: ISmoothItem) => {
    this.items.delete(item)
  }

  removeAllExcept = (selected: ISmoothItem) => {
    this.items.forEach(item => {
      if (item.id !== selected.id) {
        this.remove(item)
      }
    })
  }
}

const smooth = new SmoothScroll()

export const init = () => {
  smooth.init()
}

export const updateSmooth = () => {
  smooth.pageChange()
}

export default smooth
